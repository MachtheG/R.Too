/** Visible marker for a figure that is not yet verified against a primary source. */
import { cn } from "@/lib/utils";

/**
 * Visible marker for a figure that is not yet verified against a primary source.
 * The leading space and sr-only brackets keep it a separate phrase in copied or
 * scraped text and for screen readers ("wards in Sotik (to confirm)"), never merged.
 */
export function ToConfirm({ label, className }: { label: string; className?: string }) {
  return (
    <>
      {" "}
      <span className={cn("ml-2 inline-block border border-current px-1.5 py-0.5 align-middle font-mono text-[10px] tracking-wider uppercase opacity-80", className)}>
        <span className="sr-only">(</span>
        {label}
        <span className="sr-only">)</span>
      </span>
    </>
  );
}
