import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "페이지를 찾을 수 없습니다",
  robots: { index: false, follow: true },
};

const LINKS = [
  { label: "내가 대상인지 확인하기", href: "/#targets", sub: "어르신·장애인·국가유공자·시각장애인" },
  { label: "안마바우처 신청방법", href: "/guide/apply", sub: "주민센터 → 국민행복카드 → 예약" },
  { label: "가이드 전체보기", href: "/guide", sub: "신청기간·비용·재신청·잔여횟수" },
  { label: "이용처 찾기", href: "/find", sub: "내 위치·지역별 안마원" },
];

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-10">
        <h1 className="text-h1 font-extrabold tracking-tight text-primary sm:text-h1lg">
          페이지를 찾을 수 없습니다
        </h1>
        <p className="mt-6 text-body">
          주소가 바뀌었거나 잘못 입력되었을 수 있습니다. 아래에서 찾으시는 내용을 이어서
          확인해 보세요.
        </p>
        <div className="grid-cards mt-8">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="tile transition-all hover:-translate-y-0.5 hover:border-accent hover:shadow-md"
            >
              <span className="text-lead font-extrabold">{l.label}</span>
              <span className="mt-1 block text-meta text-muted">{l.sub}</span>
            </Link>
          ))}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
