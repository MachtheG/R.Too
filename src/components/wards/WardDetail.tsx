import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { type Ward, totalWardVoters, wards } from "@data/wards";
import { projects } from "@data/projects";
import { numberLocale, pick } from "@/lib/i18n-helpers";
import { Container } from "@/components/shared/Container";
import { PhotoPlaceholder } from "@/components/shared/PhotoPlaceholder";
import { ToConfirm } from "@/components/shared/ToConfirm";

export async function WardDetail({ ward, locale }: { ward: Ward; locale: string }) {
  const t = await getTranslations("wards");
  const fmt = new Intl.NumberFormat(numberLocale(locale));
  const pct = new Intl.NumberFormat(numberLocale(locale), { style: "percent", maximumFractionDigits: 1 });
  const rank = [...wards].sort((a, b) => b.voters2022 - a.voters2022).findIndex((w) => w.slug === ward.slug) + 1;
  const local = projects.filter((p) => p.ward === ward.slug || p.ward === "all");

  return (
    <Container className="flex flex-col gap-10 py-10 md:py-16">
      <Link href="/wards" className="font-mono text-sm underline underline-offset-4">← {t("detail.back")}</Link>
      <div className="grid gap-8 md:grid-cols-2">
        <div className="flex flex-col gap-4">
          <p className="eyebrow text-laterite">{t("detail.rank", { rank })}</p>
          <h1 className="font-display text-[clamp(2.5rem,6vw,4.5rem)] leading-none text-tea dark:text-mist">{ward.name}</h1>
          <p className="flex flex-col border-t border-rule pt-4">
            <span className="font-display text-5xl">{fmt.format(ward.voters2022)}<ToConfirm label={t("toConfirm")} /></span>
            <span className="text-muted-foreground">{t("voters")} · {pct.format(ward.voters2022 / totalWardVoters)} {t("share")}</span>
          </p>
        </div>
        <PhotoPlaceholder ratio="3/2" dark label="Photo · 3:2" note={t("detail.photo", { ward: ward.name })} />
      </div>
      <section className="flex flex-col gap-3">
        <h2 className="font-display text-3xl">{t("detail.priorities")}</h2>
        <p className="bg-paper-2 px-4 py-3 font-mono text-xs">{t("detail.prioritiesPending")}</p>
      </section>
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
