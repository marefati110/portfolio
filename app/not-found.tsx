import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  // Next.js adds the noindex robots tag to 404 responses itself.
  title: "Page not found",
};

export default function NotFound() {
  return (
    <main id="main" className="wrap" style={{ minHeight: "70vh", display: "grid", placeContent: "center", textAlign: "center" }}>
      <h1>Page not found</h1>
      <p className="muted">This page doesn&apos;t exist or has moved.</p>
      <p>
        <Link className="btn" href="/">
          Back to home
        </Link>
      </p>
    </main>
  );
}
