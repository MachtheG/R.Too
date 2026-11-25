import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/shared/Container";
import { pledges } from "@data/plan";
import { DraftBadge } from "@/components/shared/DraftBadge";

export async function PlanTeaser() {
  const t = await getTranslations("home.plan");
  return (
    <section aria-labelledby="plan-title" className="bg-mist">
      <Container className="flex flex-col gap-10 py-14 md:py-20">
        <div className="flex flex-col gap-3">
          <p className="kicker">{t("eyebrow")}</p>
          <h2 id="plan-title" className="max-w-3xl font-display text-4xl text-ink md:text-5xl dark:text-paper">{t("title")}</h2>
        </div>
        <ol className="grid gap-8 md:grid-cols-3">
          {pledges.map((p, i) => (
            <li key={p.key} className="card flex flex-col gap-2 p-6">
              <span className="flex items-center gap-2 tabular-nums text-[11px] tracking-wider text-primary uppercase">
                <span>{String(i + 1).padStart(2, "0")}</span>
                {p.draft && <DraftBadge label={t("draft")} />}
              </span>
              <h3 className="font-display text-2xl text-ink md:text-3xl dark:text-paper">{t(`${p.key}.title`)}</h3>
              <p className="text-muted-foreground dark:text-paper/85">{t(`${p.key}.body`)}</p>
            </li>
          ))}
        </ol>
        <Link href="/plan" className="inline-flex min-h-11 items-center self-start font-semibold underline underline-offset-4 hover:text-primary">{t("cta")} →</Link>
      </Container>
    </section>
  );
}
