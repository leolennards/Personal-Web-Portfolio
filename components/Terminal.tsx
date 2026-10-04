"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { credentials, experience, profile, projects, sections, skills } from "@/lib/data";

const EVENT = "leoos:terminal";

export function openTerminal() {
  window.dispatchEvent(new Event(EVENT));
}

type Line = { id: number; node: ReactNode };

const COMMANDS: Record<string, string> = {
  help: "list commands",
  whoami: "about me",
  skills: "core skills",
  experience: "work history",
  projects: "things I've built",
  certs: "certifications",
  contact: "how to reach me",
  cv: "download my CV",
  goto: "goto <section> · jump to a section",
  ping: "check if I'm up",
  clear: "clear the screen",
  exit: "close the terminal",
};

let nextId = 0;
const line = (node: ReactNode): Line => ({ id: nextId++, node });

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export default function Terminal() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [cursor, setCursor] = useState(-1);
  const [lines, setLines] = useState<Line[]>(() => [
    line(<span className="text-signal">LEO//OS terminal · type <b>help</b> to get started</span>),
  ]);
  const inputRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onOpen = () => setOpen(true);
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement).tagName;
      const typing = tag === "INPUT" || tag === "TEXTAREA";
      if ((e.key === "`" || e.key === "~") && !typing) {
        e.preventDefault();
        setOpen((o) => !o);
      } else if (e.key === "Escape") {
        setOpen(false);
      }
    };
    window.addEventListener(EVENT, onOpen);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener(EVENT, onOpen);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 50);
  }, [open]);

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight });
  }, [lines]);

  const run = useCallback((raw: string) => {
    const cmd = raw.trim();
    const [name, ...args] = cmd.split(/\s+/);
    const out: ReactNode[] = [];
    const key = name?.toLowerCase() ?? "";

    switch (key) {
      case "":
        break;
      case "help":
        Object.entries(COMMANDS).forEach(([k, v]) =>
          out.push(
            <span>
              <span className="inline-block w-28 text-signal">{k}</span>
              <span className="text-dim">{v}</span>
            </span>,
          ),
        );
        break;
      case "whoami":
        out.push(<span className="text-ink">{profile.name} · {profile.roles[0]} · {profile.location}</span>);
        out.push(<span className="text-dim">{profile.tagline}</span>);
        break;
      case "skills":
        skills.forEach((s) =>
          out.push(
            <span>
              <span className="text-signal">▸ {s.title}</span> <span className="text-dim">{s.tags.join(", ")}</span>
            </span>,
          ),
        );
        break;
      case "experience":
      case "log":
        experience.forEach((r) =>
          out.push(
            <span>
              <span className={r.status === "ACTIVE" ? "text-signal" : "text-faint"}>[{r.status}]</span>{" "}
              <span className="text-ink">{r.title}</span> <span className="text-dim">@ {r.org} · {r.period}</span>
            </span>,
          ),
        );
        break;
      case "projects":
        projects
          .filter((p) => !p.placeholder)
          .forEach((p) =>
            out.push(
              <span>
                <span className="text-amber">◆ {p.title}</span> <span className="text-dim">· {p.kind}</span>
              </span>,
            ),
          );
        break;
      case "certs":
      case "vault":
        credentials
          .filter((c) => !c.placeholder)
          .forEach((c) =>
            out.push(
              <span>
                <span className="text-ice">✓ {c.title}</span> <span className="text-dim">· {c.issuer}, {c.date}</span>
              </span>,
            ),
          );
        break;
      case "contact":
        out.push(
          <span>
            email{"    "}
            <a className="text-signal underline" href={`mailto:${profile.email}`}>
              {profile.email}
            </a>
          </span>,
        );
        out.push(
          <span>
            linkedin{" "}
            <a className="text-signal underline" href={profile.linkedin} target="_blank" rel="noreferrer">
              linkedin.com/in/leolennards
            </a>
          </span>,
        );
        break;
      case "cv": {
        const a = document.createElement("a");
        a.href = profile.cv;
        a.download = "Leo-Lennards-CV.pdf";
        a.click();
        out.push(<span className="text-signal">Downloading Leo-Lennards-CV.pdf…</span>);
        break;
      }
      case "goto":
      case "cd": {
        const target = (args[0] ?? "").replace(/^[#/]/, "").toLowerCase();
        const match = sections.find((s) => s.id === target || s.label === target);
        if (match) {
          out.push(<span className="text-dim">→ /{match.id}</span>);
          setOpen(false);
          setTimeout(() => scrollToSection(match.id), 150);
        } else {
          out.push(
            <span className="text-alert">
              no such section. try: {sections.map((s) => s.id).join(", ")}
            </span>,
          );
        }
        break;
      }
      case "ping":
        out.push(<span className="text-dim">PING leo.lennards (cape-town): 56 data bytes</span>);
        out.push(<span className="text-signal">64 bytes from leo: icmp_seq=0 ttl=64 time=0.42 ms · reply: available for work</span>);
        break;
      case "sudo":
        out.push(<span className="text-amber">Permission granted. Best way to use it: hire me. → type <b>contact</b></span>);
        break;
      case "ls":
        out.push(<span className="text-dim">{sections.map((s) => s.id + "/").join("  ")}  cv.pdf</span>);
        break;
      case "clear":
        setLines([]);
        return;
      case "exit":
        setOpen(false);
        break;
      default:
        out.push(<span className="text-alert">command not found: {name}. type help</span>);
    }

    setLines((prev) => [
      ...prev,
      line(
        <span>
          <span className="text-signal">{profile.handle}</span>
          <span className="text-faint">:~$</span> <span className="text-ink">{cmd}</span>
        </span>,
      ),
      ...out.map(line),
    ]);
  }, []);

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      run(input);
      if (input.trim()) setHistory((h) => [input, ...h].slice(0, 50));
      setInput("");
      setCursor(-1);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const n = Math.min(cursor + 1, history.length - 1);
      if (history[n] !== undefined) {
        setCursor(n);
        setInput(history[n]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const n = cursor - 1;
      setCursor(Math.max(n, -1));
      setInput(n >= 0 ? history[n] : "");
    } else if (e.key === "Tab") {
      e.preventDefault();
      const hit = Object.keys(COMMANDS).find((c) => c.startsWith(input.toLowerCase()));
      if (hit && input) setInput(hit);
    }
  };

  return (
    <div
      className={`fixed inset-0 z-[90] flex items-end justify-center p-3 transition duration-300 sm:items-center sm:p-6 ${
        open ? "pointer-events-auto bg-void/60 opacity-100 backdrop-blur-sm" : "pointer-events-none opacity-0"
      }`}
      onClick={() => setOpen(false)}
      inert={!open}
    >
      <div
        role="dialog"
        aria-label="Terminal"
        className={`w-full max-w-2xl overflow-hidden rounded-lg border border-line-bright bg-panel/95 shadow-[0_0_80px_-20px_rgb(61_255_154/0.35)] transition duration-300 ${
          open ? "translate-y-0 scale-100" : "translate-y-6 scale-[0.98]"
        }`}
        onClick={(e) => {
          e.stopPropagation();
          inputRef.current?.focus();
        }}
      >
        <div className="flex items-center gap-2 border-b border-line px-4 py-2.5 font-mono text-[11px] text-faint">
          <button onClick={() => setOpen(false)} className="h-2.5 w-2.5 rounded-full bg-alert/80" aria-label="Close" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-signal/80" />
          <span className="ml-3">{profile.handle} — zsh</span>
          <span className="ml-auto">esc to close</span>
        </div>
        <div ref={bodyRef} className="h-[52vh] max-h-[420px] overflow-y-auto px-4 py-3 font-mono text-[13px] leading-6">
          {lines.map((l) => (
            <div key={l.id} className="whitespace-pre-wrap break-words">
              {l.node}
            </div>
          ))}
          <div className="flex items-center">
            <span className="text-signal">{profile.handle}</span>
            <span className="text-faint">:~$</span>
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              className="ml-2 flex-1 bg-transparent text-ink caret-signal outline-none"
              spellCheck={false}
              autoCapitalize="off"
              autoComplete="off"
              aria-label="Terminal input"
              tabIndex={open ? 0 : -1}
            />
          </div>
        </div>
        <div className="flex flex-wrap gap-2 border-t border-line px-4 py-2.5 font-mono text-[11px]">
          {["help", "whoami", "experience", "certs", "contact", "cv"].map((c) => (
            <button
              key={c}
              onClick={() => run(c)}
              className="rounded border border-line px-2 py-0.5 text-dim transition hover:border-signal hover:text-signal"
            >
              {c}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
