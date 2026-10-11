import type { Metadata } from "next";
import { GLOSSARY } from "@/content/glossary";

export const metadata: Metadata = { title: "Glossário", description: "As palavras da transmissão de F1 explicadas para quem está começando." };

const GROUPS = ["Corrida", "Estratégia", "Regras", "Carro"] as const;

export default function Glossario() {
  return (
    <>
      <div className="wrap page-head">
        <span className="eyebrow">Rádio do box</span>
        <h1>Glossário</h1>
        <p>As palavras que você ouve na transmissão, explicadas para quem está começando. Toque num termo para abrir.</p>
      </div>
      <section className="wrap" style={{ display: "grid", gap: 36 }}>
        {GROUPS.map((g) => (
          <div key={g}>
            <h2 className="gloss-group">{g}</h2>
            <div className="gloss">
              {GLOSSARY.filter((t) => t.group === g).map((t) => (
                <details className="term" key={t.term}>
                  <summary>{t.term}</summary>
                  <p>{t.text}</p>
                </details>
              ))}
            </div>
          </div>
        ))}
      </section>
      <div style={{ height: 56 }} />
    </>
  );
}
