"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { SITE } from "@/lib/data";

const NAV_LINKS = [
  {
    label: "Solutions",
    href: "/solutions",
    children: [
      { label: "Revenue Growth",          href: "/solutions/revenue-growth" },
      { label: "Sales Transformation",    href: "/solutions/sales-transformation" },
      { label: "Leadership & Organisation", href: "/solutions/leadership-organisation" },
      { label: "Operational Excellence",  href: "/solutions/operational-excellence" },
    ],
  },
  {
    label: "Industries",
    href: "/industries",
  },
  {
    label: "Case Studies",
    href: "/case-studies",
  },
  {
    label: "About",
    href: "/about",
    children: [
      { label: "HKT Consultancy",   href: "/about" },
      { label: "Dhiraj Thakur",     href: "/about/dhiraj-thakur" },
    ],
  },
  {
    label: "Insights",
    href: "/insights",
  },
];

export default function Nav() {
  const [scrolled, setScrolled]   = useState(false);
  const [open, setOpen]           = useState(false);       // mobile menu
  const [active, setActive]       = useState<string|null>(null); // desktop dropdown
  const navRef                    = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setActive(null);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <header
      ref={navRef}
      style={{
        position: "fixed",
        top: 0, left: 0, right: 0,
        zIndex: 100,
        height: "var(--nav-h)",
        display: "flex",
        alignItems: "center",
        transition: "background 0.35s ease, box-shadow 0.35s ease",
        background: scrolled ? "rgba(11,29,53,0.97)" : "transparent",
        boxShadow: scrolled ? "0 1px 0 rgba(255,255,255,0.06)" : "none",
        backdropFilter: scrolled ? "blur(12px)" : "none",
      }}
    >
      {/* Gold top bar on scroll */}
      {scrolled && (
        <span
          style={{
            position: "absolute",
            top: 0, left: 0, right: 0,
            height: "2px",
            background: "linear-gradient(90deg, transparent, var(--gold), var(--gold-l), var(--gold), transparent)",
            pointerEvents: "none",
          }}
        />
      )}

      <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        {/* Logo */}
        <Link href="/" aria-label="HKT Consultancy — Home" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
          <Image
            src="/hkt-logo.svg"
            alt="HKT Consultancy — Business Growth Architects"
            width={240}
            height={54}
            style={{ objectFit: "contain", objectPosition: "left center", height: 44, width: "auto" }}
            priority
          />
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Primary navigation" style={{ display: "flex", alignItems: "center", gap: "0.15rem" }} className="nav-desktop">
          {NAV_LINKS.map(link => (
            <div key={link.label} style={{ position: "relative" }}>
              {link.children ? (
                <button
                  aria-haspopup="true"
                  aria-expanded={active === link.label}
                  onClick={() => setActive(prev => prev === link.label ? null : link.label)}
                  style={{
                    display: "flex", alignItems: "center", gap: 5,
                    background: "none", border: "none", cursor: "pointer",
                    padding: "8px 14px",
                    color: active === link.label ? "var(--gold)" : "rgba(255,255,255,0.8)",
                    fontSize: "13px",
                    fontWeight: 500,
                    letterSpacing: "0.02em",
                    fontFamily: "var(--font-sans)",
                    transition: "color 0.2s",
                    minHeight: 44,
                    borderRadius: "var(--r-sm)",
                  }}
                >
                  {link.label}
                  <svg
                    width="10" height="10" viewBox="0 0 10 10" fill="currentColor"
                    style={{ transition: "transform 0.25s", transform: active === link.label ? "rotate(180deg)" : "rotate(0)" }}
                  >
                    <path d="M1 3l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
                  </svg>
                </button>
              ) : (
                <Link
                  href={link.href}
                  style={{
                    display: "block",
                    padding: "8px 14px",
                    color: "rgba(255,255,255,0.8)",
                    fontSize: "13px",
                    fontWeight: 500,
                    letterSpacing: "0.02em",
                    textDecoration: "none",
                    transition: "color 0.2s",
                    borderRadius: "var(--r-sm)",
                    minHeight: 44,
                    lineHeight: "28px",
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
                  onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.8)")}
                >
                  {link.label}
                </Link>
              )}

              {/* Dropdown */}
              {link.children && active === link.label && (
                <div
                  style={{
                    position: "absolute",
                    top: "calc(100% + 8px)",
                    left: "50%",
                    transform: "translateX(-50%)",
                    background: "var(--navy)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: "var(--r)",
                    padding: "6px",
                    minWidth: 220,
                    boxShadow: "0 20px 48px rgba(0,0,0,0.4)",
                    animation: "dropIn 0.2s cubic-bezier(0.16,1,0.3,1)",
                  }}
                >
                  {link.children.map(child => (
                    <Link
                      key={child.href}
                      href={child.href}
                      onClick={() => setActive(null)}
                      style={{
                        display: "block",
                        padding: "9px 14px",
                        color: "rgba(255,255,255,0.75)",
                        fontSize: "13px",
                        fontWeight: 500,
                        textDecoration: "none",
                        borderRadius: "var(--r-sm)",
                        transition: "background 0.15s, color 0.15s",
                        whiteSpace: "nowrap",
                      }}
                      onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.color = "var(--gold)"; }}
                      onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "rgba(255,255,255,0.75)"; }}
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* CTA */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }} className="nav-desktop">
          <a href={SITE.phoneHref} className="btn btn-ghost" style={{ padding: "10px 16px", fontSize: "12px", minHeight: 40 }}>
            {SITE.phone}
          </a>
          <Link href="/contact" className="btn btn-gold" style={{ padding: "10px 20px", fontSize: "12px", minHeight: 40 }}>
            Book a Call
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen(v => !v)}
          style={{
            display: "none",
            flexDirection: "column",
            gap: 5,
            padding: 8,
            background: "none",
            border: "none",
            cursor: "pointer",
            minHeight: 44,
            minWidth: 44,
            alignItems: "center",
            justifyContent: "center",
          }}
          className="nav-mobile"
        >
          {[0, 1, 2].map(i => (
            <span key={i} style={{
              display: "block",
              width: 22,
              height: 2,
              background: "rgba(255,255,255,0.9)",
              borderRadius: 2,
              transition: "all 0.25s",
              transform: open
                ? i === 0 ? "translateY(7px) rotate(45deg)"
                : i === 1 ? "scaleX(0)"
                : "translateY(-7px) rotate(-45deg)"
                : "none",
            }} />
          ))}
        </button>
      </div>

      {/* Mobile menu panel */}
      {open && (
        <div
          style={{
            position: "fixed",
            top: "var(--nav-h)",
            left: 0, right: 0, bottom: 0,
            background: "var(--navy)",
            overflowY: "auto",
            padding: "1.5rem var(--pad) 3rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.25rem",
          }}
        >
          {NAV_LINKS.map(link => (
            <div key={link.label}>
              {link.children ? (
                <>
                  <button
                    onClick={() => setActive(prev => prev === link.label ? null : link.label)}
                    style={{
                      display: "flex", justifyContent: "space-between", alignItems: "center",
                      width: "100%", background: "none", border: "none", cursor: "pointer",
                      padding: "14px 0",
                      color: "rgba(255,255,255,0.9)",
                      fontSize: "1rem", fontWeight: 600,
                      fontFamily: "var(--font-sans)",
                      borderBottom: "1px solid rgba(255,255,255,0.07)",
                    }}
                  >
                    {link.label}
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor" style={{ transition: "transform 0.25s", transform: active === link.label ? "rotate(180deg)" : "none" }}>
                      <path d="M2 5l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
                    </svg>
                  </button>
                  {active === link.label && (
                    <div style={{ paddingLeft: "1rem", paddingBottom: "0.5rem" }}>
                      {link.children.map(child => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={() => { setOpen(false); setActive(null); }}
                          style={{
                            display: "block", padding: "11px 0",
                            color: "rgba(255,255,255,0.65)",
                            fontSize: "0.9rem", textDecoration: "none",
                            borderBottom: "1px solid rgba(255,255,255,0.05)",
                          }}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  style={{
                    display: "block", padding: "14px 0",
                    color: "rgba(255,255,255,0.9)",
                    fontSize: "1rem", fontWeight: 600, textDecoration: "none",
                    borderBottom: "1px solid rgba(255,255,255,0.07)",
                  }}
                >
                  {link.label}
                </Link>
              )}
            </div>
          ))}

          <div style={{ marginTop: "2rem", display: "flex", flexDirection: "column", gap: 12 }}>
            <a href={SITE.phoneHref} className="btn btn-ghost" style={{ justifyContent: "center" }}>
              Call {SITE.phone}
            </a>
            <Link href="/contact" className="btn btn-gold" onClick={() => setOpen(false)} style={{ justifyContent: "center" }}>
              Book a Discovery Call
            </Link>
          </div>
        </div>
      )}

      <style>{`
        @keyframes dropIn {
          from { opacity: 0; transform: translateX(-50%) translateY(-8px); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
        @media (max-width: 900px) {
          .nav-desktop { display: none !important; }
          .nav-mobile  { display: flex !important; }
        }
      `}</style>
    </header>
  );
}
