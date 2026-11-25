import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { Project } from "@data/projects";
import { wards } from "@data/wards";
import { sources } from "@data/sources";
import { photos } from "@data/photos";
import { numberLocale, pick } from "@/lib/i18n-helpers";
import { Container } from "@/components/shared/Container";
import { PhotoPlaceholder } from "@/components/shared/PhotoPlaceholder";
import { PhotoFigure } from "@/components/shared/PhotoFigure";

export async function ProjectDetail({ project: p, locale }: { project: Project; locale: string }) {
  const t = await getTranslations("projects");
  const fmt = new Intl.NumberFormat(numberLocale(locale));
  const ward = p.ward === "all" ? t("detail.allWards") : (wards.find((w) => w.slug === p.ward)?.name ?? p.ward);
  const gallery = photos.filter((ph) => ph.projectSlug === p.slug);
  const facts: [string, string][] = [
    [t("detail.role"), t(`role.${p.role}`)],
    [t("col.sector"), t(`sector.${p.sector}`)],
    [t("col.ward"), ward],
    [t("col.year"), String(p.year)],
    [t("detail.status"), t(`status.${p.status}`)],
    ...(p.amount ? [[t("detail.amount"), `KSh ${fmt.format(p.amount.kes)} (${t(`amountKind.${p.amount.kind}`)})`] as [string, string]] : []),
    ...(p.fundingSource ? [[t("detail.funding"), p.fundingSource] as [string, string]] : []),
  ];

  return (
    <Container className="flex flex-col gap-10 py-10 md:py-16">
      <Link href="/projects" className="inline-flex min-h-11 items-center self-start tabular-nums text-sm underline underline-offset-4">← {t("detail.back")}</Link>
      <header className="flex flex-col gap-4">
        <p className="kicker">{t(`sector.${p.sector}`)} · {p.year}</p>
        <h1 className="font-display text-[clamp(2.25rem,5vw,4rem)] leading-tight text-ink dark:text-paper">{pick(p.name, locale)}</h1>
        <p className="max-w-2xl text-lg">{pick(p.summary, locale)}</p>
      </header>
      <dl className="grid gap-px border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-4">
        {facts.map(([k, v]) => (
          <div key={k} className="flex flex-col gap-1 bg-background p-4">
            <dt className="eyebrow text-muted-foreground">{k}</dt>
            <dd className="font-semibold">{v}</dd>
          </div>
        ))}
      </dl>
      <section className="flex flex-col gap-4">
        <h2 className="font-display text-2xl">{t("detail.gallery")}</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {(gallery.length ? gallery : [null]).map((ph, i) => (
            ph ? (
              <PhotoFigure key={ph.id} photo={ph} locale={locale} />
            ) : (
              <PhotoPlaceholder key={i} ratio="3/2" label={t("detail.gallery")} />
            )
          ))}
        </div>
      </section>
      <section className="flex flex-col gap-2">
        <h2 className="font-display text-2xl">{t("detail.sources")}</h2>
        <ol className="list-decimal pl-5 text-sm">
          {p.sourceIds.map((id) => {
            const s = sources.find((x) => x.id === id);
            return <li key={id}><a href={s?.url} className="underline underline-offset-4" rel="noopener noreferrer" target="_blank">{s?.publisher}: {s?.title}</a></li>;
          })}
        </ol>
      </section>
    </Container>
  );
}
