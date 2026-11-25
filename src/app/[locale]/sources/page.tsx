import { getTranslations } from "next-intl/server";
import { PageHeader } from "@/components/shared/PageHeader";
import { Container } from "@/components/shared/Container";
import { tabMetadata } from "@/lib/seo";
import { sources } from "@data/sources";

export const generateMetadata = () => tabMetadata("sources");

export default async function SourcesPage() {
  const t = await getTranslations("sources");
  return (
    <>
      <PageHeader eyebrow={t("eyebrow")} title={t("title")} intro={t("intro")} />
      <Container className="py-12">
        <ol className="flex flex-col">
          {sources.map((s, i) => (
            <li key={s.id} id={s.id} className="grid scroll-mt-24 gap-2 border-b border-rule py-5 target:bg-accent/20 md:grid-cols-[3rem_1fr_auto] md:gap-6">
              <span className="tabular-nums text-sm text-primary">{i + 1}</span>
              <div className="flex flex-col gap-1">
                <p className="font-semibold">{s.title}</p>
                <p className="text-sm text-muted-foreground">{s.publisher} · {s.date}</p>
                <p className="flex gap-2 tabular-nums text-[11px] uppercase">
                  <span className="border border-current px-1.5">{s.primary ? t("primary") : t("secondary")}</span>
                  <span className="border border-current px-1.5">{s.verified ? t("verified") : t("unverified")}</span>
                </p>
              </div>
              <a href={s.url} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center self-start text-sm underline underline-offset-4">{t("open")} ↗</a>
            </li>
          ))}
        </ol>
      </Container>
    </>
  );
}
