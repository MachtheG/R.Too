import { getTranslations } from "next-intl/server";
import { SectionTitle } from "./SectionTitle";

const swatches = [
  { name: "tea", hex: "#1F3D2B", cls: "bg-tea", text: "text-mist" },
  { name: "leaf", hex: "#3E6B4A", cls: "bg-leaf", text: "text-mist" },
  { name: "laterite", hex: "#A4472C", cls: "bg-laterite", text: "text-mist" },
  { name: "mist", hex: "#F4F1EA", cls: "bg-mist", text: "text-ink" },
  { name: "ink", hex: "#16181A", cls: "bg-ink", text: "text-mist" },
  { name: "rule", hex: "#D6D0C2", cls: "bg-rule", text: "text-ink" },
  { name: "uda (accent)", hex: "#F2C200", cls: "bg-uda", text: "text-ink" },
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
