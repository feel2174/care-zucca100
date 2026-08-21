import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

// 구글 검색 결과 파비콘 요건(스펙 §12.5): 정사각 1:1, 최소 8×8, 48×48보다 크게 권장.
// party 템플릿의 32×32는 권장치 미달이라 96×96으로 올렸다. 배포 후 이 경로를 바꾸지 말 것.
export const size = { width: 96, height: 96 };
export const contentType = "image/png";

export default async function Icon() {
  const bold = await readFile(join(process.cwd(), "assets/fonts/pt-extrabold.ttf"));

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(150deg, #10b981 0%, #0d7f6e 100%)",
          borderRadius: 20,
          fontFamily: "Pretendard",
          fontSize: 58,
          fontWeight: 800,
          color: "#FFFFFF",
        }}
      >
        안
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "Pretendard", data: bold, weight: 800, style: "normal" }],
    }
  );
}
