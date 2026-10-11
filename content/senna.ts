/**
 * Homenagem a Ayrton Senna (21/03/1960 – 01/05/1994).
 * Números da carreira: Jolpica-F1 e Wikipedia (162 inscrições, 161 largadas).
 */

export const SENNA_STATS: { value: number; label: string }[] = [
  { value: 3, label: "títulos mundiais" },
  { value: 41, label: "vitórias" },
  { value: 65, label: "pole positions" },
  { value: 80, label: "pódios" },
  { value: 161, label: "largadas" },
  { value: 6, label: "vitórias em Mônaco" },
];

export const SENNA_QUOTE = {
  text: "Se você não vai mais atrás de uma brecha que existe, você não é mais um piloto de corrida.",
  context: "Em entrevista a Jackie Stewart, 1990",
};

export type Milestone = { year: string; title: string; text: string; highlight?: boolean };

export const SENNA_TIMELINE: Milestone[] = [
  {
    year: "1960",
    title: "Nasce em São Paulo",
    text: "Ayrton Senna da Silva nasce em 21 de março, no bairro de Santana.",
  },
  { year: "1964", title: "O primeiro kart", text: "Aos 4 anos ganha do pai, Milton, um kart feito em casa." },
  {
    year: "1977",
    title: "Campeão sul-americano de kart",
    text: "Primeiro grande título. Nos dois anos seguintes, termina o Mundial de Kart como vice (1979 e 1980).",
  },
  {
    year: "1981",
    title: "Inglaterra e Fórmula Ford",
    text: "Muda-se para a Inglaterra e vence os campeonatos britânicos de Fórmula Ford 1600.",
  },
  {
    year: "1983",
    title: "Campeão da F3 Inglesa",
    text: "Vence a disputa com Martin Brundle e, no fim do ano, ganha a primeira edição do GP de Macau de F3.",
  },
  {
    year: "1984",
    title: "Estreia na F1",
    text: "Corre pela Toleman. Em Mônaco, sob chuva forte, sai de 13º e é 2º quando a prova é interrompida.",
  },
  {
    year: "1985",
    title: "Primeira pole, primeira vitória",
    text: "Estoril, sob dilúvio, com a Lotus 97T: vence com mais de um minuto de vantagem.",
    highlight: true,
  },
  {
    year: "1987",
    title: "Primeira vitória em Mônaco",
    text: "Começa ali a relação mais famosa entre um piloto e uma pista.",
  },
  {
    year: "1988",
    title: "Campeão do mundo",
    text: "Na McLaren MP4/4, vence 8 corridas. Em Suzuka, o carro apaga na largada, ele cai para o meio do pelotão, vence e garante o título.",
    highlight: true,
  },
  { year: "1990", title: "Bicampeão", text: "Segundo título, de novo decidido em Suzuka contra Alain Prost." },
  {
    year: "1991",
    title: "Tri e a vitória em casa",
    text: "Vence em Interlagos pela primeira vez, com o câmbio preso na sexta marcha nas voltas finais. Fecha o ano tricampeão.",
    highlight: true,
  },
  {
    year: "1993",
    title: "Donington e o sexto Mônaco",
    text: "Na chuva de Donington, ultrapassa quatro carros na primeira volta e vence. Bate o recorde de seis vitórias em Mônaco e se despede da McLaren vencendo em Adelaide.",
  },
  {
    year: "1994",
    title: "Ímola",
    text: "Na Williams, faz a pole nas três primeiras corridas. Morre em 1º de maio, liderando o GP de San Marino, após bater na curva Tamburello.",
  },
  {
    year: "1994",
    title: "Instituto Ayrton Senna",
    text: "A irmã, Viviane Senna, cria o instituto que leva educação a milhões de crianças brasileiras.",
  },
];

export const SENNA_MONACO = [1987, 1989, 1990, 1991, 1992, 1993];

export const SENNA_LEGACY: { title: string; text: string }[] = [
  {
    title: "O Tema da Vitória",
    text: "A música que a Globo tocava a cada vitória dele virou trilha sonora de uma geração de domingos de manhã.",
  },
  {
    title: "A bandeira no pódio",
    text: "Depois de vencer, pegava a bandeira do Brasil e dava a volta com ela erguida. O gesto virou marca registrada.",
  },
  {
    title: "O S do Senna",
    text: "A sequência de curvas logo após a reta dos boxes de Interlagos leva o nome dele.",
  },
];
