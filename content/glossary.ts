export type GlossaryTerm = { term: string; text: string; group: "Corrida" | "Estratégia" | "Regras" | "Carro" };

export const GLOSSARY: GlossaryTerm[] = [
  {
    group: "Estratégia",
    term: "Box, box",
    text: "É o chamado do engenheiro pelo rádio para o piloto entrar nos boxes naquela volta. Quase sempre é para trocar pneus, mas também pode ser para consertar a asa dianteira ou cumprir uma punição. Repetir a palavra evita confusão com o barulho do motor.",
  },
  {
    group: "Estratégia",
    term: "Pit stop",
    text: "A parada nos boxes. Cerca de 20 mecânicos trocam os quatro pneus em pouco mais de 2 segundos; o recorde é de 1,80 s. O tempo total perdido, contando a entrada e a saída do pit lane, fica entre 18 e 25 segundos, dependendo da pista.",
  },
  {
    group: "Estratégia",
    term: "Undercut",
    text: "Parar antes do rival para colocar pneus novos. Pneu novo é mais rápido, então o piloto ganha tempo nas voltas seguintes. Quando o rival finalmente para e volta à pista, já está atrás.",
  },
  {
    group: "Estratégia",
    term: "Overcut",
    text: "O contrário do undercut: ficar mais tempo na pista enquanto o rival para. Funciona quando o pneu usado ainda está bom ou quando a pista está livre na frente. O piloto acelera nas voltas em que o outro está nos boxes e sai na frente depois da própria parada.",
  },
  {
    group: "Carro",
    term: "Compostos de pneu",
    text: "Para pista seca há três tipos por fim de semana: macio (faixa vermelha), mais rápido e que gasta mais rápido; médio (amarela); e duro (branca), mais lento e mais durável. Na chuva entram o intermediário (verde) e o de chuva forte (azul). Em corrida seca, cada piloto precisa usar pelo menos dois compostos diferentes.",
  },
  {
    group: "Corrida",
    term: "Pole position",
    text: "O primeiro lugar no grid de largada, conquistado com a volta mais rápida da classificação. Largar na frente ajuda muito, principalmente em pistas onde é difícil ultrapassar, como Mônaco. Ayrton Senna fez 65 poles.",
  },
  {
    group: "Corrida",
    term: "Classificação (Q1, Q2, Q3)",
    text: "A sessão que define o grid, dividida em três partes. No Q1 e no Q2, os seis mais lentos de cada parte são eliminados. No Q3, os dez que sobraram disputam a pole.",
  },
  {
    group: "Corrida",
    term: "Volta de apresentação",
    text: "A volta lenta antes da largada, com todos os carros em fila. Serve para aquecer pneus e freios e para os pilotos voltarem às suas posições no grid. Depois dela, as cinco luzes vermelhas acendem e, quando apagam, a corrida começa.",
  },
  {
    group: "Corrida",
    term: "Safety car",
    text: "Carro de segurança que entra na pista depois de um acidente ou quando há destroços. Os pilotos andam em fila atrás dele, sem ultrapassar, enquanto os fiscais limpam a pista. Muitas equipes aproveitam para fazer o pit stop, porque se perde menos tempo.",
  },
  {
    group: "Corrida",
    term: "Virtual safety car",
    text: "Uma versão do safety car sem o carro. Todos precisam andar mais devagar, respeitando um tempo mínimo por trecho da pista, e as posições ficam congeladas. É usado em incidentes menores, que se resolvem rápido.",
  },
  {
    group: "Regras",
    term: "Bandeiras",
    text: "Amarela: perigo à frente, proibido ultrapassar naquele trecho. Vermelha: corrida interrompida, todos voltam devagar para os boxes. Azul: o piloto está sendo alcançado por um carro com uma volta a mais e precisa deixar passar. Quadriculada: fim da corrida.",
  },
  {
    group: "Corrida",
    term: "Sprint",
    text: "Corrida curta, de cerca de 100 km e uns 30 minutos, disputada no sábado de seis fins de semana do ano. Não tem pit stop obrigatório e vale pontos para os oito primeiros, de 8 a 1. Tem uma classificação própria, na sexta-feira.",
  },
  {
    group: "Regras",
    term: "Pontuação",
    text: "Na corrida, os dez primeiros pontuam: 25, 18, 15, 12, 10, 8, 6, 4, 2 e 1. Na sprint, os oito primeiros levam de 8 a 1. Desde 2025, a volta mais rápida não vale mais ponto extra.",
  },
  {
    group: "Regras",
    term: "Punições",
    text: "Quem causa um acidente ou passa dos limites leva punição. As mais comuns são 5 ou 10 segundos somados ao tempo final ou cumpridos no pit stop. As mais graves obrigam o piloto a passar pelo pit lane sem parar (drive-through) ou a ficar parado 10 segundos (stop and go).",
  },
  {
    group: "Regras",
    term: "Limites de pista",
    text: "O carro precisa manter pelo menos uma roda dentro das linhas brancas. Quem sai da pista três vezes recebe bandeira preta e branca, um aviso. Na quarta vez vem a punição de 5 segundos.",
  },
  {
    group: "Regras",
    term: "Parc fermé",
    text: "Do início da classificação até a corrida, os carros ficam em regime de parque fechado. As equipes não podem mudar a configuração, só fazer ajustes pequenos e permitidos. Quem mexe no carro além disso larga do pit lane.",
  },
  {
    group: "Carro",
    term: "Vácuo",
    text: "Andar logo atrás de outro carro numa reta reduz a resistência do ar, e o carro de trás ganha velocidade. É assim que muitas ultrapassagens começam. Nas curvas acontece o contrário: o ar turbulento do carro da frente tira aderência de quem vem atrás.",
  },
  {
    group: "Carro",
    term: "Regras de 2026",
    text: "Os carros de 2026 são novos do zero: menores, mais leves e com cerca de metade da potência vinda do motor elétrico. O combustível é 100% sustentável. As asas se movem sozinhas para reduzir o arrasto nas retas (aerodinâmica ativa), e o DRS foi substituído por um modo de ultrapassagem que libera energia elétrica extra para quem está perto do carro da frente.",
  },
];
