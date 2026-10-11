"use client";

import { useState } from "react";
import type { RaceWeekendResults, ResultRow } from "@/lib/jolpica";
import { BrFlag } from "./BrFlag";

const TABS = [
  { key: "race", label: "Corrida" },
  { key: "sprint", label: "Sprint" },
  { key: "qualifying", label: "Classificação" },
] as const;

function Delta({ r }: { r: ResultRow }) {
  if (!r.grid || !r.classified) return <span className="delta" />;
  const d = r.grid - r.position;
  if (d === 0) return <span className="delta">=</span>;
  return <span className={`delta ${d > 0 ? "up" : "down"}`}>{d > 0 ? "▲" : "▼"}{Math.abs(d)}</span>;
}

function Podium({ rows }: { rows: ResultRow[] }) {
  const top = [rows[1], rows[0], rows[2]].filter(Boolean);
  return (
    <div className="rpodium">
      {top.map((r) => (
        <div key={r.code} className={`step s${r.position}`} style={{ ["--team" as string]: r.teamColor }}>
          <span className="code">{r.code}</span>
          <b>{r.name}{r.brazilian && <BrFlag />}</b>
          <small>{r.team}</small>
          <div className="block"><span>{r.position}</span></div>
        </div>
      ))}
    </div>
  );
}

export function ResultsTabs({ data }: { data: RaceWeekendResults }) {
  const available = TABS.filter((t) => data[t.key].length > 0);
  const [tab, setTab] = useState<(typeof TABS)[number]["key"]>(available[0]?.key ?? "race");
  const rows = data[tab];
  const isQuali = tab === "qualifying";
  return (
    <>
      {available.length > 1 && (
        <div className="seg" role="group" aria-label="Sessão">
          {available.map((t) => (
            <button key={t.key} type="button" aria-pressed={tab === t.key} onClick={() => setTab(t.key)}>{t.label}</button>
          ))}
        </div>
      )}
      {!isQuali && <Podium rows={rows} />}
      <div className="standings results">
        <div className="srow head" aria-hidden="true">
          <span>Pos</span><span /><span>Piloto</span>
          {isQuali ? <span className="g">Melhor volta</span> : <><span className="w">Largou</span><span className="g">Tempo / dif.</span><span className="w">Pts</span></>}
        </div>
        {rows.map((r) => (
          <div key={r.code} className={`srow ${r.brazilian ? "br" : ""} ${r.classified ? "" : "out"}`} style={{ ["--team" as string]: r.teamColor }}>
            <span className="p">{r.classified ? r.position : "—"}</span>
            <span className="c" />
            <span className="n"><b>{r.name}{r.brazilian && <BrFlag />}{r.fastest && <span className="fl" title="Volta mais rápida">VMR</span>}</b><small>{r.team}</small></span>
            {isQuali ? (
              <span className="g mono">{r.q.at(-1) ?? "—"}</span>
            ) : (
              <>
                <span className="w mono">{r.grid ? `P${r.grid}` : "box"} <Delta r={r} /></span>
                <span className="g mono">{r.gap || "—"}</span>
                <span className="w mono"><b>{r.points || ""}</b></span>
              </>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
