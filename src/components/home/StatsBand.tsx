import { getTranslations } from "next-intl/server";
import { Container } from "@/components/shared/Container";
import { FootnoteMark } from "@/components/shared/FootnoteMark";
import { ToConfirm } from "@/components/shared/ToConfirm";
import { stats, HOME_FOOTNOTES, homeFootnote } from "@data/stats";
import { sources } from "@data/sources";
import { CountUp } from "./CountUp";
import { WhatsAppShare } from "./WhatsAppShare";

export async function StatsBand({ locale }: { locale: string }) {
  const t = await getTranslations("home.stats");
  const order = [...HOME_FOOTNOTES];

  return (
    <section aria-labelledby="stats-title" className="bg-mist text-ink">
      <Container className="flex flex-col gap-8 py-14 md:py-20">
        <h2 id="stats-title" className="kicker">{t("eyebrow")}</h2>
        <dl className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.key} className="card flex flex-col-reverse gap-1 p-5">
              <dt className="flex flex-col items-start gap-2 text-sm text-muted-foreground">
                <span>{t(s.key)}</span>
                {!s.verified && <ToConfirm label={t("toConfirm")} className="ml-0" />}
              </dt>
              <dd className="font-display text-5xl text-primary tabular-nums md:text-6xl">
                <CountUp value={s.value} locale={locale} prefix={s.format === "percent" ? "+" : ""} suffix={s.format === "percent" ? "%" : ""} />
                <span className="text-muted-foreground"><FootnoteMark n={homeFootnote(s.sourceId)} sourceId={s.sourceId} label={t("source")} /></span>
              </dd>
            </div>
          ))}
        </dl>
        <ol className="flex flex-col gap-1 text-xs text-muted-foreground">
          {order.map((id, i) => {
            const src = sources.find((x) => x.id === id);
            return <li key={id}>{i + 1}. {src?.publisher}, {src?.title}</li>;
          })}
        </ol>
        <WhatsAppShare text={t("shareText")} label={t("share")} />
      </Container>
    </section>
  );
}
