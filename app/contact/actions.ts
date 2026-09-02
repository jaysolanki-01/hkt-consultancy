"use server";

export type FormState = {
  status: "idle" | "success" | "error";
  message: string;
};

export async function submitContactForm(
  _prev: FormState,
  formData: FormData
): Promise<FormState> {
  const firstName = (formData.get("firstName") as string)?.trim();
  const lastName  = (formData.get("lastName")  as string)?.trim();
  const company   = (formData.get("company")   as string)?.trim();
  const phone     = (formData.get("phone")     as string)?.trim();
  const email     = (formData.get("email")     as string)?.trim();
  const challenge = (formData.get("challenge") as string)?.trim();
  const jobTitle  = (formData.get("jobTitle")  as string)?.trim();

  if (!firstName || !lastName || !company || !phone || !email) {
    return { status: "error", message: "Please fill in all required fields." };
  }

  const emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRx.test(email)) {
    return { status: "error", message: "Please enter a valid email address." };
  }

  /* ── Send notification email ──────────────────────────────────────
     Replace this block with your preferred email service
     (Resend, Nodemailer, SendGrid, etc.)
     For now we log to server console and return success.
  ─────────────────────────────────────────────────────────────────── */
  console.log("[HKT Contact Form]", {
    from: `${firstName} ${lastName}`,
    company,
    jobTitle,
    phone,
    email,
    challenge,
    receivedAt: new Date().toISOString(),
  });

  return {
    status: "success",
    message:
      `Thank you, ${firstName}. Dhiraj will review your message and be in touch within one business day to schedule the call.`,
  };
}
