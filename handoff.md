# 안마바로 (care.zucca100.com) — 작업 핸드오프

> 다른 디바이스에서 이어서 작업하기 위한 인수인계 문서. 최종 업데이트: 2026-08-20 (2차 — 기획·설계 완료)

## 한 줄 요약

정부지원 안마바우처 안내 니치 AdSense 허브. **브레인스토밍 → 설계 스펙 → 구현 계획 → SPIKE 실측 →
브랜드·접근성·SEO 설계까지 완료**. 아직 **코드 스캐폴드/구현은 시작 전**. 이 repo에는 기획 문서만 있음.

## 지금까지 한 것

1. **리서치** — 안마바우처 대상별 사실관계 확정 (아래 "핵심 사실" 참고)
2. **설계 스펙** — `docs/superpowers/specs/2026-08-20-anma-hub-design.md` (승인 완료)
3. **구현 계획** — `docs/superpowers/plans/2026-08-20-anma-hub.md` (승인 완료)
4. **(2차) SPIKE 실측 완료** — 네이버 지도 좌표 딥링크 포맷 확정. Task 2는 **재실행 불필요**.
5. **(2차) party-zucca100 실구조 대조** — 계획서의 실행 불가 항목 6건 수정(아래 참고)
6. **(2차) 설계 공백 보강** — 스펙에 §9 브랜드/디자인 토큰, §10 접근성, §11 키워드 매핑,
   §12 이미지·OG·파비콘·검색썸네일 신설
7. 실행 방식: **서브에이전트 방식(태스크당 새 에이전트 + 태스크 사이 리뷰)** 선택됨

## 아직 안 한 것 (다음 할 일)

- **구현 전혀 시작 안 함.** 계획서 Task 1부터 순차 실행하면 됨 (Task 2는 완료 상태로 스킵).
- 태스크는 총 15개(1~13 + 12B + 12C). 12B/12C가 이번에 새로 추가된 SEO 이미지 작업.
- 배포(Vercel·DNS·AdSense 승인)는 사용자 로그인 필요, 마지막 단계.

## 프로젝트 좌표

- 작업 폴더: `~/Downloads/anma-zucca100` (macOS) — git init·리모트 연결 **완료**
- 템플릿 원본: `~/Downloads/party-zucca100.com` — 없으면 `git clone https://github.com/feel2174/party-zucca100.com`
- 배포 도메인: **`care.zucca100.com`** (확정 2026-08-20 — `anma`는 업소 오인·광고 브랜드안전 리스크로 회피. 스펙 §12.4)
- 브랜드 가칭: **안마바로**
- GitHub: `https://github.com/feel2174/anma-zucca100.git`
- 포트폴리오 형제: claim-hub, finance-hub, party-zucca100 (모두 zucca100 서브도메인, Next.js 동일 패턴)
- AdSense 퍼블리셔: `ca-pub-9196149361612087` / Taboola: `zucca-network` (네트워크 단위, 재사용 가능)
- 로컬 환경 확인됨: Node **v24.16.0**(`.ts` 직접 실행 가능), npm 11.13.0, `python3` 3.9.6
  (**`python` 바이너리는 없음** — 계획서는 `python3`로 수정됨), Chrome 설치됨(썸네일 생성에 사용)

## 핵심 사실 (콘텐츠 근거 — 스펙 §1)

"안마바우처"는 단일 서비스가 아니며 대상별 성격이 다름:

| 대상 | 역할 | 비고 |
|---|---|---|
| 60세↑ 어르신 | **수혜자** | 65세↑=기초연금/기초생활, 60~64세=중위140% |
| 장애인(지체·뇌병변) | **수혜자** | 연령무관, 중위140% |
| 국가유공자(상이등급) | **수혜자** | 연령무관, 중위140% |
| 시각장애인 | **제공자(안마사)** | 의료법 §82, 안마사 자격은 시각장애인만 |
| 산모 | **조건부 수혜자** | 신분이 아니라 **질환 입증**으로 판단 — 아래 참고 |

서비스: 연 48회(월4회×12개월), 회당 60분(찜질 15분 포함), 본인부담 10%(약 4,000~4,200원).
신청: 주민센터 → 국민행복카드 발급 → 시각장애인 안마시술소 예약. 지자체별 상이.

### 질환 요건 = 자격의 실제 축 (2026-08-20 정정)

진단서·소견서에 아래 질병코드가 명시되어야 한다.

| 분류 | 코드 | 예시 |
|---|---|---|
| 근골격계 | `M00~M99` | 관절염, 디스크, 오십견, 골반통 |
| 신경계 | `G00~G99` | 신경통, 뇌졸중 후유증 |
| 순환계 | `I00~I99` | 고혈압, 대사증후군 |
| 기타 | `R81`, `E10~E14` | 요단백, 당뇨 |

**산모 정정**: 초기 스펙의 "산모 = 대상 아님" 단정은 철회됨. 산모라는 이유만으로 대상이 되진
않지만 산후 근골격계 질환을 입증하면 만 60세 미만이라도 신청 가능한 지자체가 있다.
근거가 개인 블로그라 **"산모 전용 제도가 있다"고 쓰지 않고 조건부로만 서술**한다.
분기 재검증 시 지자체 공고문 교차확인 필요. (스펙 §1.1)

## 페이지 구조 (27개 정적)

```
/                      허브(대상 4카드 + 위치찾기 CTA + 산모배너)
/target/senior         60세↑ 어르신
/target/disabled       장애인
/target/veteran        국가유공자
/target/blind          시각장애인 = "당신은 제공자" 오해교정
/guide/apply           신청방법
/guide/cost            본인부담금·횟수·시간
/guide/card            국민행복카드
/find                  위치찾기 허브
/find/[sido]           시도 17개 (시군구는 후속 딥다이브)
/related/maternity     산모=안마 아님 고지 (+ "출산 안마바우처" 키워드 오해교정)
```

## 위치찾기 — SPIKE 완료, 포맷 확정

**확정 템플릿**: `https://map.naver.com/p/search/{encodeURIComponent(query)}?c={lng},{lat},15,0,0,0,dh`

헤드리스 Chrome 실측으로 `c=`의 좌표가 검색 iframe의 `x`/`y`로 그대로 전달됨을 확인(강남/부산 대조).
**경도(lng)가 먼저** — 뒤바꿔도 URL은 멀쩡해 보이므로 유닛테스트로 순서를 고정함.
쿼리 독립적이라 안마원/주민센터/보건소에 빌더 하나 재사용. 좌표 없으면 IP 기반 위치로 폴백되지만
부정확하므로 시도 셀렉터 폴백은 유지. 모바일 앱스킴은 미실측(배포 후 실기기 확인).
자세한 내용은 계획서 하단 "## SPIKE 결과" 및 스펙 §3.1.

## 2차 작업에서 잡은 계획서 오류 6건 (모두 수정 완료)

1. 전 태스크가 Windows 경로(`C:\Users\devzu\...`) 기준 → macOS 경로로 이식
2. Task 1의 rsync가 **party의 설계 스펙 문서까지 복사** → `--exclude docs` 추가
3. `python scripts/...` → 이 환경엔 `python`이 없음 → `python3`
4. Task 3이 `from "./naver.ts"`로 import하는데 tsconfig에 `allowImportingTsExtensions`가 없어
   **Task 4의 `tsc --noEmit`이 확실히 깨짐** → Task 1에 추가 스텝 신설
5. Task 1이 `Disclaimer.tsx`를 지우고 Task 6이 다시 만듦 → 삭제 취소
6. Task 12가 `app/robots.ts` 삭제를 지시하나 party엔 그 파일이 없음 → 지시 제거

## 이번에 확정된 설계 결정

- **팔레트**: party 네이비/블루를 쓰지 않고 안마바로 전용(딥 틸 `#0f3d3e` / 돌봄 그린 `#0d7f6e` /
  링크 `#095a4d`). 솔리드 CTA 배경은 `accent`가 아니라 **`primary`**(accent는 4.91:1로 AAA 미달). 스펙 §9
- **접근성**: 고령자 기준 상향 — 본문 18px, 최소 글자 14px, 터치타깃 48×48px, 본문 대비 AAA,
  링크 상시 밑줄, 색 단독 인코딩 금지. 스펙 §10
- **Taboola 유지** (party와 동일 구성, `zucca-network` 재사용). `@vercel/analytics`도 유지. 스펙 §6
- **키워드 1:1 배정**으로 자기잠식 방지. "출산 안마바우처"는 존재하지 않는 제도이므로
  `/related/maternity`에서 **오해교정 방식**으로만 잡음(허위 유도 문구 금지). 스펙 §11
- **이미지 2트랙**: 공유용 OG(텍스트 큼, 27개 고유) / 검색썸네일용 대표이미지(텍스트 최소,
  10유형×3비율=30개). 구글이 schema·og 이미지에 "텍스트·로고 회피"를 권고하는 것과
  카톡 공유용 OG 요구가 충돌하기 때문. 스펙 §12
- **파비콘 96×96** (구글 요건: 정사각·최소 8px·48px보다 크게 권장·URL 안정). party의 32×32는 권장 미달

## 재개 방법

1. 이 repo를 클론한 뒤 `docs/superpowers/plans/2026-08-20-anma-hub.md`를 연다.
2. superpowers:subagent-driven-development 스킬로 **Task 1부터** 실행.
   - git init 스텝 없음(이미 초기화·리모트 연결됨)
   - **Task 2는 완료 상태 — 스킵**
3. party-zucca100 원본이 로컬에 없으면 `git clone https://github.com/feel2174/party-zucca100.com` 로 참고본 확보.
4. 서브도메인은 `care.zucca100.com`로 확정됨(계획서 "확정 결정 로그").

## 기술 규약 (형제 사이트 공통)

- Next.js 16 App Router + React 19 + TS + Tailwind v4
- `globals.css` body에 `word-break: keep-all; overflow-wrap: break-word;` **초기부터**. Korean 카피에 `ch` 단위 max-width 금지.
- OG 이미지 next/og → Pretendard **ttf**(woff2 불가 / party엔 `pt-extrabold.ttf`·`pt-medium.ttf`만 ttf로 존재).
  sitemap/robots.txt(정적,+Daum)/manifest/JSON-LD/ads.txt.
- 인증키 env: `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`, `NEXT_PUBLIC_NAVER_SITE_VERIFICATION`.
