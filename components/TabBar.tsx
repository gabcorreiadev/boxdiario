"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV, isActive } from "./nav";

const ICONS: Record<string, React.ReactNode> = {
  "/": <><path d="M3 11 12 4l9 7" /><path d="M5 10v10h14V10" /></>,
  "/corridas": <><path d="M5 21V4" /><path d="M5 4h13l-2 4 2 4H5" /></>,
  "/lendas": <><path d="M8 4h8v4a4 4 0 0 1-8 0z" /><path d="M8 6H5a3 3 0 0 0 3 4M16 6h3a3 3 0 0 1-3 4" /><path d="M12 12v4M9 20h6M10 16h4v4h-4z" /></>,
  "/campeonato": <><path d="M4 20h16" /><path d="M6 20v-6h3v6M10.5 20V9h3v11M15 20v-9h3v9" /></>,
  "/volta-do-dia": <><circle cx="12" cy="13" r="7" /><path d="M12 13V9.5M10 3h4M18.5 6.5l1.5-1.5" /></>,
};

/** Barra fixa embaixo da tela, só no celular. */
export function TabBar() {
  const pathname = usePathname();
  return (
    <nav className="tabbar" aria-label="Navegação principal">
      {NAV.map((item) => (
        <Link key={item.href} href={item.href} aria-current={isActive(pathname, item.href) ? "page" : undefined}>
          <svg viewBox="0 0 24 24" aria-hidden="true">{ICONS[item.href]}</svg>
          {item.tab}
        </Link>
      ))}
    </nav>
  );
}
