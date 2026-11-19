// One JSON file per tab: messages/<locale>/<namespace>.json
export const namespaces = ["common", "home", "styleguide"] as const;
export type Namespace = (typeof namespaces)[number];
