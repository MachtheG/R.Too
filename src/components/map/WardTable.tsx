import { getTranslations } from "next-intl/server";
import type { Ward } from "@data/wards";
import { numberLocale } from "@/lib/i18n-helpers";

export async function WardTable({ wards, total, locale }: { wards: Ward[]; total: number; locale: string }) {
  const t = await getTranslations("map");
  const fmt = new Intl.NumberFormat(numberLocale(locale));
  const pct = new Intl.NumberFormat(numberLocale(locale), { style: "percent", maximumFractionDigits: 1 });
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-sm">
        <caption className="eyebrow pb-2 text-left text-muted-foreground">{t("tableCaption")}</caption>
        <thead>
          <tr className="border-b-2 border-ink text-left dark:border-paper">
            <th scope="col" className="p-2">{t("colWard")}</th>
            <th scope="col" className="p-2 text-right">{t("colVoters")}</th>
            <th scope="col" className="p-2 text-right">{t("colShare")}</th>
          </tr>
        </thead>
        <tbody>
          {wards.map((w) => (
            <tr key={w.slug} className="border-b border-rule">
              <th scope="row" className="p-2 text-left font-normal">{w.name}</th>
              <td className="p-2 text-right tabular-nums">{fmt.format(w.voters2022)}</td>
              <td className="p-2 text-right tabular-nums">{pct.format(w.voters2022 / total)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
