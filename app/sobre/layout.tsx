import { AboutTabs } from "@/components/AboutTabs";
import { UPDATED_AT } from "@/content/about";
import { SITE } from "@/lib/site";

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className="about-head">
        <div className="wrap">
          <span className="eyebrow">{SITE.name} · Institucional</span>
          <h1>Sobre</h1>
          <p className="note">Última atualização: {UPDATED_AT}</p>
        </div>
      </header>
      <div className="wrap about">
        <AboutTabs />
        <div className="about-body">{children}</div>
      </div>
      <div style={{ height: 56 }} />
    </>
  );
}
