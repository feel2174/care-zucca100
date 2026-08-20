# 안마바로 (anma.zucca100.com) — 작업 핸드오프

> 다른 디바이스에서 이어서 작업하기 위한 인수인계 문서. 최종 업데이트: 2026-08-20

## 한 줄 요약

정부지원 안마바우처 안내 니치 AdSense 허브. **브레인스토밍 → 설계 스펙 → 구현 계획까지 완료**,
아직 **코드 스캐폴드/구현은 시작 전**. 이 repo에는 현재 기획 문서 2개만 있음.

## 지금까지 한 것

1. **리서치** — 안마바우처 대상별 사실관계 확정 (아래 "핵심 사실" 참고)
2. **설계 스펙** — `docs/superpowers/specs/2026-08-20-anma-hub-design.md` (승인 완료)
3. **구현 계획** — `docs/superpowers/plans/2026-08-20-anma-hub.md` (13개 태스크, 승인 완료)
4. 실행 방식: **서브에이전트 방식(태스크당 새 에이전트 + 태스크 사이 리뷰)** 선택됨

## 아직 안 한 것 (다음 할 일)

- **구현 전혀 시작 안 함.** 계획서 Task 1부터 순차 실행하면 됨.
- Task 1 = party-zucca100 복제 스캐폴드 + 브랜드 초기화 + (이미 이 repo에 git init 되어 있으니 git init 스텝은 스킵)
- 배포(GitHub는 연결됨 / Vercel·DNS·AdSense 승인)는 사용자 로그인 필요, 마지막 단계.

## 프로젝트 좌표

- 작업 폴더: `Documents/anma-hub`
- 배포 도메인(예정): `anma.zucca100.com` (zucca100 서브도메인)
- 브랜드 가칭: **안마바로**
- GitHub: `https://github.com/feel2174/anma-zucca100.git`
- 템플릿 원본: `Documents/party-zucca100` (구조·스타일 복제 기준) — **주의: 다른 디바이스에는 이 폴더가 없을 수 있음.** 없으면 `feel2174/party-zucca100.com` repo를 클론해서 참고.
- 포트폴리오 형제: claim-hub, finance-hub, party-zucca100 (모두 zucca100 서브도메인, Next.js 동일 패턴)
- AdSense 퍼블리셔: `ca-pub-9196149361612087`

## 핵심 사실 (콘텐츠 근거 — 스펙 §1)

"안마바우처"는 단일 서비스가 아니며 대상별 성격이 다름:

| 대상 | 역할 | 비고 |
|---|---|---|
| 60세↑ 어르신 | **수혜자** | 65세↑=기초연금/기초생활, 60~64세=중위140% |
| 장애인(지체·뇌병변) | **수혜자** | 연령무관, 중위140% |
| 국가유공자(상이등급) | **수혜자** | 연령무관, 중위140% |
| 시각장애인 | **제공자(안마사)** | 의료법 §82, 안마사 자격은 시각장애인만 |
| 산모 | (안마 아님) | 별도 산후도우미 사업, 보건소 신청 |

서비스: 연 48회(월4회×12개월), 회당 60분(찜질 15분 포함), 본인부담 10%(약 4,000~4,200원).
신청: 주민센터 → 국민행복카드 발급 → 시각장애인 안마시술소 예약. 지자체별 상이.

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
/related/maternity     산모=안마 아님 고지
```

## 위치찾기 (★관건)

주소·좌표 DB 구축 안 함 → 네이버 지도가 최신목록·거리순 렌더.
`navigator.geolocation` 좌표 → 네이버 지도 검색 URL 중심 파라미터 주입
(`map.naver.com/p/search/시각장애인 안마원?c={lng},{lat},15,0,0,0,dh`).
폴백 = 시도 드롭다운(= /find/[sido] 로직 재사용). 주민센터 찾기도 같은 컴포넌트 쿼리만 교체.
**계획 Task 2가 이 좌표 딥링크 포맷 실측 SPIKE** — 브라우저 확장/헤드리스로 확인 후 Task 3 구현.

## 재개 방법

1. 이 repo를 클론한 뒤 `docs/superpowers/plans/2026-08-20-anma-hub.md`를 연다.
2. superpowers:subagent-driven-development 스킬로 Task 1부터 실행(단, git init 스텝은 이미 되어 있으니 스킵, 리모트도 이미 연결됨).
3. party-zucca100 원본이 로컬에 없으면 `git clone https://github.com/feel2174/party-zucca100.com` 로 참고본 확보.

## 기술 규약 (형제 사이트 공통)

- Next.js 16 App Router + React 19 + TS + Tailwind v4
- `globals.css` body에 `word-break: keep-all; overflow-wrap: break-word;` **초기부터**. Korean 카피에 `ch` 단위 max-width 금지.
- OG 이미지 next/og → Pretendard **ttf**(woff2 불가). sitemap/robots.txt(정적,+Daum)/manifest/JSON-LD/ads.txt.
- 인증키 env: `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`, `NEXT_PUBLIC_NAVER_SITE_VERIFICATION`.
