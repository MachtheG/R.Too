import { getTranslations } from "next-intl/server";

// Phase 5 replaces this with the approved Hero A home page.
export default async function HomePage() {
  const t = await getTranslations("home");
  return (
    <section className="mx-auto flex max-w-screen-xl flex-col gap-4 px-4 py-16 md:px-8">
      <p className="eyebrow text-laterite">{t("eyebrow")}</p>
      <h1 className="font-display text-5xl leading-none text-tea md:text-8xl dark:text-mist">{t("headline")}</h1>
      <p className="font-display text-xl text-leaf italic">{t("subline")}</p>
      <p className="text-muted-foreground">{t("comingSoon")}</p>
    </section>
  );
}
