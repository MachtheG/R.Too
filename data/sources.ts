// Every figure, date and claim on the site must reference an id here.
// `verified: true` means checked against the primary document; false means a
// secondary source only, so the figure renders with a [[TO CONFIRM]] flag.

export type Source = {
  id: string;
  title: string;
  publisher: string;
  date: string; // ISO date of publication or access
  url: string;
  primary: boolean;
  verified: boolean;
  note?: string;
};

export const sources: Source[] = [
  {
    id: "iebc-rov-2022",
    title: "Registered Voters per Constituency for the 2022 General Election",
    publisher: "IEBC",
    date: "2022-06-23",
    url: "https://www.iebc.or.ke/docs/rov_per_constituency.pdf",
    primary: true,
    verified: true,
    note: "Row: 036 BOMET / 194 SOTIK / 86,681. Parsed with pdftotext on 2026-11-19.",
  },
  {
    id: "iebc-rov-2017",
    title: "Registered Voters per Constituency for 2017 General Elections",
    publisher: "IEBC",
    date: "2017",
    url: "https://www.iebc.or.ke/docs/Registered%20Voters%20Per%20Contituency%20For%202017%20General%20Elections.pdf",
    primary: true,
    verified: false,
    note: "Sotik 2017 = 73,314 per Mzalendo; PDF not yet parsed.",
  },
  {
    id: "mzalendo-sotik",
    title: "Constituency profile: Sotik",
    publisher: "Mzalendo Trust",
    date: "2026-11-19",
    url: "https://mzalendo.com/research-and-knowledge/constituencies/sotik/",
    primary: false,
    verified: false,
    note: "Ward voters 2022; NG-CDF approved allocations FY22/23, 24/25, 25/26.",
  },
  {
    id: "wikipedia-sotik",
    title: "Sotik Constituency",
    publisher: "Wikipedia",
    date: "2026-10-16",
    url: "https://en.wikipedia.org/wiki/Sotik_Constituency",
    primary: false,
    verified: false,
    note: "Ward voters 2022 (matches Mzalendo); area 544 km² citing KNBS Vol. II.",
  },
  {
    id: "knbs-2019-vol2-constituency",
    title: "2019 KPHC: Constituency population by sex, households, area and density",
    publisher: "KNBS",
    date: "2019-12",
    url: "https://web.archive.org/web/20251210052612/https://www.knbs.or.ke/constituency-population-by-sex-number-of-households-area-and-density/",
    primary: true,
    verified: false,
    note: "Population 227,855; area 544 km². Household count still to extract.",
  },
  {
    id: "iebc-election-notice-2027",
    title: "IEBC officially publishes notice for 2027 General Election",
    publisher: "Capital FM",
    date: "2026-09-14",
    url: "https://capitalfm.africa/iebc-officially-publishes-notice-for-2027-general-election/",
    primary: false,
    verified: true,
    note: "Election Tue 10 Aug 2027; campaign 29 May – 7 Aug 2027.",
  },
  {
    id: "standard-election-date",
    title: "IEBC sets August 10, 2027 as General Election date",
    publisher: "The Standard",
    date: "2026",
    url: "https://www.standardmedia.co.ke/national/article/2001551158/iebc-sets-august-10-2027-as-general-election-date",
    primary: false,
    verified: true,
  },
  {
    id: "bomet-cidp-2023-2027",
    title: "Bomet County Integrated Development Plan 2023–2027",
    publisher: "County Government of Bomet (via KIPPRA repository)",
    date: "2023",
    url: "https://repository.kippra.or.ke/handle/123456789/4386",
    primary: true,
    verified: false,
    note: "Agriculture chapter is needed for tea and dairy priorities.",
  },
  {
    id: "bomet-factsheet-2026",
    title: "Bomet County Factsheet",
    publisher: "County Government of Bomet",
    date: "2026-03",
    url: "https://bomet.go.ke/wp-content/uploads/2026/03/Bomet_Factsheet_A3_Double-sided_20copies-1.pdf",
    primary: true,
    verified: false,
    note: "Tea is the top value chain; Sotik dairy constraints include cooling plants and breeds.",
  },
  {
    id: "standard-milk-shortage",
    title: "Milk shortage hits Bomet as supply declines",
    publisher: "The Standard",
    date: "2026",
    url: "https://www.standardmedia.co.ke/business/rift-valley/article/2001559342/milk-shortage-hits-bomet-as-supply-declines",
    primary: false,
    verified: true,
  },
  {
    id: "standard-tea-prices",
    title: "Farmers call for review of tea prices",
    publisher: "The Standard",
    date: "2026",
    url: "https://www.standardmedia.co.ke/rift-valley/article/2001540547/farmers-call-for-review-of-tea-prices",
    primary: false,
    verified: true,
  },
  {
    id: "kna-value-addition",
    title: "Bomet focuses on value addition on agricultural products",
    publisher: "Kenya News Agency",
    date: "2026-10-08",
    url: "https://www.kenyanews.go.ke/bomet-focuses-on-value-addition-on-agricultural-products/",
    primary: false,
    verified: true,
  },
];
