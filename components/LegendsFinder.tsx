"use client";

import { useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { LEGENDS } from "@/content/legends";
import { fold } from "@/lib/daily";
import { LEGACY_TEAMS } from "@/lib/teams";
import { CarIcon } from "./CarIcon";
import { LegendCard } from "./LegendCard";

const haystack = LEGENDS.map((p) =>
  fold([p.name, p.nick ?? "", p.country, p.code, ...p.teams, ...p.cars.flatMap((c) => [c.model, `${c.team} ${c.model}`])].join("|")),
);

const teamList = (() => {
  const count: Record<string, number> = {};
  for (const p of LEGENDS) for (const t of new Set([...p.teams, ...p.cars.map((c) => c.team)])) if (LEGACY_TEAMS[t]) count[t] = (count[t] ?? 0) + 1;
  return Object.keys(count).sort((a, b) => count[b] - count[a]);
})();

/** Busca por nome, equipe ou carro + filtro por equipe. O estado fica na URL (?q=&equipe=). */
export function LegendsFinder() {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [query, setQuery] = useState(params.get("q") ?? "");
  const [team, setTeam] = useState<string | null>(params.get("equipe"));

  const sync = (q: string, t: string | null) => {
    const sp = new URLSearchParams();
    if (q) sp.set("q", q);
    if (t) sp.set("equipe", t);
    router.replace(sp.size ? `${pathname}?${sp}` : pathname, { scroll: false });
  };

  const q = fold(query.trim());
  const list = useMemo(
    () => LEGENDS.filter((p, i) => (!q || haystack[i].includes(q)) && (!team || p.teams.includes(team) || p.cars.some((c) => c.team === team))),
    [q, team],
  );
  const teamCars = team ? LEGENDS.flatMap((p) => p.cars.filter((c) => c.team === team).map((c) => `${c.model} (${p.name.split(" ").at(-1)}, ${c.year})`)) : [];

  return (
    <>
      <div className="finder">
        <label className="search" htmlFor="q">
          <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
          <input
            id="q" type="search" autoComplete="off" value={query}
            placeholder="Piloto, equipe ou carro (ex.: MP4/4, Lotus 72)"
            onChange={(e) => { setQuery(e.target.value); sync(e.target.value, team); }}
          />
          {query && <button type="button" onClick={() => { setQuery(""); sync("", team); }}>Limpar</button>}
        </label>
        <div className="teams" role="group" aria-label="Filtrar por equipe">
          <button type="button" className="team all" aria-pressed={!team} onClick={() => { setTeam(null); sync(query, null); }}>Todas</button>
          {teamList.map((t) => (
            <button key={t} type="button" className="team" aria-pressed={team === t} style={{ ["--tc" as string]: LEGACY_TEAMS[t] }}
              onClick={() => { setTeam(t); sync(query, t); }}>
              <CarIcon color={LEGACY_TEAMS[t]} />{t}
            </button>
          ))}
        </div>
        <div className="result-line" aria-live="polite">
          <span><b>{list.length}</b> de {LEGENDS.length} pilotos</span>
          {teamCars.length > 0 && <span>· Carros {team}: {teamCars.join(", ")}</span>}
        </div>
      </div>
      <div className="grid-legends">
        {list.length ? list.map((p) => <LegendCard key={p.slug} legend={p} hit={q ? (m) => fold(m).includes(q) : undefined} />)
          : <div className="empty">Nenhuma lenda encontrada{query ? ` para “${query}”` : ""}{team ? ` na ${team}` : ""}. Tente o nome de um carro, como F2004 ou Lotus 72.</div>}
      </div>
    </>
  );
}
