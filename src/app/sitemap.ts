import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { siteUrl } from "@/lib/site";
import { wards } from "@data/wards";
import { projects } from "@data/projects";

const paths = ["", "/record", "/projects", "/map", "/plan", "/story", "/gallery", "/news", "/get-involved", "/contact", "/qa", "/wards", "/privacy", "/sources", "/credits",
  ...wards.map((w) => `/wards/${w.slug}`), ...projects.map((p) => `/projects/${p.slug}`)];

export default function sitemap(): MetadataRoute.Sitemap {
  return paths.flatMap((path) =>
    routing.locales.map((l) => ({
      url: `${siteUrl}/${l}${path}`,
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.7,
      alternates: { languages: Object.fromEntries(routing.locales.map((x) => [x === "sw" ? "sw-KE" : "en-KE", `${siteUrl}/${x}${path}`])) },
    })),
  );
}
