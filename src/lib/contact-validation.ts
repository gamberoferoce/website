export const CONTACT_LIMITS = {
  name: 100,
  email: 254,
  projectIdea: 5000,
} as const;

export const CONTACT_MIN_SUBMIT_MS = 3_000;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function sanitizeContactField(value: string) {
  return value.replace(/[\r\n\0]/g, "").trim();
}

export function validateContactFields({
  name,
  email,
  projectIdea,
}: {
  name: string;
  email: string;
  projectIdea: string;
}) {
  if (!name || !email || !projectIdea) {
    return { ok: false as const, message: "Please fill in all fields." };
  }

  if (name.length > CONTACT_LIMITS.name) {
    return { ok: false as const, message: "Name is too long." };
  }

  if (email.length > CONTACT_LIMITS.email) {
    return { ok: false as const, message: "Email is too long." };
  }

  if (projectIdea.length > CONTACT_LIMITS.projectIdea) {
    return { ok: false as const, message: "Message is too long." };
  }

  if (!EMAIL_PATTERN.test(email)) {
    return { ok: false as const, message: "Please enter a valid email address." };
  }

  return { ok: true as const };
}
