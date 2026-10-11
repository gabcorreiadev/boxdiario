"use client";

import { RACE_WINDOW_MS } from "@/lib/time";
import type { Race } from "@/lib/types";
import { LocalTime } from "./LocalTime";
import { WatchChips } from "./WatchChips";
import { useNow } from "./useNow";

const pad = (n: number) => String(Math.max(0, n)).padStart(2, "0");

/** Recebe a temporada inteira e escolhe a próxima corrida no navegador, com contagem regressiva. */
export function NextRace({ races }: { races: Race[] }) {
  const now = useNow();
  const ref = now ?? Date.now();
  const race = races.find((r) => Date.parse(r.startsAt) + RACE_WINDOW_MS > ref) ?? races.at(-1);
  if (!race) return <article className="next"><p>Calendário indisponível no momento.</p></article>;

  const diff = Date.parse(race.startsAt) - ref;
  const s = Math.max(0, Math.floor(diff / 1000));
  const live = now !== null && diff <= 0 && diff > -RACE_WINDOW_MS;
  const parts = now === null ? ["--", "--", "--", "--"] : [pad(Math.floor(s / 86400)), pad(Math.floor((s % 86400) / 3600)), pad(Math.floor((s % 3600) / 60)), pad(s % 60)];

  return (
    <article className={`next ${live ? "is-live" : ""}`} aria-live="polite">
      <div className="head">
        <div>
          <div className="eyebrow">Próxima corrida</div>
          <h2>{race.name}</h2>
          <div className="where">{race.circuit} · {race.locality}</div>
        </div>
        <span className="round mono">R{race.round} / {races.length}</span>
      </div>
      <div className="live">AO VIVO AGORA</div>
      <div className="clock" role="timer" aria-label="Contagem regressiva para a largada">
        {["dias", "horas", "min", "seg"].map((label, i) => (
          <div key={label}><b>{parts[i]}</b><small>{label}</small></div>
        ))}
      </div>
      <div className="when"><span>Largada no seu horário</span><b className="mono"><LocalTime iso={race.startsAt} /></b></div>
      <div>
        <div className="eyebrow" style={{ marginBottom: 10, display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
          Onde assistir no Brasil {race.sprint && <span className="tag">Fim de semana Sprint</span>}
        </div>
        <WatchChips broadcast={race.broadcast} />
      </div>
    </article>
  );
}
