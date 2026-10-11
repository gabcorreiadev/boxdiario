import type { Metadata } from "next";
import { share } from "@/lib/seo";
import { NextRace } from "@/components/NextRace";
import { RaceGrid } from "@/components/RaceCard";
import { WeekendSessions } from "@/components/WeekendSessions";
import { getSeason, getSeasonWinners } from "@/lib/jolpica";

export const metadata: Metadata = { title: "Calendário da F1: horários e onde assistir no Brasil", description: "Calendário da temporada com horários no seu fuso e onde assistir no Brasil.", alternates: { canonical: "/corridas" }, ...share("Calendário da F1: horários e onde assistir no Brasil", "Calendário da temporada com horários no seu fuso e onde assistir no Brasil.", "/corridas") };
export const revalidate = 3600;

export default async function Corridas() {
  const [races, winners] = await Promise.all([getSeason(), getSeasonWinners()]);
  return (
    <>
      <div className="wrap page-head">
        <span className="eyebrow">Temporada {new Date(races[0]?.startsAt ?? Date.now()).getFullYear()} · {races.length} etapas</span>
        <h1>Corridas</h1>
        <p>Toque numa corrida para ver o resultado completo. Horários no seu fuso. Verde passa na Globo (TV aberta). Amarelo passa só no SporTV 3, Globoplay e F1 TV.</p>
        <p style={{ marginTop: 10 }}><a className="btn" href="/calendario.ics">Adicionar ao meu calendário</a></p>
      </div>
      <section className="wrap">
        <div className="race-top">
          <NextRace races={races} />
          <div>
            <div className="eyebrow" style={{ marginBottom: 10 }}>Programação do fim de semana</div>
            <WeekendSessions races={races} />
          </div>
        </div>
      </section>
      <section className="block">
        <div className="wrap">
          <div className="sh"><h2>Próximas etapas</h2></div>
          <div className="cal"><RaceGrid races={races} winners={winners} upcomingOnly /></div>
        </div>
      </section>
      <section className="block" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="sh"><h2>Já disputadas</h2></div>
          <div className="cal"><RaceGrid races={races} winners={winners} pastOnly /></div>
        </div>
      </section>
    </>
  );
}
