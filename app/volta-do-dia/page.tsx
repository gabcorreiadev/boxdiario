import type { Metadata } from "next";
import { share } from "@/lib/seo";
import { DailyFact } from "@/components/DailyFact";
import { GuessGame } from "@/components/GuessGame";

export const metadata: Metadata = { title: "Volta do dia: curiosidade de F1 e jogo Adivinhe o piloto", description: "Uma curiosidade de F1 por dia e o jogo Adivinhe o piloto.", alternates: { canonical: "/volta-do-dia" }, ...share("Volta do dia: curiosidade de F1 e jogo Adivinhe o piloto", "Uma curiosidade de F1 por dia e o jogo Adivinhe o piloto.", "/volta-do-dia") };

export default function VoltaDoDia() {
  return (
    <>
      <div className="wrap page-head">
        <span className="eyebrow">Um minuto de F1 por dia</span>
        <h1>Volta do dia</h1>
        <p>Uma curiosidade nova a cada dia e um piloto para adivinhar. Volte amanhã para a próxima.</p>
      </div>
      <section className="wrap">
        <DailyFact />
        <GuessGame />
      </section>
      <div style={{ height: 56 }} />
    </>
  );
}
