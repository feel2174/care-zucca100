export type TargetSlug = "senior" | "disabled" | "veteran" | "blind";

export type Target = {
  slug: TargetSlug;
  name: string; // "60세 이상 어르신"
  role: "recipient" | "provider";
  summary: string;
  eligibility: string[];
  income: string;
  conditions: string[];
  documents: string[];
  note: string;
  seoTitle: string; // <title>/h1용 — 스펙 §11 배정 키워드 기반
  keywords: string[]; // 이 페이지가 노리는 키워드(다른 페이지와 겹치지 않게)
};

export type Sido = {
  slug: string;
  name: string;
  /** 시군구 목록. 세종은 단층제라 빈 배열이다. */
  sigungu: string[];
};
