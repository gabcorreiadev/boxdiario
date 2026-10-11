"use client";

import { useEffect, useRef } from "react";

/** Rastros de luz cruzando o banner, como carros na reta. */
export function Streaks() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current;
    if (!c || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    const colors = ["#ff2a1f", "#f5c518", "#eef0f4", "#2f7fe0"];
    let W = 0, H = 0, raf = 0;
    type Line = { x: number; y: number; l: number; v: number; w: number; c: string; a: number };
    let lines: Line[] = [];
    const size = () => {
      const r = c.getBoundingClientRect();
      W = c.width = r.width * dpr;
      H = c.height = r.height * dpr;
      lines = Array.from({ length: window.innerWidth < 760 ? 24 : 46 }, () => ({
        x: Math.random() * W, y: Math.random() * H, l: 60 + Math.random() * 260, v: 3 + Math.random() * 12,
        w: (Math.random() < 0.85 ? 1 : 2) * dpr, c: colors[(Math.random() * 4) | 0], a: 0.15 + Math.random() * 0.5,
      }));
    };
    const frame = () => {
      ctx.clearRect(0, 0, W, H);
      for (const s of lines) {
        const g = ctx.createLinearGradient(s.x - s.l, 0, s.x, 0);
        g.addColorStop(0, "transparent");
        g.addColorStop(1, s.c);
        ctx.globalAlpha = s.a;
        ctx.strokeStyle = g;
        ctx.lineWidth = s.w;
        ctx.beginPath();
        ctx.moveTo(s.x - s.l, s.y);
        ctx.lineTo(s.x, s.y);
        ctx.stroke();
        s.x += s.v * dpr;
        if (s.x - s.l > W) { s.x = -10; s.y = Math.random() * H; }
      }
      raf = requestAnimationFrame(frame);
    };
    size();
    frame();
    window.addEventListener("resize", size);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", size); };
  }, []);
  return <canvas ref={ref} aria-hidden="true" />;
}
