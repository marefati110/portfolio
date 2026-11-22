/** Small stroke icons for the mobile (Material-style) UI. 24px grid, round caps. */
const paths = {
  person: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20.5c0-4 3.6-6.5 8-6.5s8 2.5 8 6.5" />
    </>
  ),
  work: (
    <>
      <rect x="3" y="7" width="18" height="13" rx="3" />
      <path d="M8.5 7V5.5A2.5 2.5 0 0 1 11 3h2a2.5 2.5 0 0 1 2.5 2.5V7M3 13h18" />
    </>
  ),
  apps: (
    <>
      <rect x="3.5" y="3.5" width="7" height="7" rx="2.2" />
      <rect x="13.5" y="3.5" width="7" height="7" rx="3.5" />
      <rect x="3.5" y="13.5" width="7" height="7" rx="2.2" />
      <rect x="13.5" y="13.5" width="7" height="7" rx="2.2" />
    </>
  ),
  bolt: <path d="M13.5 2.5 4.5 14h7l-1 7.5 9-11.5h-7l1-7.5Z" />,
  mail: (
    <>
      <rect x="2.5" y="4.5" width="19" height="15" rx="3" />
      <path d="m3.5 6.5 8.5 6.5 8.5-6.5" />
    </>
  ),
  download: <path d="M12 4v11M7 10.5l5 5 5-5M5 20h14" />,
  share: (
    <>
      <circle cx="18" cy="5.5" r="2.5" />
      <circle cx="6" cy="12" r="2.5" />
      <circle cx="18" cy="18.5" r="2.5" />
      <path d="m8.2 10.8 7.6-4.1M8.2 13.2l7.6 4.1" />
    </>
  ),
  back: <path d="M19.5 12H5M11 5.5 4.5 12l6.5 6.5" />,
  chevron: <path d="m6 9 6 6 6-6" />,
  outward: <path d="M7 17 17 7M8.5 7H17v8.5" />,
  forward: <path d="M4.5 12H19M13 5.5l6.5 6.5-6.5 6.5" />,
  pin: (
    <>
      <path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21Z" />
      <circle cx="12" cy="9.5" r="2.5" />
    </>
  ),
  school: <path d="M2 9.5 12 4.5l10 5-10 5-10-5ZM6 11.5v5c3.5 2.5 8.5 2.5 12 0v-5M22 9.5v6" />,
  code: <path d="M8.5 7 3.5 12l5 5M15.5 7l5 5-5 5M13.5 4.5l-3 15" />,
  star: <path d="m12 3.5 2.6 5.3 5.9.9-4.3 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8-4.3-4.1 5.9-.9L12 3.5Z" />,
} as const;

export type IconName = keyof typeof paths | "sparkle";

export function Icon({ name, size = 24 }: { name: IconName; size?: number }) {
  if (name === "sparkle") {
    return (
      <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true">
        <path d="M12 2.5l2.1 5.6 5.6 2.1-5.6 2.1L12 17.9l-2.1-5.6-5.6-2.1 5.6-2.1L12 2.5zM19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8L19 15z" />
      </svg>
    );
  }
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}

/**
 * Material 3 Expressive "cookie" shape as a CSS polygon: a circle with n soft scallops.
 * Computed once on the server, used as clip-path.
 */
export function cookie(n: number, depth = 0.06, steps = 180) {
  const pts: string[] = [];
  for (let i = 0; i < steps; i++) {
    const t = (i / steps) * Math.PI * 2;
    const r = 50 * (1 - depth + depth * Math.cos(n * t));
    pts.push(`${(50 + r * Math.cos(t)).toFixed(2)}% ${(50 + r * Math.sin(t)).toFixed(2)}%`);
  }
  return `polygon(${pts.join(",")})`;
}
