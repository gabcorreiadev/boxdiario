import type { MetadataRoute } from "next";
import { GLOSSARY } from "@/content/glossary";
import { LEGENDS } from "@/content/legends";
import { getSeason } from "@/lib/jolpica";
import { SITE } from "@/lib/site";

export const revalidate = 86400;

/** Lista de páginas para o Google. Fica em /sitemap.xml e se atualiza uma vez por dia. */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const u = (path: string) => `${SITE.url}${path}`;
  const races = await getSeason();
  return [
    { url: u("/"), lastModified: now, changeFrequency: "daily", priority: 1 },
    { url: u("/corridas"), lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: u("/campeonato"), lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: u("/lendas"), lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: u("/volta-do-dia"), lastModified: now, changeFrequency: "daily", priority: 0.7 },
    { url: u("/glossario"), lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    ...races.map((r) => ({ url: u(`/corridas/${r.round}`), lastModified: now, changeFrequency: "weekly" as const, priority: 0.8 })),
    ...LEGENDS.map((l) => ({ url: u(`/lendas/${l.slug}`), changeFrequency: "monthly" as const, priority: l.slug === "ayrton-senna" ? 0.8 : 0.6 })),
    ...GLOSSARY.map((t) => ({ url: u(`/glossario/${t.slug}`), changeFrequency: "yearly" as const, priority: 0.5 })),
    { url: u("/sobre"), changeFrequency: "yearly", priority: 0.3 },
    { url: u("/sobre/fontes"), changeFrequency: "yearly", priority: 0.2 },
    { url: u("/sobre/direitos"), changeFrequency: "yearly", priority: 0.2 },
  ];
}
