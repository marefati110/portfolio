import type { MetadataRoute } from "next";
import { site } from "@/content/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.meta.title,
    short_name: site.hero.name,
    description: site.meta.description,
    start_url: "/",
    display: "browser",
    background_color: "#f6f7fc",
    theme_color: "#f6f7fc",
    lang: "en",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  };
}
