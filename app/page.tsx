"use client";
import Image from "next/image";
import { useState, useEffect, useRef, type ReactNode, type CSSProperties, type ChangeEvent, type FormEvent } from "react";
import ownerImg from "../images/HKTOwner.png";
import kareliyaLogo from "../images/kareliya.webp";
import kapirajLogo from "../images/kapiraj.webp";
import brandLogo from "../images/logo.png";
import { FAQS } from "./faq-data";

/* ═══════════════════════════════════════════════════════════════════
   GLOBAL STYLES
   Colour + type tokens live in globals.css. Everything here is
   layout, motion and the responsive rules.
═══════════════════════════════════════════════════════════════════ */
const G = `
  :root { --gut: clamp(1.15rem, 4vw, 2.5rem); }
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { overflow-x: hidden; -webkit-font-smoothing: antialiased; }
  img { max-width: 100%; }
  ::selection { background: var(--brand); color: #ffffff; }
  ::-webkit-scrollbar { width: 8px; }
  ::-webkit-scrollbar-track { background: var(--surface); }
  ::-webkit-scrollbar-thumb { background: linear-gradient(to bottom,#051a30,#33526f); border-radius: 4px; }

  :focus-visible { outline: 2px solid var(--brand-soft); outline-offset: 3px; border-radius: 4px; }

  @keyframes fadeUp    { from{opacity:0;transform:translateY(36px)} to{opacity:1;transform:translateY(0)} }
  @keyframes fadeIn    { from{opacity:0} to{opacity:1} }
  @keyframes pulse     { 0%,100%{transform:scale(1);opacity:.7} 50%{transform:scale(1.18);opacity:.2} }
  @keyframes scrollDot { 0%,100%{transform:translateY(0);opacity:.6} 50%{transform:translateY(10px);opacity:.2} }
  @keyframes goldLine  { from{width:0} to{width:60px} }
  @keyframes counterUp { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }

  .reveal { opacity:0; transform:translateY(32px); transition:opacity .8s cubic-bezier(.16,1,.3,1), transform .8s cubic-bezier(.16,1,.3,1); }
  .reveal.visible { opacity:1; transform:translateY(0); }
  .d1{transition-delay:.08s} .d2{transition-delay:.16s} .d3{transition-delay:.24s}
  .d4{transition-delay:.32s} .d5{transition-delay:.40s} .d6{transition-delay:.48s}

  /* ── Layout primitives ───────────────────────────────────────── */
  .sec  { padding: clamp(64px, 8vw, 110px) var(--gut); }
  .wrap { max-width: 1320px; margin: 0 auto; width: 100%; }
  .grid-2 { display:grid; grid-template-columns:1fr 1fr; gap:clamp(2.5rem,5vw,6rem); align-items:center; }
  .grid-2-top { align-items:start; }
  /* min() stops auto-fit tracks from overflowing viewports narrower than the min track */
  .cards      { display:grid; grid-template-columns:repeat(auto-fit,minmax(min(100%,280px),1fr)); gap:16px; }
  .cards-wide { display:grid; grid-template-columns:repeat(auto-fit,minmax(min(100%,320px),1fr)); gap:16px; }
  .cards-sm   { display:grid; grid-template-columns:repeat(auto-fit,minmax(min(100%,150px),1fr)); gap:12px; }

  .glass {
    background: #ffffff;
    border: 1px solid var(--line);
    box-shadow: 0 4px 24px rgba(5,26,48,0.05);
  }
  .glass-gold {
    background: #ffffff;
    border: 1px solid var(--line-strong);
    box-shadow: 0 10px 40px rgba(5,26,48,0.08);
  }
  .brand-text {
    background: linear-gradient(135deg,#051a30 0%,#0e2f4d 45%,#1e4d73 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  .noise::before {
    content:''; position:absolute; inset:0; pointer-events:none; z-index:0;
    background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.028'/%3E%3C/svg%3E");
    background-size:180px 180px;
  }
  .hover-card { transition: transform .35s cubic-bezier(.16,1,.3,1), box-shadow .35s ease, border-color .35s ease; }
  .hover-card:hover { transform: translateY(-5px); border-color: var(--line-strong) !important; }

  .link-btn { background:none; border:none; cursor:pointer; padding:0; text-align:left; font:inherit; transition:color .2s; }

  .sr-only {
    position:absolute; width:1px; height:1px; padding:0; margin:-1px;
    overflow:hidden; clip:rect(0,0,0,0); white-space:nowrap; border:0;
  }

  /* ── Responsive ──────────────────────────────────────────────── */
  @media (max-width: 1100px) {
    .deco { display: none !important; }
  }
  @media (max-width: 900px) {
    .hide-mob   { display: none !important; }
    .mob-menu-btn { display: flex !important; }
    .grid-2     { grid-template-columns: 1fr !important; }
    .hero-media { order: -1; }
    .stack-mob  { flex-direction: column !important; align-items: flex-start !important; }
  }
  @media (max-width: 720px) {
    .hero-media   { justify-content: center !important; }
    .hero-actions { flex-direction: column !important; align-items: stretch !important; }
    .hero-actions > * { width: 100% !important; justify-content: center !important; }
    .hero-stats   { gap: 4px !important; }
    .scroll-cue   { display: none !important; }
    .float-label  { display: none !important; }
    .float-wa     { padding: 12px !important; border-radius: 50% !important; }
  }
  @media (max-width: 560px) {
    .cards-2      { grid-template-columns: 1fr !important; }
    .hero-stats   { flex-direction: column !important; align-items: flex-start !important; }
    .hero-stats > * { border-right: none !important; border-bottom: 1px solid var(--line); padding: 12px 0 !important; width: 100%; }
    .hero-stats > *:last-child { border-bottom: none; }
    .quote-card   { padding: 1.5rem !important; }
    .meta-row     { gap: 14px !important; }
  }
`;

/* ═══════════════════════════════════════════════════════════════════
   HOOKS
═══════════════════════════════════════════════════════════════════ */
function useInView<T extends Element = Element>(t = .12): [React.RefObject<T>, boolean] {
  const r = useRef<T | null>(null);
  const [v, s] = useState(false);
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) s(true); }, { threshold: t });
    if (r.current) o.observe(r.current);
    return () => o.disconnect();
  }, [t]);
  return [r as React.RefObject<T>, v];
}

function useReveal(){
  useEffect(()=>{
    const obs=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add("visible");});},{threshold:.08});
    document.querySelectorAll(".reveal").forEach(el=>obs.observe(el));
    return()=>obs.disconnect();
  },[]);
}

/* ═══════════════════════════════════════════════════════════════════
   COUNTER
═══════════════════════════════════════════════════════════════════ */
function Counter({ target, suffix = "", dur = 2200 }: { target: number; suffix?: string; dur?: number }) {
  const [val, set] = useState<number>(0);
  const [r, iv] = useInView<HTMLSpanElement>(.4);
  useEffect(() => {
    if (!iv) return;
    let s = 0;
    const step = Math.ceil(target / (dur / 16));
    const t = setInterval(() => {
      s += step;
      if (s >= target) {
        set(target);
        clearInterval(t);
      } else set(s);
    }, 16);
    return () => clearInterval(t);
  }, [iv, target, dur]);
  return <span ref={r} style={{ animation: iv ? "counterUp .55s ease both" : "none" }}>{val}{suffix}</span>;
}

/* ═══════════════════════════════════════════════════════════════════
   DIVIDER
═══════════════════════════════════════════════════════════════════ */
function Rule({ center }: { center?: boolean }) {
  return (
    <div aria-hidden="true" style={{ display: "flex", alignItems: "center", gap: 10, justifyContent: center ? "center" : "flex-start", marginBottom: 18 }}>
      <div style={{ width: 40, height: 2, background: "linear-gradient(90deg,#051a30,#1e4d73)", borderRadius: 2, animation: "goldLine .8s ease both" }}/>
      <div style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--brand)" }}/>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   SECTION LABEL
═══════════════════════════════════════════════════════════════════ */
function Label({ children }: { children: ReactNode }) {
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
      <div aria-hidden="true" style={{ width: 20, height: 2, background: "var(--brand-soft)", borderRadius: 2 }}/>
      <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--brand-soft)" }}>{children}</span>
    </div>
  );
}

/* Section heading — one shared style so every h2 matches */
const h2Style: CSSProperties = {
  fontSize: "clamp(1.85rem,4.2vw,3.2rem)",
  fontWeight: 800,
  color: "var(--ink)",
  letterSpacing: "-0.03em",
  lineHeight: 1.12,
};
const emphasis: CSSProperties = { fontWeight: 300, fontStyle: "italic", color: "var(--brand-soft)" };

const bodyText: CSSProperties = { fontSize: 15, lineHeight: 1.8, color: "var(--body)", fontWeight: 400 };
const metaText: CSSProperties = { fontSize: 12, color: "var(--muted)", letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 600 };

const primaryBtn: CSSProperties = {
  background: "linear-gradient(135deg,#051a30 0%,#1e4d73 100%)",
  color: "#ffffff", border: "none", borderRadius: 100,
  padding: "14px 32px", fontSize: 13, fontWeight: 700,
  letterSpacing: "0.07em", textTransform: "uppercase", cursor: "pointer",
  transition: "transform .25s, box-shadow .25s", boxShadow: "0 6px 24px rgba(5,26,48,0.3)",
  fontFamily: "inherit",
};

/* ═══════════════════════════════════════════════════════════════════
   NAV
═══════════════════════════════════════════════════════════════════ */
const NAV_LINKS: Array<[string, string]> = [
  ["About", "about"],
  ["Clients", "clients"],
  ["Case Studies", "case-studies"],
  ["Process", "process"],
  ["Achievements", "achievements"],
  ["FAQ", "faq"],
  ["Contact", "contact"],
];

function Nav(){
  const [sc, setSc] = useState(false);
  const [mo, setMo] = useState(false);
  useEffect(()=>{
    const h=()=>setSc(window.scrollY>50);
    h();
    window.addEventListener("scroll",h,{passive:true});
    return()=>window.removeEventListener("scroll",h);
  },[]);
  const go = (id: string) => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); setMo(false); };

  return (
    <header>
      <nav aria-label="Primary" style={{
        position:"fixed",top:0,left:0,right:0,zIndex:200,
        background:sc?"rgba(255,255,255,0.94)":"rgba(255,255,255,0.6)",
        backdropFilter:"blur(28px)",
        WebkitBackdropFilter:"blur(28px)",
        borderBottom:sc?"1px solid var(--line)":"1px solid transparent",
        boxShadow:sc?"0 1px 30px rgba(5,26,48,0.08)":"none",
        transition:"all .4s cubic-bezier(.16,1,.3,1)",
        padding:"0 var(--gut)",
      }}>
        <div style={{maxWidth:1320,margin:"0 auto",height:"var(--nav-h)",display:"flex",alignItems:"center",justifyContent:"space-between",gap:16}}>
          {/* Brand */}
          <button
            onClick={()=>window.scrollTo({top:0,behavior:"smooth"})}
            aria-label="HKT Consultancy — back to top"
            className="link-btn"
            style={{display:"flex",alignItems:"center",gap:10,flexShrink:0}}
          >
            <Image
              src={brandLogo}
              alt="HKT Consultancy logo"
              width={46}
              height={46}
              priority
              style={{width:46,height:46,objectFit:"contain",display:"block"}}
            />
            <span style={{fontSize:17,fontWeight:700,color:"var(--ink)",letterSpacing:"-0.01em",whiteSpace:"nowrap"}}>
              HKT <span style={{color:"var(--muted)",fontWeight:400}}>Consultancy</span>
            </span>
          </button>

          {/* Desktop links */}
          <div style={{display:"flex",gap:"1.6rem",alignItems:"center"}} className="hide-mob">
            {NAV_LINKS.map(([label,id])=>(
              <button key={id} onClick={()=>go(id)} className="link-btn"
                style={{fontSize:12,fontWeight:600,color:"var(--body)",letterSpacing:"0.06em",textTransform:"uppercase",padding:"4px 0"}}
                onMouseEnter={e=>{e.currentTarget.style.color="var(--brand-soft)"}}
                onMouseLeave={e=>{e.currentTarget.style.color="var(--body)"}}
              >{label}</button>
            ))}
            <button onClick={()=>go("contact")} style={{...primaryBtn,padding:"10px 24px",fontSize:12,boxShadow:"0 4px 18px rgba(5,26,48,0.25)"}}
              onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-1px)";}}
              onMouseLeave={e=>{e.currentTarget.style.transform="translateY(0)";}}
            >Book Call</button>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={()=>setMo(!mo)}
            aria-label={mo ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mo}
            aria-controls="mobile-menu"
            className="mob-menu-btn"
            style={{display:"none",background:"none",border:"none",cursor:"pointer",flexDirection:"column",gap:6,padding:8,minWidth:44,minHeight:44,alignItems:"center",justifyContent:"center"}}
          >
            {[0,1,2].map(i=>(
              <span key={i} aria-hidden="true" style={{
                display:"block",width:24,height:2,background:"var(--ink)",borderRadius:2,transition:"all .3s",
                transform:mo?(i===0?"rotate(45deg) translate(5px,6px)":i===2?"rotate(-45deg) translate(5px,-6px)":""):"",
                opacity:mo&&i===1?0:1,
              }}/>
            ))}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div id="mobile-menu" style={{
        position:"fixed",top:"var(--nav-h)",left:0,right:0,zIndex:199,
        background:"rgba(255,255,255,0.98)",backdropFilter:"blur(28px)",WebkitBackdropFilter:"blur(28px)",
        maxHeight:mo?640:0,overflow:"hidden",transition:"max-height .45s cubic-bezier(.16,1,.3,1)",
        borderBottom:mo?"1px solid var(--line)":"none",
        padding:"0 var(--gut)",
        visibility:mo?"visible":"hidden",
      }}>
        <div style={{padding:"0.5rem 0 1.25rem"}}>
          {NAV_LINKS.map(([label,id])=>(
            <div key={id} style={{borderBottom:"1px solid var(--line)"}}>
              <button onClick={()=>go(id)} className="link-btn" tabIndex={mo?0:-1}
                style={{fontSize:16,fontWeight:500,color:"var(--ink)",width:"100%",padding:"14px 2px"}}
              >{label}</button>
            </div>
          ))}
        </div>
      </div>
    </header>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   HERO
═══════════════════════════════════════════════════════════════════ */
function Hero(){
  useReveal();
  return(
    <section id="hero" aria-labelledby="hero-title" className="noise" style={{
      minHeight:"calc(100vh - var(--nav-h))",background:"#ffffff",
      display:"flex",flexDirection:"column",justifyContent:"center",
      position:"relative",overflow:"hidden",paddingTop:"var(--nav-h)",
    }}>
      {/* Atmospheric lights */}
      <div aria-hidden="true" style={{position:"absolute",top:"-10%",left:"35%",width:800,height:600,background:"radial-gradient(ellipse,rgba(5,26,48,0.05) 0%,transparent 65%)",pointerEvents:"none",maxWidth:"100%"}}/>
      <div aria-hidden="true" style={{position:"absolute",bottom:"-5%",right:"-5%",width:500,height:500,background:"radial-gradient(ellipse,rgba(5,26,48,0.03) 0%,transparent 70%)",pointerEvents:"none",maxWidth:"100%"}}/>
      {/* Grid */}
      <svg aria-hidden="true" style={{position:"absolute",inset:0,opacity:.022,pointerEvents:"none"}} width="100%" height="100%">
        <defs><pattern id="hg" width="72" height="72" patternUnits="userSpaceOnUse"><path d="M72 0L0 0 0 72" fill="none" stroke="#051a30" strokeWidth=".6"/></pattern></defs>
        <rect width="100%" height="100%" fill="url(#hg)"/>
      </svg>

      <div className="wrap" style={{padding:"clamp(2.5rem,6vw,5rem) var(--gut) 2rem",position:"relative",zIndex:1}}>
        <div className="grid-2">
          {/* LEFT */}
          <div>
            <div className="reveal" style={{marginBottom:28}}>
              <div style={{display:"inline-flex",alignItems:"center",gap:10,background:"rgba(5,26,48,0.06)",border:"1px solid var(--line-strong)",borderRadius:100,padding:"8px 18px"}}>
                <span aria-hidden="true" style={{width:6,height:6,borderRadius:"50%",background:"var(--brand)",display:"block",animation:"pulse 2s ease infinite",flexShrink:0}}/>
                <span style={{fontSize:11,fontWeight:600,letterSpacing:"0.14em",color:"var(--ink)",textTransform:"uppercase"}}>Manufacturing Business Consulting</span>
              </div>
            </div>

            {/* Single H1 — search engines expect exactly one per page */}
            <h1 id="hero-title" className="reveal d1" style={{
              fontSize:"clamp(2.4rem,6.5vw,4.6rem)",fontWeight:800,lineHeight:1.06,
              color:"var(--ink)",marginBottom:28,letterSpacing:"-0.035em",
            }}>
              <span style={{display:"block"}}>Transforming</span>
              <span style={{display:"block"}}>Manufacturing</span>
              <span className="brand-text" style={{display:"block",fontWeight:300,fontStyle:"italic"}}>Enterprises.</span>
            </h1>

            <p className="reveal d4" style={{...bodyText,marginBottom:40,maxWidth:520}}>
              Dhiraj Thakur brings 30+ years of frontline experience in sales leadership, team building, and operational
              excellence — exclusively serving manufacturing enterprises that demand real results.
            </p>

            <div className="reveal d4 hero-actions" style={{display:"flex",gap:14,flexWrap:"wrap"}}>
              <button onClick={()=>document.getElementById("contact")?.scrollIntoView({behavior:"smooth"})} style={primaryBtn}
                onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-2px)";}}
                onMouseLeave={e=>{e.currentTarget.style.transform="translateY(0)";}}
              >Book Free Consultation</button>
              <a href="https://wa.me/918980211122" target="_blank" rel="noopener noreferrer" style={{
                background:"transparent",color:"var(--ink)",
                border:"1.5px solid var(--line-strong)",borderRadius:100,
                padding:"14px 32px",fontSize:13,fontWeight:600,letterSpacing:"0.07em",
                textTransform:"uppercase",textDecoration:"none",
                transition:"all .3s",display:"inline-flex",alignItems:"center",gap:10,
              }}
                onMouseEnter={e=>{e.currentTarget.style.borderColor="var(--brand)";e.currentTarget.style.background="rgba(5,26,48,0.04)";}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor="var(--line-strong)";e.currentTarget.style.background="transparent";}}
              >
                <svg aria-hidden="true" width="17" height="17" viewBox="0 0 24 24" fill="#25D366"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                WhatsApp
              </a>
            </div>

            {/* Stats */}
            <div className="reveal d5 hero-stats" style={{display:"flex",gap:0,margin:"48px 0 0",maxWidth:560,paddingTop:32,borderTop:"1px solid var(--line)"}}>
              {[["30+","Years"],["200+","Enterprises"],["₹500Cr+","Revenue"]].map(([n,l],i)=>(
                <div key={l} style={{flex:"1 1 0",minWidth:0,paddingRight:i<2?20:0,borderRight:i<2?"1px solid var(--line)":"none",paddingLeft:i>0?20:0}}>
                  <div className="brand-text" style={{fontSize:"clamp(1.5rem,4vw,1.85rem)",fontWeight:800,lineHeight:1.1,marginBottom:6}}>{n}</div>
                  <div style={metaText}>{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — portrait */}
          <div className="reveal d3 hero-media" style={{display:"flex",justifyContent:"center"}}>
            <div style={{position:"relative",width:"100%",maxWidth:420,margin:"0 auto"}}>
              {/* Decorative rings — desktop only, they overflow narrow screens */}
              <div aria-hidden="true" className="deco" style={{position:"absolute",top:-24,right:-24,width:450,height:540,borderRadius:20,border:"1px solid var(--line)",zIndex:0}}/>
              <div aria-hidden="true" className="deco" style={{position:"absolute",top:-44,right:-44,width:480,height:570,borderRadius:24,border:"1px solid rgba(5,26,48,0.06)",zIndex:0}}/>
              {/* Corner accents */}
              <div aria-hidden="true" style={{position:"absolute",top:-8,right:-8,width:56,height:56,borderTop:"2px solid var(--brand-soft)",borderRight:"2px solid var(--brand-soft)",borderRadius:"0 8px 0 0",zIndex:2}}/>
              <div aria-hidden="true" style={{position:"absolute",bottom:-8,left:-8,width:56,height:56,borderBottom:"2px solid var(--brand-soft)",borderLeft:"2px solid var(--brand-soft)",borderRadius:"0 0 0 8px",zIndex:2}}/>
              {/* Photo */}
              <div style={{borderRadius:14,overflow:"hidden",position:"relative",zIndex:1}}>
                <Image
                  src={ownerImg}
                  alt="Dhiraj Thakur, founder of HKT Consultancy and manufacturing business growth consultant"
                  width={420}
                  height={490}
                  priority
                  sizes="(max-width: 900px) 90vw, 420px"
                  style={{width:"100%",height:"auto",aspectRatio:"42/49",objectFit:"cover",objectPosition:"center top",display:"block",filter:"grayscale(100%) contrast(1.08) brightness(0.92)"}}
                />
                <div aria-hidden="true" style={{position:"absolute",bottom:0,left:0,right:0,height:"45%",background:"linear-gradient(to top,rgba(5,26,48,0.97) 0%,rgba(5,26,48,0.55) 55%,transparent 100%)"}}/>
                <div style={{position:"absolute",bottom:0,left:0,right:0,padding:"1.5rem 1.6rem"}}>
                  <p style={{fontSize:19,fontWeight:700,color:"#ffffff",letterSpacing:"-0.02em"}}>Dhiraj Thakur</p>
                  <p style={{fontSize:11,color:"var(--on-dark-muted)",letterSpacing:"0.12em",textTransform:"uppercase",marginTop:4,fontWeight:600}}>Founder · HKT Consultancy</p>
                  <div style={{marginTop:12,display:"flex",gap:6,flexWrap:"wrap"}}>
                    {["Sales Expert","30+ Yrs","Manufacturing"].map(t=>(
                      <span key={t} style={{background:"rgba(255,255,255,0.18)",border:"1px solid rgba(255,255,255,0.35)",borderRadius:100,padding:"4px 10px",fontSize:10,color:"#ffffff",letterSpacing:"0.06em",fontWeight:500}}>{t}</span>
                    ))}
                  </div>
                </div>
              </div>
              {/* Floating metric */}
              <div className="glass-gold" style={{position:"absolute",bottom:-26,left:-16,borderRadius:14,padding:"14px 18px",zIndex:3,display:"flex",alignItems:"center",gap:12,boxShadow:"0 18px 40px rgba(5,26,48,0.18)"}}>
                <div aria-hidden="true" style={{width:36,height:36,borderRadius:8,background:"rgba(5,26,48,0.1)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#051a30" strokeWidth="2.5"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>
                </div>
                <div>
                  <div className="brand-text" style={{fontSize:18,fontWeight:800,lineHeight:1.1}}>₹500 Cr+</div>
                  <div style={{...metaText,fontSize:10,marginTop:3}}>Revenue Impact</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div aria-hidden="true" className="scroll-cue" style={{position:"absolute",bottom:28,left:"50%",transform:"translateX(-50%)",display:"flex",flexDirection:"column",alignItems:"center",gap:8}}>
        <span style={{fontSize:10,color:"var(--muted)",letterSpacing:"0.16em",textTransform:"uppercase",fontWeight:600}}>Scroll</span>
        <div style={{width:1,height:36,background:"linear-gradient(to bottom,var(--brand-soft),transparent)",animation:"scrollDot 2.2s ease infinite"}}/>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   CLIENTS
═══════════════════════════════════════════════════════════════════ */
function Clients(){
  useReveal();
  const ph=["Precision Tools Ltd","IndoTech MFG","Apex Engineering","BharatForge Co.","Sterling Industries","ProMach Systems","National Castings","Metalcraft India","SteelWorks Pvt","ThermoTech"];
  return(
    <section id="clients" aria-labelledby="clients-title" className="sec" style={{background:"var(--surface)",borderTop:"1px solid var(--line)"}}>
      <div className="wrap">
        <div className="reveal" style={{textAlign:"center",marginBottom:44}}>
          <Label>Trusted By Industry Leaders</Label>
          <h2 id="clients-title" style={{...h2Style,fontSize:"clamp(1.4rem,3vw,1.9rem)",marginBottom:12}}>
            Manufacturing Enterprises <span style={emphasis}>We Partner With.</span>
          </h2>
          <p style={{...bodyText,fontSize:14,maxWidth:620,margin:"0 auto"}}>
            Industrial and manufacturing businesses across India that have grown with HKT Consultancy.
          </p>
        </div>

        {/* Featured client logos */}
        <div className="reveal d1" style={{display:"flex",gap:20,justifyContent:"center",marginBottom:24,flexWrap:"wrap"}}>
          {[{img:kareliyaLogo,name:"Kareliya Equipments"},{img:kapirajLogo,name:"Kapiraj Ayurveda"}].map(c=>(
            <div key={c.name} className="glass hover-card" style={{width:200,maxWidth:"100%",height:100,borderRadius:12,display:"flex",alignItems:"center",justifyContent:"center",overflow:"hidden",padding:16,filter:"grayscale(100%) brightness(0.8)",transition:"filter .35s,transform .35s,box-shadow .35s,border-color .35s"}}
              onMouseEnter={e=>{e.currentTarget.style.filter="grayscale(0%) brightness(1)";}}
              onMouseLeave={e=>{e.currentTarget.style.filter="grayscale(100%) brightness(0.8)";}}
            >
              <Image src={c.img} alt={`${c.name} — HKT Consultancy client logo`} width={180} height={72} style={{maxWidth:"100%",maxHeight:"80%",width:"auto",height:"auto",objectFit:"contain"}} />
            </div>
          ))}
        </div>

        <div aria-hidden="true" style={{height:1,background:"linear-gradient(90deg,transparent,var(--line-strong),transparent)",margin:"0 0 24px"}}/>

        <ul className="reveal d2 cards-sm" style={{listStyle:"none",padding:0,margin:0}}>
          {ph.map(b=>(
            <li key={b} className="glass" style={{padding:"18px 12px",display:"flex",alignItems:"center",justifyContent:"center",borderRadius:8,background:"#ffffff",minHeight:64}}>
              <span style={{fontSize:11,fontWeight:600,color:"var(--muted)",letterSpacing:"0.07em",textTransform:"uppercase",textAlign:"center",lineHeight:1.4}}>{b}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   ABOUT
═══════════════════════════════════════════════════════════════════ */
function About(){
  useReveal();
  const pillars=[
    {icon:"↗",title:"Sales Architecture",desc:"Designing end-to-end sales systems that drive consistent, scalable revenue for manufacturing businesses."},
    {icon:"◎",title:"Team Leadership",desc:"Building high-performance sales and operations teams through structured training and accountability."},
    {icon:"⌘",title:"Operational Excellence",desc:"Identifying inefficiencies and implementing process improvements that translate to the bottom line."},
    {icon:"◈",title:"Manufacturing Focus",desc:"Deep domain expertise in industrial sectors — understanding challenges from the inside."},
  ];
  return(
    <section id="about" aria-labelledby="about-title" className="sec noise" style={{background:"#ffffff",position:"relative",overflow:"hidden"}}>
      <div aria-hidden="true" style={{position:"absolute",bottom:-80,left:-80,width:480,height:480,background:"radial-gradient(circle,rgba(5,26,48,0.04) 0%,transparent 68%)",pointerEvents:"none"}}/>
      <div className="wrap grid-2" style={{position:"relative",zIndex:1}}>
        {/* Left */}
        <div className="reveal">
          <figure className="glass-gold quote-card" style={{borderRadius:16,padding:"2.25rem",marginBottom:16,position:"relative",overflow:"hidden"}}>
            <div aria-hidden="true" style={{position:"absolute",top:-20,right:-20,width:140,height:140,background:"radial-gradient(circle,rgba(5,26,48,0.06) 0%,transparent 70%)"}}/>
            <div aria-hidden="true" style={{fontSize:64,fontWeight:800,color:"rgba(5,26,48,0.14)",lineHeight:1,marginBottom:12,fontStyle:"italic"}}>&ldquo;</div>
            <blockquote style={{fontSize:"clamp(1rem,2.4vw,1.2rem)",lineHeight:1.75,color:"var(--ink)",fontStyle:"italic",fontWeight:400,position:"relative",zIndex:1}}>
              Sustainable growth is never accidental — it is engineered.
            </blockquote>
            <figcaption style={{marginTop:20,display:"flex",alignItems:"center",gap:12}}>
              <span aria-hidden="true" style={{width:28,height:2,background:"linear-gradient(90deg,#051a30,#1e4d73)",borderRadius:2,flexShrink:0}}/>
              <span style={{fontSize:12,color:"var(--muted)",letterSpacing:"0.04em",fontWeight:600}}>Dhiraj Thakur · Founder, HKT Consultancy</span>
            </figcaption>
          </figure>
          <div className="cards-2" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
            {[["30+","Years Experience"],["200+","Enterprises"],["15+","Industries"],["500+","Leaders Coached"]].map(([n,l])=>(
              <div key={l} className="glass hover-card" style={{borderRadius:12,padding:"20px 16px",textAlign:"center"}}>
                <div className="brand-text" style={{fontSize:"clamp(1.4rem,3.4vw,1.7rem)",fontWeight:800,lineHeight:1.1,marginBottom:6}}>{n}</div>
                <div style={{...metaText,fontSize:11}}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right */}
        <div className="reveal d2">
          <Label>About Dhiraj Thakur</Label>
          <Rule/>
          <h2 id="about-title" style={{...h2Style,fontSize:"clamp(1.6rem,3.4vw,2.5rem)",marginBottom:20}}>
            A Consultant Who Has Lived the Challenges You Face
          </h2>
          <p style={{...bodyText,fontSize:14.5,marginBottom:16}}>
            Dhiraj Thakur is the founder of HKT Consultancy and one of India&apos;s most experienced business growth consultants
            in the manufacturing sector. With over 30 years of hands-on experience leading sales organisations, restructuring
            business operations, and coaching enterprise leadership teams, Dhiraj brings practical wisdom that textbooks
            cannot teach.
          </p>
          <p style={{...bodyText,fontSize:14.5,marginBottom:32}}>
            His approach is grounded in field experience — consistently helping manufacturing enterprises break through
            revenue plateaus to achieve sustained, profitable growth.
          </p>
          <div className="cards-2" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
            {pillars.map(p=>(
              <div key={p.title} className="glass hover-card" style={{borderRadius:12,padding:"18px"}}>
                <div aria-hidden="true" style={{fontSize:20,color:"var(--brand-soft)",marginBottom:10,lineHeight:1}}>{p.icon}</div>
                <h3 style={{fontSize:13.5,fontWeight:700,color:"var(--ink)",marginBottom:6,lineHeight:1.35}}>{p.title}</h3>
                <p style={{fontSize:12.5,color:"var(--muted)",lineHeight:1.65,fontWeight:400}}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   CASE STUDIES
═══════════════════════════════════════════════════════════════════ */
function CaseStudies(){
  useReveal();
  const cases=[
    {industry:"Precision Engineering",client:"Mid-Sized Auto Component Manufacturer",challenge:"Stagnant revenue for 3 consecutive years; fragmented sales team with no defined process or accountability structure.",strategy:"Redesigned the entire sales pipeline, introduced Key Account Management, and deployed a structured coaching programme for the 18-person sales team.",outcome:"Revenue grew 62% in 18 months. Sales team attrition dropped from 40% to 8%. Three new enterprise accounts onboarded.",metric:"+62%",ml:"Revenue Growth"},
    {industry:"Industrial Equipment",client:"Capital Equipment OEM — Pan-India",challenge:"Ineffective distribution network, low channel partner productivity, and no structured go-to-market strategy for new product lines.",strategy:"Mapped channel gaps, designed a tiered partner programme, and trained 35 regional sales managers on value-based selling.",outcome:"Channel revenue increased 45%. New product line achieved ₹18 Cr in sales in Year 1.",metric:"+45%",ml:"Channel Revenue"},
    {industry:"Process Manufacturing",client:"Chemical Processing Enterprise",challenge:"Over-reliance on legacy clients, no new business development engine, and an ageing leadership team resistant to change.",strategy:"Conducted full business diagnostic, built a new business development function, and facilitated leadership alignment workshops.",outcome:"New business contributed 30% of total revenue within 24 months.",metric:"+30%",ml:"New Business"},
  ];
  return(
    <section id="case-studies" aria-labelledby="cases-title" className="sec" style={{background:"var(--surface)"}}>
      <div className="wrap">
        <div className="reveal" style={{marginBottom:52}}>
          <Label>Proven Results</Label>
          <Rule/>
          <h2 id="cases-title" style={h2Style}>
            Client <span style={emphasis}>Transformations.</span>
          </h2>
        </div>
        <div className="cards-wide">
          {cases.map((c,i)=>(
            <article key={c.client} className={`reveal d${i+1} glass hover-card`} style={{borderRadius:16,overflow:"hidden"}}>
              <div style={{padding:"1.8rem 1.8rem 1.4rem",borderBottom:"1px solid var(--line)"}}>
                <p style={{...metaText,fontSize:11,marginBottom:10}}>{c.industry}</p>
                <h3 style={{fontSize:15,fontWeight:700,color:"var(--ink)",marginBottom:18,lineHeight:1.45}}>{c.client}</h3>
                <p style={{display:"flex",alignItems:"baseline",gap:8,flexWrap:"wrap"}}>
                  <span className="brand-text" style={{fontSize:"clamp(2.2rem,6vw,2.75rem)",fontWeight:800,lineHeight:1,letterSpacing:"-0.03em"}}>{c.metric}</span>
                  <span style={{fontSize:12.5,color:"var(--muted)",fontWeight:600}}>{c.ml}</span>
                </p>
              </div>
              <div style={{padding:"1.4rem 1.8rem 1.6rem"}}>
                {[{l:"Challenge",t:c.challenge},{l:"Strategy",t:c.strategy},{l:"Outcome",t:c.outcome}].map(item=>(
                  <div key={item.l} style={{marginBottom:14}}>
                    <h4 style={{fontSize:10.5,fontWeight:700,color:"var(--brand-soft)",letterSpacing:"0.12em",textTransform:"uppercase",marginBottom:5}}>{item.l}</h4>
                    <p style={{fontSize:13,color:"var(--body)",lineHeight:1.7}}>{item.t}</p>
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

/* ═══════════════════════════════════════════════════════════════════
   WHY CHOOSE
═══════════════════════════════════════════════════════════════════ */
function WhyChoose(){
  useReveal();
  const r=[
    {title:"30+ Years Field Expertise",desc:"Practical, ground-level experience across sales, operations, and leadership in manufacturing industries."},
    {title:"Manufacturing Domain Depth",desc:"Exclusive focus on industrial and manufacturing enterprises gives unmatched sector understanding."},
    {title:"Proven Sales Leadership",desc:"Built and scaled high-performing sales organisations, delivering double-digit revenue growth."},
    {title:"Long-Term Partnership",desc:"We don't deliver reports and leave. We stay engaged until measurable outcomes are achieved."},
    {title:"Strategic & Operational Bridge",desc:"Translating boardroom strategy into factory-floor execution — bridging vision and reality."},
    {title:"Results-First Accountability",desc:"Every engagement structured around clear KPIs, milestone reviews, and outcome-based accountability."},
  ];
  return(
    <section id="why-choose-me" aria-labelledby="why-title" className="sec noise" style={{background:"#ffffff",position:"relative",overflow:"hidden"}}>
      <div aria-hidden="true" style={{position:"absolute",top:-100,right:-100,width:600,height:600,background:"radial-gradient(circle,rgba(5,26,48,0.025) 0%,transparent 65%)",pointerEvents:"none"}}/>
      <div className="wrap" style={{position:"relative",zIndex:1}}>
        <div className="reveal" style={{marginBottom:52}}>
          <Label>The HKT Difference</Label>
          <Rule/>
          <h2 id="why-title" style={h2Style}>
            Why Enterprise Leaders <span style={emphasis}>Choose HKT.</span>
          </h2>
        </div>
        <div className="cards">
          {r.map((item,i)=>(
            <div key={item.title} className={`reveal d${(i%3)+1} glass hover-card`} style={{borderRadius:14,padding:"1.75rem",position:"relative",overflow:"hidden"}}>
              <div aria-hidden="true" style={{position:"absolute",top:0,left:0,width:3,height:"100%",background:"linear-gradient(to bottom,#051a30,rgba(5,26,48,0))"}}/>
              <div style={{paddingLeft:16}}>
                <p style={{fontSize:12,fontWeight:700,color:"var(--brand-soft)",letterSpacing:"0.12em",marginBottom:10}}>0{i+1}</p>
                <h3 style={{fontSize:15,fontWeight:700,color:"var(--ink)",marginBottom:8,lineHeight:1.35}}>{item.title}</h3>
                <p style={{fontSize:13.5,color:"var(--body)",lineHeight:1.7}}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   PROCESS
═══════════════════════════════════════════════════════════════════ */
function Process(){
  useReveal();
  const steps=[
    {num:"01",title:"Discovery Call",desc:"A focused 45-minute conversation to understand your business context, current challenges, and growth ambitions."},
    {num:"02",title:"Business Analysis",desc:"Structured diagnostic covering sales performance, team capability, operational processes, and market positioning."},
    {num:"03",title:"Strategy Planning",desc:"Co-creation of a tailored growth roadmap with clear priorities, timelines, and measurable milestones."},
    {num:"04",title:"Team Alignment",desc:"Workshops and sessions to align leadership and key teams around the strategy and their roles in it."},
    {num:"05",title:"Execution Guidance",desc:"Active consulting support during implementation — removing bottlenecks, coaching managers, tracking progress."},
    {num:"06",title:"Revenue Optimisation",desc:"Continuous refinement of sales processes and go-to-market strategies to sustain and accelerate growth."},
  ];
  return(
    <section id="process" aria-labelledby="process-title" className="sec" style={{background:"var(--surface)"}}>
      <div className="wrap">
        <div className="reveal" style={{textAlign:"center",marginBottom:56}}>
          <Label>How We Work</Label>
          <Rule center/>
          <h2 id="process-title" style={h2Style}>
            Our Consulting <span style={emphasis}>Process.</span>
          </h2>
        </div>
        <div style={{position:"relative"}}>
          <div aria-hidden="true" className="hide-mob" style={{position:"absolute",top:32,left:"8.33%",right:"8.33%",height:1,background:"linear-gradient(90deg,transparent,var(--line),var(--line-strong),var(--line),transparent)",zIndex:0}}/>
          <ol style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(min(100%,190px),1fr))",gap:32,position:"relative",zIndex:1,listStyle:"none",padding:0,margin:0}}>
            {steps.map((s,i)=>(
              <li key={s.num} className={`reveal d${(i%3)+1}`} style={{textAlign:"center",padding:"0 8px"}}>
                <div aria-hidden="true" style={{
                  width:64,height:64,borderRadius:"50%",
                  border:"1.5px solid var(--line-strong)",
                  display:"flex",alignItems:"center",justifyContent:"center",
                  margin:"0 auto 20px",background:"var(--surface)",transition:"all .35s",
                }}
                  onMouseEnter={e=>{e.currentTarget.style.borderColor="var(--brand)";e.currentTarget.style.background="rgba(5,26,48,0.06)";}}
                  onMouseLeave={e=>{e.currentTarget.style.borderColor="var(--line-strong)";e.currentTarget.style.background="var(--surface)";}}
                >
                  <span style={{fontSize:14,fontWeight:700,color:"var(--brand)",letterSpacing:"0.04em"}}>{s.num}</span>
                </div>
                <h3 style={{fontSize:14.5,fontWeight:700,color:"var(--ink)",marginBottom:10}}>{s.title}</h3>
                <p style={{fontSize:13,color:"var(--body)",lineHeight:1.7}}>{s.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   ACHIEVEMENTS
═══════════════════════════════════════════════════════════════════ */
function Achievements(){
  useReveal();
  const stats=[
    {target:30,suffix:"+",label:"Years of Experience",sub:"Sales, operations & leadership"},
    {target:200,suffix:"+",label:"Enterprises Consulted",sub:"Manufacturing & industrial"},
    {target:500,suffix:"Cr+",label:"Revenue Generated ₹",sub:"Cumulative client impact"},
    {target:500,suffix:"+",label:"Leaders Coached",sub:"Sales managers & executives"},
    {target:15,suffix:"+",label:"Industries Served",sub:"Across manufacturing verticals"},
    {target:95,suffix:"%",label:"Client Retention",sub:"Long-term partnerships"},
  ];
  return(
    <section id="achievements" aria-labelledby="achievements-title" className="sec" style={{background:"linear-gradient(180deg,var(--surface) 0%,#ffffff 100%)",position:"relative",overflow:"hidden"}}>
      <div aria-hidden="true" style={{position:"absolute",top:0,left:0,right:0,height:4,background:"linear-gradient(90deg,transparent 0%,#051a30 30%,#1e4d73 50%,#051a30 70%,transparent 100%)"}}/>
      <div className="wrap">
        <div className="reveal" style={{marginBottom:52}}>
          <Label>By The Numbers</Label>
          <Rule/>
          <h2 id="achievements-title" style={h2Style}>
            Three Decades of <span style={emphasis}>Measurable Impact.</span>
          </h2>
        </div>
        {/* 1px gap over a tinted background draws the grid lines — survives any wrap count */}
        <dl style={{
          display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(min(100%,210px),1fr))",
          gap:1,background:"var(--line-strong)",border:"1px solid var(--line-strong)",
          borderRadius:6,overflow:"hidden",margin:0,
        }}>
          {stats.map((s,i)=>(
            <div key={s.label} className={`reveal d${(i%3)+1}`} style={{padding:"2.25rem 1.75rem",background:"#ffffff",transition:"background .25s"}}
              onMouseEnter={e=>e.currentTarget.style.background="rgba(5,26,48,0.04)"}
              onMouseLeave={e=>e.currentTarget.style.background="#ffffff"}
            >
              <dd className="brand-text" style={{fontSize:"clamp(2rem,5.5vw,2.6rem)",fontWeight:800,lineHeight:1,marginBottom:10,letterSpacing:"-0.03em",marginInlineStart:0}}>
                <Counter target={s.target} suffix={s.suffix}/>
              </dd>
              <dt style={{fontSize:14,fontWeight:700,color:"var(--ink)",marginBottom:4}}>{s.label}</dt>
              <p style={{fontSize:12.5,color:"var(--muted)"}}>{s.sub}</p>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   FAQ
═══════════════════════════════════════════════════════════════════ */
function FAQ(){
  useReveal();
  const [open, setOpen] = useState<number | null>(null);
  return(
    <section id="faq" aria-labelledby="faq-title" className="sec noise" style={{background:"#ffffff"}}>
      <div style={{maxWidth:820,margin:"0 auto"}}>
        <div className="reveal" style={{textAlign:"center",marginBottom:44}}>
          <Label>Common Questions</Label>
          <Rule center/>
          <h2 id="faq-title" style={h2Style}>
            Frequently Asked <span style={emphasis}>Questions.</span>
          </h2>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:8}}>
          {FAQS.map((f,i)=>(
            <div key={f.q} className={`reveal d${(i%3)+1}`} style={{
              borderRadius:12,overflow:"hidden",
              border:open===i?"1px solid var(--line-strong)":"1px solid var(--line)",
              background:open===i?"rgba(5,26,48,0.03)":"#ffffff",transition:"all .3s",
            }}>
              <h3 style={{margin:0}}>
                <button
                  onClick={()=>setOpen(open===i?null:i)}
                  aria-expanded={open===i}
                  aria-controls={`faq-answer-${i}`}
                  className="link-btn"
                  style={{width:"100%",display:"flex",justifyContent:"space-between",alignItems:"center",padding:"18px 20px",gap:16}}
                >
                  <span style={{fontSize:15,fontWeight:600,color:"var(--ink)",lineHeight:1.5}}>{f.q}</span>
                  <span aria-hidden="true" style={{
                    width:30,height:30,borderRadius:"50%",border:"1.5px solid var(--line-strong)",
                    display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,
                    transform:open===i?"rotate(45deg)":"rotate(0)",transition:"all .35s cubic-bezier(.16,1,.3,1)",
                    color:"var(--brand)",fontSize:18,fontWeight:300,lineHeight:1,
                  }}>+</span>
                </button>
              </h3>
              <div id={`faq-answer-${i}`} role="region" style={{maxHeight:open===i?1000:0,overflow:"hidden",transition:"max-height .4s cubic-bezier(.16,1,.3,1)"}}>
                <p style={{padding:"0 20px 20px",fontSize:14,color:"var(--body)",lineHeight:1.8}}>{f.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   CONTACT
═══════════════════════════════════════════════════════════════════ */
type ContactForm = { name: string; company: string; email: string; phone: string; requirement: string };

const FIELDS: Array<[keyof ContactForm, string, string, string]> = [
  ["name", "Full Name", "text", "name"],
  ["company", "Company Name", "text", "organization"],
  ["email", "Email Address", "email", "email"],
  ["phone", "Phone Number", "tel", "tel"],
];

function Contact(){
  useReveal();
  const [form, setForm] = useState<ContactForm>({ name: "", company: "", email: "", phone: "", requirement: "" });
  const [ok, setOk] = useState(false);
  const h = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const name = e.target.name as keyof ContactForm;
    setForm(prev => ({ ...prev, [name]: e.target.value }));
  };
  const sub = (e: FormEvent<HTMLFormElement>) => { e.preventDefault(); setOk(true); };
  const inp: CSSProperties = {
    width:"100%",padding:"13px 16px",
    background:"rgba(5,26,48,0.02)",
    border:"1px solid var(--line)",
    borderRadius:8,
    /* 16px keeps iOS Safari from zooming in on focus */
    fontSize:16,
    fontFamily:"inherit",
    color:"var(--ink)",outline:"none",
    boxSizing:"border-box",transition:"all .2s",fontWeight:400,
  };
  const contacts = [
    {label:"Phone",value:"+91 89802 11122",href:"tel:+918980211122"},
    {label:"Email",value:"dhiraj@hktconsultancy.in",href:"mailto:dhiraj@hktconsultancy.in"},
    {label:"Enquiries",value:"contact@hktconsultancy.in",href:"mailto:contact@hktconsultancy.in"},
    {label:"Head Office",value:"C-1102, PNTC, Times of India Press Road, Vejalpur, Ahmedabad – 380015",href:"https://maps.google.com/?q=PNTC+Times+of+India+Press+Road+Vejalpur+Ahmedabad+380015"},
    {label:"WhatsApp",value:"+91 89802 11122",href:"https://wa.me/918980211122"},
  ];
  return(
    <section id="contact" aria-labelledby="contact-title" className="sec" style={{background:"var(--surface)"}}>
      <div className="wrap grid-2 grid-2-top">
        <div className="reveal">
          <Label>Get In Touch</Label>
          <Rule/>
          <h2 id="contact-title" style={{...h2Style,fontSize:"clamp(1.6rem,3.4vw,2.5rem)",marginBottom:16}}>
            Let&apos;s Begin a Conversation About Your Growth
          </h2>
          <p style={{...bodyText,marginBottom:32}}>
            Whether you&apos;re facing a revenue plateau, a team performance challenge, or need strategic clarity —
            we&apos;re here to help.
          </p>
          <address style={{display:"flex",flexDirection:"column",gap:10,fontStyle:"normal"}}>
            {contacts.map(c=>(
              <a key={c.label} href={c.href}
                target={c.href.startsWith("http")?"_blank":undefined}
                rel={c.href.startsWith("http")?"noopener noreferrer":undefined}
                className="glass meta-row"
                style={{display:"flex",alignItems:"center",gap:16,textDecoration:"none",padding:"14px 18px",borderRadius:10,transition:"all .25s"}}
                onMouseEnter={e=>{e.currentTarget.style.background="rgba(5,26,48,0.05)";e.currentTarget.style.borderColor="var(--line-strong)";}}
                onMouseLeave={e=>{e.currentTarget.style.background="#ffffff";e.currentTarget.style.borderColor="var(--line)";}}
              >
                <span aria-hidden="true" style={{width:38,height:38,borderRadius:8,background:"rgba(5,26,48,0.07)",border:"1px solid var(--line)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,fontSize:12,color:"var(--brand)",fontWeight:700}}>
                  {c.label[0]}
                </span>
                <span style={{minWidth:0}}>
                  <span style={{...metaText,fontSize:10.5,display:"block",marginBottom:3}}>{c.label}</span>
                  <span style={{fontSize:14,fontWeight:500,color:"var(--body)",display:"block",lineHeight:1.5,overflowWrap:"anywhere"}}>{c.value}</span>
                </span>
              </a>
            ))}
          </address>
        </div>

        <div className="reveal d2">
          <div className="glass-gold" style={{borderRadius:16,padding:"clamp(1.5rem,4vw,2.5rem)",boxShadow:"0 24px 60px rgba(5,26,48,0.12)"}}>
            <h3 style={{fontSize:19,fontWeight:700,color:"var(--ink)",marginBottom:22}}>Send an Enquiry</h3>
            {ok?(
              <div role="status" style={{textAlign:"center",padding:"3rem 0"}}>
                <div aria-hidden="true" style={{width:56,height:56,borderRadius:"50%",background:"rgba(5,26,48,0.08)",border:"1.5px solid var(--brand)",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 20px",fontSize:22,color:"var(--brand)"}}>✓</div>
                <h4 style={{fontSize:17,color:"var(--ink)",marginBottom:8,fontWeight:700}}>Enquiry Received</h4>
                <p style={{fontSize:14,color:"var(--body)"}}>We will be in touch within one business day.</p>
              </div>
            ):(
              <form onSubmit={sub} style={{display:"flex",flexDirection:"column",gap:12}}>
                {FIELDS.map(([n,p,t,ac])=>(
                  <div key={n}>
                    <label htmlFor={`field-${n}`} className="sr-only">{p}</label>
                    <input id={`field-${n}`} name={n} placeholder={p} type={t} autoComplete={ac} required value={form[n]} onChange={h}
                      style={inp}
                      onFocus={e=>{e.currentTarget.style.borderColor="var(--brand)";e.currentTarget.style.background="#ffffff";}}
                      onBlur={e=>{e.currentTarget.style.borderColor="var(--line)";e.currentTarget.style.background="rgba(5,26,48,0.02)";}}
                    />
                  </div>
                ))}
                <div>
                  <label htmlFor="field-requirement" className="sr-only">Describe your business requirement</label>
                  <textarea id="field-requirement" name="requirement" placeholder="Describe your business requirement" required rows={4} value={form.requirement} onChange={h}
                    style={{ ...inp, resize: "vertical", minHeight: 100, lineHeight: 1.6 }}
                    onFocus={e=>{e.currentTarget.style.borderColor="var(--brand)";e.currentTarget.style.background="#ffffff";}}
                    onBlur={e=>{e.currentTarget.style.borderColor="var(--line)";e.currentTarget.style.background="rgba(5,26,48,0.02)";}}
                  />
                </div>
                <button type="submit" style={{...primaryBtn,borderRadius:8,padding:"14px",marginTop:4}}
                  onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-1px)";}}
                  onMouseLeave={e=>{e.currentTarget.style.transform="translateY(0)";}}
                >Submit Enquiry</button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   CALENDLY
═══════════════════════════════════════════════════════════════════ */
function Calendly(){
  useReveal();
  return(
    <section id="calendly-booking" aria-labelledby="booking-title" className="sec noise" style={{background:"#ffffff"}}>
      <div style={{maxWidth:840,margin:"0 auto"}}>
        <div className="reveal" style={{textAlign:"center",marginBottom:40}}>
          <Label>Schedule a Meeting</Label>
          <Rule center/>
          <h2 id="booking-title" style={{...h2Style,marginBottom:14}}>
            Book Your Free <span style={emphasis}>Discovery Call.</span>
          </h2>
          <p style={{...bodyText,fontSize:14.5}}>Select a time that suits you. Complimentary. No obligation.</p>
        </div>
        <div className="reveal d1 glass-gold" style={{borderRadius:16,overflow:"hidden"}}>
          <div className="stack-mob" style={{padding:"1.6rem clamp(1.25rem,4vw,2.5rem)",borderBottom:"1px solid var(--line)",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:20}}>
            <div style={{display:"flex",alignItems:"center",gap:14}}>
              <div style={{width:46,height:46,borderRadius:"50%",overflow:"hidden",border:"1.5px solid var(--line-strong)",flexShrink:0}}>
                <Image src={ownerImg} alt="Dhiraj Thakur, HKT Consultancy founder" width={46} height={46} style={{width:"100%",height:"100%",objectFit:"cover",objectPosition:"center top",filter:"grayscale(100%)"}} />
              </div>
              <div>
                <p style={{fontSize:16,fontWeight:700,color:"var(--ink)"}}>Dhiraj Thakur</p>
                <p style={{fontSize:12,color:"var(--muted)",marginTop:2,fontWeight:500}}>Business Consultant · HKT Consultancy</p>
              </div>
            </div>
            <div style={{display:"flex",gap:24,flexWrap:"wrap"}}>
              {[["45 min","Duration"],["Video Call","Format"],["India IST","Timezone"]].map(([v,l])=>(
                <div key={l}>
                  <p style={{fontSize:14,fontWeight:700,color:"var(--ink)"}}>{v}</p>
                  <p style={{...metaText,fontSize:10.5,marginTop:2}}>{l}</p>
                </div>
              ))}
            </div>
          </div>
          <div style={{padding:"clamp(2rem,5vw,3rem)",textAlign:"center"}}>
            <a href="https://calendly.com" target="_blank" rel="noopener noreferrer" style={{...primaryBtn,display:"inline-block",textDecoration:"none",padding:"14px 32px"}}
              onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-2px)";}}
              onMouseLeave={e=>{e.currentTarget.style.transform="translateY(0)";}}
            >Open Calendly Booking →</a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   FOOTER
═══════════════════════════════════════════════════════════════════ */
function Footer(){
  const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  const footerLinks: Array<[string, Array<[string, string]>]> = [
    ["Navigation", [["About","about"],["Case Studies","case-studies"],["Process","process"],["Achievements","achievements"]]],
    ["Services", [["Sales Strategy","contact"],["Team Building","contact"],["Revenue Optimisation","contact"],["Leadership Coaching","contact"]]],
    ["Contact", [["Ahmedabad – 380015","contact"],["+91 89802 11122","contact"],["dhiraj@hktconsultancy.in","contact"],["contact@hktconsultancy.in","contact"]]],
  ];
  return(
    <footer style={{background:"var(--surface-alt)",padding:"clamp(48px,7vw,64px) var(--gut) 32px",borderTop:"1px solid var(--line)"}}>
      <div className="wrap">
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(min(100%,220px),1fr))",gap:"2.5rem",marginBottom:40}}>
          <div>
            {/* Full logo lockup — the wordmark and tagline are part of the artwork */}
            <Image
              src={brandLogo}
              alt="HKT Consultancy — Business Growth Architects"
              width={132}
              height={132}
              sizes="132px"
              style={{width:132,height:132,objectFit:"contain",display:"block",marginBottom:8,marginLeft:-10}}
            />
            <p style={{fontSize:13.5,lineHeight:1.8,color:"var(--body)",maxWidth:280}}>
              Enabling manufacturing enterprises to achieve sustainable revenue growth, operational excellence, and
              leadership capability.
            </p>
          </div>
          {footerLinks.map(([heading, items]) => (
            <nav key={heading} aria-label={heading}>
              <h2 style={{fontSize:11,fontWeight:700,letterSpacing:"0.16em",color:"var(--ink)",textTransform:"uppercase",marginBottom:16}}>{heading}</h2>
              <ul style={{listStyle:"none",padding:0,margin:0}}>
                {items.map(([label,id])=>(
                  <li key={label} style={{marginBottom:10}}>
                    <button onClick={()=>go(id)} className="link-btn"
                      style={{fontSize:13.5,color:"var(--body)",lineHeight:1.5,overflowWrap:"anywhere"}}
                      onMouseEnter={e=>{e.currentTarget.style.color="var(--brand-soft)"}}
                      onMouseLeave={e=>{e.currentTarget.style.color="var(--body)"}}
                    >{label}</button>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <div aria-hidden="true" style={{height:1,background:"linear-gradient(90deg,transparent,var(--line-strong),transparent)"}}/>
        <div style={{paddingTop:22,display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:10}}>
          <p style={{fontSize:12.5,color:"var(--muted)"}}>© {new Date().getFullYear()} HKT Consultancy. All rights reserved.</p>
          <p style={{fontSize:12.5,color:"var(--muted)"}}>Dhiraj Thakur · Manufacturing Growth Expert</p>
        </div>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   FLOATING WHATSAPP
═══════════════════════════════════════════════════════════════════ */
function FloatingWA(){
  const [h, sh] = useState(false);
  return(
    <a href="https://wa.me/918980211122" target="_blank" rel="noopener noreferrer"
      aria-label="Chat with HKT Consultancy on WhatsApp"
      className="float-wa"
      onMouseEnter={()=>sh(true)} onMouseLeave={()=>sh(false)}
      style={{
        position:"fixed",
        bottom:"max(20px, env(safe-area-inset-bottom))",
        right:"max(20px, env(safe-area-inset-right))",
        zIndex:190,
        display:"flex",alignItems:"center",gap:10,
        background:"#ffffff",
        border:h?"1.5px solid var(--brand)":"1.5px solid var(--line-strong)",
        color:"var(--ink)",borderRadius:100,padding:"12px 20px 12px 14px",
        textDecoration:"none",boxShadow:"0 8px 28px rgba(5,26,48,0.22)",
        transition:"all .35s cubic-bezier(.16,1,.3,1)",
        transform:h?"translateY(-3px)":"translateY(0)",
      }}
    >
      <span aria-hidden="true" style={{width:28,height:28,borderRadius:"50%",background:"#25D366",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
        <svg width="17" height="17" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
      </span>
      <span className="float-label" style={{fontSize:13,fontWeight:600,letterSpacing:"0.03em"}}>WhatsApp</span>
    </a>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   APP
═══════════════════════════════════════════════════════════════════ */
export default function App(){
  return(
    <div style={{background:"#ffffff",overflowX:"hidden"}}>
      <style>{G}</style>
      <Nav/>
      <main>
        <Hero/>
        <Clients/>
        <About/>
        <CaseStudies/>
        <WhyChoose/>
        <Process/>
        <Achievements/>
        <FAQ/>
        <Contact/>
        <Calendly/>
      </main>
      <Footer/>
      <FloatingWA/>
    </div>
  );
}
