import { getTranslations } from "next-intl/server";
import { PageHeader } from "@/components/shared/PageHeader";
import { Container } from "@/components/shared/Container";
import { tabMetadata } from "@/lib/seo";
import { Pending } from "@/components/shared/Pending";
import { VolunteerForm } from "@/components/forms/VolunteerForm";
import { PledgeForm } from "@/components/forms/PledgeForm";

export const generateMetadata = () => tabMetadata("involved");

export default async function GetInvolvedPage() {
  const t = await getTranslations("involved");
  return (
    <>
      <PageHeader eyebrow={t("eyebrow")} title={t("title")} intro={t("intro")} />
      <Container className="grid gap-12 py-12 lg:grid-cols-3">
        <section id="whatsapp" className="flex flex-col gap-3 border-t-2 border-tea pt-4 dark:border-mist">
          <h2 className="font-display text-2xl">{t("whatsapp.title")}</h2>
          <p>{t("whatsapp.body")}</p>
          <p className="text-sm"><Pending text={t("whatsapp.pending")} /></p>
        </section>
        <section id="volunteer" className="flex flex-col gap-3 border-t-2 border-tea pt-4 dark:border-mist">
          <h2 className="font-display text-2xl">{t("volunteer.title")}</h2>
          <p>{t("volunteer.body")}</p>
          <VolunteerForm />
        </section>
        <section id="pledge" className="flex flex-col gap-3 border-t-2 border-tea pt-4 dark:border-mist">
          <h2 className="font-display text-2xl">{t("pledge.title")}</h2>
          <p>{t("pledge.body")}</p>
          <PledgeForm />
        </section>
      </Container>
    </>
  );
}
