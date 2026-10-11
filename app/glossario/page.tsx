import type { Metadata } from "next";
import { share } from "@/lib/seo";
import { GlossaryExplorer } from "@/components/GlossaryExplorer";

export const metadata: Metadata = { title: "Glossário da F1: termos explicados para iniciantes", description: "As palavras da transmissão de F1 explicadas para quem está começando.", alternates: { canonical: "/glossario" }, ...share("Glossário da F1: termos explicados para iniciantes", "As palavras da transmissão de F1 explicadas para quem está começando.", "/glossario") };

export default function Glossario() {
  return (
    <>
      <div className="wrap page-head">
        <span className="eyebrow">Rádio do box</span>
        <h1>Glossário</h1>
        <p>As palavras que você ouve na transmissão, explicadas para quem está começando. Escolha um termo, veja o desenho e como ele aparece na corrida.</p>
      </div>
      <section className="wrap"><GlossaryExplorer /></section>
      <div style={{ height: 56 }} />
    </>
  );
}
