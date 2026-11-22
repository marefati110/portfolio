import type { MetadataRoute } from "next";
import { CV_PATH } from "@/components/SiteChrome";
import { caseStudies } from "@/content/caseStudies";
import { links } from "@/content/site";

// Build date: the site is static, so content only changes on deploy.
const lastModified = new Date();

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: links.site, lastModified, changeFrequency: "monthly", priority: 1 },
    ...caseStudies.map((c) => ({
      url: `${links.site}/work/${c.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    { url: `${links.site}${CV_PATH}`, lastModified, changeFrequency: "monthly", priority: 0.5 },
  ];
}
