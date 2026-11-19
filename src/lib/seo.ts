import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { locale as rootLocale } from "next/root-params";
import type { Namespace } from "@/i18n/namespaces";
import { routing } from "@/i18n/routing";

const tabPaths: Partial<Record<Namespace, string>> = {
  home: "", record: "/record", projects: "/projects", map: "/map", plan: "/plan", story: "/story",
  gallery: "/gallery", news: "/news", involved: "/get-involved", contact: "/contact", qa: "/qa",
  wards: "/wards", privacy: "/privacy", sources: "/sources", credits: "/credits",
};

/** Canonical + hreflang alternates for a locale-less path like "/map". */
export function alternatesFor(path: string, locale: string): Metadata["alternates"] {
  const languages = Object.fromEntries(routing.locales.map((l) => [l === "sw" ? "sw-KE" : "en-KE", `/${l}${path}`]));
  return { canonical: `/${locale}${path}`, languages: { ...languages, "x-default": `/${routing.defaultLocale}${path}` } };
}

/** Standard per-tab metadata: title, description, canonical, hreflang, Open Graph. */
export async function tabMetadata(ns: Namespace): Promise<Metadata> {
  const t = await getTranslations(`${ns}.meta`);
  const locale = await rootLocale();
  const path = tabPaths[ns] ?? "";
  const title = t("title");
  const description = t("description");
  return {
    title,
    description,
    alternates: alternatesFor(path, locale),
    openGraph: { title, description, url: `/${locale}${path}`, locale: locale === "sw" ? "sw_KE" : "en_KE", type: "website", siteName: "Robert Too · Sotik 2027" },
    twitter: { card: "summary_large_image", title, description },
  };
}
