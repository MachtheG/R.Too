import { sotikMap } from "@data/sotikMap";
import { cn } from "@/lib/utils";

/** Small static Sotik outline with one ward highlighted (ward pages). */
export function WardLocator({ slug, label, className }: { slug: string; label: string; className?: string }) {
  return (
    <svg viewBox={sotikMap.viewBox} role="img" aria-label={label} className={cn("h-auto w-full", className)}>
      {sotikMap.wards.map((w) => (
        <path key={w.slug} d={w.path} className={w.slug === slug ? "fill-uda" : "fill-paper-2"} stroke="#fff" strokeWidth={3} />
      ))}
      <path d={sotikMap.outline} className="fill-none stroke-ink stroke-[4]" />
    </svg>
  );
}
