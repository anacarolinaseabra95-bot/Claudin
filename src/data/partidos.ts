import { Partido } from "@/lib/types";

/**
 * Classificação geral e simplificada de partidos nos mesmos eixos usados para
 * candidatos (lib/axes.ts). Isso existe para que o usuário SEMPRE receba um
 * resultado útil, mesmo em cargos (como Deputado) onde ainda não temos ficha
 * de candidatos individuais — no sistema proporcional brasileiro, votar em um
 * partido/legenda alinhado já ajuda a eleger gente parecida com você, mesmo
 * sem saber o nome de cada candidato.
 *
 * Importante: isto é uma caracterização GERAL e histórica de cada partido
 * (como costuma se posicionar, programa partidário, base de apoio), não a
 * posição de um candidato específico — um candidato pode divergir do seu
 * partido em temas pontuais. Sempre que possível, prefira o match individual
 * do candidato; use o match de partido como orientação, não como certeza.
 */
export const PARTIDOS: Partido[] = [
  {
    sigla: "PT",
    nome: "Partido dos Trabalhadores",
    numero: "13",
    descricao: "Partido de esquerda, historicamente ligado a programas sociais, direitos trabalhistas e ao Bolsa Família.",
    posicao_eixos: { economia: 2, seguranca: -1, costumes: -2, meio_ambiente: 1, instituicoes: -1 },
    forca_sp: "Maior bancada paulista eleita para a Câmara dos Deputados em 2022, com 16 deputados.",
    fonte: "https://www.camara.leg.br/noticias/209323-conheca-a-bancada-de-sao-paulo/",
  },
  {
    sigla: "PL",
    nome: "Partido Liberal",
    numero: "22",
    descricao: "Partido de direita, hoje o principal partido do bolsonarismo, com foco forte em segurança pública e costumes tradicionais.",
    posicao_eixos: { economia: -1, seguranca: 2, costumes: 2, meio_ambiente: -1, instituicoes: 1 },
  },
  {
    sigla: "Republicanos",
    nome: "Republicanos",
    numero: "10",
    descricao: "Partido de direita, ligado a igrejas evangélicas, forte em segurança pública e pautas de costumes conservadoras.",
    posicao_eixos: { economia: -1, seguranca: 2, costumes: 2, meio_ambiente: -1 },
  },
  {
    sigla: "PSD",
    nome: "Partido Social Democrático",
    numero: "55",
    descricao: "Partido de centro-direita, pragmático, com força em prefeituras e governos estaduais pelo país.",
    posicao_eixos: { economia: -1, seguranca: 1, meio_ambiente: -1, instituicoes: 1 },
  },
  {
    sigla: "Novo",
    nome: "Partido Novo",
    numero: "30",
    descricao: "Partido liberal na economia: defende Estado bem menor, privatizações e menos impostos.",
    posicao_eixos: { economia: -2, seguranca: 1, meio_ambiente: -1, instituicoes: 2 },
  },
  {
    sigla: "PSDB",
    nome: "Partido da Social Democracia Brasileira",
    numero: "45",
    descricao: "Partido de centro, historicamente ligado à gestão de São Paulo, hoje com menos força nacional.",
    posicao_eixos: { economia: -1, seguranca: 0, meio_ambiente: 0, instituicoes: -1 },
  },
  {
    sigla: "MDB",
    nome: "Movimento Democrático Brasileiro",
    numero: "15",
    descricao: "Partido de centro, tradicionalmente pragmático e presente em várias coligações e governos.",
    posicao_eixos: { economia: -1, seguranca: 0, meio_ambiente: -1, instituicoes: -1 },
  },
  {
    sigla: "PSB",
    nome: "Partido Socialista Brasileiro",
    numero: "40",
    descricao: "Partido de centro-esquerda, defende mais investimento social e costuma compor com o PT.",
    posicao_eixos: { economia: 1, seguranca: -1, costumes: -1, meio_ambiente: 1, instituicoes: -1 },
  },
  {
    sigla: "PSOL",
    nome: "Partido Socialismo e Liberdade",
    numero: "50",
    descricao: "Partido de esquerda, forte em pautas ambientais e de direitos de minorias, crítico ao mercado financeiro.",
    posicao_eixos: { economia: 2, seguranca: -2, costumes: -2, meio_ambiente: 2, instituicoes: -1 },
  },
  {
    sigla: "PC do B",
    nome: "Partido Comunista do Brasil",
    numero: "65",
    descricao: "Partido de esquerda, defende Estado forte na economia e nos serviços públicos.",
    posicao_eixos: { economia: 2, seguranca: -1, costumes: -2, meio_ambiente: 1, instituicoes: -1 },
  },
  {
    sigla: "PDT",
    nome: "Partido Democrático Trabalhista",
    numero: "12",
    descricao: "Partido de centro-esquerda, com raízes trabalhistas e foco em educação pública.",
    posicao_eixos: { economia: 1, seguranca: -1, costumes: -1, meio_ambiente: 1, instituicoes: -1 },
  },
  {
    sigla: "PV",
    nome: "Partido Verde",
    numero: "43",
    descricao: "Partido focado em pautas ambientais, com posições moderadas nos demais temas.",
    posicao_eixos: { seguranca: -1, costumes: -1, meio_ambiente: 2, instituicoes: -1 },
  },
  {
    sigla: "Rede",
    nome: "Rede Sustentabilidade",
    numero: "18",
    descricao: "Partido de centro-esquerda com foco forte em meio ambiente e transparência política.",
    posicao_eixos: { economia: 1, seguranca: -1, costumes: -1, meio_ambiente: 2 },
  },
  {
    sigla: "União Brasil",
    nome: "União Brasil",
    numero: "44",
    descricao: "Partido de centro-direita, um dos maiores do Congresso, com perfil pragmático (\"centrão\").",
    posicao_eixos: { economia: -1, seguranca: 1, costumes: 1, meio_ambiente: -1 },
  },
  {
    sigla: "Podemos",
    nome: "Podemos",
    numero: "19",
    descricao: "Partido de centro-direita, com posições liberais na economia.",
    posicao_eixos: { economia: -1, seguranca: 1 },
  },
  {
    sigla: "Avante",
    nome: "Avante",
    numero: "70",
    descricao: "Partido de centro, pragmático (\"centrão\"), sem uma bandeira ideológica muito definida.",
    posicao_eixos: { seguranca: 1 },
  },
  {
    sigla: "DC",
    nome: "Democracia Cristã",
    numero: "27",
    descricao: "Partido conservador nos costumes, ligado a pautas religiosas e de família.",
    posicao_eixos: { economia: -1, seguranca: 1, costumes: 2, meio_ambiente: -1 },
  },
  {
    sigla: "Democrata",
    nome: "Democrata",
    numero: "35",
    descricao: "Partido pequeno de direita, conservador nos costumes.",
    posicao_eixos: { economia: -1, seguranca: 1, costumes: 2 },
  },
  {
    sigla: "PRTB",
    nome: "Partido Renovador Trabalhista Brasileiro",
    numero: "28",
    descricao: "Partido pequeno, hoje associado a candidaturas de direita populista.",
    posicao_eixos: { economia: -1, seguranca: 2, costumes: 2, instituicoes: 1 },
  },
  {
    sigla: "Missão",
    nome: "Missão",
    numero: "14",
    descricao: "Partido novo de direita liberal, com discurso anticorrupção e antissistema.",
    posicao_eixos: { economia: -2, seguranca: 1, instituicoes: 2 },
  },
  {
    sigla: "Agir",
    nome: "Agir",
    numero: "36",
    descricao: "Partido pequeno, com candidaturas frequentemente ligadas à área de segurança pública.",
    posicao_eixos: { seguranca: 2 },
  },
  {
    sigla: "PCB",
    nome: "Partido Comunista Brasileiro",
    numero: "21",
    descricao: "Partido de esquerda socialista, defende forte intervenção do Estado na economia.",
    posicao_eixos: { economia: 2, seguranca: -2, meio_ambiente: 1 },
  },
  {
    sigla: "PSTU",
    nome: "Partido Socialista dos Trabalhadores Unificado",
    numero: "16",
    descricao: "Partido de esquerda socialista, com base em movimentos sindicais.",
    posicao_eixos: { economia: 2, seguranca: -2, meio_ambiente: 1 },
  },
  {
    sigla: "PCO",
    nome: "Partido da Causa Operária",
    numero: "29",
    descricao: "Partido de esquerda socialista, com discurso de oposição ao sistema político atual.",
    posicao_eixos: { economia: 2, seguranca: -2 },
  },
  {
    sigla: "UP",
    nome: "Unidade Popular",
    numero: "80",
    descricao: "Partido de esquerda socialista, defende ruptura com o modelo econômico atual.",
    posicao_eixos: { economia: 2, seguranca: -2, meio_ambiente: 1 },
  },
];

export function partidoPorSigla(sigla: string): Partido | undefined {
  return PARTIDOS.find((p) => p.sigla.toLowerCase() === sigla.toLowerCase());
}
