import { getTranslations } from "next-intl/server";
import { locale as rootLocale } from "next/root-params";
import { PageHeader } from "@/components/shared/PageHeader";
import { Container } from "@/components/shared/Container";
import { CampaignPhoto } from "@/components/shared/CampaignPhoto";
import { Pending } from "@/components/shared/Pending";
import { Timeline } from "@/components/record/Timeline";
import { tabMetadata } from "@/lib/seo";

export const generateMetadata = () => tabMetadata("story");

export default async function StoryPage() {
  const t = await getTranslations("story");
  const locale = await rootLocale();
  return (
    <>
      <PageHeader eyebrow={t("eyebrow")} title={t("title")} intro={t("intro")} />
      <Container className="grid gap-10 py-12 md:grid-cols-2">
        <CampaignPhoto id="story-home" locale={locale} ratio="4/5" dark />
        <div className="flex flex-col gap-10">
          <section className="flex flex-col gap-3">
            <h2 className="font-display text-3xl">{t("why")}</h2>
            <p className="text-lg leading-relaxed"><Pending text={t("whyBody")} /></p>
          </section>
          <Timeline locale={locale} />
          <CampaignPhoto id="story-family" locale={locale} ratio="3/2" />
        </div>
      </Container>
    </>
  );
}
