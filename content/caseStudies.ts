// Case studies. Every fact here comes from the CV (~/w/cv/versions/master.html)
// and the raw notes in ~/w/cv/CLAUDE.md. Do not add numbers or claims that are not there.

export type CaseStudy = {
  slug: string;
  company: string;
  companyAbout: string;
  color: string;
  logo: string;
  role: string;
  period: string;
  title: string;
  summary: string;
  stats: { value: string; label: string }[];
  sections: { heading: string; paragraphs?: string[]; bullets?: string[]; diagram?: "call-pipeline" }[];
  stack: string[];
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "gereft",
    company: "Gereft",
    companyAbout: "Ahanonline's B2B steel marketplace",
    color: "#F26722",
    logo: "/logos/gereft.png",
    role: "Tech Lead",
    period: "May 2023 – Present",
    title: "Rebuilding a B2B steel marketplace and scaling it 30×",
    summary:
      "I rewrote Gereft in three months, redesigned its business workflows and shipped the company's first production AI. Two years later the same three-person operations team handles 30 times more purchase requests.",
    stats: [
      { value: "30×", label: "purchase requests handled per day" },
      { value: "700", label: "suppliers on the platform" },
      { value: "~10K", label: "purchase requests a month" },
      { value: "3 mo", label: "for the full rewrite" },
    ],
    sections: [
      {
        heading: "The starting point",
        paragraphs: [
          "Gereft is the B2B steel marketplace of Ahanonline, Iran's largest online steel retailer. It connects buyers who need steel with suppliers who can deliver it.",
          "When I started, three operations specialists could process about 10 purchase requests a day. The existing system could not keep up with where the business wanted to go.",
        ],
      },
      {
        heading: "What I did",
        bullets: [
          "Rewrote the whole platform, front end and back end, in 3 months: Next.js for the front end and NestJS for the back end. Gereft-specific features were then built on the new base.",
          "Redesigned the business workflows together with the CEO and the product manager, and implemented every workflow and all business logic on the new platform.",
          "Automated the manual steps of these workflows on the new platform.",
          "Built the engineering team: interviewed and hired 3 engineers, negotiated salaries, and led the 4-person team, reporting directly to the CEO.",
        ],
      },
      {
        heading: "The company's first production AI",
        paragraphs: [
          "Every call on the company phone line becomes structured work. Calls are transcribed with ElevenLabs, indexed in Elasticsearch, and analyzed with OpenAI GPT models that extract and classify the purchase request and route it to the right suppliers. Follow-up of every purchase request is automated with AI as well. The whole flow is orchestrated on n8n.",
        ],
        diagram: "call-pipeline",
      },
      {
        heading: "The result",
        paragraphs: [
          "Over two years, the same three-person operations team went from about 10 to more than 300 purchase requests a day. Most of that growth came from business decisions and automation, made possible by having the right software underneath.",
          "Today Gereft works with 700 suppliers and handles around 10,000 purchase requests a month.",
        ],
      },
    ],
    stack: ["Next.js", "NestJS", "n8n", "OpenAI GPT", "ElevenLabs", "Elasticsearch"],
  },
  {
    slug: "ahanonline",
    company: "Ahanonline",
    companyAbout: "Iran's largest online steel retailer and #1 steel website",
    color: "#C4122F",
    logo: "/logos/ahanonline.jpg",
    role: "Software Engineer, then CTO",
    period: "Mar 2024 – Present",
    title: "Cutting technology costs by up to 80% at Iran's largest online steel retailer",
    summary:
      "I joined Ahanonline to stabilize an SEO-critical platform that went down several times a day, and a year later became its CTO. We cut technology costs by up to 80%, kept the site online through the 2025 war and brought AI into sales and support.",
    stats: [
      { value: "−80%", label: "technology costs" },
      { value: "~0", label: "outages, down from several a day" },
      { value: "#1", label: "Google rankings kept on core keywords" },
      { value: "7–10", label: "people in the technology team" },
    ],
    sections: [
      {
        heading: "The starting point",
        paragraphs: [
          "Ahanonline is the number one steel website in Iran and the country's largest online steel seller. The website is highly sensitive to SEO, so it has to stay fast, secure and highly ranked.",
          "When I joined in 2024, the codebase was messy and the platform was unstable, with several outages a day.",
        ],
      },
      {
        heading: "Stabilizing the platform",
        bullets: [
          "Cleaned up the code and optimized performance, which took outages from several a day to near zero.",
          "Owned DevOps, security hardening and technical SEO for the whole company.",
          "Brought all Core Web Vitals to green and kept the #1 Google rankings on core keywords while organic traffic grew.",
        ],
      },
      {
        heading: "Leading technology as CTO",
        paragraphs: [
          "Since March 2025 I lead a 7–10 person technology team. I drive business workflows directly with the CEO and the founders and coordinate the SEO, product, infrastructure and network teams.",
        ],
        bullets: [
          "Cut technology costs by up to 80% through CDN optimization, lower server and compute costs, and redesigned business workflows, on a mix of Cloudflare, Iranian cloud providers and bare-metal servers.",
          "Kept the platform fully online during the 2025 war, reachable from inside Iran and abroad, while hardening it against attacks.",
          "Fully automated delivery with CI/CD on self-hosted GitLab and Docker Swarm. An LLM reviews every merge request and posts security issues and bugs as comments.",
        ],
      },
      {
        heading: "AI in sales and support",
        paragraphs: [
          "We launched an AI customer-support chatbot built on RAG (n8n, OpenAI, pgvector, Elasticsearch) and started producing SEO content with LLMs. Together they increased purchase-request submissions.",
        ],
      },
    ],
    stack: [
      "Docker Swarm",
      "GitLab CI/CD",
      "Cloudflare",
      "PostgreSQL",
      "pgvector",
      "Elasticsearch",
      "n8n",
      "OpenAI",
    ],
  },
  {
    slug: "doctop",
    company: "Doctop",
    companyAbout: "Subscription software for physicians",
    color: "#1D5FD0",
    logo: "/logos/doctop.jpg",
    role: "Back End, then Full Stack Developer",
    period: "Dec 2019 – Apr 2023",
    title: "Taking a SaaS for physicians from idea to 150+ paying customers",
    summary:
      "After re-architecting Doctop's back end, I worked directly with the CEO and, as the sole product and engineering owner, built a subscription product for physicians that reached 150+ paying customers in a year.",
    stats: [
      { value: "150+", label: "paying physicians" },
      { value: "12 mo", label: "from idea to 150+ customers" },
      { value: "5×", label: "better overall system performance" },
    ],
    sections: [
      {
        heading: "Re-architecting the back end",
        paragraphs: [
          "The whole back end ran on Strapi. I moved it to NestJS and optimized the database, which improved overall system performance by up to five times. Along the way I worked with the product team to turn business needs into features and business logic.",
        ],
      },
      {
        heading: "Building the product, alone",
        paragraphs: [
          "From 2021 I worked directly with the CEO on a new subscription product for physicians: online consultation, chat, appointment booking and a personal website for every doctor.",
          "For a full year I was the only person on product and engineering: requirements, business workflows, UX and UI design, architecture and delivery.",
        ],
      },
      {
        heading: "The result",
        paragraphs: ["The product went from an idea to more than 150 paying physicians in 12 months."],
      },
    ],
    stack: ["NestJS", "Strapi"],
  },
];

export const getCaseStudy = (slug: string) => caseStudies.find((c) => c.slug === slug);
