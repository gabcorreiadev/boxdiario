import type { Metadata, Viewport } from "next";
import { Archivo, Chivo_Mono } from "next/font/google";
import localFont from "next/font/local";
import { Header } from "@/components/Header";
import { SiteFooter } from "@/components/SiteFooter";
import { TabBar } from "@/components/TabBar";
import { SITE } from "@/lib/site";
import "./globals.css";

// Big Shoulders (licença OFL) servida pelo próprio projeto, com fallback definido à mão.
const shoulders = localFont({
  src: "./fonts/BigShoulders-latin.woff2",
  weight: "500 900",
  variable: "--font-shoulders",
  display: "swap",
  adjustFontFallback: false,
});
const archivo = Archivo({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-archivo" });
const chivo = Chivo_Mono({ subsets: ["latin"], weight: ["400", "600"], variable: "--font-chivo" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: `${SITE.name} · ${SITE.slogan}: horário, onde assistir e história`, template: `%s · ${SITE.name}` },
  description: SITE.tagline,
  applicationName: SITE.name,
  keywords: SITE.keywords,
  authors: [{ name: SITE.author.name, url: SITE.author.github }],
  creator: SITE.author.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: SITE.name,
    title: `${SITE.name} · ${SITE.slogan}`,
    description: SITE.tagline,
    url: "/",
  },
  twitter: { card: "summary_large_image", title: `${SITE.name} · ${SITE.slogan}`, description: SITE.tagline },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#0d0f14",
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${shoulders.variable} ${archivo.variable} ${chivo.variable}`}>
      <body>
        <Header />
        <main className="view">{children}</main>
        <SiteFooter />
        <TabBar />
      </body>
    </html>
  );
}
