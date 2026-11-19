import { getTranslations } from "next-intl/server";
import { PageHeader } from "@/components/shared/PageHeader";
import { Container } from "@/components/shared/Container";
import { FootnoteMark } from "@/components/shared/FootnoteMark";
import { tabMetadata } from "@/lib/seo";

export const generateMetadata = () => tabMetadata("qa");

const items = [
  { key: "when", sourceId: "iebc-election-notice-2027" },
  { key: "campaign", sourceId: null },
  { key: "voters", sourceId: "iebc-rov-2022" },
  { key: "wards", sourceId: "mzalendo-sotik" },
  { key: "register", sourceId: null },
] as const;

export default async function QaPage() {
  const t = await getTranslations("qa");
  return (
    <>
      <PageHeader eyebrow={t("eyebrow")} title={t("title")} intro={t("intro")} />
      <Container className="flex flex-col py-12">
        {items.map((i) => (
          <details key={i.key} className="group border-b border-rule py-5">
            <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 font-display text-xl md:text-2xl">
              {t(`items.${i.key}.q`)}
              <span aria-hidden className="font-mono text-laterite group-open:rotate-45 motion-safe:transition-transform">+</span>
            </summary>
            <p className="max-w-2xl pt-3 text-lg leading-relaxed">
              {t(`items.${i.key}.a`)}
              {i.sourceId && <FootnoteMark n={1} sourceId={i.sourceId} label={t("source")} />}
            </p>
          </details>
        ))}
      </Container>
    </>
  );
}
