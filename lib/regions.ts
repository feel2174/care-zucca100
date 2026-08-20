import type { Sido } from "@/lib/types";
import data from "@/data/regions.json";

export const SIDOS = data as Sido[];
export const SIDO_SLUGS = SIDOS.map((s) => s.slug);

export function getSidos(): Sido[] {
  return SIDOS;
}

export function getSido(slug: string): Sido | undefined {
  return SIDOS.find((s) => s.slug === slug);
}
