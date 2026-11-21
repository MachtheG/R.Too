import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/shared/Container";
import { FootnoteMark } from "@/components/shared/FootnoteMark";
import { wards, totalWardVoters, WARDS_VERIFIED } from "@data/wards";
import { homeFootnote } from "@data/stats";
import { sources } from "@data/sources";

/** "Our wards": one row per ward (name, 2022 voters, share bar), each linking to its ward page. */
export async function MapPreview({ locale }: { locale: string }) {
  const t = await getTranslations("home.map");
  const fmt = new Intl.NumberFormat(locale === "sw" ? "sw-KE" : "en-KE");
  const pct = new Intl.NumberFormat(locale === "sw" ? "sw-KE" : "en-KE", { style: "percent", maximumFractionDigits: 0 });
  const max = Math.max(...wards.map((w) => w.voters2022));
  const top = [...wards].sort((a, b) => b.voters2022 - a.voters2022)[0];
  const wardN = homeFootnote("mzalendo-sotik");
  const totalN = homeFootnote("iebc-rov-2022");
  const mzalendo = sources.find((s) => s.id === "mzalendo-sotik");

  return (
    <section aria-labelledby="map-title" className="border-b border-rule">
      <Container className="grid gap-10 py-14 md:py-20 lg:grid-cols-5 lg:gap-16">
        <div className="flex flex-col gap-4 lg:col-span-2">
          <p className="eyebrow text-laterite">{t("eyebrow")}</p>
          <h2 id="map-title" className="font-display text-4xl text-balance text-tea md:text-5xl dark:text-mist">{t("title")}</h2>
          <p className="max-w-md text-lg leading-relaxed">
            {t("summary", { ward: top.name, voters: fmt.format(top.voters2022), share: pct.format(top.voters2022 / totalWardVoters) })}
          </p>
        </div>

        <div className="flex flex-col gap-5 lg:col-span-3">
          <div className="flex items-baseline justify-between gap-4 border-b-2 border-ink pb-2 dark:border-mist">
            <h3 className="eyebrow min-w-0 leading-6 text-muted-foreground">
              {t("caption")}
              <FootnoteMark n={wardN} sourceId="mzalendo-sotik" label={t("sourceLabel")} />
            </h3>
            <span className="eyebrow shrink-0 leading-6 text-muted-foreground">{t("votersHead")}</span>
          </div>

          <ol className="flex flex-col">
            {wards.map((w) => (
              <li key={w.slug} className="border-b border-rule">
                <Link
                  href={`/wards/${w.slug}`}
                  aria-label={t("rowLabel", { ward: w.name, voters: fmt.format(w.voters2022) })}
                  className="group grid min-h-16 grid-cols-[1fr_auto_auto] items-center gap-x-4 gap-y-2 py-3 hover:bg-paper-2 focus-visible:bg-paper-2 sm:px-2"
                >
                  <span className="font-display text-xl leading-tight group-hover:text-laterite sm:text-2xl">{w.name}</span>
                  <span className="text-right font-mono text-base tabular-nums sm:text-lg">{fmt.format(w.voters2022)}</span>
                  <span aria-hidden className="text-lg text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-laterite">→</span>
                  <span aria-hidden className="col-span-3 h-1.5 bg-paper-2 group-hover:bg-background">
                    <span className="block h-full bg-laterite" style={{ width: `${(w.voters2022 / max) * 100}%` }} />
                  </span>
                </Link>
              </li>
            ))}
          </ol>

          <p className="flex items-baseline justify-between gap-4 sm:px-2">
            <span className="eyebrow">{t("total")}</span>
            <span className="font-mono text-lg font-semibold tabular-nums">
              {fmt.format(totalWardVoters)}
              <FootnoteMark n={totalN} sourceId="iebc-rov-2022" label={t("sourceLabel")} />
            </span>
          </p>

          <p className="font-mono text-[11px] leading-relaxed text-muted-foreground">
            {wardN}.{" "}
            <a href={mzalendo?.url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-laterite">
              {t("source")}
            </a>
            {!WARDS_VERIFIED && <> {t("toConfirm")}</>}
          </p>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link href="/wards" className="inline-flex min-h-12 items-center justify-center bg-tea px-6 font-semibold text-mist hover:bg-leaf dark:bg-mist dark:text-night">
              {t("cta")}
            </Link>
            <Link href="/map" className="inline-flex min-h-12 items-center justify-center font-semibold underline underline-offset-4 hover:text-laterite sm:px-4">
              {t("mapCta")} →
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
