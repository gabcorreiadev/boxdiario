/** Nome e textos da marca num lugar só. Trocar o nome do site = mudar aqui. */
export const SITE = {
  name: "Box na Veia",
  logo: "BOX NA VEIA",
  /** Complemento do nome: deixa claro que é sobre F1 (e não boxe) nos resultados do Google e nos links compartilhados. */
  slogan: "Fórmula 1 todo dia",
  tagline: "Próxima corrida, onde assistir no Brasil, lendas e uma volta nova pela história da F1 a cada dia.",
  /**
   * Endereço público do site, usado no Google (sitemap, links canônicos) e nas imagens de compartilhamento.
   * Vem da variável NEXT_PUBLIC_SITE_URL (configure na Netlify). Sem ela, usa o endereço que a Netlify
   * informa no build (URL) ou, no seu computador, o localhost.
   */
  url: (process.env.NEXT_PUBLIC_SITE_URL || process.env.URL || "http://localhost:3000").replace(/\/$/, ""),
  /** Contato para correções ou pedidos de remoção. Deixe vazio para esconder a linha. */
  contact: "",
  /** Chave Pix aleatória para doações voluntárias. Deixe vazio para esconder o bloco "Apoie o projeto". */
  pix: "cf70d951-c48c-47b6-b003-e828a9f2531d",
  author: {
    name: "Gabriel",
    github: "https://github.com/gabcorreiadev",
    /** Seu portfólio, quando estiver no ar. */
    site: "",
  },
  keywords: [
    "Fórmula 1", "F1", "F1 hoje", "horário da F1", "onde assistir F1", "F1 Globo", "F1 ao vivo", "próxima corrida F1",
    "calendário F1 2026", "classificação F1", "GP de São Paulo", "Ayrton Senna", "pilotos brasileiros F1", "glossário F1",
  ],
};
