"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type QA = { q: string; a: string };
type Msg = { from: "me" | "you"; text: string };

type Props = {
  greeting: string;
  typing: string;
  status: string;
  name: string;
  qa: QA[];
};

/** Scripted Q&A in a chat layout. Answers are pre-written; nothing is sent anywhere. */
export function AskMe({ greeting, typing, status, name, qa }: Props) {
  const [messages, setMessages] = useState<Msg[]>([{ from: "me", text: greeting }]);
  const [asked, setAsked] = useState<string[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const logRef = useRef<HTMLDivElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  useEffect(() => {
    const el = logRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages, isTyping]);

  function ask(item: QA) {
    if (isTyping) return;
    setAsked((a) => [...a, item.q]);
    setMessages((m) => [...m, { from: "you", text: item.q }]);
    setIsTyping(true);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    timer.current = setTimeout(
      () => {
        setIsTyping(false);
        setMessages((m) => [...m, { from: "me", text: item.a }]);
      },
      reduce ? 0 : 900,
    );
  }

  const remaining = qa.filter((item) => !asked.includes(item.q));

  return (
    <div className="chat">
      <div className="chat-head">
        <Image src="/profile.jpg" alt="" width={44} height={44} className="chat-avatar" />
        <div>
          <p className="chat-name">{name}</p>
          <p className="chat-status">{status}</p>
        </div>
      </div>

      <div className="chat-log" ref={logRef} aria-live="polite">
        {messages.map((m, i) => (
          <p key={i} className={`bubble bubble-${m.from}`}>
            {m.text}
          </p>
        ))}
        {isTyping && (
          <p className="bubble bubble-me bubble-typing">
            <span className="visually-hidden">{typing}</span>
            <span aria-hidden="true" className="dots">
              <i />
              <i />
              <i />
            </span>
          </p>
        )}
      </div>

      <div className="chat-choices">
        {remaining.length > 0 ? (
          remaining.map((item) => (
            <button key={item.q} type="button" onClick={() => ask(item)} disabled={isTyping}>
              {item.q}
            </button>
          ))
        ) : (
          <button
            type="button"
            onClick={() => {
              setAsked([]);
              setMessages([{ from: "me", text: greeting }]);
            }}
          >
            Start over
          </button>
        )}
      </div>
    </div>
  );
}
