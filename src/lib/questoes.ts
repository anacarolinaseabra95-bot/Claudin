import { Questao } from "./types";

/**
 * Perguntas em linguagem simples, do dia a dia — sem termos técnicos de
 * política (nada de "PEC", "STF", "maioridade penal", "escala 6x1"...).
 * Cada pergunta mostra duas situações opostas; a pessoa escolhe a que mais
 * combina com ela, ou "os dois, mais ou menos". A opção A representa sempre
 * o polo mínimo do eixo ideológico, e a opção B o polo máximo (lib/axes.ts) —
 * assim o cálculo de afinidade não precisa saber nada sobre o texto.
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
];
