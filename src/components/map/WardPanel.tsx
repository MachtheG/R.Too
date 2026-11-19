"use client";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { Ward } from "@data/wards";
import { numberLocale } from "@/lib/i18n-helpers";

export function WardPanel({ ward, total }: { ward: Ward; total: number }) {
  const t = useTranslations("map");
  const locale = useLocale();
  const fmt = new Intl.NumberFormat(numberLocale(locale));
  const pct = new Intl.NumberFormat(numberLocale(locale), { style: "percent", maximumFractionDigits: 1 });

  return (
    <aside aria-live="polite" className="flex flex-col gap-4 bg-tea p-6 text-mist">
      <p className="eyebrow text-uda">{t("selected")}</p>
      <p className="font-display text-3xl">{ward.name}</p>
      <p className="flex flex-col border-t border-mist/25 pt-3">
        <span className="font-display text-5xl">{fmt.format(ward.voters2022)}</span>
        <span className="text-sm text-[#d8d4ca]">{t("voters")}</span>
      </p>
      <p className="flex flex-col border-t border-mist/25 pt-3">
        <span className="font-display text-3xl">{pct.format(ward.voters2022 / total)}</span>
        <span className="text-sm text-[#d8d4ca]">{t("share")}</span>
      </p>
      <Link href={`/wards/${ward.slug}`} className="mt-auto inline-flex min-h-11 items-center self-start bg-uda px-4 font-semibold text-ink">
        {t("open")} →
      </Link>
    </aside>
  );
}
