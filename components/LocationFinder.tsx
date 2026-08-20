"use client";

import { useState } from "react";
import { MapPin, Navigation, Loader2 } from "lucide-react";
import { buildNaverMapUrl } from "@/lib/naver";
import { getSidos } from "@/lib/regions";

type Status = "idle" | "locating" | "denied";

/**
 * 내 위치 기준으로 네이버 지도를 여는 CTA + 시도 선택 폴백.
 *
 * 좌표·주소 DB를 만들지 않고 네이버 지도가 최신 목록을 거리순으로 렌더하게 맡긴다(스펙 §3).
 * 권한 거부·실패 시 시도 그리드로 폴백하며, `query`만 바꾸면 안마원/주민센터/보건소에
 * 그대로 재사용된다.
 */
export function LocationFinder({
  query,
  label,
  broadQuery,
}: {
  query: string;
  label: string;
  /**
   * 더 넓게 보기용 보조 검색어. 실측(2026-08-20, 강남 기준)에서 "시각장애인 안마원"은
   * 24개, "안마원"은 50개가 나왔다. 좁은 쿼리가 결과를 절반으로 줄이지만, 넓은 쿼리에는
   * 피부·체형관리 업소가 8곳 섞인다. 어느 쪽도 바우처 제공기관을 걸러내지는 못하므로
   * (상호에 '시각장애인'이 들어간 곳은 양쪽 다 0개) 둘 다 제공하고 선택은 사용자에게 맡긴다.
   */
  broadQuery?: string;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const sidos = getSidos();
  // 실측(2026-08-20): 지역명 텍스트 + "시각장애인" 조합은 결과가 0~3개로 사실상 비어 있다
  // (제주 0, 세종 0, 전남 1, 서울 3). 반면 지역명 + "안마원"은 전국에서 정상(서울 50,
  // 제주 20, 세종 3, 강원 33). "시각장애인" 접두어는 좌표 검색에서만 유효하다.
  const regionQuery = broadQuery ?? query;

  function openNearby() {
    if (!("geolocation" in navigator)) {
      setStatus("denied");
      return;
    }
    setStatus("locating");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const url = buildNaverMapUrl(query, {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
        setStatus("idle");
        // 지도 링크는 같은 탭 이동(포트폴리오 관례 — _blank 미적용)
        window.location.href = url;
      },
      () => setStatus("denied"),
      { enableHighAccuracy: true, timeout: 8000 }
    );
  }

  return (
    <div className="tile">
      <button
        type="button"
        onClick={openNearby}
        disabled={status === "locating"}
        className="inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 text-body font-bold text-on-primary transition-opacity hover:opacity-90 disabled:opacity-60"
      >
        {status === "locating" ? (
          <Loader2 size={19} className="animate-spin" aria-hidden />
        ) : (
          <Navigation size={19} aria-hidden />
        )}
        내 위치로 {label} 찾기
      </button>
      <p className="mt-3 text-caption text-muted">
        버튼을 누르면 브라우저가 위치 사용 권한을 물어봅니다. 위치는 지도 검색에만 쓰이며
        저장하지 않습니다.
      </p>

      {broadQuery && (
        <p className="mt-3 text-caption text-muted">
          찾는 곳이 적게 나오나요?{" "}
          <a
            href={buildNaverMapUrl(broadQuery)}
            className="font-semibold text-link underline underline-offset-2"
          >
            &lsquo;{broadQuery}&rsquo;로 더 넓게 검색
          </a>
          해 보세요. 다만 바우처가 적용되지 않는 곳도 함께 나오므로, 방문 전 전화로 안마바우처
          제공기관인지 확인하시는 것이 좋습니다.
        </p>
      )}

      {status === "denied" && (
        <p className="mt-4 rounded-xl bg-band px-4 py-3 text-meta text-foreground">
          위치 접근을 사용할 수 없습니다. 아래에서 지역을 선택해 주세요.
        </p>
      )}

      <div className="mt-6 border-t border-border pt-6">
        <p className="mb-3 flex items-center gap-1.5 text-meta font-semibold text-muted">
          <MapPin size={16} className="text-accent" aria-hidden /> 지역으로 찾기
        </p>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {sidos.map((s) => (
            <a
              key={s.slug}
              href={buildNaverMapUrl(`${s.name} ${regionQuery}`)}
              className="flex min-h-[48px] items-center justify-center rounded-lg bg-band px-3 text-center text-meta font-semibold text-foreground transition-colors hover:text-link"
            >
              {s.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
