// All resume content for the site (English only).
// Source of truth: /home/ali/w/cv/versions/master.html.
// Keep this file in sync when the CV changes. Never add facts that are not in the CV.

/** Year-month as [year, month 1-12]; null end means "present". */
export type YM = [number, number];

export const links = {
  email: "marefati110@gmail.com",
  github: "https://github.com/marefati110",
  linkedin: "https://www.linkedin.com/in/ali-marefati-749499177/",
  site: "https://marefati110.ir",
};

type Role = {
  title: string;
  /** Short label for the career chart. */
  short: string;
  dates: string;
  start: YM;
  end: YM | null;
  bullets: string[];
};

type Company = {
  id: string;
  /** Brand color taken from the company's logo. */
  color: string;
  name: string;
  about: string;
  logo: string;
  roles: Role[];
};

type Project = {
  name: string;
  meta: string;
  description: string;
  link?: { label: string; href: string };
};

export type Dictionary = {
  meta: { title: string; description: string };
  nav: {
    work: string;
    projects: string;
    skills: string;
    contact: string;
    cv: string;
  };
  hero: {
    hello: string;
    name: string;
    title: string;
    lede: string;
    location: string;
    spanCaption: string;
    present: string;
    email: string;
    stickers: { value: string; label: string }[];
  };
  chat: {
    title: string;
    intro: string;
    note: string;
    status: string;
    typing: string;
    greeting: string;
    qa: { q: string; a: string }[];
  };
  /** Axis ticks for the career chart: [label, position]. */
  ticks: { label: string; at: YM }[];
  sections: {
    work: string;
    projects: string;
    openSource: string;
    skills: string;
    education: string;
    contact: string;
  };
  experience: Company[];
  projects: Project[];
  openSource: Project[];
  skills: { group: string; items: string }[];
  education: { degree: string; school: string };
  contact: { lead: string; github: string; linkedin: string; downloadCv: string };
  footer: string;
};

// Career chart spans from the first job to "now".
export const timelineStart: YM = [2019, 12];

const en: Dictionary = {
  meta: {
    title: "Ali Marefati — CTO, AI Engineer & Product Leader",
    description:
      "Ali Marefati, CTO of Ahanonline and Tech Lead of Gereft. 7+ years building products and teams, and shipping AI in production.",
  },
  nav: {
    work: "Experience",
    projects: "Projects",
    skills: "Skills",
    contact: "Contact",
    cv: "Download CV",
  },
  hero: {
    hello: "Hi, I'm",
    name: "Ali Marefati",
    title: "AI Engineer & Product Leader",
    lede:
      "Technology leader with 7+ years building products and teams that move business metrics. CTO of Ahanonline, Iran's largest online steel retailer, where we cut technology costs by up to 80% and shipped RAG-based AI. Built its B2B marketplace Gereft into a platform for 700 suppliers and 10K purchase requests a month. Earlier took a SaaS for physicians from zero to 150+ customers single-handedly.",
    location: "Tehran, Iran",
    spanCaption: "Career from December 2019 to today. The Gereft and Ahanonline roles run concurrently.",
    present: "Present",
    email: "Send an email",
    stickers: [
      { value: "−80%", label: "technology costs" },
      { value: "30×", label: "operations throughput" },
      { value: "150+", label: "paying physicians" },
    ],
  },
  chat: {
    title: "Got a question?",
    intro: "Here are answers to a few common questions. Pick one.",
    note: "I wrote these answers myself, ahead of time.",
    status: "Usually replies to email within a day",
    typing: "Typing",
    greeting: "Hi! I'm Ali. What would you like to know about my work?",
    qa: [
      {
        q: "Where do you work now?",
        a: "I'm CTO of Ahanonline, Iran's largest online steel retailer, leading a 7–10 person technology team. I'm also Tech Lead of Gereft, Ahanonline's B2B steel marketplace.",
      },
      {
        q: "What result are you proudest of?",
        a: "At Gereft, by redesigning and automating the business workflows, the same 3-person operations team went from handling 10 purchase requests a day to 300+. At Ahanonline we cut technology costs by up to 80%.",
      },
      {
        q: "What have you built with AI?",
        a: "At Gereft, phone calls are transcribed with ElevenLabs, analyzed with GPT and routed to suppliers automatically. At Ahanonline we launched a RAG-based support chatbot, and an LLM reviews every merge request.",
      },
      {
        q: "Do you have your own products?",
        a: "Yes. I built Wahi, a WhatsApp team inbox that 3 companies bought. Chenin is my own business: a platform of tested prompts for AI images and video. Morcheh is an open-source private cloud.",
      },
      {
        q: "How can I reach you?",
        a: "Email marefati110@gmail.com. My LinkedIn and GitHub are at the bottom of the page.",
      },
    ],
  },
  ticks: [
    { label: "2020", at: [2020, 1] },
    { label: "2021", at: [2021, 1] },
    { label: "2022", at: [2022, 1] },
    { label: "2023", at: [2023, 1] },
    { label: "2024", at: [2024, 1] },
    { label: "2025", at: [2025, 1] },
    { label: "2026", at: [2026, 1] },
  ],
  sections: {
    work: "Experience",
    projects: "Projects",
    openSource: "Open source",
    skills: "Skills",
    education: "Education",
    contact: "Contact",
  },
  experience: [
    {
      id: "ahanonline",
      color: "#C4122F",
      name: "Ahanonline",
      about: "Iran's largest online steel retailer and #1 steel website",
      logo: "/logos/ahanonline.jpg",
      roles: [
        {
          title: "Chief Technology Officer (CTO)",
          short: "CTO",
          dates: "Mar 2025 – Present",
          start: [2025, 3],
          end: null,
          bullets: [
            "Lead a 7–10 person technology team, driving business workflows directly with the CEO and founders, leading LLM/AI adoption and coordinating SEO, product, infrastructure and network teams.",
            "Cut technology costs by up to 80% through CDN optimization, server and compute cost reduction, and redesigned business workflows.",
            "Built an AI customer-support chatbot with RAG (n8n, OpenAI, pgvector, Elasticsearch) and LLM-generated SEO content, increasing purchase-request submissions.",
            "Kept the platform fully online during the 2025 war, reachable from inside Iran and abroad, while hardening security against attacks.",
            "Fully automated delivery with CI/CD on self-hosted GitLab and Docker Swarm, with LLM-based review of every merge request that flags security issues and bugs as MR comments.",
          ],
        },
        {
          title: "Software Engineer",
          short: "Software Engineer",
          dates: "Mar 2024 – Feb 2025",
          start: [2024, 3],
          end: [2025, 2],
          bullets: [
            "Cut outages from several per day to near zero by stabilizing the legacy platform through code cleanup and performance optimization.",
            "Owned DevOps, security hardening and technical SEO for the SEO-critical website: brought all Core Web Vitals to green and kept #1 Google rankings on core keywords while organic traffic grew.",
          ],
        },
      ],
    },
    {
      id: "gereft",
      color: "#F26722",
      name: "Gereft",
      about: "Ahanonline's B2B steel marketplace, concurrent role",
      logo: "/logos/gereft.png",
      roles: [
        {
          title: "Tech Lead",
          short: "Tech Lead",
          dates: "May 2023 – Present",
          start: [2023, 5],
          end: null,
          bullets: [
            "Led a full rewrite of the marketplace in 3 months (Next.js, NestJS), then grew it over 2 years to 700 suppliers and ~10,000 purchase requests/month.",
            "Scaled purchase-request handling 30× (10 → 300+/day) with the same 3-person operations team by redesigning business workflows and automating them on the new platform.",
            "Shipped the company's first production AI: an LLM pipeline that transcribes calls (ElevenLabs speech-to-text), indexes them in Elasticsearch, extracts and classifies requests with OpenAI GPT models and auto-routes them to suppliers, plus AI follow-up of every purchase request, all orchestrated on n8n.",
            "Built and led a 4-person engineering team (interviewed, hired 3 engineers, negotiated salaries), reporting directly to the CEO and designing business workflows with the product manager.",
          ],
        },
      ],
    },
    {
      id: "doctop",
      color: "#1D5FD0",
      name: "Doctop",
      about: "Subscription software for physicians",
      logo: "/logos/doctop.jpg",
      roles: [
        {
          title: "Full Stack Developer",
          short: "Full stack",
          dates: "Jun 2021 – Apr 2023",
          start: [2021, 6],
          end: [2023, 4],
          bullets: [
            "Took a subscription SaaS for physicians (online consultation, chat, booking, doctor websites) from idea to 150+ paying physicians in 12 months.",
            "Sole product and engineering owner, working directly with the CEO: requirements, business workflows, UX/UI design, architecture and delivery.",
          ],
        },
        {
          title: "Back End Developer",
          short: "Back end",
          dates: "Dec 2019 – Jun 2021",
          start: [2019, 12],
          end: [2021, 6],
          bullets: [
            "Drove the re-architecture of the backend from Strapi to NestJS and optimized the database, improving overall system performance up to 5×; translated business needs into feature and business-logic design with the product team.",
          ],
        },
      ],
    },
  ],
  projects: [
    {
      name: "Chenin",
      meta: "Founder, personal business",
      description:
        "A Persian platform for discovering and sharing tested AI image and video prompts, each shown with its real output and filterable by model, category and mood (Midjourney, DALL·E 3, Flux, Stable Diffusion).",
      link: { label: "chenin.app", href: "https://chenin.app/" },
    },
    {
      name: "Wahi",
      meta: "Self-hosted · PostgreSQL, S3, REST API",
      description:
        "Sold to 3 companies: a team inbox that lets many agents serve customers through one WhatsApp number, with chat assignment, internal notes, quick replies, throttled broadcasts, agent reports and an API.",
      link: { label: "wahi.marefati110.ir", href: "http://wahi.marefati110.ir/" },
    },
    {
      name: "Morcheh",
      meta: "Open source · Go, PostgreSQL, Redis, Next.js",
      description:
        "Open-source private cloud that installs on an organization's own servers and runs servers, databases (6 engines), storage, DNS, backups, Ansible automation and role-based team access from one panel.",
      link: { label: "morche.cloud", href: "https://morche.cloud/" },
    },
    {
      name: "Secure Call",
      meta: "VoIP · Issabel, FreePBX",
      description:
        "A secure one-to-one calling system that integrates with Issabel and FreePBX VoIP servers to set up protected calls between two parties.",
    },
    {
      name: "Sangehassan",
      meta: "Next.js · Persian, English, Arabic",
      description:
        "Developed the trilingual website and verified-supplier marketplace for a natural-stone quarry and export business, covering products, price list, sample requests and export enquiries.",
      link: { label: "sangehassan.com", href: "https://sangehassan.com/" },
    },
  ],
  openSource: [
    {
      name: "n8n-nodes-dynamics365",
      meta: "TypeScript, n8n, Dynamics 365 Web API",
      description:
        "n8n nodes for on-premises Microsoft Dynamics 365, usable as an AI agent tool; NTLMv2 auth built from scratch.",
      link: {
        label: "github.com/marefati110/n8n-nodes-dynamics365",
        href: "https://github.com/marefati110/n8n-nodes-dynamics365",
      },
    },
    {
      name: "strapi-plugin-elastic",
      meta: "JavaScript, Strapi, Elasticsearch · 58 stars",
      description: "Keeps the Strapi CMS database in sync with Elasticsearch to power full-text search.",
      link: {
        label: "github.com/marefati110/strapi-plugin-elastic",
        href: "https://github.com/marefati110/strapi-plugin-elastic",
      },
    },
  ],
  skills: [
    {
      group: "Leadership & product",
      items:
        "Team building & hiring, working with CEO & founders, product design, business workflow design, cross-team coordination (SEO, product, infrastructure, network)",
    },
    {
      group: "AI & LLMs, in production",
      items:
        "LLM integration (OpenAI GPT API), prompt engineering, AI agents & tools (n8n), speech-to-text (ElevenLabs), RAG & AI chatbots (pgvector, Elasticsearch), LLM pipelines over call transcripts, LLM-based code review",
    },
    { group: "Backend", items: "TypeScript, Node.js, NestJS, Go, Strapi; familiar with Python" },
    { group: "Frontend", items: "Next.js, React" },
    {
      group: "Data & messaging",
      items:
        "PostgreSQL (high availability, tuning, monitoring), pgvector, MongoDB, MySQL, Elasticsearch, Redis, BullMQ, RabbitMQ",
    },
    {
      group: "DevOps & security",
      items:
        "Docker, Docker Swarm, CI/CD, self-hosted GitLab, Cloudflare (CDN, WAF, DNS), Iranian cloud providers, bare-metal servers, infrastructure cost optimization, security hardening, attack mitigation, technical SEO",
    },
    { group: "Languages", items: "Persian (native), English (advanced)" },
  ],
  education: { degree: "B.Sc. in Computer Science", school: "Kharazmi University, Tehran" },
  contact: {
    lead: "For collaboration, advisory work or a conversation about a product, send an email.",
    github: "GitHub",
    linkedin: "LinkedIn",
    downloadCv: "Download CV (PDF)",
  },
  footer: "Ali Marefati",
};

export const site = en;
