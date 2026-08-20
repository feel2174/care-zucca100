export function Disclaimer() {
  return (
    <section id="disclaimer" className="section">
      <h2 className="text-h2 font-extrabold tracking-tight">안내 · 면책</h2>
      <div className="rounded-2xl bg-band px-6 py-6">
        <ul className="list-disc space-y-3 pl-5 text-caption text-muted">
          <li>
            정부·지자체의 안마바우처 제도를 정리해 안내하는{" "}
            <b className="text-foreground">정보 제공 서비스</b>이며, 특정 안마원을 추천하거나
            순위를 매기지 않습니다.
          </li>
          <li>
            예약·결제를 대행하지 않고 <b className="text-foreground">본인부담금을 수납하지 않으며</b>,
            신청에 필요한 개인정보를 수집하지 않습니다. 모든 신청은 관할 읍·면·동 주민센터에서
            진행됩니다.
          </li>
          <li>
            지도 링크는 네이버 지도 검색 결과로 연결되며, 검색 결과에 표시되는 업체와{" "}
            <b className="text-foreground">제휴·협찬 관계가 없습니다.</b>
          </li>
          <li>
            대상·소득기준·신청기간·제출서류는{" "}
            <b className="text-foreground">지자체마다 다를 수 있습니다.</b> 정확성·최신성을
            보증하지 않으므로 반드시 관할 주민센터의 공식 안내를 기준으로 확인하세요.
            (최종 확인: 2026년 8월)
          </li>
        </ul>
      </div>
    </section>
  );
}
