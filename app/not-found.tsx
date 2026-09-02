import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section
      style={{
        minHeight: "calc(100vh - var(--nav-h))",
        background: "var(--navy)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "4rem var(--pad)",
      }}
    >
      <div>
        <p style={{
          fontFamily: "var(--font-serif)",
          fontSize: "clamp(5rem, 15vw, 10rem)",
          fontWeight: 900,
          color: "var(--gold)",
          opacity: 0.15,
          lineHeight: 1,
          margin: 0,
          userSelect: "none",
        }}>
          404
        </p>
        <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.6rem, 3vw, 2.5rem)", fontWeight: 700, color: "#fff", marginTop: "1rem", marginBottom: "0.75rem" }}>
          Page not found
        </h1>
        <p style={{ color: "rgba(255,255,255,0.5)", maxWidth: 420, marginInline: "auto", lineHeight: 1.7 }}>
          The page you are looking for doesn&apos;t exist or may have been moved.
        </p>
        <div style={{ marginTop: "2rem", display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/" className="btn btn-gold">Back to Home</Link>
          <Link href="/contact" className="btn btn-ghost">Contact HKT</Link>
        </div>
      </div>
    </section>
  );
}
