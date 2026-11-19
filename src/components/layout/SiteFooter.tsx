import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export async function SiteFooter() {
  const t = await getTranslations("common.footer");

  return (
    <footer className="bg-night text-[#d8d4ca]">
      <div className="mx-auto flex max-w-screen-xl flex-col gap-6 px-4 py-10 md:flex-row md:justify-between md:px-8">
        <div className="flex flex-col gap-2 text-sm">
          <p className="font-display text-2xl text-mist">{t("tagline")}</p>
          <p>{t("authorised")}</p>
          <p className="text-uda">{t("demo")}</p>
        </div>
        <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
          <li><Link href="/privacy" className="hover:text-mist">{t("privacy")}</Link></li>
          <li><Link href="/sources" className="hover:text-mist">{t("sources")}</Link></li>
          <li><Link href="/credits" className="hover:text-mist">{t("credits")}</Link></li>
        </ul>
      </div>
    </footer>
  );
}
