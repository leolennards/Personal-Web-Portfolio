"use client";

import { useEffect, useRef, useState } from "react";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#$%&*<>/\\=+";

type Props = {
  text: string;
  className?: string;
  delay?: number; // ms
  speed?: number; // ms per letter
  hover?: boolean; // scramble again on hover
};

export default function ScrambleText({ text, className, delay = 0, speed = 45, hover = false }: Props) {
  const [out, setOut] = useState(text);
  const frame = useRef<number>(0);

  const run = () => {
    cancelAnimationFrame(frame.current);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setOut(text);
      return;
    }
    const start = performance.now();
    const tick = (now: number) => {
      const locked = Math.floor((now - start) / speed);
      let s = "";
      for (let i = 0; i < text.length; i++) {
        if (text[i] === " " || i < locked) s += text[i];
        else s += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
      }
      setOut(s);
      if (locked < text.length) frame.current = requestAnimationFrame(tick);
    };
    frame.current = requestAnimationFrame(tick);
  };

  useEffect(() => {
    const t = setTimeout(run, delay);
    return () => {
      clearTimeout(t);
      cancelAnimationFrame(frame.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, delay]);

  return (
    <span className={className} onMouseEnter={hover ? run : undefined} aria-label={text}>
      <span aria-hidden>{out}</span>
    </span>
  );
}
