"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { GLOSSARY, GLOSSARY_GROUPS, type GlossaryGroup } from "@/content/glossary";
import { fold } from "@/lib/daily";
import { SITE } from "@/lib/site";
import { GlossaryVisual } from "./GlossaryVisual";

const color = (g: GlossaryGroup) => GLOSSARY_GROUPS.find((x) => x.key === g)!.color;

/**
 * Glossário como um "rádio do box": lista de termos à esquerda, painel com o termo aberto à direita.
 * No celular, os termos viram uma faixa que desliza e o painel fica embaixo.
 * Cada termo tem página própria (/glossario/undercut), boa para o Google e para compartilhar.
 * Trocar de termo aqui só atualiza o endereço, sem recarregar a página.
 */
export function GlossaryExplorer({ initialSlug }: { initialSlug?: string }) {
  const [query, setQuery] = useState("");
  const [group, setGroup] = useState<GlossaryGroup | null>(null);
  const [slug, setSlug] = useState(initialSlug ?? GLOSSARY[0].slug);
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fromHash = () => {
      const h = decodeURIComponent(location.hash.slice(1));
      if (GLOSSARY.some((t) => t.slug === h)) setSlug(h);
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
  }, []);

  const list = useMemo(() => {
    const q = fold(query);
    return GLOSSARY.filter((t) => (!group || t.group === group) && (!q || fold(t.term + t.text).includes(q)));
  }, [query, group]);

  const current = GLOSSARY.find((t) => t.slug === slug)!;
  const idx = list.findIndex((t) => t.slug === slug);

  const open = (s: string, scroll = false) => {
    setSlug(s);
    history.replaceState(null, "", `/glossario/${s}`);
    const t = GLOSSARY.find((x) => x.slug === s);
    if (t) document.title = `O que é ${t.term} na F1? · ${SITE.name}`;
    if (scroll && window.matchMedia("(max-width: 900px)").matches) panel.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  const step = (d: number) => {
    if (!list.length) return;
    const i = idx < 0 ? 0 : (idx + d + list.length) % list.length;
    open(list[i].slug);
  };
  const random = () => {
    const pool = GLOSSARY.filter((t) => t.slug !== slug);
    open(pool[Math.floor(Math.random() * pool.length)].slug, true);
  };

  return (
    <div className="gx">
      <div className="gx-tools">
        <label className="search" htmlFor="gq">
          <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
          <input id="gq" type="search" autoComplete="off" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Buscar termo (ex.: pneu, bandeira, safety car)" />
        </label>
        <div className="teams" role="group" aria-label="Filtrar por tema">
          <button type="button" className="team all" aria-pressed={!group} onClick={() => setGroup(null)}>Todos · {GLOSSARY.length}</button>
          {GLOSSARY_GROUPS.map((g) => (
            <button key={g.key} type="button" className="team all" aria-pressed={group === g.key} style={{ ["--tc" as string]: g.color }} onClick={() => setGroup(g.key)}>
              <i className="gdot" style={{ background: g.color }} />{g.label}
            </button>
          ))}
          <button type="button" className="team all" onClick={random}>↻ Termo aleatório</button>
        </div>
      </div>

      <div className="gx-body">
        <nav className="gx-list" aria-label="Termos">
          {list.length === 0 && <p className="note" style={{ padding: 16 }}>Nenhum termo encontrado para “{query}”.</p>}
          {list.map((t, i) => (
            <a key={t.slug} href={`/glossario/${t.slug}`} className="gx-item" aria-current={t.slug === slug ? "true" : undefined} style={{ ["--gc" as string]: color(t.group) }} onClick={(e) => { e.preventDefault(); open(t.slug, true); }}>
              <span className="n mono">{String(i + 1).padStart(2, "0")}</span>
              <span className="t">{t.term}</span>
              <span className="g">{t.group}</span>
            </a>
          ))}
        </nav>

        <article className="gx-panel" ref={panel} aria-live="polite" style={{ ["--gc" as string]: color(current.group) }}>
          <div className="gx-anim" key={current.slug}>
            <div className="gx-visual"><GlossaryVisual kind={current.visual} /></div>
            <div className="gx-copy">
              <span className="gx-tag">{current.group}</span>
              <h2>{current.term}</h2>
              <p className="gx-text">{current.text}</p>
              <div className="gx-example">
                <span className="eyebrow">Na prática</span>
                <p>{current.example}</p>
              </div>
              {current.related.length > 0 && (
                <div className="gx-related">
                  <span className="eyebrow">Veja também</span>
                  <div>
                    {current.related.map((r) => {
                      const t = GLOSSARY.find((x) => x.slug === r);
                      return t ? <a key={r} href={`/glossario/${r}`} onClick={(e) => { e.preventDefault(); open(r); }} style={{ ["--gc" as string]: color(t.group) }}>{t.term}</a> : null;
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="gx-nav">
            <button type="button" className="btn" onClick={() => step(-1)} aria-label="Termo anterior">←</button>
            <span className="mono">{idx >= 0 ? idx + 1 : "–"} / {list.length}</span>
            <button type="button" className="btn" onClick={() => step(1)} aria-label="Próximo termo">→</button>
          </div>
        </article>
      </div>
    </div>
  );
}
