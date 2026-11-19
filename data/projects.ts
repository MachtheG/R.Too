// Projects ledger: one entry per initiative Robert Too took part in.
// RULES: every entry needs `sourceIds` pointing to a document in sources.ts.
// `role` must say what he did. Never "built" unless the source says so.
// `amount` must say whether it is an approved allocation or actual spending.
// Campaign-supplied items without a document stay out (list them in PROGRESS.md).
export const sectors = ["education", "health", "water", "roads", "security", "bursaries", "agriculture", "sports", "environment", "women"] as const;
export type Sector = (typeof sectors)[number];
export type Role = "sponsored" | "lobbied" | "allocated" | "oversaw" | "delivered" | "founded" | "led" | "supported";
export type Status = "approved" | "ongoing" | "complete";

export type Project = {
  slug: string;
  name: { en: string; sw: string };
  summary: { en: string; sw: string };
  sector: Sector;
  ward: string; // ward slug from data/wards.ts, or "all"
  year: number;
  amount?: { kes: number; kind: "approved" | "spent" };
  fundingSource?: string;
  status: Status;
  role: Role;
  sourceIds: string[];
  photoIds?: string[];
};

// No documented projects yet: see docs/RESEARCH-SUMMARY.md, "Gaps".
export const projects: Project[] = [];
