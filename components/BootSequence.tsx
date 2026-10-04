"use client";

import { useEffect, useState } from "react";

const LINES = [
  "LEO//OS v2.6 · build 2026.10",
  "[ OK ] POST complete · memory check passed",
  "[ OK ] Mounting /experience",
  "[ OK ] Loading identity provider · Entra ID",
  "[ OK ] Endpoint protection active",
  "[ OK ] TLS handshake · certificate valid",
  "[ OK ] Starting network services",
  "ACCESS GRANTED",
];

const KEY = "leoos-booted";

// boot screen, only shows once per session. any key / click skips
export default function BootSequence() {
  const [shown, setShown] = useState(0);
  // start covered so the page doesn't flash before the overlay shows
  const [done, setDone] = useState(false);
  const [booting, setBooting] = useState(false);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(KEY) === "1";
    } catch {}
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (seen || reduced) {
      setDone(true);
      return;
    }
    setBooting(true);
    try {
      sessionStorage.setItem(KEY, "1");
    } catch {}
  }, []);

  useEffect(() => {
    if (done || !booting) return;
    if (shown < LINES.length) {
      const t = setTimeout(() => setShown((s) => s + 1), shown === LINES.length - 1 ? 260 : 150);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setLeaving(true), 450);
    const t2 = setTimeout(() => setDone(true), 1100);
    return () => {
      clearTimeout(t);
      clearTimeout(t2);
    };
  }, [shown, done, booting]);

  useEffect(() => {
    if (done || !booting) return;
    const skip = () => {
      setLeaving(true);
      setTimeout(() => setDone(true), 500);
    };
    window.addEventListener("keydown", skip);
    window.addEventListener("pointerdown", skip);
    return () => {
      window.removeEventListener("keydown", skip);
      window.removeEventListener("pointerdown", skip);
    };
  }, [done, booting]);

  if (done) return null;

  return (
    <div
      id="boot"
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-void transition-[clip-path] duration-700 ease-[cubic-bezier(.7,0,.2,1)] ${
        leaving ? "[clip-path:inset(50%_0_50%_0)]" : "[clip-path:inset(0_0_0_0)]"
      }`}
      role="presentation"
    >
      <div className="w-[min(560px,90vw)] font-mono text-[13px] leading-7">
        {LINES.slice(0, shown).map((l, i) => {
          const last = l === "ACCESS GRANTED";
          return (
            <div
              key={i}
              className={last ? "mt-3 text-lg tracking-[0.4em] text-signal text-glow" : "text-dim"}
            >
              {l.startsWith("[ OK ]") ? (
                <>
                  <span className="text-signal">[ OK ]</span>
                  {l.slice(6)}
                </>
              ) : (
                l
              )}
            </div>
          );
        })}
        <span className="inline-block h-4 w-2 translate-y-0.5 animate-blink bg-signal" />
        {booting && (
          <div className="mt-8 text-[11px] uppercase tracking-[0.25em] text-faint">press any key to skip</div>
        )}
      </div>
      <noscript>
        <style>{`#boot{display:none}`}</style>
      </noscript>
    </div>
  );
}
