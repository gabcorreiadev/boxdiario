import Link from "next/link";
import { FactTeaser } from "@/components/FactTeaser";
import { LegendCard } from "@/components/LegendCard";
import { NextRace } from "@/components/NextRace";
import { RaceGrid } from "@/components/RaceCard";
import { StartLights } from "@/components/StartLights";
import { Streaks } from "@/components/Streaks";
import { LEGENDS } from "@/content/legends";
import { getSeason, getStandings } from "@/lib/jolpica";

export const revalidate = 3600;

const PREVIEW = ["ayrton-senna", "michael-schumacher", "lewis-hamilton", "emerson-fittipaldi", "max-verstappen", "nelson-piquet"];

export default async function Home() {
  const [races, standings] = await Promise.all([getSeason(), getStandings()]);
  const br = standings?.drivers.find((d) => d.brazilian);

  return (
    <>
      <section className="hero">
        <Streaks />
        <div className="wrap">
          <div>
            <StartLights />
            <h1>Cinco luzes.<br /><em>Apagaram.</em></h1>
            <p className="lede">
              Tudo o que você precisa até a próxima largada: <strong>quando é, onde passa e por que importa</strong>.
              E uma volta nova pela história da F1 a cada dia.
            </p>
          </div>
          <NextRace races={races} />
        </div>
        <div className="checker" aria-hidden="true" />
      </section>

      <section className="block">
        <div className="wrap">
          <div className="sh"><h2>Hoje no paddock</h2></div>
          <div className="tiles">
            <Link className="tile" href="/volta-do-dia">
              <FactTeaser />
              <p>A curiosidade de hoje. Amanhã tem outra.</p>
              <span className="go">Ler a volta do dia →</span>
            </Link>
            <Link className="tile" href="/volta-do-dia#jogo">
              <span className="eyebrow">Jogo diário</span>
              <h3>Adivinhe o piloto</h3>
              <p>Seis tentativas. Cada erro revela uma dica nova.</p>
              <span className="go">Jogar agora →</span>
            </Link>
            {br ? (
              <Link className="tile br" href="/campeonato">
                <span className="eyebrow">O Brasil no grid</span>
                <h3>{br.name}</h3>
                <p>{br.team} · P{br.position} no campeonato, {br.points} pontos</p>
                <span className="go">Ver classificação →</span>
              </Link>
            ) : (
              <Link className="tile br" href="/lendas?q=brasil">
                <span className="eyebrow">O Brasil na F1</span>
                <h3>8 títulos mundiais</h3>
                <p>Emerson, Piquet e Senna.</p>
                <span className="go">Ver os brasileiros →</span>
              </Link>
            )}
          </div>
        </div>
      </section>

      <section className="block" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="sh"><h2>Os gigantes</h2><Link href="/lendas">Ver todas as lendas →</Link></div>
          <div className="hscroll">
            {PREVIEW.map((slug) => {
              const l = LEGENDS.find((x) => x.slug === slug);
              return l ? <LegendCard key={slug} legend={l} /> : null;
            })}
          </div>
        </div>
      </section>

      <section className="block" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="sh"><h2>Próximas etapas</h2><Link href="/corridas">Calendário completo →</Link></div>
          <div className="hscroll"><RaceGrid races={races} upcomingOnly limit={4} /></div>
        </div>
      </section>
    </>
  );
}
