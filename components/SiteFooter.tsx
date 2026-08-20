import Link from "next/link";
import { HandHelping } from "lucide-react";
import { SITE } from "@/lib/site";

const SITE_LINKS = [
  { label: "어르신 안마바우처", href: "/target/senior" },
  { label: "장애인 안마바우처", href: "/target/disabled" },
  { label: "안마바우처 신청방법", href: "/guide/apply" },
  { label: "신청기간·재신청", href: "/guide/period" },
  { label: "가이드 전체보기", href: "/guide" },
  { label: "본인부담금·횟수", href: "/guide/cost" },
  { label: "가까운 안마원 찾기", href: "/find" },
];

const PORTFOLIO_LINKS = [
  { label: "청구친구 · 보험금청구 바로가기", href: "https://claim.zucca100.com" },
  { label: "금융바로 · 금융기관 바로가기", href: "https://finance.zucca100.com" },
  { label: "정당창구 · 입당·탈당 안내", href: "https://party.zucca100.com" },
];

const linkClass =
  "flex min-h-[44px] items-center text-caption font-semibold text-muted underline underline-offset-2 transition-colors hover:text-link";

export function SiteFooter() {
  return (
    <footer className="mt-12 border-t border-border">
      <div className="mx-auto max-w-4xl px-6 py-10">
        <div className="flex items-center gap-2.5 text-meta font-extrabold">
          <span className="flex h-7 w-7 items-center justify-center rounded-md bg-primary text-on-primary">
            <HandHelping size={15} strokeWidth={2.5} aria-hidden />
          </span>
          {SITE.name}
        </div>

        <nav className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2">
          <div>
            <p className="mb-2 text-caption font-bold text-foreground">이 사이트</p>
            <ul>
              {SITE_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={linkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mb-2 text-caption font-bold text-foreground">함께 보면 좋은 바로가기</p>
            <ul>
              {PORTFOLIO_LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className={linkClass}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        <div className="mt-8 border-t border-border pt-6">
          <p className="text-caption text-muted">
            정부·지자체의 안마바우처(시각장애인 안마서비스) 제도를 안내하는 정보 제공
            서비스입니다. 특정 안마원을 추천하거나 예약·결제를 대행하지 않으며, 본인부담금 수납이나
            개인정보 수집을 하지 않습니다.
          </p>
          <p className="mt-3 text-caption text-muted">
            © {new Date().getFullYear()} {SITE.name} · 최종 확인 2026년 8월 · 제도 내용은 지자체별로
            다를 수 있으니 관할 읍·면·동 주민센터 안내를 기준으로 확인하세요.
          </p>
        </div>
      </div>
    </footer>
  );
}
