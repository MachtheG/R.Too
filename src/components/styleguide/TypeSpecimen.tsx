import { getTranslations } from "next-intl/server";
import { SectionTitle } from "./SectionTitle";

export async function TypeSpecimen() {
  const t = await getTranslations("styleguide");
  return (
    <section className="flex flex-col gap-6">
      <SectionTitle>{t("type")}</SectionTitle>
      <p className="font-display text-5xl leading-none text-ink md:text-8xl dark:text-paper">{t("sample.display")}</p>
      <p className="max-w-2xl text-lg leading-relaxed">{t("sample.body")}</p>
      <div className="flex flex-col gap-1 border-t border-rule pt-4">
        <span className="font-display text-5xl">
          86,681<sup className="ml-1 tabular-nums text-xs text-primary">1</sup>
        </span>
        <span className="text-sm text-muted-foreground">{t("sample.stat")}</span>
      </div>
      <p className="tabular-nums text-xs text-muted-foreground">Fraunces · Inter · IBM Plex Mono</p>
    </section>
  );
}
