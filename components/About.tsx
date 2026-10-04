"use client";

import { profile } from "@/lib/data";
import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";
import { trackSpotlight } from "@/lib/spotlight";

export default function About() {
  return (
    <section id="about" className="relative mx-auto max-w-7xl px-4 py-28 sm:px-6 md:py-40">
      <SectionHeader port="01" cmd="whoami" title="The person behind the ticket." />

      <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        <Reveal className="space-y-5 text-lg leading-relaxed text-dim md:text-xl">
          {profile.summary.map((p, i) => (
            <p key={i} className={i === 0 ? "text-ink" : ""}>
              {p}
            </p>
          ))}
        </Reveal>

        <Reveal delay={150}>
          <div
            onMouseMove={trackSpotlight}
            className="spotlight overflow-hidden rounded-xl border border-line bg-panel"
          >
            <div className="flex items-center justify-between border-b border-line px-5 py-3 font-mono text-[11px] text-faint">
              <span>identity.json</span>
              <span className="text-signal">● verified</span>
            </div>
            <dl className="divide-y divide-line font-mono text-sm">
              {profile.facts.map((f) => (
                <div key={f.k} className="grid grid-cols-[110px_1fr] gap-4 px-5 py-3.5">
                  <dt className="text-faint">{f.k}</dt>
                  <dd className="text-ink">{f.v}</dd>
                </div>
              ))}
            </dl>
            {/* TODO: add photo */}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
