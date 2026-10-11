import Link from "next/link";
import { SITE } from "@/lib/site";
import { NAV } from "./nav";
import { PixDonate } from "./PixDonate";
import { ShareButtons } from "./ShareButtons";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="site">
      <div className="wrap foot">
        <div className="foot-brand">
          <Link className="logo" href="/"><i aria-hidden="true"><b /><b /><b /></i>{SITE.logo}</Link>
          <p>{SITE.tagline}</p>
          <ShareButtons compact />
          <PixDonate compact />
        </div>
        <nav aria-label="Páginas do site" className="foot-col">
          <span className="eyebrow">Páginas</span>
          {[...NAV, { href: "/glossario", label: "Glossário" }].map((n) => <Link key={n.href} href={n.href}>{n.label}</Link>)}
        </nav>
        <nav aria-label="Institucional" className="foot-col">
          <span className="eyebrow">Sobre</span>
          <Link href="/sobre">Sobre o projeto</Link>
          <Link href="/sobre/fontes">Fontes dos dados</Link>
          <Link href="/sobre/direitos">Direitos e avisos</Link>
          <a href="/calendario.ics">Calendário das corridas</a>
        </nav>
      </div>
      <div className="wrap foot-bottom">
        <span>© {year} {SITE.name} · Site de fã, sem vínculo com a Fórmula 1, a FIA ou as equipes.</span>
        <span className="credit">
          Feito no Brasil por{" "}
          <a href={SITE.author.site || SITE.author.github} target="_blank" rel="noopener noreferrer">{SITE.author.name}</a>
          <a className="gh" href={SITE.author.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub de Gabriel">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.53-1.33-1.28-1.69-1.28-1.69-1.05-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.71 1.26 3.37.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.68 0-1.25.45-2.28 1.19-3.08-.12-.29-.52-1.46.11-3.04 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.58.23 2.75.11 3.04.74.8 1.19 1.83 1.19 3.08 0 4.41-2.69 5.38-5.25 5.67.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z" /></svg>
          </a>
        </span>
      </div>
    </footer>
  );
}
