import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Info } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { LocationFinder } from "@/components/LocationFinder";
import { Disclaimer } from "@/components/Disclaimer";
import { getTarget, getTargets } from "@/lib/targets";
import { SITE } from "@/lib/site";

export function generateStaticParams() {
  return getTargets().map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const t = getTarget(slug);
  if (!t) return {};
  // summary만 쓰면 40~50자라 검색결과 공간을 못 채운다. 소득기준·지원내용을 붙여
  // 100자 내외로 만들고 키워드도 함께 싣는다.
  const description =
    t.role === "recipient"
      ? `${t.summary} ${t.income} 월 4회·연 48회, 회당 60분, 본인부담 10%로 이용합니다.`
      : `${t.summary} 안마 서비스를 받고자 하신다면 어르신·장애인·국가유공자 안마바우처 안내를 확인하세요.`;
  return {
    title: t.seoTitle,
    description,
    keywords: t.keywords,
    alternates: { canonical: `/target/${t.slug}` },
    openGraph: {
      title: `${t.seoTitle} | ${SITE.name}`,
      description,
      url: `${SITE.url}/target/${t.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: `${t.seoTitle} | ${SITE.name}`,
      description,
    },
  };
}

function ListTile({ title, items }: { title: string; items: string[] }) {
  if (items.length === 0) return null;
  return (
    <div className="tile">
      <h2 className="mb-2 text-lead font-extrabold">{title}</h2>
      <ul className="list-disc space-y-1.5 pl-5 text-body text-muted">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default async function TargetPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const t = getTarget(slug);
  if (!t) notFound();

  const thumb = (ratio: string) => `${SITE.url}/thumb/target-${t.slug}-${ratio}.png`;
  const images = [thumb("1x1"), thumb("4x3"), thumb("16x9")];

  // 수혜 대상에게만 신청 절차가 있다. 제공자(시각장애인) 페이지에 HowTo를 붙이면
  // 구조화 데이터가 콘텐츠와 불일치하므로 Article로 낸다(스펙 §12.3).
  const jsonLd =
    t.role === "recipient"
      ? {
          "@context": "https://schema.org",
          "@type": "HowTo",
          name: `${t.name} 안마바우처 신청방법`,
          description: t.summary,
          image: images,
          step: [
            {
              "@type": "HowToStep",
              name: "주민센터 신청",
              text: "관할 읍·면·동 주민센터에서 안마바우처를 신청합니다.",
            },
            {
              "@type": "HowToStep",
              name: "국민행복카드 발급",
              text: "은행 창구 또는 카드사 앱에서 국민행복카드를 발급받습니다.",
            },
            {
              "@type": "HowToStep",
              name: "안마원 예약",
              text: "시각장애인 안마시술소에 전화로 예약한 뒤 이용합니다.",
            },
          ],
        }
      : {
          "@context": "https://schema.org",
          "@type": "Article",
          headline: t.seoTitle,
          description: t.summary,
          image: images,
          inLanguage: "ko",
        };

  return (
    <>
      <SiteHeader />

      <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-10">
        <h1 className="text-h1 font-extrabold tracking-tight text-primary sm:text-h1lg">
          {t.seoTitle}
        </h1>

        {t.role === "provider" && (
          <div className="mt-4 flex items-start gap-3 rounded-2xl border-2 border-primary bg-band px-5 py-4">
            <Info size={20} strokeWidth={2.4} className="mt-0.5 shrink-0 text-primary" aria-hidden />
            <p className="text-body">
              <b>시각장애인은 이 바우처를 받는 대상이 아니라 서비스를 제공하는 안마사입니다.</b>{" "}
              안마를 받고자 하신다면{" "}
              <Link href="/target/senior" className="font-semibold text-link underline underline-offset-2">
                어르신
              </Link>
              ·
              <Link href="/target/disabled" className="font-semibold text-link underline underline-offset-2">
                장애인
              </Link>
              ·
              <Link href="/target/veteran" className="font-semibold text-link underline underline-offset-2">
                국가유공자
              </Link>{" "}
              안내를 확인해 주세요.
            </p>
          </div>
        )}

        {/* 검색 썸네일 후보로 크롤러가 안정적인 URL을 보게 해야 하므로 next/image가 아닌
          평문 img를 쓴다(스펙 §12.3). next/image는 /_next/image?url=... 로 재작성한다. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`/thumb/target-${t.slug}-16x9.png`}
          alt={`${t.name} 안마바우처 안내`}
          width={1200}
          height={675}
          className="mt-8 w-full max-w-sm rounded-2xl border border-border"
        />

        <p className="mt-6 text-body">{t.summary}</p>

        <div className="grid-cards">
          <ListTile title="자격 요건" items={t.eligibility} />
          <div className="tile">
            <h2 className="mb-2 text-lead font-extrabold">소득 기준</h2>
            <p className="text-body text-muted">{t.income}</p>
          </div>
          <ListTile title="지원 내용" items={t.conditions} />
          <ListTile title="준비 서류" items={t.documents} />
        </div>

        {t.role === "recipient" && (
          <>
            <section className="section">
              <h2 className="text-h2 font-extrabold tracking-tight">가까운 안마원 찾기</h2>
              <LocationFinder query="시각장애인 안마원" label="안마원" />
            </section>
            <p className="mt-4 text-meta text-muted">
              신청 절차는{" "}
              <Link href="/guide/apply" className="font-semibold text-link underline underline-offset-2">
                안마바우처 신청방법
              </Link>
              에서, 비용은{" "}
              <Link href="/guide/cost" className="font-semibold text-link underline underline-offset-2">
                본인부담금 안내
              </Link>
              에서 확인하실 수 있습니다.
            </p>
          </>
        )}

        <p className="mt-8 rounded-2xl bg-band px-5 py-4 text-meta text-muted">
          {t.note}
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
