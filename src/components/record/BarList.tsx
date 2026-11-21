type Row = { label: string; value: number; display: string; tone?: "tea" | "pine" };

/** Accessible horizontal bar chart: a real list with the values as text; bars are decorative. */
export function BarList({ rows, caption }: { rows: Row[]; caption: string }) {
  const max = Math.max(1, ...rows.map((r) => r.value));
  return (
    <figure className="flex flex-col gap-3">
      <figcaption className="sr-only">{caption}</figcaption>
      <ul className="flex flex-col gap-3">
        {rows.map((r) => (
          <li key={r.label} className="flex flex-col gap-1">
            <div className="flex justify-between gap-4 text-sm">
              <span>{r.label}</span>
              <span className="font-mono">{r.display}</span>
            </div>
            <div aria-hidden className="h-2.5 bg-paper-2">
              <div className={r.tone === "pine" ? "h-full bg-pine" : "h-full bg-tea dark:bg-[#9cc3a6]"} style={{ width: `${(r.value / max) * 100}%` }} />
            </div>
          </li>
        ))}
      </ul>
    </figure>
  );
}
