import { getTranslations } from "next-intl/server";
import { Container } from "@/components/shared/Container";
import { FootnoteMark } from "@/components/shared/FootnoteMark";
import { ToConfirm } from "@/components/shared/ToConfirm";
import { stats } from "@data/stats";
import { sources } from "@data/sources";
import { CountUp } from "./CountUp";
import { WhatsAppShare } from "./WhatsAppShare";

export async function StatsBand({ locale }: { locale: string }) {
  const t = await getTranslations("home.stats");
  const order = [...new Set(stats.map((s) => s.sourceId))];

  return (
    <section aria-labelledby="stats-title" className="bg-tea text-mist">
      <Container className="flex flex-col gap-8 py-14 md:py-20">
        <h2 id="stats-title" className="eyebrow text-uda">{t("eyebrow")}</h2>
        <dl className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.key} className="flex flex-col-reverse gap-1 border-t border-mist/25 pt-4">
              <dt className="text-sm text-[#d8d4ca]">
                {t(s.key)}
                {!s.verified && <ToConfirm label={t("toConfirm")} />}
              </dt>
              <dd className="font-display text-5xl md:text-6xl">
                <CountUp value={s.value} locale={locale} prefix={s.format === "percent" ? "+" : ""} suffix={s.format === "percent" ? "%" : ""} />
                <span className="text-uda"><FootnoteMark n={order.indexOf(s.sourceId) + 1} sourceId={s.sourceId} label={t("source")} /></span>
              </dd>
            </div>
          ))}
        </dl>
        <ol className="flex flex-col gap-1 font-mono text-[11px] text-[#d8d4ca]">
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
