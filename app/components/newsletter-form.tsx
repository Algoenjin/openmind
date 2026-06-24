"use client";

import { useState } from "react";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email) return;
    // Wire this to your email provider (Mailchimp, Resend, etc.).
    setDone(true);
    setEmail("");
  }

  if (done) {
    return (
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
        You&apos;re on the list. Welcome to OpenMind.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex w-full max-w-sm items-center">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email address"
        className="h-11 w-full border border-border bg-transparent px-4 font-mono text-xs uppercase tracking-[0.15em] text-foreground placeholder:text-muted focus:border-accent focus:outline-none"
      />
      <button
        type="submit"
        className="h-11 shrink-0 bg-accent px-5 font-mono text-xs font-bold uppercase tracking-[0.15em] text-accent-foreground transition-opacity hover:opacity-90"
      >
        Join
      </button>
    </form>
  );
}
