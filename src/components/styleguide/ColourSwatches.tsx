import { getTranslations } from "next-intl/server";
import { tokens } from "@/lib/tokens";
import { SectionTitle } from "./SectionTitle";

// Preset A tokens (values from src/lib/tokens.ts, which a test keeps in sync with globals.css).
const swatches = [
  { name: "paper", cls: "bg-paper ring-1 ring-rule ring-inset", text: "text-ink" },
  { name: "mist", cls: "bg-mist", text: "text-ink" },
  { name: "ink", cls: "bg-ink", text: "text-paper" },
  { name: "primary", cls: "bg-primary", text: "text-paper" },
  { name: "leaf", cls: "bg-leaf", text: "text-paper" },
  { name: "accent", cls: "bg-accent", text: "text-ink" },
  { name: "gold-soft", cls: "bg-gold-soft", text: "text-ink" },
  { name: "muted", cls: "bg-muted-foreground", text: "text-paper" },
  { name: "rule", cls: "bg-rule", text: "text-ink" },
] as const;

export async function ColourSwatches() {
  const t = await getTranslations("styleguide");
  return (
    <section className="flex flex-col gap-4">
      <SectionTitle>{t("colours")}</SectionTitle>
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-9">
        {swatches.map((s) => (
          <li key={s.name} className={`${s.cls} ${s.text} flex aspect-[4/5] flex-col justify-end rounded-lg p-3`}>
            <span className="text-sm font-semibold">{s.name}</span>
            <span className="text-xs tabular-nums">{tokens[s.name as keyof typeof tokens].toUpperCase()}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
