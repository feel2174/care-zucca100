import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { LocationFinder } from "@/components/LocationFinder";
import { Disclaimer } from "@/components/Disclaimer";
import { SidoGrid } from "@/components/SidoGrid";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { trail, breadcrumbJsonLd } from "@/lib/breadcrumbs";

export const metadata: Metadata = {
  title: "시각장애인 안마원 찾기 — 내 위치·지역별 안마바우처 이용처",
  description:
    "안마바우처를 이용할 수 있는 시각장애인 안마원을 내 위치 기준으로 찾아보세요. 지역을 선택해 네이버 지도에서 바로 확인할 수 있습니다.",
  keywords: ["시각장애인 안마원", "안마바우처 이용처", "안마원 찾기"],
  alternates: { canonical: "/find" },
};

export default function FindPage() {

  const crumbs = trail({ name: "이용처 찾기", href: "/find" });

  return (
    <>
      <SiteHeader />

      <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-10">
        <Breadcrumbs crumbs={crumbs} />

        <h1 className="text-h1 font-extrabold tracking-tight text-primary sm:text-h1lg">
          시각장애인 안마원 찾기
        </h1>
        <p className="mt-4 text-body">
          안마바우처는 바우처 제공기관으로 등록된 시각장애인 안마시술소에서 이용할 수 있습니다.
          이 사이트는 별도의 업체 목록을 두지 않고 네이버 지도의 최신 검색 결과로 연결합니다.
        </p>

        {/* 검색 썸네일 후보로 크롤러가 안정적인 URL을 보게 해야 하므로 next/image가 아닌
          평문 img를 쓴다(스펙 §12.3). next/image는 /_next/image?url=... 로 재작성한다. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/thumb/find-16x9.png"
          alt="지역별 시각장애인 안마원 찾기 안내"
          width={1200}
          height={675}
          className="mt-8 w-full max-w-sm rounded-2xl border border-border"
        />

        <section className="section">
          <h2 className="text-h2 font-extrabold tracking-tight">안마원 찾기</h2>
          <LocationFinder query="시각장애인 안마원" label="안마원" broadQuery="안마원" />
        </section>

        <section className="section">
          <h2 className="text-h2 font-extrabold tracking-tight">
            신청할 주민센터 찾기
          </h2>
          <LocationFinder query="주민센터" label="주민센터" />
        </section>

        <section className="section">
          <h2 className="text-h2 font-extrabold tracking-tight">지역별 안내</h2>
          <SidoGrid />
        </section>

        <Disclaimer />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(crumbs)) }}
        />
      </main>

      <SiteFooter />
    </>
  );
}
