import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

// 2x resolution (120:63 ratio) — vector-sourced, stays crisp when scaled up.
export const OG_SIZE = { width: 2400, height: 1260 };
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
          position: "relative",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "0 200px",
          background: "#0A2A2B",
          backgroundImage:
            "radial-gradient(circle at 80% 26%, rgba(16,185,129,0.45), transparent 52%), radial-gradient(circle at 12% 98%, rgba(13,127,110,0.22), transparent 46%)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 150,
            right: 130,
            width: 620,
            height: 620,
            borderRadius: 620,
            background:
              "radial-gradient(circle at 38% 34%, rgba(52,211,153,0.50), rgba(13,127,110,0.05) 62%, transparent 72%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 250,
            right: 250,
            width: 420,
            height: 420,
            borderRadius: 420,
            border: "3px solid rgba(153,221,204,0.26)",
          }}
        />

        <div
          style={{
            position: "relative",
            display: "flex",
            width: 176,
            height: 176,
            borderRadius: 42,
            alignItems: "center",
            justifyContent: "center",
            background: "linear-gradient(150deg, #10b981 0%, #0d7f6e 100%)",
            boxShadow:
              "0 46px 88px rgba(13,127,110,0.55), inset 0 3px 0 rgba(255,255,255,0.4)",
            marginBottom: 52,
            fontFamily: "Pretendard",
            fontWeight: 800,
            fontSize: 104,
            color: "#FFFFFF",
          }}
        >
          안
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            borderRadius: 999,
            background: "rgba(16,185,129,0.16)",
            border: "1px solid rgba(110,231,183,0.35)",
            padding: "14px 30px",
            marginBottom: 32,
            fontSize: 40,
            fontFamily: "Pretendard",
            fontWeight: 500,
            color: "#A7F3D0",
          }}
        >
          {eyebrow}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 128,
            fontFamily: "Pretendard",
            fontWeight: 800,
            color: "#FFFFFF",
            letterSpacing: -4,
            lineHeight: 1.14,
            maxWidth: 1760,
            wordBreak: "keep-all",
          }}
        >
          {headline}
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 36,
            fontSize: 58,
            fontFamily: "Pretendard",
            fontWeight: 500,
            color: "#9DBDB4",
            maxWidth: 1600,
            lineHeight: 1.35,
            wordBreak: "keep-all",
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
