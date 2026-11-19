import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { Ward } from "@data/wards";
import { numberLocale } from "@/lib/i18n-helpers";
import { PhotoPlaceholder } from "@/components/shared/PhotoPlaceholder";

export async function WardCard({ ward, total, locale }: { ward: Ward; total: number; locale: string }) {
  const t = await getTranslations("wards");
  const fmt = new Intl.NumberFormat(numberLocale(locale));
  const pct = new Intl.NumberFormat(numberLocale(locale), { style: "percent", maximumFractionDigits: 1 });
  return (
    <Link href={`/wards/${ward.slug}`} className="group flex flex-col gap-3 border-t-2 border-ink pt-4 dark:border-mist">
      <PhotoPlaceholder ratio="3/2" label={ward.name} />
      <span className="font-display text-2xl group-hover:text-laterite">{ward.name}</span>
      <span className="flex items-baseline gap-2">
        <span className="font-display text-3xl">{fmt.format(ward.voters2022)}</span>
        <span className="text-sm text-muted-foreground">{t("voters")} · {pct.format(ward.voters2022 / total)} {t("share")}</span>
      </span>
    </Link>
  );
}
