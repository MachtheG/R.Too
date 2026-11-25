import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/shared/Container";
import { PhotoPlaceholder } from "@/components/shared/PhotoPlaceholder";
import { FootnoteMark } from "@/components/shared/FootnoteMark";
import { PhotoCredit, SampleChip } from "@/components/shared/CampaignPhoto";
import { VOTERS_2022, homeFootnote } from "@data/stats";
import { photoById, photoSrc } from "@data/photos";
import { pick } from "@/lib/i18n-helpers";

/** Preset A hero: mist background, kicker + gold rule + H1 on the left, rounded portrait with soft shadow on the right. */
export async function HomeHero({ locale }: { locale: string }) {
  const t = await getTranslations("home.hero");
  const portrait = photoById("hero-portrait");
  const portraitSrc = portrait && photoSrc(portrait);
  const fmt = new Intl.NumberFormat(locale === "sw" ? "sw-KE" : "en-KE");

  return (
    <section className="bg-mist">
      <Container className="grid items-center gap-10 py-10 md:py-16 lg:grid-cols-12 lg:gap-14 lg:py-20">
        <div className="order-2 flex flex-col gap-5 lg:order-1 lg:col-span-7">
          <p className="kicker">{t("eyebrow")}</p>
          <h1 className="text-[clamp(2.75rem,7vw,4.5rem)] leading-[1.02] text-ink dark:text-paper">{t("headline")}</h1>
          <p lang="sw" className="text-xl text-primary italic md:text-2xl dark:text-leaf">{t("subline")}</p>
          <div className="mt-2 flex gap-12 border-t border-rule pt-5">
            <p className="flex flex-col gap-1">
              <span className="font-display text-4xl tabular-nums">
                {fmt.format(VOTERS_2022)}
                <FootnoteMark n={homeFootnote("iebc-rov-2022")} sourceId="iebc-rov-2022" label="Source" />
              </span>
              <span className="text-sm text-muted-foreground">{t("statLabel")}</span>
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link href="/get-involved" className="btn btn-primary">{t("ctaPrimary")}</Link>
            <Link href="/plan" className="btn btn-secondary">{t("ctaSecondary")}</Link>
          </div>
          <p className="text-xs text-muted-foreground">¹ {t("footnote")}</p>
        </div>

        <div className="order-1 lg:order-2 lg:col-span-5">
          {portrait && portraitSrc ? (
            <figure className="relative mx-auto max-w-md lg:max-w-none">
              <div className="photo-frame relative aspect-[4/3] bg-paper sm:aspect-[4/5]">
                <Image src={portraitSrc} alt={pick(portrait.alt, locale)} fill priority sizes="(min-width: 1024px) 40vw, (min-width: 640px) 28rem, 100vw" className="object-cover object-[50%_20%]" />
                {portrait.sample && <SampleChip />}
              </div>
              {portrait.credit && (
                <figcaption className="mt-2 text-right">
                  <PhotoCredit photo={portrait} className="text-xs text-muted-foreground" />
                </figcaption>
              )}
            </figure>
          ) : (
            <PhotoPlaceholder ratio="4/5" dark label={t("photoLabel")} note={t("photoNote")} />
          )}
        </div>
      </Container>
    </section>
  );
}
