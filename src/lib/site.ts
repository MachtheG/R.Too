// The one canonical public URL: canonical/hreflang tags, OG images, sitemap, JSON-LD and share links
// all derive from this. NEXT_PUBLIC_SITE_URL (Vercel) overrides it, so keep both set to the same domain.
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://r-too.vercel.app").replace(/\/+$/, "");
