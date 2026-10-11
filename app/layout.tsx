import type { Metadata, Viewport } from "next";
import { Archivo, Chivo_Mono } from "next/font/google";
import localFont from "next/font/local";
import { Header } from "@/components/Header";
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
  title: { default: SITE.name, template: `%s · ${SITE.name}` },
  description: SITE.tagline,
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
        <footer className="site">
          <div className="wrap">
            <span>Site de fã, sem vínculo com a Fórmula 1 ou equipes.</span>
            <span className="mono">Dados: Jolpica-F1 · OpenF1 · Globo</span>
          </div>
        </footer>
        <TabBar />
      </body>
    </html>
  );
}
