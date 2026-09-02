"use client";
import Link from "next/link";
import HktLogo from "@/components/HktLogo";
import { SITE, SOLUTIONS, INDUSTRIES } from "@/lib/data";

const FOOTER_SOLUTIONS = SOLUTIONS.map(s => ({ label: s.title, href: `/solutions/${s.slug}` }));
const FOOTER_INDUSTRIES = INDUSTRIES.slice(0, 5).map(i => ({ label: i.title, href: `/industries/${i.slug}` }));

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer
      style={{
        background: "var(--navy)",
        color: "rgba(255,255,255,0.65)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Gold top border */}
      <span
        style={{
          position: "absolute",
          top: 0, left: 0, right: 0,
          height: "2px",
          background: "linear-gradient(90deg, transparent, var(--gold), var(--gold-l), var(--gold), transparent)",
        }}
      />

      <div className="container" style={{ paddingTop: "4rem", paddingBottom: "2.5rem" }}>
        {/* Main grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "3rem 2rem", paddingBottom: "3rem", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>

          {/* Brand column */}
          <div style={{ gridColumn: "span 1" }}>
            <Link href="/" style={{ display: "flex", alignItems: "flex-start", textDecoration: "none", marginBottom: "1.25rem" }}>
              <HktLogo height={48} />
            </Link>
            <p style={{ fontSize: "0.85rem", lineHeight: 1.7, maxWidth: 260 }}>
              Manufacturing business growth consultancy. 30+ years of frontline experience across 200+ enterprises and 15+ industrial sectors.
            </p>
            <div style={{ marginTop: "1.25rem", display: "flex", flexDirection: "column", gap: 8 }}>
              <a href={SITE.phoneHref} style={{ color: "rgba(255,255,255,0.8)", fontSize: "0.85rem", textDecoration: "none" }}>
                {SITE.phone}
              </a>
              <a href={`mailto:${SITE.emailEnquiry}`} style={{ color: "rgba(255,255,255,0.8)", fontSize: "0.85rem", textDecoration: "none" }}>
                {SITE.emailEnquiry}
              </a>
              <a
                href={SITE.addressMap}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.78rem", textDecoration: "none", lineHeight: 1.6 }}
              >
                {SITE.address}
              </a>
            </div>
          </div>

          {/* Solutions */}
          <div>
            <p style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--gold)", marginBottom: "1rem" }}>
              Solutions
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
              {FOOTER_SOLUTIONS.map(item => (
                <li key={item.href}>
                  <Link href={item.href} style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.85rem", textDecoration: "none", transition: "color 0.2s" }}
                    onMouseEnter={e => (e.currentTarget.style.color = "rgba(255,255,255,0.95)")}
                    onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.65)")}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Industries */}
          <div>
            <p style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--gold)", marginBottom: "1rem" }}>
              Industries
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
              {FOOTER_INDUSTRIES.map(item => (
                <li key={item.href}>
                  <Link href={item.href} style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.85rem", textDecoration: "none" }}
                    onMouseEnter={e => (e.currentTarget.style.color = "rgba(255,255,255,0.95)")}
                    onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.65)")}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <p style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--gold)", marginBottom: "1rem" }}>
              Company
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
              {[
                { label: "About HKT",        href: "/about" },
                { label: "Dhiraj Thakur",    href: "/about/dhiraj-thakur" },
                { label: "Case Studies",      href: "/case-studies" },
                { label: "Insights",          href: "/insights" },
                { label: "Contact",           href: "/contact" },
              ].map(item => (
                <li key={item.href}>
                  <Link href={item.href} style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.85rem", textDecoration: "none" }}
                    onMouseEnter={e => (e.currentTarget.style.color = "rgba(255,255,255,0.95)")}
                    onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.65)")}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ paddingTop: "1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.75rem" }}>
          <p style={{ fontSize: "0.78rem", margin: 0 }}>
            © {year} HKT Consultancy. All rights reserved.
          </p>
          <div style={{ display: "flex", gap: "1.25rem", alignItems: "center", flexWrap: "wrap" }}>
            {[
              { label: "Privacy Policy", href: "/privacy" },
              { label: "Terms of Use",   href: "/terms" },
            ].map(item => (
              <Link key={item.href} href={item.href} style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.75rem", textDecoration: "none" }}>
                {item.label}
              </Link>
            ))}
            <span style={{ color: "rgba(255,255,255,0.2)", fontSize: "0.75rem" }}>|</span>
            <span style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.35)" }}>
              Built by{" "}
              <a
                href="https://sarvopaya.com/"
                target="_blank"
                rel="nofollow noopener noreferrer"
                style={{ color: "rgba(255,255,255,0.5)", textDecoration: "none" }}
              >
                Sarvopaya Digital
              </a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
