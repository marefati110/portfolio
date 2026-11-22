import { renderOgCard, ogSize } from "@/lib/og";

export const alt = "Ali Marefati, AI Engineer & Product Leader";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return renderOgCard({
    variant: "home",
    title: "Ali Marefati",
    subtitle: "AI Engineer & Product Leader",
    stats: [
      { value: "−80%", label: "technology costs" },
      { value: "30×", label: "operations throughput" },
      { value: "150+", label: "paying customers" },
    ],
  });
}
