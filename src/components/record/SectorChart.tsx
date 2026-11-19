import { getTranslations } from "next-intl/server";
import { projects } from "@data/projects";
import { countBySector } from "@/lib/projects";
import { numberLocale } from "@/lib/i18n-helpers";
import { BarList } from "./BarList";

export async function SectorChart({ locale }: { locale: string }) {
  const t = await getTranslations("record");
  const tp = await getTranslations("projects.sector");
  const fmt = new Intl.NumberFormat(numberLocale(locale));
  const rows = countBySector(projects).map((r) => ({ label: tp(r.sector), value: r.count, display: fmt.format(r.count) }));

  return (
    <section aria-labelledby="sector-title" className="flex flex-col gap-4">
      <h2 id="sector-title" className="font-display text-3xl">{t("bySector")}</h2>
      {rows.length ? <BarList rows={rows} caption={t("bySector")} /> : <p className="bg-paper-2 px-4 py-3 font-mono text-xs">{t("chartsEmpty")}</p>}
    </section>
  );
}
