"use client";

import { useEffect, useRef, useState } from "react";
import { experience, education } from "@/lib/data";
import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";

function useScrollProgress<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [p, setP] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const v = (vh * 0.6 - r.top) / r.height;
      setP(Math.max(0, Math.min(1, v)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return [ref, p] as const;
}

export default function Experience() {
  const [ref, progress] = useScrollProgress<HTMLOListElement>();
  const [openIdx, setOpenIdx] = useState<number>(0);

  return (
    <section id="experience" className="relative mx-auto max-w-7xl px-4 py-28 sm:px-6 md:py-40">
      <SectionHeader
        port="03"
        cmd="tail -f /var/log/career"
        title="Incident log."
        kicker="Every role, logged like a ticket. Open one to see the full resolution notes."
      />

      <ol ref={ref} className="relative ml-2 md:ml-4">
        <div className="absolute left-0 top-0 h-full w-px bg-line" />
        <div
          className="absolute left-0 top-0 w-px bg-signal shadow-[0_0_10px_var(--color-signal)]"
          style={{ height: `${progress * 100}%` }}
        />

        {experience.map((r, i) => {
          const open = openIdx === i;
          return (
            <Reveal as="li" key={r.title} delay={i * 100} className="relative pb-10 pl-8 md:pl-12">
              <span
                className={`absolute -left-[5px] top-2 h-[11px] w-[11px] rotate-45 border ${
                  r.status === "ACTIVE" ? "animate-pulse-ring border-signal bg-signal" : "border-line-bright bg-void"
                }`}
              />
              <button
                onClick={() => setOpenIdx(open ? -1 : i)}
                className="group w-full rounded-xl border border-line bg-panel/60 p-5 text-left transition hover:border-line-bright md:p-7"
                aria-expanded={open}
              >
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[11px]">
                  <span
                    className={`rounded px-2 py-0.5 ${
                      r.status === "ACTIVE" ? "bg-signal/15 text-signal" : "bg-line text-dim"
                    }`}
                  >
                    {r.status}
                  </span>
                  <span className="text-faint">INC-{String(experience.length - i).padStart(4, "0")}</span>
                  <span className="text-dim">{r.period}</span>
                  {r.groups.length > 0 && (
                    <span className="ml-auto text-faint transition group-hover:text-signal">
                      {open ? "[ − collapse ]" : "[ + expand ]"}
                    </span>
                  )}
                </div>
                <h3 className="mt-4 text-xl font-semibold text-ink md:text-2xl">{r.title}</h3>
                <div className="mt-1 text-dim">
                  <span className="text-ink/90">{r.org}</span> · {r.meta}
                </div>
                <p className="mt-4 max-w-3xl text-dim">{r.summary}</p>

                {r.groups.length > 0 && (
                <div
                  className={`grid transition-[grid-template-rows] duration-500 ease-out ${
                    open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="mt-6 grid gap-6 border-t border-line pt-6 md:grid-cols-2">
                      {r.groups.map((g) => (
                        <div key={g.label}>
                          <div className="mb-3 font-mono text-[11px] uppercase tracking-widest text-signal">
                            {g.label}
                          </div>
                          <ul className="space-y-2.5 text-sm text-dim">
                            {g.points.map((pt) => (
                              <li key={pt} className="flex gap-3">
                                <span className="mt-2 h-1 w-1 shrink-0 bg-faint" />
                                <span>{pt}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                )}
              </button>
            </Reveal>
          );
        })}
      </ol>

      <div id="education" className="mt-20 grid gap-6 md:grid-cols-2">
        {education.map((e, i) => (
          <Reveal key={e.title} delay={i * 120}>
            <div className="h-full rounded-xl border border-line bg-panel/40 p-6">
              <div className="flex items-center justify-between font-mono text-[11px]">
                <span className="text-amber">EDU</span>
                <span className="text-dim">{e.period}</span>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-ink">{e.title}</h3>
              <div className="text-sm text-dim">{e.org}</div>
              <ul className="mt-4 space-y-2 text-sm text-dim">
                {e.points.map((p) => (
                  <li key={p} className="flex gap-3">
                    <span className="text-amber">›</span>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
