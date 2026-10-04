"use client";

import { useEffect, useState } from "react";
import { profile } from "@/lib/data";
import NetworkCanvas from "./NetworkCanvas";
import ScrambleText from "./ScrambleText";
import { openTerminal } from "./Terminal";

function useTyped(words: string[]) {
  const [i, setI] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[i % words.length];
    let t: ReturnType<typeof setTimeout> | undefined;
    if (!deleting && text === word) t = setTimeout(() => setDeleting(true), 1800);
    else if (deleting && text === "") {
      setDeleting(false);
      setI((n) => n + 1);
    } else
      t = setTimeout(
        () => setText(deleting ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1)),
        deleting ? 28 : 55,
      );
    return () => clearTimeout(t);
  }, [text, deleting, i, words]);

  return text;
}

export default function Hero() {
  const role = useTyped(profile.roles);
  const [first, last] = profile.name.split(" ");

  return (
    <section id="top" className="relative flex min-h-[100svh] items-center overflow-hidden pt-14">
      <div className="grid-bg pointer-events-none absolute inset-0" />
      <NetworkCanvas className="absolute inset-0 h-full w-full" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_22%_55%,rgb(4_6_10/0.85)_0%,transparent_55%),linear-gradient(to_bottom,transparent_70%,var(--color-void))]" />

      <div className="pointer-events-none relative mx-auto w-full max-w-7xl px-4 sm:px-6">
        <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-line-bright bg-panel/70 px-3 py-1.5 font-mono text-[11px] text-dim backdrop-blur">
          <span className="h-1.5 w-1.5 animate-pulse-ring rounded-full bg-signal" />
          <span>
            STATUS: <span className="text-signal">OPEN TO OPPORTUNITIES</span>
          </span>
          <span className="hidden text-faint sm:inline">· {profile.location}</span>
        </div>

        <h1 className="font-semibold leading-[0.88] tracking-[-0.04em] text-ink">
          <span className="block text-[clamp(3.5rem,15.5vw,11rem)]">
            <ScrambleText text={first} delay={300} speed={70} />
          </span>
          <span className="block text-[clamp(3.5rem,15.5vw,11rem)]">
            <ScrambleText text={last} delay={550} speed={70} />
            <span className="text-signal text-glow">.</span>
          </span>
        </h1>

        <div className="mt-8 font-mono text-base text-dim md:text-xl">
          <span className="text-faint">~$ </span>
          <span className="text-ink">{role}</span>
          <span className="ml-0.5 inline-block h-5 w-2.5 translate-y-1 animate-blink bg-signal md:h-6" />
        </div>

        <p className="mt-6 max-w-xl text-dim md:text-lg">{profile.tagline}</p>

        <div className="pointer-events-auto mt-10 flex flex-wrap items-center gap-3">
          <a
            href={profile.cv}
            download
            className="group relative overflow-hidden rounded-md bg-signal px-5 py-3 font-mono text-sm font-semibold text-void transition hover:shadow-[0_0_30px_-5px_var(--color-signal)]"
          >
            <span className="relative z-10">↓ download_cv.pdf</span>
            <span className="absolute inset-0 -translate-x-full bg-white/40 transition duration-500 group-hover:translate-x-full" />
          </a>
          <a
            href="#contact"
            className="rounded-md border border-line-bright px-5 py-3 font-mono text-sm text-ink transition hover:border-signal hover:text-signal"
          >
            open_ticket()
          </a>
          <button
            onClick={openTerminal}
            className="px-2 py-3 font-mono text-sm text-dim transition hover:text-signal"
          >
            &gt;_ or press <kbd className="rounded border border-line-bright px-1.5">`</kbd>
          </button>
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-6 left-1/2 hidden -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.3em] text-faint md:block">
        click anywhere to ping the network
      </div>
      <div className="pointer-events-none absolute bottom-6 right-6 hidden font-mono text-[10px] leading-5 text-faint md:block">
        <div>lat −33.89 · lon 18.56</div>
        <div>tz SAST (UTC+2)</div>
      </div>
    </section>
  );
}
