/** Marks content (pledges) that the campaign has not yet approved. Keep until the candidate signs off. */
export function DraftBadge({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center border border-dashed border-laterite px-2 py-0.5 font-mono text-[10px] tracking-wider text-laterite uppercase">
      {label}
    </span>
  );
}
