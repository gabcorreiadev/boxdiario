import Link from "next/link";
import Image from "next/image";
import type { Legend } from "@/lib/types";
import { Trophy } from "./Trophy";

/** Card de lenda. Pilotos brasileiros ganham a arte da bandeira do Brasil. `hit` destaca o carro buscado. */
export function LegendCard({ legend: p, hit }: { legend: Legend; hit?: (model: string) => boolean }) {
  const models = [...new Set(p.cars.map((c) => c.model))];
  const initials = p.name.split(" ").at(-1)!.slice(0, 3).toUpperCase();
  return (
    <Link href={`/lendas/${p.slug}`} className="card" style={{ ["--hue" as string]: p.hue }} aria-label={`Ler a história de ${p.name}`}>
      <div className={`art ${p.brazilian ? "br" : ""}`}>
        {p.photo && <Image src={p.photo.src} alt="" fill sizes="(max-width: 760px) 50vw, 25vw" />}
        <span className="cc">{p.code}</span>
        <span className="num">
          {p.titles.length ? p.titles.length : p.wins}
          <small>{p.titles.length ? (p.titles.length > 1 ? "títulos" : "título") : "vitórias"}</small>
        </span>
        <span className="ini">{initials}</span>
        {p.brazilian && <span className="br-ribbon">BRASIL</span>}
      </div>
      <div className="meta">
        <h3>{p.name}</h3>
        <div className="trophies" aria-label={`${p.titles.length} títulos e ${p.vices.length} vice-campeonatos`}>
          {p.titles.map((y) => <Trophy key={y} kind="g" />)}
          {p.vices.map((y) => <Trophy key={y} kind="s" />)}
        </div>
        <p>{p.short}</p>
        <div className="cars">{models.map((m) => <span key={m} className={hit?.(m) ? "hit" : ""}>{m}</span>)}</div>
        <div className="stats mono"><span><b>{p.wins}</b> vitórias</span><span>{p.era}</span></div>
      </div>
    </Link>
  );
}
