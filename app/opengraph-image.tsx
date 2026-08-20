import { renderOgCard, OG_SIZE, OG_CONTENT_TYPE } from "@/components/og/OgCard";
import { SITE } from "@/lib/site";

export const alt = `${SITE.name} — ${SITE.tagline}`;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return renderOgCard({
    eyebrow: "정부지원",
    headline: "정부지원 안마바우처",
    sub: "대상·자격·신청방법·본인부담금을 한곳에 정리했습니다.",
  });
}
