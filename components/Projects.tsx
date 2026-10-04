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

function Featured({ p }: { p: Project }) {
  return (
    <div
      onMouseMove={trackSpotlight}
      className="spotlight grid gap-8 overflow-hidden rounded-2xl border border-line bg-panel p-6 md:p-10 lg:grid-cols-[1fr_1.1fr]"
    >
      <div>
        <div className="flex items-center gap-3 font-mono text-[11px]">
          <span className="rounded bg-amber/15 px-2 py-0.5 text-amber">FEATURED</span>
          <span className="text-dim">{p.kind}</span>
          <span className="text-faint">· {p.year}</span>
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
      </div>
      <div className="flex items-center rounded-xl border border-line bg-void/60 p-4 md:p-6">
        <LabDiagram />
      </div>
    </div>
  );
}

function Card({ p }: { p: Project }) {
  if (p.placeholder) {
    return (
      <div className="marching flex h-full min-h-56 flex-col items-center justify-center rounded-xl p-6 text-center font-mono">
        <div className="text-[11px] tracking-widest text-faint">AWAITING_UPLOAD</div>
        <div className="mt-3 text-sm text-dim">{p.summary}</div>
        <div className="mt-4 flex gap-1">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="h-1.5 w-1.5 animate-blink rounded-full bg-faint"
              style={{ animationDelay: `${i * 200}ms` }}
            />
          ))}
        </div>
      </div>
    );
  }
  const Inner = (
    <>
      <div className="flex items-center justify-between font-mono text-[11px]">
        <span className="text-dim">{p.kind}</span>
        <span className="text-faint">{p.year}</span>
      </div>
      <h3 className="mt-5 text-xl font-semibold text-ink">
        {p.title}
        {p.link && <span className="ml-2 inline-block text-signal transition group-hover:translate-x-1 group-hover:-translate-y-1">↗</span>}
      </h3>
      <p className="mt-3 text-sm text-dim">{p.summary}</p>
      <div className="mt-auto flex flex-wrap gap-1.5 pt-6">
        {p.tags.map((t) => (
          <span key={t} className="rounded border border-line px-2 py-0.5 font-mono text-[11px] text-dim">
            {t}
          </span>
        ))}
      </div>
    </>
  );
  const cls =
    "spotlight group flex h-full min-h-56 flex-col rounded-xl border border-line bg-panel/60 p-6 transition hover:-translate-y-1 hover:border-line-bright";
  return p.link ? (
    <a href={p.link} target="_blank" rel="noreferrer" onMouseMove={trackSpotlight} className={cls}>
      {Inner}
    </a>
  ) : (
    <div onMouseMove={trackSpotlight} className={cls}>
      {Inner}
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
        kicker="Labs and builds where I learned by doing, from my own PKI to a full Windows Server domain."
      />
      <div className="space-y-6">
        {featured.map((p) => (
          <Reveal key={p.id}>
            <Featured p={p} />
          </Reveal>
        ))}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((p, i) => (
            <Reveal key={p.id} delay={(i % 3) * 90}>
              <Card p={p} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
