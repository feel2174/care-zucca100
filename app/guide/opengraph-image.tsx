import { renderOgCard, OG_SIZE, OG_CONTENT_TYPE } from "@/components/og/OgCard";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "안마바우처 가이드";

export default async function Image() {
  return renderOgCard({
    eyebrow: "단계별 안내",
    headline: "안마바우처 가이드",
    sub: "신청·기간·비용·카드·재신청·잔여횟수를 한곳에",
  });
}
