"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { beep, carPassBy } from "@/lib/sound";

const STEP = 700;
const FIRST = 400;

/**
 * As cinco luzes de largada: acendem uma a uma e apagam.
 * O botão repete a sequência com som (bipes + carro passando). Som só depois de um clique,
 * porque os navegadores bloqueiam áudio automático.
 */
export function StartLights() {
  const [lit, setLit] = useState(0);
  const [playing, setPlaying] = useState(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const run = useCallback((withSound: boolean) => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setLit(0);
    setPlaying(withSound);
    const out = FIRST + 5 * STEP + 900;
    [1, 2, 3, 4, 5].forEach((n) => {
      timers.current.push(setTimeout(() => setLit(n), FIRST + (n - 1) * STEP));
      if (withSound) beep((FIRST + (n - 1) * STEP) / 1000);
    });
    timers.current.push(setTimeout(() => setLit(0), out));
    if (withSound) {
      carPassBy(out / 1000 - 0.35);
      timers.current.push(setTimeout(() => setPlaying(false), out + 2600));
    }
  }, []);

  useEffect(() => {
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) run(false);
    const t = timers.current;
    return () => t.forEach(clearTimeout);
  }, [run]);

  return (
    <div className="lights">
      <div className="gantry" aria-hidden="true">
        {[1, 2, 3, 4, 5].map((n) => (
          <div key={n} className={`pod ${lit >= n ? "on" : ""}`}>
            <span /><span /><span /><span />
          </div>
        ))}
      </div>
      <button type="button" className="sound-btn" onClick={() => run(true)} disabled={playing} aria-label="Ver a largada com som">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9v6h4l5 4V5L8 9H4z" /><path d="M16 8.5a5 5 0 0 1 0 7M18.5 6a8.5 8.5 0 0 1 0 12" /></svg>
        {playing ? "Largando…" : "Largada com som"}
      </button>
    </div>
  );
}
