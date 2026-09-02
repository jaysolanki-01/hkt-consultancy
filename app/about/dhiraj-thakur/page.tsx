import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SITE } from "@/lib/data";

export const metadata: Metadata = {
  title: "Dhiraj Thakur — Founder & Business Growth Consultant",
  description:
    "Dhiraj Thakur is a business growth consultant with 30+ years of frontline experience in sales leadership, team building and operational excellence for manufacturing enterprises.",
  alternates: { canonical: "/about/dhiraj-thakur" },
};

export default function DhirajPage() {
  return (
    <>
      <section style={{ background: "var(--navy)", padding: "5rem 0 4rem", position: "relative", overflow: "hidden" }}>
        <div className="grid-bg" style={{ position: "absolute", inset: 0, pointerEvents: "none" }} />
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <Link href="/about" style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.8rem", textDecoration: "none", letterSpacing: "0.04em" }}>← About HKT</Link>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: "3rem", alignItems: "center", marginTop: "2rem" }}>
            <div>
              <p className="eyebrow" style={{ color: "var(--gold)" }}>Founder</p>
              <h1 className="h1" style={{ color: "#fff", marginTop: "0.75rem" }}>Dhiraj Thakur</h1>
              <p style={{ color: "rgba(255,255,255,0.55)", marginTop: "0.5rem", fontSize: "1rem" }}>
                Business Growth Consultant &amp; Founder, HKT Consultancy
              </p>
            </div>
            <div style={{ position: "relative", borderRadius: "var(--r-lg)", overflow: "hidden", aspectRatio: "3/4", border: "1px solid rgba(201,168,76,0.2)" }}>
              <Image src="/HKTOwner.png" alt="Dhiraj Thakur" fill style={{ objectFit: "cover", objectPosition: "top" }} priority />
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: "var(--background)" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: "4rem", alignItems: "start" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              {[
                "Dhiraj Thakur has spent 30+ years working inside manufacturing businesses — not advising from the outside. Before founding HKT Consultancy in 1995, he built and led sales organisations, ran P&L responsibilities, and delivered growth for enterprises across some of India's most demanding industrial sectors.",
                "His work with manufacturing Promoters, Founders, and MDs covers the full growth agenda: revenue strategy, sales team transformation, leadership development, and the operational discipline that sustains profitable scale.",
                "What distinguishes Dhiraj's approach is a willingness to work at the level of implementation — not just strategy. He stays engaged with client organisations through execution, coaching sales managers, facilitating leadership alignment, and tracking measurable business outcomes.",
                "Across 30+ years and 200+ enterprise engagements, the businesses he has worked with have consistently achieved measurable growth outcomes: revenue increases, improved sales team performance, stronger market positioning, and the leadership capability to sustain those gains.",
              ].map((para, i) => (
                <p key={i} style={{ fontSize: "0.95rem", lineHeight: 1.85, color: "var(--body)" }}>{para}</p>
              ))}
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div style={{ background: "var(--surface)", borderRadius: "var(--r)", padding: "1.5rem", borderLeft: "3px solid var(--gold)" }}>
                <p style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--gold)", marginBottom: "0.75rem" }}>Direct contact</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  <a href={SITE.phoneHref} style={{ fontSize: "0.88rem", color: "var(--body)", textDecoration: "none" }}>📞 {SITE.phone}</a>
                  <a href={`mailto:${SITE.email}`} style={{ fontSize: "0.88rem", color: "var(--body)", textDecoration: "none" }}>✉ {SITE.email}</a>
                  <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" style={{ fontSize: "0.88rem", color: "var(--body)", textDecoration: "none" }}>💬 WhatsApp</a>
                </div>
              </div>
              <Link href="/contact" className="btn btn-primary" style={{ justifyContent: "center" }}>
                Book a Discovery Call
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
