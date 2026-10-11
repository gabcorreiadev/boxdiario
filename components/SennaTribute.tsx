import Link from "next/link";
import { SENNA_LEGACY, SENNA_MONACO, SENNA_QUOTE, SENNA_STATS, SENNA_TIMELINE } from "@/content/senna";
import { CountUp } from "./CountUp";
import { Reveal } from "./Reveal";

/** Homenagem a Ayrton Senna: abre a página de lendas e a página dele. */
export function SennaTribute({ showLink = true }: { showLink?: boolean }) {
  return (
    <section className="senna" aria-labelledby="senna-title">
      <div className="senna-stripe" aria-hidden="true" />
      <div className="wrap">
        <div className="senna-hero">
          <span className="ghost" aria-hidden="true">41</span>
          <span className="eyebrow" style={{ position: "relative" }}>Homenagem · O maior ídolo do Brasil</span>
          <h2 id="senna-title">Ayrton <span>Senna</span></h2>
          <div className="dates">21 · 03 · 1960 — 01 · 05 · 1994</div>
          <p>
            Três títulos mundiais, 41 vitórias e um país inteiro acordando cedo no domingo para vê-lo correr.
            Senna transformou cada volta em espetáculo e cada vitória em festa nacional.
          </p>
        </div>

        <Reveal className="senna-stats">
          {SENNA_STATS.map((s) => (
            <div key={s.label}><CountUp to={s.value} /><small>{s.label}</small></div>
          ))}
        </Reveal>

        <Reveal as="figure" className="senna-quote">
          <blockquote>{SENNA_QUOTE.text}</blockquote>
          <figcaption>{SENNA_QUOTE.context}</figcaption>
        </Reveal>

        <Reveal className="monaco">
          <div>
            <span className="eyebrow">O Rei de Mônaco</span>
            <h3>Seis vitórias nas ruas de Monte Carlo</h3>
            <p>Cinco delas seguidas, de 1989 a 1993. Nenhum piloto venceu tantas vezes na pista mais difícil do calendário.</p>
          </div>
          <div className="monaco-years" aria-label="Anos das vitórias em Mônaco">
            {SENNA_MONACO.map((y) => <span key={y}>{String(y).slice(2)}</span>)}
          </div>
        </Reveal>

        <ol className="timeline" aria-label="Marcos da carreira" style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {SENNA_TIMELINE.map((m, i) => (
            <Reveal as="li" key={`${m.year}-${i}`} className={`ms ${m.highlight ? "hl" : ""}`} delay={Math.min(i, 3) * 0.04}>
              <span className="y">{m.year}</span>
              <div><h4>{m.title}</h4><p>{m.text}</p></div>
            </Reveal>
          ))}
        </ol>

        <div className="legacy">
          {SENNA_LEGACY.map((l, i) => (
            <Reveal key={l.title} delay={i * 0.08}><h4>{l.title}</h4><p>{l.text}</p></Reveal>
          ))}
        </div>

        <div className="obrigado">
          <p>Obrigado, <span>Senna.</span></p>
          {showLink && <Link className="btn" href="/lendas/ayrton-senna">Carros e títulos ano a ano →</Link>}
        </div>
      </div>
      <div className="senna-stripe" aria-hidden="true" />
    </section>
  );
}
