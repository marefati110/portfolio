import { caseStudies, getCaseStudy } from "@/content/caseStudies";
import { renderOgCard, ogSize } from "@/lib/og";

export const alt = "Case study by Ali Marefati";
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cs = getCaseStudy(slug) ?? caseStudies[0];
  return renderOgCard({
    variant: "case",
    kicker: `Case study · ${cs.company}`,
    title: cs.title,
    subtitle: cs.role,
    stats: cs.stats.slice(0, 3),
    accent: cs.color,
  });
}
