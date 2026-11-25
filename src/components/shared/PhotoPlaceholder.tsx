import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

type Props = { ratio: "4/5" | "16/9" | "1/1" | "3/2" | "2/3"; label: string; note?: string; dark?: boolean; className?: string };

const ratios = { "4/5": "aspect-[4/5]", "16/9": "aspect-video", "1/1": "aspect-square", "3/2": "aspect-[3/2]", "2/3": "aspect-[2/3]" } as const;

/**
 * Deliberate, labelled gap for a photo that has not been supplied yet.
 * Shows a "Photo to come" badge plus the brief for the shot, so a reviewer can
 * see exactly what is missing without the page looking broken.
 */
export function PhotoPlaceholder({ ratio, label, note, dark = false, className }: Props) {
  const t = useTranslations("common.photo");
  return (
    <figure
      role="img"
      aria-label={`${t("pending")}: ${note ? `${label}, ${note}` : label}`}
      data-placeholder="photo"
      className={cn(
        ratios[ratio],
        "relative flex flex-col justify-between gap-3 rounded-lg border border-dashed p-4",
        dark ? "tea-rows border-paper/40 text-paper" : "tea-rows-light border-muted-foreground/40 text-muted-foreground dark:border-paper/40 dark:text-paper",
        className,
      )}
    >
      <span
        className={cn(
          "inline-flex items-center gap-1.5 self-start px-2 py-1 tabular-nums text-[10px] tracking-wider uppercase",
          dark ? "bg-paper text-ink" : "bg-ink text-paper dark:bg-paper dark:text-ink",
        )}
      >
        <svg viewBox="0 0 16 16" aria-hidden="true" className="size-3 fill-current">
          <path d="M5.5 2 4.3 3.5H2A1 1 0 0 0 1 4.5v8a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-8a1 1 0 0 0-1-1h-2.3L10.5 2h-5zM8 5.5a3 3 0 1 1 0 6 3 3 0 0 1 0-6z" />
        </svg>
        {t("pending")}
      </span>
      <span className="flex flex-col gap-1">
        <span className="eyebrow">{label}</span>
        {note && <span className="text-sm">{note}</span>}
      </span>
    </figure>
  );
}
