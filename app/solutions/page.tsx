import type { Metadata } from "next";
import Link from "next/link";
import { SOLUTIONS } from "@/lib/data";

export const metadata: Metadata = {
  title: "Solutions — Manufacturing Growth Consulting",
  description:
    "HKT Consultancy's four areas of work: Revenue Growth, Sales Transformation, Leadership & Organisation, and Operational Excellence — all oriented around measurable outcomes.",
  alternates: { canonical: "/solutions" },
};

export default function SolutionsPage() {
  return (
    <>
      <style>{`
        .sol-card:hover {
          box-shadow: 0 12px 40px rgba(11,29,53,0.1);
          transform: translateY(-2px);
        }
      `}</style>

      <section style={{ background: "var(--navy)", padding: "5rem 0", position: "relative", overflow: "hidden" }}>
        <div className="grid-bg" style={{ position: "absolute", inset: 0, pointerEvents: "none" }} />
        <div className="container" style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
          <p className="eyebrow" style={{ color: "var(--gold)", justifyContent: "center" }}>What HKT does</p>
          <h1 className="h1" style={{ color: "#fff", marginTop: "0.75rem" }}>Solutions</h1>
          <p style={{ color: "rgba(255,255,255,0.55)", marginTop: "1rem", maxWidth: 520, marginInline: "auto", lineHeight: 1.7 }}>
            Four areas of work. All oriented around measurable growth outcomes for manufacturing and industrial enterprises.
          </p>
        </div>
      </section>

      <section className="section" style={{ background: "var(--surface)" }}>
        <div className="container">
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {SOLUTIONS.map((sol, i) => (
              <Link key={sol.slug} href={`/solutions/${sol.slug}`} style={{ textDecoration: "none", display: "block" }}>
                <div
                  className="sol-card"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "80px 1fr auto",
                    alignItems: "center",
                    gap: "2rem",
                    background: "var(--background)",
                    border: "1px solid var(--line)",
                    borderRadius: "var(--r-lg)",
                    padding: "2rem",
                    transition: "box-shadow 0.3s, transform 0.3s",
                  }}
                >
                  <div style={{
                    fontFamily: "var(--font-serif)", fontSize: "3rem", fontWeight: 900,
                    color: "var(--gold)", opacity: 0.25, lineHeight: 1,
                  }}>
                    0{i + 1}
                  </div>
                  <div>
                    <h2 className="h3" style={{ color: "var(--navy)", marginBottom: "0.5rem" }}>{sol.title}</h2>
                    <p style={{ fontSize: "0.9rem", color: "var(--body)", lineHeight: 1.7, margin: 0 }}>{sol.body}</p>
                  </div>
                  <span style={{ fontWeight: 700, color: "var(--navy)", fontSize: "0.9rem", whiteSpace: "nowrap" }}>
                    Explore →
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div style={{ marginTop: "3rem", textAlign: "center" }}>
            <Link href="/contact" className="btn btn-primary">Discuss Your Situation</Link>
          </div>
        </div>
      </section>
    </>
  );
}
