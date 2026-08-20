import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import { pretendard } from "./fonts";
import { SITE } from "@/lib/site";
import { TaboolaPlacements } from "@/components/TaboolaPlacements";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — ${SITE.tagline}`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  category: "reference",
  keywords: [
    "안마바우처",
    "정부지원 안마바우처",
    "정부지원안마바우처",
    "정부지원 안마서비스",
    "시각장애인 안마서비스",
    "안마바우처 신청방법",
    "안마바우처 자격",
    "어르신 안마바우처",
    "노인 안마바우처",
    "장애인 안마바우처",
    "국가유공자 안마",
    "국민행복카드 안마",
    "출산 안마바우처",
  ],
  authors: [{ name: SITE.name }],
  creator: SITE.name,
  publisher: SITE.name,
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: SITE.url,
    siteName: SITE.name,
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
  },
  // 소유확인 토큰은 어차피 HTML 소스에 공개되는 값이라 env 미설정 시 폴백을 둔다
  // (SITE.url과 동일한 패턴). Vercel에 env를 넣으면 그쪽이 우선한다.
  verification: {
    google:
      process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ||
      "ylRZwQXQH9ZVegPDqDJGKHanYBIwb2fDMD_NWF917FI",
    other: {
      "naver-site-verification":
        process.env.NEXT_PUBLIC_NAVER_SITE_VERIFICATION ||
        "f8a101b6d74888d95d7ab591aed94593ec6e61f3",
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "light",
  themeColor: "#0f3d3e",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: SITE.name,
      url: SITE.url,
      inLanguage: "ko",
      description: SITE.description,
    },
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: `${SITE.name} — ${SITE.tagline}`,
      url: SITE.url,
      inLanguage: "ko",
      description: SITE.description,
      image: [
        `${SITE.url}/thumb/hub-1x1.png`,
        `${SITE.url}/thumb/hub-4x3.png`,
        `${SITE.url}/thumb/hub-16x9.png`,
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: SITE.name,
      url: SITE.url,
      logo: `${SITE.url}/icon`,
    },
  ];

  return (
    <html lang="ko" className={`${pretendard.variable} h-full antialiased`}>
      <head>
        <script src="/taboola-init.js" async />
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9196149361612087"
          crossOrigin="anonymous"
          strategy="beforeInteractive"
        />
      </head>
      <body className="min-h-full flex flex-col bg-canvas text-foreground">
        {children}
        <TaboolaPlacements />
        <Analytics />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
