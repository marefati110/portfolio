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

/** Link-preview card: name/title on the left, color photo on the right, a few real numbers. */
export async function renderOgCard(opts: {
  kicker?: string;
  title: string;
  subtitle: string;
  stats: Stat[];
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

          <div style={{ display: "flex", gap: 18, marginTop: "auto" }}>
            {opts.stats.map((s) => (
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
