/** Silhueta genérica de carro de fórmula, pintada com a cor da equipe. */
export function CarIcon({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 120 36" aria-hidden="true">
      <rect x="2" y="12" width="7" height="13" rx="1" fill={color} />
      <rect x="0" y="10" width="16" height="3" rx="1" fill={color} />
      <path d="M10 22 30 20 44 18 52 10 62 10 68 17 98 18 110 22 116 22 116 27 10 27Z" fill={color} />
      <rect x="104" y="26" width="16" height="3" rx="1" fill={color} />
      <circle cx="28" cy="27" r="7.5" fill="#05060a" /><circle cx="28" cy="27" r="3" fill="#2a2f3a" />
      <circle cx="94" cy="27" r="7.5" fill="#05060a" /><circle cx="94" cy="27" r="3" fill="#2a2f3a" />
      <circle cx="58" cy="12" r="3.2" fill="#eef0f4" opacity=".7" />
    </svg>
  );
}
