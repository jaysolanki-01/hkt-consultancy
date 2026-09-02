import type { Metadata } from "next";
import { SITE } from "@/lib/data";

export const metadata: Metadata = {
  title: "Privacy Policy",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <section className="section" style={{ background: "var(--background)", paddingTop: "calc(var(--nav-h) + 3rem)" }}>
      <div className="container" style={{ maxWidth: 720 }}>
        <h1 className="h2" style={{ color: "var(--navy)", marginBottom: "0.5rem" }}>Privacy Policy</h1>
        <p style={{ color: "var(--muted)", fontSize: "0.85rem", marginBottom: "2rem" }}>
          [CONTENT REQUIRED — Please supply your Privacy Policy text for this page]
        </p>
        <p style={{ color: "var(--body)", lineHeight: 1.8 }}>
          For privacy-related queries, contact us at{" "}
          <a href={`mailto:${SITE.emailEnquiry}`} style={{ color: "var(--navy)" }}>{SITE.emailEnquiry}</a>
        </p>
      </div>
    </section>
  );
}
