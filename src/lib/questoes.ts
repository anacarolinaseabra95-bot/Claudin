import { Questao } from "./types";

/**
 * Perguntas em linguagem simples, do dia a dia — sem termos técnicos de
 * política (nada de "PEC", "STF", "escala 6x1"...). Cada pergunta mostra
 * duas situações opostas; a pessoa escolhe a que mais combina com ela, ou
 * "os dois, mais ou menos". A opção A representa sempre o polo mínimo do
 * eixo ideológico, e a opção B o polo máximo (lib/axes.ts) — assim o cálculo
 * de afinidade não precisa saber nada sobre o texto.
 *
 * São 4 perguntas por eixo (20 no total) para dar profundidade e critério de
 * verdade ao match — todas sempre respondidas, independente dos temas que a
 * pessoa marcou como prioridade (esses só decidem a ORDEM das perguntas e o
 * peso de cada causa no resultado, não quantas perguntas existem).
 */
export const QUESTOES: Questao[] = [
  // ---- Emprego e economia ----
  {
    id: "q_econ_1",
    eixo: "economia",
    pergunta: "Pra melhorar a vida das pessoas, o que faz mais sentido pra você?",
    opcaoA: {
      emoji: "✂️",
      texto: "O governo gastar menos e cobrar menos impostos, deixando mais dinheiro no bolso de todo mundo.",
    },
    opcaoB: {
      emoji: "💰",
      texto: "O governo gastar mais em programas sociais, saúde e educação, mesmo pagando mais impostos.",
    },
  },
  {
    id: "q_econ_2",
    eixo: "economia",
    pergunta: "E sobre as regras de trabalho?",
    opcaoA: {
      emoji: "🏢",
      texto: "Empresas terem mais liberdade pra contratar e demitir — isso ajudaria a gerar mais empregos.",
    },
    opcaoB: {
      emoji: "👷",
      texto: "Trabalhadores terem mais proteções (jornada menor, mais direitos), mesmo custando mais pras empresas.",
    },
  },
  {
    id: "q_econ_3",
    eixo: "economia",
    pergunta: "Sobre ajudar quem ganha menos:",
    opcaoA: {
      emoji: "💪",
      texto: "O foco deveria ser gerar mais empregos, não ampliar programas como o Bolsa Família.",
    },
    opcaoB: {
      emoji: "🎁",
      texto: "Programas como o Bolsa Família deveriam ser ampliados pra quem mais precisa.",
    },
  },
  {
    id: "q_econ_4",
    eixo: "economia",
    pergunta: "Sobre impostos pra quem tem mais dinheiro:",
    opcaoA: {
      emoji: "🤝",
      texto: "Aumentar impostos sobre grandes fortunas e heranças afasta investimentos — é melhor não mexer.",
    },
    opcaoB: {
      emoji: "🏦",
      texto: "Quem tem mais riqueza deveria pagar impostos mais altos que quem tem menos.",
    },
  },
  // ---- Segurança ----
  {
    id: "q_seg_1",
    eixo: "seguranca",
    pergunta: "O que você acha que combate melhor a violência?",
    opcaoA: {
      emoji: "🎓",
      texto: "Investir em educação, emprego e oportunidades, pra evitar que as pessoas entrem no crime.",
    },
    opcaoB: {
      emoji: "👮",
      texto: "Ter mais policiamento nas ruas e penas mais duras pra quem comete crime.",
    },
  },
  {
    id: "q_seg_2",
    eixo: "seguranca",
    pergunta: "Sobre adolescentes que cometem crimes muito graves:",
    opcaoA: {
      emoji: "🧒",
      texto: "Ainda são jovens e merecem um tratamento diferente, focado em reeducação.",
    },
    opcaoB: {
      emoji: "⚖️",
      texto: "Em crimes muito graves, deveriam poder ser julgados como adultos.",
    },
  },
  {
    id: "q_seg_3",
    eixo: "seguranca",
    pergunta: "Sobre posse de arma de fogo:",
    opcaoA: {
      emoji: "🚫",
      texto: "Dificultar o acesso da população a armas de fogo ajuda a reduzir a violência.",
    },
    opcaoB: {
      emoji: "🔫",
      texto: "Facilitar o acesso a armas de fogo pra pessoas de bem se defenderem.",
    },
  },
  {
    id: "q_seg_4",
    eixo: "seguranca",
    pergunta: "Sobre quem usa drogas:",
    opcaoA: {
      emoji: "⚕️",
      texto: "Deveria ser tratado como uma questão de saúde, não de polícia.",
    },
    opcaoB: {
      emoji: "🚔",
      texto: "Usar e portar drogas deveria continuar sendo crime, com fiscalização rígida.",
    },
  },
  // ---- Direitos e diversidade ----
  {
    id: "q_cost_1",
    eixo: "costumes",
    pergunta: "Sobre grupos que sofrem mais preconceito (mulheres, negros, LGBTQIA+):",
    opcaoA: {
      emoji: "🌈",
      texto: "O governo deve ter políticas específicas de proteção e inclusão pra esses grupos.",
    },
    opcaoB: {
      emoji: "⚖️",
      texto: "As leis já deveriam valer igual pra todo mundo, sem políticas separadas por grupo.",
    },
  },
  {
    id: "q_cost_2",
    eixo: "costumes",
    pergunta: "Sobre falar de sexualidade e identidade de gênero na escola:",
    opcaoA: {
      emoji: "🏫",
      texto: "A escola também deve tratar desses temas, com respeito e informação.",
    },
    opcaoB: {
      emoji: "🏠",
      texto: "Esse assunto é da família, não deveria ser tratado na escola.",
    },
  },
  {
    id: "q_cost_3",
    eixo: "costumes",
    pergunta: "Sobre interromper uma gravidez:",
    opcaoA: {
      emoji: "🤰",
      texto: "A mulher deveria poder decidir, com acesso seguro pelo sistema de saúde.",
    },
    opcaoB: {
      emoji: "🚫",
      texto: "Deveria continuar proibido, com exceções bem específicas em lei.",
    },
  },
  {
    id: "q_cost_4",
    eixo: "costumes",
    pergunta: "Sobre religião e as decisões do governo:",
    opcaoA: {
      emoji: "🕊️",
      texto: "Estado e religião devem ficar bem separados nas leis e decisões de governo.",
    },
    opcaoB: {
      emoji: "🙏",
      texto: "Valores religiosos deveriam influenciar mais as leis e o governo.",
    },
  },
  // ---- Meio ambiente ----
  {
    id: "q_amb_1",
    eixo: "meio_ambiente",
    pergunta: "Entre fazer mais obras/produzir mais e proteger a natureza, o que deve vir primeiro?",
    opcaoA: {
      emoji: "🚧",
      texto: "Obras, energia e produção agrícola vêm primeiro, com regras ambientais mais simples.",
    },
    opcaoB: {
      emoji: "🌳",
      texto: "Proteger o meio ambiente vem primeiro, mesmo que atrase obras e produção.",
    },
  },
  {
    id: "q_amb_2",
    eixo: "meio_ambiente",
    pergunta: "Sobre fiscalizar quem desmata ou polui:",
    opcaoA: {
      emoji: "🏗️",
      texto: "A fiscalização deveria ser mais simples e rápida, pra não travar a economia.",
    },
    opcaoB: {
      emoji: "🔍",
      texto: "A fiscalização deveria ser bem mais rígida, mesmo que atrase projetos.",
    },
  },
  {
    id: "q_amb_3",
    eixo: "meio_ambiente",
    pergunta: "Sobre transporte nas cidades:",
    opcaoA: {
      emoji: "🚗",
      texto: "Facilitar o uso de carro (mais vias, menos restrição) resolve melhor o dia a dia.",
    },
    opcaoB: {
      emoji: "🚇",
      texto: "Investir em ônibus, metrô e ciclovias resolve melhor o dia a dia.",
    },
  },
  {
    id: "q_amb_4",
    eixo: "meio_ambiente",
    pergunta: "Sobre terras pra plantar e criar gado:",
    opcaoA: {
      emoji: "🌾",
      texto: "Liberar mais área pra agropecuária, mesmo perto de florestas, gera emprego e renda.",
    },
    opcaoB: {
      emoji: "🌲",
      texto: "Restringir a expansão da agropecuária pra proteger as florestas que restam.",
    },
  },
  // ---- Honestidade na política ----
  {
    id: "q_inst_1",
    eixo: "instituicoes",
    pergunta: "Sobre mudar as regras da política:",
    opcaoA: {
      emoji: "🏛️",
      texto: "Melhor manter as regras como estão e ir ajustando aos poucos, com cuidado.",
    },
    opcaoB: {
      emoji: "🔨",
      texto: "As regras precisam de mudanças grandes e urgentes, mesmo que seja arriscado.",
    },
  },
  {
    id: "q_inst_2",
    eixo: "instituicoes",
    pergunta: "Sobre punir políticos corruptos:",
    opcaoA: {
      emoji: "⏳",
      texto: "O sistema de Justiça atual, mesmo lento, deve ser respeitado do jeito que é.",
    },
    opcaoB: {
      emoji: "🚨",
      texto: "As punições deveriam ser bem mais rápidas e duras, mesmo mudando leis e tribunais.",
    },
  },
  {
    id: "q_inst_3",
    eixo: "instituicoes",
    pergunta: "Sobre quem pode doar dinheiro pra campanhas políticas:",
    opcaoA: {
      emoji: "🏢",
      texto: "Empresas deveriam poder voltar a doar pra campanhas, como antes.",
    },
    opcaoB: {
      emoji: "🙋",
      texto: "Só pessoas físicas deveriam poder doar, com limites bem baixos.",
    },
  },
  {
    id: "q_inst_4",
    eixo: "instituicoes",
    pergunta: "Sobre o tamanho da política:",
    opcaoA: {
      emoji: "🪑",
      texto: "O número atual de deputados e cargos políticos está adequado.",
    },
    opcaoB: {
      emoji: "✂️",
      texto: "Deveria ser reduzido o número de deputados e de cargos comissionados.",
    },
  },
];
