/**
 * 검색 썸네일 후보용 대표 이미지 생성 (트랙 B — 스펙 §12.3).
 *
 * 구글은 schema.org `image`/og:image에 "텍스트가 들어간 이미지와 로고 같은 범용 이미지는
 * 피하라"고 안내한다. 그래서 공유용 OG 카드(트랙 A, 키워드 텍스트 큼)와 별도로,
 * 텍스트를 최소화한 아이콘·도형 기반 이미지를 여기서 만든다.
 *
 * 로컬 Chrome을 헤드리스로 돌려 SVG를 PNG로 굽는다 — 새 npm 의존성이 없다.
 * 실행: node scripts/build_thumbnails.mjs
 */
import { execFileSync } from "node:child_process";
import { mkdirSync, writeFileSync, rmSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = join(ROOT, "public", "thumb");
const TMP = join(ROOT, ".thumb-tmp");

// 전용 임시 프로필을 쓴다. 안 그러면 헤드리스 Chrome이 사용자의 기본 프로필을 잡으려 하면서
// 실행 중인 Chrome과 충돌하고 창이 깜빡인다.
//
// 단, 프로필 디렉터리를 30번의 호출이 공유하면 SingletonLock에 걸려 두 번째 호출부터
// 무한 대기한다(실제로 겪음). 호출마다 별도 프로필을 준다.
const chromeFlags = (name) => [
  "--headless=new",
  "--disable-gpu",
  "--hide-scrollbars",
  "--no-first-run",
  "--no-default-browser-check",
  "--disable-extensions",
  "--force-device-scale-factor=1",
  `--user-data-dir=${join(TMP, "profiles", name)}`,
];

const CHROME =
  process.env.CHROME_PATH ||
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

const RATIOS = { "1x1": [1200, 1200], "4x3": [1200, 900], "16x9": [1200, 675] };

const C = {
  primary: "#0f3d3e",
  accent: "#0d7f6e",
  canvas: "#f4f7f5",
  band: "#e8f1ec",
  line: "#d7e3dd",
  white: "#ffffff",
  warn: "#b3261e",
};

/** 손·온기 모티프. 안마바우처 전반. */
const handGlyph = `
  <g stroke="${C.white}" stroke-width="7" fill="none" stroke-linecap="round" stroke-linejoin="round">
    <path d="M-30 34 L-30 -6 a9 9 0 0 1 18 0 L-12 -30 a9 9 0 0 1 18 0 L6 -22 a9 9 0 0 1 18 0 L24 -8 a9 9 0 0 1 16 4 L40 30 a34 34 0 0 1-34 34 L-8 64 a30 30 0 0 1-22-30 Z"/>
  </g>
  <g stroke="${C.accent}" stroke-width="6" fill="none" stroke-linecap="round" opacity="0.95">
    <path d="M-58 -30 q-10 -16 0 -32"/><path d="M-36 -44 q-10 -16 0 -32"/>
  </g>`;

/** 지도 핀. 위치찾기. */
const pinGlyph = `
  <g stroke="${C.white}" stroke-width="7" fill="none" stroke-linecap="round" stroke-linejoin="round">
    <path d="M0 62 C0 62 -38 18 -38 -8 a38 38 0 0 1 76 0 C38 18 0 62 0 62 Z"/>
    <circle cx="0" cy="-8" r="14" stroke="${C.accent}"/>
  </g>`;

/** 카드. 국민행복카드. */
const cardGlyph = `
  <g stroke="${C.white}" stroke-width="7" fill="none" stroke-linejoin="round" stroke-linecap="round">
    <rect x="-52" y="-34" width="104" height="70" rx="10"/>
    <path d="M-52 -12 L52 -12" stroke="${C.accent}"/>
    <path d="M-36 14 L-8 14"/>
  </g>`;

/** 문서·체크. 신청·자격. */
const docGlyph = `
  <g stroke="${C.white}" stroke-width="7" fill="none" stroke-linejoin="round" stroke-linecap="round">
    <path d="M-38 -50 L18 -50 L44 -24 L44 52 a6 6 0 0 1-6 6 L-38 58 a6 6 0 0 1-6-6 L-44 -44 a6 6 0 0 1 6-6 Z"/>
    <path d="M-20 8 L-4 24 L26 -8" stroke="${C.accent}" stroke-width="9"/>
  </g>`;

/** 시계·횟수. 비용/횟수. */
const clockGlyph = `
  <g stroke="${C.white}" stroke-width="7" fill="none" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="0" cy="0" r="48"/>
    <path d="M0 -26 L0 4 L22 18" stroke="${C.accent}" stroke-width="9"/>
  </g>`;

/** 아기 얼굴. 산모 관련 페이지.
 *  주의: 머리 위 곡선을 좌우 대칭으로 두면 뿔처럼 보인다. 곡선은 가운데 하나만 둔다. */
const babyGlyph = `
  <g stroke="${C.white}" stroke-width="7" fill="none" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="0" cy="4" r="42"/>
    <path d="M-17 -6 h7 M10 -6 h7"/>
    <path d="M-15 20 q15 13 30 0" stroke="${C.accent}" stroke-width="8"/>
    <path d="M2 -38 q4 -16 -12 -18"/>
  </g>`;

/** 사람. 장애인 대상 페이지. */
const personGlyph = `
  <g stroke="${C.white}" stroke-width="7" fill="none" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="0" cy="-40" r="14"/>
    <path d="M0 -20 L0 24"/>
    <path d="M-24 -6 L24 -6"/>
    <path d="M0 24 L-20 60"/>
    <path d="M0 24 L20 60"/>
  </g>`;

/** 사람 + 흰지팡이. 시각장애인=제공자(안마사). */
const caneGlyph = `
  <g stroke="${C.white}" stroke-width="7" fill="none" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="-14" cy="-40" r="14"/>
    <path d="M-14 -20 L-14 24"/>
    <path d="M-38 -6 L6 -6"/>
    <path d="M-14 24 L-32 58"/>
    <path d="M-14 24 L2 58"/>
    <path d="M16 -8 L32 52" stroke="${C.accent}" stroke-width="7"/>
  </g>`;

const TYPES = [
  { id: "hub", glyph: handGlyph, tone: C.primary },
  { id: "target-senior", glyph: handGlyph, tone: C.primary },
  { id: "target-disabled", glyph: personGlyph, tone: C.primary },
  { id: "target-veteran", glyph: docGlyph, tone: C.primary },
  { id: "target-blind", glyph: caneGlyph, tone: C.accent },
  { id: "guide-apply", glyph: docGlyph, tone: C.primary },
  { id: "guide-cost", glyph: clockGlyph, tone: C.primary },
  { id: "guide-card", glyph: cardGlyph, tone: C.primary },
  { id: "find", glyph: pinGlyph, tone: C.primary },
  { id: "maternity", glyph: babyGlyph, tone: C.primary },
];

function svg({ glyph, tone }, w, h) {
  const cx = w / 2;
  const cy = h / 2;
  const r = Math.min(w, h) * 0.3;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${C.canvas}"/>
      <stop offset="100%" stop-color="${C.band}"/>
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#bg)"/>
  <circle cx="${cx}" cy="${cy}" r="${r * 1.34}" fill="${C.white}" stroke="${C.line}" stroke-width="3"/>
  <circle cx="${cx}" cy="${cy}" r="${r}" fill="${tone}"/>
  <g transform="translate(${cx} ${cy}) scale(${(r / 78).toFixed(3)})">${glyph}</g>
</svg>`;
}

function main() {
  mkdirSync(OUT, { recursive: true });
  mkdirSync(TMP, { recursive: true });

  let n = 0;
  for (const type of TYPES) {
    for (const [ratio, [w, h]] of Object.entries(RATIOS)) {
      const name = `${type.id}-${ratio}`;
      const htmlPath = join(TMP, `${name}.html`);
      writeFileSync(
        htmlPath,
        `<html><body style="margin:0">${svg(type, w, h)}</body></html>`,
        "utf-8"
      );
      execFileSync(
        CHROME,
        [
          ...chromeFlags(name),
          `--window-size=${w},${h}`,
          `--screenshot=${join(OUT, `${name}.png`)}`,
          `file://${htmlPath}`,
        ],
        { stdio: "ignore" }
      );
      n += 1;
    }
  }

  rmSync(TMP, { recursive: true, force: true });
  const written = readdirSync(OUT).filter((f) => f.endsWith(".png")).length;
  console.log(`generated ${n} thumbnails -> public/thumb (${written} png on disk)`);
}

main();
