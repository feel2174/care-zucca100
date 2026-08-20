import type { Metadata } from "next";
import { Suspense } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { PartyExplorer } from "@/components/PartyExplorer";
import { Disclaimer } from "@/components/Disclaimer";
import { getAllParties } from "@/lib/parties";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: `${SITE.name} — ${SITE.tagline}` },
  description: SITE.description,
};

export default function HomePage() {
  const parties = getAllParties();

  return (
    <>
      <SiteHeader />

      <div className="bg-band">
        <div className="mx-auto max-w-4xl px-6 pb-7 pt-8">
          <span className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-white/70 px-3 py-1.5 text-[12px] font-bold text-accent">
            ✦ 정치적으로 중립인 절차 안내 · 공식 페이지로만 연결
          </span>
          <h1 className="mb-2 text-[27px] font-extrabold leading-[1.3] tracking-tight text-primary sm:text-[33px]">
            정당 <span className="text-accent">입당·탈당</span>,
            <br />
            절차만 정확하게.
          </h1>
          <p className="text-[15px] leading-[1.7] text-muted">{SITE.description}</p>
        </div>
      </div>

      <main className="mx-auto w-full max-w-4xl flex-1 px-6 py-9">
        <section id="explorer" className="mb-12 scroll-mt-4">
          <Suspense>
            <PartyExplorer parties={parties} />
          </Suspense>
        </section>

        <section className="mb-12">
          <h2 className="mb-4 text-[19px] font-extrabold tracking-tight">
            탈당이 유독 어렵게 느껴지는 이유
          </h2>
          <div className="tile overflow-hidden">
            <details className="border-t border-border first:border-t-0 open:bg-band/40" open>
              <summary className="flex cursor-pointer list-none items-center px-5 py-4 text-[15px] font-bold">
                탈당하면 당비 자동이체도 같이 멈추나요?
              </summary>
              <p className="px-5 pb-4 text-[14.5px] leading-[1.75] text-muted">
                정당마다 다릅니다. 탈당 처리 시 당비가 자동 중단되는 곳도 있지만, 별도로
                자동이체 해지 요청서를 내야 하는 곳도 있습니다. 각 정당 페이지에서 &lsquo;자동이체
                해지&rsquo; 항목을 꼭 확인하세요.
              </p>
            </details>
            <details className="border-t border-border">
              <summary className="flex cursor-pointer list-none items-center px-5 py-4 text-[15px] font-bold">
                온라인으로 탈당할 수 있나요?
              </summary>
              <p className="px-5 pb-4 text-[14.5px] leading-[1.75] text-muted">
                일부 정당은 홈페이지 로그인만으로 탈당이 되지만, 일부는 탈당신고서를 자필로
                작성해 시·도당에 우편·팩스로 제출해야 합니다. 각 정당 페이지의 &lsquo;온라인 탈당
                가능/불가&rsquo; 표시를 참고하세요.
              </p>
            </details>
            <details className="border-t border-border">
              <summary className="flex cursor-pointer list-none items-center px-5 py-4 text-[15px] font-bold">
                탈당은 며칠 걸리나요?
              </summary>
              <p className="px-5 pb-4 text-[14.5px] leading-[1.75] text-muted">
                정당법상 시·도당은 탈당신고서 접수일부터 2일 이내에 당원명부에서 말소하고
                탈당증명서를 교부합니다. 즉시 효력이 발생한다고 안내하는 정당도 있습니다.
              </p>
            </details>
          </div>
        </section>

        <Disclaimer />
      </main>

      <SiteFooter />
    </>
  );
}
