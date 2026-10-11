"use client";

import Link from "next/link";
import { RACE_WINDOW_MS } from "@/lib/time";
import type { Race } from "@/lib/types";
import { BrFlag } from "./BrFlag";
import { LocalTime } from "./LocalTime";
import { Trophy } from "./Trophy";
import { useNow } from "./useNow";

export type Winners = Record<number, { name: string; code: string; teamColor: string; brazilian: boolean }>;

export function RaceGrid({ races, winners = {}, upcomingOnly = false, pastOnly = false, limit }: { races: Race[]; winners?: Winners; upcomingOnly?: boolean; pastOnly?: boolean; limit?: number }) {
  const now = useNow(60_000) ?? Date.now();
  const next = races.find((r) => Date.parse(r.startsAt) + RACE_WINDOW_MS > now);
  let list = upcomingOnly ? races.filter((r) => Date.parse(r.startsAt) + RACE_WINDOW_MS > now) : races;
  if (pastOnly) list = races.filter((r) => Date.parse(r.startsAt) + RACE_WINDOW_MS <= now).reverse(); // mais recente primeiro
  if (limit) list = list.slice(0, limit);
  return (
    <>
      {list.map((r) => {
        const done = Date.parse(r.startsAt) + RACE_WINDOW_MS < now;
        const isNext = r === next;
        const w = winners[r.round];
        const label = done ? "ENCERRADA" : isNext ? "PRÓXIMA" : r.home ? "EM CASA" : r.sprint ? "SPRINT" : "";
        return (
          <Link key={r.round} href={`/corridas/${r.round}`} className={`gp ${done ? "done" : ""} ${isNext ? "now" : ""} ${r.home ? "br" : ""}`}>
            <div className="r"><span>R{r.round}</span><span>{label}</span></div>
            <h3>{r.short}</h3>
            <div className="d"><LocalTime iso={r.startsAt} /></div>
            {done && w ? (
              <div className="winner" style={{ ["--team" as string]: w.teamColor }}>
                <Trophy kind="g" /> {w.name}{w.brazilian && <BrFlag />}
                <span className="see">Ver resultado →</span>
              </div>
            ) : (
              <div className={`ch ${r.broadcast.openTv ? "tv" : "cable"}`}>
                {r.broadcast.openTv ? "● Globo + SporTV" : "● SporTV · Globoplay"}
              </div>
            )}
          </Link>
        );
      })}
    </>
  );
}
