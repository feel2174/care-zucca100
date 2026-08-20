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
export function LocationFinder({ query, label }: { query: string; label: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const sidos = getSidos();

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
              href={buildNaverMapUrl(`${s.name} ${query}`)}
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
