import { systemPrompt } from "@/lib/profile";

type ChatMessage = { role: "user" | "assistant"; content: string };

const MAX_MESSAGES = 12; // conversation turns sent to the model
const MAX_CHARS = 1000; // per user message
const RATE_LIMIT = 20; // requests
const RATE_WINDOW_MS = 10 * 60 * 1000; // per 10 minutes per IP

// In-memory limiter: good enough for a single server; resets on restart.
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > RATE_LIMIT;
}

function parseMessages(body: unknown): ChatMessage[] | null {
  if (!body || typeof body !== "object" || !Array.isArray((body as { messages?: unknown }).messages)) {
    return null;
  }
  const raw = (body as { messages: unknown[] }).messages;
  const out: ChatMessage[] = [];
  for (const m of raw) {
    if (!m || typeof m !== "object") return null;
    const { role, content } = m as Record<string, unknown>;
    if ((role !== "user" && role !== "assistant") || typeof content !== "string") return null;
    out.push({ role, content: content.slice(0, MAX_CHARS) });
  }
  const trimmed = out.slice(-MAX_MESSAGES);
  if (trimmed.length === 0 || trimmed[trimmed.length - 1].role !== "user") return null;
  return trimmed;
}

const error = (message: string, status: number) => Response.json({ error: message }, { status });

export async function POST(request: Request) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return error("The assistant is not configured yet.", 503);

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  if (rateLimited(ip)) return error("Too many messages. Try again in a few minutes.", 429);

  let messages: ChatMessage[] | null;
  try {
    messages = parseMessages(await request.json());
  } catch {
    messages = null;
  }
  if (!messages) return error("Send a message to start the chat.", 400);

  const baseUrl = (process.env.OPENAI_BASE_URL || "https://api.openai.com/v1").replace(/\/$/, "");
  const upstream = await fetch(`${baseUrl}/chat/completions`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({
      model: process.env.OPENAI_MODEL || "gpt-4.1-mini",
      stream: true,
      // Newer models only accept max_completion_tokens (which also covers reasoning tokens).
      max_completion_tokens: 2000,
      messages: [{ role: "system", content: systemPrompt }, ...messages],
    }),
    signal: request.signal,
  }).catch(() => null);

  if (!upstream || !upstream.ok || !upstream.body) {
    if (upstream) console.error("OpenAI error", upstream.status, await upstream.text().catch(() => ""));
    return error("The assistant isn't available right now. Please email Ali instead.", 502);
  }

  // Turn OpenAI's SSE stream into a plain text stream of answer tokens.
  const decoder = new TextDecoder();
  const encoder = new TextEncoder();
  let buffer = "";
  const stream = upstream.body.pipeThrough(
    new TransformStream<Uint8Array, Uint8Array>({
      transform(chunk, controller) {
        buffer += decoder.decode(chunk, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";
        for (const line of lines) {
          const data = line.trim();
          if (!data.startsWith("data:")) continue;
          const payload = data.slice(5).trim();
          if (payload === "[DONE]") continue;
          try {
            const delta = JSON.parse(payload).choices?.[0]?.delta?.content;
            if (delta) controller.enqueue(encoder.encode(delta));
          } catch {
            // ignore keep-alive or partial lines
          }
        }
      },
    }),
  );

  return new Response(stream, {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" },
  });
}
