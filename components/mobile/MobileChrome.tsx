"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Icon, type IconName } from "@/components/mobile/icons";

/* Phone-only chrome in the style of a native Android (Material 3) app.
   Everything here is hidden by CSS above the mobile breakpoint. */

const haptic = () => {
  try {
    navigator.vibrate?.(8);
  } catch {}
};

const snack = (message: string) => window.dispatchEvent(new CustomEvent("m-snack", { detail: message }));

async function share(title: string) {
  haptic();
  const url = location.href.split("#")[0];
  try {
    if (navigator.share) {
      await navigator.share({ title, url });
      return;
    }
    await navigator.clipboard.writeText(url);
    snack("Link copied");
  } catch {
    /* user closed the share sheet */
  }
}

type AppBarProps = {
  variant: "home" | "detail";
  title: string;
  cvPath: string;
  backHref?: string;
};

/** Top app bar. Transparent at the top, a tinted surface once the page scrolls. */
export function MobileAppBar({ variant, title, cvPath, backHref = "/#m-work" }: AppBarProps) {
  return (
    <header className="m-appbar">
      {variant === "detail" ? (
        <Link className="m-icon-btn rp" href={backHref} aria-label="Back to all work">
          <Icon name="back" />
        </Link>
      ) : (
        <span className="m-appbar-badge" aria-hidden="true">
          AM
        </span>
      )}
      <span className="m-appbar-title">{title}</span>
      <button type="button" className="m-icon-btn rp" aria-label="Share this page" onClick={() => share(title)}>
        <Icon name="share" size={22} />
      </button>
      <a className="m-icon-btn rp" href={cvPath} download aria-label="Download CV" onClick={() => snack("Downloading CV…")}>
        <Icon name="download" size={22} />
      </a>
    </header>
  );
}

const tabs: { id: string; label: string; icon: IconName }[] = [
  { id: "m-top", label: "Home", icon: "person" },
  { id: "m-work", label: "Work", icon: "work" },
  { id: "m-projects", label: "Projects", icon: "apps" },
  { id: "m-skills", label: "Skills", icon: "bolt" },
  { id: "m-contact", label: "Contact", icon: "mail" },
];

/** Bottom navigation bar with scroll-spy. Hides while scrolling down, like Android. */
export function MobileNav() {
  const [active, setActive] = useState("m-top");

  useEffect(() => {
    const sections = tabs.map((t) => document.getElementById(t.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  return (
    <nav className="m-nav" aria-label="Sections">
      {tabs.map((t) => (
        <a
          key={t.id}
          href={`#${t.id}`}
          className="m-nav-item"
          aria-current={active === t.id ? "true" : undefined}
          onClick={() => {
            haptic();
            setActive(t.id);
          }}
        >
          <span className="m-nav-pill rp">
            <Icon name={t.icon} />
          </span>
          <span className="m-nav-label">{t.label}</span>
        </a>
      ))}
    </nav>
  );
}

/**
 * Extended FAB that opens the AI chat, plus the page-wide phone behaviors:
 * ripple on `.rp` elements, scroll direction / scrolled flags on <html>, and the snackbar.
 */
export function MobileFab() {
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const root = document.documentElement;
    let lastY = window.scrollY;
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        root.dataset.mScrolled = y > 24 ? "1" : "0";
        if (y < 80) root.dataset.mScroll = "up";
        else if (Math.abs(y - lastY) > 6) root.dataset.mScroll = y > lastY ? "down" : "up";
        lastY = y;
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const onDown = (e: PointerEvent) => {
      const el = (e.target as HTMLElement | null)?.closest<HTMLElement>(".rp");
      if (!el) return;
      const r = el.getBoundingClientRect();
      const size = Math.max(r.width, r.height) * 2.2;
      const wave = document.createElement("span");
      wave.className = "m-ripple";
      wave.style.cssText = `width:${size}px;height:${size}px;left:${e.clientX - r.left - size / 2}px;top:${e.clientY - r.top - size / 2}px`;
      el.appendChild(wave);
      wave.addEventListener("animationend", () => wave.remove());
    };
    document.addEventListener("pointerdown", onDown, { passive: true });

    let timer: ReturnType<typeof setTimeout>;
    const onSnack = (e: Event) => {
      setMessage((e as CustomEvent<string>).detail);
      clearTimeout(timer);
      timer = setTimeout(() => setMessage(null), 2600);
    };
    window.addEventListener("m-snack", onSnack);

    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("pointerdown", onDown);
      window.removeEventListener("m-snack", onSnack);
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      <button type="button" className="m-fab rp" data-open-chat onClick={haptic} aria-label="Ask AI about Ali's work">
        <Icon name="sparkle" />
        <span className="m-fab-label">Ask AI</span>
      </button>
      <div className="m-snackbar" role="status" data-show={message ? "1" : "0"}>
        {message}
      </div>
    </>
  );
}

/** Skills as scrollable filter chips: pick a group, see its items. */
export function SkillTabs({ groups }: { groups: { group: string; items: string[] }[] }) {
  const [i, setI] = useState(0);
  return (
    <div className="m-skilltabs">
      <div className="m-chiprow" role="tablist" aria-label="Skill groups">
        {groups.map((g, n) => (
          <button
            key={g.group}
            type="button"
            role="tab"
            id={`m-skill-tab-${n}`}
            aria-selected={i === n}
            aria-controls="m-skill-panel"
            className="m-filter rp"
            onClick={(e) => {
              haptic();
              setI(n);
              e.currentTarget.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
            }}
          >
            {i === n && (
              <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                <path d="m5 12.5 4.5 4.5L19 7.5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
            {g.group}
          </button>
        ))}
      </div>
      <div className="m-skillpanel" role="tabpanel" id="m-skill-panel" aria-labelledby={`m-skill-tab-${i}`}>
        <ul key={i}>
          {groups[i].items.map((s, n) => (
            <li key={s} style={{ "--i": n } as React.CSSProperties}>
              {s}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
