// One JSON file per tab: messages/<locale>/<namespace>.json
export const namespaces = [
  "common",
  "home",
  "styleguide",
  "record",
  "projects",
  "map",
  "plan",
  "story",
  "gallery",
  "news",
  "involved",
  "contact",
  "qa",
  "wards",
  "privacy",
  "sources",
  "credits",
  "forms",
] as const;
export type Namespace = (typeof namespaces)[number];
