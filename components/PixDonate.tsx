"use client";

import { useState } from "react";
import { SITE } from "@/lib/site";

/** Bloco "Apoie o projeto": mostra a chave Pix aleatória e copia com um toque. */
export function PixDonate({ compact = false }: { compact?: boolean }) {
  const [copied, setCopied] = useState(false);
  if (!SITE.pix) return null;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(SITE.pix);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      /* navegador sem permissão: a chave fica visível para copiar à mão */
    }
  };

  return (
    <div className={`pix ${compact ? "compact" : ""}`}>
      <div className="pix-head">
        <span className="pix-logo" aria-hidden="true">PIX</span>
        <div>
          <b>Apoie o projeto</b>
          <small>Qualquer valor ajuda a manter o site no ar, sem anúncios.</small>
        </div>
      </div>
      <div className="pix-key">
        <code aria-label="Chave Pix aleatória">{SITE.pix}</code>
        <button type="button" className="btn" onClick={copy}>{copied ? "Copiado ✓" : "Copiar chave"}</button>
      </div>
      {!compact && <p className="note">No app do seu banco: Pix → Pagar com chave → cole a chave. Doação voluntária, o site continua gratuito para todos.</p>}
    </div>
  );
}
