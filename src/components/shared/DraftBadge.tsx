/** Marks content (pledges) that the campaign has not yet approved. Keep until the candidate signs off. */
export function DraftBadge({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center border border-dashed border-primary px-2 py-0.5 tabular-nums text-[10px] tracking-wider text-primary uppercase">
      {label}
    </span>
  );
}
