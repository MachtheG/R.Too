import { legendRamp } from "./wardShades";

export function MapLegend({ low, high }: { low: string; high: string }) {
  return (
    <div className="flex items-center gap-2 font-mono text-xs" aria-hidden>
      <span>{low}</span>
      <span className="flex h-3 w-40">{legendRamp.map((c) => <span key={c} className="flex-1" style={{ background: c }} />)}</span>
      <span>{high}</span>
    </div>
  );
}
