"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  if (done) {
    return (
      <div className="flex items-center gap-2.5 rounded-full border border-gold/30 bg-gold/10 px-5 py-3 text-sm text-cream">
        <Check className="size-4 text-gold-light" />
        You&apos;re on the list. Look out for our next dispatch.
      </div>
    );
  }

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        if (email.includes("@")) setDone(true);
      }}
      className="flex w-full max-w-md items-center gap-2 rounded-full border border-cream/20 bg-cream/5 p-1.5 pl-5"
    >
      <input
        type="email"
        required
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder="Your email address"
        aria-label="Email address"
        className="min-w-0 flex-1 bg-transparent text-sm text-cream placeholder:text-sand/50 focus:outline-none"
      />
      <button
        type="submit"
        className="grid size-10 shrink-0 place-items-center rounded-full bg-gold text-[#2b2410] transition-colors hover:bg-gold-light"
        aria-label="Subscribe"
      >
        <ArrowRight className="size-4" />
      </button>
    </form>
  );
}
