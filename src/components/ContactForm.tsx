"use client";

import { useActionState } from "react";
import { formFieldClass, textLinkClass } from "@/lib/interactive";
import { submitContactForm } from "@/lib/contact";

export function ContactForm() {
  const [state, formAction, isPending] = useActionState(submitContactForm, null);

  return (
    <div className="space-y-8">
      <form className="space-y-4" action={formAction}>
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
