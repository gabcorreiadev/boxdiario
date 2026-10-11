import { getBroadcastMap } from "./broadcast";
import { racePt } from "./races-pt";
import { teamColor, teamName } from "./teams";
import { RACE_WINDOW_MS } from "./time";
import type { Race, Session, SessionKind, Standings } from "./types";

/**
 * Cliente da Jolpica-F1 (sucessora da Ergast). Gratuita, sem chave: 4 req/s e 500 req/hora.
 * O navegador nunca chama a API: tudo passa pelo cache do Next (revalidate).
 */
const BASE = "https://api.jolpi.ca/ergast/f1";
const DAY = 60 * 60 * 24;
const HOUR = 60 * 60;

async function get<T>(path: string, revalidate: number): Promise<T | null> {
  try {
    const res = await fetch(`${BASE}${path}`, { next: { revalidate } });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

type JDate = { date: string; time?: string };
type JRace = JDate & {
  season: string;
  round: string;
  raceName: string;
  Circuit: { circuitName: string; Location: { locality: string; country: string } };
  FirstPractice?: JDate;
  SecondPractice?: JDate;
  ThirdPractice?: JDate;
  SprintQualifying?: JDate;
  Sprint?: JDate;
  Qualifying?: JDate;
};

const SESSION_KEYS: [keyof JRace, SessionKind, string][] = [
  ["FirstPractice", "FP1", "Treino Livre 1"],
  ["SecondPractice", "FP2", "Treino Livre 2"],
  ["ThirdPractice", "FP3", "Treino Livre 3"],
  ["SprintQualifying", "SQ", "Classificação Sprint"],
  ["Sprint", "SPRINT", "Sprint"],
  ["Qualifying", "QUALI", "Classificação"],
];

const iso = (d: JDate) => `${d.date}T${d.time ?? "12:00:00Z"}`;

export async function getSeason(season: string = "current"): Promise<Race[]> {
  const data = await get<{ MRData: { RaceTable: { Races: JRace[] } } }>(`/${season}/races/?limit=40`, DAY);
  if (!data) return [];
  const broadcast = await getBroadcastMap();
  return data.MRData.RaceTable.Races.map((r) => {
    const round = Number(r.round);
    const pt = racePt(r.raceName);
    const sessions: Session[] = SESSION_KEYS.flatMap(([key, kind, label]) => {
      const s = r[key] as JDate | undefined;
      return s ? [{ kind, label, startsAt: iso(s) }] : [];
    });
    sessions.push({ kind: "RACE", label: "Corrida", startsAt: iso(r) });
    sessions.sort((a, b) => a.startsAt.localeCompare(b.startsAt));
    return {
      round,
      name: pt.name,
      short: pt.short,
      circuit: r.Circuit.circuitName,
      locality: r.Circuit.Location.locality,
      country: r.Circuit.Location.country,
      startsAt: iso(r),
      sprint: Boolean(r.Sprint),
      home: r.Circuit.Location.country === "Brazil",
      sessions,
      broadcast: broadcast(round),
    };
  });
}

type JDriverStanding = {
  position: string;
  points: string;
  wins: string;
  Driver: { givenName: string; familyName: string; nationality: string };
  Constructors: { constructorId: string; name: string }[];
};
type JConsStanding = {
  position: string;
  points: string;
  wins: string;
  Constructor: { constructorId: string; name: string };
};
type JList<T> = { MRData: { StandingsTable: { StandingsLists: (T & { round: string })[] } } };

export async function getStandings(): Promise<Standings | null> {
  const [d, c] = await Promise.all([
    get<JList<{ DriverStandings: JDriverStanding[] }>>("/current/driverStandings/", HOUR),
    get<JList<{ ConstructorStandings: JConsStanding[] }>>("/current/constructorStandings/", HOUR),
  ]);
  const dl = d?.MRData.StandingsTable.StandingsLists[0];
  const cl = c?.MRData.StandingsTable.StandingsLists[0];
  if (!dl || !cl) return null;
  return {
    round: Number(dl.round),
    drivers: dl.DriverStandings.map((s) => {
      const team = s.Constructors.at(-1)!;
      return {
        position: Number(s.position),
        name: `${s.Driver.givenName} ${s.Driver.familyName}`.replace("Andrea Kimi", "Kimi"),
        team: teamName(team.constructorId, team.name),
        teamColor: teamColor(team.constructorId),
        points: Number(s.points),
        wins: Number(s.wins),
        brazilian: s.Driver.nationality === "Brazilian",
      };
    }),
    constructors: cl.ConstructorStandings.map((s) => ({
      position: Number(s.position),
      team: teamName(s.Constructor.constructorId, s.Constructor.name),
      teamColor: teamColor(s.Constructor.constructorId),
      points: Number(s.points),
      wins: Number(s.wins),
    })),
  };
}

export function nextRace(races: Race[], now = Date.now()): Race | undefined {
  return races.find((r) => Date.parse(r.startsAt) + RACE_WINDOW_MS > now) ?? races.at(-1);
}

/* ---------------- Resultados ---------------- */

type JResult = {
  position: string;
  positionText: string;
  points: string;
  grid?: string;
  laps?: string;
  status?: string;
  Time?: { time: string };
  FastestLap?: { rank?: string; Time?: { time: string } };
  Q1?: string;
  Q2?: string;
  Q3?: string;
  Driver: { code?: string; givenName: string; familyName: string; nationality: string };
  Constructor: { constructorId: string; name: string };
};

const STATUS_PT: Record<string, string> = {
  Retired: "Abandonou",
  Disqualified: "Desclassificado",
  "Did not start": "Não largou",
  Lapped: "Volta atrás",
  Finished: "",
};

function mapResult(r: JResult): ResultRow {
  const team = r.Constructor;
  const classified = /^\d+$/.test(r.positionText);
  let gap = r.Time?.time ?? "";
  if (!gap && r.status) gap = r.status.startsWith("+") ? r.status.replace("Laps", "voltas").replace("Lap", "volta") : (STATUS_PT[r.status] ?? r.status);
  return {
    position: Number(r.position),
    classified,
    code: r.Driver.code ?? r.Driver.familyName.slice(0, 3).toUpperCase(),
    name: `${r.Driver.givenName} ${r.Driver.familyName}`.replace("Andrea Kimi", "Kimi"),
    brazilian: r.Driver.nationality === "Brazilian",
    team: teamName(team.constructorId, team.name),
    teamColor: teamColor(team.constructorId),
    grid: r.grid ? Number(r.grid) : null,
    points: Number(r.points),
    gap,
    fastest: r.FastestLap?.rank === "1",
    q: [r.Q1, r.Q2, r.Q3].filter(Boolean) as string[],
  };
}

export type ResultRow = {
  position: number;
  classified: boolean;
  code: string;
  name: string;
  brazilian: boolean;
  team: string;
  teamColor: string;
  grid: number | null;
  points: number;
  gap: string;
  fastest: boolean;
  q: string[];
};

export type RaceWeekendResults = { race: ResultRow[]; sprint: ResultRow[]; qualifying: ResultRow[] };

type JRaces<K extends string> = { MRData: { RaceTable: { Races: ({ [key in K]: JResult[] })[] } } };

/** Resultado de um fim de semana. Corrida já disputada não muda, então o cache é longo. */
export async function getWeekendResults(round: number, season = "current"): Promise<RaceWeekendResults> {
  const [race, sprint, quali] = await Promise.all([
    get<JRaces<"Results">>(`/${season}/${round}/results/?limit=40`, HOUR),
    get<JRaces<"SprintResults">>(`/${season}/${round}/sprint/?limit=40`, HOUR),
    get<JRaces<"QualifyingResults">>(`/${season}/${round}/qualifying/?limit=40`, HOUR),
  ]);
  return {
    race: race?.MRData.RaceTable.Races[0]?.Results.map(mapResult) ?? [],
    sprint: sprint?.MRData.RaceTable.Races[0]?.SprintResults.map(mapResult) ?? [],
    qualifying: quali?.MRData.RaceTable.Races[0]?.QualifyingResults.map(mapResult) ?? [],
  };
}

/** Vencedor de cada corrida da temporada numa única chamada (para os cards do calendário). */
export async function getSeasonWinners(season = "current"): Promise<Record<number, { name: string; code: string; teamColor: string; brazilian: boolean }>> {
  type J = { MRData: { RaceTable: { Races: { round: string; Results: JResult[] }[] } } };
  const data = await get<J>(`/${season}/results/1/?limit=100`, HOUR);
  const out: Record<number, { name: string; code: string; teamColor: string; brazilian: boolean }> = {};
  for (const r of data?.MRData.RaceTable.Races ?? []) {
    const w = mapResult(r.Results[0]);
    out[Number(r.round)] = { name: w.name, code: w.code, teamColor: w.teamColor, brazilian: w.brazilian };
  }
  return out;
}
