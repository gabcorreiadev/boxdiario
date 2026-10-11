"use client";

import { useEffect, useState } from "react";
import { SITE } from "@/lib/site";

const TEXT = "Olha esse site de F1 em português: próxima corrida, onde assistir e a história dos pilotos.";

/** Compartilhar: usa o menu nativo do celular quando existe; senão copia o link. */
export function ShareButtons({ compact = false }: { compact?: boolean }) {
  const [copied, setCopied] = useState(false);
  const [origin, setOrigin] = useState(SITE.url);
  useEffect(() => setOrigin(window.location.origin), []);
  const url = () => origin;
  const share = async () => {
    try {
      if (navigator.share) { await navigator.share({ title: SITE.name, text: TEXT, url: url() }); return; }
      await navigator.clipboard.writeText(`${TEXT} ${url()}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch { /* compartilhamento cancelado */ }
  };
  const wa = `https://wa.me/?text=${encodeURIComponent(`${TEXT} ${origin}`)}`;
  return (
    <div className="share-row">
      <button type="button" className="btn primary" onClick={share}>{copied ? "Link copiado ✓" : compact ? "Compartilhar com um amigo" : "Compartilhar"}</button>
      {!compact && <a className="btn" href={wa} target="_blank" rel="noopener noreferrer">Enviar no WhatsApp</a>}
    </div>
  );
}
