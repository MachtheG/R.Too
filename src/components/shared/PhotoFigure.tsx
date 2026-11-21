import type { Photo } from "@data/photos";
import { CampaignPhoto } from "./CampaignPhoto";

export { PhotoCredit } from "./CampaignPhoto";

/** A real photo with caption and credit (gallery, projects). */
export function PhotoFigure({ photo, locale, priority = false }: { photo: Photo; locale: string; priority?: boolean }) {
  return <CampaignPhoto photo={photo} locale={locale} priority={priority} sizes="(min-width: 1024px) 33vw, 100vw" />;
}
