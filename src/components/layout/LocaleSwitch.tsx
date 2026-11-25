"use client";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";

export function LocaleSwitch() {
  const t = useTranslations("common.locale");
  const locale = useLocale();
  const pathname = usePathname();
  const other = locale === "en" ? "sw" : "en";

  return (
    <Link
      href={pathname}
      locale={other}
      hrefLang={other}
      aria-label={t("switchTo")}
      className="group inline-flex min-h-11 min-w-11 items-center justify-center"
    >
      <span className="rounded-md border border-paper/40 px-2.5 py-1 text-xs font-semibold group-hover:border-accent group-hover:text-accent">{t("short")}</span>
    </Link>
  );
}
