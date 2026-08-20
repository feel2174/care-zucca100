import Link from "next/link";
import { Vote } from "lucide-react";
import { SITE } from "@/lib/site";

const SITE_LINKS = [
  { label: "원내정당 입당·탈당 안내", href: "/?wing=원내#explorer" },
  { label: "원외정당 입당·탈당 안내", href: "/?wing=원외#explorer" },
  { label: "탈당·입당 가이드", href: "/guide" },
  { label: "당비 자동이체 해지 방법", href: "/guide/dues-cancel" },
];

const PORTFOLIO_LINKS = [
  { label: "청구친구 · 보험금청구 바로가기", href: "https://claim.zucca100.com" },
  { label: "금융바로 · 금융기관 바로가기", href: "https://finance.zucca100.com" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-4xl px-6 py-9">
        <div className="mb-2 flex items-center gap-2 text-[15px] font-extrabold">
          <span className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-on-primary">
            <Vote size={13} strokeWidth={2.5} />
          </span>
          {SITE.name}
        </div>

        <nav className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <p className="mb-2 text-[12.5px] font-bold text-muted">이 사이트</p>
            <ul className="space-y-1.5">
              {SITE_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[13px] font-semibold text-muted transition-colors hover:text-accent"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mb-2 text-[12.5px] font-bold text-muted">함께 보면 좋은 바로가기</p>
            <ul className="space-y-1.5">
              {PORTFOLIO_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-[13px] font-semibold text-muted transition-colors hover:text-accent"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        <p className="mt-6 text-[12.5px] leading-[1.7] text-muted">
          국내 정당의 입당·탈당 절차를 중립적으로 정리해 공식 페이지로 연결하는 정보 제공
          서비스입니다. 특정 정당을 지지·반대하지 않으며, 당비·후원금 수납이나 개인정보 수집을
          하지 않습니다.
        </p>
        <p className="mt-2 text-[12.5px] text-muted">
          © {new Date().getFullYear()} {SITE.name} · 최신 정보는 각 정당의 공식 안내를 기준으로
          확인하세요.
        </p>
      </div>
    </footer>
  );
}
