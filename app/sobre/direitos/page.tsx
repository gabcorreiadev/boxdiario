import type { Metadata } from "next";
import { share } from "@/lib/seo";
import { RIGHTS } from "@/content/about";
import { SITE } from "@/lib/site";

export const metadata: Metadata = { title: "Direitos e avisos", description: "Natureza do site, marcas registradas, uso de imagens, precisão dos dados e privacidade.", alternates: { canonical: "/sobre/direitos" }, ...share("Direitos e avisos", "Natureza do site, marcas registradas, uso de imagens, precisão dos dados e privacidade.", "/sobre/direitos") };

export default function Direitos() {
  const fill = (t: string) => t.replace("{site}", SITE.name);
  return (
    <article className="legal">
      <h2>Direitos e avisos</h2>
      <p className="lead">Transparência sobre o que é o {SITE.name}, o que é nosso e o que pertence a outros.</p>
      <ol className="legal-list">
        {RIGHTS.map((r) => (
          <li key={r.title}>
            <h3>{r.title}</h3>
            {r.body.map((b, i) => <p key={i}>{fill(b)}</p>)}
            {r.title.startsWith("Correções") && (
              <p className="contact">{SITE.contact ? <>Contato: <b>{SITE.contact}</b></> : "Contato: em breve."}</p>
            )}
          </li>
        ))}
      </ol>
    </article>
  );
}
