import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { locale as rootLocale } from "next/root-params";
import { WardDetail } from "@/components/wards/WardDetail";
import { wards } from "@data/wards";

export function generateStaticParams() {
  return wards.map((w) => ({ ward: w.slug }));
}

export async function generateMetadata({ params }: PageProps<"/[locale]/wards/[ward]">) {
  const { ward } = await params;
  const w = wards.find((x) => x.slug === ward);
  const t = await getTranslations("wards.meta");
  return w ? { title: `${w.name} · ${t("title")}`, description: t("description") } : {};
}

export default async function WardPage({ params }: PageProps<"/[locale]/wards/[ward]">) {
  const { ward } = await params;
  const w = wards.find((x) => x.slug === ward);
  if (!w) notFound();
  return <WardDetail ward={w} locale={await rootLocale()} />;
}
