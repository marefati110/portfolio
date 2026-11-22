import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import { links, site } from "@/content/site";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(links.site),
  title: site.meta.title,
  description: site.meta.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    title: site.meta.title,
    description: site.meta.description,
    url: "/",
  },
  twitter: { card: "summary_large_image", title: site.meta.title, description: site.meta.description },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={bricolage.variable} data-scroll-behavior="smooth">
      <body>{children}</body>
    </html>
  );
}
