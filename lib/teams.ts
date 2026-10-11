/** Cores usadas para equipes históricas (filtro por carro nas lendas). Só a cor, nunca o logo. */
export const LEGACY_TEAMS: Record<string, string> = {
  Ferrari: "#d8141c",
  McLaren: "#ff8000",
  Williams: "#1e5bc6",
  Lotus: "#1d7a46",
  Mercedes: "#00b5a5",
  "Red Bull": "#3671c6",
  Brabham: "#2f5fb3",
  Benetton: "#22a55b",
  Maserati: "#9b2335",
  "Alfa Romeo": "#a3121b",
  Brawn: "#c8e639",
  "Toro Rosso": "#4a6fd1",
};

/** Cores das equipes atuais, pelo constructorId da Jolpica (valores da OpenF1). */
const CURRENT: Record<string, string> = {
  mercedes: "#00d7b6",
  ferrari: "#ed1131",
  mclaren: "#f47600",
  red_bull: "#4781d7",
  rb: "#6c98ff",
  alpine: "#00a1e8",
  haas: "#9c9fa2",
  audi: "#f50537",
  sauber: "#f50537",
  williams: "#1868db",
  aston_martin: "#229971",
  cadillac: "#909090",
};

const NAMES: Record<string, string> = {
  rb: "Racing Bulls",
  red_bull: "Red Bull",
  alpine: "Alpine",
  haas: "Haas",
  cadillac: "Cadillac",
  aston_martin: "Aston Martin",
};

export function teamColor(constructorId: string): string {
  return CURRENT[constructorId] ?? "#8c94a6";
}

export function teamName(constructorId: string, fallback: string): string {
  return NAMES[constructorId] ?? fallback.replace(/ F1 Team$/, "");
}
