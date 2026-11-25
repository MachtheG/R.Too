import { getTranslations } from "next-intl/server";
import { Container } from "@/components/shared/Container";
import { DaysLeft } from "./DaysLeft";

export async function CountdownBand() {
  const t = await getTranslations("home.countdown");
  return (
    <section aria-labelledby="countdown-title" className="border-b border-rule bg-paper">
      <Container className="flex flex-col gap-6 py-10 md:flex-row md:items-end md:justify-between">
        <div className="flex flex-col gap-2">
          <p className="kicker">{t("eyebrow")}</p>
          <h2 id="countdown-title" className="font-display text-3xl text-ink md:text-4xl dark:text-paper">{t("title")}</h2>
          <p className="max-w-md text-muted-foreground">{t("body")}</p>
          <p className="tabular-nums text-[11px] text-muted-foreground">{t("source")}</p>
        </div>
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:gap-6">
          <p className="flex flex-col" aria-live="polite">
            <DaysLeft
              numberClass="font-display text-7xl leading-none text-ink md:text-8xl dark:text-paper"
              labelClass="text-sm text-muted-foreground"
              daysLabel={t("days")}
              dayLabel={t("day")}
              electionDay={t("today")}
              fallback={t("dateShort")}
            />
          </p>
          <a href="/election-2027.ics" download className="btn btn-secondary">
            {t("calendar")}
          </a>
        </div>
      </Container>
    </section>
  );
}
