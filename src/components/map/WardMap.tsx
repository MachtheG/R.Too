"use client";
import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { Ward } from "@data/wards";
import { numberLocale } from "@/lib/i18n-helpers";
import { useLiteMode } from "@/components/shared/useLiteMode";
import { shadeFor } from "./wardShades";
import { MapLegend } from "./MapLegend";
import { WardPanel } from "./WardPanel";

// Schematic tile layout (not geographic): the largest ward spans two columns.
const span: Record<string, string> = { kapletundo: "col-span-2" };

export function WardMap({ wards, total, projectCount }: { wards: Ward[]; total: number; projectCount: number }) {
  const t = useTranslations("map");
  const locale = useLocale();
  const lite = useLiteMode();
  const [sel, setSel] = useState(0);
  const [overlay, setOverlay] = useState(false);
  const fmt = new Intl.NumberFormat(numberLocale(locale));
  const vals = wards.map((w) => w.voters2022);
  const [min, max] = [Math.min(...vals), Math.max(...vals)];

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="flex flex-col gap-4 lg:col-span-2">
        {lite ? (
          <p className="bg-paper-2 px-4 py-3 font-mono text-xs">{t("lite")}</p>
        ) : (
          <div role="group" aria-label={t("tableCaption")} className="grid grid-cols-3 gap-1.5">
            {wards.map((w, i) => {
              const s = shadeFor(w.voters2022, min, max);
              return (
                <button
                  key={w.slug}
                  type="button"
                  aria-pressed={i === sel}
                  onClick={() => setSel(i)}
                  style={{ background: s.fill, color: s.text }}
                  className={`${span[w.slug] ?? ""} flex min-w-0 min-h-32 ring-1 ring-ink/15 flex-col items-start justify-between p-3 text-left outline-offset-2 md:min-h-40 ${i === sel ? "ring-4 ring-uda" : ""}`}
                >
                  <span className="text-sm font-semibold [overflow-wrap:anywhere] md:text-base">{w.name.replace("/", "/\u200b")}</span>
                  <span className="font-display text-2xl md:text-3xl">{fmt.format(w.voters2022)}</span>
                </button>
              );
            })}
          </div>
        )}
        <MapLegend low={t("legendLow")} high={t("legendHigh")} />
        <label className={`flex min-h-11 items-center gap-2 text-sm ${projectCount ? "" : "opacity-60"}`}>
          <input type="checkbox" className="size-5" disabled={!projectCount} checked={overlay} onChange={(e) => setOverlay(e.target.checked)} />
          {t("overlay")}
          {!projectCount && <span className="font-mono text-xs">({t("overlayEmpty")})</span>}
        </label>
        <p className="font-mono text-[11px] text-muted-foreground">{t("schematic")}</p>
      </div>
      <WardPanel ward={wards[sel]} total={total} />
      <Link href={`/wards/${wards[sel].slug}`} className="sr-only">{t("open")}</Link>
    </div>
  );
}
