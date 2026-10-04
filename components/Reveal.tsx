"use client";

import { useEffect, useRef, type ElementType, type ReactNode, type CSSProperties } from "react";

type Props = {
  as?: ElementType;
  delay?: number;
  className?: string;
  children: ReactNode;
};

export default function Reveal({ as: Tag = "div", delay = 0, className = "", children }: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("in");
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag ref={ref} className={`reveal ${className}`} style={{ "--d": `${delay}ms` } as CSSProperties}>
      {children}
    </Tag>
  );
}
