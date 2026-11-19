// News items: our own one-line summaries (in messages/<locale>/news.json) plus a link.
// Never copy article text.
export type NewsItem = { key: "election" | "tea" | "milk" | "value"; sourceId: string; date: string };

export const news: NewsItem[] = [
  { key: "value", sourceId: "kna-value-addition", date: "2026-10-08" },
  { key: "election", sourceId: "iebc-election-notice-2027", date: "2026-09-14" },
  { key: "milk", sourceId: "standard-milk-shortage", date: "2026" },
  { key: "tea", sourceId: "standard-tea-prices", date: "2026" },
];
