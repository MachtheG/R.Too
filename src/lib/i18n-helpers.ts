import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import type { Namespace } from "@/i18n/namespaces";

export const numberLocale = (locale: string) => (locale === "sw" ? "sw-KE" : "en-KE");
export const pick = <T,>(v: { en: T; sw: T }, locale: string): T => (locale === "sw" ? v.sw : v.en);

/** Standard per-tab metadata from <namespace>.meta.title / .description. */
export async function tabMetadata(ns: Namespace): Promise<Metadata> {
  const t = await getTranslations(`${ns}.meta`);
  return { title: t("title"), description: t("description") };
}
