"use client";

import { useEffect, useState } from "react";
import { sections } from "@/lib/data";
import { openTerminal } from "./Terminal";

function useClock() {
  const [now, setNow] = useState<string>("--:--:--");
  useEffect(() => {
    const fmt = () =>
      new Intl.DateTimeFormat("en-ZA", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
        timeZone: "Africa/Johannesburg",
      }).format(new Date());
    setNow(fmt());
    const t = setInterval(() => setNow(fmt()), 1000);
    return () => clearInterval(t);
  }, []);
  return now;
}

export default function StatusBar() {
  const now = useClock();
  const [active, setActive] = useState<string>("");
  const [progress, setProgress] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const els = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => !!el);
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));

    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? window.scrollY / max : 0);
      if (window.scrollY < 200) setActive("");
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line/80 bg-void/70 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-7xl items-center gap-4 px-4 font-mono text-xs sm:px-6">
        <a href="#top" className="group flex items-center gap-2 text-ink">
          <span className="grid h-6 w-6 place-items-center rounded-sm border border-signal/50 text-[10px] text-signal transition group-hover:bg-signal group-hover:text-void">
            L
          </span>
          <span className="tracking-widest">
            LEO<span className="text-signal">//</span>OS
          </span>
        </a>

        <nav className="ml-6 hidden items-center gap-1 lg:flex">
          {sections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className={`relative rounded px-3 py-1.5 transition ${
                active === s.id ? "text-signal" : "text-dim hover:text-ink"
              }`}
            >
              <span className="text-faint">:{s.port}</span> {s.label}
              {active === s.id && (
                <span className="absolute inset-x-3 -bottom-[9px] h-px bg-signal shadow-[0_0_10px_var(--color-signal)]" />
              )}
            </a>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-4">
          <span className="hidden items-center gap-2 text-dim sm:flex">
            <span className="h-1.5 w-1.5 animate-pulse-ring rounded-full bg-signal" />
            online · CPT {now}
          </span>
          <button
            onClick={openTerminal}
            className="rounded border border-line-bright px-2.5 py-1 text-dim transition hover:border-signal hover:text-signal"
            aria-label="Open terminal"
          >
            &gt;_ <span className="hidden sm:inline">terminal</span>
            <kbd className="ml-2 hidden text-faint md:inline">`</kbd>
          </button>
          <button
            className="text-dim lg:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-label="Menu"
          >
            {open ? "[close]" : "[menu]"}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-line bg-void/95 px-4 py-3 font-mono text-sm lg:hidden">
          {sections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              onClick={() => setOpen(false)}
              className="block py-2 text-dim hover:text-signal"
            >
              <span className="text-faint">:{s.port}</span> {s.label}
            </a>
          ))}
        </nav>
      )}

      <div
        className="absolute bottom-0 left-0 h-px bg-signal shadow-[0_0_8px_var(--color-signal)]"
        style={{ width: `${progress * 100}%` }}
      />
    </header>
  );
}
