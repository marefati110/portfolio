import { renderOgCard, ogSize } from "@/lib/og";

export const alt = "Ali Marefati, AI Engineer & Product Leader";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return renderOgCard({
    variant: "home",
    title: "Ali Marefati",
    subtitle: "AI Engineer & Product Leader",
    contacts: [
      { icon: "telegram", label: "Telegram", value: "@marefati110" },
      { icon: "github", label: "GitHub", value: "marefati110" },
      { icon: "email", label: "Email", value: "marefati110@gmail.com" },
      { icon: "linkedin", label: "LinkedIn", value: "Ali Marefati" },
    ],
  });
}
