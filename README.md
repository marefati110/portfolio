# marefati110.ir

Personal site of Ali Marefati. Next.js 16 (App Router), fully static, English only.

- Content: `content/site.ts`, kept in sync with `~/w/cv/versions/master.html`.
- CV PDF: `public/cv/ali-marefati-cv.pdf` (copy of `~/w/cv/pdf/master.pdf`).
- AI chat ("Ask AI" side panel, `components/ChatDock.tsx`; any element with `data-open-chat` opens it): `app/api/chat/route.ts` calls OpenAI with a system prompt built from `content/site.ts` (`lib/profile.ts`). Set `OPENAI_API_KEY` in `.env` or `.env.local` (see `.env.example`); `OPENAI_MODEL` and `OPENAI_BASE_URL` are optional. Rate limit: 20 messages / 10 min per IP (in memory).
- The career chart ends at the build date; rebuild to move it forward.

```bash
pnpm dev                 # http://localhost:3000
pnpm build && pnpm start
```
