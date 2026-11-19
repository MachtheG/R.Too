import { getTranslations } from "next-intl/server";
import { locale as rootLocale } from "next/root-params";
import { pick } from "@/lib/i18n-helpers";
import type { Pledge } from "@data/plan";
import { photos } from "@data/photos";
import { FootnoteMark } from "@/components/shared/FootnoteMark";
import { PhotoPlaceholder } from "@/components/shared/PhotoPlaceholder";

const photoFor = { tea: "tea-buying-centre", dairy: "dairy-farmers", women: "women-group" } as const;

export async function PledgeArticle({ pledge, n }: { pledge: Pledge; n: number }) {
  const t = await getTranslations("plan");
  const locale = await rootLocale();
  const photo = photos.find((p) => p.id === photoFor[pledge.key]);
  return (
    <article aria-labelledby={`pledge-${pledge.key}`} className="grid gap-6 border-b border-rule pb-12 md:grid-cols-12">
      <span aria-hidden className="font-display text-8xl leading-none font-light text-tea md:col-span-2 md:text-9xl dark:text-mist">{n}</span>
      <div className="flex flex-col gap-4 md:col-span-6">
        <p className="eyebrow text-laterite">{t(`for.${pledge.key}`)}</p>
        <h2 id={`pledge-${pledge.key}`} className="font-display text-3xl md:text-4xl">{t(`${pledge.key}.title`)}</h2>
        <p className="text-lg leading-relaxed">{t(`${pledge.key}.body`)}</p>
        <div className="flex flex-col gap-1 bg-paper-2 px-4 py-3 text-sm">
          <strong className="font-mono text-xs uppercase">{t("why")}</strong>
          <span>
            {t(`${pledge.key}.why`)}
            {pledge.evidenceSourceIds.map((id, i) => <FootnoteMark key={id} n={i + 1} sourceId={id} label="Source" />)}
          </span>
        </div>
      </div>
      <div className="md:col-span-4">
        <PhotoPlaceholder ratio="3/2" label={t("photo")} note={photo ? pick(photo.caption, locale) : undefined} />
      </div>
    </article>
  );
}
