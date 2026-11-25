import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/shared/Container";
import { PhotoCredit } from "@/components/shared/PhotoFigure";
import { PhotoPlaceholder } from "@/components/shared/PhotoPlaceholder";
import { photoById, photoSrc } from "@data/photos";
import { pick } from "@/lib/i18n-helpers";

/** Full-bleed landscape photo mid-page: Sotik's tea country, captioned and credited. */
export async function LandscapeBand({ locale }: { locale: string }) {
  const t = await getTranslations("home.landscape");
  const photo = photoById("sotik-hills");
  const src = photo && photoSrc(photo);

  return (
    <section aria-labelledby="landscape-title" className="border-b border-rule">
      <h2 id="landscape-title" className="sr-only">{t("title")}</h2>
      <figure className="flex flex-col">
        {photo && src ? (
          <div className="relative aspect-[4/3] w-full tea-rows overflow-hidden sm:aspect-video lg:aspect-auto lg:h-[min(72vh,680px)]">
            <Image src={src} alt={pick(photo.alt, locale)} fill sizes="100vw" className="object-cover" />
          </div>
        ) : (
          <PhotoPlaceholder ratio="16/9" dark label={t("title")} note={photo ? pick(photo.caption, locale) : undefined} className="w-full border-0" />
        )}
        <Container>
          <figcaption className="flex flex-col gap-1 py-4 text-sm sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
            <span>
              <span className="eyebrow mr-2 text-primary">{t("eyebrow")}</span>
              {photo && pick(photo.caption, locale)}
            </span>
            {photo && <PhotoCredit photo={photo} className="tabular-nums text-[11px] text-muted-foreground" />}
          </figcaption>
        </Container>
      </figure>
    </section>
  );
}
