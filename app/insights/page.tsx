import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Insights — Manufacturing Growth Perspectives",
  description:
    "Practical perspectives on revenue growth, sales transformation, leadership, and operational excellence for manufacturing enterprises.",
  alternates: { canonical: "/insights" },
};

export default function InsightsPage() {
  return (
    <>
      <section style={{ background: "var(--navy)", padding: "5rem 0", position: "relative", overflow: "hidden" }}>
        <div className="grid-bg" style={{ position: "absolute", inset: 0, pointerEvents: "none" }} />
        <div className="container" style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
          <p className="eyebrow" style={{ color: "var(--gold)", justifyContent: "center" }}>Perspectives</p>
          <h1 className="h1" style={{ color: "#fff", marginTop: "0.75rem" }}>Insights</h1>
          <p style={{ color: "rgba(255,255,255,0.55)", marginTop: "1rem", maxWidth: 480, marginInline: "auto", lineHeight: 1.7 }}>
            Practical perspectives on growing manufacturing businesses — from the people who have done it.
          </p>
        </div>
      </section>

      <section className="section" style={{ background: "var(--surface)" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <div style={{
            maxWidth: 480,
            marginInline: "auto",
            padding: "3rem",
            background: "var(--background)",
            border: "1px solid var(--line)",
            borderRadius: "var(--r-lg)",
          }}>
            <p style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--gold)", marginBottom: "1rem" }}>
              Coming Soon
            </p>
            <h2 className="h3" style={{ color: "var(--navy)", marginBottom: "0.75rem" }}>
              Insights launching shortly
            </h2>
            <p style={{ fontSize: "0.9rem", color: "var(--body)", lineHeight: 1.7, marginBottom: "1.5rem" }}>
              We are preparing a series of practical perspectives on the growth challenges manufacturing leaders face. Check back soon.
            </p>
            <p style={{ fontSize: "0.85rem", color: "var(--muted)", marginBottom: "1.5rem" }}>
              In the meantime, the best way to explore how HKT can help is a direct conversation.
            </p>
            <Link href="/contact" className="btn btn-primary">
              Book a Discovery Call
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
