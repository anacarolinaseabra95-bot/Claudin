import { Cargo, NivelImportancia, PesoPessoal, Tema } from "./types";

export const TEMA_LABEL: Record<Tema, string> = {
  economia: "Emprego e economia",
  seguranca: "Segurança",
  saude: "Saúde",
  educacao: "Educação",
  meio_ambiente: "Meio ambiente",
  costumes: "Direitos e diversidade",
  infraestrutura: "Trânsito e obras",
  direitos_humanos: "Direitos humanos",
  protecao_animal: "Proteção animal",
  gestao_publica: "Honestidade na política",
  outro: "Outros temas",
};

export const TEMA_DESCRICAO: Record<Tema, string> = {
  economia: "Emprego, impostos, custo de vida",
  seguranca: "Polícia, violência, crime",
  saude: "SUS, hospitais, remédios",
  educacao: "Escolas, professores, universidades",
  meio_ambiente: "Natureza, clima, desmatamento",
  costumes: "Minorias, família, liberdades",
  infraestrutura: "Estradas, transporte, saneamento",
  direitos_humanos: "Direitos das pessoas em geral",
  protecao_animal: "Bem-estar e proteção dos animais",
  gestao_publica: "Corrupção e regras da política",
  outro: "Outros assuntos",
};

export const TEMA_ICONE: Record<Tema, string> = {
  economia: "💰",
  seguranca: "🚨",
  saude: "🏥",
  educacao: "📚",
  meio_ambiente: "🌳",
  costumes: "🌈",
  infraestrutura: "🚧",
  direitos_humanos: "✊",
  protecao_animal: "🐾",
  gestao_publica: "🏛️",
  outro: "📌",
};

export const CARGO_LABEL: Record<Cargo, string> = {
  presidente: "Presidente da República",
  governador: "Governador de São Paulo",
  deputado_federal: "Deputado Federal (SP)",
  deputado_estadual: "Deputado Estadual (SP)",
};

export const NIVEL_LABEL: Record<NivelImportancia, string> = {
  pouco: "Pouco importante",
  medio: "Médio",
  muito: "Muito importante",
};

export const PESO_LABEL: Record<PesoPessoal, string> = {
  pesa_muito: "Pesa muito pra mim",
  pesa_pouco: "Pesa pouco",
  nao_importa: "Não me importa",
};

export const PESO_VALOR: Record<PesoPessoal, number> = {
  pesa_muito: 2,
  pesa_pouco: 1,
  nao_importa: 0,
};
