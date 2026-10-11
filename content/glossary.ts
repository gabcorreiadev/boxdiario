export type GlossaryGroup = "Corrida" | "Estratégia" | "Regras" | "Carro";
export type GlossaryVisual = "radio" | "pitstop" | "undercut" | "overcut" | "tyres" | "grid" | "quali" | "lights" | "safety" | "flags" | "sprint" | "points" | "penalty" | "limits" | "parc" | "slipstream" | "rules2026" | "vsc";

export type GlossaryTerm = {
  slug: string;
  term: string;
  group: GlossaryGroup;
  visual: GlossaryVisual;
  text: string;
  /** Como o termo aparece na transmissão ou na prática. */
  example: string;
  related: string[];
};

export const GLOSSARY_GROUPS: { key: GlossaryGroup; label: string; color: string }[] = [
  { key: "Corrida", label: "Corrida", color: "#ff2a1f" },
  { key: "Estratégia", label: "Estratégia", color: "#f5c518" },
  { key: "Regras", label: "Regras", color: "#2f7fe0" },
  { key: "Carro", label: "Carro", color: "#3fbf5f" },
];

export const GLOSSARY: GlossaryTerm[] = [
  {
    slug: "box-box",
    term: "Box, box",
    group: "Estratégia",
    visual: "radio",
    text: "É o chamado do engenheiro pelo rádio para o piloto entrar nos boxes naquela volta. Quase sempre é para trocar pneus, mas também pode ser para consertar a asa dianteira ou cumprir uma punição. Repetir a palavra evita confusão com o barulho do motor.",
    example: "No rádio: “Box, box, box. Pneus médios.” Na volta seguinte, o carro entra no pit lane.",
    related: ["pit-stop", "undercut", "compostos"],
  },
  {
    slug: "pit-stop",
    term: "Pit stop",
    group: "Estratégia",
    visual: "pitstop",
    text: "A parada nos boxes. Cerca de 20 mecânicos trocam os quatro pneus em pouco mais de 2 segundos; o recorde é de 1,80 s. O tempo total perdido, contando a entrada e a saída do pit lane, fica entre 18 e 25 segundos, dependendo da pista.",
    example: "A tela mostra o tempo parado, como “2,3 s”. Acima de 4 segundos, já é considerado um pit stop ruim.",
    related: ["box-box", "undercut", "overcut", "safety-car"],
  },
  {
    slug: "undercut",
    term: "Undercut",
    group: "Estratégia",
    visual: "undercut",
    text: "Parar antes do rival para colocar pneus novos. Pneu novo é mais rápido, então o piloto ganha tempo nas voltas seguintes. Quando o rival finalmente para e volta à pista, já está atrás.",
    example: "O narrador avisa: “Ele vai tentar o undercut!” logo depois que o carro de trás entra nos boxes.",
    related: ["overcut", "pit-stop", "compostos"],
  },
  {
    slug: "overcut",
    term: "Overcut",
    group: "Estratégia",
    visual: "overcut",
    text: "O contrário do undercut: ficar mais tempo na pista enquanto o rival para. Funciona quando o pneu usado ainda está bom ou quando a pista está livre na frente. O piloto acelera nas voltas em que o outro está nos boxes e sai na frente depois da própria parada.",
    example: "Em Mônaco, onde ultrapassar é quase impossível, o overcut costuma decidir posições.",
    related: ["undercut", "pit-stop"],
  },
  {
    slug: "compostos",
    term: "Compostos de pneu",
    group: "Carro",
    visual: "tyres",
    text: "Para pista seca há três tipos por fim de semana: macio, mais rápido e que gasta mais rápido; médio; e duro, mais lento e mais durável. Na chuva entram o intermediário e o de chuva forte. Em corrida seca, cada piloto precisa usar pelo menos dois compostos diferentes.",
    example: "A cor da faixa na lateral do pneu mostra qual ele é. Na tela, aparece uma letra: S, M ou H.",
    related: ["pit-stop", "undercut", "box-box"],
  },
  {
    slug: "pole-position",
    term: "Pole position",
    group: "Corrida",
    visual: "grid",
    text: "O primeiro lugar no grid de largada, conquistado com a volta mais rápida da classificação. Largar na frente ajuda muito, principalmente em pistas onde é difícil ultrapassar, como Mônaco. Ayrton Senna fez 65 poles.",
    example: "“Pole position para Antonelli!” A partir daí, ele larga na primeira fila, do lado mais limpo da pista.",
    related: ["classificacao", "volta-apresentacao"],
  },
  {
    slug: "classificacao",
    term: "Classificação (Q1, Q2, Q3)",
    group: "Corrida",
    visual: "quali",
    text: "A sessão que define o grid, dividida em três partes. No Q1 e no Q2, os seis mais lentos de cada parte são eliminados. No Q3, os dez que sobraram disputam a pole.",
    example: "No fim do Q1, a tela marca em vermelho a “zona de eliminação”: quem está ali não passa para o Q2.",
    related: ["pole-position", "parc-ferme", "sprint"],
  },
  {
    slug: "volta-apresentacao",
    term: "Volta de apresentação",
    group: "Corrida",
    visual: "lights",
    text: "A volta lenta antes da largada, com todos os carros em fila. Serve para aquecer pneus e freios e para os pilotos voltarem às suas posições no grid. Depois dela, as cinco luzes vermelhas acendem e, quando apagam, a corrida começa.",
    example: "É quando os pilotos fazem zigue-zague na pista: é para esquentar os pneus.",
    related: ["pole-position", "compostos"],
  },
  {
    slug: "safety-car",
    term: "Safety car",
    group: "Corrida",
    visual: "safety",
    text: "Carro de segurança que entra na pista depois de um acidente ou quando há destroços. Os pilotos andam em fila atrás dele, sem ultrapassar, enquanto os fiscais limpam a pista. Muitas equipes aproveitam para fazer o pit stop, porque se perde menos tempo.",
    example: "Aparece “SC” na tela e todo mundo corre para os boxes. Na relargada, a diferença entre os carros some.",
    related: ["virtual-safety-car", "bandeiras", "pit-stop"],
  },
  {
    slug: "virtual-safety-car",
    term: "Virtual safety car",
    group: "Corrida",
    visual: "vsc",
    text: "Uma versão do safety car sem o carro. Todos precisam andar mais devagar, respeitando um tempo mínimo por trecho da pista, e as posições ficam congeladas. É usado em incidentes menores, que se resolvem rápido.",
    example: "Na tela aparece “VSC”. Quando a mensagem muda para “VSC ending”, a corrida volta ao normal.",
    related: ["safety-car", "bandeiras"],
  },
  {
    slug: "bandeiras",
    term: "Bandeiras",
    group: "Regras",
    visual: "flags",
    text: "Amarela: perigo à frente, proibido ultrapassar naquele trecho. Vermelha: corrida interrompida, todos voltam devagar para os boxes. Azul: o piloto está sendo alcançado por um carro com uma volta a mais e precisa deixar passar. Quadriculada: fim da corrida.",
    example: "Hoje os fiscais usam também painéis luminosos. A bandeira vermelha pode parar a prova por dezenas de minutos.",
    related: ["safety-car", "punicoes", "limites-de-pista"],
  },
  {
    slug: "sprint",
    term: "Sprint",
    group: "Corrida",
    visual: "sprint",
    text: "Corrida curta, de cerca de 100 km e uns 30 minutos, disputada no sábado de seis fins de semana do ano. Não tem pit stop obrigatório e vale pontos para os oito primeiros, de 8 a 1. Tem uma classificação própria, na sexta-feira.",
    example: "Em fim de semana sprint, o sábado tem duas sessões valendo: a sprint de manhã e a classificação da corrida à tarde.",
    related: ["pontuacao", "classificacao"],
  },
  {
    slug: "pontuacao",
    term: "Pontuação",
    group: "Regras",
    visual: "points",
    text: "Na corrida, os dez primeiros pontuam: 25, 18, 15, 12, 10, 8, 6, 4, 2 e 1. Na sprint, os oito primeiros levam de 8 a 1. Desde 2025, a volta mais rápida não vale mais ponto extra.",
    example: "Uma vitória (25) vale mais que dois quintos lugares somados (20). Por isso, vencer conta tanto no campeonato.",
    related: ["sprint", "punicoes"],
  },
  {
    slug: "punicoes",
    term: "Punições",
    group: "Regras",
    visual: "penalty",
    text: "Quem causa um acidente ou desrespeita as regras leva punição. As mais comuns são 5 ou 10 segundos somados ao tempo final ou cumpridos no pit stop. As mais graves obrigam o piloto a passar pelo pit lane sem parar (drive-through) ou a ficar parado 10 segundos (stop and go).",
    example: "Na tela: “5 SECOND TIME PENALTY”. O piloto pode cruzar a linha em 3º e cair para 5º no resultado.",
    related: ["limites-de-pista", "bandeiras", "pontuacao"],
  },
  {
    slug: "limites-de-pista",
    term: "Limites de pista",
    group: "Regras",
    visual: "limits",
    text: "O carro precisa manter pelo menos uma roda dentro das linhas brancas. Quem sai da pista três vezes recebe a bandeira preta e branca, um aviso. Na quarta vez, vem a punição de 5 segundos.",
    example: "As voltas com as quatro rodas fora da linha são apagadas na classificação: “lap time deleted”.",
    related: ["punicoes", "bandeiras"],
  },
  {
    slug: "parc-ferme",
    term: "Parc fermé",
    group: "Regras",
    visual: "parc",
    text: "Do início da classificação até a corrida, os carros ficam em regime de parque fechado. As equipes não podem mudar a configuração, só fazer ajustes pequenos e permitidos. Quem mexe no carro além disso larga do pit lane.",
    example: "Se chover no domingo e o carro estiver preparado para pista seca, a equipe não pode refazer o acerto.",
    related: ["classificacao"],
  },
  {
    slug: "vacuo",
    term: "Vácuo",
    group: "Carro",
    visual: "slipstream",
    text: "Andar logo atrás de outro carro numa reta reduz a resistência do ar, e o carro de trás ganha velocidade. É assim que muitas ultrapassagens começam. Nas curvas acontece o contrário: o ar turbulento do carro da frente tira aderência de quem vem atrás.",
    example: "Em Monza, a pista mais rápida do ano, os pilotos brigam até para pegar o vácuo na classificação.",
    related: ["regras-2026"],
  },
  {
    slug: "regras-2026",
    term: "Regras de 2026",
    group: "Carro",
    visual: "rules2026",
    text: "Os carros de 2026 são novos do zero: menores, mais leves e com cerca de metade da potência vinda do motor elétrico. O combustível é 100% sustentável. As asas se movem para reduzir o arrasto nas retas (aerodinâmica ativa), e o DRS foi substituído por um modo de ultrapassagem que libera energia elétrica extra para quem está perto do carro da frente.",
    example: "Agora, gerenciar a bateria ao longo da volta virou parte da pilotagem.",
    related: ["vacuo", "compostos"],
  },
];
