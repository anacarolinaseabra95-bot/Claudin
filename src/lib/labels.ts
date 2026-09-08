import { Cargo, NivelImportancia, PesoPessoal, Tema } from "./types";

export const TEMA_LABEL: Record<Tema, string> = {
  economia: "Economia",
  seguranca: "Segurança pública",
  saude: "Saúde",
  educacao: "Educação",
  meio_ambiente: "Meio ambiente",
  costumes: "Costumes",
  infraestrutura: "Infraestrutura",
  direitos_humanos: "Direitos humanos",
  protecao_animal: "Proteção animal",
  gestao_publica: "Gestão pública e instituições",
  outro: "Outros temas",
};

export const TEMA_ICONE: Record<Tema, string> = {
  economia: "💰",
  seguranca: "🛡️",
  saude: "🏥",
  educacao: "📚",
  meio_ambiente: "🌳",
  costumes: "⚖️",
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
