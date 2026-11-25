import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { Ward } from "@data/wards";
import { planFor } from "@data/wardPlans";
import { numberLocale, pick } from "@/lib/i18n-helpers";
import { WardLocator } from "@/components/map/WardLocator";

export async function WardCard({ ward, total, locale }: { ward: Ward; total: number; locale: string }) {
  const t = await getTranslations("wards");
  const tm = await getTranslations("map");
  const fmt = new Intl.NumberFormat(numberLocale(locale));
  const pct = new Intl.NumberFormat(numberLocale(locale), { style: "percent", maximumFractionDigits: 1 });
  const plan = planFor(ward.slug);
  return (
    <Link href={`/wards/${ward.slug}`} className="group card flex flex-col gap-3 p-4 transition-colors hover:border-primary">
      <span className="flex aspect-[3/2] items-center justify-center rounded-md bg-mist p-3 group-hover:bg-accent/30">
        <WardLocator slug={ward.slug} label={tm("locator", { ward: ward.name })} className="h-full w-auto" />
      </span>
      <span className="font-display text-2xl group-hover:text-primary">{ward.name}</span>
      <span className="flex flex-wrap items-baseline gap-x-2">
        <span className="font-display text-3xl">{fmt.format(ward.voters2022)}</span>
        <span className="text-sm text-muted-foreground">{t("voters")} · {pct.format(ward.voters2022 / total)} {t("share")}</span>
      </span>
      {plan && <span className="text-sm text-muted-foreground dark:text-paper/85">{pick(plan.focus, locale)}</span>}
    </Link>
  );
}
