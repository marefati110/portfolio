import { links } from "@/content/site";

type Social = {
  name: string;
  handle: string;
  href: string;
  brand: string;
  icon: React.ReactNode;
};

const svg = (path: React.ReactNode) => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true">
    {path}
  </svg>
);

const socials: Social[] = [
  {
    name: "GitHub",
    handle: "marefati110",
    href: links.github,
    brand: "#181717",
    icon: svg(
      <path d="M12 .5C5.65.5.5 5.65.5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.05-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.42-2.7 5.39-5.26 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />,
    ),
  },
  {
    name: "LinkedIn",
    handle: "Ali Marefati",
    href: links.linkedin,
    brand: "#0a66c2",
    icon: svg(
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />,
    ),
  },
  {
    name: "Telegram",
    handle: "@marefati110",
    href: links.telegram,
    brand: "#229ed9",
    icon: svg(
      <path d="M11.94 0A12 12 0 1 0 24 12 12 12 0 0 0 11.94 0Zm5.88 8.17-1.97 9.28c-.15.66-.54.82-1.09.51l-3-2.21-1.45 1.4c-.16.16-.3.3-.61.3l.21-3.05 5.56-5.02c.24-.21-.05-.33-.38-.12l-6.87 4.32-2.96-.92c-.64-.2-.66-.64.14-.95l11.57-4.46c.54-.2 1.01.13.85.92Z" />,
    ),
  },
  {
    name: "Email",
    handle: links.email,
    href: `mailto:${links.email}`,
    brand: "#ea4335",
    icon: (
      <svg
        viewBox="0 0 24 24"
        width="22"
        height="22"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <rect x="2.5" y="4.5" width="19" height="15" rx="3" />
        <path d="m3.5 6.5 8.5 6.5 8.5-6.5" />
      </svg>
    ),
  },
];

/** Social profile cards with brand icons, used in the footer. */
export function SocialLinks() {
  return (
    <ul className="socials" aria-label="Social links">
      {socials.map((s) => (
        <li key={s.name}>
          <a
            className="social"
            href={s.href}
            rel={s.href.startsWith("mailto:") ? undefined : "me noopener"}
            target={s.href.startsWith("mailto:") ? undefined : "_blank"}
            style={{ "--brand": s.brand } as React.CSSProperties}
          >
            <span className="social-icon">{s.icon}</span>
            <span className="social-text">
              <span className="social-name">{s.name}</span>
              <span className="social-handle">{s.handle}</span>
            </span>
            <span className="social-arrow" aria-hidden="true">
              ↗
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}
