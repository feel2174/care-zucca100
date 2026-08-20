import localFont from "next/font/local";

export const pretendard = localFont({
  src: [
    { path: "../assets/fonts/pt-regular.woff2", weight: "400", style: "normal" },
    { path: "../assets/fonts/pt-medium.woff2", weight: "500", style: "normal" },
    { path: "../assets/fonts/pt-semibold.woff2", weight: "600", style: "normal" },
    { path: "../assets/fonts/pt-bold.woff2", weight: "700", style: "normal" },
    { path: "../assets/fonts/pt-extrabold.woff2", weight: "800", style: "normal" },
  ],
  variable: "--font-pretendard",
  display: "swap",
});
