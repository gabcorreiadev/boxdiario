import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { LocalTime } from "@/components/LocalTime";
import { ResultsTabs } from "@/components/ResultsTabs";
import { WatchChips } from "@/components/WatchChips";
import { getSeason, getWeekendResults } from "@/lib/jolpica";
import { SITE } from "@/lib/site";

export const revalidate = 3600;
// Páginas geradas na primeira visita e guardadas em cache (não estoura o limite da API no build).
export function generateStaticParams() {
  return [];
}

type Props = { params: Promise<{ round: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const round = Number((await params).round);
  const races = await getSeason();
  const r = races.find((x) => x.round === round);
  if (!r) return {};
  const year = r.startsAt.slice(0, 4);
  const title = `${r.name} ${year}: horário, onde assistir e resultado`;
  const description = `Horários do ${r.name} ${year} no seu fuso, onde assistir no Brasil (${r.broadcast.openTv ? "Globo, SporTV 3, Globoplay e F1 TV" : "SporTV 3, Globoplay e F1 TV"}), resultado e classificação completa.`;
  return { title, description, alternates: { canonical: `/corridas/${r.round}` }, openGraph: { title, description, url: `/corridas/${r.round}` } };
}

export default async function RacePage({ params }: Props) {
  const round = Number((await params).round);
  const races = await getSeason();
  const race = races.find((r) => r.round === round);
  if (!race) notFound();
  const results = await getWeekendResults(round);
  const hasResults = results.race.length + results.sprint.length + results.qualifying.length > 0;
  const prev = races.find((r) => r.round === round - 1);
  const next = races.find((r) => r.round === round + 1);

  const done = results.race.length > 0;
  return (
    <>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "SportsEvent",
        name: `${race.name} ${race.startsAt.slice(0, 4)}`,
        sport: "Fórmula 1",
        startDate: race.startsAt,
        endDate: new Date(Date.parse(race.startsAt) + 2 * 3600_000).toISOString(),
        eventStatus: "https://schema.org/EventScheduled",
        eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
        location: { "@type": "Place", name: race.circuit, address: { "@type": "PostalAddress", addressLocality: race.locality, addressCountry: race.country } },
        url: `${SITE.url}/corridas/${race.round}`,
        description: done ? `Resultado: vitória de ${results.race[0].name}.` : `Etapa ${race.round} da temporada.`,
      }} />
      <header className={`race-head ${race.home ? "br" : ""}`}>
        <div className="wrap">
          <Link href="/corridas" className="eyebrow" style={{ textDecoration: "none" }}>← Corridas</Link>
          <h1>{race.name}</h1>
          <p className="where">{race.circuit} · {race.locality}, {race.country}</p>
          <div className="race-meta">
            <span className="round mono">Etapa {race.round} de {races.length}</span>
            {race.sprint && <span className="tag">Fim de semana Sprint</span>}
            <span className="mono"><LocalTime iso={race.startsAt} /></span>
          </div>
        </div>
      </header>

      <section className="wrap" style={{ display: "grid", gap: 24, paddingBlock: "clamp(24px,4vw,40px)" }}>
        {hasResults ? (
          <ResultsTabs data={results} />
        ) : (
          <div className="next" style={{ maxWidth: 640 }}>
            <span className="eyebrow">Resultado</span>
            <p style={{ margin: 0, color: "var(--color-ink)" }}>O resultado aparece aqui alguns minutos depois da bandeirada.</p>
          </div>
        )}

        <div className="race-top">
          <div>
            <div className="eyebrow" style={{ marginBottom: 10 }}>Programação no seu horário</div>
            <div className="sessions">
              {race.sessions.map((s) => (
                <div key={s.kind} className={`sess ${s.kind === "RACE" ? "race" : ""}`}>
                  <b>{s.label}</b><span className="t"><LocalTime iso={s.startsAt} format="time" /></span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="eyebrow" style={{ marginBottom: 10 }}>Onde assistir no Brasil</div>
            <WatchChips broadcast={race.broadcast} />
          </div>
        </div>

        <nav className="race-nav" aria-label="Outras corridas">
          {prev ? <Link className="btn" href={`/corridas/${prev.round}`}>← {prev.short}</Link> : <span />}
          {next && <Link className="btn" href={`/corridas/${next.round}`}>{next.short} →</Link>}
        </nav>
      </section>
    </>
  );
}
