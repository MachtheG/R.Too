import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { type Ward, totalWardVoters, wards } from "@data/wards";
import { projects } from "@data/projects";
import { shapeFor, densityFor } from "@data/sotikMap";
import { planFor } from "@data/wardPlans";
import { numberLocale, pick } from "@/lib/i18n-helpers";
import { Container } from "@/components/shared/Container";
import { CampaignPhoto } from "@/components/shared/CampaignPhoto";
import { ToConfirm } from "@/components/shared/ToConfirm";
import { DraftBadge } from "@/components/shared/DraftBadge";
import { WardLocator } from "@/components/map/WardLocator";

const wardPhoto: Record<string, string> = {
  kapletundo: "sotik-hills",
  chemagel: "dairy-farmers",
  kipsonoi: "bomet-highlands",
  "ndanai-abosi": "bomet-plains",
  "rongena-manaret": "tea-buying-centre",
};

export async function WardDetail({ ward, locale }: { ward: Ward; locale: string }) {
  const t = await getTranslations("wards");
  const tm = await getTranslations("map");
  const fmt = new Intl.NumberFormat(numberLocale(locale));
  const pct = new Intl.NumberFormat(numberLocale(locale), { style: "percent", maximumFractionDigits: 1 });
  const rank = [...wards].sort((a, b) => b.voters2022 - a.voters2022).findIndex((w) => w.slug === ward.slug) + 1;
  const local = projects.filter((p) => p.ward === ward.slug || p.ward === "all");
  const shape = shapeFor(ward.slug);
  const plan = planFor(ward.slug);

  return (
    <Container className="flex flex-col gap-10 py-10 md:py-16">
      <Link href="/wards" className="inline-flex min-h-11 items-center self-start tabular-nums text-sm underline underline-offset-4">← {t("detail.back")}</Link>
      <div className="grid gap-8 md:grid-cols-12">
        <div className="flex flex-col gap-4 md:col-span-7">
          <p className="kicker">{t("detail.rank", { rank })}</p>
          <h1 className="font-display text-[clamp(2.5rem,6vw,4.5rem)] leading-none text-ink dark:text-paper">{ward.name}</h1>
          {plan && <p className="max-w-xl text-lg">{pick(plan.focus, locale)}</p>}
          <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-rule bg-rule sm:grid-cols-4">
            {[
              [<>{fmt.format(ward.voters2022)}<ToConfirm label={t("toConfirm")} className="ml-1" /></>, t("voters")],
              [pct.format(ward.voters2022 / totalWardVoters), t("share")],
              ...(shape ? [[`${fmt.format(shape.areaKm2)} km²`, tm("area")], [fmt.format(densityFor(ward.slug)), tm("density")]] : []),
            ].map(([v, k], i) => (
              <div key={i} className="flex flex-col gap-1 bg-background p-3">
                <dt className="order-2 text-sm text-muted-foreground">{k}</dt>
                <dd className="font-display text-2xl">{v}</dd>
              </div>
            ))}
          </dl>
          {shape && shape.neighbours.length > 0 && (
            <p className="text-sm"><span className="eyebrow mr-2 text-primary">{tm("borders")}</span>{shape.neighbours.map((n) => (n.county === "Bomet" ? n.constituency : `${n.constituency} (${n.county})`)).join(" · ")}</p>
          )}
        </div>
        <div className="md:col-span-5">
          <WardLocator slug={ward.slug} label={tm("locator", { ward: ward.name })} className="mx-auto max-w-72 md:max-w-none" />
        </div>
      </div>

      <section aria-labelledby="ward-plan" className="flex flex-col gap-4 rounded-lg bg-primary p-5 text-paper md:p-8">
        <div className="flex flex-wrap items-center gap-3">
          <h2 id="ward-plan" className="font-display text-3xl">{tm("planTitleWard", { ward: ward.name })}</h2>
          {plan?.draft && <span className="bg-paper"><DraftBadge label={tm("draft")} /></span>}
        </div>
        {plan && (
          <ol className="grid gap-4 md:grid-cols-3">
            {plan.items.map((it, i) => (
              <li key={i} className="flex flex-col gap-2 border-t-2 border-accent pt-3">
                <span className="tabular-nums text-[11px] tracking-wider text-accent uppercase">{String(i + 1).padStart(2, "0")} · {tm(`pledge.${it.pledge}`)}</span>
                <span>{pick(it.text, locale)}</span>
              </li>
            ))}
          </ol>
        )}
        <p className="text-sm text-paper/85">{tm("planNote")}</p>
      </section>

      <CampaignPhoto id={wardPhoto[ward.slug]} locale={locale} ratio="16/9" />

      <section className="flex flex-col gap-3">
        <h2 className="font-display text-3xl">{t("detail.projects")}</h2>
        {local.length ? (
          <ul className="flex flex-col">{local.map((p) => <li key={p.slug} className="border-b border-rule py-3"><Link href={`/projects/${p.slug}`} className="underline underline-offset-4">{pick(p.name, locale)}</Link></li>)}</ul>
        ) : (
          <p className="text-muted-foreground">{t("detail.noProjects")}</p>
        )}
      </section>
    </Container>
  );
}
