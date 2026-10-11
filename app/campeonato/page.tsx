import type { Metadata } from "next";
import { StandingsTable } from "@/components/StandingsTable";
import { getSeason, getStandings } from "@/lib/jolpica";
import { pointsLeft } from "@/lib/points";

export const metadata: Metadata = { title: "Campeonato", description: "Classificação atual de pilotos e equipes e a briga pelo título." };
export const revalidate = 3600;

export default async function Campeonato() {
  const [data, races] = await Promise.all([getStandings(), getSeason()]);
  const left = pointsLeft(races);
  const [p1, p2] = data?.drivers ?? [];
  const alive = data ? data.drivers.filter((d) => d.points + left.max >= p1.points) : [];

  return (
    <>
      <div className="wrap page-head">
        <span className="eyebrow">{data ? `Atualizado após a etapa ${data.round}` : "Temporada atual"}</span>
        <h1>Campeonato</h1>
        <p>Quem está na briga pelo título. A tabela atualiza sozinha depois de cada corrida.</p>
      </div>

      {data && p1 && p2 && (
        <section className="wrap">
          <div className="fight">
            <div>
              <span className="eyebrow">A briga pelo título</span>
              <p className="fight-lead">
                <b style={{ color: p1.teamColor }}>{p1.name}</b> lidera com <b>{p1.points - p2.points} pontos</b> de vantagem sobre {p2.name}.
              </p>
            </div>
            <div className="fight-stats">
              <div><b>{left.racesLeft}</b><small>corridas restantes</small></div>
              <div><b>{left.sprintsLeft}</b><small>sprints restantes</small></div>
              <div><b>{left.max}</b><small>pontos em jogo</small></div>
              <div><b>{alive.length}</b><small>{alive.length === 1 ? "piloto pode ser campeão" : "pilotos podem ser campeões"}</small></div>
            </div>
          </div>
        </section>
      )}

      <section className="wrap" style={{ marginTop: 20 }}>
        {data ? <StandingsTable data={data} /> : <p className="empty">Não foi possível carregar a classificação agora. Tente de novo em alguns minutos.</p>}
        <p className="note">Fonte: Jolpica-F1. Pontos em jogo = 25 por corrida + 8 por sprint que ainda não aconteceram.</p>
      </section>
      <div style={{ height: 56 }} />
    </>
  );
}
