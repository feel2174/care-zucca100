export function Disclaimer() {
  return (
    <section id="disclaimer">
      <h2 className="mb-4 text-[19px] font-extrabold tracking-tight">안내 · 면책</h2>
      <div className="rounded-2xl bg-band px-5 py-5 text-[14px] leading-[1.75] text-muted">
        <ul className="list-disc space-y-2 pl-4">
          <li>
            각 정당의 공식 페이지로 연결하는{" "}
            <b className="text-foreground">정보 제공 · 링크 모음 서비스</b>이며, 특정 정당의
            가입·탈당을 권유하거나 정치적 입장을 표방하지 않습니다.
          </li>
          <li>
            표시된 정당명·상표는 각 정당에 귀속되며, 어떤 정당과도{" "}
            <b className="text-foreground">제휴·협찬·위탁 관계가 없습니다.</b>
          </li>
          <li>
            당비·후원금을 수납·중개하지 않으며, 가입·탈당을 위한{" "}
            <b className="text-foreground">개인정보를 수집하지 않습니다.</b> 모든 신청은 각 정당
            공식 창구에서 진행됩니다.
          </li>
          <li>
            절차·연락처·링크는 각 정당 사정에 따라 사전 고지 없이 바뀔 수 있으며, 정확성·최신성을
            보증하지 않습니다. <b className="text-foreground">반드시 각 정당 공식 안내를 기준</b>으로
            확인하세요.
          </li>
        </ul>
      </div>
    </section>
  );
}
