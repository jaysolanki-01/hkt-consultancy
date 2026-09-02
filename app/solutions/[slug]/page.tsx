import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { SOLUTIONS } from "@/lib/data";

export function generateStaticParams() {
  return SOLUTIONS.map(s => ({ slug: s.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const sol = SOLUTIONS.find(s => s.slug === slug);
  if (!sol) return {};
  return {
    title: `${sol.title} Consulting`,
    description: sol.headline,
    alternates: { canonical: `/solutions/${slug}` },
  };
}

export default async function SolutionPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const sol = SOLUTIONS.find(s => s.slug === slug);
  if (!sol) notFound();

  const idx = SOLUTIONS.findIndex(s => s.slug === slug);

  return (
    <>
      <section style={{ background: "var(--navy)", padding: "5rem 0 4rem", position: "relative", overflow: "hidden" }}>
        <div className="grid-bg" style={{ position: "absolute", inset: 0, pointerEvents: "none" }} />
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <Link href="/solutions" style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.8rem", textDecoration: "none", letterSpacing: "0.04em" }}>
            ← Solutions
          </Link>
          <p style={{
            fontFamily: "var(--font-serif)", fontSize: "5rem", fontWeight: 900,
            color: "var(--gold)", opacity: 0.08, lineHeight: 1, margin: "1rem 0 0", userSelect: "none",
          }}>
            0{idx + 1}
          </p>
          <h1 className="h1" style={{ color: "#fff", marginTop: "-1rem" }}>{sol.title}</h1>
          <p className="lead" style={{ color: "rgba(255,255,255,0.6)", marginTop: "1rem" }}>{sol.headline}</p>
        </div>
      </section>

      <section className="section" style={{ background: "var(--background)" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: "4rem", alignItems: "start" }}>
            <div>
              <p style={{ fontSize: "1rem", lineHeight: 1.8, color: "var(--body)" }}>{sol.body}</p>
              <h2 className="h3" style={{ color: "var(--navy)", marginTop: "2rem", marginBottom: "1rem" }}>
                What this engagement covers
              </h2>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 12 }}>
                {sol.outcomes.map(o => (
                  <li key={o} style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "0.75rem 1rem", background: "var(--surface)", borderRadius: "var(--r-sm)", fontSize: "0.9rem", color: "var(--body)" }}>
                    <span style={{ color: "var(--gold)", fontWeight: 700, marginTop: 1 }}>✦</span>
                    {o}
                  </li>
                ))}
              </ul>
            </div>

            <div style={{ background: "var(--navy)", borderRadius: "var(--r-lg)", padding: "2rem", border: "1px solid rgba(201,168,76,0.15)" }}>
              <h3 style={{ fontFamily: "var(--font-serif)", color: "#fff", marginBottom: "0.75rem" }}>
                Ready to discuss your situation?
              </h3>
              <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.85rem", lineHeight: 1.7, marginBottom: "1.5rem" }}>
                Book a complimentary 45-minute discovery call. We&apos;ll assess your situation honestly and tell you whether HKT is the right fit.
              </p>
              <Link href="/contact" className="btn btn-gold" style={{ width: "100%", justifyContent: "center" }}>
                Book a Discovery Call
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
