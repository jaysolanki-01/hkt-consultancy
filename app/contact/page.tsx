import type { Metadata } from "next";
import ContactForm from "./ContactForm";
import { SITE } from "@/lib/data";

export const metadata: Metadata = {
  title: "Contact — Book a Discovery Call",
  description:
    "Book a complimentary 45-minute discovery call with Dhiraj Thakur. HKT Consultancy works with manufacturing Promoters, Founders, and MDs across India.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section
        style={{
          background: "var(--navy)",
          padding: "5rem 0",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div className="grid-bg" style={{ position: "absolute", inset: 0, pointerEvents: "none" }} />
        <div className="container" style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
          <p className="eyebrow" style={{ color: "var(--gold)", justifyContent: "center" }}>Let&apos;s talk</p>
          <h1 className="h1" style={{ color: "#fff", marginTop: "0.75rem", maxWidth: 560, marginInline: "auto" }}>
            Book a Discovery Call
          </h1>
          <p style={{ color: "rgba(255,255,255,0.55)", marginTop: "1rem", maxWidth: 480, marginInline: "auto", lineHeight: 1.7, fontSize: "0.95rem" }}>
            A complimentary 45-minute conversation to understand your situation and determine whether there is a strong fit.
          </p>
        </div>
      </section>

      {/* Contact section */}
      <section className="section" style={{ background: "var(--surface)" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 480px", gap: "4rem", alignItems: "start" }}>
            {/* Left: info */}
            <div>
              <h2 className="h3" style={{ color: "var(--navy)", marginBottom: "1.5rem" }}>
                What to expect in the call
              </h2>
              {[
                { title: "We listen first", body: "The first 20 minutes are yours. Tell us about your business, the growth challenges you're facing, and what you've already tried." },
                { title: "We give an honest assessment", body: "We'll tell you what we see, what we think the real constraint is, and whether HKT is the right fit for your situation." },
                { title: "No pitch, no pressure", body: "If there isn't a strong fit, we'll tell you. If there is, we'll outline a specific engagement that addresses your situation." },
              ].map(item => (
                <div key={item.title} style={{ display: "flex", gap: "1rem", marginBottom: "1.5rem" }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: "50%", flexShrink: 0, marginTop: 2,
                    background: "var(--navy)", display: "flex", alignItems: "center", justifyContent: "center",
                    color: "var(--gold)", fontWeight: 700, fontSize: "0.8rem",
                  }}>✦</div>
                  <div>
                    <p style={{ fontWeight: 700, color: "var(--navy)", marginBottom: "0.3rem" }}>{item.title}</p>
                    <p style={{ fontSize: "0.88rem", color: "var(--body)", lineHeight: 1.7, margin: 0 }}>{item.body}</p>
                  </div>
                </div>
              ))}

              <div style={{
                marginTop: "2.5rem",
                padding: "1.5rem",
                background: "var(--background)",
                border: "1px solid var(--line)",
                borderRadius: "var(--r)",
                borderLeft: "3px solid var(--gold)",
              }}>
                <p style={{ fontWeight: 700, color: "var(--navy)", marginBottom: "0.75rem" }}>Direct contact</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  <a href={SITE.phoneHref} style={{ fontSize: "0.88rem", color: "var(--body)", textDecoration: "none" }}>
                    📞 {SITE.phone}
                  </a>
                  <a href={`mailto:${SITE.emailEnquiry}`} style={{ fontSize: "0.88rem", color: "var(--body)", textDecoration: "none" }}>
                    ✉ {SITE.emailEnquiry}
                  </a>
                  <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" style={{ fontSize: "0.88rem", color: "var(--body)", textDecoration: "none" }}>
                    💬 WhatsApp Dhiraj
                  </a>
                </div>
                <p style={{ marginTop: "0.75rem", fontSize: "0.8rem", color: "var(--muted)" }}>
                  {SITE.address}
                </p>
              </div>
            </div>

            {/* Right: form */}
            <ContactForm />
          </div>
        </div>
        <style>{`@media(max-width:820px){.contact-grid{grid-template-columns:1fr!important;}}`}</style>
      </section>
    </>
  );
}
