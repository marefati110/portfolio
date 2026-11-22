import type { MetadataRoute } from "next";
import { links } from "@/content/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/api/" },
    sitemap: `${links.site}/sitemap.xml`,
    host: links.site,
  };
}
