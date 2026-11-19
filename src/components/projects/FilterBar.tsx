"use client";
import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { sectors } from "@data/projects";
import { type Filters, toQuery } from "@/lib/projects";

type Props = { filters: Filters; wards: { slug: string; name: string }[]; years: number[] };
const selectCls = "min-h-11 border border-rule bg-background px-3 text-sm";

/** Filters are kept in the URL (?sector=&ward=&year=) so views are shareable. */
export function FilterBar({ filters, wards, years }: Props) {
  const t = useTranslations("projects");
  const router = useRouter();
  const pathname = usePathname();
  const set = (patch: Partial<Filters>) => router.replace(`${pathname}${toQuery({ ...filters, ...patch })}`, { scroll: false });

  return (
    <form role="search" aria-label={t("filters.label")} className="flex flex-wrap items-end gap-4" onSubmit={(e) => e.preventDefault()}>
      <label className="flex flex-col gap-1 text-sm">
        {t("filters.sector")}
        <select className={selectCls} value={filters.sector ?? ""} onChange={(e) => set({ sector: (e.target.value || undefined) as Filters["sector"] })}>
          <option value="">{t("filters.all")}</option>
          {sectors.map((s) => <option key={s} value={s}>{t(`sector.${s}`)}</option>)}
        </select>
      </label>
      <label className="flex flex-col gap-1 text-sm">
        {t("filters.ward")}
        <select className={selectCls} value={filters.ward ?? ""} onChange={(e) => set({ ward: e.target.value || undefined })}>
          <option value="">{t("filters.all")}</option>
          {wards.map((w) => <option key={w.slug} value={w.slug}>{w.name}</option>)}
        </select>
      </label>
      <label className="flex flex-col gap-1 text-sm">
        {t("filters.year")}
        <select className={selectCls} value={filters.year ?? ""} onChange={(e) => set({ year: e.target.value ? Number(e.target.value) : undefined })}>
          <option value="">{t("filters.all")}</option>
          {years.map((y) => <option key={y} value={y}>{y}</option>)}
        </select>
      </label>
      <button type="button" onClick={() => router.replace(pathname, { scroll: false })} className="min-h-11 px-3 text-sm underline underline-offset-4">
        {t("filters.clear")}
      </button>
    </form>
  );
}
