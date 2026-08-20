import { renderOgCard, OG_SIZE, OG_CONTENT_TYPE } from "@/components/og/OgCard";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "산모·신생아 건강관리 지원사업";

export default async function Image() {
  return renderOgCard({
    eyebrow: "안마바우처 아님",
    headline: "산모·신생아 건강관리",
    sub: "산모는 안마바우처 대상이 아닙니다. 산후도우미는 보건소 신청입니다.",
  });
}
