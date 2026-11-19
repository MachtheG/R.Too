// DRAFT pledges written from documented needs. The campaign must approve them before launch.
export type Pledge = { key: "tea" | "dairy" | "women"; evidenceSourceIds: string[]; draft: true };

export const pledges: Pledge[] = [
  { key: "tea", evidenceSourceIds: ["standard-tea-prices"], draft: true },
  { key: "dairy", evidenceSourceIds: ["bomet-factsheet-2026", "standard-milk-shortage"], draft: true },
  { key: "women", evidenceSourceIds: [], draft: true },
];
