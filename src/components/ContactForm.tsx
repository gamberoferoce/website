"use client";

import { type FormEvent, useState } from "react";
import { formFieldClass, textLinkClass } from "@/lib/interactive";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="space-y-8">
      <form className="space-y-4" onSubmit={handleSubmit}>
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
          />
        </div>

        <button className={textLinkClass} type="submit">
          Send message
        </button>

        {submitted ? (
          <p className="text-[14px] text-muted-foreground">Thanks — I&apos;ll get back to you soon.</p>
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
