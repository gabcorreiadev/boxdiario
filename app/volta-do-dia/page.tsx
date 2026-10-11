import type { Metadata } from "next";
import { DailyFact } from "@/components/DailyFact";
import { GuessGame } from "@/components/GuessGame";

export const metadata: Metadata = { title: "Volta do dia", description: "Uma curiosidade de F1 por dia e o jogo Adivinhe o piloto." };

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
