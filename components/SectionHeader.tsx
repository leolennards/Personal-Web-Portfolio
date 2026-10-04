import Reveal from "./Reveal";
import ScrambleText from "./ScrambleText";

type Props = { port: string; cmd: string; title: string; kicker?: string };

export default function SectionHeader({ port, cmd, title, kicker }: Props) {
  return (
    <Reveal className="mb-12 md:mb-16">
      <div className="mb-4 flex items-center gap-3 font-mono text-xs text-faint">
        <span className="text-signal">:{port}</span>
        <span className="h-px w-10 bg-line-bright" />
        <span>
          <span className="text-dim">$</span> {cmd}
        </span>
      </div>
      <h2 className="text-4xl font-semibold tracking-tight text-ink md:text-6xl">
        <ScrambleText text={title} hover speed={30} />
      </h2>
      {kicker && <p className="mt-4 max-w-2xl text-dim md:text-lg">{kicker}</p>}
    </Reveal>
  );
}
