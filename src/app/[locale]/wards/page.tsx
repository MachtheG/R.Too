import { getTranslations } from "next-intl/server";
import { locale as rootLocale } from "next/root-params";
import { PageHeader } from "@/components/shared/PageHeader";
import { Container } from "@/components/shared/Container";
import { WardCard } from "@/components/wards/WardCard";
import { tabMetadata } from "@/lib/i18n-helpers";
import { totalWardVoters, wards } from "@data/wards";

export const generateMetadata = () => tabMetadata("wards");

export default async function WardsPage() {
  const t = await getTranslations("wards");
  const locale = await rootLocale();
  return (
    <>
      <PageHeader eyebrow={t("eyebrow")} title={t("title")} intro={t("intro")} />
      <Container className="py-12">
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {wards.map((w) => <li key={w.slug}><WardCard ward={w} total={totalWardVoters} locale={locale} /></li>)}
        </ul>
      </Container>
    </>
  );
}
