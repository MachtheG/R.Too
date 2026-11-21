"use client";
import { useState, type KeyboardEvent } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { Ward } from "@data/wards";
import { sotikMap, shapeFor, densityFor } from "@data/sotikMap";
import { planFor } from "@data/wardPlans";
import { numberLocale, pick } from "@/lib/i18n-helpers";
import { useLiteMode } from "@/components/shared/useLiteMode";
import { DraftBadge } from "@/components/shared/DraftBadge";
import { shadeFor, SELECTED } from "./wardShades";

type Props = { wards: Ward[]; total: number; headingLevel?: "h3" | "h2" };

/**
 * Sotik Constituency drawn from IEBC ward boundaries. Each ward is shaded by registered
 * voters; selecting one (map, list or keyboard) shows its numbers and DRAFT plan.
 */
export function SotikMap({ wards, total, headingLevel = "h3" }: Props) {
  const t = useTranslations("map");
  const locale = useLocale();
  const lite = useLiteMode();
  const [sel, setSel] = useState(wards[0].slug);
  const fmt = new Intl.NumberFormat(numberLocale(locale));
  const pct = new Intl.NumberFormat(numberLocale(locale), { style: "percent", maximumFractionDigits: 0 });
  const vals = wards.map((w) => w.voters2022);
  const [min, max] = [Math.min(...vals), Math.max(...vals)];
  const ward = wards.find((w) => w.slug === sel)!;
  const shape = shapeFor(sel);
  const plan = planFor(sel);
  const H = headingLevel;

  const onKey = (slug: string) => (e: KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setSel(slug); }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
      {/* Map */}
      <figure className="flex flex-col gap-3 lg:col-span-7">
        {!lite && (
          <svg viewBox={sotikMap.viewBox} role="group" aria-label={t("mapLabel")} className="h-auto w-full max-h-[78vh] touch-manipulation">
            <path d={sotikMap.outline} className="fill-paper-2" />
            {wards.map((w) => {
              const s = shapeFor(w.slug);
              if (!s) return null;
              const on = w.slug === sel;
              const shade = on ? SELECTED : shadeFor(w.voters2022, min, max);
              return (
                <path
                  key={w.slug}
                  d={s.path}
                  role="button"
                  tabIndex={0}
                  aria-pressed={on}
                  aria-label={t("wardButton", { ward: w.name, voters: fmt.format(w.voters2022) })}
                  onClick={() => setSel(w.slug)}
                  onKeyDown={onKey(w.slug)}
                  style={{ fill: shade.fill }}
                  className="cursor-pointer stroke-white stroke-[3] outline-none transition-[fill] hover:brightness-95 focus-visible:stroke-ink focus-visible:stroke-[6]"
                />
              );
            })}
            <path d={sotikMap.outline} className="pointer-events-none fill-none stroke-ink stroke-[4]" />
            {wards.map((w) => {
              const s = shapeFor(w.slug);
              if (!s) return null;
              const shade = w.slug === sel ? SELECTED : shadeFor(w.voters2022, min, max);
              const lines = w.name.includes("/") ? w.name.split("/").map((p, i, a) => (i < a.length - 1 ? `${p}/` : p)) : [w.name];
              const y0 = s.label.y - (lines.length - 1) * 19;
              return (
                <g key={w.slug} aria-hidden className="pointer-events-none" style={{ fill: shade.text }}>
                  {lines.map((line, i) => (
                    <text key={i} x={s.label.x} y={y0 + i * 38} textAnchor="middle" className="font-sans font-semibold" style={{ fontSize: 34 }}>{line}</text>
                  ))}
                  <text x={s.label.x} y={y0 + lines.length * 38 + 2} textAnchor="middle" className="font-mono" style={{ fontSize: 28 }}>{fmt.format(w.voters2022)}</text>
                </g>
              );
            })}
          </svg>
        )}
        <figcaption className="flex flex-col gap-2">
          <span className="flex items-center gap-3 text-xs">
            <span>{t("legendLow")}</span>
            <span aria-hidden className="flex h-2.5 w-28">{[0, 1, 2, 3, 4].map((i) => <span key={i} className="flex-1" style={{ background: shadeFor(min + ((max - min) * i) / 4, min, max).fill }} />)}</span>
            <span>{t("legendHigh")}</span>
          </span>
          <span className="font-mono text-[11px] text-muted-foreground">{lite ? t("lite") : t("boundaries")}</span>
        </figcaption>
      </figure>

      {/* Ward list + selected ward */}
      <div className="flex flex-col gap-5 lg:col-span-5">
        <div role="group" aria-label={t("chooseWard")} className="flex flex-col border-t-2 border-ink">
          {wards.map((w) => {
            const on = w.slug === sel;
            return (
              <button
                key={w.slug}
                type="button"
                aria-pressed={on}
                onClick={() => setSel(w.slug)}
                className={`grid min-h-12 grid-cols-[1fr_auto] items-center gap-4 border-b border-rule px-3 text-left ${on ? "bg-uda text-ink" : "hover:bg-paper-2"}`}
              >
                <span className="font-display text-lg">{w.name}</span>
                <span className="font-mono text-sm tabular-nums">{fmt.format(w.voters2022)}</span>
              </button>
            );
          })}
        </div>

        <article aria-live="polite" className="flex flex-col gap-4 bg-tea p-5 text-white md:p-6">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <H className="font-display text-3xl">{ward.name}</H>
            {plan?.draft && <span className="bg-white"><DraftBadge label={t("draft")} /></span>}
          </div>
          {plan && <p className="text-white/90">{pick(plan.focus, locale)}</p>}

          <dl className="grid grid-cols-2 gap-px bg-white/20 text-sm">
            {[
              [fmt.format(ward.voters2022), t("voters")],
              [pct.format(ward.voters2022 / total), t("share")],
              ...(shape ? [[`${fmt.format(shape.areaKm2)} km²`, t("area")], [fmt.format(densityFor(sel)), t("density")]] : []),
            ].map(([v, k]) => (
              <div key={k} className="flex flex-col bg-tea p-3">
                <dt className="order-2 text-white/80">{k}</dt>
                <dd className="font-display text-2xl text-uda">{v}</dd>
              </div>
            ))}
          </dl>
          {shape && shape.neighbours.length > 0 && (
            <p className="text-sm text-white/85">
              <span className="eyebrow mr-2 text-uda">{t("borders")}</span>
              {shape.neighbours.map((n) => (n.county === "Bomet" ? n.constituency : `${n.constituency} (${n.county})`)).join(" · ")}
            </p>
          )}

          {plan && (
            <div className="flex flex-col gap-2 border-t border-white/25 pt-4">
              <p className="eyebrow text-uda">{t("planTitle")}</p>
              <ol className="flex flex-col gap-3">
                {plan.items.map((it, i) => (
                  <li key={i} className="grid grid-cols-[auto_1fr] gap-3">
                    <span aria-hidden className="flex size-7 items-center justify-center bg-uda font-mono text-xs font-semibold text-ink">{i + 1}</span>
                    <span>
                      <span className="mr-1.5 font-mono text-[11px] tracking-wider text-uda uppercase">{t(`pledge.${it.pledge}`)}</span>
                      {pick(it.text, locale)}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          )}
          <Link href={`/wards/${ward.slug}`} className="inline-flex min-h-11 items-center self-start bg-uda px-4 font-semibold text-ink hover:bg-white">
            {t("open")} →
          </Link>
        </article>
      </div>
    </div>
  );
}
