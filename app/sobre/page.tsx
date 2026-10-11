import type { Metadata } from "next";
import { share } from "@/lib/seo";
import Link from "next/link";
import { PixDonate } from "@/components/PixDonate";
import { ShareButtons } from "@/components/ShareButtons";
import { SITE } from "@/lib/site";

export const metadata: Metadata = { title: "Sobre o projeto", description: `O intuito do ${SITE.name} e como ele funciona.`, alternates: { canonical: "/sobre" }, ...share("Sobre o projeto", `O intuito do ${SITE.name} e como ele funciona.`, "/sobre") };

const PILLARS = [
  { n: "01", title: "Saber quando e onde", text: "A próxima corrida no seu horário e o canal certo para assistir no Brasil, sem procurar em cinco sites." },
  { n: "02", title: "Um minuto por dia", text: "Uma curiosidade nova e um piloto para adivinhar todos os dias, para a F1 fazer parte da rotina e não só do domingo." },
  { n: "03", title: "Ninguém fica para trás", text: "Termos explicados para quem está começando e histórias contadas como conversa, sem jargão." },
];

export default function Sobre() {
  return (
    <article className="legal">
      <h2>Por que o {SITE.name} existe</h2>
      <p className="lead">A Fórmula 1 tem uma das histórias mais bonitas do esporte, e o Brasil faz parte dela com 8 títulos mundiais. Mas quem está chegando agora encontra informação espalhada, em inglês e feita para quem já entende do assunto.</p>
      <p>O {SITE.name} quer ser a porta de entrada: um lugar em português onde qualquer pessoa descobre em segundos quando é a próxima largada e onde assistir, e depois fica para conhecer os pilotos que fizeram a história.</p>

      <div className="pillars">
        {PILLARS.map((p) => (
          <div key={p.n}><span className="mono">{p.n}</span><h3>{p.title}</h3><p>{p.text}</p></div>
        ))}
      </div>

      <section className="thanks-card">
        <h2>Obrigado por acelerar com a gente</h2>
        <p>Cada visita ajuda o projeto a crescer. Se você curtiu, manda para aquele amigo que acorda cedo no domingo para ver corrida.</p>
        <ShareButtons />
      </section>

      <PixDonate />

      <p className="note">Quer saber de onde vêm as informações? Veja <Link href="/sobre/fontes">Fontes dos dados</Link> e <Link href="/sobre/direitos">Direitos e avisos</Link>.</p>
    </article>
  );
}
