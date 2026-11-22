import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CallPipeline } from "@/components/CallPipeline";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { caseStudies, getCaseStudy } from "@/content/caseStudies";
import { site } from "@/content/site";
import { caseStudyLd, ldJson } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) return {};
  const title = `${cs.title} — ${site.hero.name}`;
  return {
    title: { absolute: title },
    description: cs.summary,
    keywords: [cs.company, cs.role, ...cs.stack],
    alternates: { canonical: `/work/${cs.slug}` },
    openGraph: {
      type: "article",
      title,
      description: cs.summary,
      url: `/work/${cs.slug}`,
      siteName: site.hero.name,
      locale: "en_US",
      authors: [site.hero.name],
    },
    twitter: { card: "summary_large_image", title, description: cs.summary },
  };
}

export default async function CaseStudyPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) notFound();

  const index = caseStudies.indexOf(cs);
  const next = caseStudies[(index + 1) % caseStudies.length];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={ldJson(caseStudyLd(cs))} />
      <SiteHeader title={cs.company} />
      <main id="main" className="case" style={{ "--c": cs.color } as React.CSSProperties}>
        <article className="wrap">
          <header className="case-hero">
            <Link className="case-back" href="/#work">
              All work
            </Link>
            <div className="case-company">
              <Image src={cs.logo} alt="" width={48} height={48} className="logo" />
              <div>
                <p className="case-company-name">{cs.company}</p>
                <p className="muted">{cs.companyAbout}</p>
              </div>
            </div>
            <h1>{cs.title}</h1>
            <p className="case-summary">{cs.summary}</p>
            <dl className="case-meta">
              <div>
                <dt>Role</dt>
                <dd>{cs.role}</dd>
              </div>
              <div>
                <dt>Period</dt>
                <dd>{cs.period}</dd>
              </div>
            </dl>
          </header>

          <ul className="case-stats">
            {cs.stats.map((s) => (
              <li key={s.label}>
                <strong>{s.value}</strong>
                <span>{s.label}</span>
              </li>
            ))}
          </ul>

          <div className="case-body">
            {cs.sections.map((sec) => (
              <section key={sec.heading}>
                <h2>{sec.heading}</h2>
                {sec.paragraphs?.map((p) => (
                  <p key={p}>{p}</p>
                ))}
                {sec.bullets && (
                  <ul>
                    {sec.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                )}
                {sec.diagram === "call-pipeline" && <CallPipeline />}
              </section>
            ))}

            <section>
              <h2>Stack</h2>
              <ul className="chips chips-lg">
                {cs.stack.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </section>
          </div>

          <aside className="case-next" style={{ "--n": next.color } as React.CSSProperties}>
            <p className="muted">Next case study</p>
            <Link href={`/work/${next.slug}`}>
              <span className="case-next-company">{next.company}</span>
              <span className="case-next-title">{next.title}</span>
            </Link>
          </aside>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
