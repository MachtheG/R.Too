import Image from "next/image";
import { useTranslations } from "next-intl";
import { photoById, photoSrc, type Photo } from "@data/photos";
import { pick } from "@/lib/i18n-helpers";
import { cn } from "@/lib/utils";
import { PhotoPlaceholder } from "./PhotoPlaceholder";

/** Credit line: "Author / Source · Licence", each part linked when we have the URL. */
export function PhotoCredit({ photo, className }: { photo: Photo; className?: string }) {
  if (!photo.credit) return null;
  const link = "underline underline-offset-2 hover:text-pine";
  return (
    <span className={className ?? "block font-mono text-[11px] text-muted-foreground"}>
      {photo.sourceUrl ? <a href={photo.sourceUrl} target="_blank" rel="noopener noreferrer" className={link}>{photo.credit}</a> : photo.credit}
      {photo.licence && (
        <>
          {" · "}
          {photo.licenceUrl ? <a href={photo.licenceUrl} target="_blank" rel="noopener noreferrer license" className={link}>{photo.licence}</a> : photo.licence}
        </>
      )}
    </span>
  );
}

const ratioCls = { "4/5": "aspect-[4/5]", "3/2": "aspect-[3/2]", "16/9": "aspect-video", "1/1": "aspect-square" } as const;

type Props = {
  id?: string;
  photo?: Photo;
  locale: string;
  ratio?: Photo["ratio"];
  /** Classes for the image box (e.g. responsive aspect overrides). */
  boxClassName?: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  caption?: boolean;
  dark?: boolean;
};

/** "Sample image" chip shown on every stand-in photo, so nobody mistakes it for the candidate. */
export function SampleChip({ className }: { className?: string }) {
  const t = useTranslations("common.photo");
  return (
    <span className={cn("pointer-events-none absolute top-3 left-3 bg-uda px-2 py-1 font-mono text-[10px] font-semibold tracking-wider text-ink uppercase", className)}>
      {t("sample")}
    </span>
  );
}

/** A photo slot: the photo (with "Sample image" chip, caption and credit) or a labelled placeholder. */
export function CampaignPhoto({ id, photo: given, locale, ratio, boxClassName, className, sizes = "(min-width: 1024px) 50vw, 100vw", priority, caption = true, dark }: Props) {
  const photo = given ?? (id ? photoById(id) : undefined);
  const src = photo && photoSrc(photo);
  const r = ratio ?? photo?.ratio ?? "3/2";
  if (!photo || !src) {
    return <PhotoPlaceholder ratio={r} dark={dark} label={photo ? pick(photo.caption, locale) : ""} note={photo?.brief ? pick(photo.brief, locale) : undefined} className={cn(boxClassName, className)} />;
  }
  return (
    <figure className={cn("flex flex-col gap-2", className)}>
      <div className={cn("relative overflow-hidden bg-paper-2", ratioCls[r], boxClassName)}>
        <Image src={src} alt={pick(photo.alt, locale)} fill sizes={sizes} className="object-cover" priority={priority} />
        {photo.sample && <SampleChip />}
      </div>
      {caption && (
        <figcaption className="text-sm">
          {pick(photo.caption, locale)}
          <PhotoCredit photo={photo} />
        </figcaption>
      )}
    </figure>
  );
}
