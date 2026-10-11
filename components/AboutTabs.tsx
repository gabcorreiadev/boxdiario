"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const TABS = [
  { href: "/sobre", label: "Sobre o projeto" },
  { href: "/sobre/fontes", label: "Fontes dos dados" },
  { href: "/sobre/direitos", label: "Direitos e avisos" },
];

export function AboutTabs() {
  const path = usePathname();
  return (
    <nav className="about-tabs" aria-label="Seções institucionais">
      {TABS.map((t) => (
        <Link key={t.href} href={t.href} aria-current={path === t.href ? "page" : undefined}>{t.label}</Link>
      ))}
    </nav>
  );
}
