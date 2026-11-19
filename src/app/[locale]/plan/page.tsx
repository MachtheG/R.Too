import { getTranslations } from "next-intl/server";
import { PageHeader } from "@/components/shared/PageHeader";
import { Container } from "@/components/shared/Container";
import { PledgeArticle } from "@/components/plan/PledgeArticle";
import { Link } from "@/i18n/navigation";
import { tabMetadata } from "@/lib/seo";
import { pledges } from "@data/plan";

export const generateMetadata = () => tabMetadata("plan");

export default async function PlanPage() {
  const t = await getTranslations("plan");
  return (
    <>
      <PageHeader eyebrow={t("eyebrow")} title={t("title")} intro={t("draftNote")} />
      <Container className="flex flex-col gap-12 py-12">
        {pledges.map((p, i) => <PledgeArticle key={p.key} pledge={p} n={i + 1} />)}
      </Container>
      <section className="bg-tea text-mist">
        <Container className="flex flex-col gap-4 py-10 md:flex-row md:items-center md:justify-between">
          <p className="font-display text-3xl">{t("askTitle")}</p>
          <Link href="/contact" className="inline-flex min-h-12 items-center self-start bg-uda px-6 font-semibold text-ink">{t("ask")}</Link>
        </Container>
      </section>
    </>
  );
}
