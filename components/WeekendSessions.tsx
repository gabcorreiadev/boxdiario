"use client";

import { RACE_WINDOW_MS } from "@/lib/time";
import type { Race } from "@/lib/types";
import { LocalTime } from "./LocalTime";
import { useNow } from "./useNow";

export function WeekendSessions({ races }: { races: Race[] }) {
  const now = useNow(60_000) ?? Date.now();
  const race = races.find((r) => Date.parse(r.startsAt) + RACE_WINDOW_MS > now) ?? races.at(-1);
  if (!race) return null;
  return (
    <div className="sessions">
      {race.sessions.map((s) => (
        <div key={s.kind} className={`sess ${s.kind === "RACE" ? "race" : ""} ${s.kind !== "RACE" && Date.parse(s.startsAt) + 3_600_000 < now ? "past" : ""}`}>
          <b>{s.label}</b><span className="t"><LocalTime iso={s.startsAt} format="time" /></span>
        </div>
      ))}
    </div>
  );
}
