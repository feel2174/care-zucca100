import { test } from "node:test";
import assert from "node:assert/strict";
import { buildNaverMapUrl, buildNaverAppUrl } from "./naver.ts";

test("좌표 없으면 순수 검색 URL", () => {
  const url = buildNaverMapUrl("시각장애인 안마원");
  assert.equal(
    url,
    "https://map.naver.com/p/search/" + encodeURIComponent("시각장애인 안마원")
  );
});

test("좌표 있으면 중심 파라미터(c=lng,lat,...) 주입", () => {
  const url = buildNaverMapUrl("시각장애인 안마원", { lat: 37.4979, lng: 127.0276 });
  assert.ok(url.includes("map.naver.com/p/search/"));
  assert.ok(url.includes("c=127.0276,37.4979,15,0,0,0,dh"), url);
});

test("쿼리는 URL 인코딩된다", () => {
  const url = buildNaverMapUrl("강남구 주민센터");
  assert.ok(!url.includes(" "));
  assert.ok(url.includes(encodeURIComponent("강남구 주민센터")));
});

test("앱 스킴은 navermap://search?query=", () => {
  const url = buildNaverAppUrl("시각장애인 안마원");
  assert.ok(url.startsWith("navermap://search?query="));
  assert.ok(url.includes(encodeURIComponent("시각장애인 안마원")));
});

// SPIKE에서 확인된 가장 위험한 실수: lat/lng 순서를 뒤바꿔도 URL은 멀쩡해 보이고
// 지도만 조용히 엉뚱한 곳(부산 좌표를 서울에 넣는 식)으로 간다. 순서를 고정한다.
test("좌표 순서는 경도(lng)가 먼저다", () => {
  const url = buildNaverMapUrl("안마원", { lat: 35.1796, lng: 129.0756 });
  assert.ok(url.includes("c=129.0756,35.1796,"), url);
  assert.ok(!url.includes("c=35.1796,129.0756,"), "lat/lng이 뒤바뀜");
});
