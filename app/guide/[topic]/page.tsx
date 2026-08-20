import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { LocationFinder } from "@/components/LocationFinder";
import { ConditionCodes } from "@/components/ConditionCodes";
import { Disclaimer } from "@/components/Disclaimer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { trail, breadcrumbJsonLd } from "@/lib/breadcrumbs";
import { getGuide, getGuides } from "@/lib/guides";
import { SITE } from "@/lib/site";

export function generateStaticParams() {
  return getGuides().map((g) => ({ topic: g.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ topic: string }>;
}): Promise<Metadata> {
  const { topic } = await params;
  const g = getGuide(topic);
  if (!g) return {};
  return {
    title: g.seoTitle,
    description: g.description,
    keywords: g.keywords,
    alternates: { canonical: `/guide/${g.slug}` },
    openGraph: {
      title: `${g.seoTitle} | ${SITE.name}`,
      description: g.description,
      url: `${SITE.url}/guide/${g.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: `${g.seoTitle} | ${SITE.name}`,
      description: g.description,
    },
  };
}

export default async function GuidePage({ params }: { params: Promise<{ topic: string }> }) {
  const { topic } = await params;
  const g = getGuide(topic);
  if (!g) notFound();

  const thumb = (ratio: string) => `${SITE.url}/thumb/guide-${g.slug}-${ratio}.png`;
  const images = [thumb("1x1"), thumb("4x3"), thumb("16x9")];

  const jsonLd = g.howTo
    ? {
        "@context": "https://schema.org",
        "@type": "HowTo",
        name: g.title,
        description: g.description,
        image: images,
        step: g.body.map((b) => ({
          "@type": "HowToStep",
          name: b.h,
          text: b.p,
        })),
      }
    : {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: g.seoTitle,
        description: g.description,
        image: images,
        inLanguage: "ko",
      };

  const crumbs = trail(
    { name: "가이드", href: "/guide" },
    { name: g.title, href: `/guide/${g.slug}` },
  );

  return (
    <>
      <SiteHeader />

      <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-10">
        <Breadcrumbs crumbs={crumbs} />

        <h1 className="text-h1 font-extrabold tracking-tight text-primary sm:text-h1lg">
          {g.title}
        </h1>

        {/* 검색 썸네일 후보로 크롤러가 안정적인 URL을 보게 해야 하므로 next/image가 아닌
          평문 img를 쓴다(스펙 §12.3). next/image는 /_next/image?url=... 로 재작성한다. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`/thumb/guide-${g.slug}-16x9.png`}
          alt={`${g.title} 안내`}
          width={1200}
          height={675}
          className="mt-8 w-full max-w-sm rounded-2xl border border-border"
        />

        <p className="mt-6 text-body">{g.intro}</p>

        <div className="grid-cards">
          {g.body.map((b) => (
            <section key={b.h} className="tile">
              <h2 className="mb-2 text-lead font-extrabold">{b.h}</h2>
              <p className="text-body text-muted">{b.p}</p>
            </section>
          ))}
        </div>

        {g.slug === "apply" && (
          <>
            <section className="section">
              <h2 className="text-h2 font-extrabold tracking-tight">
                질환 요건은 어떻게 입증하나요
              </h2>
              <ConditionCodes />
            </section>

            <section className="section">
              <h2 className="text-h2 font-extrabold tracking-tight">
                신청할 주민센터 찾기
              </h2>
              <LocationFinder query="주민센터" label="주민센터" />
            </section>
            <section className="section">
              <h2 className="text-h2 font-extrabold tracking-tight">
                이용할 안마원 찾기
              </h2>
              <LocationFinder query="시각장애인 안마원" label="안마원" broadQuery="안마원" />
            </section>
          </>
        )}

        <p className="mt-8 text-meta text-muted">
          본인이 대상에 해당하는지 먼저 확인하시려면{" "}
          <Link href="/#targets" className="font-semibold text-link underline underline-offset-2">
            대상별 안내
          </Link>
          를 참고하세요. 제도 운영 방식은 지자체마다 다를 수 있습니다.
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
