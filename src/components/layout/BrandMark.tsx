import { cn } from "@/lib/utils";

/**
 * PLACEHOLDER EMBLEM: "RT" monogram on a tea-green seal.
 * Swap in the official Sotik/Bomet emblem only once usage rights are confirmed
 * (see PROGRESS.md → TO CONFIRM). Replace the <svg> body with an <Image> of the
 * licensed asset and remove data-placeholder.
 */
export function BrandMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 96 96"
      aria-hidden="true"
      data-placeholder="emblem"
      className={cn("shrink-0", className)}
    >
      <title>Placeholder emblem: official crest pending rights</title>
      <circle cx="48" cy="48" r="46" className="fill-tea dark:fill-mist" />
      <circle cx="48" cy="48" r="39" fill="none" strokeWidth="1.5" className="stroke-uda" />
      {/* two tea leaves */}
      <path d="M48 20c6 4 8 10 0 16-8-6-6-12 0-16z" className="fill-uda" />
      <text
        x="48"
        y="66"
        textAnchor="middle"
        className="fill-mist font-display dark:fill-night"
        style={{ fontSize: 30, fontWeight: 600, letterSpacing: "-0.02em" }}
      >
        RT
      </text>
    </svg>
  );
}
