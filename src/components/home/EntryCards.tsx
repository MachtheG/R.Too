import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/shared/Container";
import { CampaignPhoto } from "@/components/shared/CampaignPhoto";

const entries = [
  { n: "01", key: "who", href: "/story", photo: "story-home" },
  { n: "02", key: "record", href: "/record", photo: "project-site" },
  { n: "03", key: "next", href: "/plan", photo: "dairy-farmers" },
] as const;

export async function EntryCards({ locale }: { locale: string }) {
  const t = await getTranslations("home.entries");
  return (
    <section aria-labelledby="entries-title">
      <Container className="py-14 md:py-20">
        <h2 id="entries-title" className="sr-only">{t("title")}</h2>
        <ol className="grid gap-10 md:grid-cols-3 md:gap-8">
          {entries.map((e) => (
            <li key={e.key}>
              <Link href={e.href} className="group flex flex-col gap-3 border-t-2 border-ink pt-4 dark:border-mist">
                <span aria-hidden className="font-display text-6xl leading-none font-light text-ink md:text-7xl dark:text-mist">{e.n}</span>
                <span className="text-xl font-semibold group-hover:text-pine">{t(`${e.key}.title`)}</span>
                <span className="text-muted-foreground">{t(`${e.key}.body`)}</span>
                <CampaignPhoto id={e.photo} locale={locale} ratio="3/2" caption={false} className="mt-2" sizes="(min-width: 768px) 33vw, 100vw" />
              </Link>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
