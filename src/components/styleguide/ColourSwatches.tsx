import { getTranslations } from "next-intl/server";
import { SectionTitle } from "./SectionTitle";

// Keep in sync with :root in src/app/globals.css.
const swatches = [
  { name: "white (mist)", hex: "#FFFFFF", cls: "bg-mist ring-1 ring-rule ring-inset", text: "text-ink" },
  { name: "ink (text)", hex: "#0A0A0A", cls: "bg-ink", text: "text-mist" },
  { name: "uda (accent)", hex: "#FFCC00", cls: "bg-uda", text: "text-ink" },
  { name: "tea (secondary)", hex: "#14532D", cls: "bg-tea", text: "text-mist" },
  { name: "pine (green text)", hex: "#1A6634", cls: "bg-pine", text: "text-mist" },
  { name: "paper-2", hex: "#F4F5F1", cls: "bg-paper-2", text: "text-ink" },
  { name: "rule", hex: "#E2E3DC", cls: "bg-rule", text: "text-ink" },
] as const;

export async function ColourSwatches() {
  const t = await getTranslations("styleguide");
  return (
    <section className="flex flex-col gap-4">
      <SectionTitle>{t("colours")}</SectionTitle>
      <ul className="grid grid-cols-2 gap-px border border-rule bg-rule sm:grid-cols-4 lg:grid-cols-7">
        {swatches.map((s) => (
          <li key={s.name} className={`${s.cls} ${s.text} flex aspect-[4/5] flex-col justify-end p-3`}>
            <span className="text-sm font-semibold">{s.name}</span>
            <span className="font-mono text-xs">{s.hex}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
