import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/shared/Container";
import { FootnoteMark } from "@/components/shared/FootnoteMark";
import { SotikMap } from "@/components/map/SotikMap";
import { wards, totalWardVoters, WARDS_VERIFIED } from "@data/wards";
import { homeFootnote } from "@data/stats";
import { sources } from "@data/sources";

/** "Our wards": Sotik drawn from IEBC ward boundaries, with each ward's numbers and DRAFT plan. */
export async function MapPreview({ locale }: { locale: string }) {
  const t = await getTranslations("home.map");
  const fmt = new Intl.NumberFormat(locale === "sw" ? "sw-KE" : "en-KE");
  const pct = new Intl.NumberFormat(locale === "sw" ? "sw-KE" : "en-KE", { style: "percent", maximumFractionDigits: 0 });
  const top = [...wards].sort((a, b) => b.voters2022 - a.voters2022)[0];
  const wardN = homeFootnote("mzalendo-sotik");
  const totalN = homeFootnote("iebc-rov-2022");
  const mapN = homeFootnote("iebc-ward-boundaries");
  const src = (id: string) => sources.find((s) => s.id === id);

  return (
    <section aria-labelledby="map-title" className="border-b border-rule">
      <Container className="flex flex-col gap-8 py-14 md:py-20">
        <div className="grid gap-4 lg:grid-cols-12 lg:items-end">
          <div className="flex flex-col gap-3 lg:col-span-7">
            <p className="kicker">{t("eyebrow")}</p>
            <h2 id="map-title" className="font-display text-4xl text-balance text-ink md:text-5xl dark:text-paper">{t("title")}</h2>
          </div>
          <p className="max-w-md text-lg leading-relaxed lg:col-span-5">
            {t("summary", { ward: top.name, voters: fmt.format(top.voters2022), share: pct.format(top.voters2022 / totalWardVoters) })}
          </p>
        </div>

        <SotikMap wards={wards} total={totalWardVoters} />

        <div className="flex flex-col gap-4 border-t border-rule pt-5">
          <p className="flex items-baseline justify-between gap-4">
            <span className="eyebrow">{t("total")}</span>
            <span className="tabular-nums text-lg font-semibold tabular-nums">
              {fmt.format(totalWardVoters)}
              <FootnoteMark n={totalN} sourceId="iebc-rov-2022" label={t("sourceLabel")} />
            </span>
          </p>
          <ol className="flex flex-col gap-1 tabular-nums text-[11px] leading-relaxed text-muted-foreground">
            <li>
              {wardN}.{" "}
              <a href={src("mzalendo-sotik")?.url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-primary">{t("source")}</a>
              {!WARDS_VERIFIED && <> {t("toConfirm")}</>}
            </li>
            <li>
              {mapN}.{" "}
              <a href={src("iebc-ward-boundaries")?.url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-primary">{t("mapSource")}</a>
            </li>
          </ol>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link href="/wards" className="btn btn-primary">
              {t("cta")}
            </Link>
            <Link href="/map" className="inline-flex min-h-12 items-center justify-center font-semibold underline underline-offset-4 hover:text-primary sm:px-4">
              {t("mapCta")} →
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
