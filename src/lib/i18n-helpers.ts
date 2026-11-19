// Pure helpers, safe in client and server components.
export const numberLocale = (locale: string) => (locale === "sw" ? "sw-KE" : "en-KE");
export const pick = <T,>(v: { en: T; sw: T }, locale: string): T => (locale === "sw" ? v.sw : v.en);
