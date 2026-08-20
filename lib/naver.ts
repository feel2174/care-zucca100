export type Coords = { lat: number; lng: number };

const BASE = "https://map.naver.com/p/search/";

/**
 * 네이버 지도 검색 URL. 좌표가 있으면 지도 중심을 사용자 위치로 옮긴다.
 *
 * 포맷 `?c={lng},{lat},15,0,0,0,dh` 는 2026-08-20 헤드리스 Chrome 실측으로 확정된 값이다
 * (스펙 §3.1). `c=`의 좌표는 결과 목록을 렌더하는 `#searchIframe`의 `x=`/`y=`로 그대로
 * 전달되며, 좌표를 넣지 않으면 전국 뷰가 아니라 IP 기반 위치로 센터링된다.
 *
 * 경도(lng)가 먼저다. 뒤바꿔도 URL은 정상으로 보이고 지도만 조용히 틀린 곳으로 가므로
 * `naver.test.ts`에 순서 회귀 테스트를 고정해 두었다.
 */
export function buildNaverMapUrl(query: string, coords?: Coords): string {
  const path = BASE + encodeURIComponent(query);
  if (!coords) return path;
  return `${path}?c=${coords.lng},${coords.lat},15,0,0,0,dh`;
}

/** 모바일 네이버 지도 앱 스킴. 앱 미설치 시 호출측에서 웹으로 폴백한다(미실측 — 스펙 §3.1). */
export function buildNaverAppUrl(query: string): string {
  return `navermap://search?query=${encodeURIComponent(query)}&appname=care.zucca100.com`;
}
