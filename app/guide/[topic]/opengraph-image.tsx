import { renderOgCard, OG_SIZE, OG_CONTENT_TYPE } from "@/components/og/OgCard";
import { getGuide, getGuides } from "@/lib/guides";
import type { GuideSlug } from "@/lib/guides";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "안마바우처 가이드";

export function generateStaticParams() {
  return getGuides().map((g) => ({ topic: g.slug }));
}

const COPY: Record<GuideSlug, { eyebrow: string; headline: string; sub: string }> = {
  apply: {
    eyebrow: "3단계",
    headline: "안마바우처 신청방법",
    sub: "주민센터 신청 → 국민행복카드 → 안마원 예약",
  },
  cost: {
    eyebrow: "연 48회",
    headline: "본인부담금·횟수·시간",
    sub: "회당 60분, 본인부담 10%(약 4,000~4,200원)",
  },
  card: {
    eyebrow: "결제수단",
    headline: "국민행복카드 발급",
    sub: "발급처·필요서류·사용처를 정리했습니다.",
  },
};

export default async function Image({ params }: { params: Promise<{ topic: string }> }) {
  const { topic } = await params;
  const g = getGuide(topic);
  return renderOgCard(COPY[(g?.slug ?? "apply") as GuideSlug]);
}
