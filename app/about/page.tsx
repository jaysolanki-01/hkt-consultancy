import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SITE, STATS } from "@/lib/data";

export const metadata: Metadata = {
  title: "About HKT Consultancy",
  description:
    "HKT Consultancy is a manufacturing-focused business growth consultancy founded in 1995. Led by Dhiraj Thakur — 30+ years of frontline experience in sales, leadership, and operations across 200+ enterprises.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <section style={{ background: "var(--navy)", padding: "5rem 0", position: "relative", overflow: "hidden" }}>
        <div className="grid-bg" style={{ position: "absolute", inset: 0, pointerEvents: "none" }} />
        <div className="container" style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
          <p className="eyebrow" style={{ color: "var(--gold)", justifyContent: "center" }}>About</p>
          <h1 className="h1" style={{ color: "#fff", marginTop: "0.75rem" }}>HKT Consultancy</h1>
          <p style={{ color: "rgba(255,255,255,0.55)", marginTop: "1rem", maxWidth: 520, marginInline: "auto", lineHeight: 1.7 }}>
            A manufacturing-focused business growth consultancy. Founded {SITE.foundedYear}. Based in Ahmedabad.
          </p>
        </div>
      </section>

      <section className="section" style={{ background: "var(--background)" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "start" }}>
            <div>
              <h2 className="h2" style={{ color: "var(--navy)", marginBottom: "1.5rem" }}>
                The firm
              </h2>
              {[
                "HKT Consultancy works exclusively with manufacturing and industrial enterprises across India. We help Promoters, Founders, MDs, and senior management teams diagnose what is holding growth back — and build the strategy, capability, and execution discipline to break through it.",
                "Founded in 1995, the firm has worked with 200+ manufacturing enterprises across 15+ industrial sectors — from auto components and capital equipment to chemicals, engineering goods, and FMCG manufacturing.",
                "Our model is built on one principle: the consultant stays engaged through implementation, not just strategy. Results are the measure, not the quality of the document delivered.",
              ].map((p, i) => (
                <p key={i} style={{ fontSize: "0.95rem", lineHeight: 1.8, color: "var(--body)", marginBottom: "1rem" }}>{p}</p>
              ))}
              <Link href="/about/dhiraj-thakur" className="btn btn-primary" style={{ marginTop: "0.5rem" }}>
                Meet Dhiraj Thakur
              </Link>
            </div>

            <div>
              <div style={{ position: "relative", borderRadius: "var(--r-lg)", overflow: "hidden", aspectRatio: "4/5" }}>
                <Image
                  src="/HKTOwner.png"
                  alt="Dhiraj Thakur, Founder of HKT Consultancy"
                  fill
                  style={{ objectFit: "cover", objectPosition: "top" }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ background: "var(--navy)", padding: "4rem 0" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "2rem", textAlign: "center" }}>
            {STATS.map(stat => (
              <div key={stat.label}>
                <p style={{ fontFamily: "var(--font-serif)", fontSize: "2.5rem", fontWeight: 900, color: "var(--gold)", margin: 0, lineHeight: 1 }}>
                  {stat.prefix}{stat.value}{stat.suffix}
                </p>
                <p style={{ fontWeight: 700, color: "#fff", fontSize: "0.85rem", margin: "0.5rem 0 0.25rem" }}>{stat.label}</p>
                <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.75rem", margin: 0 }}>{stat.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: "var(--surface)", textAlign: "center" }}>
        <div className="container">
          <h2 className="h2" style={{ color: "var(--navy)", marginBottom: "0.75rem" }}>
            Ready to talk?
          </h2>
          <p style={{ color: "var(--muted)", marginBottom: "2rem", maxWidth: 480, marginInline: "auto" }}>
            The first step is a complimentary 45-minute discovery call. No pitch. An honest conversation about your business.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/contact" className="btn btn-primary">Book a Discovery Call</Link>
            <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" className="btn btn-outline">WhatsApp Dhiraj</a>
          </div>
        </div>
      </section>
    </>
  );
}
