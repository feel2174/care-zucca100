# 안마바로 (anma.zucca100.com) — 설계 스펙

- 작성일: 2026-08-20
- 작업 폴더: `C:\Users\devzu\Documents\anma-hub`
- 배포: `anma.zucca100.com` (zucca100 서브도메인)
- 브랜드 가칭: **안마바로** (나중에 교체 가능)
- 포트폴리오 4번째 니치 사이트. finance-hub / party-zucca100 구조 복제.

## 0. 목적 / 수익화

정부지원 안마바우처(시각장애인 안마서비스, 지역사회서비스투자사업) 대상·자격·신청·위치 안내 pSEO 허브.
AdSense 수익화(`ca-pub-9196149361612087`). 대상별 롱테일 + 지역별 롱테일 키워드를 개별 페이지로 확보.

## 1. 사실관계 (조사 확정, 콘텐츠 근거)

핵심: "안마바우처"는 단일 서비스가 아니며 4개 대상의 성격이 다르다.

| 대상 | 역할 | 제도 |
|---|---|---|
| 60세 이상 어르신 | 수혜자 | 시각장애인 안마서비스 바우처 |
| 장애인(지체·뇌병변) | 수혜자 | 시각장애인 안마서비스 바우처 |
| 국가유공자(상이등급) | 수혜자 | 시각장애인 안마서비스 바우처 |
| 시각장애인 | **제공자(안마사)** — 받는 사람 아님 | 의료법 §82 안마사 독점 자격 |
| 산모 | (안마 아님) | **별도 사업** — 산모·신생아 건강관리 지원(산후도우미) |

- 수혜 조건: 근골격계·신경계·순환계 질환 보유. 만 65세↑ = 기초연금/기초생활수급자, 그 외 = 기준 중위소득 140% 이하. 장애인/유공자는 연령무관 중위 140% 이하.
- 서비스: 월 4회 × 12개월 = 연 48회, 회당 60분(찜질 15분 포함). 본인부담 10%(약 4,000~4,200원), 90% 정부 지원.
- 신청: 읍·면·동 주민센터 → 국민행복카드 발급 → 시각장애인 안마시술소 예약. 지자체별 신청기간·서류 상이.
- 안마사 자격: 의료법 §82 + 안마사규칙 §3, 시각장애인만 발급.

## 2. 페이지 구조 (hub-and-spoke)

```
/                      허브 — 개요 + 대상 4분류 카드 + 위치찾기 CTA
/target/senior         60세 이상 어르신 (핵심 수혜)
/target/disabled       장애인 (지체·뇌병변)
/target/veteran        국가유공자 (상이등급)
/target/blind          시각장애인 — "당신은 제공자(안마사)" 오해교정 + 시각장애인 대상 복지 안내
/guide/apply           신청방법 (주민센터 → 국민행복카드 → 예약)
/guide/cost            본인부담금·횟수·시간 (연48회 / 10% / 60분)
/guide/card            국민행복카드 발급
/find                  위치찾기 허브 (내 위치 / 지역 선택)
/find/[sido]           지역별 pSEO — 시도 17개까지만 (시군구는 후속 딥다이브, YAGNI)
/related/maternity     산모·신생아 건강관리 지원사업 — "이건 안마가 아닙니다" 별도 안내
```

정적 페이지 수: 허브1 + 대상4 + 가이드3 + 위치허브1 + 시도17 + 관련1 = 27.

## 3. 위치찾기 (★관건)

원칙: 주소 추측·좌표 DB 구축 안 함 → **네이버 지도가 최신 목록·거리순 렌더**. "내 위치"는 브라우저 Geolocation으로 얹는다.

동작:
1. [내 근처 안마원 찾기] → `navigator.geolocation.getCurrentPosition` 좌표 취득.
2. 좌표를 네이버 지도 검색 URL 중심 파라미터에 주입:
   `https://map.naver.com/p/search/시각장애인 안마원?c={lng},{lat},15,0,0,0,dh` → 사용자 위치 중심 + 주변 거리순.
3. 폴백(권한 거부/실패): 시도 드롭다운 선택 → 지역명 넣은 검색 URL. 이 로직이 `/find/[sido]` 페이지와 동일(재사용).
4. 동일 컴포넌트를 쿼리만 바꿔 **주민센터 찾기**("○○ 주민센터")에 재사용.
5. 모바일/PC 감지로 앱스킴(`navermap://`) vs 웹(`map.naver.com`) 분기.

> 구현 첫 단계 SPIKE: 네이버 지도 URL `c=` 중심좌표 포맷이 최신에도 동작하는지 브라우저 확장/헤드리스로 실측 1회 후 확정. 안 되면 좌표→시군구 역지오코딩(무키 대안) 또는 검색쿼리만으로 폴백.

## 4. 데이터 모델 (스크립트 생성, 하드코딩 편집 금지)

- `data/targets.json` — 대상 4분류별 {자격, 소득기준, 연령, 질환요건, 신청서류}
- `data/regions.json` — 시도 17개 코드/한글명 (지역 pSEO + 폴백 셀렉터). 시군구는 후속.
- `scripts/build_*.py` — JSON 생성(수정은 스크립트→재실행).
- 안마원 좌표 DB 없음 → 유지보수·휘발성 리스크 0.

## 5. 정확성 · 중립성 가드레일 (하드코딩)

- 어르신/장애인/유공자 = 수혜자: 소득·연령 조건 표로 명확 구분.
- 시각장애인 = 제공자: 의료법 §82 근거, "받는 게 아니라 제공하는 쪽" 명확 고지 → 오해 트래픽을 정확 정보로 전환.
- 산모 = 안마 아님: `/related/maternity`에 "산후도우미 사업, 보건소 신청" 명시, 안마와 무관 고지.
- 특정 안마원 추천·순위 0, 링크아웃만, 본인부담금/개인정보 무취급, 강한 면책.
- `lastVerified` 표기 + "지자체별 상이" 고지 + 분기 재검증.

## 6. SEO · 배포 (finance-hub / party-zucca100 복제)

- Next.js 16 App Router + React 19 + TypeScript + Tailwind v4.
- `globals.css` body에 `word-break: keep-all; overflow-wrap: break-word;` **초기 커밋부터**. Korean 카피에 `ch` 단위 max-width 금지.
- OG 이미지 next/og (Pretendard **ttf** 준비 — woff2 불가), `app/icon`/`apple-icon`, `sitemap.ts`, `manifest.ts`.
- `app/robots.txt`(정적 파일 + Daum 웹마스터툴 comment 라인), 인증키는 env(`NEXT_PUBLIC_GOOGLE/NAVER_SITE_VERIFICATION`).
- JSON-LD: WebSite + Organization (루트), 대상/가이드 페이지 HowTo/Article.
- AdSense `ca-pub-9196149361612087` layout `<head>` next/script + `public/ads.txt`.
- Footer에 형제 사이트 링크(claim/finance/party.zucca100.com).
- 배포: GitHub repo → Vercel import → `anma.zucca100.com` DNS(CNAME) — 외부 조작은 사용자 로그인 후.

## 7. 구현 순서 (개요, 상세는 implementation plan에서)

1. SPIKE: 네이버 지도 좌표 딥링크 실측.
2. finance-hub/party-zucca100 스캐폴드 복제 + globals(keep-all) + 브랜드 토큰.
3. 데이터 스크립트(targets/regions) + JSON.
4. 위치찾기 컴포넌트(geolocation + 시도 폴백).
5. 허브 + 대상4 + 가이드3 + /find + /find/[sido] + /related/maternity.
6. SEO 패키지(OG/sitemap/robots/manifest/JSON-LD/AdSense).
7. 빌드 검증 + 디자인 QA.
8. 배포(사용자 로그인 후).

## 8. 후속(딥다이브 후보)

- `/find/[sido]/[sigungu]` 시군구 ~229개 확장(현재 시도까지만).
- 대상 페이지 추가 롱테일 분화, 지역 페이지 콘텐츠 강화.
