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
      className="inline-flex min-h-11 min-w-11 items-center justify-center border border-rule font-mono text-xs hover:border-tea"
    >
      {t("short")}
    </Link>
  );
}
