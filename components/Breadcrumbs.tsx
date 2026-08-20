import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { Crumb } from "@/lib/breadcrumbs";

/**
 * 화면에 보이는 빵부스러기. 구조화 데이터만 넣고 화면에 없으면 구글이 무시할 수 있어
 * 반드시 함께 노출한다. 마지막 항목은 현재 위치라 링크를 걸지 않는다.
 */
export function Breadcrumbs({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <nav aria-label="현재 위치" className="mb-6">
      <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-meta text-muted">
        {crumbs.map((c, i) => {
          const last = i === crumbs.length - 1;
          return (
            <li key={c.href} className="flex items-center gap-1.5">
              {i > 0 && <ChevronRight size={15} className="text-border" aria-hidden />}
              {last ? (
                <span aria-current="page" className="font-semibold text-foreground">
                  {c.name}
                </span>
              ) : (
                <Link href={c.href} className="inline-block py-1 underline underline-offset-2 hover:text-link">
                  {c.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
