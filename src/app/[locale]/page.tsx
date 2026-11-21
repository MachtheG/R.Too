import { locale as rootLocale } from "next/root-params";
import { HomeHero } from "@/components/home/HomeHero";
import { CountdownBand } from "@/components/home/CountdownBand";
import { EntryCards } from "@/components/home/EntryCards";
import { StatsBand } from "@/components/home/StatsBand";
import { RecordTeaser } from "@/components/home/RecordTeaser";
import { LandscapeBand } from "@/components/home/LandscapeBand";
import { MapPreview } from "@/components/home/MapPreview";
import { PlanTeaser } from "@/components/home/PlanTeaser";
import { CallToAction } from "@/components/home/CallToAction";
import { PersonJsonLd } from "@/components/home/PersonJsonLd";

export default async function HomePage() {
  const locale = await rootLocale();
  return (
    <>
      <PersonJsonLd locale={locale} />
      <HomeHero locale={locale} />
      <CountdownBand />
      <EntryCards />
      <StatsBand locale={locale} />
      <RecordTeaser />
      <LandscapeBand locale={locale} />
      <MapPreview locale={locale} />
      <PlanTeaser />
      <CallToAction />
    </>
  );
}
