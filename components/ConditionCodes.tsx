import { CONDITION_GROUPS } from "@/lib/conditions";

/**
 * 질환 요건 입증에 쓰이는 질병코드 표. 진단서·소견서에 이 코드가 명시되어야 한다.
 * 지자체별 인정 범위가 다르므로 단정하지 않는 문구를 함께 둔다(스펙 §5).
 */
export function ConditionCodes({ compact = false }: { compact?: boolean }) {
  return (
    <div className="tile">
      <h3 className="text-lead font-extrabold">진단서에 필요한 질병코드</h3>
      <p className="mt-2 text-meta text-muted">
        병원(의원·정형외과·산부인과 등)에서 발급받는 진단서 또는 소견서에 아래 질병코드가
        명시되어야 질환 요건을 입증할 수 있습니다.
      </p>

      <ul className="mt-5 space-y-3">
        {CONDITION_GROUPS.map((g) => (
          <li
            key={g.code}
            className="flex flex-col gap-1 rounded-xl bg-band px-4 py-4 sm:flex-row sm:items-baseline sm:gap-4"
          >
            <span className="shrink-0 text-meta font-extrabold text-foreground sm:w-32">
              {g.label}
            </span>
            <span className="shrink-0 font-mono text-meta font-bold text-link sm:w-36">
              {g.code}
            </span>
            <span className="text-caption text-muted">{g.examples}</span>
          </li>
        ))}
      </ul>

      {!compact && (
        <p className="mt-5 text-caption text-muted">
          인정되는 질병코드의 범위와 연령 기준은 지자체마다 다를 수 있습니다. 진단서를 발급받기
          전에 관할 읍·면·동 주민센터에 어떤 코드가 인정되는지 먼저 확인하시는 것이 좋습니다.
        </p>
      )}
    </div>
  );
}
