import Link from "next/link";
import { MapPin } from "lucide-react";
import { getSidos } from "@/lib/regions";

/**
 * 시도 타일 그리드. /find 허브와 지역 페이지가 같은 마크업을 쓴다.
 * 타일 하나가 48px 이상이어야 한다(스펙 §10) — 17개가 한 화면에 들어가는 가장 촘촘한 곳이라
 * 여기서 규격이 깨지면 사이트 전체에서 깨진다.
 */
export function SidoGrid({ exclude }: { exclude?: string }) {
  const sidos = getSidos().filter((s) => s.slug !== exclude);

  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
      {sidos.map((s) => (
        <Link
          key={s.slug}
          href={`/find/${s.slug}`}
          className="tile flex min-h-[48px] items-center gap-2 tile-tight text-meta font-semibold transition-all hover:-translate-y-0.5 hover:border-accent"
        >
          <MapPin size={15} className="text-accent" aria-hidden />
          {s.name}
        </Link>
      ))}
    </div>
  );
}
