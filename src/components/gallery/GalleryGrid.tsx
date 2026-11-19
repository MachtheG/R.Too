"use client";
import { useSearchParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { type Photo, photoCategories } from "@data/photos";
import { pick } from "@/lib/i18n-helpers";
import { PhotoPlaceholder } from "@/components/shared/PhotoPlaceholder";
import { PhotoFigure } from "@/components/shared/PhotoFigure";

export function GalleryGrid({ photos }: { photos: Photo[] }) {
  const t = useTranslations("gallery");
  const locale = useLocale();
  const pathname = usePathname();
  const cat = useSearchParams().get("category");
  const list = photos.filter((p) => !cat || p.category === cat);
  const chip = (active: boolean) => `inline-flex min-h-11 items-center border px-4 text-sm ${active ? "border-tea bg-tea text-mist" : "border-rule hover:border-tea"}`;

  return (
    <div className="flex flex-col gap-8">
      <nav aria-label={t("filters")} className="flex flex-wrap gap-2">
        <Link href={pathname} className={chip(!cat)} aria-current={!cat ? "page" : undefined}>{t("all")}</Link>
        {photoCategories.map((c) => (
          <Link key={c} href={`${pathname}?category=${c}`} className={chip(cat === c)} aria-current={cat === c ? "page" : undefined}>{t(`category.${c}`)}</Link>
        ))}
      </nav>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((p) => (
          <li key={p.id}>
            {p.file ? <PhotoFigure photo={p} locale={locale} /> : <PhotoPlaceholder ratio={p.ratio} label={t(`category.${p.category}`)} note={pick(p.caption, locale)} />}
          </li>
        ))}
      </ul>
    </div>
  );
}
