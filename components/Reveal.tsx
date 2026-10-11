/**
 * Entrada suave ao rolar, só com CSS (scroll-driven animations).
 * O conteúdo fica sempre visível; navegadores sem suporte simplesmente não animam.
 */
export function Reveal({ children, className = "", as = "div", delay }: { children: React.ReactNode; className?: string; as?: "div" | "li" | "figure"; delay?: number }) {
  const Tag = as;
  return <Tag className={`reveal ${className}`} data-delay={delay ? "" : undefined}>{children}</Tag>;
}
