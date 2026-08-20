import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MapPin, Building2 } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Disclaimer } from "@/components/Disclaimer";
import { getSido, getSidos } from "@/lib/regions";
import { buildNaverMapUrl } from "@/lib/naver";
import { SITE } from "@/lib/site";

export function generateStaticParams() {
  return getSidos().map((s) => ({ sido: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ sido: string }>;
}): Promise<Metadata> {
  const { sido } = await params;
  const s = getSido(sido);
  if (!s) return {};
  const title = `${s.name} 시각장애인 안마원 — 안마바우처 이용처 찾기`;
  const description = `${s.name}에서 안마바우처를 이용할 수 있는 시각장애인 안마원과 신청처인 주민센터를 네이버 지도로 확인하세요.`;
  return {
    title,
    description,
    keywords: [`${s.name} 시각장애인 안마원`, `${s.name} 안마바우처`],
    alternates: { canonical: `/find/${s.slug}` },
    openGraph: { title: `${title} | ${SITE.name}`, description, url: `${SITE.url}/find/${s.slug}` },
    twitter: { card: "summary_large_image", title: `${title} | ${SITE.name}`, description },
  };
}

export default async function SidoPage({ params }: { params: Promise<{ sido: string }> }) {
  const { sido } = await params;
  const s = getSido(sido);
  if (!s) notFound();

  const links = [
    {
      href: buildNaverMapUrl(`${s.name} 시각장애인 안마원`),
      icon: <MapPin size={20} strokeWidth={2.2} aria-hidden />,
      title: `${s.name} 시각장애인 안마원 보기`,
      sub: "네이버 지도에서 최신 목록과 연락처를 확인할 수 있습니다.",
    },
    {
      href: buildNaverMapUrl(`${s.name} 주민센터`),
      icon: <Building2 size={20} strokeWidth={2.2} aria-hidden />,
      title: `${s.name} 주민센터 보기`,
      sub: "안마바우처 신청은 주소지 관할 읍·면·동 주민센터에서 합니다.",
    },
  ];

  return (
    <>
      <SiteHeader />

      <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-10">
        <h1 className="text-h1 font-extrabold tracking-tight text-primary sm:text-h1lg">
          {s.name} 시각장애인 안마원 찾기
        </h1>
        <p className="mt-4 text-body">
          {s.name}에서 안마바우처를 이용할 수 있는 시각장애인 안마원과, 신청처인 주민센터를
          지도에서 확인하실 수 있습니다.
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

        <p className="mt-8 rounded-2xl bg-band px-5 py-4 text-meta text-muted">
          안마바우처는 지자체가 운영하는 지역사회서비스투자사업으로, 신청기간·제출서류·본인부담금이
          지역마다 다를 수 있습니다. {s.name} 내에서도 시·군·구에 따라 운영 방식이 다를 수 있으니
          관할 주민센터에 먼저 확인하시는 것이 좋습니다.
        </p>

        <p className="mt-6 text-meta text-muted">
          <Link href="/guide/apply" className="font-semibold text-link underline underline-offset-2">
            신청방법 안내
          </Link>{" "}
          ·{" "}
          <Link href="/find" className="font-semibold text-link underline underline-offset-2">
            다른 지역 보기
          </Link>
        </p>

        <Disclaimer />
      </main>

      <SiteFooter />
    </>
  );
}
