import type { Metadata } from "next";
import Link from "next/link";
import { AlertTriangle, Stethoscope, Baby } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { LocationFinder } from "@/components/LocationFinder";
import { ConditionCodes } from "@/components/ConditionCodes";
import { Disclaimer } from "@/components/Disclaimer";
import { SITE } from "@/lib/site";

// 스펙 §11.1 — "출산 안마바우처"라는 별도 제도는 없다. 다만 산모라도 질환 요건을
// 입증하면 안마바우처 대상이 될 수 있으므로 단정하지 않고 조건부로 안내한다.
export const metadata: Metadata = {
  title: "출산 안마바우처 — 산모도 신청 가능한가요? 질병코드 조건 정리",
  description:
    "산모라는 이유만으로는 안마바우처 대상이 되지 않지만, 산후 근골격계 질환 등 질병코드(M·G·I 코드)를 진단서로 입증하면 신청할 수 있습니다. 조건과 별도 사업인 산모·신생아 건강관리 지원사업까지 정리했습니다.",
  keywords: [
    "출산 안마바우처",
    "산모 안마바우처",
    "안마바우처 질병코드",
    "안마바우처 M코드",
    "산후도우미",
  ],
  alternates: { canonical: "/related/maternity" },
  openGraph: {
    title: "출산 안마바우처 — 산모도 신청 가능한가요? | 안마바로",
    description:
      "산모라는 이유만으로는 대상이 아니지만, 질병코드를 입증하면 신청할 수 있습니다.",
    url: `${SITE.url}/related/maternity`,
  },
};

const POSTPARTUM = [
  {
    h: "산모라는 이유만으로는 대상이 아닙니다",
    p: "안마바우처의 자격 요건은 신분이 아니라 '질환 보유 + 연령·소득 기준'입니다. 임신·출산 자체를 지원 사유로 삼는 별도의 출산 안마바우처 제도는 없습니다. 즉 산모 대상 사업으로 신청하는 것이 아니라, 일반 안마바우처의 질환 요건을 충족하는지로 판단됩니다.",
  },
  {
    h: "질환을 입증하면 신청할 수 있습니다",
    p: "출산 전후로 골반통, 요통, 추간판탈출증 같은 근골격계 질환이 생기는 경우가 많습니다. 이런 질환을 진단서·소견서로 입증할 수 있다면 만 60세 미만이라도 신청이 가능한 지자체가 있습니다. 다만 이 부분은 지자체 재량이 큰 영역이라, 연령 기준을 그대로 적용하는 곳도 있습니다.",
  },
  {
    h: "먼저 확인해야 할 것",
    p: "진단서를 발급받기 전에 관할 읍·면·동 주민센터에 두 가지를 확인하세요. 첫째, 만 60세 미만도 질환 입증으로 신청이 가능한지. 둘째, 어떤 질병코드까지 인정되는지. 이 두 가지가 지자체마다 가장 크게 갈리는 부분이며, 확인 없이 진단서부터 떼면 비용만 들 수 있습니다.",
  },
];

const MATERNITY = [
  {
    h: "지원 대상",
    p: "국내에 주민등록이 있는 출산 가정이 대상입니다. 기준 중위소득 150% 이하 가정이 기본 지원 대상이며, 지자체에 따라 소득 기준과 무관하게 지원하는 예외 사업을 함께 운영하는 곳도 있습니다. 출산 예정일 40일 전부터 출산 후 30일까지 신청할 수 있습니다.",
  },
  {
    h: "무엇을 지원하나요",
    p: "건강관리사가 가정을 방문해 산모의 건강 회복과 신생아 돌봄을 돕습니다. 산모 영양관리와 체조 지원, 신생아 목욕과 수유 지원, 산모·신생아 관련 세탁물 관리와 방 청소 등이 포함됩니다. 안마·지압을 제공하는 서비스가 아니므로 안마바우처와는 목적이 다릅니다.",
  },
  {
    h: "지원 기간과 비용",
    p: "출산 유형(단태아·쌍태아 등)과 소득 구간에 따라 이용 기간이 5일에서 40일까지 차등 적용됩니다. 정부지원금이 차감된 뒤 나머지 금액을 본인이 부담하는 구조이며, 부담액은 유형과 지자체 추가 지원 여부에 따라 달라집니다.",
  },
  {
    h: "어디에 신청하나요",
    p: "주민센터가 아니라 관할 보건소에 신청합니다. 정부24나 복지로를 통한 온라인 신청도 가능합니다. 신분증, 임신 확인서 또는 출생증명서, 건강보험증과 보험료 납부확인서 등이 필요하며 구체적인 서류는 보건소마다 다를 수 있습니다.",
  },
];

export default function MaternityPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: "ko",
    mainEntity: [
      {
        "@type": "Question",
        name: "산모도 안마바우처를 신청할 수 있나요?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "산모라는 이유만으로는 대상이 되지 않습니다. 다만 산후 근골격계 질환 등을 진단서로 입증하면 만 60세 미만이라도 신청이 가능한 지자체가 있습니다. 연령 기준과 인정 질병코드는 지자체마다 다르므로 관할 주민센터에 먼저 확인해야 합니다.",
        },
      },
      {
        "@type": "Question",
        name: "진단서에 어떤 질병코드가 있어야 하나요?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "근골격계 질환 M00~M99, 신경계 질환 G00~G99, 순환계 질환 I00~I99, 그 밖에 요단백 R81과 당뇨 E10~E14 등이 일반적으로 인정됩니다. 인정 범위는 지자체마다 다를 수 있습니다.",
        },
      },
      {
        "@type": "Question",
        name: "산후도우미와 안마바우처는 같은 사업인가요?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "다릅니다. 산모·신생아 건강관리 지원사업(산후도우미)은 건강관리사가 가정을 방문해 산모 회복과 신생아 돌봄을 돕는 별도 사업이며 보건소에 신청합니다. 안마바우처는 시각장애인 안마사가 제공하는 안마 서비스로 주민센터에 신청합니다.",
        },
      },
    ],
  };

  return (
    <>
      <SiteHeader />

      <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-10">
        <h1 className="text-h1 font-extrabold tracking-tight text-primary sm:text-h1lg">
          출산 안마바우처, 산모도 신청할 수 있나요?
        </h1>

        <div className="mt-6 flex items-start gap-3 rounded-2xl border-2 border-destructive bg-white px-6 py-5">
          <AlertTriangle
            size={22}
            strokeWidth={2.4}
            className="mt-1 shrink-0 text-destructive"
            aria-hidden
          />
          <p className="text-body">
            <b className="text-destructive">&lsquo;출산 안마바우처&rsquo;라는 별도 제도는 없습니다.</b>{" "}
            안마바우처는 산모를 대상으로 하는 사업이 아니라, <b>질환 보유와 연령·소득 기준</b>으로
            자격을 판단하는 제도입니다. 다만 산후 근골격계 질환 등을 진단서로 입증하면 신청이
            가능한 경우가 있습니다. 아래에서 조건을 확인하세요.
          </p>
        </div>

        {/* 검색 썸네일 후보로 크롤러가 안정적인 URL을 보게 해야 하므로 next/image가 아닌
            평문 img를 쓴다(스펙 §12.3). next/image는 /_next/image?url=... 로 재작성한다. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/thumb/maternity-16x9.png"
          alt="출산 후 산모의 안마바우처 신청 조건 안내"
          width={1200}
          height={675}
          className="mt-8 w-full max-w-sm rounded-2xl border border-border"
        />

        <section className="section mt-10">
          <h2 className="flex items-center gap-2 text-h2 font-extrabold tracking-tight">
            <Stethoscope size={22} strokeWidth={2.3} className="text-accent" aria-hidden />
            산모의 안마바우처 신청 조건
          </h2>
          <div className="grid-cards">
            {POSTPARTUM.map((b) => (
              <div key={b.h} className="tile">
                <h3 className="text-lead font-extrabold">{b.h}</h3>
                <p className="mt-2 text-body text-muted">{b.p}</p>
              </div>
            ))}
          </div>
          <div className="mt-3">
            <ConditionCodes />
          </div>
        </section>

        <section className="section">
          <h2 className="text-h2 font-extrabold tracking-tight">신청할 주민센터 찾기</h2>
          <LocationFinder query="주민센터" label="주민센터" />
        </section>

        <section className="section">
          <h2 className="flex items-center gap-2 text-h2 font-extrabold tracking-tight">
            <Baby size={22} strokeWidth={2.3} className="text-accent" aria-hidden />
            산후도우미는 별도 사업입니다
          </h2>
          <p className="mb-4 text-body text-muted">
            안마바우처와 자주 헷갈리는 산모·신생아 건강관리 지원사업(산후도우미)은 완전히 다른
            제도입니다. 건강관리사가 가정을 방문하는 서비스이고, 신청처도 주민센터가 아니라
            보건소입니다.
          </p>
          <div className="grid-cards">
            {MATERNITY.map((b) => (
              <div key={b.h} className="tile">
                <h3 className="text-lead font-extrabold">{b.h}</h3>
                <p className="mt-2 text-body text-muted">{b.p}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="section">
          <h2 className="text-h2 font-extrabold tracking-tight">신청할 보건소 찾기</h2>
          <LocationFinder query="보건소" label="보건소" />
        </section>

        <p className="mt-12 text-meta text-muted">
          안마바우처의 전체 대상과 신청 절차는{" "}
          <Link href="/" className="font-semibold text-link underline underline-offset-2">
            정부지원 안마바우처 안내
          </Link>
          에서 확인하실 수 있습니다.
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
