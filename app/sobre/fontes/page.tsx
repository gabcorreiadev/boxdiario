import type { Metadata } from "next";
import { share } from "@/lib/seo";
import { SOURCES } from "@/content/about";

export const metadata: Metadata = { title: "Fontes dos dados", description: "De onde vêm as informações do site, com que frequência são atualizadas e sob qual licença.", alternates: { canonical: "/sobre/fontes" }, ...share("Fontes dos dados", "De onde vêm as informações do site, com que frequência são atualizadas e sob qual licença.", "/sobre/fontes") };

export default function Fontes() {
  return (
    <article className="legal">
      <h2>Fontes dos dados</h2>
      <p className="lead">Usamos apenas fontes públicas e gratuitas. Os dados de corrida chegam por API e se atualizam sozinhos; os textos são escritos pelo próprio site, com base nas fontes abaixo.</p>
      <div className="src-table" role="table" aria-label="Fontes de dados">
        <div className="src-row head" role="row">
          <span role="columnheader">Fonte</span><span role="columnheader">O que usamos</span><span role="columnheader">Atualização</span><span role="columnheader">Licença</span>
        </div>
        {SOURCES.map((s) => (
          <div className="src-row" role="row" key={s.name}>
            <span role="cell" className="src-name"><a href={s.url} target="_blank" rel="noopener noreferrer">{s.name} ↗</a><small>{s.kind}</small></span>
            <span role="cell" data-label="O que usamos">{s.what}</span>
            <span role="cell" data-label="Atualização">{s.refresh}</span>
            <span role="cell" data-label="Licença">{s.license}</span>
          </div>
        ))}
      </div>
      <h3>Como os dados chegam até você</h3>
      <p>O seu navegador nunca consulta as APIs diretamente. O site busca os dados, guarda uma cópia por um tempo (cache) e entrega a página pronta. Isso deixa tudo mais rápido e respeita os limites gratuitos de cada serviço.</p>
      <p className="note">Viu algum número diferente da transmissão? Depois de cada sessão, a API pode levar alguns minutos para atualizar.</p>
    </article>
  );
}
