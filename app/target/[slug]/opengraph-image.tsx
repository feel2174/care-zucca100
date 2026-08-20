import { renderOgCard, OG_SIZE, OG_CONTENT_TYPE } from "@/components/og/OgCard";
import { getTarget, getTargets } from "@/lib/targets";
import type { TargetSlug } from "@/lib/types";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "안마바우처 대상별 안내";

// 페이지와 별도로 선언해야 OG가 정적으로 프리렌더된다(스펙 §12.2).
export function generateStaticParams() {
  return getTargets().map((t) => ({ slug: t.slug }));
}

const COPY: Record<TargetSlug, { eyebrow: string; headline: string; sub: string }> = {
  senior: {
    eyebrow: "60세 이상",
    headline: "어르신 안마바우처",
    sub: "자격·소득기준·신청방법을 정리했습니다.",
  },
  disabled: {
    eyebrow: "지체·뇌병변",
    headline: "장애인 안마바우처",
    sub: "연령 무관, 중위소득 140% 이하 대상입니다.",
  },
  veteran: {
    eyebrow: "상이등급",
    headline: "국가유공자 안마바우처",
    sub: "연령 무관, 중위소득 140% 이하 대상입니다.",
  },
  blind: {
    eyebrow: "의료법 제82조",
    headline: "시각장애인은 안마사입니다",
    sub: "받는 대상이 아니라 서비스를 제공하는 쪽입니다.",
  },
};

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const t = getTarget(slug);
  const copy = COPY[(t?.slug ?? "senior") as TargetSlug];
  return renderOgCard(copy);
}
