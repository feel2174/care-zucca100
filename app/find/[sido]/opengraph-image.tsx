import { renderOgCard, OG_SIZE, OG_CONTENT_TYPE } from "@/components/og/OgCard";
import { getSido, getSidos } from "@/lib/regions";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "지역별 시각장애인 안마원 찾기";

export function generateStaticParams() {
  return getSidos().map((s) => ({ sido: s.slug }));
}

export default async function Image({ params }: { params: Promise<{ sido: string }> }) {
  const { sido } = await params;
  const s = getSido(sido);
  return renderOgCard({
    eyebrow: s?.name ?? "지역별",
    headline: "시각장애인 안마원 찾기",
    sub: "안마바우처 이용처와 신청처를 지도에서 확인하세요.",
  });
}
