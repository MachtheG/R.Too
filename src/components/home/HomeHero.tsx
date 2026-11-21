import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { PhotoPlaceholder } from "@/components/shared/PhotoPlaceholder";
import { FootnoteMark } from "@/components/shared/FootnoteMark";
import { PhotoCredit } from "@/components/shared/PhotoFigure";
import { VOTERS_2022, homeFootnote } from "@data/stats";
import { photoById, photoSrc } from "@data/photos";
import { pick } from "@/lib/i18n-helpers";

export async function HomeHero({ locale }: { locale: string }) {
  const t = await getTranslations("home.hero");
  // Once the portrait is supplied, set file/credit/licence/sourceUrl on "hero-portrait" in data/photos.ts.
  const portrait = photoById("hero-portrait");
  const portraitSrc = portrait && photoSrc(portrait);
  const fmt = new Intl.NumberFormat(locale === "sw" ? "sw-KE" : "en-KE");

  return (
    <section className="grid border-b border-rule lg:grid-cols-12">
      <div className="order-2 flex flex-col justify-center gap-5 px-4 py-10 md:px-8 lg:order-1 lg:col-span-7 lg:py-20 lg:pl-[max(2rem,calc((100vw-80rem)/2+2rem))]">
        <p className="eyebrow text-laterite">{t("eyebrow")}</p>
        <h1 className="font-display text-[clamp(2.75rem,8vw,6rem)] leading-[0.98] tracking-tight text-tea dark:text-mist">
          {t("headline")}
        </h1>
        <p lang="sw" className="font-display-italic text-xl text-leaf italic md:text-2xl dark:text-[#9cc3a6]">{t("subline")}</p>
        <div className="mt-2 flex gap-12 border-t border-rule pt-5">
          <p className="flex flex-col gap-1">
            <span className="font-display text-4xl">
              {fmt.format(VOTERS_2022)}
              <FootnoteMark n={homeFootnote("iebc-rov-2022")} sourceId="iebc-rov-2022" label="Source" />
            </span>
            <span className="text-sm text-muted-foreground">{t("statLabel")}</span>
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link href="/get-involved" className="inline-flex min-h-12 items-center justify-center bg-tea px-6 font-semibold text-mist hover:bg-leaf dark:bg-mist dark:text-night">
            {t("ctaPrimary")}
          </Link>
          <Link href="/plan" className="inline-flex min-h-12 items-center justify-center border border-tea px-6 font-semibold text-tea hover:bg-paper-2 dark:border-mist dark:text-mist">
            {t("ctaSecondary")}
          </Link>
        </div>
        <p className="font-mono text-[11px] text-muted-foreground">¹ {t("footnote")}</p>
      </div>
      <div className="order-1 lg:order-2 lg:col-span-5">
        {portrait && portraitSrc ? (
          <figure className="relative h-full w-full">
            <div className="relative aspect-[4/3] h-full w-full sm:aspect-[3/2] lg:aspect-auto">
              <Image src={portraitSrc} alt={pick(portrait.alt, locale)} fill priority sizes="(min-width: 1024px) 42vw, 100vw" className="object-cover object-[50%_25%]" />
            </div>
            {portrait.credit && (
              <figcaption className="absolute right-0 bottom-0 bg-night/75 px-2 py-1">
                <PhotoCredit photo={portrait} className="font-mono text-[10px] text-mist" />
              </figcaption>
            )}
          </figure>
        ) : (
          <PhotoPlaceholder ratio="4/5" dark label={t("photoLabel")} note={t("photoNote")} className="aspect-[4/3] h-full w-full border-0 sm:aspect-[3/2] lg:aspect-[4/5]" />
        )}
      </div>
    </section>
  );
}
