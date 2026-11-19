import { getTranslations } from "next-intl/server";
import { locale as rootLocale } from "next/root-params";
import { PageHeader } from "@/components/shared/PageHeader";
import { Container } from "@/components/shared/Container";
import { Timeline } from "@/components/record/Timeline";
import { SectorChart } from "@/components/record/SectorChart";
import { FundsChart } from "@/components/record/FundsChart";
import { Link } from "@/i18n/navigation";
import { tabMetadata } from "@/lib/seo";
import { projects } from "@data/projects";

export const generateMetadata = () => tabMetadata("record");

export default async function RecordPage() {
  const t = await getTranslations("record");
  const locale = await rootLocale();
  return (
    <>
      <PageHeader eyebrow={t("eyebrow")} title={t("title")} intro={t("intro")}>
        <p className="font-mono text-sm">{t("count", { count: projects.length })}</p>
      </PageHeader>
      <Container className="grid gap-12 py-12 lg:grid-cols-2">
        <Timeline locale={locale} />
        <div className="flex flex-col gap-12">
          <SectorChart locale={locale} />
          <FundsChart locale={locale} />
        </div>
      </Container>
      <Container className="pb-16">
        <Link href="/projects" className="inline-flex min-h-12 items-center bg-tea px-6 font-semibold text-mist hover:bg-leaf dark:bg-mist dark:text-night">
          {t("ledgerCta")} →
        </Link>
      </Container>
    </>
  );
}
