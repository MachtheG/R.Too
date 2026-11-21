import { getTranslations } from "next-intl/server";
import { PageHeader } from "@/components/shared/PageHeader";
import { Container } from "@/components/shared/Container";
import { tabMetadata } from "@/lib/seo";
import { brandCredits, dataCredits, fontCredits, mapCredits } from "@data/credits";
import { photos } from "@data/photos";

export const generateMetadata = () => tabMetadata("credits");

function List({ items, licence }: { items: { name: string; by: string; licence: string; url: string }[]; licence: string }) {
  return (
    <ul className="flex flex-col">
      {items.map((c) => (
        <li key={c.name} className="border-b border-rule py-3">
          <a href={c.url} target="_blank" rel="noopener noreferrer" className="font-semibold underline-offset-4 hover:underline">{c.name}</a>
          <span className="text-sm text-muted-foreground"> · {c.by} · {licence}: {c.licence}</span>
        </li>
      ))}
    </ul>
  );
}

export default async function CreditsPage() {
  const t = await getTranslations("credits");
  const credited = photos.filter((p) => p.file && p.credit);
  return (
    <>
      <PageHeader eyebrow={t("eyebrow")} title={t("title")} />
      <Container className="flex flex-col gap-10 py-12">
        <section className="flex flex-col gap-3">
          <h2 className="font-display text-2xl">{t("photos")}</h2>
          {credited.length ? (
            <List items={credited.map((p) => ({ name: p.caption.en, by: p.credit!, licence: p.licence ?? "", url: p.sourceUrl ?? "#" }))} licence={t("licence")} />
          ) : (
            <p className="text-muted-foreground">{t("photosEmpty")}</p>
          )}
        </section>
        <section className="flex flex-col gap-3"><h2 className="font-display text-2xl">{t("brand")}</h2><List items={brandCredits} licence={t("licence")} /></section>
        <section className="flex flex-col gap-3"><h2 className="font-display text-2xl">{t("map")}</h2><List items={mapCredits} licence={t("licence")} /></section>
        <section className="flex flex-col gap-3"><h2 className="font-display text-2xl">{t("data")}</h2><List items={dataCredits} licence={t("licence")} /></section>
        <section className="flex flex-col gap-3"><h2 className="font-display text-2xl">{t("fonts")}</h2><List items={fontCredits} licence={t("licence")} /></section>
      </Container>
    </>
  );
}
