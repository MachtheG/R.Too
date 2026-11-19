import { getTranslations } from "next-intl/server";
import { PageHeader } from "@/components/shared/PageHeader";
import { Container } from "@/components/shared/Container";
import { tabMetadata } from "@/lib/i18n-helpers";

export const generateMetadata = () => tabMetadata("contact");

export default async function ContactPage() {
  const t = await getTranslations("contact");
  const rows = ["email", "phone", "office"] as const;
  return (
    <>
      <PageHeader eyebrow={t("eyebrow")} title={t("title")} />
      <Container className="flex flex-col gap-8 py-12">
        <dl className="grid gap-px border border-rule bg-rule sm:grid-cols-3">
          {rows.map((r) => (
            <div key={r} className="flex flex-col gap-1 bg-background p-4">
              <dt className="eyebrow text-muted-foreground">{t(r)}</dt>
              <dd className="font-mono text-sm">{t("pending")}</dd>
            </div>
          ))}
        </dl>
        <p className="max-w-xl bg-paper-2 px-4 py-3 font-mono text-xs">{t("formsSoon")}</p>
      </Container>
    </>
  );
}
