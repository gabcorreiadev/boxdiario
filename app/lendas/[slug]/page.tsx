import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CarIcon } from "@/components/CarIcon";
import { SennaTribute } from "@/components/SennaTribute";
import { getLegend, LEGENDS } from "@/content/legends";
import { LEGACY_TEAMS } from "@/lib/teams";

export function generateStaticParams() {
  return LEGENDS.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const l = getLegend((await params).slug);
  return l ? { title: l.name, description: l.short } : {};
}

export default async function LegendPage({ params }: { params: Promise<{ slug: string }> }) {
  const p = getLegend((await params).slug);
  if (!p) notFound();

  return (
    <>
      <header className={`dh ${p.brazilian ? "br" : ""}`} style={{ ["--hue" as string]: p.hue }}>
        <div className="wrap">
          <Link href="/lendas" className="eyebrow" style={{ textDecoration: "none" }}>← Lendas</Link>
          <h1>{p.name}</h1>
          <span className="eyebrow">{p.country} · {p.era}{p.nick ? ` · ${p.nick}` : ""}</span>
        </div>
      </header>

      <div className="wrap" style={{ display: "grid", gap: 28, paddingBlock: "clamp(28px,5vw,56px)" }}>
        <div className="kv">
          <div><b>{p.titles.length}</b><small>títulos</small></div>
          <div><b>{p.wins}</b><small>vitórias</small></div>
          <div><b>{p.starts ?? "ativo"}</b><small>{p.starts ? "largadas" : "na pista"}</small></div>
        </div>
        <p className="prose-lg">{p.story}</p>
        <p className="moment">{p.moment}</p>
        <div>
          <div className="eyebrow" style={{ marginBottom: 10 }}>Carros marcantes</div>
          <div className="carlist">
            {p.cars.map((c) => (
              <div className="carrow" key={`${c.model}-${c.year}`}>
                <CarIcon color={LEGACY_TEAMS[c.team] ?? p.hue} />
                <div><b>{c.team} {c.model}</b><small>{p.titles.includes(c.year) ? "Carro campeão" : "Temporada marcante"}</small></div>
                <span className="mono" style={{ color: "var(--color-mist)" }}>{c.year}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="eyebrow" style={{ marginBottom: 10 }}>Títulos e vices</div>
          <div className="years">
            {p.titles.map((y) => <span key={y}>{y}</span>)}
            {p.vices.map((y) => <span key={y} className="vice">{y} · vice</span>)}
          </div>
        </div>
        {p.photo && (
          <p className="note">Foto: {p.photo.credit}, {p.photo.license} (<a href={p.photo.sourceUrl}>fonte</a>)</p>
        )}
      </div>

      {p.slug === "ayrton-senna" && <SennaTribute showLink={false} />}
    </>
  );
}
