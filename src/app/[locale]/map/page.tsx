import { getTranslations } from "next-intl/server";
import { locale as rootLocale } from "next/root-params";
import { PageHeader } from "@/components/shared/PageHeader";
import { Container } from "@/components/shared/Container";
import { WardMap } from "@/components/map/WardMap";
import { WardTable } from "@/components/map/WardTable";
import { ToConfirm } from "@/components/shared/ToConfirm";
import { numberLocale } from "@/lib/i18n-helpers";
import { tabMetadata } from "@/lib/seo";
import { totalWardVoters, wards } from "@data/wards";
import { projects } from "@data/projects";

export const generateMetadata = () => tabMetadata("map");

export default async function MapPage() {
  const t = await getTranslations("map");
  const locale = await rootLocale();
  const pct = new Intl.NumberFormat(numberLocale(locale), { style: "percent", maximumFractionDigits: 0 });
  const topTwo = wards[0].voters2022 + wards[1].voters2022;

  return (
    <>
      <PageHeader eyebrow={t("eyebrow")} title={t("title")} intro={t("intro")} />
      <Container className="flex flex-col gap-10 py-10 pb-16">
        <WardMap wards={wards} total={totalWardVoters} projectCount={projects.length} />
        <p className="font-display text-xl md:text-2xl">{t("summary", { share: pct.format(topTwo / totalWardVoters) })}<ToConfirm label={t("toConfirm")} /></p>
        <WardTable wards={wards} total={totalWardVoters} locale={locale} />
        <p className="font-mono text-[11px] text-muted-foreground">{t("source")}</p>
      </Container>
    </>
  );
}
