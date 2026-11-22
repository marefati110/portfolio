import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };

const INK = "#141938";
const MUTED = "#5b6180";
const BG = "#f6f7fc";
const VIOLET = "#5b3df5";
const SUN = "#ffc93c";

async function assets() {
  const root = process.cwd();
  const [regular, heavy, photo] = await Promise.all([
    readFile(join(root, "assets/fonts/Bricolage-500.ttf")),
    readFile(join(root, "assets/fonts/Bricolage-800.ttf")),
    readFile(join(root, "public/profile.jpg")),
  ]);
  return { regular, heavy, photo: `data:image/jpeg;base64,${photo.toString("base64")}` };
}

type Stat = { value: string; label: string };
export type OgContact = { icon: keyof typeof ICONS; label: string; value: string };

const ICONS = {
  telegram:
    "M21.94 3.33 2.9 10.67c-1.3.52-1.29 1.25-.24 1.57l4.89 1.53 1.89 5.8c.23.63.12.88.78.88.51 0 .74-.23 1.02-.51l2.45-2.38 5.1 3.77c.94.52 1.62.25 1.85-.87l3.35-15.78c.34-1.37-.52-1.99-1.42-1.58z",
  github:
    "M12 .3a12 12 0 0 0-3.8 23.38c.6.12.83-.26.83-.57l-.02-2.04c-3.34.72-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.74.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.5 1 .1-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.14-.3-.54-1.52.1-3.18 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.28-1.55 3.29-1.23 3.29-1.23.64 1.66.24 2.88.12 3.18a4.65 4.65 0 0 1 1.23 3.22c0 4.61-2.8 5.63-5.48 5.92.42.36.81 1.1.81 2.22l-.01 3.29c0 .31.2.69.82.57A12 12 0 0 0 12 .3",
  email:
    "M3 4h18a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm0 2v.5l9 5.6 9-5.6V6H3zm18 2.85-8.47 5.27a1 1 0 0 1-1.06 0L3 8.85V18h18V8.85z",
  linkedin:
    "M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z",
};

/** Link-preview card: name/title on the left, color photo on the right, a few real numbers. */
export async function renderOgCard(opts: {
  kicker?: string;
  title: string;
  subtitle: string;
  stats?: Stat[];
  /** Contact rows shown instead of stats (homepage). */
  contacts?: OgContact[];
  accent?: string;
  /** Big name layout for the homepage; smaller title for case studies. */
  variant: "home" | "case";
}) {
  const { regular, heavy, photo } = await assets();
  const accent = opts.accent ?? VIOLET;
  const isHome = opts.variant === "home";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: BG,
          fontFamily: "Bricolage",
          color: INK,
          borderTop: `14px solid ${accent}`,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", width: 800, padding: "56px 32px 52px 72px" }}>
          {opts.kicker && (
            <div style={{ display: "flex", fontSize: 28, fontWeight: 800, color: accent, marginBottom: 18 }}>
              {opts.kicker}
            </div>
          )}
          <div
            style={{
              display: "flex",
              fontSize: isHome ? 104 : 58,
              fontWeight: 800,
              lineHeight: isHome ? 0.95 : 1.05,
              letterSpacing: isHome ? -4 : -2,
              maxWidth: 700,
            }}
          >
            {opts.title}
          </div>
          <div style={{ display: "flex", marginTop: 26 }}>
            <div
              style={{
                display: "flex",
                padding: "8px 20px",
                borderRadius: 14,
                background: SUN,
                fontSize: 30,
                fontWeight: 800,
                transform: "rotate(-1.5deg)",
              }}
            >
              {opts.subtitle}
            </div>
          </div>

          {opts.contacts && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: 16, marginTop: "auto" }}>
              {opts.contacts.map((c) => (
                <div
                  key={c.label}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    width: 340,
                    padding: "12px 16px",
                    borderRadius: 18,
                    background: "#ffffff",
                    border: `3px solid ${INK}`,
                    boxShadow: `5px 5px 0 ${accent}`,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 46,
                      height: 46,
                      borderRadius: 12,
                      background: accent,
                      flexShrink: 0,
                    }}
                  >
                    <svg width="26" height="26" viewBox="0 0 24 24">
                      <path d={ICONS[c.icon]} fill="#ffffff" />
                    </svg>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", marginLeft: 14, minWidth: 0 }}>
                    <span style={{ fontSize: 17, fontWeight: 500, color: MUTED, lineHeight: 1.1 }}>{c.label}</span>
                    <span style={{ fontSize: 23, fontWeight: 800, color: INK, lineHeight: 1.2 }}>{c.value}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div style={{ display: opts.stats?.length ? "flex" : "none", gap: 18, marginTop: "auto" }}>
            {(opts.stats ?? []).map((s) => (
              <div
                key={s.label}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  ...(isHome ? {} : { flex: 1, minWidth: 0 }),
                  padding: "14px 22px",
                  borderRadius: 18,
                  background: "#ffffff",
                  border: `3px solid ${INK}`,
                  boxShadow: `5px 5px 0 ${accent}`,
                }}
              >
                <span style={{ fontSize: 40, fontWeight: 800, color: accent, lineHeight: 1 }}>{s.value}</span>
                <span style={{ fontSize: 20, fontWeight: 500, color: MUTED, marginTop: 6, lineHeight: 1.25 }}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: 400,
            paddingRight: 56,
          }}
        >
          <div
            style={{
              display: "flex",
              width: isHome ? 330 : 250,
              height: isHome ? 330 : 250,
              borderRadius: "50%",
              overflow: "hidden",
              boxShadow: `16px 16px 0 ${SUN}`,
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={photo} width={isHome ? 330 : 250} height={isHome ? 330 : 250} alt="" style={{ objectFit: "cover" }} />
          </div>
          {!isHome && (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: 34 }}>
              <span style={{ fontSize: 32, fontWeight: 800 }}>Ali Marefati</span>
              <span style={{ fontSize: 22, fontWeight: 500, color: MUTED }}>AI Engineer & Product Leader</span>
            </div>
          )}
          <div style={{ display: "flex", marginTop: isHome ? 40 : 18, fontSize: 24, fontWeight: 500, color: MUTED }}>
            marefati110.ir
          </div>
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: "Bricolage", data: regular, weight: 500, style: "normal" },
        { name: "Bricolage", data: heavy, weight: 800, style: "normal" },
      ],
    },
  );
}
