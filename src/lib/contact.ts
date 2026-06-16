"use server";

import { Resend } from "resend";

export type ContactFormState = {
  ok: boolean;
  message: string;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function getContactConfig() {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  const to = process.env.CONTACT_TO_EMAIL ?? "giuliafanasca@gmail.com";

  return { apiKey, from, to };
}

export async function submitContactForm(
  _prevState: ContactFormState | null,
  formData: FormData,
): Promise<ContactFormState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const projectIdea = String(formData.get("project-idea") ?? "").trim();

  if (!name || !email || !projectIdea) {
    return { ok: false, message: "Please fill in all fields." };
  }

  if (!EMAIL_PATTERN.test(email)) {
    return { ok: false, message: "Please enter a valid email address." };
  }

  const { apiKey, from, to } = getContactConfig();

  if (!apiKey || !from) {
    return {
      ok: false,
      message: "Contact form is not configured yet. Please use the email link below.",
    };
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from,
    to,
    replyTo: email,
    subject: `Website contact from ${name}`,
    text: [`Name: ${name}`, `Email: ${email}`, "", "Project idea:", projectIdea].join("\n"),
  });

  if (error) {
    console.error("Contact form email failed:", error);
    return {
      ok: false,
      message: "Could not send your message. Please try again or email me directly.",
    };
  }

  return { ok: true, message: "Thanks — I'll get back to you soon." };
}
