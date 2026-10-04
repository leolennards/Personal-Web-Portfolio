"use client";

import { useEffect, useRef } from "react";

type Node = { x: number; y: number; vx: number; vy: number; r: number; lit: number; hub: boolean };
type Packet = { a: number; b: number; t: number; speed: number };
type Ping = { x: number; y: number; r: number };

const LINK = 150;
const CURSOR_LINK = 220;

// background network thing for the hero
// mouse = router, click = ping that lights up nodes
export default function NetworkCanvas({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0;
    let h = 0;
    let dpr = 1;
    let nodes: Node[] = [];
    const packets: Packet[] = [];
    const pings: Ping[] = [];
    const mouse = { x: -9999, y: -9999, active: false };
    let raf = 0;
    let visible = true;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      // mobile address bar triggers resize, don't reset nodes unless width changed
      if (nodes.length && Math.abs(rect.width - w) < 2) {
        h = rect.height;
        canvas.height = h * dpr;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        return;
      }
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width;
      h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round(Math.min(90, Math.max(28, (w * h) / 14000)));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: Math.random() * 1.4 + 0.8,
        lit: 0,
        hub: Math.random() < 0.08,
      }));
    };

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = mouse.y >= 0 && mouse.y <= rect.height;
    };
    const onLeave = () => {
      mouse.active = false;
    };
    const onClick = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const y = e.clientY - rect.top;
      if (y < 0 || y > rect.height) return;
      const target = e.target as HTMLElement;
      if (target.closest("a,button,input,textarea")) return;
      pings.push({ x: e.clientX - rect.left, y, r: 0 });
    };

    const step = () => {
      ctx.clearRect(0, 0, w, h);

      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < -20) n.x = w + 20;
        if (n.x > w + 20) n.x = -20;
        if (n.y < -20) n.y = h + 20;
        if (n.y > h + 20) n.y = -20;
        if (mouse.active) {
          const dx = mouse.x - n.x;
          const dy = mouse.y - n.y;
          const d = Math.hypot(dx, dy);
          if (d < CURSOR_LINK && d > 40) {
            n.x += (dx / d) * 0.18;
            n.y += (dy / d) * 0.18;
          }
        }
        n.lit *= 0.965;
      }

      // pings
      for (let i = pings.length - 1; i >= 0; i--) {
        const p = pings[i];
        const prev = p.r;
        p.r += 7;
        for (const n of nodes) {
          const d = Math.hypot(n.x - p.x, n.y - p.y);
          if (d >= prev && d < p.r) n.lit = 1;
        }
        const alpha = Math.max(0, 1 - p.r / Math.max(w, h));
        ctx.strokeStyle = `rgba(61,255,154,${0.35 * alpha})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.stroke();
        if (alpha <= 0) pings.splice(i, 1);
      }

      // links
      const links: [number, number][] = [];
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < LINK) {
            links.push([i, j]);
            const lit = Math.max(a.lit, b.lit);
            const base = (1 - d / LINK) * 0.32;
            ctx.strokeStyle = lit > 0.05
              ? `rgba(61,255,154,${base + lit * 0.5})`
              : `rgba(120,150,180,${base})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
        if (mouse.active) {
          const d = Math.hypot(a.x - mouse.x, a.y - mouse.y);
          if (d < CURSOR_LINK) {
            ctx.strokeStyle = `rgba(61,255,154,${(1 - d / CURSOR_LINK) * 0.55})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
          }
        }
      }

      // packets
      if (!reduced && links.length && packets.length < 14 && Math.random() < 0.12) {
        const [a, b] = links[Math.floor(Math.random() * links.length)];
        packets.push(Math.random() < 0.5 ? { a, b, t: 0, speed: 0.012 + Math.random() * 0.02 } : { a: b, b: a, t: 0, speed: 0.012 + Math.random() * 0.02 });
      }
      for (let i = packets.length - 1; i >= 0; i--) {
        const p = packets[i];
        p.t += p.speed;
        const a = nodes[p.a];
        const b = nodes[p.b];
        if (!a || !b || p.t >= 1 || Math.hypot(a.x - b.x, a.y - b.y) > LINK * 1.1) {
          if (b && p.t >= 1) b.lit = Math.max(b.lit, 0.6);
          packets.splice(i, 1);
          continue;
        }
        const x = a.x + (b.x - a.x) * p.t;
        const y = a.y + (b.y - a.y) * p.t;
        ctx.fillStyle = "rgba(61,255,154,0.95)";
        ctx.shadowColor = "rgba(61,255,154,0.9)";
        ctx.shadowBlur = 8;
        ctx.fillRect(x - 1.2, y - 1.2, 2.4, 2.4);
        ctx.shadowBlur = 0;
      }

      // nodes
      for (const n of nodes) {
        const g = n.lit;
        ctx.fillStyle = g > 0.05 ? `rgba(61,255,154,${0.5 + g * 0.5})` : n.hub ? "rgba(255,181,71,0.85)" : "rgba(170,190,210,0.55)";
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r + (n.hub ? 1 : 0) + g * 1.6, 0, Math.PI * 2);
        ctx.fill();
        if (n.hub) {
          ctx.strokeStyle = "rgba(255,181,71,0.25)";
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.r + 5, 0, Math.PI * 2);
          ctx.stroke();
        }
      }

      if (mouse.active) {
        ctx.strokeStyle = "rgba(61,255,154,0.8)";
        ctx.lineWidth = 1;
        ctx.strokeRect(mouse.x - 5, mouse.y - 5, 10, 10);
      }

      if (visible && !reduced) raf = requestAnimationFrame(step);
    };

    const io = new IntersectionObserver(([e]) => {
      const was = visible;
      visible = e.isIntersecting;
      if (visible && !was && !reduced) raf = requestAnimationFrame(step);
    });
    io.observe(canvas);

    resize();
    step();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerdown", onClick);
    document.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onClick);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <canvas ref={ref} className={className} aria-hidden />;
}
