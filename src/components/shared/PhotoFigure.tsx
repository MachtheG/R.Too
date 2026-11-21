import Image from "next/image";
import type { Photo } from "@data/photos";
import { pick } from "@/lib/i18n-helpers";
import { photoSrc } from "@data/photos";

const ratioCls = { "4/5": "aspect-[4/5]", "3/2": "aspect-[3/2]", "16/9": "aspect-video", "1/1": "aspect-square" } as const;

/** Credit line: "Photo: Author / Source · Licence", each part linked when we have the URL. */
export function PhotoCredit({ photo, className }: { photo: Photo; className?: string }) {
  if (!photo.credit) return null;
  const link = "underline underline-offset-2 hover:text-laterite";
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

/** A real photo with caption and credit. Uses the derived sizes from `npm run images`. */
export function PhotoFigure({ photo, locale, priority = false }: { photo: Photo; locale: string; priority?: boolean }) {
  const src = photoSrc(photo);
  if (!src) return null;
  return (
    <figure className="flex flex-col gap-2">
      <div className={`relative overflow-hidden bg-paper-2 ${ratioCls[photo.ratio]}`}>
        <Image src={src} alt={pick(photo.alt, locale)} fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover" priority={priority} />
      </div>
      <figcaption className="text-sm">
        {pick(photo.caption, locale)}
        <PhotoCredit photo={photo} />
      </figcaption>
    </figure>
  );
}
