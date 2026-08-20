import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { getTargets } from "@/lib/targets";

/**
 * 대상 페이지 하단 상호 링크. 본인이 어느 분류에 해당하는지 헷갈려서 들어온 사용자가
 * 허브로 되돌아가지 않고 바로 옆 분류를 확인할 수 있게 한다.
 * 시각장애인(제공자)은 역할이 다르므로 라벨로 구분해 표시한다.
 */
export function RelatedTargets({ current }: { current: string }) {
  const rest = getTargets().filter((t) => t.slug !== current);

  return (
    <section className="section">
      <h2 className="text-h2 font-extrabold tracking-tight">다른 대상 확인하기</h2>
      <ul className="mt-4 flex flex-col gap-2">
        {rest.map((t) => (
          <li key={t.slug}>
            <Link
              href={`/target/${t.slug}`}
              className="tile group flex min-h-12 items-center justify-between gap-3 py-4 transition-all hover:border-accent hover:shadow-md"
            >
              <span className="flex flex-wrap items-center gap-2">
                <span className="text-body font-extrabold">{t.name}</span>
                <span className="rounded-full bg-band px-2 py-0.5 text-caption font-semibold text-primary">
                  {t.role === "provider" ? "제공자(안마사)" : "수혜자"}
                </span>
              </span>
              <ChevronRight
                size={19}
                className="shrink-0 text-muted group-hover:text-link"
                aria-hidden
              />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
