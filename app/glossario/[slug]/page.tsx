import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GlossaryExplorer } from "@/components/GlossaryExplorer";
import { JsonLd } from "@/components/JsonLd";
import { GLOSSARY } from "@/content/glossary";
import { share } from "@/lib/seo";
import { SITE } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return GLOSSARY.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const t = GLOSSARY.find((x) => x.slug === slug);
  if (!t) return {};
  return {
    title: `O que é ${t.term} na F1?`,
    description: t.text.slice(0, 155),
    alternates: { canonical: `/glossario/${t.slug}` },
    ...share(`O que é ${t.term} na F1?`, t.text.slice(0, 155), `/glossario/${t.slug}`, "article"),
  };
}

export default async function GlossaryTerm({ params }: Props) {
  const { slug } = await params;
  const t = GLOSSARY.find((x) => x.slug === slug);
  if (!t) notFound();
  return (
    <>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "DefinedTerm",
        name: t.term,
        description: t.text,
        url: `${SITE.url}/glossario/${t.slug}`,
        inDefinedTermSet: { "@type": "DefinedTermSet", name: `Glossário de F1 · ${SITE.name}`, url: `${SITE.url}/glossario` },
      }} />
      <div className="wrap page-head">
        <span className="eyebrow">Rádio do box · Glossário</span>
        <h1>Glossário</h1>
        <p>As palavras que você ouve na transmissão, explicadas para quem está começando.</p>
      </div>
      <section className="wrap"><GlossaryExplorer initialSlug={t.slug} /></section>
      <div style={{ height: 56 }} />
    </>
  );
}
