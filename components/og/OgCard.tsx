import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

/**
 * 공유 미리보기용 OG 카드(트랙 A — 스펙 §12.2). 카카오톡·네이버 공유에서 읽히도록
 * 배정 키워드를 크게 넣는다. 검색 썸네일 후보로 쓰는 대표 이미지(트랙 B)는 텍스트를
 * 최소화한 별도 파일이므로 혼동하지 말 것.
 *
 * next/og는 woff2를 읽지 못한다. 반드시 ttf만 쓴다.
 */
export async function renderOgCard({
  eyebrow,
  headline,
  sub,
}: {
  eyebrow: string;
  headline: string;
  sub: string;
}) {
  const [extrabold, medium] = await Promise.all([
    readFile(join(process.cwd(), "assets/fonts/pt-extrabold.ttf")),
    readFile(join(process.cwd(), "assets/fonts/pt-medium.ttf")),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          gap: 24,
          padding: "0 96px",
          background: "#0F3D3E",
          backgroundImage:
            "radial-gradient(circle at 82% 22%, rgba(13,127,110,0.45), transparent 55%)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            borderRadius: 999,
            background: "rgba(255,255,255,0.14)",
            padding: "10px 24px",
            fontSize: 30,
            fontFamily: "Pretendard",
            fontWeight: 500,
            color: "#BFE0D6",
          }}
        >
          {eyebrow}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 82,
            fontFamily: "Pretendard",
            fontWeight: 800,
            color: "#FFFFFF",
            letterSpacing: -2,
            lineHeight: 1.2,
            maxWidth: 1000,
          }}
        >
          {headline}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 34,
            fontFamily: "Pretendard",
            fontWeight: 500,
            color: "#9DBDB4",
            maxWidth: 960,
          }}
        >
          {sub}
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: [
        { name: "Pretendard", data: extrabold, weight: 800, style: "normal" },
        { name: "Pretendard", data: medium, weight: 500, style: "normal" },
      ],
    }
  );
}
