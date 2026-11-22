import { ImageResponse } from "next/og";

// PNG version of app/icon.svg for iOS home screens and the web manifest.
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  const u = 180 / 32;
  const bar = (x: number, y: number, w: number, h: number, color: string) => (
    <div style={{ position: "absolute", left: x * u, top: y * u, width: w * u, height: h * u, background: color }} />
  );
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", position: "relative", background: "#16222E" }}>
        {bar(6, 9, 20, 3.2, "#E7EAED")}
        {bar(14.4, 12, 3.2, 8, "#E7EAED")}
        {bar(6, 19.8, 20, 3.2, "#3D6BFF")}
      </div>
    ),
    size,
  );
}
