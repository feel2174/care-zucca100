import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, FileText } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Disclaimer } from "@/components/Disclaimer";
import { getGuides } from "@/lib/guides";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "안마바우처 가이드 — 신청부터 재신청까지 전 과정",
  description:
    "정부지원 안마바우처의 신청방법, 신청기간, 본인부담금, 국민행복카드 발급, 재신청, 잔여 횟수 확인까지 단계별로 정리한 안내 모음입니다.",
  keywords: ["안마바우처 가이드", "안마바우처 신청 안내", "안마바우처 총정리"],
  alternates: { canonical: "/guide" },
  openGraph: {
    title: "안마바우처 가이드 | 안마바로",
    description: "신청방법부터 재신청·잔여횟수 확인까지 단계별 안내",
    url: `${SITE.url}/guide`,
  },
};

export default function GuideIndexPage() {
  const guides = getGuides();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "안마바우처 가이드",
    itemListElement: guides.map((g, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: g.title,
      url: `${SITE.url}/guide/${g.slug}`,
    })),
  };

  return (
    <>
      <SiteHeader />

      <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-10">
        <h1 className="text-h1 font-extrabold tracking-tight text-primary sm:text-h1lg">
          안마바우처 가이드
        </h1>
        <p className="mt-6 text-body">
          정부지원 안마바우처는 신청부터 이용, 재신청까지 단계가 나뉘어 있고 지자체마다
          운영 방식이 조금씩 다릅니다. 필요한 단계부터 확인하세요.
        </p>

        {/* 검색 썸네일 후보로 크롤러가 안정적인 URL을 보게 해야 하므로 next/image가 아닌
            평문 img를 쓴다(스펙 §12.3). */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/thumb/guide-hub-16x9.png"
          alt="안마바우처 신청 가이드 모음"
          width={1200}
          height={675}
          className="mt-8 w-full max-w-sm rounded-2xl border border-border"
        />

        <section className="section mt-10">
          <h2 className="text-h2 font-extrabold tracking-tight">단계별 안내</h2>
          <div className="grid-cards">
            {guides.map((g) => (
              <Link
                key={g.slug}
                href={`/guide/${g.slug}`}
                className="tile group flex items-start gap-4 transition-all hover:-translate-y-0.5 hover:border-accent hover:shadow-md"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-band text-accent">
                  <FileText size={20} strokeWidth={2.2} aria-hidden />
                </span>
                <span className="flex-1">
                  <span className="flex items-center justify-between gap-2">
                    <span className="text-lead font-extrabold">{g.title}</span>
                    <ChevronRight
                      size={19}
                      className="shrink-0 text-muted group-hover:text-link"
                      aria-hidden
                    />
                  </span>
                  <span className="mt-1 block text-meta text-muted">{g.description}</span>
                </span>
              </Link>
            ))}
          </div>
        </section>

        <p className="mt-12 text-meta text-muted">
          내가 대상인지부터 확인하시려면{" "}
          <Link href="/#targets" className="font-semibold text-link underline underline-offset-2">
            대상별 안내
          </Link>
          를, 이용할 곳을 찾으시려면{" "}
          <Link href="/find" className="font-semibold text-link underline underline-offset-2">
            이용처 찾기
          </Link>
          를 참고하세요.
        </p>

        <Disclaimer />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </main>

      <SiteFooter />
    </>
  );
}
