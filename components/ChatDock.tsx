"use client";

import { useCallback, useEffect } from "react";
import { ChatBox } from "@/components/ChatBox";
import { useOpen } from "@/hooks/useOpen";

type Props = {
  name: string;
  status: string;
  greeting: string;
  placeholder: string;
  suggestions: string[];
  note: string;
  email: string;
};

/**
 * Side chat panel. Any element with `data-open-chat` opens it.
 * Desktop: the panel takes the left side and the site shifts right (split view).
 * Mobile: the panel covers the whole screen.
 * Open state goes through useOpen, so the browser/phone Back button closes the
 * chat instead of leaving the page.
 */
export function ChatDock(props: Props) {
  const [open, setOpen] = useOpen("ai-chat");

  const close = useCallback(() => setOpen(false), [setOpen]);

  // Open from any [data-open-chat] trigger on the page.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (target?.closest("[data-open-chat]")) {
        e.preventDefault();
        setOpen(true);
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [setOpen]);

  useEffect(() => {
    document.documentElement.classList.toggle("chat-open", open);
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, setOpen]);

  return (
    <>
      <aside className="chat-dock" aria-label="Chat with Ali's AI assistant" aria-hidden={!open} inert={!open}>
        <ChatBox {...props} onClose={close} active={open} />
      </aside>

      <button
        type="button"
        className="chat-fab"
        onClick={() => setOpen(true)}
        hidden={open}
        aria-label="Ask AI about Ali's work"
      >
        <span className="chat-fab-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="18" height="18">
            <path
              d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9L12 3zM19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8L19 15z"
              fill="currentColor"
            />
          </svg>
        </span>
        <span className="chat-fab-text">Ask AI about my work</span>
        <span className="chat-fab-go" aria-hidden="true">
          Ask
        </span>
      </button>
    </>
  );
}
