"use client";
import { useState } from "react";

interface FAQItem { q: string; a: string; }

export default function FAQAccordion({ faqs }: { faqs: readonly FAQItem[] }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
      {faqs.map((item, i) => {
        const isOpen = open === i;
        return (
          <div
            key={i}
            style={{
              border: `1px solid ${isOpen ? "rgba(201,168,76,0.3)" : "var(--line)"}`,
              borderRadius: "var(--r)",
              overflow: "hidden",
              transition: "border-color 0.25s",
              background: "var(--background)",
            }}
          >
            <button
              aria-expanded={isOpen}
              aria-controls={`faq-answer-${i}`}
              id={`faq-question-${i}`}
              onClick={() => setOpen(isOpen ? null : i)}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "1rem",
                width: "100%",
                padding: "1.25rem 1.5rem",
                background: "none",
                border: "none",
                cursor: "pointer",
                textAlign: "left",
                minHeight: 64,
              }}
            >
              <span style={{
                fontFamily: "var(--font-sans)",
                fontWeight: 600,
                fontSize: "0.95rem",
                color: isOpen ? "var(--navy)" : "var(--ink)",
                lineHeight: 1.4,
              }}>
                {item.q}
              </span>
              <span
                aria-hidden="true"
                style={{
                  flexShrink: 0,
                  width: 28,
                  height: 28,
                  borderRadius: "50%",
                  border: `1.5px solid ${isOpen ? "var(--gold)" : "var(--line-mid)"}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.25s",
                  background: isOpen ? "var(--gold)" : "transparent",
                  color: isOpen ? "var(--navy)" : "var(--muted)",
                }}
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                  {isOpen
                    ? <path d="M2 6h8" />
                    : <><path d="M6 2v8" /><path d="M2 6h8" /></>}
                </svg>
              </span>
            </button>

            <div
              id={`faq-answer-${i}`}
              role="region"
              aria-labelledby={`faq-question-${i}`}
              style={{
                maxHeight: isOpen ? "600px" : "0",
                overflow: "hidden",
                transition: "max-height 0.35s cubic-bezier(0.16,1,0.3,1)",
              }}
            >
              <p style={{
                margin: 0,
                padding: "0 1.5rem 1.5rem",
                fontSize: "0.9rem",
                lineHeight: 1.75,
                color: "var(--body)",
              }}>
                {item.a}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
