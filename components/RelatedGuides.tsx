import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { getGuides } from "@/lib/guides";
import type { GuideSlug } from "@/lib/guides";

/**
 * 가이드 하단 상호 링크. 가이드끼리 서로 연결해 두면 사용자가 다음 단계로 이어가기도 쉽고,
 * 인덱스 한 곳에서만 링크되던 페이지들의 내부 링크가 얕아지지 않는다.
 */
export function RelatedGuides({ current }: { current: GuideSlug }) {
  const rest = getGuides().filter((g) => g.slug !== current);

  return (
    <section className="section">
      <h2 className="text-h2 font-extrabold tracking-tight">이어서 보면 좋은 안내</h2>
      <ul className="mt-4 flex flex-col gap-2">
        {rest.map((g) => (
          <li key={g.slug}>
            <Link
              href={`/guide/${g.slug}`}
              className="tile group flex min-h-12 items-center justify-between gap-3 py-4 transition-all hover:border-accent hover:shadow-md"
            >
              <span className="text-body font-extrabold">{g.title}</span>
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
