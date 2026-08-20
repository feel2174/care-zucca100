import Link from "next/link";
import { ChevronRight, HeartHandshake, Accessibility, Medal, Info } from "lucide-react";
import type { Target, TargetSlug } from "@/lib/types";

const ICON: Record<TargetSlug, React.ReactNode> = {
  senior: <HeartHandshake size={22} strokeWidth={2.2} aria-hidden />,
  disabled: <Accessibility size={22} strokeWidth={2.2} aria-hidden />,
  veteran: <Medal size={22} strokeWidth={2.2} aria-hidden />,
  blind: <Info size={22} strokeWidth={2.2} aria-hidden />,
};

/**
 * 역할 뱃지. 시각장애인=제공자라는 구분이 이 사이트의 핵심 오해교정 장치이므로
 * 색만으로 구분하지 않고 색 + 아이콘 + 텍스트 라벨 3중으로 인코딩한다(스펙 §10.2).
 */
function RoleBadge({ role }: { role: Target["role"] }) {
  const isProvider = role === "provider";
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-caption font-bold ${
        isProvider ? "bg-primary text-on-primary" : "bg-band text-link"
      }`}
    >
      {isProvider ? (
        <>
          <Info size={14} strokeWidth={2.6} aria-hidden />
          제공자(안마사)
        </>
      ) : (
        <>
          <HeartHandshake size={14} strokeWidth={2.6} aria-hidden />
          수혜 대상
        </>
      )}
    </span>
  );
}

export function TargetCards({ targets }: { targets: Target[] }) {
  return (
    <div className="grid-cards sm:grid-cols-2">
      {targets.map((t) => (
        <Link
          key={t.slug}
          href={`/target/${t.slug}`}
          className="tile group flex flex-col transition-all duration-150 hover:-translate-y-0.5 hover:border-accent hover:shadow-md"
        >
          <span className="flex items-center justify-between">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-band text-accent">
              {ICON[t.slug]}
            </span>
            <ChevronRight size={20} className="text-muted group-hover:text-link" aria-hidden />
          </span>
          <span className="mt-4 flex flex-wrap items-center gap-2">
            <span className="text-lead font-extrabold">{t.name}</span>
            <RoleBadge role={t.role} />
          </span>
          <span className="mt-2 text-meta text-muted">{t.summary}</span>
        </Link>
      ))}
    </div>
  );
}
