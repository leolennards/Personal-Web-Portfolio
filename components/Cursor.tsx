"use client";

import { useEffect, useRef } from "react";

// follows the mouse, gets bigger over links/buttons. desktop only
export default function Cursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = ref.current;
    if (!el) return;
    let x = -100, y = -100, tx = -100, ty = -100, raf = 0;
    const move = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      const hot = (e.target as HTMLElement).closest("a,button,input,textarea,[role=radio]");
      el.dataset.hot = hot ? "1" : "";
    };
    const loop = () => {
      x += (tx - x) * 0.18;
      y += (ty - y) * 0.18;
      el.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("pointermove", move);
    el.style.opacity = "1";
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", move);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[95] h-8 w-8 rounded-full border border-signal/50 opacity-0 mix-blend-screen transition-[width,height,background-color,border-color] duration-200 data-[hot=1]:h-12 data-[hot=1]:w-12 data-[hot=1]:border-signal data-[hot=1]:bg-signal/10"
    />
  );
}
