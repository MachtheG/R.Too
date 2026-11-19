import { siteUrl } from "@/lib/site";

/** schema.org Person. Only facts we can stand behind; no unverified biography. */
export function PersonJsonLd({ locale }: { locale: string }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Robert Too",
    honorificPrefix: "Hon.",
    url: `${siteUrl}/${locale}`,
    description: locale === "sw" ? "Mgombea Ubunge, Eneo Bunge la Sotik, Kaunti ya Bomet, 2027." : "Candidate for Member of Parliament, Sotik Constituency, Bomet County, 2027.",
    affiliation: { "@type": "PoliticalParty", name: "United Democratic Alliance (UDA)" },
    homeLocation: { "@type": "Place", name: "Sotik, Bomet County, Kenya" },
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}
