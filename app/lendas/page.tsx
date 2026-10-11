import type { Metadata } from "next";
import { share } from "@/lib/seo";
import { Suspense } from "react";
import { LegendsFinder } from "@/components/LegendsFinder";
import { SennaTribute } from "@/components/SennaTribute";

export const metadata: Metadata = { title: "Lendas da F1: Senna e os maiores pilotos da história", description: "Homenagem a Ayrton Senna e os maiores pilotos da história, com busca por nome, equipe ou carro.", alternates: { canonical: "/lendas" }, ...share("Lendas da F1: Senna e os maiores pilotos da história", "Homenagem a Ayrton Senna e os maiores pilotos da história, com busca por nome, equipe ou carro.", "/lendas") };

export default function Lendas() {
  return (
    <>
      <SennaTribute />
      <div className="wrap page-head">
        <span className="eyebrow">Hall da fama</span>
        <h1>Os gigantes</h1>
        <p>Esqueceu o nome? Busque pelo carro ou toque na equipe. Troféu dourado é título mundial; prateado, vice-campeonato.</p>
      </div>
      <div className="wrap">
        <Suspense fallback={null}><LegendsFinder /></Suspense>
      </div>
      <div style={{ height: 56 }} />
    </>
  );
}
