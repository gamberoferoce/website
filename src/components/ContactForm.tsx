"use client";

import { type FormEvent, useState } from "react";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="space-y-8">
      <p className="text-[15px] font-semibold leading-6 text-foreground/90">
        I would love to collaborate. Let&apos;s talk.
      </p>

      <form className="space-y-5" onSubmit={handleSubmit}>
        <div className="space-y-1.5">
          <label className="block text-[14px] text-foreground/80" htmlFor="name">
            Name
          </label>
          <input
            className="w-full border-b border-border bg-transparent py-1.5 text-[14px] text-foreground/90 outline-none placeholder:text-muted-foreground focus:border-foreground/40"
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
          />
        </div>

        <div className="space-y-1.5">
          <label className="block text-[14px] text-foreground/80" htmlFor="email">
            Email
          </label>
          <input
            className="w-full border-b border-border bg-transparent py-1.5 text-[14px] text-foreground/90 outline-none placeholder:text-muted-foreground focus:border-foreground/40"
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
          />
        </div>

        <div className="space-y-1.5">
          <label className="block text-[14px] text-foreground/80" htmlFor="project-idea">
            Project idea
          </label>
          <textarea
            className="min-h-28 w-full resize-y border-b border-border bg-transparent py-1.5 text-[14px] leading-6 text-foreground/90 outline-none placeholder:text-muted-foreground focus:border-foreground/40"
            id="project-idea"
            name="project-idea"
            required
          />
        </div>

        <button
          className="text-[14px] underline underline-offset-4 decoration-transparent hover:decoration-current"
          type="submit"
        >
          Send message
        </button>

        {submitted ? (
          <p className="text-[14px] text-muted-foreground">Thanks — I&apos;ll get back to you soon.</p>
        ) : null}
      </form>

      <p className="text-[14px] leading-6 text-muted-foreground">
        Or just email me:{" "}
        <a className="underline underline-offset-4 text-foreground/90" href="mailto:giuliafanasca@gmail.com">
          giuliafanasca@gmail.com
        </a>
      </p>
    </div>
  );
}
