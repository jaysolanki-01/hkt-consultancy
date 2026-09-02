"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import Counter from "@/components/Counter";
import FAQAccordion from "@/components/FAQAccordion";
import {
  SITE,
  HERO_STATS,
  PROBLEMS,
  SOLUTIONS,
  CASE_STUDIES,
  DIFFERENTIATORS,
  PROCESS_STEPS,
  FAQS,
  STATS,
} from "@/lib/data";

/* ── Scroll reveal hook ─────────────────────────────────────────── */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".rv, .rvl, .rvr");
    if (!els.length) return;
    const io = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("on"); io.unobserve(e.target); } }),
      { threshold: 0.12 }
    );
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/* ═══════════════════════════════════════════════════════════════════
   PAGE
══════════════════════════════════════════════════════════════════ */
export default function Home() {
  useReveal();

  return (
    <>
      <HeroSection />
      <ProblemsSection />
      <SolutionsSection />
      <CaseStudiesSection />
      <ProcessSection />
      <WhyHKTSection />
      <StatsSection />
      <AboutSection />
      <FAQSection />
      <CTASection />
    </>
  );
}

/* ── 1. HERO ────────────────────────────────────────────────────── */
function HeroSection() {
  return (
    <section
      style={{
        background: "var(--navy)",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Grid texture */}
      <div className="grid-bg" style={{ position: "absolute", inset: 0, pointerEvents: "none" }} />

      {/* Radial glow */}
      <div style={{
        position: "absolute", top: "-15%", right: "-10%",
        width: "60vw", height: "60vw",
        background: "radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 65%)",
        pointerEvents: "none",
      }} />

      <div className="container" style={{ paddingTop: "6rem", paddingBottom: "6rem", position: "relative", zIndex: 1 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "3rem 4rem", alignItems: "center" }}>
          {/* Left: copy */}
          <div>
            <p className="eyebrow rv" style={{ color: "var(--gold)", marginBottom: "1.5rem" }}>
              <span style={{ display: "inline-block", width: 28, height: 1, background: "var(--gold)", verticalAlign: "middle", marginRight: 10 }} />
              Manufacturing Business Growth Consultancy
            </p>

            <h1 className="display rv d1" style={{ color: "#fff", maxWidth: 680 }}>
              Growth stalls in manufacturing businesses for specific, fixable reasons.
            </h1>

            <p className="lead rv d2" style={{ color: "rgba(255,255,255,0.65)", marginTop: "1.5rem", maxWidth: 520 }}>
              HKT Consultancy works with Promoters, Founders, and senior manufacturing leaders to diagnose what is holding the business back — and build the strategy, capability, and execution discipline to break through it.
            </p>

            <div className="rv d3" style={{ marginTop: "2rem", display: "flex", flexWrap: "wrap", gap: 12 }}>
              <Link href="/contact" className="btn btn-gold">
                Book a Discovery Call
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M2 7h10M8 3l4 4-4 4" />
                </svg>
              </Link>
              <Link href="/case-studies" className="btn btn-ghost">
                See Client Results
              </Link>
            </div>

            {/* Proof strip */}
            <div className="rv d4" style={{ marginTop: "3rem", display: "flex", flexWrap: "wrap", gap: "2rem 2.5rem" }}>
              {HERO_STATS.map(stat => (
                <div key={stat.label}>
                  <p style={{ fontFamily: "var(--font-serif)", fontSize: "1.75rem", fontWeight: 700, color: "var(--gold)", margin: 0, lineHeight: 1 }}>
                    {stat.display}
                  </p>
                  <p style={{ fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(255,255,255,0.45)", marginTop: 4 }}>
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Dhiraj photo */}
          <div className="rvr" style={{ position: "relative", flexShrink: 0, display: "none" }} id="hero-photo">
            <div style={{
              width: 320,
              height: 400,
              borderRadius: "var(--r-lg)",
              overflow: "hidden",
              border: "1px solid rgba(201,168,76,0.2)",
              position: "relative",
            }}>
              <Image
                src="/HKTOwner.png"
                alt="Dhiraj Thakur — Founder, HKT Consultancy"
                fill
                style={{ objectFit: "cover", objectPosition: "top" }}
                priority
              />
              <div style={{
                position: "absolute", bottom: 0, left: 0, right: 0,
                background: "linear-gradient(transparent, rgba(11,29,53,0.9))",
                padding: "2rem 1.25rem 1.25rem",
              }}>
                <p style={{ color: "#fff", fontWeight: 700, fontSize: "1rem", margin: 0 }}>Dhiraj Thakur</p>
                <p style={{ color: "var(--gold)", fontSize: "0.78rem", margin: "2px 0 0", opacity: 0.85 }}>Founder & Business Growth Consultant</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Show photo only on larger screens via inline CSS injection */}
      <style>{`
        @media (min-width: 800px) { #hero-photo { display: block !important; } }
      `}</style>
    </section>
  );
}

/* ── 2. PROBLEMS ────────────────────────────────────────────────── */
function ProblemsSection() {
  return (
    <section className="section" style={{ background: "var(--surface)" }}>
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <p className="eyebrow rv">Does this describe your business right now?</p>
          <h2 className="h2 rv d1" style={{ color: "var(--navy)", marginTop: "0.75rem" }}>
            The growth problems manufacturing<br className="br-desktop" /> businesses face
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1rem" }}>
          {PROBLEMS.map((p, i) => (
            <div
              key={p.title}
              className={`rv d${Math.min(i + 1, 6) as 1|2|3|4|5|6}`}
              style={{
                background: "var(--background)",
                border: "1px solid var(--line)",
                borderRadius: "var(--r)",
                padding: "1.75rem",
                borderLeft: "3px solid var(--gold)",
                transition: "box-shadow 0.3s, transform 0.3s",
              }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 8px 28px rgba(11,29,53,0.09)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "none"; }}
            >
              <h3 className="h3" style={{ color: "var(--navy)", marginBottom: "0.6rem" }}>{p.title}</h3>
              <p style={{ fontSize: "0.88rem", lineHeight: 1.7, color: "var(--body)", margin: 0 }}>{p.body}</p>
            </div>
          ))}
        </div>

        <div className="rv" style={{ textAlign: "center", marginTop: "3rem" }}>
          <p style={{ color: "var(--muted)", marginBottom: "1.25rem", fontSize: "0.9rem" }}>
            If any of these resonate, HKT can help you fix the underlying constraint.
          </p>
          <Link href="/contact" className="btn btn-primary">
            Discuss Your Situation
          </Link>
        </div>
      </div>
      <style>{`.br-desktop { display: none; } @media(min-width:700px){.br-desktop{display:block;}}`}</style>
    </section>
  );
}

/* ── 3. SOLUTIONS ───────────────────────────────────────────────── */
function SolutionsSection() {
  return (
    <section className="section" style={{ background: "var(--background)" }}>
      <div className="container">
        <div style={{ marginBottom: "3.5rem" }}>
          <p className="eyebrow rv">What HKT does</p>
          <h2 className="h2 rv d1" style={{ color: "var(--navy)", marginTop: "0.75rem", maxWidth: 540 }}>
            Four areas of work. All oriented around measurable growth.
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
          {SOLUTIONS.map((sol, i) => (
            <Link
              key={sol.slug}
              href={`/solutions/${sol.slug}`}
              className={`rv d${Math.min(i + 1, 4) as 1|2|3|4}`}
              style={{
                display: "block",
                textDecoration: "none",
                background: "var(--navy)",
                borderRadius: "var(--r-lg)",
                padding: "2rem",
                position: "relative",
                overflow: "hidden",
                transition: "transform 0.3s cubic-bezier(0.16,1,0.3,1), box-shadow 0.3s",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 20px 48px rgba(11,29,53,0.3)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}
            >
              <div style={{
                position: "absolute", top: 0, left: 0, right: 0, height: "2px",
                background: "linear-gradient(90deg, var(--gold), var(--gold-l))",
              }} />
              <p style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--gold)", marginBottom: "0.75rem" }}>
                0{i + 1}
              </p>
              <h3 className="h3" style={{ color: "#fff", marginBottom: "0.75rem" }}>{sol.title}</h3>
              <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.7, marginBottom: "1.5rem" }}>{sol.body}</p>
              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 1.5rem", display: "flex", flexDirection: "column", gap: 6 }}>
                {sol.outcomes.map(o => (
                  <li key={o} style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: "0.8rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.5 }}>
                    <span style={{ color: "var(--gold)", flexShrink: 0, marginTop: 3 }}>✦</span>
                    {o}
                  </li>
                ))}
              </ul>
              <span style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--gold)", letterSpacing: "0.04em" }}>
                Explore →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── 4. CASE STUDIES ────────────────────────────────────────────── */
function CaseStudiesSection() {
  return (
    <section className="section" style={{ background: "var(--surface)" }}>
      <div className="container">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "1rem", marginBottom: "3rem" }}>
          <div>
            <p className="eyebrow rv">Results</p>
            <h2 className="h2 rv d1" style={{ color: "var(--navy)", marginTop: "0.75rem" }}>
              What sustained growth looks like in practice
            </h2>
          </div>
          <Link href="/case-studies" className="btn btn-outline rv">
            All Case Studies
          </Link>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.5rem" }}>
          {CASE_STUDIES.map((cs, i) => (
            <Link
              key={cs.slug}
              href={`/case-studies/${cs.slug}`}
              className={`rv d${Math.min(i + 1, 3) as 1|2|3}`}
              style={{ textDecoration: "none" }}
            >
              <div className="card" style={{ padding: "2rem", height: "100%", display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.25rem" }}>
                  <span style={{
                    fontSize: "10px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase",
                    color: "var(--navy)", background: "var(--surface)", borderRadius: "20px",
                    padding: "5px 10px",
                  }}>
                    {cs.tag}
                  </span>
                  <div style={{ textAlign: "right" }}>
                    <p style={{ fontFamily: "var(--font-serif)", fontSize: "2rem", fontWeight: 900, color: "var(--gold)", margin: 0, lineHeight: 1 }}>
                      {cs.metric}
                    </p>
                    <p style={{ fontSize: "0.7rem", color: "var(--muted)", margin: "2px 0 0" }}>{cs.metricLabel}</p>
                  </div>
                </div>
                <p style={{ fontWeight: 700, color: "var(--navy)", fontSize: "0.95rem", marginBottom: "0.75rem" }}>
                  {cs.client}
                </p>
                <p style={{ fontSize: "0.85rem", color: "var(--body)", lineHeight: 1.7, marginBottom: "1.5rem", flex: 1 }}>
                  {cs.challenge}
                </p>
                <p style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--navy)", margin: 0 }}>
                  Read case study →
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── 5. PROCESS ─────────────────────────────────────────────────── */
function ProcessSection() {
  return (
    <section className="section" style={{ background: "var(--navy)", position: "relative", overflow: "hidden" }}>
      <div className="grid-bg" style={{ position: "absolute", inset: 0, pointerEvents: "none" }} />
      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <p className="eyebrow rv" style={{ color: "var(--gold)" }}>The HKT Framework</p>
          <h2 className="h2 rv d1" style={{ color: "#fff", marginTop: "0.75rem" }}>
            How we work with your business
          </h2>
        </div>

        <div style={{ display: "flex", gap: "0", overflowX: "auto", paddingBottom: "1rem" }}>
          {PROCESS_STEPS.map((step, i) => (
            <div
              key={step.step}
              className={`rv d${Math.min(i + 1, 5) as 1|2|3|4|5}`}
              style={{
                flex: "1 0 200px",
                padding: "2rem 1.5rem",
                position: "relative",
                borderRight: i < PROCESS_STEPS.length - 1 ? "1px solid rgba(255,255,255,0.08)" : "none",
              }}
            >
              <div style={{
                width: 40, height: 40, borderRadius: "50%",
                border: "1.5px solid var(--gold)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: "var(--font-serif)", fontWeight: 700, fontSize: "1rem", color: "var(--gold)",
                marginBottom: "1rem",
              }}>
                {i + 1}
              </div>
              <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.2rem", fontWeight: 700, color: "#fff", marginBottom: "0.6rem" }}>
                {step.step}
              </h3>
              <p style={{ fontSize: "0.83rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.7, margin: 0 }}>
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── 6. WHY HKT ─────────────────────────────────────────────────── */
function WhyHKTSection() {
  return (
    <section className="section" style={{ background: "var(--background)" }}>
      <div className="container">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "start" }}>
          <div>
            <p className="eyebrow rv">Why HKT</p>
            <h2 className="h2 rv d1" style={{ color: "var(--navy)", marginTop: "0.75rem" }}>
              What makes HKT different from every other consultant
            </h2>
            <p className="lead rv d2" style={{ marginTop: "1.25rem" }}>
              Most consultants deliver a strategy and leave. HKT stays through implementation, working inside your organisation until results are achieved.
            </p>
            <Link href="/about" className="btn btn-primary rv d3" style={{ marginTop: "2rem" }}>
              About HKT
            </Link>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            {DIFFERENTIATORS.map((d, i) => (
              <div
                key={d.title}
                className={`rv d${Math.min(i + 1, 5) as 1|2|3|4|5}`}
                style={{
                  display: "flex", gap: "1rem", alignItems: "flex-start",
                  padding: "1.25rem",
                  border: "1px solid var(--line)",
                  borderRadius: "var(--r)",
                  transition: "border-color 0.25s, background 0.25s",
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--gold)"; e.currentTarget.style.background = "var(--gold-soft)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--line)"; e.currentTarget.style.background = "transparent"; }}
              >
                <div style={{
                  width: 32, height: 32, flexShrink: 0,
                  borderRadius: "50%",
                  background: "var(--navy)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "var(--gold)", fontSize: "0.8rem", fontWeight: 700, fontFamily: "var(--font-serif)",
                }}>
                  ✦
                </div>
                <div>
                  <p style={{ fontWeight: 700, color: "var(--navy)", fontSize: "0.9rem", marginBottom: "0.25rem" }}>{d.title}</p>
                  <p style={{ fontSize: "0.82rem", color: "var(--body)", lineHeight: 1.65, margin: 0 }}>{d.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <style>{`@media(max-width:720px){.why-hkt-grid{grid-template-columns:1fr!important;}}`}</style>
    </section>
  );
}

/* ── 7. STATS ───────────────────────────────────────────────────── */
function StatsSection() {
  return (
    <section style={{ background: "var(--navy)", padding: "4rem 0" }}>
      <div className="container">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "2rem" }}>
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className={`rv d${Math.min(i + 1, 6) as 1|2|3|4|5|6}`}
              style={{ textAlign: "center" }}
            >
              <p style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2rem, 4vw, 2.8rem)", fontWeight: 900, color: "var(--gold)", margin: 0, lineHeight: 1 }}>
                {stat.prefix}<Counter target={stat.value} suffix={stat.suffix} />
              </p>
              <p style={{ fontWeight: 700, color: "#fff", fontSize: "0.85rem", margin: "0.5rem 0 0.25rem" }}>{stat.label}</p>
              <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.75rem", margin: 0 }}>{stat.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── 8. ABOUT (Dhiraj) ──────────────────────────────────────────── */
function AboutSection() {
  return (
    <section className="section" style={{ background: "var(--surface)" }}>
      <div className="container">
        <div style={{ display: "grid", gridTemplateColumns: "360px 1fr", gap: "4rem", alignItems: "center" }}>
          {/* Photo */}
          <div className="rvl" style={{ position: "relative" }}>
            <div style={{
              borderRadius: "var(--r-lg)",
              overflow: "hidden",
              aspectRatio: "3 / 4",
              position: "relative",
              border: "1px solid var(--line)",
            }}>
              <Image
                src="/HKTOwner.png"
                alt="Dhiraj Thakur, Founder of HKT Consultancy"
                fill
                style={{ objectFit: "cover", objectPosition: "top" }}
              />
            </div>
            <div style={{
              position: "absolute", bottom: "-1rem", right: "-1rem",
              background: "var(--navy)", borderRadius: "var(--r)",
              padding: "1rem 1.25rem",
              border: "1px solid rgba(201,168,76,0.25)",
            }}>
              <p style={{ fontFamily: "var(--font-serif)", fontSize: "1.75rem", fontWeight: 900, color: "var(--gold)", margin: 0, lineHeight: 1 }}>30+</p>
              <p style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.55)", margin: "4px 0 0", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em" }}>Years Experience</p>
            </div>
          </div>

          {/* Copy */}
          <div>
            <p className="eyebrow rv">About the Consultant</p>
            <h2 className="h2 rv d1" style={{ color: "var(--navy)", marginTop: "0.75rem" }}>
              Dhiraj Thakur<br />
              <span style={{ fontFamily: "var(--font-sans)", fontSize: "1rem", fontWeight: 500, color: "var(--muted)" }}>Founder & Business Growth Consultant</span>
            </h2>

            <div className="rv d2" style={{ marginTop: "1.5rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
              {[
                "Dhiraj Thakur has spent 30+ years working inside manufacturing businesses — not advising from the outside. Before founding HKT Consultancy, he built and led sales organisations, ran P&L responsibilities, and delivered growth for enterprises across some of India's most demanding industrial sectors.",
                "His work with manufacturing Promoters, Founders, and MDs covers the full growth agenda: revenue strategy, sales team transformation, leadership development, and the operational discipline that sustains profitable scale.",
                "HKT Consultancy is built on a simple principle: the consultant stays engaged through implementation, not just strategy. Results are the measure, not the quality of the document delivered.",
              ].map((para, i) => (
                <p key={i} style={{ fontSize: "0.9rem", lineHeight: 1.8, color: "var(--body)", margin: 0 }}>{para}</p>
              ))}
            </div>

            <div className="rv d3" style={{ marginTop: "2rem", display: "flex", gap: 12 }}>
              <Link href="/about/dhiraj-thakur" className="btn btn-primary">
                Full Profile
              </Link>
              <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
                WhatsApp Dhiraj
              </a>
            </div>
          </div>
        </div>
      </div>
      <style>{`@media(max-width:820px){.about-grid{grid-template-columns:1fr!important;}}`}</style>
    </section>
  );
}

/* ── 9. FAQ ─────────────────────────────────────────────────────── */
function FAQSection() {
  return (
    <section className="section" style={{ background: "var(--background)" }}>
      <div className="container">
        <div style={{ display: "grid", gridTemplateColumns: "340px 1fr", gap: "4rem", alignItems: "start" }}>
          <div>
            <p className="eyebrow rv">Common Questions</p>
            <h2 className="h2 rv d1" style={{ color: "var(--navy)", marginTop: "0.75rem" }}>
              What manufacturing leaders want to know
            </h2>
            <p className="lead rv d2" style={{ marginTop: "1rem", fontSize: "0.9rem" }}>
              Straightforward answers about how HKT works, who we work with, and what results to expect.
            </p>
          </div>
          <div className="rv d2">
            <FAQAccordion faqs={FAQS} />
          </div>
        </div>
      </div>
      <style>{`@media(max-width:820px){.faq-grid{grid-template-columns:1fr!important;}}`}</style>
    </section>
  );
}

/* ── 10. CTA ────────────────────────────────────────────────────── */
function CTASection() {
  return (
    <section style={{ background: "var(--navy)", padding: "6rem 0", position: "relative", overflow: "hidden" }}>
      <div className="grid-bg" style={{ position: "absolute", inset: 0, pointerEvents: "none" }} />
      <div style={{
        position: "absolute", top: "50%", left: "50%",
        transform: "translate(-50%, -50%)",
        width: "70vw", height: "70vw",
        background: "radial-gradient(circle, rgba(201,168,76,0.05) 0%, transparent 65%)",
        pointerEvents: "none",
      }} />

      <div className="container" style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
        <p className="eyebrow rv" style={{ color: "var(--gold)", justifyContent: "center" }}>Ready to talk?</p>
        <h2 className="h2 rv d1" style={{ color: "#fff", marginTop: "0.75rem", maxWidth: 600, marginInline: "auto" }}>
          The first step is a 45-minute discovery call — at no cost.
        </h2>
        <p className="lead rv d2" style={{ color: "rgba(255,255,255,0.55)", marginTop: "1rem", marginInline: "auto", textAlign: "center" }}>
          If there is a strong fit, we will tell you exactly what we would do and what outcome you can expect. If not, we will tell you that too.
        </p>

        <div className="rv d3" style={{ marginTop: "2.5rem", display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 12 }}>
          <Link href="/contact" className="btn btn-gold">
            Book a Discovery Call
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M2 7h10M8 3l4 4-4 4" />
            </svg>
          </Link>
          <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
            WhatsApp Dhiraj
          </a>
        </div>

        <p className="rv d4" style={{ marginTop: "1.5rem", fontSize: "0.78rem", color: "rgba(255,255,255,0.3)" }}>
          Or call directly: <a href={SITE.phoneHref} style={{ color: "var(--gold)", textDecoration: "none" }}>{SITE.phone}</a>
        </p>
      </div>
    </section>
  );
}
