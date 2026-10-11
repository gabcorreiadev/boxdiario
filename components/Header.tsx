"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SITE } from "@/lib/site";
import { NAV, isActive } from "./nav";

export function Header() {
  const pathname = usePathname();
  return (
    <header className="bar">
      <div className="wrap">
        <Link className="logo" href="/">
          <i aria-hidden="true"><b /><b /><b /></i>{SITE.logo}
        </Link>
        <nav className="topnav" aria-label="Páginas">
          {[...NAV, { href: "/glossario", label: "Glossário" }].map((item) => (
            <Link key={item.href} href={item.href} aria-current={isActive(pathname, item.href) ? "page" : undefined}>
              {item.label}
            </Link>
          ))}
        </nav>
        <Link className="gloss-btn" href="/glossario">Glossário</Link>
      </div>
    </header>
  );
}
