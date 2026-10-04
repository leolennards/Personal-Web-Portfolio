"use client";

import { useState, type FormEvent } from "react";
import { profile } from "@/lib/data";
import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";

const TYPES = ["Job opportunity", "Contract work", "Question", "Just saying hi"];

export default function Contact() {
  const [type, setType] = useState(TYPES[0]);
  const [ticket, setTicket] = useState<string | null>(null);

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const name = String(f.get("name") ?? "");
    const email = String(f.get("email") ?? "");
    const message = String(f.get("message") ?? "");
    const id = `LL-${Math.floor(1000 + Math.random() * 9000)}`;
    setTicket(id);
    const subject = `[${type}] from ${name}`;
    const body = `${message}\n\n— ${name}${email ? ` (${email})` : ""}`;
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const input =
    "w-full rounded-md border border-line bg-void/60 px-4 py-3 text-ink placeholder:text-faint outline-none transition focus:border-signal focus:shadow-[0_0_0_3px_rgb(61_255_154/0.12)]";

  return (
    <section id="contact" className="relative mx-auto max-w-7xl px-4 py-28 sm:px-6 md:py-40">
      <SectionHeader
        port="06"
        cmd="ticket --new --priority high"
        title="Open a ticket."
        kicker="Hiring, a question, or a problem that needs solving? Send it through and I'll get back to you."
      />

      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <Reveal>
          <form onSubmit={submit} className="rounded-2xl border border-line bg-panel p-6 md:p-8">
            <div className="mb-6 flex items-center justify-between font-mono text-[11px]">
              <span className="text-faint">new_ticket.form</span>
              <span className="text-signal">priority: high</span>
            </div>

            <div className="mb-5 flex flex-wrap gap-2" role="radiogroup" aria-label="Ticket type">
              {TYPES.map((t) => (
                <button
                  type="button"
                  key={t}
                  role="radio"
                  aria-checked={type === t}
                  onClick={() => setType(t)}
                  className={`rounded-full border px-3 py-1.5 font-mono text-xs transition ${
                    type === t
                      ? "border-signal bg-signal/10 text-signal"
                      : "border-line text-dim hover:border-line-bright hover:text-ink"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="mb-1.5 block font-mono text-[11px] text-faint">requester</span>
                <input name="name" required placeholder="Your name" className={input} autoComplete="name" />
              </label>
              <label className="block">
                <span className="mb-1.5 block font-mono text-[11px] text-faint">reply_to</span>
                <input name="email" type="email" required placeholder="you@company.com" className={input} autoComplete="email" />
              </label>
            </div>
            <label className="mt-4 block">
              <span className="mb-1.5 block font-mono text-[11px] text-faint">description</span>
              <textarea name="message" required rows={6} placeholder="What can I help with?" className={`${input} resize-y`} />
            </label>

            <div className="mt-6 flex flex-wrap items-center gap-4">
              <button
                type="submit"
                className="rounded-md bg-signal px-6 py-3 font-mono text-sm font-semibold text-void transition hover:shadow-[0_0_30px_-5px_var(--color-signal)]"
              >
                submit_ticket →
              </button>
              {ticket && (
                <span className="font-mono text-xs text-signal">
                  Ticket {ticket} logged. Your email app should open to send it.
                </span>
              )}
            </div>
          </form>
        </Reveal>

        <Reveal delay={120} className="space-y-4">
          {[
            { k: "email", v: profile.email, href: `mailto:${profile.email}` },
            { k: "linkedin", v: "linkedin.com/in/leolennards", href: profile.linkedin },
            { k: "github", v: "github.com/leolennards", href: profile.github },
            { k: "cv", v: "Leo-Lennards-CV.pdf", href: profile.cv },
          ].map((c) => (
            <a
              key={c.k}
              href={c.href}
              target={c.href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              download={c.k === "cv" ? true : undefined}
              className="group flex items-center justify-between rounded-xl border border-line bg-panel/60 px-5 py-4 transition hover:border-signal"
            >
              <div>
                <div className="font-mono text-[11px] text-faint">{c.k}</div>
                <div className="mt-0.5 break-all text-ink">{c.v}</div>
              </div>
              <span className="font-mono text-dim transition group-hover:translate-x-1 group-hover:text-signal">→</span>
            </a>
          ))}
          <div className="rounded-xl border border-line bg-panel/30 px-5 py-4 font-mono text-xs leading-6 text-dim">
            <div>
              <span className="text-faint">location</span> {profile.location}
            </div>
            <div>
              <span className="text-faint">mobility</span> own vehicle · on-site ready
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
