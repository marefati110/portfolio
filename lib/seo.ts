// Structured data (schema.org JSON-LD). Every fact comes from content/site.ts or content/caseStudies.ts.
import type { CaseStudy } from "@/content/caseStudies";
import { fa, faMeta } from "@/content/fa";
import { links, site } from "@/content/site";

const PERSON_ID = `${links.site}/#person`;
const WEBSITE_ID = `${links.site}/#website`;

const current = site.experience.filter((c) => c.roles.some((r) => r.end === null));

/** Serialize for a <script type="application/ld+json"> tag without allowing `</script>` breakouts. */
export function ldJson(data: unknown) {
  return { __html: JSON.stringify(data).replace(/</g, "\\u003c") };
}

export function homeLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": PERSON_ID,
        name: site.hero.name,
        // Persian spelling so searches for «علی معرفتی» resolve to the same person.
        alternateName: [faMeta.name, "marefati110"],
        givenName: "Ali",
        familyName: "Marefati",
        jobTitle: site.hero.title,
        description: site.meta.description,
        url: links.site,
        image: `${links.site}/profile.jpg`,
        email: `mailto:${links.email}`,
        address: { "@type": "PostalAddress", addressLocality: "Tehran", addressCountry: "IR" },
        worksFor: current.map((c) => ({ "@type": "Organization", name: c.name, description: c.about })),
        alumniOf: { "@type": "CollegeOrUniversity", name: "Kharazmi University" },
        hasCredential: { "@type": "EducationalOccupationalCredential", name: site.education.degree },
        knowsLanguage: ["fa", "en"],
        knowsAbout: [
          "Artificial intelligence",
          "Large language models",
          "Retrieval-augmented generation",
          "AI agents",
          "Product leadership",
          "Engineering management",
          "TypeScript",
          "Node.js",
          "NestJS",
          "Go",
          "Next.js",
          "React",
          "PostgreSQL",
          "Elasticsearch",
          "Docker",
          "DevOps",
          "Technical SEO",
        ],
        sameAs: [links.github, links.linkedin, links.telegram],
      },
      {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        url: links.site,
        name: site.hero.name,
        alternateName: faMeta.name,
        description: site.meta.description,
        inLanguage: ["en", "fa"],
        publisher: { "@id": PERSON_ID },
      },
      {
        "@type": "ProfilePage",
        "@id": `${links.site}/#profile`,
        url: links.site,
        name: site.meta.title,
        inLanguage: "en",
        isPartOf: { "@id": WEBSITE_ID },
        mainEntity: { "@id": PERSON_ID },
      },
    ],
  };
}

export function caseStudyLd(cs: CaseStudy) {
  const url = `${links.site}/work/${cs.slug}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${url}#article`,
        headline: cs.title,
        description: cs.summary,
        url,
        mainEntityOfPage: url,
        image: `${url}/opengraph-image`,
        inLanguage: "en",
        author: { "@type": "Person", "@id": PERSON_ID, name: site.hero.name, url: links.site },
        publisher: { "@type": "Person", "@id": PERSON_ID, name: site.hero.name },
        about: { "@type": "Organization", name: cs.company, description: cs.companyAbout },
        keywords: cs.stack.join(", "),
        isPartOf: { "@id": WEBSITE_ID },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: links.site },
          { "@type": "ListItem", position: 2, name: "Work", item: `${links.site}/#work` },
          { "@type": "ListItem", position: 3, name: cs.company, item: url },
        ],
      },
    ],
  };
}

/** Persian profile page. Points at the same Person node as the English homepage. */
export function faLd() {
  const url = `${links.site}/fa`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfilePage",
        "@id": `${url}#profile`,
        url,
        name: faMeta.title,
        description: faMeta.description,
        inLanguage: "fa",
        isPartOf: { "@id": WEBSITE_ID },
        mainEntity: {
          "@type": "Person",
          "@id": PERSON_ID,
          name: fa.name,
          alternateName: site.hero.name,
          jobTitle: fa.title,
          url: links.site,
          image: `${links.site}/profile.jpg`,
          sameAs: [links.github, links.linkedin, links.telegram],
        },
      },
    ],
  };
}
