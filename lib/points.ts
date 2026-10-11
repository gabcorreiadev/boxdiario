import type { Race } from "./types";

/** Pontuação de 2026: corrida 25-18-15-12-10-8-6-4-2-1, sprint 8-7-6-5-4-3-2-1. */
export const RACE_WIN = 25;
export const SPRINT_WIN = 8;

/** Quantos pontos um piloto ainda pode somar no ano, contando corridas e sprints que não aconteceram. */
export function pointsLeft(races: Race[], now = Date.now()) {
  let racesLeft = 0, sprintsLeft = 0;
  for (const r of races) {
    if (Date.parse(r.startsAt) > now) racesLeft++;
    const sprint = r.sessions.find((s) => s.kind === "SPRINT");
    if (sprint && Date.parse(sprint.startsAt) > now) sprintsLeft++;
  }
  return { racesLeft, sprintsLeft, max: racesLeft * RACE_WIN + sprintsLeft * SPRINT_WIN };
}
