import { getTranslations } from "next-intl/server";
import { Container } from "@/components/shared/Container";
import { DaysLeft } from "./DaysLeft";

export async function CountdownBand() {
  const t = await getTranslations("home.countdown");
  return (
    <section aria-labelledby="countdown-title" className="border-b border-rule bg-paper-2">
      <Container className="flex flex-col gap-6 py-10 md:flex-row md:items-end md:justify-between">
        <div className="flex flex-col gap-2">
          <p className="eyebrow text-laterite">{t("eyebrow")}</p>
          <h2 id="countdown-title" className="font-display text-3xl text-tea md:text-4xl dark:text-mist">{t("title")}</h2>
          <p className="max-w-md text-muted-foreground">{t("body")}</p>
          <p className="font-mono text-[11px] text-muted-foreground">{t("source")}</p>
        </div>
        <div className="flex items-end gap-6">
          <p className="flex flex-col">
            <DaysLeft className="font-display text-7xl leading-none text-tea md:text-8xl dark:text-mist" />
            <span className="text-sm text-muted-foreground">{t("days")}</span>
          </p>
          <a href="/election-2027.ics" download className="inline-flex min-h-12 items-center bg-uda px-5 font-semibold text-ink hover:bg-uda/85">
            {t("calendar")}
          </a>
        </div>
      </Container>
    </section>
  );
}
