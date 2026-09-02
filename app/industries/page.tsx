import type { Metadata } from "next";
import Link from "next/link";
import { INDUSTRIES } from "@/lib/data";

export const metadata: Metadata = {
  title: "Industries — Manufacturing Sectors We Work In",
  description:
    "HKT Consultancy works across manufacturing and industrial sectors: automotive, capital equipment, chemicals, engineering, FMCG, and more.",
  alternates: { canonical: "/industries" },
};

export default function IndustriesPage() {
  return (
    <>
      <section style={{ background: "var(--navy)", padding: "5rem 0", position: "relative", overflow: "hidden" }}>
        <div className="grid-bg" style={{ position: "absolute", inset: 0, pointerEvents: "none" }} />
        <div className="container" style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
          <p className="eyebrow" style={{ color: "var(--gold)", justifyContent: "center" }}>Where we work</p>
          <h1 className="h1" style={{ color: "#fff", marginTop: "0.75rem" }}>Industries</h1>
          <p style={{ color: "rgba(255,255,255,0.55)", marginTop: "1rem", maxWidth: 480, marginInline: "auto", lineHeight: 1.7 }}>
            Exclusive focus on manufacturing and industrial enterprises across India.
          </p>
        </div>
      </section>

      <section className="section" style={{ background: "var(--surface)" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.25rem" }}>
            {INDUSTRIES.map(ind => (
              <Link key={ind.slug} href={`/industries/${ind.slug}`} style={{ textDecoration: "none" }}>
                <div className="card" style={{ padding: "2rem", height: "100%", borderLeft: "3px solid var(--gold)" }}>
                  <h2 className="h3" style={{ color: "var(--navy)", marginBottom: "0.75rem" }}>{ind.title}</h2>
                  <p style={{ fontSize: "0.88rem", color: "var(--body)", lineHeight: 1.7, margin: 0 }}>{ind.body}</p>
                </div>
              </Link>
            ))}
          </div>
          <div style={{ marginTop: "3rem", textAlign: "center" }}>
            <Link href="/contact" className="btn btn-primary">Discuss Your Industry</Link>
          </div>
        </div>
      </section>
    </>
  );
}
