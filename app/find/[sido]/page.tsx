import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MapPin, Building2 } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Disclaimer } from "@/components/Disclaimer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { trail, breadcrumbJsonLd } from "@/lib/breadcrumbs";
import { getSido, getSidos } from "@/lib/regions";
import { buildNaverMapUrl } from "@/lib/naver";
import { SITE } from "@/lib/site";

export function generateStaticParams() {
  return getSidos().map((s) => ({ sido: s.slug }));
}

/** 자치구/시·군 구성에 따라 문장이 달라지도록 — 지역마다 실제로 다른 설명이 나온다. */
function composition(name: string, sigungu: string[]) {
  const gu = sigungu.filter((x) => x.endsWith("구")).length;
  const si = sigungu.filter((x) => x.endsWith("시")).length;
  const gun = sigungu.filter((x) => x.endsWith("군")).length;
  const parts: string[] = [];
  if (gu) parts.push(`${gu}개 자치구`);
  if (si) parts.push(`${si}개 시`);
  if (gun) parts.push(`${gun}개 군`);
  return { gu, si, gun, label: parts.join(" · "), total: sigungu.length };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ sido: string }>;
}): Promise<Metadata> {
  const { sido } = await params;
  const s = getSido(sido);
  if (!s) return {};
  const c = composition(s.name, s.sigungu);
  const title = `${s.name} 시각장애인 안마원 — 안마바우처 이용처 찾기`;
  const description = c.total
    ? `${s.name} ${c.label}별로 시각장애인 안마원과 신청처인 주민센터를 지도에서 확인하세요. 정부지원 안마바우처는 연 48회, 회당 60분, 본인부담 10%로 이용합니다.`
    : `${s.name}에서 시각장애인 안마원과 신청처인 주민센터를 지도에서 확인하세요. 정부지원 안마바우처는 연 48회, 회당 60분, 본인부담 10%로 이용합니다.`;
  return {
    title,
    description,
    keywords: [`${s.name} 시각장애인 안마원`, `${s.name} 안마바우처`, `${s.name} 안마바우처 신청`],
    alternates: { canonical: `/find/${s.slug}` },
    openGraph: { title: `${title} | ${SITE.name}`, description, url: `${SITE.url}/find/${s.slug}` },
    twitter: { card: "summary_large_image", title: `${title} | ${SITE.name}`, description },
  };
}

export default async function SidoPage({ params }: { params: Promise<{ sido: string }> }) {
  const { sido } = await params;
  const s = getSido(sido);
  if (!s) notFound();

  const c = composition(s.name, s.sigungu);

  const links = [
    {
      href: buildNaverMapUrl(`${s.name} 안마원`),
      icon: <MapPin size={20} strokeWidth={2.2} aria-hidden />,
      title: `${s.name} 안마원 보기`,
      sub: "네이버 지도에서 최신 목록과 연락처를 확인할 수 있습니다. 바우처 적용 여부는 방문 전 전화로 확인하세요.",
    },
    {
      href: buildNaverMapUrl(`${s.name} 주민센터`),
      icon: <Building2 size={20} strokeWidth={2.2} aria-hidden />,
      title: `${s.name} 주민센터 보기`,
      sub: "안마바우처 신청은 주소지 관할 읍·면·동 주민센터에서 합니다.",
    },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `${s.name} 시각장애인 안마원 찾기`,
    url: `${SITE.url}/find/${s.slug}`,
    inLanguage: "ko",
    about: { "@type": "GovernmentService", name: "시각장애인 안마서비스 바우처", areaServed: s.name },
    image: [
      `${SITE.url}/thumb/find-1x1.png`,
      `${SITE.url}/thumb/find-4x3.png`,
      `${SITE.url}/thumb/find-16x9.png`,
    ],
  };

  const crumbs = trail(
    { name: "이용처 찾기", href: "/find" },
    { name: s.name, href: `/find/${s.slug}` },
  );

  return (
    <>
      <SiteHeader />

      <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-10">
        <Breadcrumbs crumbs={crumbs} />

        <h1 className="text-h1 font-extrabold tracking-tight text-primary sm:text-h1lg">
          {s.name} 시각장애인 안마원 찾기
        </h1>

        <p className="mt-6 text-body">
          {c.total > 0 ? (
            <>
              {s.name}는 {c.label}로 이루어져 있습니다. 안마바우처는 지자체가 운영하는
              사업이라 {c.gu > 0 ? "자치구" : "시·군"}마다 신청 기간과 인정 서류가 다를 수
              있으므로, 아래에서 본인 주소지를 찾아 확인하시는 것이 정확합니다.
            </>
          ) : (
            <>
              {s.name}는 하위 자치단체가 없는 단층제 광역시입니다. 시 전체가 하나의
              기준으로 운영되므로 읍·면·동 주민센터에서 바로 확인하실 수 있습니다.
            </>
          )}
        </p>

        {/* 검색 썸네일 후보로 크롤러가 안정적인 URL을 보게 해야 하므로 next/image가 아닌
            평문 img를 쓴다(스펙 §12.3). next/image는 /_next/image?url=... 로 재작성한다. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/thumb/find-16x9.png"
          alt={`${s.name} 시각장애인 안마원 찾기 안내`}
          width={1200}
          height={675}
          className="mt-8 w-full max-w-sm rounded-2xl border border-border"
        />

        <section className="section mt-10">
          <h2 className="text-h2 font-extrabold tracking-tight">{s.name} 전체에서 찾기</h2>
          <div className="grid-cards">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="tile flex items-start gap-4 transition-all hover:-translate-y-0.5 hover:border-accent hover:shadow-md"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-band text-accent">
                  {l.icon}
                </span>
                <span>
                  <span className="text-lead font-extrabold">{l.title}</span>
                  <span className="mt-1 block text-meta text-muted">{l.sub}</span>
                </span>
              </a>
            ))}
          </div>
        </section>

        {c.total > 0 && (
          <section className="section">
            <h2 className="text-h2 font-extrabold tracking-tight">
              {s.name} {c.gu > 0 && c.gun === 0 ? "자치구" : "시·군·구"}별로 찾기
            </h2>
            <p className="mb-4 text-body text-muted">
              주소지를 누르면 해당 지역의 시각장애인 안마원이 지도에 표시됩니다. 신청은
              안마원이 아니라 주소지 관할 주민센터에서 합니다.
            </p>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {s.sigungu.map((g) => (
                <a
                  key={g}
                  href={buildNaverMapUrl(`${s.name} ${g} 안마원`)}
                  className="flex min-h-[48px] items-center justify-center rounded-lg bg-band px-3 text-center text-meta font-semibold text-foreground transition-colors hover:text-link"
                >
                  {g}
                </a>
              ))}
            </div>
            <p className="mt-4 text-caption text-muted">
              총 {c.total}개 {c.label}. 행정구역은 변경될 수 있으며, 지역에 따라 등록된
              안마원이 없을 수도 있습니다. 그럴 때는 인접 지역으로 넓혀 검색해 보세요.
            </p>
          </section>
        )}

        <section className="section">
          <h2 className="text-h2 font-extrabold tracking-tight">{s.name} 신청 시 확인할 것</h2>
          <div className="tile">
            <ul className="list-disc space-y-3 pl-5 text-body text-muted">
              <li>
                안마바우처는 지역사회서비스투자사업으로{" "}
                <b className="text-foreground">지자체가 예산과 기준을 정합니다.</b> 같은{" "}
                {s.name} 안에서도 {c.gu > 0 && c.gun === 0 ? "자치구" : "시·군"}에 따라 신청
                기간과 인정 질병코드 범위가 다를 수 있습니다.
              </li>
              <li>
                연중 수시 접수가 아니라 특정 기간에만 받는 곳이 있습니다. 방문 전 주민센터에
                전화로 접수 기간을 확인하시는 것이 좋습니다.
              </li>
              <li>
                이용할 안마원이 <b className="text-foreground">바우처 제공기관으로 등록된 곳인지</b>{" "}
                예약 전에 확인하세요. 지도 검색 결과에는 바우처가 적용되지 않는 곳도 함께 나옵니다.
              </li>
            </ul>
          </div>
        </section>

        <p className="mt-12 text-meta text-muted">
          <Link href="/#targets" className="font-semibold text-link underline underline-offset-2">
            내가 대상인지 확인하기
          </Link>{" "}
          ·{" "}
          <Link href="/guide/apply" className="font-semibold text-link underline underline-offset-2">
            신청방법 안내
          </Link>{" "}
          ·{" "}
          <Link href="/find" className="font-semibold text-link underline underline-offset-2">
            다른 지역 보기
          </Link>
        </p>

        <Disclaimer />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(crumbs)) }}
        />
      </main>

      <SiteFooter />
    </>
  );
}
