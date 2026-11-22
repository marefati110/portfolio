import Image from "next/image";
import Link from "next/link";
import { CV_PATH } from "@/components/SiteChrome";
import { socials } from "@/components/SocialLinks";
import { cookie, Icon } from "@/components/mobile/icons";
import { MobileNav, SkillTabs } from "@/components/mobile/MobileChrome";
import { getCaseStudy } from "@/content/caseStudies";
import { links, site } from "@/content/site";
import { metaChips, splitList } from "@/lib/text";

const tints = ["violet", "mint", "sun", "pink", "sky"] as const;
const avatarShape = cookie(12, 0.045);
const badgeShape = cookie(8, 0.09);

/**
 * The phone version of the homepage: a native-Android-style (Material 3 Expressive) app screen.
 * Rendered next to the desktop page and shown only below the mobile breakpoint.
 * IDs are prefixed with "m-" so they never clash with the desktop sections.
 */
export function MobileHome() {
  const d = site;
  const companies = d.experience.length;

  const actions = [
    { label: "Email", icon: <Icon name="mail" />, href: `mailto:${links.email}` },
    { label: "Ask AI", icon: <Icon name="sparkle" />, chat: true },
    { label: "CV", icon: <Icon name="download" />, href: CV_PATH, download: true },
    { label: "LinkedIn", icon: socials.find((s) => s.name === "LinkedIn")!.icon, href: links.linkedin, external: true },
  ];

  return (
    <div className="m-app">
      {/* ---------- Profile ---------- */}
      <section id="m-top" className="m-profile" aria-labelledby="m-name">
        <div className="m-avatar">
          <span className="m-avatar-shape" style={{ clipPath: avatarShape }} aria-hidden="true" />
          <Image
            src="/profile.jpg"
            alt={`Portrait of ${d.hero.name}`}
            width={320}
            height={320}
            sizes="168px"
            loading="eager"
            fetchPriority="high"
            className="m-avatar-img"
          />
          <span className="m-avatar-badge" style={{ clipPath: badgeShape }} aria-hidden="true">
            <Icon name="sparkle" size={20} />
          </span>
        </div>
        <p className="m-hello">{d.hero.hello}</p>
        <h1 id="m-name" className="m-name">
          {d.hero.name}
        </h1>
        <p className="m-role">{d.hero.title}</p>
        <p className="m-loc">
          <Icon name="pin" size={16} />
          {d.hero.location}
        </p>

        <ul className="m-actions" aria-label="Quick actions">
          {actions.map((a) => (
            <li key={a.label}>
              {a.chat ? (
                <button type="button" className="m-action" data-open-chat>
                  <span className="m-action-icon is-primary rp">{a.icon}</span>
                  {a.label}
                </button>
              ) : (
                <a
                  className="m-action"
                  href={a.href}
                  download={a.download || undefined}
                  target={a.external ? "_blank" : undefined}
                  rel={a.external ? "me noopener" : undefined}
                >
                  <span className="m-action-icon rp">{a.icon}</span>
                  {a.label}
                </a>
              )}
            </li>
          ))}
        </ul>
      </section>

      {/* ---------- Highlights ---------- */}
      <section className="m-section m-section-flush" aria-label="Highlights">
        <ul className="m-stats">
          {d.highlights.map((h, i) => (
            <li key={h.label} className={`tint-${tints[i % tints.length]}`}>
              <strong>{h.value}</strong>
              <span>{h.label}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="m-section" aria-labelledby="m-about-h">
        <div className="m-card m-about">
          <h2 id="m-about-h" className="m-overline">
            About
          </h2>
          <p>{d.hero.lede}</p>
        </div>
      </section>

      {/* ---------- Experience ---------- */}
      <section id="m-work" className="m-section" aria-labelledby="m-work-h">
        <header className="m-head">
          <h2 id="m-work-h">{d.sections.work}</h2>
          <p>
            {companies} companies · since {d.experience.at(-1)!.roles.at(-1)!.dates.split(" – ")[0]}
          </p>
        </header>

        <div className="m-companies">
          {d.experience.map((c, ci) => {
            const cs = getCaseStudy(c.id);
            const latest = c.roles[0];
            return (
              <details
                key={c.id}
                id={`m-${c.id}`}
                name="m-exp"
                className="m-company"
                open={ci === 0}
                style={{ "--c": c.color } as React.CSSProperties}
              >
                <summary className="rp">
                  <Image src={c.logo} alt="" width={52} height={52} className="m-logo" />
                  <span className="m-company-text">
                    <span className="m-company-name">{c.name}</span>
                    <span className="m-company-role">{latest.title}</span>
                    <span className={`m-date${latest.end === null ? " is-now" : ""}`}>{latest.dates}</span>
                  </span>
                  <span className="m-expand" aria-hidden="true">
                    <Icon name="chevron" />
                  </span>
                </summary>
                <div className="m-company-body">
                  <p className="m-company-about">{c.about}</p>
                  <ol className="m-roles">
                    {c.roles.map((r) => (
                      <li key={r.title}>
                        <h3>{r.title}</h3>
                        <p className={`m-date${r.end === null ? " is-now" : ""}`}>{r.dates}</p>
                        <ul>
                          {r.bullets.map((b) => (
                            <li key={b}>{b}</li>
                          ))}
                        </ul>
                      </li>
                    ))}
                  </ol>
                  {cs && (
                    <Link className="m-case rp" href={`/work/${cs.slug}`}>
                      <span>
                        <small>Case study</small>
                        {cs.title}
                      </span>
                      <Icon name="forward" size={20} />
                    </Link>
                  )}
                </div>
              </details>
            );
          })}
        </div>
      </section>

      {/* ---------- Projects ---------- */}
      <section id="m-projects" className="m-section m-section-flush" aria-labelledby="m-projects-h">
        <header className="m-head m-pad">
          <h2 id="m-projects-h">{d.sections.projects}</h2>
          <p>Swipe to see all {d.projects.length}</p>
        </header>
        <ul className="m-carousel">
          {d.projects.map((p, i) => (
            <li key={p.name} className={`m-project tint-${tints[i % tints.length]}`}>
              <span className="m-project-mono" aria-hidden="true">
                {p.name[0]}
              </span>
              <h3>{p.name}</h3>
              <p>{p.description}</p>
              <ul className="m-tags" aria-label="Details">
                {metaChips(p.meta).map((m) => (
                  <li key={m}>{m}</li>
                ))}
              </ul>
              {p.link && (
                <a className="m-project-link rp" href={p.link.href} target="_blank" rel="noopener">
                  {p.link.label}
                  <Icon name="outward" size={18} />
                </a>
              )}
            </li>
          ))}
        </ul>

        <h3 className="m-subhead m-pad">{d.sections.openSource}</h3>
        <ul className="m-list m-pad">
          {d.openSource.map((p) => (
            <li key={p.name}>
              <a className="m-list-item rp" href={p.link?.href} target="_blank" rel="noopener">
                <span className="m-list-icon" style={{ "--brand": "#181717" } as React.CSSProperties}>
                  <Icon name="code" size={22} />
                </span>
                <span className="m-list-text">
                  <strong>{p.name}</strong>
                  <span>{p.description}</span>
                  <span className="m-list-meta">
                    {p.meta.includes("stars") && <Icon name="star" size={14} />}
                    {p.meta}
                  </span>
                </span>
                <span className="m-list-trail" aria-hidden="true">
                  <Icon name="outward" size={20} />
                </span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      {/* ---------- Skills ---------- */}
      <section id="m-skills" className="m-section" aria-labelledby="m-skills-h">
        <header className="m-head">
          <h2 id="m-skills-h">{d.sections.skills}</h2>
          <p>Tap a group</p>
        </header>
        <SkillTabs groups={d.skills.map((s) => ({ group: s.group, items: splitList(s.items) }))} />
        <div className="m-list-item m-edu">
          <span className="m-list-icon" style={{ "--brand": "#5b3df5" } as React.CSSProperties}>
            <Icon name="school" size={22} />
          </span>
          <span className="m-list-text">
            <span className="m-list-meta">{d.sections.education}</span>
            <strong>{d.education.degree}</strong>
            <span>{d.education.school}</span>
          </span>
        </div>
      </section>

      {/* ---------- Contact ---------- */}
      <section id="m-contact" className="m-section" aria-labelledby="m-contact-h">
        <div className="m-contact">
          <h2 id="m-contact-h">Let&apos;s build something.</h2>
          <p>{d.contact.lead}</p>
          <a className="m-btn rp" href={`mailto:${links.email}`}>
            <Icon name="mail" size={20} />
            {d.hero.email}
          </a>
        </div>

        <ul className="m-list m-list-group">
          {socials
            .filter((s) => s.name !== "Email")
            .map((s) => (
              <li key={s.name}>
                <a
                  className="m-list-item rp"
                  href={s.href}
                  target="_blank"
                  rel="me noopener"
                  style={{ "--brand": s.brand } as React.CSSProperties}
                >
                  <span className="m-list-icon">{s.icon}</span>
                  <span className="m-list-text">
                    <strong>{s.name}</strong>
                    <span>{s.handle}</span>
                  </span>
                  <span className="m-list-trail" aria-hidden="true">
                    <Icon name="outward" size={20} />
                  </span>
                </a>
              </li>
            ))}
          <li>
            <a className="m-list-item rp" href={CV_PATH} download style={{ "--brand": "#12b892" } as React.CSSProperties}>
              <span className="m-list-icon">
                <Icon name="download" size={22} />
              </span>
              <span className="m-list-text">
                <strong>{d.contact.downloadCv}</strong>
                <span>PDF</span>
              </span>
            </a>
          </li>
        </ul>
      </section>

      <MobileNav />
    </div>
  );
}
