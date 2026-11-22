"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type Msg = { role: "user" | "assistant"; content: string };

type Props = {
  name: string;
  status: string;
  greeting: string;
  placeholder: string;
  suggestions: string[];
  email: string;
  note: string;
  onClose: () => void;
  /** Focus the input when this becomes true (panel opened). */
  active: boolean;
};

/** Chat with the OpenAI-backed assistant at /api/chat. The answer streams in as plain text. */
export function ChatBox({ name, status, greeting, placeholder, suggestions, email, note, onClose, active }: Props) {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const logRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (active) inputRef.current?.focus({ preventScroll: true });
  }, [active]);

  useEffect(() => () => abortRef.current?.abort(), []);

  useEffect(() => {
    const el = logRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, busy]);

  async function send(text: string) {
    const question = text.trim();
    if (!question || busy) return;

    const history: Msg[] = [...messages, { role: "user", content: question }];
    setMessages([...history, { role: "assistant", content: "" }]);
    setInput("");
    setError(null);
    setBusy(true);

    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history }),
        signal: controller.signal,
      });

      if (!res.ok || !res.body) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error ?? "The assistant isn't available right now.");
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let answer = "";
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        answer += decoder.decode(value, { stream: true });
        setMessages([...history, { role: "assistant", content: answer }]);
      }
      if (!answer) throw new Error("No answer came back. Try asking again.");
    } catch (e) {
      if (controller.signal.aborted) return;
      setMessages(history);
      setError(e instanceof Error ? e.message : "Something went wrong. Try again.");
    } finally {
      setBusy(false);
    }
  }

  const waiting = busy && messages[messages.length - 1]?.content === "";

  const reset = () => {
    abortRef.current?.abort();
    setMessages([]);
    setError(null);
    setBusy(false);
  };

  const log = (
    <div className="chat-log" ref={logRef} aria-live="polite">
      <p className="bubble bubble-assistant">{greeting}</p>
      {messages.map((m, i) =>
        m.role === "assistant" && m.content === "" ? null : (
          <p key={i} className={`bubble bubble-${m.role}`} dir="auto">
            {m.content}
          </p>
        ),
      )}
      {waiting && (
        <p className="bubble bubble-assistant">
          <span className="visually-hidden">Writing an answer</span>
          <span aria-hidden="true" className="dots">
            <i />
            <i />
            <i />
          </span>
        </p>
      )}
      {error && (
        <p className="chat-error" role="alert">
          {error} You can also email <a href={`mailto:${email}`}>{email}</a>.
        </p>
      )}
    </div>
  );

  const choices = messages.length === 0 && (
    <div className="chat-choices">
      {suggestions.map((s) => (
        <button key={s} type="button" onClick={() => send(s)}>
          {s}
        </button>
      ))}
    </div>
  );

  const form = (
    <form
      className="chat-form"
      onSubmit={(e) => {
        e.preventDefault();
        send(input);
      }}
    >
      <label htmlFor="chat-input" className="visually-hidden">
        Your question
      </label>
      <textarea
        ref={inputRef}
        id="chat-input"
        rows={1}
        dir="auto"
        value={input}
        maxLength={1000}
        placeholder={placeholder}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
            e.preventDefault();
            send(input);
          }
        }}
      />
      <button type="submit" disabled={busy || !input.trim()}>
        Send
      </button>
    </form>
  );

  return (
    <div className="chat">
      <div className="chat-head">
        <Image src="/profile.jpg" alt="" width={44} height={44} className="chat-avatar" />
        <div>
          <p className="chat-name">{name}</p>
          <p className="chat-status">{status}</p>
        </div>
        {messages.length > 0 && (
          <button type="button" className="chat-reset" onClick={reset}>
            New chat
          </button>
        )}
        <button type="button" className="chat-close" onClick={onClose} aria-label="Close chat">
          <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
          </svg>
        </button>
      </div>
      {log}
      {choices}
      {form}
      <p className="chat-note">{note}</p>
    </div>
  );
}
