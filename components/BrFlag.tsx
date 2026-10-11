/** Bandeira oficial do Brasil (SVG de domínio público, Wikimedia Commons). */
export function BrFlag({ className = "flag-br" }: { className?: string }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src="/flags/br.svg" alt="Brasil" className={className} width={20} height={14} />;
}
