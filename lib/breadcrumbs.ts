import { SITE } from "@/lib/site";

export type Crumb = { name: string; href: string };

/**
 * 빵부스러기 경로. 화면 표시와 BreadcrumbList 구조화 데이터가 같은 데이터를 쓴다.
 * 둘이 어긋나면 구글이 구조화 데이터를 무시하므로 반드시 한 곳에서 만든다.
 */
export function trail(...items: Crumb[]): Crumb[] {
  return [{ name: "홈", href: "/" }, ...items];
}

export function breadcrumbJsonLd(crumbs: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: `${SITE.url}${c.href === "/" ? "" : c.href}`,
    })),
  };
}
