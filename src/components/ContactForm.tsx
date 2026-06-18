"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { formFieldClass, textLinkClass } from "@/lib/interactive";
import { submitContactForm } from "@/lib/contact";
import { CONTACT_LIMITS } from "@/lib/contact-validation";
import { trackUmamiEvent } from "@/lib/umami";

export function ContactForm() {
  const [state, formAction, isPending] = useActionState(submitContactForm, null);
  const [startedAt] = useState(() => String(Date.now()));
  const lastTrackedSubmission = useRef<string | null>(null);

  useEffect(() => {
    if (!state?.ok) {
      return;
    }

    const submissionKey = `${startedAt}:${state.message}`;
    if (lastTrackedSubmission.current === submissionKey) {
      return;
    }

    lastTrackedSubmission.current = submissionKey;
    trackUmamiEvent("contact-form-submit");
  }, [startedAt, state]);

  return (
    <div className="space-y-8">
      <form className="space-y-4" action={formAction}>
        <input name="_started-at" type="hidden" value={startedAt} readOnly />

        <div aria-hidden className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
          <label htmlFor="company">Company</label>
          <input
            autoComplete="off"
            id="company"
            name="company"
            tabIndex={-1}
            type="text"
          />
        </div>

        <div>
          <label className="sr-only" htmlFor="name">
            Name
          </label>
          <input
            className={formFieldClass}
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Name"
            maxLength={CONTACT_LIMITS.name}
            required
            disabled={isPending}
          />
        </div>

        <div>
          <label className="sr-only" htmlFor="email">
            Email
          </label>
          <input
            className={formFieldClass}
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="Email"
            maxLength={CONTACT_LIMITS.email}
            required
            disabled={isPending}
          />
        </div>

        <div>
          <label className="sr-only" htmlFor="project-idea">
            Project idea
          </label>
          <textarea
            className={`${formFieldClass} min-h-28 resize-y leading-6`}
            id="project-idea"
            name="project-idea"
            placeholder="Project idea"
            maxLength={CONTACT_LIMITS.projectIdea}
            required
            disabled={isPending}
          />
        </div>

        <button className={textLinkClass} disabled={isPending} type="submit">
          {isPending ? "Sending…" : "Send message"}
        </button>

        {state ? (
          <p
            className={`text-[14px] ${state.ok ? "text-muted-foreground" : "text-destructive"}`}
            role="status"
          >
            {state.message}
          </p>
        ) : null}
      </form>

      <p className="text-[14px] leading-6 text-muted-foreground">
        Or just email me:{" "}
        <a className={textLinkClass} href="mailto:giuliafanasca@gmail.com">
          giuliafanasca@gmail.com
        </a>
      </p>
    </div>
  );
}
