import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import { links, site } from "@/content/site";
import "./globals.css";
import "./mobile.css";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#f6f7fc",
};

export const metadata: Metadata = {
  metadataBase: new URL(links.site),
  title: { default: site.meta.title, template: `%s — ${site.hero.name}` },
  description: site.meta.description,
  applicationName: site.hero.name,
  keywords: [
    "Ali Marefati",
    "علی معرفتی",
    "marefati110",
    "CTO",
    "AI Engineer",
    "Product Leader",
    "Tech Lead",
    "Ahanonline",
    "Gereft",
    "LLM",
    "RAG",
    "Node.js",
    "NestJS",
    "Next.js",
    "Tehran",
  ],
  authors: [{ name: site.hero.name, url: links.site }],
  creator: site.hero.name,
  publisher: site.hero.name,
  category: "technology",
  alternates: {
    canonical: "/",
    languages: { en: "/", fa: "/fa", "x-default": "/" },
  },
  openGraph: {
    type: "profile",
    title: site.meta.title,
    description: site.meta.description,
    url: "/",
    siteName: site.hero.name,
    locale: "en_US",
    alternateLocale: ["fa_IR"],
    firstName: "Ali",
    lastName: "Marefati",
    username: "marefati110",
  },
  twitter: { card: "summary_large_image", title: site.meta.title, description: site.meta.description },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  formatDetection: { telephone: false, address: false, email: false },
  ...(process.env.GOOGLE_SITE_VERIFICATION && {
    verification: { google: process.env.GOOGLE_SITE_VERIFICATION },
  }),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={bricolage.variable} data-scroll-behavior="smooth">
      <body>{children}</body>
    </html>
  );
}
