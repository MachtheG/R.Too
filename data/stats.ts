// Headline stats on Home. Each carries its source id; `verified: false` renders a [[TO CONFIRM]] marker.
export type Stat = {
  key: "voters2022" | "voters2017" | "growth" | "wards";
  value: number;
  format: "number" | "percent";
  sourceId: string;
  verified: boolean;
};

export const VOTERS_2022 = 86681;
export const VOTERS_2017 = 73314;

export const stats: Stat[] = [
  { key: "voters2022", value: VOTERS_2022, format: "number", sourceId: "iebc-rov-2022", verified: true },
  { key: "voters2017", value: VOTERS_2017, format: "number", sourceId: "mzalendo-sotik", verified: false },
  {
    key: "growth",
    value: Math.round(((VOTERS_2022 - VOTERS_2017) / VOTERS_2017) * 100),
    format: "percent",
    sourceId: "mzalendo-sotik",
    verified: false,
  },
  { key: "wards", value: 5, format: "number", sourceId: "iebc-rov-2022", verified: true },
];
