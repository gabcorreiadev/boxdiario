export const NAV = [
  { href: "/", label: "Início", tab: "Início" },
  { href: "/corridas", label: "Corridas", tab: "Corridas" },
  { href: "/lendas", label: "Lendas", tab: "Lendas" },
  { href: "/campeonato", label: "Campeonato", tab: "Tabela" },
  { href: "/volta-do-dia", label: "Volta do dia", tab: "Hoje" },
] as const;

export const isActive = (pathname: string, href: string) =>
  href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
