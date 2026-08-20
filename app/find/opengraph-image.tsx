import { renderOgCard, OG_SIZE, OG_CONTENT_TYPE } from "@/components/og/OgCard";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "시각장애인 안마원 찾기";

export default async function Image() {
  return renderOgCard({
    eyebrow: "내 위치",
    headline: "가까운 안마원 찾기",
    sub: "지역을 선택하면 네이버 지도로 바로 연결됩니다.",
  });
}
