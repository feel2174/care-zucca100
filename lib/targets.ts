import type { Target, TargetSlug } from "@/lib/types";
import data from "@/data/targets.json";

export const TARGETS = data as Target[];
export const TARGET_SLUGS = TARGETS.map((t) => t.slug);

export function getTargets(): Target[] {
  return TARGETS;
}

export function getTarget(slug: string): Target | undefined {
  return TARGETS.find((t) => t.slug === slug);
}

/** 수혜자 3분류(어르신·장애인·국가유공자). 시각장애인은 제공자이므로 제외된다. */
export function getRecipients(): Target[] {
  return TARGETS.filter((t) => t.role === "recipient");
}

export function isTargetSlug(value: string): value is TargetSlug {
  return TARGET_SLUGS.includes(value as TargetSlug);
}
