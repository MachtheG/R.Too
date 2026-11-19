type Props = { ratio: "4/5" | "16/9" | "1/1" | "3/2"; label: string; note?: string; dark?: boolean };

const ratios = { "4/5": "aspect-[4/5]", "16/9": "aspect-video", "1/1": "aspect-square", "3/2": "aspect-[3/2]" } as const;

/** Designed placeholder for a photo slot: texture + shot description, never a face. */
export function PhotoPlaceholder({ ratio, label, note, dark = false }: Props) {
  return (
    <figure
      role="img"
      aria-label={note ? `${label}: ${note}` : label}
      className={`${ratios[ratio]} flex flex-col justify-end gap-1 border border-rule p-4 ${dark ? "tea-rows text-mist" : "tea-rows-light text-ink-soft dark:text-mist"}`}
    >
      <span className="eyebrow">{label}</span>
      {note && <span className="text-sm">{note}</span>}
    </figure>
  );
}
