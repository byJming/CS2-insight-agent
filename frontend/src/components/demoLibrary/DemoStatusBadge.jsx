import { classifyDemoStatus } from "../../utils/demoLibraryDisplay";

const styles = {
  pending: "border-amber-500/35 bg-amber-500/10 text-cs2-amber-on-surface",
  loaded: "border-sky-500/35 bg-sky-500/10 text-sky-200",
  parsing: "border-cs2-accent/45 bg-cs2-accent/12 text-cs2-accent",
  done: "border-emerald-500/35 bg-emerald-500/10 text-cs2-emerald-on-surface",
  error: "border-red-500/40 bg-red-500/10 text-cs2-red-on-surface",
  meta_missing: "border-zinc-500/40 bg-zinc-500/10 text-cs2-text-secondary",
  unknown: "border-cs2-border bg-cs2-bg-hover text-cs2-text-secondary",
};

export default function DemoStatusBadge({ item, className = "" }) {
  const c = classifyDemoStatus(item);
  const st = styles[c.kind] || styles.unknown;
  return (
    <span
      className={`inline-flex max-w-full items-center rounded px-1.5 py-0.5 text-[10px] font-semibold ${st} ${className}`}
      title={c.tooltip || c.label}
    >
      <span className="truncate">{c.label}</span>
    </span>
  );
}
