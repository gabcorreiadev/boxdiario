/** Textos das páginas institucionais (Sobre, Fontes, Direitos). */
export const UPDATED_AT = "11 de outubro de 2026";

export type Source = { name: string; kind: string; what: string; refresh: string; license: string; url: string };

export const SOURCES: Source[] = [
  { name: "Jolpica-F1", kind: "API", what: "Calendário, horários das sessões, resultados, classificação dos campeonatos e números das lendas (vitórias, títulos).", refresh: "A cada hora; calendário a cada 24 h", license: "Dados públicos, uso gratuito", url: "https://github.com/jolpica/jolpica-f1" },
  { name: "OpenF1", kind: "API", what: "Cores oficiais das equipes da temporada atual.", refresh: "Uma vez por temporada", license: "Uso gratuito do histórico", url: "https://openf1.org" },
  { name: "Globo (via Lance!)", kind: "Imprensa", what: "Quais corridas passam na TV aberta e os canais de transmissão no Brasil (SporTV 3, Globoplay, F1 TV).", refresh: "Quando a grade muda", license: "Informação pública, com crédito", url: "https://www.lance.com.br/formula-1/globo-tera-mudanca-de-canal-para-a-f1-em-2026.html" },
  { name: "Wikipedia", kind: "Enciclopédia", what: "Datas e marcos das carreiras das lendas, sempre conferidos com os números da Jolpica.", refresh: "Revisão manual", license: "CC BY-SA 4.0 (fatos citados, textos próprios)", url: "https://pt.wikipedia.org/wiki/F%C3%B3rmula_1" },
  { name: "Wikimedia Commons", kind: "Imagem", what: "Bandeira do Brasil em SVG.", refresh: "Fixa", license: "Domínio público", url: "https://commons.wikimedia.org/wiki/File:Flag_of_Brazil.svg" },
  { name: "Google Fonts", kind: "Fontes", what: "Big Shoulders, Archivo e Chivo Mono.", refresh: "Fixa", license: "SIL Open Font License", url: "https://fonts.google.com" },
];

export const RIGHTS: { title: string; body: string[] }[] = [
  {
    title: "Natureza do site",
    body: [
      "O {site} é um projeto independente de fã, feito no Brasil e sem fins comerciais. Não tem vínculo, patrocínio ou aprovação da Formula One Group, da FIA, das equipes, dos pilotos ou das emissoras citadas.",
    ],
  },
  {
    title: "Marcas registradas",
    body: [
      "“F1”, “FORMULA 1”, “FIA FORMULA ONE WORLD CHAMPIONSHIP” e marcas relacionadas pertencem à Formula One Licensing B.V.",
      "Nomes de pilotos, equipes, carros, circuitos e emissoras aparecem apenas para informar, sem sugerir parceria. Não usamos logos de equipes nem da categoria.",
    ],
  },
  {
    title: "Textos, artes e imagens",
    body: [
      "Os textos sobre corridas e pilotos são escritos pelo próprio site, com base nas fontes listadas em “Fontes dos dados”.",
      "As artes dos cards, os carros desenhados, os gráficos e o som da largada são criados pelo site. A bandeira do Brasil é de domínio público e as fontes tipográficas têm licença livre (SIL OFL).",
      "Quando houver fotos, elas virão de bancos com licença livre (como o Wikimedia Commons), sempre com o nome do autor e a licença na página do piloto.",
    ],
  },
  {
    title: "Precisão dos dados",
    body: [
      "Calendário, resultados e classificação chegam de forma automática pela API Jolpica-F1 e podem levar alguns minutos para atualizar depois de cada sessão.",
      "Horários são convertidos para o fuso do seu aparelho. Os canais de transmissão seguem o que foi divulgado pela emissora e podem mudar sem aviso; confira a programação oficial antes da corrida.",
    ],
  },
  {
    title: "Privacidade",
    body: [
      "O site não pede cadastro, não usa cookies de rastreamento e não coleta dados pessoais.",
      "O progresso do jogo “Adivinhe o piloto” fica salvo só no seu navegador (armazenamento local) e pode ser apagado limpando os dados do site.",
    ],
  },
  {
    title: "Correções e remoção de conteúdo",
    body: [
      "Encontrou um erro ou é titular de algum conteúdo e quer que ele seja removido? Fale com a gente pelo contato abaixo e responderemos o quanto antes.",
    ],
  },
  {
    title: "Alterações nesta página",
    body: ["Este texto pode ser atualizado conforme o site cresce. A data da última atualização aparece no topo da página."],
  },
];
