import type { MetadataRoute } from "next";
import { links } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: links.site }];
}
