import Link from "next/link";
import { ChatDock } from "@/components/ChatDock";
import { MobileAppBar, MobileFab } from "@/components/mobile/MobileChrome";
import { SocialLinks } from "@/components/SocialLinks";
import { links, site } from "@/content/site";

export const CV_PATH = "/cv/ali-marefati-cv.pdf";

/**
 * Top bar shared by every page. Section links point at the homepage anchors.
 * On phones it is replaced by a Material-style app bar: `title` + back arrow on detail pages.
 */
export function SiteHeader({ title }: { title?: string } = {}) {
  const d = site;
  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <header className="topbar">
        <div className="topbar-inner wrap">
          <Link className="mark" href="/">
            <span className="mark-badge" aria-hidden="true">
              AM
            </span>
            <span>{d.hero.name}</span>
          </Link>
          <nav aria-label="Sections">
            <Link href="/#work">{d.nav.work}</Link>
            <Link href="/#projects">{d.nav.projects}</Link>
            <Link href="/#skills">{d.nav.skills}</Link>
            <Link href="/#contact">{d.nav.contact}</Link>
          </nav>
          <a className="btn btn-small" href={CV_PATH} download>
            {d.nav.cv}
          </a>
        </div>
      </header>
      <MobileAppBar variant={title ? "detail" : "home"} title={title ?? d.hero.name} cvPath={CV_PATH} />
    </>
  );
}

/** Logo, a short line and the social profile links. */
export function SocialCard() {
  const d = site;
  return (
    <div className="footer-card">
      <div className="footer-intro">
        <Link className="mark" href="/">
          <span className="mark-badge" aria-hidden="true">
            AM
          </span>
          <span>{d.hero.name}</span>
        </Link>
        <p>Find me around the internet. Say hi anywhere, I read everything.</p>
      </div>
      <SocialLinks />
    </div>
  );
}

/**
 * Footer and the "Ask AI" chat panel, shared by every page.
 * Pass socials={false} when the page already shows <SocialCard /> elsewhere.
 */
export function SiteFooter({ socials = true }: { socials?: boolean }) {
  const d = site;
  return (
    <>
      <ChatDock
        name={d.hero.name}
        status={d.chat.status}
        greeting={d.chat.greeting}
        placeholder={d.chat.placeholder}
        suggestions={d.chat.suggestions}
        note={d.chat.note}
        email={links.email}
      />
      <MobileFab />
      <footer className="footer wrap">
        {socials && <SocialCard />}
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} {d.footer}
          </span>
          <Link href="/fa" hrefLang="fa" lang="fa">
            نسخه فارسی · علی معرفتی
          </Link>
          <span>marefati110.ir</span>
        </div>
      </footer>
    </>
  );
}
