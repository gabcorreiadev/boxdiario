import Link from "next/link";

export default function NotFound() {
  return (
    <div className="wrap page-head">
      <span className="eyebrow">Bandeira vermelha</span>
      <h1>Página não encontrada</h1>
      <p>Essa curva não existe no traçado. <Link href="/">Voltar ao início</Link>.</p>
    </div>
  );
}
