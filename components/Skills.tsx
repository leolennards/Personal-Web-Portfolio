"use client";

import { skills, stack } from "@/lib/data";
import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";
import { trackSpotlight } from "@/lib/spotlight";

export default function Skills() {
  return (
    <section id="skills" className="relative py-28 md:py-40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader
          port="02"
          cmd="systemctl status --all"
          title="System diagnostics."
          kicker="Eight services, all running. This is the toolkit I use on a live queue every day."
        />

        <div className="grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {skills.map((s, i) => (
            <Reveal key={s.id} delay={(i % 4) * 80} className="bg-void">
              <div
                onMouseMove={trackSpotlight}
                className="spotlight group flex h-full flex-col bg-void p-6 transition-colors hover:bg-panel"
              >
                <div className="mb-8 flex items-center justify-between font-mono text-[11px]">
                  <span className="text-faint">svc/{s.id}</span>
                  <span className="flex items-center gap-1.5 text-signal">
                    <span className="h-1.5 w-1.5 rounded-full bg-signal" /> running
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-ink">{s.title}</h3>
                <p className="mt-2 text-sm text-dim">{s.detail}</p>
                <div className="mt-auto flex flex-wrap gap-1.5 pt-6">
                  {s.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded border border-line px-2 py-0.5 font-mono text-[11px] text-dim transition group-hover:border-signal/40 group-hover:text-ink"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <div className="mt-5 h-0.5 overflow-hidden rounded bg-line">
                  <div className="h-full w-0 bg-signal transition-[width] duration-700 ease-out group-hover:w-full" />
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <div className="relative mt-20 overflow-hidden border-y border-line py-5 [mask-image:linear-gradient(90deg,transparent,black_15%,black_85%,transparent)]">
        <div className="flex w-max animate-marquee gap-10 font-mono text-sm text-dim hover:[animation-play-state:paused]">
          {[...stack, ...stack].map((t, i) => (
            <span key={i} className="flex items-center gap-10 whitespace-nowrap">
              {t}
              <span className="text-signal">/</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
