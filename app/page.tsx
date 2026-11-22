import Link from "next/link";
import Image from "next/image";
import { CV_PATH as CV, SiteFooter, SiteHeader, SocialCard } from "@/components/SiteChrome";
import { CareerSpan } from "@/components/CareerSpan";
import { getCaseStudy } from "@/content/caseStudies";
import { links, site, type YM } from "@/content/site";

/** Split "a, b (c, d), e" on top-level commas only. */
function splitList(text: string) {
  const out: string[] = [];
  let depth = 0;
  let cur = "";
  for (const ch of text) {
    if (ch === "(") depth++;
    if (ch === ")") depth--;
    if ((ch === "," || ch === ";") && depth === 0) {
      out.push(cur.trim());
      cur = "";
    } else cur += ch;
  }
  if (cur.trim()) out.push(cur.trim());
  return out;
}

/** "Open source · Go, PostgreSQL" -> ["Open source", "Go", "PostgreSQL"] */
const metaChips = (meta: string) => meta.split(" · ").flatMap(splitList);

const projectTints = ["violet", "mint", "sun", "pink", "sky"] as const;

export default function Home() {
  // Static page: "now" is the build date. Rebuild to move the chart forward.
  const today = new Date();
  const now: YM = [today.getFullYear(), today.getMonth() + 1];
  const d = site;

  const personLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: d.hero.name,
    jobTitle: d.hero.title,
    description: d.meta.description,
    url: links.site,
    image: `${links.site}/profile.jpg`,
    email: `mailto:${links.email}`,
    address: { "@type": "PostalAddress", addressLocality: "Tehran", addressCountry: "IR" },
    sameAs: [links.github, links.linkedin, links.telegram],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd).replace(/</g, "\\u003c") }}
      />
      <SiteHeader />

      <main id="main">
        <section className="hero wrap" id="top">
          <div className="hero-text">
            <p className="hello">{d.hero.hello}</p>
            <h1>{d.hero.name}</h1>
            <p className="role">{d.hero.title}</p>
            <p className="lede">{d.hero.lede}</p>
            <div className="hero-actions">
              <a className="btn" href={`mailto:${links.email}`}>
                {d.hero.email}
              </a>
              <button type="button" className="btn btn-ghost" data-open-chat>
                Ask my AI assistant
              </button>
            </div>
            <p className="hero-meta">
              <span className="pin" aria-hidden="true" />
              {d.hero.location}
            </p>
          </div>

          <div className="hero-visual">
            <div className="photo-frame">
              <Image
                src="/profile.jpg"
                alt={`Portrait of ${d.hero.name}`}
                width={640}
                height={640}
                priority
                sizes="(min-width: 960px) 420px, 80vw"
              />
            </div>
          </div>
        </section>

        <section className="wrap timeline" aria-label="Career timeline">
          <CareerSpan now={now} />
        </section>

        <section id="work" className="section wrap" aria-labelledby="work-h">
          <h2 id="work-h" className="section-title">
            {d.sections.work}
          </h2>
          <div className="companies">
            {d.experience.map((c) => (
              <article
                className="company"
                id={c.id}
                key={c.id}
                style={{ "--c": c.color } as React.CSSProperties}
              >
                <header className="company-head">
                  <Image src={c.logo} alt="" width={56} height={56} className="logo" />
                  <div>
                    <h3>{c.name}</h3>
                    <p>{c.about}</p>
                    {(() => {
                      const cs = getCaseStudy(c.id);
                      return (
                        cs && (
                          <Link className="case-link" href={`/work/${cs.slug}`}>
                            <span className="case-link-label">Read the case study</span>
                            <span className="case-link-title">{cs.title}</span>
                            <span className="case-link-arrow" aria-hidden="true">
                              <svg viewBox="0 0 24 24" width="16" height="16">
                                <path
                                  d="M5 12h13M13 6l6 6-6 6"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2.4"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </span>
                          </Link>
                        )
                      );
                    })()}
                  </div>
                </header>
                <ol className="roles">
                  {c.roles.map((r) => (
                    <li className="role-item" key={r.title}>
                      <div className="role-top">
                        <h4>{r.title}</h4>
                        <span className={`dates${r.end === null ? " is-now" : ""}`}>{r.dates}</span>
                      </div>
                      <ul>
                        {r.bullets.map((b) => (
                          <li key={b}>{b}</li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ol>
              </article>
            ))}
          </div>
        </section>

        <section id="projects" className="section wrap" aria-labelledby="projects-h">
          <h2 id="projects-h" className="section-title">
            {d.sections.projects}
          </h2>
          <ul className="projects">
            {d.projects.map((p, i) => (
              <li key={p.name} className={`project tint-${projectTints[i % projectTints.length]}`}>
                <h3>{p.name}</h3>
                <p className="project-desc">{p.description}</p>
                <ul className="chips" aria-label="Details">
                  {metaChips(p.meta).map((m) => (
                    <li key={m}>{m}</li>
                  ))}
                </ul>
                {p.link && (
                  <a className="project-link" href={p.link.href}>
                    {p.link.label}
                  </a>
                )}
              </li>
            ))}
          </ul>

          <h3 className="sub-title">{d.sections.openSource}</h3>
          <ul className="oss">
            {d.openSource.map((p) => (
              <li key={p.name}>
                <a href={p.link?.href} className="oss-name">
                  {p.name}
                </a>
                <p>{p.description}</p>
                <ul className="chips">
                  {metaChips(p.meta).map((m) => (
                    <li key={m}>{m}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </section>

        <section id="skills" className="section wrap" aria-labelledby="skills-h">
          <h2 id="skills-h" className="section-title">
            {d.sections.skills}
          </h2>
          <dl className="skills">
            {d.skills.map((s) => (
              <div key={s.group}>
                <dt>{s.group}</dt>
                <dd>
                  <ul className="chips chips-lg">
                    {splitList(s.items).map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </dd>
              </div>
            ))}
            <div>
              <dt>{d.sections.education}</dt>
              <dd>
                <ul className="chips chips-lg">
                  <li>
                    {d.education.degree}, {d.education.school}
                  </li>
                </ul>
              </dd>
            </div>
          </dl>
        </section>

        <section className="wrap socials-section" aria-label="Social links">
          <SocialCard />
        </section>

        <section id="contact" className="wrap" aria-labelledby="contact-h">
          <div className="contact">
            <h2 id="contact-h">Let&apos;s build something.</h2>
            <p>{d.contact.lead}</p>
            <a className="contact-mail" href={`mailto:${links.email}`}>
              {links.email}
            </a>
            <div className="contact-links">
              <a href={links.linkedin} rel="me">
                {d.contact.linkedin}
              </a>
              <a href={links.github} rel="me">
                {d.contact.github}
              </a>
              <a href={CV} download>
                {d.contact.downloadCv}
              </a>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter socials={false} />
    </>
  );
}
