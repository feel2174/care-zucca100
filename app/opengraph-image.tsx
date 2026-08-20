import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { SITE } from "@/lib/site";

export const alt = SITE.name;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
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
          gap: 28,
          padding: "0 96px",
          background: "#0F172A",
          backgroundImage:
            "radial-gradient(circle at 82% 22%, rgba(37,99,235,0.35), transparent 55%)",
        }}
      >
        <div
          style={{
            display: "flex",
            width: 88,
            height: 88,
            borderRadius: 22,
            background: "#2563EB",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg
            width="52"
            height="52"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth={3}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 92,
            fontFamily: "Pretendard",
            fontWeight: 800,
            color: "#FFFFFF",
            letterSpacing: -2,
          }}
        >
          {SITE.name}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 36,
            fontFamily: "Pretendard",
            fontWeight: 500,
            color: "#94A3B8",
            maxWidth: 960,
          }}
        >
          정당 입당·탈당, 절차만 정확하게.
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Pretendard", data: extrabold, weight: 800, style: "normal" },
        { name: "Pretendard", data: medium, weight: 500, style: "normal" },
      ],
    }
  );
}
