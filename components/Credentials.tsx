"use client";

import type { MouseEvent } from "react";
import { credentials, type Credential } from "@/lib/data";
import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";

const ACCENT: Record<Credential["accent"], string> = {
  green: "var(--color-signal)",
  amber: "var(--color-amber)",
  blue: "var(--color-ice)",
  violet: "var(--color-violet)",
};

function tilt(e: MouseEvent<HTMLElement>) {
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  const x = (e.clientX - r.left) / r.width;
  const y = (e.clientY - r.top) / r.height;
  el.style.transform = `perspective(900px) rotateX(${(0.5 - y) * 10}deg) rotateY(${(x - 0.5) * 12}deg)`;
  el.style.setProperty("--sx", `${x * 100}%`);
  el.style.setProperty("--sy", `${y * 100}%`);
}
function reset(e: MouseEvent<HTMLElement>) {
  e.currentTarget.style.transform = "";
}

function CredCard({ c, index }: { c: Credential; index: number }) {
  if (c.placeholder) {
    return (
      <div className="marching flex h-full min-h-60 flex-col items-center justify-center rounded-xl p-6 text-center font-mono">
        <div className="text-2xl text-faint">+</div>
        <div className="mt-2 text-[11px] tracking-widest text-faint">SLOT RESERVED</div>
        <div className="mt-2 text-sm text-dim">More credentials are being added.</div>
      </div>
    );
  }
  const color = ACCENT[c.accent];
  return (
    <div
      onMouseMove={tilt}
      onMouseLeave={reset}
      className="holo group relative flex h-full min-h-60 flex-col overflow-hidden rounded-xl border border-line bg-panel p-6"
    >
      <div className="sheen pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="absolute inset-x-0 top-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }} />

      <div className="flex items-start justify-between font-mono text-[10px] tracking-widest">
        <span style={{ color }}>CRED-{String(index + 1).padStart(3, "0")}</span>
        <span className="text-faint">{c.date}</span>
      </div>

      <div
        className="mt-6 grid h-11 w-11 place-items-center rounded-lg border font-mono text-sm"
        style={{ borderColor: color, color, boxShadow: `0 0 24px -8px ${color}` }}
      >
        ✓
      </div>

      <h3 className="mt-5 font-semibold leading-snug text-ink">{c.title}</h3>
      <div className="mt-1 text-sm text-dim">{c.issuer}</div>
      {c.detail && <p className="mt-3 text-sm text-faint">{c.detail}</p>}

      <div className="mt-auto flex flex-wrap items-center justify-between gap-2 pt-5 font-mono text-[11px]">
        {c.id ? <span className="text-faint">ID {c.id}</span> : <span />}
        {c.verify && (
          <span className="relative z-10 flex flex-wrap gap-1.5">
            {c.verify.map((v) => (
              <a
                key={v.url}
                href={v.url}
                target="_blank"
                rel="noreferrer"
                title={`Verify on Coursera`}
                className="rounded border border-line-bright px-1.5 py-0.5 text-dim transition hover:border-signal hover:text-signal"
              >
                {v.label} ↗
              </a>
            ))}
          </span>
        )}
        {c.file && (
          <a
            href={c.file}
            target="_blank"
            rel="noreferrer"
            className="relative z-10 rounded border border-line-bright px-2 py-1 text-dim transition hover:border-signal hover:text-signal"
          >
            view.pdf ↗
          </a>
        )}
      </div>
    </div>
  );
}

export default function Credentials() {
  return (
    <section id="credentials" className="relative mx-auto max-w-7xl px-4 py-28 sm:px-6 md:py-40">
      <SectionHeader
        port="05"
        cmd="gpg --list-keys"
        title="Credentials vault."
        kicker="Certifications, honours and references. Hover a card to inspect it."
      />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {credentials.map((c, i) => (
          <Reveal key={c.title + i} delay={(i % 4) * 80}>
            <CredCard c={c} index={i} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
