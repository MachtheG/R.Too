import { getTranslations } from "next-intl/server";
import { PageHeader } from "@/components/shared/PageHeader";
import { Container } from "@/components/shared/Container";
import { tabMetadata } from "@/lib/seo";

export const generateMetadata = () => tabMetadata("privacy");

const sections = ["who", "what", "why", "basis", "keep", "share", "rights", "cookies"] as const;

export default async function PrivacyPage() {
  const t = await getTranslations("privacy");
  return (
    <>
      <PageHeader eyebrow={t("eyebrow")} title={t("title")} intro={t("updated")} />
      <Container className="flex max-w-3xl flex-col gap-8 py-12 md:mx-0">
        {sections.map((s) => (
          <section key={s} id={s} className="flex flex-col gap-2">
            <h2 className="font-display text-2xl">{t(`sections.${s}.h`)}</h2>
            <p className="text-lg leading-relaxed">{t(`sections.${s}.p`)}</p>
          </section>
        ))}
      </Container>
    </>
  );
}
