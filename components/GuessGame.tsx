"use client";

import { useEffect, useState } from "react";
import { LEGENDS } from "@/content/legends";
import { dayOfYear, fold } from "@/lib/daily";

type State = { guesses: string[]; done: boolean; win: boolean };
const EMPTY: State = { guesses: [], done: false, win: false };
const MAX = 6;

function read(key: string): State {
  try { return JSON.parse(localStorage.getItem(key) ?? "") as State; } catch { return EMPTY; }
}
function write(key: string, s: State) {
  try { localStorage.setItem(key, JSON.stringify(s)); } catch { /* modo anônimo: segue sem salvar */ }
}

/** "Adivinhe o piloto": uma lenda por dia, seis tentativas, uma dica nova a cada erro. */
export function GuessGame() {
  const [day, setDay] = useState<Date | null>(null);
  const [state, setState] = useState<State>(EMPTY);
  const [value, setValue] = useState("");

  useEffect(() => {
    const d = new Date();
    setDay(d);
    setState(read(`lo-game-${d.toISOString().slice(0, 10)}`));
  }, []);

  if (!day) return <div className="game" id="jogo"><h3>Adivinhe o piloto</h3><p className="note">Carregando o piloto de hoje…</p></div>;

  const key = `lo-game-${day.toISOString().slice(0, 10)}`;
  const target = LEGENDS[(dayOfYear(day) * 7 + 3) % LEGENDS.length];
  const hints: [string, string][] = [
    ["País", target.country],
    ["Época", target.era],
    ["Uma equipe", target.teams[target.teams.length > 1 ? 1 : 0]],
    ["Títulos", String(target.titles.length)],
    ["Vitórias", String(target.wins)],
    ["Um carro", target.cars.at(-1)!.model],
  ];
  const shown = state.done ? MAX : Math.min(MAX, state.guesses.length + 1);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const v = value.trim();
    if (!v || state.done) return;
    const hit = LEGENDS.find((p) => fold(p.name) === fold(v) || fold(p.name.split(" ").at(-1)!) === fold(v));
    const guesses = [...state.guesses, hit ? hit.name : v];
    const win = hit?.slug === target.slug;
    const next = { guesses, win, done: win || guesses.length >= MAX };
    setState(next);
    write(key, next);
    setValue("");
  };

  let verdict = "", cls = "verdict";
  if (state.done) {
    cls += state.win ? " ok" : " no";
    verdict = state.win
      ? `Acertou em ${state.guesses.length} ${state.guesses.length > 1 ? "tentativas" : "tentativa"}: ${target.name}. Volte amanhã!`
      : `Era ${target.name}. Amanhã tem outro piloto.`;
  } else if (state.guesses.length) {
    cls += " no";
    verdict = `“${state.guesses.at(-1)}” não é. Nova dica liberada.`;
  }

  return (
    <div className="game" id="jogo">
      <div className="sh" style={{ margin: 0 }}>
        <h3>Adivinhe o piloto</h3>
        <span className="eyebrow">Jogo de {day.toLocaleDateString("pt-BR", { day: "2-digit", month: "short" })}</span>
      </div>
      <div className="tries" aria-hidden="true">
        {Array.from({ length: MAX }, (_, i) => (
          <i key={i} className={i < state.guesses.length ? (state.win && i === state.guesses.length - 1 ? "win" : "miss") : ""} />
        ))}
      </div>
      <div className="hints">
        {hints.map(([k, v], i) => (
          <div key={k} className={`hint ${i < shown ? "" : "locked"}`}><small>{k}</small><b>{i < shown ? v : "•••"}</b></div>
        ))}
      </div>
      <form className="guess" onSubmit={submit} autoComplete="off">
        <input list="g-list" value={value} onChange={(e) => setValue(e.target.value)} disabled={state.done} placeholder="Digite o nome de uma lenda" aria-label="Seu palpite" />
        <datalist id="g-list">{LEGENDS.map((p) => <option key={p.slug} value={p.name} />)}</datalist>
        <button className="btn primary" type="submit" disabled={state.done}>Chutar</button>
      </form>
      <div className={cls} aria-live="polite">{verdict}</div>
    </div>
  );
}
