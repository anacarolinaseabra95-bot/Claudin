// Tipos centrais da Bússola Eleitoral SP 2026
// Schema de candidato conforme especificação (seção 5 do prompt mestre)

export type Cargo =
  | "presidente"
  | "governador"
  | "deputado_federal"
  | "deputado_estadual";

export type Tema =
  | "economia"
  | "seguranca"
  | "saude"
  | "educacao"
  | "meio_ambiente"
  | "costumes"
  | "infraestrutura"
  | "direitos_humanos"
  | "protecao_animal"
  | "gestao_publica"
  | "outro";

export type FonteTipo = "tse" | "site_oficial" | "instagram" | "imprensa";

export interface Fonte {
  tipo: FonteTipo;
  url: string;
  data_captura: string; // ISO date
}

export interface Proposta {
  id: string;
  tema: Tema;
  resumo: string;
  detalhe: string;
  fonte: Fonte;
}

export interface ProsContras {
  id: string;
  texto: string;
  fonte: string;
}

export interface HistoricoVoto {
  projeto: string;
  posicao: string;
  fonte: string;
}

export interface RedesSociais {
  instagram?: string;
  site_oficial?: string;
  tse_ficha: string;
}

/** Eixo ideológico usado no algoritmo de matching (seção 8). Escala -2..+2 */
export type Eixo =
  | "economia"
  | "seguranca"
  | "costumes"
  | "meio_ambiente"
  | "instituicoes";

export type PosicaoEixos = Partial<Record<Eixo, number>>;

export type StatusDados = "completo" | "parcial" | "somente_ficha";

export interface Candidato {
  id: string;
  nome_urna: string;
  nome_completo: string;
  cargo: Cargo;
  numero: string;
  partido: string;
  coligacao: string[];
  vice_ou_suplente: string | null;
  foto_url: string | null;
  biografia_curta: string;
  cargos_anteriores: string[];
  propostas: Proposta[];
  pros: ProsContras[];
  contras: ProsContras[];
  historico_votos: HistoricoVoto[];
  redes_sociais: RedesSociais;
  ultima_verificacao: string; // ISO date
  /** Posição estimada nos eixos ideológicos, usada para o cálculo de afinidade */
  posicao_eixos: PosicaoEixos;
  /** Transparência sobre a profundidade dos dados disponíveis para este candidato */
  status_dados: StatusDados;
  nota_editorial?: string;
  buscando_reeleicao?: boolean;
}

/** ---------- Questionário ---------- */

export type RespostaEscala = -2 | -1 | 0 | 1 | 2 | null; // null = "não tenho opinião formada"

export interface Questao {
  id: string;
  eixo: Eixo;
  /** true = concordar aproxima do polo "max" do eixo; false = concordar aproxima do polo "min" */
  direcaoMax: boolean;
  texto: string;
  poloMin: string;
  poloMax: string;
}

export type NivelImportancia = "pouco" | "medio" | "muito";

export const TEMAS_IMPORTANCIA: Tema[] = [
  "economia",
  "seguranca",
  "saude",
  "educacao",
  "meio_ambiente",
  "costumes",
  "infraestrutura",
  "direitos_humanos",
  "protecao_animal",
];

/** ---------- Estado do usuário (local, nunca compartilhado) ---------- */

export type PesoPessoal = "pesa_muito" | "pesa_pouco" | "nao_importa";

export interface AvaliacaoItem {
  itemId: string;
  peso: PesoPessoal;
}

export interface UserState {
  cargosSelecionados: Cargo[];
  respostas: Record<string, RespostaEscala>;
  importancias: Partial<Record<Tema, NivelImportancia>>;
  avaliacoesPessoais: Record<string, AvaliacaoItem[]>; // candidatoId -> avaliações
  questionarioConcluido: boolean;
}

/** ---------- Resultado do matching ---------- */

export interface AfinidadeTema {
  tema: Tema;
  afinidade: number; // 0-100
}

export interface ResultadoCandidato {
  candidato: Candidato;
  afinidadeGeral: number; // 0-100
  porEixo: { eixo: Eixo; afinidade: number; tema: Tema }[];
}

export interface CausaPrioritaria {
  tema: Tema;
  nivel: NivelImportancia;
}
