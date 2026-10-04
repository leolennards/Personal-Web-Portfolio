"use client";

import { projects, type Project } from "@/lib/data";
import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";
import { trackSpotlight } from "@/lib/spotlight";

function LabDiagram() {
  const box = "fill-[var(--color-panel-2)] stroke-[var(--color-line-bright)]";
  const label = "fill-[var(--color-ink)] font-mono text-[13px]";
  const sub = "fill-[var(--color-faint)] font-mono text-[10px]";
  const Node = ({ x, y, w, title, lines, stroke }: { x: number; y: number; w: number; title: string; lines: string[]; stroke?: string }) => (
    <g>
      <rect x={x} y={y} width={w} height={34 + lines.length * 14} rx="8" className={box} style={stroke ? { stroke } : undefined} />
      <text x={x + w / 2} y={y + 22} textAnchor="middle" className={label}>{title}</text>
      {lines.map((l, i) => (
        <text key={l} x={x + w / 2} y={y + 38 + i * 14} textAnchor="middle" className={sub}>{l}</text>
      ))}
    </g>
  );
  const Link = ({ d, color = "var(--color-signal)" }: { d: string; color?: string }) => (
    <g fill="none" strokeWidth="1.5">
      <path d={d} stroke="var(--color-line-bright)" />
      <path d={d} className="flow" stroke={color} />
    </g>
  );
  return (
    <svg viewBox="0 0 560 300" className="h-auto w-full" role="img" aria-label="Request flow through the hardened lab: client, TLS and ModSecurity WAF, hardened app containers, AES-256 encrypted data store">
      <Link d="M92 150 H150" />
      <Link d="M270 150 H318" />
      <Link d="M428 150 C446 150 446 82 462 82" />
      <Link d="M428 150 C446 150 446 218 462 218" color="var(--color-ice)" />

      <Node x={10} y={124} w={82} title="client" lines={["https"]} />
      <Node x={150} y={110} w={120} title="ModSecurity" lines={["WAF", "TLS · own PKI"]} stroke="var(--color-signal)" />
      <Node x={318} y={110} w={110} title="app" lines={["hardened", "containers"]} />
      <Node x={462} y={56} w={90} title="services" lines={["internal"]} />
      <Node x={462} y={192} w={90} title="storage" lines={["AES-256"]} stroke="var(--color-ice)" />

      <text x="210" y="84" textAnchor="middle" className="fill-[var(--color-alert)] font-mono text-[10px]">✕ malicious requests dropped</text>
      <path d="M210 90 V108" stroke="var(--color-alert)" strokeDasharray="2 3" />

      <line x1="10" y1="276" x2="552" y2="276" stroke="var(--color-line)" strokeDasharray="3 4" />
      <text x="10" y="294" className={sub}>tcpdump · packet capture verifies every hop</text>
    </svg>
  );
}

function BookingDiagram() {
  const days = Array.from({ length: 28 }, (_, i) => i);
  const booked = new Set([3, 4, 5, 11, 12, 19, 20, 21, 22]);
  const picked = new Set([15, 16, 17]);
  return (
    <div className="mx-auto w-full max-w-sm font-mono text-[11px]">
      <div className="mb-3 flex items-center justify-between text-faint">
        <span>availability · 3-bed cottage</span>
        <span className="text-signal">● live</span>
      </div>
      <div className="grid grid-cols-7 gap-1.5">
        {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
          <div key={i} className="pb-1 text-center text-faint">{d}</div>
        ))}
        {days.map((d) => (
          <div
            key={d}
            className={`grid aspect-square place-items-center rounded ${
              booked.has(d)
                ? "bg-line text-faint line-through"
                : picked.has(d)
                  ? "bg-signal text-void"
                  : "border border-line text-dim"
            }`}
          >
            {d + 1}
          </div>
        ))}
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2 text-center">
        {[
          ["payfast", "paid", "text-signal"],
          ["webhook", "confirmed", "text-ice"],
          ["invoice", "pdf sent", "text-amber"],
        ].map(([k, v, c]) => (
          <div key={k} className="rounded border border-line bg-panel-2 px-2 py-2">
            <div className="text-faint">{k}</div>
            <div className={c}>{v}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Links({ p }: { p: Project }) {
  if (!p.link && !p.repo) return null;
  const btn =
    "relative z-10 rounded border border-line-bright px-3 py-1.5 font-mono text-[11px] text-dim transition hover:border-signal hover:text-signal";
  return (
    <div className="flex flex-wrap gap-2">
      {p.link && (
        <a href={p.link} target="_blank" rel="noreferrer" className={btn}>
          live site ↗
        </a>
      )}
      {p.repo && (
        <a href={p.repo} target="_blank" rel="noreferrer" className={btn}>
          source ↗
        </a>
      )}
    </div>
  );
}

function Featured({ p, flip }: { p: Project; flip?: boolean }) {
  return (
    <div
      onMouseMove={trackSpotlight}
      className={`spotlight grid gap-8 overflow-hidden rounded-2xl border border-line bg-panel p-6 md:p-10 lg:grid-cols-[1fr_1.1fr] ${
        flip ? "lg:[&>*:first-child]:order-2" : ""
      }`}
    >
      <div>
        <div className="flex items-center gap-3 font-mono text-[11px]">
          <span className="rounded bg-amber/15 px-2 py-0.5 text-amber">FEATURED</span>
          <span className="text-dim">{p.kind}</span>
          {p.year && <span className="text-faint">· {p.year}</span>}
        </div>
        <h3 className="mt-5 text-3xl font-semibold tracking-tight text-ink md:text-4xl">{p.title}</h3>
        <p className="mt-4 text-dim md:text-lg">{p.summary}</p>
        <ul className="mt-6 space-y-3 text-sm text-dim">
          {p.points?.map((pt) => (
            <li key={pt} className="flex gap-3">
              <span className="font-mono text-signal">✓</span>
              {pt}
            </li>
          ))}
        </ul>
        <div className="mt-6 flex flex-wrap gap-1.5">
          {p.tags.map((t) => (
            <span key={t} className="rounded border border-line-bright px-2 py-0.5 font-mono text-[11px] text-ink">
              {t}
            </span>
          ))}
        </div>
        <div className="mt-6">
          <Links p={p} />
        </div>
      </div>
      <div className="flex items-center rounded-xl border border-line bg-void/60 p-4 md:p-6">
        {p.diagram === "booking" ? <BookingDiagram /> : <LabDiagram />}
      </div>
    </div>
  );
}

// fanned out phone screens, spread more on hover
function Shots({ shots, title }: { shots: string[]; title: string }) {
  const mid = (shots.length - 1) / 2;
  return (
    <div className="group/shots relative mb-6 flex h-80 items-end justify-center overflow-hidden rounded-lg border border-line bg-void/60 pt-6">
      {shots.map((src, i) => {
        const off = i - mid;
        return (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={src}
            src={src}
            alt={`${title} screen ${i + 1}`}
            loading="lazy"
            className="absolute bottom-[-12%] w-[34%] max-w-[150px] rounded-[16px] border border-line-bright shadow-2xl transition-transform duration-500 ease-out [transform:translateX(var(--x))_rotate(var(--r))] group-hover/shots:[transform:translateX(var(--hx))_translateY(-8%)_rotate(var(--hr))]"
            style={
              {
                "--x": `${off * 34}%`,
                "--r": `${off * 6}deg`,
                "--hx": `${off * 70}%`,
                "--hr": `${off * 2}deg`,
                zIndex: 10 - Math.abs(Math.round(off * 2)),
              } as React.CSSProperties
            }
          />
        );
      })}
    </div>
  );
}

function Card({ p }: { p: Project }) {
  return (
    <div
      onMouseMove={trackSpotlight}
      className="spotlight group flex h-full min-h-56 flex-col rounded-xl border border-line bg-panel/60 p-6 transition hover:-translate-y-1 hover:border-line-bright"
    >
      {p.shots && <Shots shots={p.shots} title={p.title} />}
      <div className="flex items-center justify-between font-mono text-[11px]">
        <span className="text-dim">{p.kind}</span>
        <span className="text-faint">{p.year}</span>
      </div>
      <h3 className="mt-4 text-xl font-semibold text-ink">{p.title}</h3>
      <p className="mt-3 text-sm text-dim">{p.summary}</p>
      <div className="mt-auto pt-6">
        <div className="flex flex-wrap gap-1.5">
          {p.tags.map((t) => (
            <span key={t} className="rounded border border-line px-2 py-0.5 font-mono text-[11px] text-dim">
              {t}
            </span>
          ))}
        </div>
        {(p.link || p.repo) && (
          <div className="mt-4">
            <Links p={p} />
          </div>
        )}
      </div>
    </div>
  );
}

export default function Projects() {
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);
  return (
    <section id="projects" className="relative mx-auto max-w-7xl px-4 py-28 sm:px-6 md:py-40">
      <SectionHeader
        port="04"
        cmd="ls ~/projects"
        title="Built, broken, fixed."
        kicker="Things I've built: a booking site with real payments, Android apps, and labs where I learned by breaking things."
      />
      <div className="space-y-6">
        {featured.map((p, i) => (
          <Reveal key={p.id}>
            <Featured p={p} flip={i % 2 === 1} />
          </Reveal>
        ))}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((p, i) => (
            <Reveal key={p.id} delay={(i % 3) * 90} className={p.shots ? "md:col-span-2 lg:col-span-1 lg:row-span-2" : ""}>
              <Card p={p} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
