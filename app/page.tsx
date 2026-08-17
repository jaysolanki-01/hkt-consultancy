"use client";
import Image from "next/image";
import { useState, useEffect, useRef, type CSSProperties, type ChangeEvent, type FormEvent } from "react";
import ownerImg    from "../images/HKTOwner.png";
import kareliyaLogo from "../images/kareliya.webp";
import kapirajLogo  from "../images/kapiraj.webp";
import brandLogo    from "../images/logo.png";
import { FAQS } from "./faq-data";

/* ─── TOKENS ─────────────────────────────────────────────────────── */
const N  = "#0b1d35";   // deep navy
const N2 = "#0f2847";
const N3 = "#163660";
const G1 = "#c9a84c";   // gold
const G2 = "#e8c96a";   // gold light
const W  = "#ffffff";
const OF = "#f6f8fb";
const MU = "#64748b";
const LN = "rgba(11,29,53,0.1)";

/* ─── GLOBAL CSS ──────────────────────────────────────────────────── */
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,700;0,9..144,900;1,9..144,300;1,9..144,700&display=swap');
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
  html{scroll-behavior:smooth}
  body{font-family:'Space Grotesk',system-ui,sans-serif;background:#fff;color:${N};-webkit-font-smoothing:antialiased;overflow-x:hidden}
  ::selection{background:${N};color:#fff}
  ::-webkit-scrollbar{width:3px}
  ::-webkit-scrollbar-track{background:#f0f4f8}
  ::-webkit-scrollbar-thumb{background:linear-gradient(${N},${N3});border-radius:2px}
  img{max-width:100%}

  /* ── animations ─────────────────────────────────── */
  @keyframes up    {from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}
  @keyframes left  {from{opacity:0;transform:translateX(-30px)}to{opacity:1;transform:translateX(0)}}
  @keyframes right {from{opacity:0;transform:translateX(30px)}to{opacity:1;transform:translateX(0)}}
  @keyframes scale {from{opacity:0;transform:scale(.93)}to{opacity:1;transform:scale(1)}}
  @keyframes pulse {0%,100%{opacity:.6;transform:scale(1)}50%{opacity:.2;transform:scale(1.25)}}
  @keyframes spin  {to{transform:rotate(360deg)}}
  @keyframes cntUp {from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
  @keyframes dash  {to{stroke-dashoffset:0}}
  @keyframes dot   {from{opacity:0;transform:scale(0)}to{opacity:1;transform:scale(1)}}
  @keyframes blink {0%,100%{opacity:1}50%{opacity:.3}}

  /* ── reveal classes ──────────────────────────────── */
  .rv  {opacity:0;transform:translateY(28px);transition:opacity .75s cubic-bezier(.16,1,.3,1),transform .75s cubic-bezier(.16,1,.3,1)}
  .rvl {opacity:0;transform:translateX(-28px);transition:opacity .75s cubic-bezier(.16,1,.3,1),transform .75s cubic-bezier(.16,1,.3,1)}
  .rvr {opacity:0;transform:translateX(28px);transition:opacity .75s cubic-bezier(.16,1,.3,1),transform .75s cubic-bezier(.16,1,.3,1)}
  .rvs {opacity:0;transform:scale(.94);transition:opacity .75s cubic-bezier(.16,1,.3,1),transform .75s cubic-bezier(.16,1,.3,1)}
  .rv.on,.rvl.on,.rvr.on,.rvs.on{opacity:1;transform:none}
  .d1{transition-delay:.07s}.d2{transition-delay:.14s}.d3{transition-delay:.21s}
  .d4{transition-delay:.28s}.d5{transition-delay:.35s}.d6{transition-delay:.42s}

  /* ── layout ──────────────────────────────────────── */
  .wrap{max-width:1300px;margin:0 auto;padding:0 clamp(1rem,3.5vw,2.5rem);width:100%}
  .sec {padding:clamp(72px,9vw,120px) 0}
  .g2  {display:grid;grid-template-columns:1fr 1fr;gap:clamp(2rem,5vw,6rem);align-items:center}
  .g2t {align-items:start}
  .g3  {display:grid;grid-template-columns:repeat(3,1fr);gap:16px}
  .ga  {display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,270px),1fr));gap:16px}
  .ga2 {display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,200px),1fr));gap:1px}

  /* ── number big ──────────────────────────────────── */
  .num{font-family:'Fraunces',Georgia,serif;font-size:clamp(3.2rem,7vw,6rem);font-weight:900;line-height:1;letter-spacing:-0.04em}

  /* ── tag ──────────────────────────────────────────── */
  .tag{display:inline-flex;align-items:center;gap:8px;padding:6px 16px;border-radius:100px;font-size:10px;font-weight:600;letter-spacing:.14em;text-transform:uppercase}

  /* ── hover lift ───────────────────────────────────── */
  .hl{transition:transform .3s cubic-bezier(.16,1,.3,1),box-shadow .3s ease,border-color .3s ease}
  .hl:hover{transform:translateY(-4px)}

  /* ── btn ──────────────────────────────────────────── */
  .btn{display:inline-flex;align-items:center;gap:8px;padding:14px 32px;border-radius:100px;font-size:13px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;cursor:pointer;transition:all .3s cubic-bezier(.16,1,.3,1);border:none;font-family:inherit;text-decoration:none}
  .btn-n{background:${N};color:#fff;box-shadow:0 6px 24px rgba(11,29,53,.25)}
  .btn-n:hover{background:${N3};transform:translateY(-2px);box-shadow:0 12px 36px rgba(11,29,53,.35)}
  .btn-o{background:transparent;color:#fff;border:1.5px solid rgba(255,255,255,.25)}
  .btn-o:hover{border-color:rgba(255,255,255,.6);background:rgba(255,255,255,.07)}
  .btn-g{background:linear-gradient(135deg,${G1},${G2});color:${N};box-shadow:0 6px 24px rgba(201,168,76,.3)}
  .btn-g:hover{transform:translateY(-2px);box-shadow:0 12px 36px rgba(201,168,76,.45)}
  .btn-w{background:#fff;color:${N};box-shadow:0 4px 20px rgba(255,255,255,.18)}
  .btn-w:hover{background:#f0f4f8;transform:translateY(-2px)}

  /* ── sr-only ──────────────────────────────────────── */
  .sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}

  /* ── noise overlay ────────────────────────────────── */
  .nx::before{content:'';position:absolute;inset:0;pointer-events:none;z-index:0;
    background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.025'/%3E%3C/svg%3E");
    background-size:160px}

  /* ── touch targets ─────────────────────────────────── */
  button,a{min-height:44px;min-width:44px}
  .btn{min-height:48px}
  input,textarea,select{min-height:48px;font-size:16px!important} /* prevent iOS zoom */

  /* ── responsive ───────────────────────────────────── */

  /* Tablet */
  @media(max-width:960px){
    .g2{grid-template-columns:1fr!important;gap:2.5rem!important}
    .hm{display:none!important}
    .g3{grid-template-columns:1fr 1fr!important}
    .g2t{align-items:start!important}
  }

  /* Nav */
  @media(max-width:900px){
    .mob-open{display:flex!important}
    .nav-links{display:none!important}
  }

  /* Mobile */
  @media(max-width:640px){
    .g3{grid-template-columns:1fr!important}
    .btn-row{flex-direction:column!important;align-items:stretch!important;width:100%}
    .btn-row>.btn{justify-content:center!important;width:100%!important;text-align:center!important}
    .sec{padding:clamp(52px,10vw,80px) 0!important}
    .wrap{padding:0 1rem!important}
    .ga{grid-template-columns:1fr!important}
    .ga2{grid-template-columns:1fr 1fr!important}
    /* hero stats stack on mobile */
    .hero-stats{flex-direction:column!important;gap:16px!important;padding-top:24px!important}
    .hero-stats>div{border-right:none!important;border-bottom:1px solid rgba(255,255,255,.08);padding:0 0 16px!important;width:100%}
    .hero-stats>div:last-child{border-bottom:none!important;padding-bottom:0!important}
    /* contact grid stacks */
    .g2.g2t{gap:2rem!important}
    /* ticker smaller */
    .mq span{font-size:11px!important;padding:0 16px!important}
    /* growth diagram scroll */
    .diagram-wrap{overflow-x:auto!important;-webkit-overflow-scrolling:touch!important}
    .diagram-inner{min-width:560px!important}
  }

  /* Small phones */
  @media(max-width:400px){
    .ga2{grid-template-columns:1fr!important}
    .tag{font-size:9px!important;padding:5px 12px!important}
    .btn{padding:13px 22px!important;font-size:12px!important}
  }

  /* Reduced motion */
  @media(prefers-reduced-motion:reduce){
    *,*::before,*::after{animation-duration:.01ms!important;transition-duration:.01ms!important}
    html{scroll-behavior:auto}
  }
`;

/* ─── HOOKS ───────────────────────────────────────────────────────── */
function useReveal() {
  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("on"); });
    }, { threshold: .08 });
    document.querySelectorAll(".rv,.rvl,.rvr,.rvs").forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}
function useInView<T extends Element>(t = .3): [React.RefObject<T | null>, boolean] {
  const ref = useRef<T | null>(null);
  const [v, s] = useState(false);
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) s(true); }, { threshold: t });
    if (ref.current) o.observe(ref.current);
    return () => o.disconnect();
  }, [t]);
  return [ref, v];
}

/* ─── COUNTER ─────────────────────────────────────────────────────── */
function Counter({ n, sfx = "", dur = 2000 }: { n: number; sfx?: string; dur?: number }) {
  const [v, set] = useState(0);
  const [ref, iv] = useInView<HTMLSpanElement>(.4);
  useEffect(() => {
    if (!iv) return;
    let s = 0; const step = Math.ceil(n / (dur / 16));
    const t = setInterval(() => { s += step; if (s >= n) { set(n); clearInterval(t); } else set(s); }, 16);
    return () => clearInterval(t);
  }, [iv, n, dur]);
  return <span ref={ref} style={{ animation: iv ? "cntUp .5s ease both" : "none" }}>{v}{sfx}</span>;
}

/* ─── NAV ─────────────────────────────────────────────────────────── */
function Nav() {
  const [sc, setSc] = useState(false);
  const [mo, setMo] = useState(false);
  useEffect(() => {
    const h = () => setSc(window.scrollY > 48);
    h(); window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);
  const go = (id: string) => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); setMo(false); };
  const links: Array<[string, string]> = [
    ["About", "about"], ["Clients", "clients"], ["Growth", "growth"],
    ["Results", "results"], ["Process", "process"], ["FAQ", "faq"], ["Contact", "contact"],
  ];

  return (
    <header style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 300 }}>
      <nav style={{
        height: 70, display: "flex", alignItems: "center",
        padding: "0 clamp(1rem,3.5vw,2.5rem)",
        background: sc ? "rgba(255,255,255,.97)" : "transparent",
        backdropFilter: sc ? "blur(24px)" : "none",
        borderBottom: sc ? `1px solid ${LN}` : "none",
        boxShadow: sc ? "0 2px 24px rgba(11,29,53,.06)" : "none",
        transition: "all .45s cubic-bezier(.16,1,.3,1)",
      }}>
        <div style={{ maxWidth: 1300, margin: "0 auto", width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          {/* Logo */}
          <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            style={{ background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex", alignItems: "center" }}>
            <Image src={brandLogo} alt="HKT Consultancy" width={130} height={52} priority
              style={{ height: 48, width: "auto", objectFit: "contain", mixBlendMode: sc ? "multiply" : "screen" }} />
          </button>

          {/* Desktop links */}
          <div className="nav-links" style={{ display: "flex", alignItems: "center", gap: "1.6rem" }}>
            {links.map(([l, id]) => (
              <button key={id} onClick={() => go(id)}
                style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: 12, fontWeight: 500, color: sc ? MU : "rgba(255,255,255,.75)", letterSpacing: ".08em", textTransform: "uppercase", transition: "color .2s" }}
                onMouseEnter={e => e.currentTarget.style.color = sc ? N : "#fff"}
                onMouseLeave={e => e.currentTarget.style.color = sc ? MU : "rgba(255,255,255,.75)"}
              >{l}</button>
            ))}
            <button onClick={() => go("contact")} className="btn btn-n"
              style={{ padding: "9px 22px", fontSize: 11, boxShadow: sc ? "0 4px 16px rgba(11,29,53,.2)" : "0 4px 16px rgba(0,0,0,.3)" }}>
              Book Call
            </button>
          </div>

          {/* Hamburger */}
          <button className="mob-open" onClick={() => setMo(!mo)}
            style={{ display: "none", background: "none", border: "none", cursor: "pointer", flexDirection: "column", gap: 5, padding: 8 }}>
            {[0, 1, 2].map(i => (
              <span key={i} style={{
                display: "block", width: 22, height: 2, borderRadius: 2,
                background: sc ? N : "#fff",
                transition: "all .3s",
                transform: mo ? (i === 0 ? "rotate(45deg) translate(5px,5px)" : i === 2 ? "rotate(-45deg) translate(5px,-5px)" : "") : "",
                opacity: mo && i === 1 ? 0 : 1,
              }} />
            ))}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div style={{
        background: "rgba(255,255,255,.98)", backdropFilter: "blur(24px)",
        maxHeight: mo ? 500 : 0, overflow: "hidden",
        transition: "max-height .45s cubic-bezier(.16,1,.3,1)",
        borderBottom: mo ? `1px solid ${LN}` : "none",
        padding: mo ? "1rem clamp(1rem,3.5vw,2.5rem) 1.5rem" : "0 clamp(1rem,3.5vw,2.5rem)",
      }}>
        {links.map(([l, id]) => (
          <div key={id} style={{ borderBottom: `1px solid ${LN}` }}>
            <button onClick={() => go(id)} style={{ display: "block", width: "100%", padding: "13px 0", background: "none", border: "none", fontFamily: "inherit", fontSize: 15, fontWeight: 500, color: N, textAlign: "left", cursor: "pointer" }}>{l}</button>
          </div>
        ))}
      </div>
    </header>
  );
}

/* ─── HERO ────────────────────────────────────────────────────────── */
function Hero() {
  useReveal();
  return (
    <section id="hero" className="nx" style={{
      minHeight: "100vh", position: "relative", overflow: "hidden",
      background: `linear-gradient(150deg, ${N} 0%, ${N2} 45%, ${N3} 100%)`,
      display: "flex", alignItems: "center", paddingTop: 70,
    }}>
      {/* Geometric accent shapes */}
      <div style={{ position: "absolute", top: 0, right: 0, width: "45%", height: "100%", overflow: "hidden", pointerEvents: "none" }} className="hm">
        <div style={{ position: "absolute", top: "-10%", right: "-5%", width: 580, height: 580, borderRadius: "50%", border: "1px solid rgba(255,255,255,.05)" }} />
        <div style={{ position: "absolute", top: "5%", right: "5%", width: 400, height: 400, borderRadius: "50%", border: "1px solid rgba(255,255,255,.04)" }} />
        <div style={{ position: "absolute", bottom: "10%", right: "-8%", width: 320, height: 320, borderRadius: "50%", border: "1px solid rgba(201,168,76,.12)" }} />
      </div>

      {/* Gold top line */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg,transparent,${G1},${G2},${G1},transparent)` }} />

      {/* Subtle grid */}
      <svg aria-hidden style={{ position: "absolute", inset: 0, opacity: .018, pointerEvents: "none" }} width="100%" height="100%">
        <defs><pattern id="pg" width="80" height="80" patternUnits="userSpaceOnUse"><path d="M80 0L0 0 0 80" fill="none" stroke="#fff" strokeWidth=".8" /></pattern></defs>
        <rect width="100%" height="100%" fill="url(#pg)" />
      </svg>

      <div className="wrap" style={{ position: "relative", zIndex: 1, padding: "clamp(3rem,7vw,6rem) clamp(1rem,3.5vw,2.5rem)" }}>
        <div className="g2" style={{ alignItems: "center" }}>
          {/* LEFT */}
          <div>
            {/* Eyebrow tag */}
            <div className="rv" style={{ marginBottom: 28 }}>
              <span className="tag" style={{ background: "rgba(201,168,76,.12)", border: "1px solid rgba(201,168,76,.25)", color: G2 }}>
                <span style={{ width: 5, height: 5, borderRadius: "50%", background: G2, animation: "pulse 2s ease infinite", flexShrink: 0 }} />
                Manufacturing Business Consulting
              </span>
            </div>

            {/* Headline — mixed serif + sans */}
            <div className="rv d1">
              <h1 style={{ lineHeight: 1.05, marginBottom: 24 }}>
                <span style={{ display: "block", fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(2.4rem,5.5vw,4.2rem)", fontWeight: 700, color: "rgba(255,255,255,.55)", letterSpacing: "-.03em" }}>
                  We Engineer
                </span>
                <span style={{ display: "block", fontFamily: "'Fraunces',Georgia,serif", fontSize: "clamp(3rem,7vw,5.6rem)", fontWeight: 900, fontStyle: "italic", color: "#fff", letterSpacing: "-.04em", lineHeight: .95 }}>
                  Manufacturing
                </span>
                <span style={{ display: "block", fontFamily: "'Fraunces',Georgia,serif", fontSize: "clamp(3rem,7vw,5.6rem)", fontWeight: 300, fontStyle: "italic", color: G1, letterSpacing: "-.04em", lineHeight: .95 }}>
                  Growth.
                </span>
              </h1>
            </div>

            <p className="rv d2" style={{ fontSize: 15.5, lineHeight: 1.8, color: "rgba(255,255,255,.5)", maxWidth: 500, marginBottom: 40 }}>
              Dhiraj Thakur — 30+ years building sales machines, transforming leadership, and scaling manufacturing enterprises across India.
            </p>

            <div className="rv d3 btn-row" style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <button className="btn btn-w" onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}>
                Book Free Consultation
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </button>
              <a href="https://wa.me/918980211122" target="_blank" rel="noopener noreferrer" className="btn btn-o">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="#25D366"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                WhatsApp
              </a>
            </div>

            {/* Stats row */}
            <div className="rv d4 hero-stats" style={{ display: "flex", gap: 0, marginTop: 52, paddingTop: 36, borderTop: "1px solid rgba(255,255,255,.08)" }}>
              {[["30+", "Years"], ["200+", "Enterprises"], ["₹500Cr+", "Revenue"]].map(([n, l], i) => (
                <div key={l} style={{ flex: 1, paddingLeft: i > 0 ? 28 : 0, paddingRight: i < 2 ? 28 : 0, borderRight: i < 2 ? "1px solid rgba(255,255,255,.08)" : "none" }}>
                  <div style={{ fontFamily: "'Fraunces',Georgia,serif", fontSize: "clamp(1.8rem,3.5vw,2.4rem)", fontWeight: 900, color: G1, lineHeight: 1, marginBottom: 5 }}>{n}</div>
                  <div style={{ fontSize: 10, color: "rgba(255,255,255,.3)", letterSpacing: ".12em", textTransform: "uppercase", fontWeight: 600 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — photo */}
          <div className="rv d2 hm" style={{ display: "flex", justifyContent: "flex-end" }}>
            <div style={{ position: "relative", width: "100%", maxWidth: 420 }}>
              {/* Frame accents */}
              <div style={{ position: "absolute", top: -16, right: -16, width: 60, height: 60, borderTop: `2px solid ${G1}`, borderRight: `2px solid ${G1}`, zIndex: 2 }} />
              <div style={{ position: "absolute", bottom: -16, left: -16, width: 60, height: 60, borderBottom: `2px solid ${G1}`, borderLeft: `2px solid ${G1}`, zIndex: 2 }} />
              {/* Decorative ring */}
              <div style={{ position: "absolute", top: -30, right: -30, width: 470, height: 560, borderRadius: 16, border: "1px solid rgba(255,255,255,.05)", zIndex: 0 }} />
              {/* Photo */}
              <div style={{ borderRadius: 14, overflow: "hidden", position: "relative", zIndex: 1 }}>
                <Image src={ownerImg} alt="Dhiraj Thakur" width={420} height={490} priority
                  sizes="(max-width:960px) 90vw, 420px"
                  style={{ width: "100%", height: "auto", aspectRatio: "42/49", objectFit: "cover", objectPosition: "center top", display: "block" }} />
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "50%", background: `linear-gradient(to top, ${N} 0%, transparent 100%)` }} />
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "1.5rem 1.6rem" }}>
                  <p style={{ fontFamily: "'Fraunces',Georgia,serif", fontSize: 20, fontWeight: 700, color: "#fff", fontStyle: "italic" }}>Dhiraj Thakur</p>
                  <p style={{ fontSize: 11, color: G1, letterSpacing: ".12em", textTransform: "uppercase", marginTop: 4, fontWeight: 600 }}>Founder · HKT Consultancy</p>
                </div>
              </div>
              {/* Floating badge */}
              <div style={{ position: "absolute", bottom: -20, left: -20, background: "#fff", borderRadius: 12, padding: "13px 16px", zIndex: 3, display: "flex", alignItems: "center", gap: 12, boxShadow: "0 12px 40px rgba(11,29,53,.22)" }}>
                <div style={{ width: 36, height: 36, borderRadius: 8, background: `linear-gradient(135deg,${N},${N3})`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17" /><polyline points="16 7 22 7 22 13" /></svg>
                </div>
                <div>
                  <div style={{ fontFamily: "'Fraunces',Georgia,serif", fontSize: 18, fontWeight: 900, color: N, lineHeight: 1 }}>₹500 Cr+</div>
                  <div style={{ fontSize: 10, color: MU, letterSpacing: ".1em", textTransform: "uppercase", marginTop: 3, fontWeight: 600 }}>Revenue Generated</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div style={{ position: "absolute", bottom: 24, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
        <div style={{ width: 1, height: 40, background: `linear-gradient(to bottom,${G1},transparent)`, animation: "pulse 2s ease infinite" }} />
      </div>
    </section>
  );
}

/* ─── TICKER / MARQUEE ─────────────────────────────────────────────── */
function Ticker() {
  const items = ["Sales Architecture", "Revenue Growth", "Team Building", "Manufacturing Consulting", "Leadership Development", "Operational Excellence", "Business Transformation", "Enterprise Strategy"];
  return (
    <div style={{ background: N, padding: "14px 0", overflow: "hidden", borderTop: `1px solid rgba(255,255,255,.06)`, borderBottom: `1px solid rgba(255,255,255,.06)` }}>
      <style>{`
        @keyframes marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}
        .mq{display:flex;width:max-content;animation:marquee 28s linear infinite}
        .mq:hover{animation-play-state:paused}
      `}</style>
      <div className="mq">
        {[...items, ...items].map((t, i) => (
          <span key={i} style={{ display: "flex", alignItems: "center", gap: 18, padding: "0 24px", whiteSpace: "nowrap", fontSize: 12, fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", color: "rgba(255,255,255,.28)" }}>
            <span style={{ width: 4, height: 4, borderRadius: "50%", background: G1, flexShrink: 0 }} />
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─── CLIENTS ─────────────────────────────────────────────────────── */
function Clients() {
  useReveal();
  const ph = ["Precision Tools", "IndoTech MFG", "Apex Engineering", "BharatForge", "Sterling Ind.", "ProMach Systems", "National Castings", "Metalcraft India", "SteelWorks Pvt", "ThermoTech Ltd"];
  return (
    <section id="clients" className="sec" style={{ background: OF }}>
      <div className="wrap">
        <div className="rv" style={{ textAlign: "center", marginBottom: 48 }}>
          <span className="tag" style={{ background: `rgba(11,29,53,.06)`, color: N, border: `1px solid ${LN}`, marginBottom: 16 }}>Trusted By Industry Leaders</span>
          <h2 style={{ fontFamily: "'Fraunces',Georgia,serif", fontSize: "clamp(1.8rem,3.5vw,2.8rem)", fontWeight: 700, fontStyle: "italic", color: N, letterSpacing: "-.03em" }}>
            Enterprises That <span style={{ color: N3 }}>Chose Growth.</span>
          </h2>
        </div>

        {/* Featured logos */}
        <div className="rv d1" style={{ display: "flex", gap: 16, justifyContent: "center", marginBottom: 20, flexWrap: "wrap" }}>
          {[{ img: kareliyaLogo, name: "Kareliya Equipments" }, { img: kapirajLogo, name: "Kapiraj Ayurveda" }].map(c => (
            <div key={c.name} className="hl" style={{ width: 192, height: 92, borderRadius: 12, border: `1px solid ${LN}`, display: "flex", alignItems: "center", justifyContent: "center", padding: 16, background: "#fff", boxShadow: "0 2px 12px rgba(11,29,53,.05)", filter: "grayscale(100%)", transition: "filter .3s,transform .3s,box-shadow .3s" }}
              onMouseEnter={e => { e.currentTarget.style.filter = "grayscale(0%)"; e.currentTarget.style.boxShadow = "0 8px 28px rgba(11,29,53,.12)"; }}
              onMouseLeave={e => { e.currentTarget.style.filter = "grayscale(100%)"; e.currentTarget.style.boxShadow = "0 2px 12px rgba(11,29,53,.05)"; }}
            >
              <Image src={c.img} alt={c.name} width={160} height={60} style={{ maxWidth: "100%", maxHeight: "70%", objectFit: "contain", width: "auto", height: "auto" }} />
            </div>
          ))}
        </div>

        {/* Placeholder grid */}
        <div className="rv d2" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,140px),1fr))", gap: 1, background: LN, borderRadius: 10, overflow: "hidden" }}>
          {ph.map(b => (
            <div key={b} style={{ padding: "18px 10px", background: OF, display: "flex", alignItems: "center", justifyContent: "center", transition: "background .2s" }}
              onMouseEnter={e => e.currentTarget.style.background = "#fff"}
              onMouseLeave={e => e.currentTarget.style.background = OF}
            >
              <span style={{ fontSize: 10, fontWeight: 600, color: "rgba(11,29,53,.22)", letterSpacing: ".07em", textTransform: "uppercase", textAlign: "center" }}>{b}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── ABOUT ───────────────────────────────────────────────────────── */
function About() {
  useReveal();
  const pillars = [
    { icon: "↗", t: "Sales Architecture", d: "Designing end-to-end sales systems that drive consistent, scalable revenue for manufacturing businesses." },
    { icon: "◎", t: "Team Leadership", d: "Building high-performance teams through structured training and accountability frameworks." },
    { icon: "⌘", t: "Operational Excellence", d: "Identifying inefficiencies and implementing process improvements that translate to the bottom line." },
    { icon: "◈", t: "Manufacturing Focus", d: "Deep domain expertise in industrial sectors — understanding your challenges from the inside." },
  ];
  return (
    <section id="about" className="sec nx" style={{ background: "#fff", position: "relative", overflow: "hidden" }}>
      <div aria-hidden style={{ position: "absolute", bottom: -80, left: -80, width: 480, height: 480, background: `radial-gradient(circle,rgba(11,29,53,.03) 0%,transparent 70%)`, pointerEvents: "none" }} />
      <div className="wrap g2" style={{ position: "relative", zIndex: 1 }}>
        {/* Left — quote + stats */}
        <div className="rvl">
          {/* Big quote card */}
          <div style={{ background: `linear-gradient(135deg,${N} 0%,${N3} 100%)`, borderRadius: 20, padding: "2.5rem", marginBottom: 16, position: "relative", overflow: "hidden" }}>
            <div aria-hidden style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg,${G1},${G2},${G1})` }} />
            <div aria-hidden style={{ fontFamily: "'Fraunces',Georgia,serif", fontSize: 100, fontWeight: 900, color: "rgba(255,255,255,.05)", lineHeight: .8, marginBottom: 16, fontStyle: "italic" }}>&ldquo;</div>
            <blockquote style={{ fontFamily: "'Fraunces',Georgia,serif", fontSize: "clamp(1.1rem,2.2vw,1.3rem)", lineHeight: 1.75, color: "rgba(255,255,255,.88)", fontStyle: "italic", fontWeight: 300, position: "relative", zIndex: 1 }}>
              Sustainable growth is never accidental — it is engineered.
            </blockquote>
            <div style={{ marginTop: 22, display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 28, height: 2, background: G1, borderRadius: 2 }} />
              <span style={{ fontSize: 12, color: `rgba(201,168,76,.65)`, fontWeight: 500 }}>Dhiraj Thakur · Founder, HKT Consultancy</span>
            </div>
          </div>
          {/* Mini stat cards */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {[["30+", "Years Experience"], ["200+", "Enterprises"], ["15+", "Industries"], ["500+", "Leaders Coached"]].map(([n, l]) => (
              <div key={l} className="hl" style={{ background: OF, border: `1px solid ${LN}`, borderRadius: 12, padding: "18px 16px", textAlign: "center", transition: "box-shadow .3s,transform .3s" }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = `0 8px 24px rgba(11,29,53,.1)`; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; }}
              >
                <div style={{ fontFamily: "'Fraunces',Georgia,serif", fontSize: "clamp(1.5rem,3vw,2rem)", fontWeight: 900, color: N, lineHeight: 1, marginBottom: 5 }}>{n}</div>
                <div style={{ fontSize: 9, color: MU, letterSpacing: ".1em", textTransform: "uppercase", fontWeight: 600 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — bio + pillars */}
        <div className="rvr">
          <span className="tag" style={{ background: `rgba(11,29,53,.06)`, color: N, border: `1px solid ${LN}`, marginBottom: 16 }}>About Dhiraj Thakur</span>
          <h2 style={{ fontFamily: "'Fraunces',Georgia,serif", fontSize: "clamp(1.8rem,3.2vw,2.6rem)", fontWeight: 700, fontStyle: "italic", color: N, lineHeight: 1.18, marginBottom: 22, letterSpacing: "-.03em" }}>
            A Consultant Who Has Lived Your Challenges
          </h2>
          <p style={{ fontSize: 15, lineHeight: 1.85, color: "#445566", marginBottom: 16 }}>
            Dhiraj Thakur is the founder of HKT Consultancy and one of India&apos;s most experienced business growth consultants in the manufacturing sector. With over 30 years of hands-on experience leading sales organisations, restructuring businesses, and coaching enterprise leadership teams.
          </p>
          <p style={{ fontSize: 15, lineHeight: 1.85, color: "#445566", marginBottom: 32 }}>
            His approach is grounded in field experience — consistently helping manufacturing enterprises break through revenue plateaus to achieve sustained, profitable growth.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {pillars.map(p => (
              <div key={p.t} className="hl" style={{ background: OF, borderRadius: 12, padding: "18px", borderLeft: `3px solid ${N}`, transition: "box-shadow .3s,transform .3s" }}
                onMouseEnter={e => e.currentTarget.style.boxShadow = "0 8px 24px rgba(11,29,53,.09)"}
                onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}
              >
                <div style={{ fontFamily: "monospace", fontSize: 18, color: N3, marginBottom: 9 }}>{p.icon}</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: N, marginBottom: 5 }}>{p.t}</div>
                <div style={{ fontSize: 12, color: MU, lineHeight: 1.65 }}>{p.d}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── GROWTH ARCHITECT ────────────────────────────────────────────── */
function Growth() {
  useReveal();
  const [active, setActive] = useState<number | null>(null);
  const nodes = [
    { id: 0, x: 240, y: 40,  icon: "📊", label: "Revenue\nAssessment",    desc: "Deep-dive audit of current revenue streams, pricing strategy, and sales pipeline health." },
    { id: 1, x: 60,  y: 170, icon: "👥", label: "Sales Team\nOptimisation", desc: "Structure, train and incentivise your sales force to perform at peak capacity consistently." },
    { id: 2, x: 420, y: 170, icon: "🗺️", label: "Market\nExpansion",      desc: "Identify untapped segments, geographies, and channel opportunities for accelerated growth." },
    { id: 3, x: 60,  y: 310, icon: "⚙️", label: "Operational\nExcellence", desc: "Streamline processes, reduce waste and build scalable operational systems." },
    { id: 4, x: 240, y: 310, icon: "🎯", label: "Leadership\nDevelopment", desc: "Build a high-performance leadership culture that drives accountability and results." },
    { id: 5, x: 420, y: 310, icon: "📈", label: "Revenue\nOptimisation",   desc: "Fine-tune pricing, upsell strategy and retention to maximise revenue per client." },
    { id: 6, x: 240, y: 450, icon: "🚀", label: "Sustainable\nGrowth",     desc: "Predictable, scalable, profitable business growth — the ultimate destination." },
  ];
  const edges: [number, number][] = [[0, 1], [0, 2], [1, 3], [1, 4], [2, 4], [2, 5], [3, 6], [4, 6], [5, 6]];

  return (
    <section id="growth" className="sec" style={{ background: OF, overflow: "hidden" }}>
      <div className="wrap">
        <div className="rv" style={{ textAlign: "center", marginBottom: 56 }}>
          <span className="tag" style={{ background: `rgba(11,29,53,.06)`, color: N, border: `1px solid ${LN}`, marginBottom: 16 }}>Business Growth Framework</span>
          <h2 style={{ fontFamily: "'Fraunces',Georgia,serif", fontSize: "clamp(1.8rem,3.5vw,2.8rem)", fontWeight: 700, fontStyle: "italic", color: N, letterSpacing: "-.03em", lineHeight: 1.15, marginBottom: 12 }}>
            The Architecture of <span style={{ color: N3 }}>Growth.</span>
          </h2>
          <p style={{ fontSize: 14, color: MU, maxWidth: 480, margin: "0 auto" }}>Click any node to explore that growth lever in detail.</p>
        </div>

        <div className="rv diagram-wrap" style={{ display: "flex", justifyContent: "center" }}>
          <div className="diagram-inner" style={{ position: "relative", width: "100%", maxWidth: 620 }}>
            <svg viewBox="0 0 600 540" style={{ width: "100%", height: "auto", position: "absolute", top: 0, left: 0, pointerEvents: "none" }}>
              <defs>
                <marker id="arr" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto">
                  <path d="M0,0 L0,6 L7,3 z" fill={G1} opacity=".8" />
                </marker>
              </defs>
              {edges.map(([a, b], i) => {
                const na = nodes[a], nb = nodes[b];
                const ia = active === a || active === b;
                return (
                  <line key={i} x1={na.x + 60} y1={na.y + 36} x2={nb.x + 60} y2={nb.y + 8}
                    stroke={ia ? G1 : LN} strokeWidth={ia ? 2 : 1.5}
                    strokeDasharray={ia ? "none" : "4 3"} markerEnd="url(#arr)"
                    style={{ transition: "all .3s", opacity: ia ? 1 : .6 }} />
                );
              })}
            </svg>
            <div style={{ position: "relative", height: 540 }}>
              {nodes.map(n => (
                <button key={n.id} onClick={() => setActive(active === n.id ? null : n.id)}
                  style={{
                    position: "absolute", left: n.x, top: n.y, width: 120, height: 72,
                    background: active === n.id ? N : "#fff",
                    border: `1.5px solid ${active === n.id ? N : LN}`,
                    borderRadius: 12, display: "flex", flexDirection: "column", alignItems: "center",
                    justifyContent: "center", cursor: "pointer", fontFamily: "inherit",
                    boxShadow: active === n.id ? `0 8px 28px rgba(11,29,53,.22)` : "0 2px 10px rgba(11,29,53,.06)",
                    transition: "all .3s cubic-bezier(.16,1,.3,1)",
                    transform: active === n.id ? "scale(1.07)" : "scale(1)",
                    animation: `dot .4s ease ${n.id * .06}s both`,
                    zIndex: active === n.id ? 2 : 1,
                  }}
                  onMouseEnter={e => { if (active !== n.id) { e.currentTarget.style.borderColor = N3; e.currentTarget.style.transform = "scale(1.04)"; } }}
                  onMouseLeave={e => { if (active !== n.id) { e.currentTarget.style.borderColor = LN; e.currentTarget.style.transform = "scale(1)"; } }}
                >
                  <span style={{ fontSize: 18, marginBottom: 3 }}>{n.icon}</span>
                  <span style={{ fontSize: 9.5, fontWeight: 700, color: active === n.id ? "#fff" : N, textAlign: "center", lineHeight: 1.35, whiteSpace: "pre-line", letterSpacing: ".02em" }}>{n.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Detail panel */}
        {active !== null && (
          <div className="rv" style={{ maxWidth: 500, margin: "28px auto 0", background: "#fff", border: `1px solid ${LN}`, borderLeft: `4px solid ${N}`, borderRadius: 14, padding: "1.6rem 1.8rem", boxShadow: "0 8px 32px rgba(11,29,53,.07)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 10 }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: `linear-gradient(135deg,${N},${N3})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>{nodes[active].icon}</div>
              <p style={{ fontSize: 15, fontWeight: 700, color: N }}>{nodes[active].label.replace(/\n/, " ")}</p>
            </div>
            <p style={{ fontSize: 14, color: MU, lineHeight: 1.8 }}>{nodes[active].desc}</p>
          </div>
        )}
      </div>
    </section>
  );
}

/* ─── CASE STUDIES ────────────────────────────────────────────────── */
function Results() {
  useReveal();
  const cases = [
    { tag: "Precision Engineering", co: "Auto Component Manufacturer", ch: "Stagnant revenue for 3 years; fragmented sales team with no accountability structure.", st: "Redesigned sales pipeline, introduced Key Account Management, coached 18-person sales team.", out: "Revenue grew 62% in 18 months. Attrition dropped 40%→8%. Three new enterprise accounts.", n: "+62%", nl: "Revenue Growth" },
    { tag: "Industrial Equipment", co: "Capital Equipment OEM — Pan-India", ch: "Ineffective distribution network, low channel partner productivity, no go-to-market strategy.", st: "Mapped channel gaps, designed tiered partner programme, trained 35 regional sales managers.", out: "Channel revenue up 45%. New product line hit ₹18 Cr in Year 1.", n: "+45%", nl: "Channel Revenue" },
    { tag: "Process Manufacturing", co: "Chemical Processing Enterprise", ch: "Over-reliance on legacy clients, no new business engine, leadership resistant to change.", st: "Full business diagnostic, new business development function, leadership alignment workshops.", out: "New business = 30% of total revenue within 24 months.", n: "+30%", nl: "New Business" },
  ];
  return (
    <section id="results" className="sec nx" style={{ background: N, position: "relative", overflow: "hidden" }}>
      <div aria-hidden style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg,transparent,${G1},${G2},${G1},transparent)` }} />
      <div aria-hidden style={{ position: "absolute", top: "15%", right: "-5%", width: 420, height: 420, borderRadius: "50%", border: "1px solid rgba(255,255,255,.04)", pointerEvents: "none" }} />
      <div className="wrap" style={{ position: "relative", zIndex: 1 }}>
        <div className="rv" style={{ marginBottom: 56, display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 20 }}>
          <div>
            <span className="tag" style={{ background: "rgba(201,168,76,.1)", color: G2, border: `1px solid rgba(201,168,76,.2)`, marginBottom: 14 }}>Proven Results</span>
            <h2 style={{ fontFamily: "'Fraunces',Georgia,serif", fontSize: "clamp(2rem,4vw,3.2rem)", fontWeight: 900, fontStyle: "italic", color: "#fff", letterSpacing: "-.04em", lineHeight: 1.08 }}>
              Client <span style={{ color: G1, fontWeight: 300 }}>Transformations.</span>
            </h2>
          </div>
        </div>
        <div className="ga" style={{ gap: 14 }}>
          {cases.map((c, i) => (
            <article key={c.co} className={`rv d${i + 1}`}
              style={{ borderRadius: 18, overflow: "hidden", background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.08)", transition: "all .35s cubic-bezier(.16,1,.3,1)" }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,.08)"; e.currentTarget.style.transform = "translateY(-5px)"; e.currentTarget.style.borderColor = `rgba(201,168,76,.25)`; }}
              onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,.04)"; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.borderColor = "rgba(255,255,255,.08)"; }}
            >
              <div style={{ padding: "1.8rem 1.8rem 1.4rem", borderBottom: "1px solid rgba(255,255,255,.06)" }}>
                <p style={{ fontSize: 10, letterSpacing: ".14em", textTransform: "uppercase", color: `rgba(201,168,76,.6)`, fontWeight: 600, marginBottom: 10 }}>{c.tag}</p>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: "#fff", marginBottom: 18, lineHeight: 1.4 }}>{c.co}</h3>
                <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
                  <span style={{ fontFamily: "'Fraunces',Georgia,serif", fontSize: "clamp(2.4rem,5.5vw,3rem)", fontWeight: 900, color: G1, lineHeight: 1, letterSpacing: "-.04em" }}>{c.n}</span>
                  <span style={{ fontSize: 12, color: "rgba(255,255,255,.3)", fontWeight: 500 }}>{c.nl}</span>
                </div>
              </div>
              <div style={{ padding: "1.4rem 1.8rem 1.6rem" }}>
                {[["Challenge", c.ch], ["Strategy", c.st], ["Outcome", c.out]].map(([l, t]) => (
                  <div key={l} style={{ marginBottom: 12 }}>
                    <p style={{ fontSize: 10, fontWeight: 700, color: `rgba(201,168,76,.5)`, letterSpacing: ".12em", textTransform: "uppercase", marginBottom: 4 }}>{l}</p>
                    <p style={{ fontSize: 12.5, color: "rgba(255,255,255,.45)", lineHeight: 1.7 }}>{t}</p>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── WHY HKT ─────────────────────────────────────────────────────── */
function WhyHKT() {
  useReveal();
  const r = [
    { t: "30+ Years Field Expertise", d: "Practical, ground-level experience across sales, operations, and leadership in manufacturing industries." },
    { t: "Manufacturing Domain Depth", d: "Exclusive focus on industrial and manufacturing enterprises gives unmatched sector understanding." },
    { t: "Proven Sales Leadership", d: "Built and scaled high-performing sales organisations, delivering double-digit revenue growth." },
    { t: "Long-Term Partnership", d: "We don't deliver reports and leave. We stay engaged until measurable outcomes are achieved." },
    { t: "Strategic & Operational Bridge", d: "Translating boardroom strategy into factory-floor execution — bridging vision and reality." },
    { t: "Results-First Accountability", d: "Every engagement structured around clear KPIs, milestone reviews, and outcome-based accountability." },
  ];
  return (
    <section className="sec" style={{ background: "#fff" }}>
      <div className="wrap">
        <div className="rv" style={{ textAlign: "center", marginBottom: 52 }}>
          <span className="tag" style={{ background: `rgba(11,29,53,.06)`, color: N, border: `1px solid ${LN}`, marginBottom: 16 }}>The HKT Difference</span>
          <h2 style={{ fontFamily: "'Fraunces',Georgia,serif", fontSize: "clamp(1.8rem,3.5vw,2.8rem)", fontWeight: 700, fontStyle: "italic", color: N, letterSpacing: "-.03em" }}>
            Why Enterprise Leaders <span style={{ color: N3 }}>Choose HKT.</span>
          </h2>
        </div>
        <div className="ga">
          {r.map((item, i) => (
            <div key={item.t} className={`rv d${(i % 3) + 1} hl`}
              style={{ background: OF, borderRadius: 14, padding: "1.75rem", borderTop: `3px solid ${N}`, transition: "box-shadow .3s,transform .3s" }}
              onMouseEnter={e => e.currentTarget.style.boxShadow = "0 12px 36px rgba(11,29,53,.1)"}
              onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}
            >
              <p style={{ fontFamily: "'Fraunces',Georgia,serif", fontSize: 32, fontWeight: 900, color: `rgba(11,29,53,.06)`, lineHeight: 1, marginBottom: 12 }}>0{i + 1}</p>
              <h3 style={{ fontSize: 14.5, fontWeight: 700, color: N, marginBottom: 8, lineHeight: 1.35 }}>{item.t}</h3>
              <p style={{ fontSize: 13, color: MU, lineHeight: 1.7 }}>{item.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── PROCESS ─────────────────────────────────────────────────────── */
function Process() {
  useReveal();
  const steps = [
    { n: "01", t: "Discovery Call", d: "A focused 45-minute conversation to understand your business context, challenges, and growth ambitions." },
    { n: "02", t: "Business Analysis", d: "Structured diagnostic covering sales performance, team capability, processes, and market positioning." },
    { n: "03", t: "Strategy Planning", d: "Co-creation of a tailored growth roadmap with clear priorities, timelines, and measurable milestones." },
    { n: "04", t: "Team Alignment", d: "Workshops to align leadership and key teams around the strategy and their roles in executing it." },
    { n: "05", t: "Execution Guidance", d: "Active consulting support during implementation — removing bottlenecks and coaching managers." },
    { n: "06", t: "Revenue Optimisation", d: "Continuous refinement of sales processes and go-to-market strategies to sustain and accelerate growth." },
  ];
  return (
    <section id="process" className="sec" style={{ background: OF }}>
      <div className="wrap">
        <div className="rv" style={{ textAlign: "center", marginBottom: 64 }}>
          <span className="tag" style={{ background: `rgba(11,29,53,.06)`, color: N, border: `1px solid ${LN}`, marginBottom: 16 }}>How We Work</span>
          <h2 style={{ fontFamily: "'Fraunces',Georgia,serif", fontSize: "clamp(1.8rem,3.5vw,2.8rem)", fontWeight: 700, fontStyle: "italic", color: N, letterSpacing: "-.03em" }}>
            Our Consulting <span style={{ color: N3 }}>Process.</span>
          </h2>
        </div>
        <div style={{ position: "relative" }}>
          <div aria-hidden className="hm" style={{ position: "absolute", top: 32, left: "8.33%", right: "8.33%", height: 1.5, background: `linear-gradient(90deg,transparent,${LN},${G1},${LN},transparent)`, zIndex: 0 }} />
          <ol style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,190px),1fr))", gap: 28, position: "relative", zIndex: 1, listStyle: "none", padding: 0, margin: 0 }}>
            {steps.map((s, i) => (
              <li key={s.n} className={`rv d${(i % 3) + 1}`} style={{ textAlign: "center", padding: "0 6px" }}>
                <div aria-hidden style={{ width: 64, height: 64, borderRadius: "50%", border: `2px solid ${N}`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", background: "#fff", transition: "all .3s", boxShadow: "0 2px 12px rgba(11,29,53,.07)" }}
                  onMouseEnter={e => { e.currentTarget.style.background = N; e.currentTarget.style.boxShadow = "0 8px 24px rgba(11,29,53,.2)"; (e.currentTarget.querySelector("span") as HTMLElement).style.color = "#fff"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "#fff"; e.currentTarget.style.boxShadow = "0 2px 12px rgba(11,29,53,.07)"; (e.currentTarget.querySelector("span") as HTMLElement).style.color = N; }}
                >
                  <span style={{ fontFamily: "'Fraunces',Georgia,serif", fontSize: 14, fontWeight: 900, color: N, transition: "color .3s" }}>{s.n}</span>
                </div>
                <h3 style={{ fontSize: 14, fontWeight: 700, color: N, marginBottom: 8 }}>{s.t}</h3>
                <p style={{ fontSize: 12.5, color: MU, lineHeight: 1.7 }}>{s.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* ─── ACHIEVEMENTS ────────────────────────────────────────────────── */
function Achievements() {
  useReveal();
  const stats = [
    { n: 30, sfx: "+", l: "Years Experience", s: "Sales, operations & leadership" },
    { n: 200, sfx: "+", l: "Enterprises Consulted", s: "Manufacturing & industrial" },
    { n: 500, sfx: "Cr+", l: "Revenue Generated ₹", s: "Cumulative client impact" },
    { n: 500, sfx: "+", l: "Leaders Coached", s: "Sales managers & executives" },
    { n: 15, sfx: "+", l: "Industries Served", s: "Across manufacturing verticals" },
    { n: 95, sfx: "%", l: "Client Retention", s: "Long-term partnerships" },
  ];
  return (
    <section id="achievements" className="sec nx" style={{ background: `linear-gradient(150deg,${N} 0%,${N3} 100%)`, position: "relative", overflow: "hidden" }}>
      <div aria-hidden style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg,transparent,${G1},${G2},${G1},transparent)` }} />
      <div className="wrap" style={{ position: "relative", zIndex: 1 }}>
        <div className="rv" style={{ marginBottom: 52 }}>
          <span className="tag" style={{ background: "rgba(201,168,76,.1)", color: G2, border: `1px solid rgba(201,168,76,.2)`, marginBottom: 14 }}>By The Numbers</span>
          <h2 style={{ fontFamily: "'Fraunces',Georgia,serif", fontSize: "clamp(1.8rem,3.5vw,2.8rem)", fontWeight: 900, fontStyle: "italic", color: "#fff", letterSpacing: "-.04em", lineHeight: 1.1 }}>
            Three Decades of <span style={{ color: G1, fontWeight: 300 }}>Impact.</span>
          </h2>
        </div>
        <dl style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,200px),1fr))", gap: 1, background: "rgba(255,255,255,.07)", border: "1px solid rgba(255,255,255,.08)", borderRadius: 6, overflow: "hidden", margin: 0 }}>
          {stats.map((s, i) => (
            <div key={s.l} className={`rv d${(i % 3) + 1}`} style={{ padding: "2.25rem 1.75rem", background: "rgba(255,255,255,.02)", transition: "background .25s", cursor: "default" }}
              onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,.07)"}
              onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,.02)"}
            >
              <dd style={{ fontFamily: "'Fraunces',Georgia,serif", fontSize: "clamp(2.2rem,5vw,2.8rem)", fontWeight: 900, color: G1, lineHeight: 1, marginBottom: 10, letterSpacing: "-.04em", marginInlineStart: 0 }}>
                <Counter n={s.n} sfx={s.sfx} />
              </dd>
              <dt style={{ fontSize: 14, fontWeight: 700, color: "rgba(255,255,255,.85)", marginBottom: 4 }}>{s.l}</dt>
              <p style={{ fontSize: 12, color: "rgba(255,255,255,.3)" }}>{s.s}</p>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

/* ─── FAQ ─────────────────────────────────────────────────────────── */
function FAQ() {
  useReveal();
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section id="faq" className="sec" style={{ background: "#fff" }}>
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "0 clamp(1rem,3.5vw,2.5rem)" }}>
        <div className="rv" style={{ textAlign: "center", marginBottom: 52 }}>
          <span className="tag" style={{ background: `rgba(11,29,53,.06)`, color: N, border: `1px solid ${LN}`, marginBottom: 16 }}>Common Questions</span>
          <h2 style={{ fontFamily: "'Fraunces',Georgia,serif", fontSize: "clamp(1.8rem,3.5vw,2.8rem)", fontWeight: 700, fontStyle: "italic", color: N, letterSpacing: "-.03em" }}>
            Frequently Asked <span style={{ color: N3 }}>Questions.</span>
          </h2>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {FAQS.map((f, i) => (
            <div key={f.q} className={`rv d${(i % 3) + 1}`}
              style={{ borderRadius: 12, overflow: "hidden", border: open === i ? `1.5px solid ${N}` : `1px solid ${LN}`, background: open === i ? OF : "#fff", transition: "all .3s" }}>
              <button onClick={() => setOpen(open === i ? null : i)}
                style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "18px 22px", background: "none", border: "none", cursor: "pointer", textAlign: "left", gap: 16, fontFamily: "inherit" }}>
                <span style={{ fontSize: 15, fontWeight: 600, color: N, lineHeight: 1.5 }}>{f.q}</span>
                <span style={{
                  width: 30, height: 30, borderRadius: "50%",
                  border: `1.5px solid ${open === i ? N : LN}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0, color: open === i ? "#fff" : MU,
                  background: open === i ? N : "transparent",
                  fontSize: 18, fontWeight: 300, lineHeight: 1,
                  transform: open === i ? "rotate(45deg)" : "rotate(0)",
                  transition: "all .35s cubic-bezier(.16,1,.3,1)",
                }}>+</span>
              </button>
              <div style={{ maxHeight: open === i ? 400 : 0, overflow: "hidden", transition: "max-height .4s cubic-bezier(.16,1,.3,1)" }}>
                <p style={{ padding: "0 22px 20px", fontSize: 14, color: "#445566", lineHeight: 1.85 }}>{f.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── CONTACT ─────────────────────────────────────────────────────── */
type CF = { name: string; company: string; email: string; phone: string; requirement: string };
function Contact() {
  useReveal();
  const [form, setForm] = useState<CF>({ name: "", company: "", email: "", phone: "", requirement: "" });
  const [ok, setOk] = useState(false);
  const h = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(p => ({ ...p, [e.target.name]: e.target.value }));
  };
  const inp: CSSProperties = {
    width: "100%", padding: "13px 16px",
    background: OF, border: `1px solid ${LN}`,
    borderRadius: 8, fontSize: 15, fontFamily: "inherit",
    color: N, outline: "none", boxSizing: "border-box",
    transition: "all .2s",
  };
  const contacts = [
    { l: "Phone", v: "+91 89802 11122", h: "tel:+918980211122" },
    { l: "Email", v: "dhiraj@hktconsultancy.in", h: "mailto:dhiraj@hktconsultancy.in" },
    { l: "Enquiries", v: "contact@hktconsultancy.in", h: "mailto:contact@hktconsultancy.in" },
    { l: "Office", v: "C-1102, PNTC, Vejalpur, Ahmedabad – 380015", h: "https://maps.google.com/?q=PNTC+Vejalpur+Ahmedabad" },
    { l: "WhatsApp", v: "+91 89802 11122", h: "https://wa.me/918980211122" },
  ];
  return (
    <section id="contact" className="sec" style={{ background: OF }}>
      <div className="wrap g2 g2t">
        <div className="rvl">
          <span className="tag" style={{ background: `rgba(11,29,53,.06)`, color: N, border: `1px solid ${LN}`, marginBottom: 16 }}>Get In Touch</span>
          <h2 style={{ fontFamily: "'Fraunces',Georgia,serif", fontSize: "clamp(1.8rem,3.2vw,2.5rem)", fontWeight: 700, fontStyle: "italic", color: N, lineHeight: 1.18, marginBottom: 16, letterSpacing: "-.03em" }}>
            Let&apos;s Begin a Conversation About Your Growth
          </h2>
          <p style={{ fontSize: 15, color: "#445566", lineHeight: 1.85, marginBottom: 32 }}>
            Whether you&apos;re facing a revenue plateau, a team performance challenge, or need strategic clarity — we&apos;re here to help.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {contacts.map(c => (
              <a key={c.l} href={c.h} target={c.h.startsWith("http") ? "_blank" : undefined} rel={c.h.startsWith("http") ? "noopener noreferrer" : undefined}
                style={{ display: "flex", alignItems: "center", gap: 14, textDecoration: "none", padding: "13px 16px", borderRadius: 10, background: "#fff", border: `1px solid ${LN}`, transition: "all .25s", boxShadow: "0 1px 6px rgba(11,29,53,.04)" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = N; e.currentTarget.style.transform = "translateX(4px)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = LN; e.currentTarget.style.transform = "translateX(0)"; }}
              >
                <span style={{ width: 36, height: 36, borderRadius: 8, background: `linear-gradient(135deg,${N},${N3})`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 12, color: "#fff", fontWeight: 700 }}>{c.l[0]}</span>
                <span>
                  <span style={{ display: "block", fontSize: 10, letterSpacing: ".1em", textTransform: "uppercase", color: MU, fontWeight: 600, marginBottom: 2 }}>{c.l}</span>
                  <span style={{ fontSize: 13.5, fontWeight: 500, color: N }}>{c.v}</span>
                </span>
              </a>
            ))}
          </div>
        </div>

        <div className="rvr">
          <div style={{ background: "#fff", border: `1px solid ${LN}`, borderTop: `4px solid ${N}`, borderRadius: 16, padding: "clamp(1.5rem,4vw,2.5rem)", boxShadow: "0 20px 56px rgba(11,29,53,.08)" }}>
            <h3 style={{ fontFamily: "'Fraunces',Georgia,serif", fontSize: 22, fontWeight: 700, fontStyle: "italic", color: N, marginBottom: 22 }}>Send an Enquiry</h3>
            {ok ? (
              <div style={{ textAlign: "center", padding: "3rem 0" }}>
                <div style={{ width: 56, height: 56, borderRadius: "50%", background: `linear-gradient(135deg,${N},${N3})`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 18px", fontSize: 22, color: "#fff" }}>✓</div>
                <h4 style={{ fontFamily: "'Fraunces',Georgia,serif", fontSize: 18, color: N, marginBottom: 8, fontWeight: 700, fontStyle: "italic" }}>Redirecting to WhatsApp...</h4>
                <p style={{ fontSize: 14, color: MU }}>Your enquiry has been prepared. Complete it on WhatsApp to reach Dhiraj directly.</p>
              </div>
            ) : (
              <form onSubmit={e => {
                e.preventDefault();
                const msg = [
                  `🏢 *New Enquiry — HKT Consultancy*`,
                  ``,
                  `👤 *Name:* ${form.name}`,
                  `🏭 *Company:* ${form.company}`,
                  `📧 *Email:* ${form.email}`,
                  `📞 *Phone:* ${form.phone}`,
                  ``,
                  `📋 *Requirement:*`,
                  form.requirement,
                ].join("\n");
                const url = `https://wa.me/918980211122?text=${encodeURIComponent(msg)}`;
                window.open(url, "_blank");
                setOk(true);
              }} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {([["name", "Full Name", "text"], ["company", "Company Name", "text"], ["email", "Email Address", "email"], ["phone", "Phone Number", "tel"]] as const).map(([n, p, t]) => (
                  <input key={n} name={n} placeholder={p} type={t} required value={form[n]} onChange={h}
                    style={inp}
                    onFocus={e => { e.currentTarget.style.borderColor = N; e.currentTarget.style.background = "#fff"; }}
                    onBlur={e => { e.currentTarget.style.borderColor = LN; e.currentTarget.style.background = OF; }} />
                ))}
                <textarea name="requirement" placeholder="Describe your business requirement" required rows={4} value={form.requirement} onChange={h}
                  style={{ ...inp, resize: "vertical", minHeight: 100, lineHeight: 1.6 }}
                  onFocus={e => { e.currentTarget.style.borderColor = N; e.currentTarget.style.background = "#fff"; }}
                  onBlur={e => { e.currentTarget.style.borderColor = LN; e.currentTarget.style.background = OF; }} />
                <button type="submit" className="btn btn-n" style={{ borderRadius: 8, justifyContent: "center", marginTop: 4 }}>
                  Submit Enquiry
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── BOOKING ─────────────────────────────────────────────────────── */
function Booking() {
  useEffect(() => {
    if (document.getElementById("cal-script")) return;
    const s = document.createElement("script");
    s.id = "cal-script";
    s.src = "https://app.cal.com/embed/embed.js";
    s.async = true;
    s.onload = () => {
      const w = window as unknown as Record<string, unknown>;
      if (typeof w.Cal === "function") {
        (w.Cal as (a: string, b?: unknown, c?: unknown) => void)("init", "15min", { origin: "https://cal.com" });
        (w.Cal as (a: string, b?: unknown) => void)("ui", { hideEventTypeDetails: false, layout: "month_view" });
      }
    };
    document.body.appendChild(s);
  }, []);
  return (
    <section id="calendly-booking" className="sec nx" style={{ background: `linear-gradient(150deg,${N} 0%,${N3} 100%)`, position: "relative", overflow: "hidden" }}>
      <div aria-hidden style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg,transparent,${G1},${G2},${G1},transparent)` }} />
      <div style={{ maxWidth: 820, margin: "0 auto", padding: "0 clamp(1rem,3.5vw,2.5rem)", position: "relative", zIndex: 1 }}>
        <div style={{ textAlign: "center", marginBottom: 44 }}>
          <span className="tag" style={{ background: "rgba(201,168,76,.1)", color: G2, border: `1px solid rgba(201,168,76,.2)`, marginBottom: 16 }}>Schedule a Meeting</span>
          <h2 style={{ fontFamily: "'Fraunces',Georgia,serif", fontSize: "clamp(1.8rem,3.5vw,2.8rem)", fontWeight: 700, fontStyle: "italic", color: "#fff", letterSpacing: "-.03em", marginBottom: 12 }}>
            Book Your Free <span style={{ color: G1, fontWeight: 300 }}>Discovery Call.</span>
          </h2>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,.45)" }}>Complimentary. No obligation. 15 minutes.</p>
        </div>
        <div style={{ borderRadius: 16, overflow: "hidden", background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.1)" }}>
          <div style={{ padding: "1.6rem clamp(1.25rem,4vw,2rem)", borderBottom: "1px solid rgba(255,255,255,.07)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div style={{ width: 46, height: 46, borderRadius: "50%", overflow: "hidden", border: `2px solid ${G1}`, flexShrink: 0 }}>
                <Image src={ownerImg} alt="Dhiraj Thakur" width={46} height={46} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }} />
              </div>
              <div>
                <p style={{ fontFamily: "'Fraunces',Georgia,serif", fontSize: 16, fontWeight: 700, fontStyle: "italic", color: "#fff" }}>Dhiraj Thakur</p>
                <p style={{ fontSize: 11, color: `rgba(201,168,76,.6)`, marginTop: 2, fontWeight: 600, letterSpacing: ".06em" }}>Business Consultant · HKT Consultancy</p>
              </div>
            </div>
            <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
              {[["15 min", "Duration"], ["Video Call", "Format"], ["India IST", "Timezone"]].map(([v, l]) => (
                <div key={l} style={{ textAlign: "center" }}>
                  <p style={{ fontSize: 14, fontWeight: 700, color: "rgba(255,255,255,.8)" }}>{v}</p>
                  <p style={{ fontSize: 10, color: "rgba(255,255,255,.28)", letterSpacing: ".1em", textTransform: "uppercase", fontWeight: 600, marginTop: 2 }}>{l}</p>
                </div>
              ))}
            </div>
          </div>
          <div style={{ padding: "clamp(2rem,5vw,3rem)", textAlign: "center" }}>
            <button
              data-cal-namespace="15min"
              data-cal-link="hkt-consultancy/15min"
              data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true","theme":"auto"}'
              className="btn btn-g"
              style={{ fontSize: 13, borderRadius: 100 }}
            >
              📅 Schedule Your Free Call
            </button>
            <div style={{ display: "flex", gap: 20, justifyContent: "center", marginTop: 22, flexWrap: "wrap" }}>
              {["✓ Free 15-min call", "✓ No commitment", "✓ Instant confirmation"].map(b => (
                <span key={b} style={{ fontSize: 12, color: "rgba(255,255,255,.32)", fontWeight: 500 }}>{b}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── FOOTER ──────────────────────────────────────────────────────── */
function Footer() {
  const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  const cols: Array<[string, Array<[string, string]>]> = [
    ["Navigation", [["About", "about"], ["Growth Framework", "growth"], ["Results", "results"], ["Process", "process"], ["FAQ", "faq"]]],
    ["Services", [["Sales Strategy", "contact"], ["Team Building", "contact"], ["Revenue Optimisation", "contact"], ["Leadership Coaching", "contact"]]],
    ["Contact", [["Ahmedabad – 380015", "contact"], ["+91 89802 11122", "contact"], ["dhiraj@hktconsultancy.in", "contact"]]],
  ];
  return (
    <footer style={{ background: N, padding: "clamp(48px,7vw,64px) clamp(1rem,3.5vw,2.5rem) 28px", borderTop: `4px solid ${G1}` }}>
      <div style={{ maxWidth: 1300, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,220px),1fr))", gap: "2.5rem", marginBottom: 44 }}>
          <div>
            <Image src={brandLogo} alt="HKT Consultancy" width={140} height={56} style={{ height: 52, width: "auto", objectFit: "contain", display: "block", marginBottom: 14, filter: "brightness(0) invert(1)" }} />
            <p style={{ fontSize: 13, lineHeight: 1.85, color: "rgba(255,255,255,.28)", maxWidth: 260 }}>
              Enabling manufacturing enterprises to achieve sustainable revenue growth, operational excellence, and leadership capability.
            </p>
          </div>
          {cols.map(([heading, items]) => (
            <nav key={heading} aria-label={heading}>
              <h2 style={{ fontSize: 10, fontWeight: 700, letterSpacing: ".16em", color: G1, textTransform: "uppercase", marginBottom: 18, opacity: .7 }}>{heading}</h2>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {items.map(([label, id]) => (
                  <li key={label} style={{ marginBottom: 10 }}>
                    <button onClick={() => go(id)} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: 13, color: "rgba(255,255,255,.28)", padding: 0, textAlign: "left", transition: "color .2s" }}
                      onMouseEnter={e => e.currentTarget.style.color = "#fff"}
                      onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,.28)"}
                    >{label}</button>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <div style={{ height: 1, background: `linear-gradient(90deg,transparent,rgba(201,168,76,.2),transparent)`, marginBottom: 22 }} />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10 }}>
          <p style={{ fontSize: 12, color: "rgba(255,255,255,.18)" }}>© {new Date().getFullYear()} HKT Consultancy. All rights reserved.</p>
          <p style={{ fontSize: 12, color: "rgba(255,255,255,.18)" }}>Business Growth Architects</p>
        </div>
      </div>
    </footer>
  );
}

/* ─── FLOATING WA ─────────────────────────────────────────────────── */
function FloatingWA() {
  const [hov, sh] = useState(false);
  return (
    <a href="https://wa.me/918980211122" target="_blank" rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      onMouseEnter={() => sh(true)} onMouseLeave={() => sh(false)}
      style={{
        position: "fixed",
        bottom: "max(24px,env(safe-area-inset-bottom,24px))",
        right: "max(20px,env(safe-area-inset-right,20px))",
        zIndex: 290, display: "flex", alignItems: "center", gap: 10,
        background: hov ? N2 : N,
        border: `1.5px solid ${hov ? G1 : "rgba(255,255,255,.15)"}`,
        color: "#fff", borderRadius: 100, padding: "11px 18px 11px 13px",
        textDecoration: "none",
        boxShadow: hov ? "0 12px 36px rgba(11,29,53,.4)" : "0 6px 24px rgba(11,29,53,.28)",
        transition: "all .35s cubic-bezier(.16,1,.3,1)",
        transform: hov ? "translateY(-3px)" : "translateY(0)",
        minHeight: 52,
      }}
    >
      <span style={{ width: 26, height: 26, borderRadius: "50%", background: `linear-gradient(135deg,${G1},${G2})`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <svg width="13" height="13" viewBox="0 0 24 24" fill={N}><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
      </span>
      <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: ".04em" }} className="wa-label">WhatsApp</span>
      <style>{`.wa-label{display:inline}@media(max-width:480px){.wa-label{display:none!important}}`}</style>
    </a>
  );
}

/* ─── APP ─────────────────────────────────────────────────────────── */
export default function App() {
  return (
    <div style={{ background: "#fff", overflowX: "hidden" }}>
      <style>{CSS}</style>
      <Nav />
      <main>
        <Hero />
        <Ticker />
        <Clients />
        <About />
        <Growth />
        <Results />
        <WhyHKT />
        <Process />
        <Achievements />
        <FAQ />
        <Contact />
        <Booking />
      </main>
      <Footer />
      <FloatingWA />
    </div>
  );
}
