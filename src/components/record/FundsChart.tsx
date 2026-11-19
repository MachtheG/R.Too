import { getTranslations } from "next-intl/server";
import { projects } from "@data/projects";
import { fundsByYear } from "@/lib/projects";
import { numberLocale } from "@/lib/i18n-helpers";
import { BarList } from "./BarList";

/** Approved allocations and actual spending are always shown as separate series. */
export async function FundsChart({ locale }: { locale: string }) {
  const t = await getTranslations("record");
  const fmt = new Intl.NumberFormat(numberLocale(locale), { notation: "compact" });
  const rows = fundsByYear(projects).flatMap((r) => [
    { label: `${r.year} · ${t("approved")}`, value: r.approved, display: `KSh ${fmt.format(r.approved)}`, tone: "tea" as const },
    { label: `${r.year} · ${t("spent")}`, value: r.spent, display: `KSh ${fmt.format(r.spent)}`, tone: "laterite" as const },
  ]);

  return (
    <section aria-labelledby="funds-title" className="flex flex-col gap-4">
      <h2 id="funds-title" className="font-display text-3xl">{t("byYear")}</h2>
      {rows.length ? <BarList rows={rows} caption={t("byYear")} /> : <p className="bg-paper-2 px-4 py-3 font-mono text-xs">{t("chartsEmpty")}</p>}
    </section>
  );
}
