import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { CASE_STUDIES } from "@/lib/data";

export function generateStaticParams() {
  return CASE_STUDIES.map(cs => ({ slug: cs.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const cs = CASE_STUDIES.find(c => c.slug === slug);
  if (!cs) return {};
  return {
    title: `${cs.client} — ${cs.metricLabel}`,
    description: cs.challenge,
    alternates: { canonical: `/case-studies/${slug}` },
  };
}

export default async function CaseStudyPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const cs = CASE_STUDIES.find(c => c.slug === slug);
  if (!cs) notFound();

  return (
    <>
      <section style={{ background: "var(--navy)", padding: "5rem 0 4rem", position: "relative", overflow: "hidden" }}>
        <div className="grid-bg" style={{ position: "absolute", inset: 0, pointerEvents: "none" }} />
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <Link href="/case-studies" style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.8rem", textDecoration: "none", letterSpacing: "0.04em" }}>
            ← Case Studies
          </Link>
          <p style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--gold)", marginTop: "1.5rem", marginBottom: "0.75rem" }}>
            {cs.tag}
          </p>
          <h1 className="h1" style={{ color: "#fff", maxWidth: 600 }}>{cs.client}</h1>
          <div style={{ display: "flex", gap: "2rem", marginTop: "1.5rem", flexWrap: "wrap" }}>
            {cs.metrics.map(m => (
              <div key={m.label}>
                <p style={{ fontFamily: "var(--font-serif)", fontSize: "2rem", fontWeight: 900, color: "var(--gold)", margin: 0, lineHeight: 1 }}>{m.value}</p>
                <p style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.45)", margin: "4px 0 0", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.07em" }}>{m.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: "var(--background)" }}>
        <div className="container">
          <div style={{ maxWidth: 720, display: "flex", flexDirection: "column", gap: "2rem" }}>
            {[
              { label: "The Challenge", body: cs.challenge },
              { label: "The Approach", body: cs.strategy },
              { label: "The Outcome", body: cs.outcome },
            ].map(block => (
              <div key={block.label}>
                <p style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--gold)", marginBottom: "0.75rem" }}>
                  {block.label}
                </p>
                <p style={{ fontSize: "1rem", lineHeight: 1.8, color: "var(--body)" }}>{block.body}</p>
              </div>
            ))}

            <div style={{ background: "var(--surface)", borderLeft: "3px solid var(--gold)", borderRadius: "0 var(--r) var(--r) 0", padding: "1.25rem 1.5rem" }}>
              <p style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--gold)", marginBottom: "0.5rem" }}>Takeaway</p>
              <p style={{ fontSize: "0.95rem", lineHeight: 1.75, color: "var(--body)", margin: 0, fontStyle: "italic" }}>{cs.takeaway}</p>
            </div>

            <div style={{ paddingTop: "1rem" }}>
              <Link href="/contact" className="btn btn-primary">
                Discuss Your Situation
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
