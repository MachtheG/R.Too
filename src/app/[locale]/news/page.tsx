import { getTranslations } from "next-intl/server";
import { PageHeader } from "@/components/shared/PageHeader";
import { Container } from "@/components/shared/Container";
import { tabMetadata } from "@/lib/seo";
import { news } from "@data/news";
import { sources } from "@data/sources";

export const generateMetadata = () => tabMetadata("news");

export default async function NewsPage() {
  const t = await getTranslations("news");
  return (
    <>
      <PageHeader eyebrow={t("eyebrow")} title={t("title")} intro={t("intro")} />
      <Container className="py-12">
        <ol className="flex flex-col">
          {news.map((n) => {
            const s = sources.find((x) => x.id === n.sourceId);
            return (
              <li key={n.key} className="grid gap-2 border-b border-rule py-6 md:grid-cols-[8rem_1fr_auto] md:items-baseline md:gap-6">
                <span className="tabular-nums text-sm text-primary">{n.date}</span>
                <p className="font-display text-xl md:text-2xl">{t(`items.${n.key}`)}</p>
                {s && <a href={s.url} target="_blank" rel="noopener noreferrer" className="text-sm underline underline-offset-4">{t("read", { publisher: s.publisher })} ↗</a>}
              </li>
            );
          })}
        </ol>
      </Container>
    </>
  );
}
