import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { INDUSTRIES, SOLUTIONS, CASE_STUDIES } from "@/lib/data";

export function generateStaticParams() {
  return INDUSTRIES.map(i => ({ slug: i.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const ind = INDUSTRIES.find(i => i.slug === slug);
  if (!ind) return {};
  return {
    title: `${ind.title} — Manufacturing Growth Consulting`,
    description: ind.body,
    alternates: { canonical: `/industries/${slug}` },
  };
}

export default async function IndustryPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const ind = INDUSTRIES.find(i => i.slug === slug);
  if (!ind) notFound();

  return (
    <>
      <section style={{ background: "var(--navy)", padding: "5rem 0 4rem", position: "relative", overflow: "hidden" }}>
        <div className="grid-bg" style={{ position: "absolute", inset: 0, pointerEvents: "none" }} />
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <Link href="/industries" style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.8rem", textDecoration: "none", letterSpacing: "0.04em" }}>
            ← Industries
          </Link>
          <h1 className="h1" style={{ color: "#fff", marginTop: "1.5rem", maxWidth: 600 }}>{ind.title}</h1>
          <p className="lead" style={{ color: "rgba(255,255,255,0.6)", marginTop: "1rem" }}>{ind.body}</p>
        </div>
      </section>

      <section className="section" style={{ background: "var(--background)" }}>
        <div className="container">
          <h2 className="h3" style={{ color: "var(--navy)", marginBottom: "1.5rem" }}>
            How HKT works with {ind.title} businesses
          </h2>
          <p style={{ fontSize: "0.95rem", lineHeight: 1.8, color: "var(--body)", maxWidth: 680, marginBottom: "2.5rem" }}>
            HKT brings 30+ years of manufacturing sector experience to every engagement. We understand the specific commercial and operational dynamics of your sector — and we stay engaged through implementation until measurable outcomes are achieved.
          </p>

          <h3 className="h3" style={{ color: "var(--navy)", marginBottom: "1rem" }}>Solutions applicable to this sector</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1rem", marginBottom: "3rem" }}>
            {SOLUTIONS.map(sol => (
              <Link key={sol.slug} href={`/solutions/${sol.slug}`} style={{ textDecoration: "none" }}>
                <div style={{ padding: "1.25rem", background: "var(--surface)", borderRadius: "var(--r)", border: "1px solid var(--line)", borderLeft: "3px solid var(--gold)" }}>
                  <p style={{ fontWeight: 700, color: "var(--navy)", marginBottom: "0.25rem" }}>{sol.title}</p>
                  <p style={{ fontSize: "0.8rem", color: "var(--muted)", margin: 0 }}>Explore →</p>
                </div>
              </Link>
            ))}
          </div>

          <div style={{ textAlign: "center" }}>
            <Link href="/contact" className="btn btn-primary">Discuss Your Situation</Link>
          </div>
        </div>
      </section>
    </>
  );
}
