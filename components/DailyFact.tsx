"use client";

import { useEffect, useState } from "react";
import { FACTS } from "@/content/facts";
import { dayOfYear } from "@/lib/daily";

/** Fato do dia escolhido pela data do visitante, com setas para ver os outros. */
export function DailyFact() {
  const [today, setToday] = useState<Date | null>(null);
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const d = new Date();
    setToday(d);
    setIndex(dayOfYear(d) % FACTS.length);
  }, []);
  const todayIndex = today ? dayOfYear(today) % FACTS.length : -1;
  const fact = FACTS[index];
  const move = (step: number) => setIndex((i) => (i + step + FACTS.length) % FACTS.length);

  return (
    <div className="daily">
      <div className="date">
        <div className="eyebrow">{today?.toLocaleDateString("pt-BR", { weekday: "long" }) ?? "hoje"}</div>
        <div>
          <div className="big mono">{today ? String(today.getDate()).padStart(2, "0") : "--"}</div>
          <div className="eyebrow" style={{ marginTop: 10 }}>{today?.toLocaleDateString("pt-BR", { month: "long", year: "numeric" })}</div>
        </div>
      </div>
      <div className="fact" key={index} style={{ animation: "view-in .45s ease both" }}>
        <span className="eyebrow">{fact.tag}</span>
        <h3>{fact.title}</h3>
        <p>{fact.text}</p>
        <div className="ctl">
          <button className="btn" type="button" aria-label="Fato anterior" onClick={() => move(-1)}>←</button>
          <button className="btn" type="button" aria-label="Próximo fato" onClick={() => move(1)}>→</button>
          <span className="count">{index === todayIndex ? "Fato de hoje · " : ""}{index + 1}/{FACTS.length}</span>
        </div>
      </div>
    </div>
  );
}
