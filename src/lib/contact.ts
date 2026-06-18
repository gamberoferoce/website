"use server";

import { headers } from "next/headers";
import { Resend } from "resend";
import { isContactRateLimited } from "@/lib/contact-rate-limit";
import { saveContactSubmission } from "@/lib/contact-storage";
import {
  CONTACT_MIN_SUBMIT_MS,
  sanitizeContactField,
  validateContactFields,
} from "@/lib/contact-validation";

export type ContactFormState = {
  ok: boolean;
  message: string;
};

const SUCCESS_MESSAGE = "Thanks — I'll get back to you soon.";

async function getClientIp() {
  const headerList = await headers();

  return (
    headerList.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    headerList.get("x-real-ip")?.trim() ??
    "unknown"
  );
}

function isBotSubmission(formData: FormData) {
  const honeypot = String(formData.get("company") ?? "").trim();
  if (honeypot) {
    return true;
  }

  const startedAt = Number(formData.get("_started-at"));
  if (!Number.isFinite(startedAt)) {
    return true;
  }

  return Date.now() - startedAt < CONTACT_MIN_SUBMIT_MS;
}

async function sendContactNotification({
  name,
  email,
  projectIdea,
}: {
  name: string;
  email: string;
  projectIdea: string;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  const to = process.env.CONTACT_TO_EMAIL ?? "giuliafanasca@gmail.com";

  if (!apiKey || !from) {
    return { ok: false as const };
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from,
    to,
    replyTo: email,
    subject: `New website contact from ${name}`,
    text: [`Name: ${name}`, `Email: ${email}`, "", "Project idea:", projectIdea].join("\n"),
  });

  if (error) {
    console.error("Contact notification email failed:", error);
    return { ok: false as const };
  }

  return { ok: true as const };
}

export async function submitContactForm(
  _prevState: ContactFormState | null,
  formData: FormData,
): Promise<ContactFormState> {
  if (isBotSubmission(formData)) {
    return { ok: true, message: SUCCESS_MESSAGE };
  }

  const clientIp = await getClientIp();
  if (isContactRateLimited(clientIp)) {
    return {
      ok: false,
      message: "Too many messages sent recently. Please try again in about an hour.",
    };
  }

  const name = sanitizeContactField(String(formData.get("name") ?? ""));
  const email = sanitizeContactField(String(formData.get("email") ?? ""));
  const projectIdea = sanitizeContactField(String(formData.get("project-idea") ?? ""));

  const validation = validateContactFields({ name, email, projectIdea });
  if (!validation.ok) {
    return { ok: false, message: validation.message };
  }

  const saved = await saveContactSubmission({ name, email, projectIdea });

  if (!saved.ok) {
    return {
      ok: false,
      message: "Contact form is not configured yet. Please use the email link below.",
    };
  }

  await sendContactNotification({ name, email, projectIdea });

  return { ok: true, message: SUCCESS_MESSAGE };
}
