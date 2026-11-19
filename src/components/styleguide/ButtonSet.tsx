import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/button";
import { SectionTitle } from "./SectionTitle";

export async function ButtonSet() {
  const t = await getTranslations("styleguide");
  return (
    <section className="flex flex-col gap-4">
      <SectionTitle>{t("buttons")}</SectionTitle>
      <div className="flex flex-wrap gap-3">
        <Button className="h-12 px-6 font-semibold">{t("btn.primary")}</Button>
        <Button variant="outline" className="h-12 border-tea px-6 font-semibold">{t("btn.outline")}</Button>
        <Button className="h-12 bg-uda px-6 font-semibold text-ink hover:bg-uda/85">{t("btn.accent")}</Button>
      </div>
    </section>
  );
}
