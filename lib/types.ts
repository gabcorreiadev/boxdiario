export type SessionKind = "FP1" | "FP2" | "FP3" | "SQ" | "SPRINT" | "QUALI" | "RACE";

export type Session = { kind: SessionKind; label: string; startsAt: string };

export type Channel = "GLOBO" | "SPORTV3" | "GLOBOPLAY" | "F1TV";

export type Broadcast = { openTv: boolean; channels: Channel[] };

export type Race = {
  round: number;
  name: string; // "GP de São Paulo"
  short: string; // "São Paulo"
  circuit: string;
  locality: string;
  country: string;
  startsAt: string; // ISO UTC
  sprint: boolean;
  home: boolean; // corrida no Brasil
  sessions: Session[];
  broadcast: Broadcast;
};

export type DriverStanding = {
  position: number;
  name: string;
  team: string;
  teamColor: string;
  points: number;
  wins: number;
  brazilian: boolean;
};

export type ConstructorStanding = {
  position: number;
  team: string;
  teamColor: string;
  points: number;
  wins: number;
};

export type Standings = {
  round: number;
  drivers: DriverStanding[];
  constructors: ConstructorStanding[];
};

export type LegendCar = { team: string; model: string; year: number };

export type Legend = {
  slug: string;
  name: string;
  nick?: string;
  country: string; // nome em português
  code: string; // ARG, BRA...
  brazilian?: boolean;
  era: string;
  hue: string;
  titles: number[];
  vices: number[];
  wins: number;
  starts: number | null; // null = ainda correndo
  teams: string[];
  cars: LegendCar[];
  short: string;
  story: string;
  moment: string;
  photo?: { src: string; credit: string; license: string; sourceUrl: string };
};

export type DailyFact = { tag: string; title: string; text: string };
