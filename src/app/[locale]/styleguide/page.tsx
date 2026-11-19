import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { ColourSwatches } from "@/components/styleguide/ColourSwatches";
import { TypeSpecimen } from "@/components/styleguide/TypeSpecimen";
import { ButtonSet } from "@/components/styleguide/ButtonSet";
import { MotifSet } from "@/components/styleguide/MotifSet";

export const metadata: Metadata = { robots: { index: false } };

export default async function StyleguidePage() {
  const t = await getTranslations("styleguide");
  return (
    <div className="mx-auto flex max-w-screen-xl flex-col gap-16 px-4 py-12 md:px-8">
      <header className="flex flex-col gap-3 border-b-2 border-ink pb-6 dark:border-mist">
        <h1 className="font-display text-5xl text-tea dark:text-mist">{t("title")}</h1>
        <p className="max-w-2xl text-lg text-muted-foreground">{t("intro")}</p>
      </header>
      <ColourSwatches />
      <TypeSpecimen />
      <ButtonSet />
      <MotifSet />
    </div>
  );
}
