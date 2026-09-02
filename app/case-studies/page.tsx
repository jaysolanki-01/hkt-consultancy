import type { Metadata } from "next";
import Link from "next/link";
import { CASE_STUDIES } from "@/lib/data";

export const metadata: Metadata = {
  title: "Case Studies — Client Results",
  description:
    "Real client outcomes from HKT Consultancy engagements across manufacturing and industrial sectors. Revenue growth, sales transformation, and business development results.",
  alternates: { canonical: "/case-studies" },
};

export default function CaseStudiesPage() {
  return (
    <>
      <section style={{ background: "var(--navy)", padding: "5rem 0", position: "relative", overflow: "hidden" }}>
        <div className="grid-bg" style={{ position: "absolute", inset: 0, pointerEvents: "none" }} />
        <div className="container" style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
          <p className="eyebrow" style={{ color: "var(--gold)", justifyContent: "center" }}>Results</p>
          <h1 className="h1" style={{ color: "#fff", marginTop: "0.75rem" }}>Case Studies</h1>
          <p style={{ color: "rgba(255,255,255,0.55)", marginTop: "1rem", maxWidth: 480, marginInline: "auto", lineHeight: 1.7 }}>
            What sustained growth looks like in practice across manufacturing and industrial sectors.
          </p>
        </div>
      </section>

      <section className="section" style={{ background: "var(--surface)" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.5rem" }}>
            {CASE_STUDIES.map(cs => (
              <Link key={cs.slug} href={`/case-studies/${cs.slug}`} style={{ textDecoration: "none" }}>
                <div className="card" style={{ padding: "2rem", height: "100%", display: "flex", flexDirection: "column" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.25rem" }}>
                    <span style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--navy)", background: "var(--surface)", borderRadius: "20px", padding: "5px 10px" }}>
                      {cs.tag}
                    </span>
                    <div style={{ textAlign: "right" }}>
                      <p style={{ fontFamily: "var(--font-serif)", fontSize: "2rem", fontWeight: 900, color: "var(--gold)", margin: 0, lineHeight: 1 }}>{cs.metric}</p>
                      <p style={{ fontSize: "0.7rem", color: "var(--muted)", margin: "2px 0 0" }}>{cs.metricLabel}</p>
                    </div>
                  </div>
                  <p style={{ fontWeight: 700, color: "var(--navy)", fontSize: "0.95rem", marginBottom: "0.75rem" }}>{cs.client}</p>
                  <p style={{ fontSize: "0.85rem", color: "var(--body)", lineHeight: 1.7, marginBottom: "1.5rem", flex: 1 }}>{cs.challenge}</p>
                  <p style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--navy)", margin: 0 }}>Read case study →</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
