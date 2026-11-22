import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Vazirmatn } from "next/font/google";
import { CV_PATH } from "@/components/SiteChrome";
import { getCaseStudy } from "@/content/caseStudies";
import { fa, faMeta } from "@/content/fa";
import { links, site } from "@/content/site";
import { faLd, ldJson } from "@/lib/seo";
import "./fa.css";

const vazir = Vazirmatn({ subsets: ["arabic", "latin"], variable: "--font-vazir", display: "swap" });

export const metadata: Metadata = {
  title: { absolute: faMeta.title },
  description: faMeta.description,
  keywords: faMeta.keywords,
  alternates: {
    canonical: "/fa",
    languages: { en: "/", fa: "/fa", "x-default": "/" },
  },
  openGraph: {
    type: "profile",
    title: faMeta.title,
    description: faMeta.description,
    url: "/fa",
    siteName: faMeta.name,
    locale: "fa_IR",
    alternateLocale: ["en_US"],
    firstName: "علی",
    lastName: "معرفتی",
    username: "marefati110",
  },
  twitter: { card: "summary_large_image", title: faMeta.title, description: faMeta.description },
};

const logos = Object.fromEntries(site.experience.map((c) => [c.id, { logo: c.logo, color: c.color }]));

export default function FaHome() {
  return (
    <div lang="fa" dir="rtl" className={`fa ${vazir.variable}`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={ldJson(faLd())} />
      <a className="skip" href="#main">
        رفتن به محتوا
      </a>
      <header className="fa-top">
        <div className="wrap fa-top-inner">
          <Link className="fa-mark" href="/fa">
            <span className="mark-badge" aria-hidden="true">
              AM
            </span>
            <span>{fa.name}</span>
          </Link>
          <nav aria-label="بخش‌ها" className="fa-nav">
            <a href="#work">{fa.nav.work}</a>
            <a href="#projects">{fa.nav.projects}</a>
            <a href="#skills">{fa.nav.skills}</a>
            <a href="#contact">{fa.nav.contact}</a>
          </nav>
          <Link className="fa-lang" href="/" hrefLang="en" lang="en">
            {fa.english}
          </Link>
        </div>
      </header>

      <main id="main">
        <section className="wrap fa-hero">
          <div>
            <p className="fa-hello">{fa.hello}</p>
            <h1>
              {fa.name} <span className="fa-latin" lang="en" dir="ltr">({site.hero.name})</span>
            </h1>
            <p className="fa-role">{fa.title}</p>
            <p className="fa-lede">{fa.lede}</p>
            <div className="fa-actions">
              <a className="btn" href={`mailto:${links.email}`}>
                {fa.email}
              </a>
              <a className="btn btn-ghost" href={CV_PATH} download>
                {fa.cv}
              </a>
            </div>
            <p className="fa-meta">{fa.location}</p>
          </div>
          <div className="fa-photo">
            <Image
              src="/profile.jpg"
              alt={`تصویر ${fa.name}`}
              width={640}
              height={640}
              preload
              sizes="(min-width: 960px) 360px, 70vw"
            />
          </div>
        </section>

        <section className="wrap" aria-label="نکات برجسته">
          <ul className="fa-stats">
            {fa.highlights.map((h) => (
              <li key={h.label}>
                <strong>{h.value}</strong>
                <span>{h.label}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="wrap fa-section" id="work" aria-labelledby="fa-work-h">
          <h2 id="fa-work-h">{fa.nav.work}</h2>
          <div className="fa-jobs">
            {fa.experience.map((c) => {
              const brand = logos[c.id];
              const cs = getCaseStudy(c.id);
              return (
                <article key={c.id} className="fa-card" style={{ "--c": brand?.color } as React.CSSProperties}>
                  <header className="fa-card-head">
                    {brand && <Image src={brand.logo} alt="" width={52} height={52} className="fa-logo" />}
                    <div>
                      <h3>
                        {c.name} <span className="fa-latin" lang="en" dir="ltr">{c.latin}</span>
                      </h3>
                      <p className="muted">{c.about}</p>
                    </div>
                  </header>
                  {c.roles.map((r) => (
                    <div key={r.title} className="fa-role-block">
                      <p className="fa-role-title">
                        <strong>{r.title}</strong>
                        <span className="muted">{r.dates}</span>
                      </p>
                      <ul>
                        {r.bullets.map((b) => (
                          <li key={b}>{b}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                  {cs && (
                    <Link className="fa-more" href={`/work/${cs.slug}`} hrefLang="en">
                      {fa.caseStudy}
                    </Link>
                  )}
                </article>
              );
            })}
          </div>
        </section>

        <section className="wrap fa-section" id="projects" aria-labelledby="fa-projects-h">
          <h2 id="fa-projects-h">{fa.nav.projects}</h2>
          <div className="fa-grid">
            {fa.projects.map((p) => (
              <article key={p.name} className="fa-card">
                <h3 lang="en" dir="ltr" className="fa-proj-name">
                  {p.name}
                </h3>
                <p className="muted fa-small">{p.meta}</p>
                <p>{p.description}</p>
                {p.link && (
                  <a className="fa-more" href={p.link.href} target="_blank" rel="noopener" dir="ltr">
                    {p.link.label}
                  </a>
                )}
              </article>
            ))}
          </div>
        </section>

        <section className="wrap fa-section" id="skills" aria-labelledby="fa-skills-h">
          <h2 id="fa-skills-h">{fa.nav.skills}</h2>
          <dl className="fa-skills">
            {fa.skills.map((s) => (
              <div key={s.group}>
                <dt>{s.group}</dt>
                <dd>{s.items}</dd>
              </div>
            ))}
            <div>
              <dt>{fa.education.title}</dt>
              <dd>
                {fa.education.degree}، {fa.education.school}
              </dd>
            </div>
          </dl>
        </section>

        <section className="wrap fa-section fa-contact" id="contact" aria-labelledby="fa-contact-h">
          <h2 id="fa-contact-h">{fa.contact.heading}</h2>
          <p>{fa.contact.lead}</p>
          <div className="fa-actions">
            <a className="btn" href={`mailto:${links.email}`}>
              {links.email}
            </a>
            <a className="btn btn-ghost" href={links.telegram} target="_blank" rel="me noopener">
              {fa.contact.telegram}
            </a>
            <a className="btn btn-ghost" href={links.linkedin} target="_blank" rel="me noopener">
              LinkedIn
            </a>
            <a className="btn btn-ghost" href={links.github} target="_blank" rel="me noopener">
              GitHub
            </a>
          </div>
        </section>
      </main>

      <footer className="wrap fa-footer">
        <span>
          © {new Date().getFullYear()} {fa.footer}
        </span>
        <span dir="ltr">marefati110.ir</span>
      </footer>
    </div>
  );
}
