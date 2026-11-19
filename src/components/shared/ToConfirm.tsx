/** Visible marker for a figure that is not yet verified against a primary source. */
export function ToConfirm({ label }: { label: string }) {
  return (
    <span className="ml-2 inline-block border border-current px-1.5 py-0.5 align-middle font-mono text-[10px] tracking-wider uppercase opacity-80">
      {label}
    </span>
  );
}
