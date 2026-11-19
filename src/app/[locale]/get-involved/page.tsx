import { getTranslations } from "next-intl/server";
import { PageHeader } from "@/components/shared/PageHeader";
import { Container } from "@/components/shared/Container";
import { tabMetadata } from "@/lib/i18n-helpers";

export const generateMetadata = () => tabMetadata("involved");

export default async function GetInvolvedPage() {
  const t = await getTranslations("involved");
  return (
    <>
      <PageHeader eyebrow={t("eyebrow")} title={t("title")} intro={t("intro")} />
      <Container className="grid gap-8 py-12 md:grid-cols-3">
        <section id="whatsapp" className="flex flex-col gap-3 border-t-2 border-tea pt-4 dark:border-mist">
          <h2 className="font-display text-2xl">{t("whatsapp.title")}</h2>
          <p>{t("whatsapp.body")}</p>
          <p className="font-mono text-xs">{t("whatsapp.pending")}</p>
        </section>
        <section id="volunteer" className="flex flex-col gap-3 border-t-2 border-tea pt-4 dark:border-mist">
          <h2 className="font-display text-2xl">{t("volunteer.title")}</h2>
          <p>{t("volunteer.body")}</p>
          <p className="bg-paper-2 px-3 py-2 font-mono text-xs">{t("formsSoon")}</p>
        </section>
        <section id="pledge" className="flex flex-col gap-3 border-t-2 border-tea pt-4 dark:border-mist">
          <h2 className="font-display text-2xl">{t("pledge.title")}</h2>
          <p>{t("pledge.body")}</p>
          <p className="bg-paper-2 px-3 py-2 font-mono text-xs">{t("formsSoon")}</p>
        </section>
      </Container>
    </>
  );
}
