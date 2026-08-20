import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { getTargets } from "@/lib/targets";
import { getGuides } from "@/lib/guides";
import { getSidos } from "@/lib/regions";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.url;
  const now = new Date();

  const paths = [
    "",
    "/guide",
    "/find",
    "/related/maternity",
    ...getTargets().map((t) => `/target/${t.slug}`),
    ...getGuides().map((g) => `/guide/${g.slug}`),
    ...getSidos().map((s) => `/find/${s.slug}`),
  ];

  return paths.map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.7,
  }));
}
