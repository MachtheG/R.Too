import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/shared/Container";
import { pledges } from "@data/plan";
import { DraftBadge } from "@/components/shared/DraftBadge";

export async function PlanTeaser() {
  const t = await getTranslations("home.plan");
  return (
    <section aria-labelledby="plan-title" className="bg-paper-2">
      <Container className="flex flex-col gap-10 py-14 md:py-20">
        <div className="flex flex-col gap-3">
          <p className="eyebrow text-laterite">{t("eyebrow")}</p>
          <h2 id="plan-title" className="max-w-3xl font-display text-4xl text-tea md:text-5xl dark:text-mist">{t("title")}</h2>
        </div>
        <ol className="grid gap-8 md:grid-cols-3">
          {pledges.map((p, i) => (
            <li key={p.key} className="flex flex-col gap-2 border-t-2 border-tea pt-4 dark:border-mist">
              <span className="flex items-center gap-2 font-mono text-[11px] tracking-wider text-laterite uppercase">
                <span>{String(i + 1).padStart(2, "0")}</span>
                {p.draft && <DraftBadge label={t("draft")} />}
              </span>
              <h3 className="font-display text-2xl text-tea md:text-3xl dark:text-mist">{t(`${p.key}.title`)}</h3>
              <p className="text-ink-soft dark:text-mist/85">{t(`${p.key}.body`)}</p>
            </li>
          ))}
        </ol>
        <Link href="/plan" className="inline-flex min-h-11 items-center self-start font-semibold underline underline-offset-4 hover:text-laterite">{t("cta")} →</Link>
      </Container>
    </section>
  );
}
