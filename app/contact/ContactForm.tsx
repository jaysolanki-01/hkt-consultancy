"use client";
import { useActionState } from "react";
import { submitContactForm, type FormState } from "./actions";

const INITIAL: FormState = { status: "idle", message: "" };

export default function ContactForm() {
  const [state, action, pending] = useActionState(submitContactForm, INITIAL);

  if (state.status === "success") {
    return (
      <div style={{
        background: "var(--background)",
        border: "1px solid rgba(201,168,76,0.3)",
        borderRadius: "var(--r-lg)",
        padding: "2.5rem",
        textAlign: "center",
      }}>
        <div style={{
          width: 56, height: 56, borderRadius: "50%",
          background: "var(--gold)", display: "flex", alignItems: "center",
          justifyContent: "center", marginInline: "auto", marginBottom: "1rem",
        }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--navy)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 style={{ fontFamily: "var(--font-serif)", color: "var(--navy)", marginBottom: "0.5rem" }}>
          Message received
        </h3>
        <p style={{ fontSize: "0.9rem", color: "var(--body)", lineHeight: 1.7 }}>
          {state.message}
        </p>
      </div>
    );
  }

  return (
    <form
      action={action}
      style={{
        background: "var(--background)",
        border: "1px solid var(--line)",
        borderRadius: "var(--r-lg)",
        padding: "2rem",
        display: "flex",
        flexDirection: "column",
        gap: "1.25rem",
      }}
    >
      {state.status === "error" && (
        <div style={{
          padding: "0.875rem 1rem",
          background: "#fef2f2",
          border: "1px solid #fecaca",
          borderRadius: "var(--r-sm)",
          fontSize: "0.85rem",
          color: "#dc2626",
        }}>
          {state.message}
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
        <Field label="First name *" name="firstName" required placeholder="Raj" />
        <Field label="Last name *" name="lastName" required placeholder="Mehta" />
      </div>

      <Field label="Company *" name="company" required placeholder="Your manufacturing company" />

      <Field
        label="Job title"
        name="jobTitle"
        placeholder="Founder / MD / CEO"
      />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
        <Field label="Phone *" name="phone" required type="tel" placeholder="+91 98765 43210" />
        <Field label="Email *" name="email" required type="email" placeholder="you@company.com" />
      </div>

      <div>
        <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 600, color: "var(--ink)", letterSpacing: "0.03em", marginBottom: "0.4rem" }}>
          What is the primary challenge you&apos;re facing?
        </label>
        <textarea
          name="challenge"
          rows={4}
          placeholder="Describe the growth challenge or problem you would like to discuss..."
          style={{
            width: "100%",
            padding: "0.75rem 1rem",
            border: "1px solid var(--line-mid)",
            borderRadius: "var(--r-sm)",
            fontFamily: "var(--font-sans)",
            fontSize: "0.88rem",
            color: "var(--ink)",
            background: "var(--background)",
            resize: "vertical",
            boxSizing: "border-box",
            outline: "none",
            lineHeight: 1.6,
          }}
        />
      </div>

      <p style={{ fontSize: "0.75rem", color: "var(--muted)", margin: 0 }}>
        Your information is confidential and will only be used to prepare for the discovery call.
      </p>

      <button
        type="submit"
        disabled={pending}
        className="btn btn-primary"
        style={{ width: "100%", justifyContent: "center" }}
      >
        {pending ? "Sending…" : "Request a Discovery Call"}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        style={{ display: "block", fontSize: "0.78rem", fontWeight: 600, color: "var(--ink)", letterSpacing: "0.03em", marginBottom: "0.4rem" }}
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        style={{
          width: "100%",
          padding: "0.75rem 1rem",
          border: "1px solid var(--line-mid)",
          borderRadius: "var(--r-sm)",
          fontFamily: "var(--font-sans)",
          fontSize: "0.88rem",
          color: "var(--ink)",
          background: "var(--background)",
          boxSizing: "border-box",
          outline: "none",
        }}
      />
    </div>
  );
}
