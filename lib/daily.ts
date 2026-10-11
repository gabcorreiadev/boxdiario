/** Dia do ano no fuso do visitante. Todos veem o mesmo conteúdo no mesmo dia, sem servidor. */
export function dayOfYear(d = new Date()): number {
  const start = new Date(d.getFullYear(), 0, 0);
  return Math.floor((d.getTime() - start.getTime()) / 86_400_000);
}

export function pickOfDay<T>(list: T[], offset = 0, d = new Date()): { item: T; index: number } {
  const index = (dayOfYear(d) * 7 + offset) % list.length;
  return { item: list[index], index };
}

/** Remove acentos, espaços e barras para comparar buscas ("MP4/4" = "mp44"). */
export function fold(s: string): string {
  return s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[\s\-/]/g, "");
}
