"use client";

import { useEffect, useState } from "react";
import { FACTS } from "@/content/facts";
import { dayOfYear } from "@/lib/daily";

export function FactTeaser() {
  const [i, setI] = useState<number | null>(null);
  useEffect(() => setI(dayOfYear() % FACTS.length), []);
  const f = i === null ? null : FACTS[i];
  return (
    <>
      <span className="eyebrow">Volta do dia{f ? ` · ${f.tag}` : ""}</span>
      <h3>{f?.title ?? "A curiosidade de hoje"}</h3>
    </>
  );
}
