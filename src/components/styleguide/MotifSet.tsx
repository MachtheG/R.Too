import { getTranslations } from "next-intl/server";
import { PhotoPlaceholder } from "@/components/shared/PhotoPlaceholder";
import { SectionTitle } from "./SectionTitle";

export async function MotifSet() {
  const t = await getTranslations("styleguide");
  return (
    <section className="flex flex-col gap-4">
      <SectionTitle>{t("motifs")}</SectionTitle>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="tea-rows flex aspect-video items-end p-4 font-mono text-xs text-mist">{t("teaRows")}</div>
        <PhotoPlaceholder ratio="4/5" label={t("placeholder")} note="Robert Too among tea farmers · ≥1600×2000" />
      </div>
    </section>
  );
}
