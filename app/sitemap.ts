import type { MetadataRoute } from "next";
import { getAllParties } from "@/lib/parties";
import { GUIDES } from "@/lib/guides";
import { SECTION_KEYS } from "@/lib/sections";
import { SITE } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const parties = getAllParties();
  const now = new Date();

  const partyUrls = parties.flatMap((party) => [
    {
      url: `${SITE.url}/${party.id}`,
      lastModified: new Date(party.lastVerified),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    ...SECTION_KEYS.map((section) => ({
      url: `${SITE.url}/${party.id}/${section}`,
      lastModified: new Date(party.lastVerified),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ]);

  const guideUrls = [
    {
      url: `${SITE.url}/guide`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    },
    ...GUIDES.map((guide) => ({
      url: `${SITE.url}/guide/${guide.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];

  return [
    { url: SITE.url, lastModified: now, changeFrequency: "weekly", priority: 1 },
    ...partyUrls,
    ...guideUrls,
  ];
}
