"use client";

import { useState } from "react";
import type { Standings } from "@/lib/types";
import { BrFlag } from "./BrFlag";

type Row = { key: string; position: number; name: string; sub?: string; color: string; points: number; wins: number; brazilian?: boolean };

function Podium({ rows }: { rows: Row[] }) {
  const leader = rows[0]?.points ?? 0;
  return (
    <div className="podium">
      {rows.slice(0, 3).map((r) => (
        <div key={r.key} className={`pod-card p${r.position}`} style={{ ["--team" as string]: r.color }}>
          <span className="pos">P{r.position}</span>
          <div className="who">
            <b>{r.name}{r.brazilian && <BrFlag />}</b>
            {r.sub && <small>{r.sub}</small>}
          </div>
          <div className="pts"><b>{r.points}</b><small>pontos</small></div>
          <div className="gap mono">{r.position === 1 ? `${r.wins} vitórias` : `−${leader - r.points} do líder`}</div>
        </div>
      ))}
    </div>
  );
}

function Rows({ rows }: { rows: Row[] }) {
  const leader = rows[0]?.points || 1;
  return (
    <div className="standings">
      <div className="srow head" aria-hidden="true">
        <span>Pos</span><span /><span>{rows[0]?.sub !== undefined ? "Piloto" : "Equipe"}</span><span className="bar-h">Pontos</span><span className="w">Vit.</span><span className="g">Dif.</span>
      </div>
      {rows.map((r) => (
        <div key={r.key} className={`srow ${r.brazilian ? "br" : ""}`} style={{ ["--team" as string]: r.color }}>
          <span className="p">{r.position}</span>
          <span className="c" />
          <span className="n"><b>{r.name}{r.brazilian && <BrFlag />}</b>{r.sub && <small>{r.sub}</small>}</span>
          <span className="bar">
            <i style={{ width: `${Math.max(1.5, (r.points / leader) * 100)}%` }} />
            <b>{r.points}</b>
          </span>
          <span className="w">{r.wins}</span>
          <span className="g">{r.position === 1 ? "—" : `−${rows[0].points - r.points}`}</span>
        </div>
      ))}
    </div>
  );
}

export function StandingsTable({ data }: { data: Standings }) {
  const [tab, setTab] = useState<"drv" | "cons">("drv");
  const rows: Row[] =
    tab === "drv"
      ? data.drivers.map((d) => ({ key: d.name, position: d.position, name: d.name, sub: d.team, color: d.teamColor, points: d.points, wins: d.wins, brazilian: d.brazilian }))
      : data.constructors.map((c) => ({ key: c.team, position: c.position, name: c.team, color: c.teamColor, points: c.points, wins: c.wins }));
  return (
    <>
      <div className="seg" role="group" aria-label="Escolha a classificação">
        <button type="button" aria-pressed={tab === "drv"} onClick={() => setTab("drv")}>Pilotos</button>
        <button type="button" aria-pressed={tab === "cons"} onClick={() => setTab("cons")}>Equipes</button>
      </div>
      <Podium rows={rows} />
      <Rows rows={rows} />
    </>
  );
}
