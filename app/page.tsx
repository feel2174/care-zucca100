import type { Metadata } from "next";
import Link from "next/link";
import { Baby, ChevronRight } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { TargetCards } from "@/components/TargetCards";
import { LocationFinder } from "@/components/LocationFinder";
import { Disclaimer } from "@/components/Disclaimer";
import { getTargets } from "@/lib/targets";
import { SITE } from "@/lib/site";

// 배정 키워드(스펙 §11): 안마바우처 / 정부지원 안마바우처 / 정부지원안마바우처 / 정부지원 안마서비스
export const metadata: Metadata = {
  title: { absolute: "정부지원 안마바우처 — 대상·신청방법·본인부담금 한눈에" },
  description: SITE.description,
  alternates: { canonical: "/" },
};

const FACTS = [
  { label: "이용 횟수", value: "연 48회", sub: "월 4회 × 12개월" },
  { label: "1회 시간", value: "60분", sub: "찜질 15분 포함" },
  { label: "본인부담", value: "10%", sub: "약 4,000~4,200원" },
];

const STEPS = [
  { n: "1", h: "주민센터 신청", p: "관할 읍·면·동 주민센터에 신분증과 질환 확인 서류를 지참해 신청합니다." },
  { n: "2", h: "국민행복카드 발급", p: "신청이 승인되면 은행 창구나 카드사 앱에서 국민행복카드를 발급받습니다." },
  { n: "3", h: "안마원 예약·이용", p: "시각장애인 안마시술소에 전화로 예약한 뒤 방문해 본인부담금만 결제합니다." },
];

export default function HomePage() {
  const targets = getTargets();

  return (
    <>
      <SiteHeader />

      <div className="bg-band">
        <div className="mx-auto max-w-4xl px-6 pb-10 pt-8">
          <span className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-background px-3 py-1.5 text-caption font-bold text-link">
            ✦ 제도 안내 전용 · 특정 안마원을 추천하지 않습니다
          </span>
          <h1 className="mb-3 text-h1 font-extrabold tracking-tight text-primary sm:text-h1lg">
            <span className="text-link">정부지원 안마바우처</span>,
            <br />
            누가 받고 어떻게 신청하나요?
          </h1>
          <p className="text-lead text-muted">
            안마바우처는 하나의 제도가 아니라 대상에 따라 성격이 다릅니다. 어르신·장애인·국가유공자는
            서비스를 받는 대상이고, 시각장애인은 서비스를 제공하는 안마사입니다. 대상별 자격과
            신청 절차를 정리했습니다.
          </p>
          {/* 검색 썸네일 후보로 크롤러가 안정적인 URL을 보게 해야 하므로 next/image가 아닌
            평문 img를 쓴다(스펙 §12.3). next/image는 /_next/image?url=... 로 재작성한다. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/thumb/hub-16x9.png"
            alt="정부지원 안마바우처 대상과 신청 절차 안내"
            width={1200}
            height={675}
            className="mt-8 w-full max-w-sm rounded-2xl border border-border"
          />
        </div>
      </div>

      <main className="mx-auto w-full max-w-4xl flex-1 px-6 py-9">
        <section className="section">
          <h2 className="text-h2 font-extrabold tracking-tight">
            가까운 안마원부터 찾아보기
          </h2>
          <LocationFinder query="시각장애인 안마원" label="안마원" broadQuery="안마원" />
        </section>

        <section id="targets" className="section scroll-mt-4">
          <h2 className="text-h2 font-extrabold tracking-tight">
            나는 어디에 해당하나요?
          </h2>
          <p className="mb-4 text-body text-muted">
            정부지원 안마서비스(정식 명칭: 시각장애인 안마서비스)의 대상은 네 갈래로 나뉩니다.
            검색창에 정부지원안마바우처처럼 붙여 쓰셨더라도 같은 제도를 가리킵니다.
          </p>
          <TargetCards targets={targets} />
        </section>

        <section className="section">
          <h2 className="text-h2 font-extrabold tracking-tight">
            지원 내용 한눈에 보기
          </h2>
          <div className="grid-cards sm:grid-cols-3">
            {FACTS.map((f) => (
              <div key={f.label} className="tile">
                <p className="text-caption font-semibold text-muted">{f.label}</p>
                <p className="mt-1 text-h2 font-extrabold text-primary">{f.value}</p>
                <p className="mt-1 text-caption text-muted">{f.sub}</p>
              </div>
            ))}
          </div>
          <p className="mt-3 text-caption text-muted">
            서비스 비용의 90%를 정부가 지원하고 이용자는 10%만 부담합니다. 자세한 내용은{" "}
            <Link href="/guide/cost" className="font-semibold text-link underline underline-offset-2">
              본인부담금·횟수 안내
            </Link>
            에서 확인하세요.
          </p>
        </section>

        <section className="section">
          <h2 className="text-h2 font-extrabold tracking-tight">신청은 3단계입니다</h2>
          <ol className="grid-cards sm:grid-cols-3">
            {STEPS.map((s) => (
              <li key={s.n} className="tile">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-lead font-extrabold text-on-primary">
                  {s.n}
                </span>
                <p className="mt-3 text-lead font-extrabold">{s.h}</p>
                <p className="mt-1 text-meta text-muted">{s.p}</p>
              </li>
            ))}
          </ol>
          <Link
            href="/guide/apply"
            className="mt-4 inline-flex min-h-[52px] items-center gap-1.5 rounded-xl bg-primary px-6 text-body font-bold text-on-primary hover:opacity-90"
          >
            안마바우처 신청방법 자세히 보기
            <ChevronRight size={17} aria-hidden />
          </Link>
        </section>

        <section className="section">
          <Link
            href="/related/maternity"
            className="tile flex items-start gap-4 transition-all hover:-translate-y-0.5 hover:border-accent hover:shadow-md"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-band text-accent">
              <Baby size={22} strokeWidth={2.2} aria-hidden />
            </span>
            <span>
              <span className="text-lead font-extrabold">
                출산·산모 안마바우처를 찾으셨나요?
              </span>
              <span className="mt-1 block text-meta text-muted">
                산모는 안마바우처 대상이 아닙니다. 대신 받을 수 있는 산모·신생아 건강관리
                지원사업(산후도우미)을 안내해 드립니다.
              </span>
            </span>
          </Link>
        </section>

        <Disclaimer />
      </main>

      <SiteFooter />
    </>
  );
}
