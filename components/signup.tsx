"use client";

import { useState } from "react";
import { site } from "@/lib/site";
import { buttonStyles, Container, H2, Label } from "./ui";

/**
 * Buttondown signup. Buttondown doesn't send CORS headers, so the request is sent blind
 * (no-cors) and we fall back to a normal form submit if it can't be made at all.
 * Buttondown then emails a confirmation link, which lands on /thanks/.
 */
export function SignupForm({
  id,
  button = "Get release updates",
}: {
  id: string;
  button?: string;
}) {
  const [state, setState] = useState<"idle" | "sending" | "sent">("idle");
  const [email, setEmail] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setState("sending");
    try {
      await fetch(site.signup, {
        method: "POST",
        mode: "no-cors",
        body: new URLSearchParams({ email }),
      });
      setState("sent");
    } catch {
      form.submit();
    }
  }

  if (state === "sent") {
    return (
      <p role="status" className="flex h-12 items-center text-ok">
        Almost there. Check {email} for a link to confirm.
      </p>
    );
  }

  return (
    <form
      action={site.signup}
      method="post"
      onSubmit={onSubmit}
      className="flex w-full max-w-145 flex-col gap-2.5 sm:flex-row"
    >
      <label htmlFor={id} className="sr-only">
        Email
      </label>
      <input
        id={id}
        name="email"
        type="email"
        required
        autoComplete="email"
        placeholder="you@company.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="h-12 min-w-0 shrink-0 rounded-xl sm:flex-1 border border-line-2 bg-panel px-4 text-[15px] text-fg placeholder:text-faint focus:border-fg-2 focus:outline-none"
      />
      <button type="submit" disabled={state === "sending"} className={buttonStyles.solid}>
        {state === "sending" ? "Subscribing…" : button}
      </button>
    </form>
  );
}

/** Closing call to action at the bottom of the page. */
export function FinalCta() {
  return (
    <section id="updates" className="border-t border-line">
      <Container className="py-20 md:py-32">
        <Label className="mb-6">Get updates</Label>
        <H2 className="mb-6 max-w-[14ch]">Be first to run a crew.</H2>
        <p className="mb-10 max-w-130 text-lg text-fg-2">
          Leave your email and I'll write when there's something to try. One or two emails a year,
          no newsletter.
        </p>
        <SignupForm id="email-bottom" button="Notify me" />
      </Container>
    </section>
  );
}
