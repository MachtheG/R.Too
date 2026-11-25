import { getTranslations } from "next-intl/server";
import { SectionTitle } from "./SectionTitle";

/** The site's three button styles (utilities defined in globals.css). */
export async function ButtonSet() {
  const t = await getTranslations("styleguide");
  return (
    <section className="flex flex-col gap-4">
      <SectionTitle>{t("buttons")}</SectionTitle>
      <div className="flex flex-wrap gap-3">
        <button type="button" className="btn btn-primary">{t("btn.accent")}</button>
        <button type="button" className="btn btn-secondary">{t("btn.outline")}</button>
        <span className="rounded-lg bg-primary p-2"><button type="button" className="btn btn-on-dark">{t("btn.primary")}</button></span>
      </div>
    </section>
  );
}
