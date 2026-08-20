import Link from "next/link";
import { HandHelping } from "lucide-react";
import { SITE } from "@/lib/site";

const NAV = [
  { label: "대상별 안내", href: "/#targets" },
  { label: "신청방법", href: "/guide/apply" },
  { label: "위치찾기", href: "/find" },
];

export function SiteHeader() {
  return (
    <header className="mx-auto flex w-full max-w-4xl items-center justify-between gap-4 px-6 py-4">
      <Link
        href="/"
        className="flex min-h-[48px] items-center gap-2.5 text-lead font-extrabold tracking-tight"
      >
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-on-primary">
          <HandHelping size={18} strokeWidth={2.5} aria-hidden />
        </span>
        {SITE.name}
      </Link>
      <nav className="hidden items-center gap-1 sm:flex">
        {NAV.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex min-h-[48px] items-center rounded-lg px-3 text-meta font-semibold text-muted hover:bg-band hover:text-foreground"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
