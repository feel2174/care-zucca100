/**
 * 안마바우처 자격의 핵심은 신분이 아니라 **질환 보유 + 연령·소득 기준**이다.
 * 진단서·소견서에 아래 질병코드(KCD)가 명시되어야 질환 요건을 입증할 수 있다.
 *
 * 주의: 지역사회서비스투자사업은 지자체 자율사업이라 인정 범위·연령 기준이
 * 지역마다 다르다. 이 목록은 일반적으로 통용되는 범위이며, 최종 판단은
 * 관할 읍·면·동 주민센터에 있다. (스펙 §5 정확성 가드레일)
 */
export type ConditionGroup = {
  label: string;
  code: string;
  examples: string;
};

export const CONDITION_GROUPS: ConditionGroup[] = [
  {
    label: "근골격계 질환",
    code: "M00 ~ M99",
    examples: "관절염, 디스크(추간판탈출증), 오십견, 골반통 등",
  },
  {
    label: "신경계 질환",
    code: "G00 ~ G99",
    examples: "신경통, 뇌졸중 후유증 등",
  },
  {
    label: "순환계 질환",
    code: "I00 ~ I99",
    examples: "고혈압, 대사증후군 관련 순환계 질환 등",
  },
  {
    label: "기타",
    code: "R81 · E10 ~ E14",
    examples: "요단백(R81), 당뇨(E10~E14)",
  },
];
