import { profile } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-8 font-mono text-[11px] text-faint sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <span>
          © {new Date().getFullYear()} {profile.name} · LEO<span className="text-signal">//</span>OS
        </span>
        <span>
          built with Next.js · press <kbd className="rounded border border-line-bright px-1">`</kbd> for the terminal
        </span>
        <a href="#top" className="text-dim hover:text-signal">
          ↑ return to top
        </a>
      </div>
    </footer>
  );
}
