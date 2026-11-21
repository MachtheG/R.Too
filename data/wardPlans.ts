// DRAFT ward plans. Written by the site team from documented, constituency-level needs
// (tea pricing, dairy constraints, women's credit: see docs/RESEARCH-SUMMARY.md), each ward's
// size, voter density and neighbours (from IEBC boundaries), and the MP's own lever (NG-CDF).
// Nothing here is approved by the candidate. Keep `draft: true` until the campaign signs off,
// and validate every item at ward forums before publishing as final.
type L = { en: string; sw: string };
export type WardPlanItem = { pledge: "tea" | "dairy" | "women" | "fund" | "access"; text: L };
export type WardPlan = { slug: string; draft: true; focus: L; items: WardPlanItem[] };

const fund = (ward: string): WardPlanItem => ({
  pledge: "fund",
  text: {
    en: `Publish every NG-CDF project in ${ward}, with its cost, contractor and status, on this site.`,
    sw: `Kuchapisha kila mradi wa NG-CDF katika ${ward}, pamoja na gharama, mkandarasi na hali yake, kwenye tovuti hii.`,
  },
});

export const wardPlans: WardPlan[] = [
  {
    slug: "kapletundo",
    draft: true,
    focus: {
      en: "Sotik's largest electorate: about one voter in four lives here.",
      sw: "Wapiga kura wengi zaidi Sotik: takriban mpiga kura mmoja kati ya wanne anaishi hapa.",
    },
    items: [
      { pledge: "tea", text: { en: "Push for green-leaf rates published per factory, so growers can see what they are paid and why.", sw: "Kushinikiza bei za majani mabichi zichapishwe kwa kila kiwanda, ili wakulima waone wanacholipwa na sababu yake." } },
      { pledge: "women", text: { en: "Back a revolving credit window for registered women's groups, with repayments reported publicly.", sw: "Kuunga mkono mfuko wa mikopo inayozunguka kwa vikundi vya wanawake vilivyosajiliwa, na marejesho kuripotiwa hadharani." } },
      fund("Kapletundo"),
    ],
  },
  {
    slug: "chemagel",
    draft: true,
    focus: {
      en: "The smallest ward by area and the most densely settled.",
      sw: "Wadi ndogo zaidi kwa eneo na yenye makazi mengi zaidi.",
    },
    items: [
      { pledge: "dairy", text: { en: "Seek a shared milk-cooling point on the ward's busiest collection route.", sw: "Kutafuta kituo cha pamoja cha kupoza maziwa kwenye njia yenye shughuli nyingi zaidi ya ukusanyaji." } },
      { pledge: "access", text: { en: "Prioritise upkeep of feeder roads to tea and milk collection points.", sw: "Kutanguliza ukarabati wa barabara ndogo zinazoelekea vituo vya kukusanya chai na maziwa." } },
      fund("Chemagel"),
    ],
  },
  {
    slug: "kipsonoi",
    draft: true,
    focus: {
      en: "The largest ward by area: services have the farthest to travel.",
      sw: "Wadi kubwa zaidi kwa eneo: huduma husafiri umbali mrefu zaidi.",
    },
    items: [
      { pledge: "dairy", text: { en: "Lobby for scheduled vet and AI (artificial insemination) visits that reach the far ends of the ward.", sw: "Kushawishi ziara za ratiba za madaktari wa mifugo na upandishaji (AI) zinazofika pembe za mbali za wadi." } },
      { pledge: "tea", text: { en: "Support farmer representation on factory boards, with elected delegates reporting back to growers.", sw: "Kuunga mkono uwakilishi wa wakulima kwenye bodi za viwanda, na wajumbe waliochaguliwa kuripoti kwa wakulima." } },
      fund("Kipsonoi"),
    ],
  },
  {
    slug: "ndanai-abosi",
    draft: true,
    focus: {
      en: "A border ward, next to Nyamira County and Chepalungu.",
      sw: "Wadi ya mpakani, karibu na Kaunti ya Nyamira na Chepalungu.",
    },
    items: [
      { pledge: "women", text: { en: "Open market links for women's groups with traders across the Nyamira border.", sw: "Kufungua masoko kwa vikundi vya wanawake pamoja na wafanyabiashara wa upande wa Nyamira." } },
      { pledge: "dairy", text: { en: "Press for disease-control campaigns coordinated with neighbouring counties, since herds and buyers cross the border.", sw: "Kushinikiza kampeni za kudhibiti magonjwa ya mifugo zinazoratibiwa na kaunti jirani, kwa kuwa mifugo na wanunuzi huvuka mpaka." } },
      fund("Ndanai/Abosi"),
    ],
  },
  {
    slug: "rongena-manaret",
    draft: true,
    focus: {
      en: "The fewest voters, which is why it should never get the smallest share.",
      sw: "Wapiga kura wachache zaidi, na kwa sababu hiyo haipaswi kupata mgao mdogo zaidi.",
    },
    items: [
      { pledge: "access", text: { en: "Guarantee a fair, published share of constituency projects, not one set by voter numbers alone.", sw: "Kuhakikisha mgao wa haki na uliochapishwa wa miradi ya eneo bunge, usioamuliwa na idadi ya wapiga kura pekee." } },
      { pledge: "tea", text: { en: "Push for prompt green-leaf payments, with a public record of delays by factory.", sw: "Kushinikiza malipo ya haraka ya majani mabichi, na rekodi ya hadharani ya ucheleweshaji kwa kila kiwanda." } },
      fund("Rongena/Manaret"),
    ],
  },
];

export const planFor = (slug: string) => wardPlans.find((p) => p.slug === slug);
