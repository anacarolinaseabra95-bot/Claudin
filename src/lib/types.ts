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

/**
 * Campos demográficos — SEMPRE opcionais, autodeclarados/publicamente
 * documentados, e usados SOMENTE como filtro de exibição pelo usuário.
 * Nunca entram no cálculo de afinidade (algoritmo é 100% baseado em posições
 * sobre políticas públicas — seção 8, item 5 da metodologia). Deixe em branco
 * em vez de inferir/adivinhar quando não houver fonte pública clara.
 */
export type Genero = "mulher" | "homem" | "nao_binario";
export type RacaCor = "branca" | "preta" | "parda" | "amarela" | "indigena";
export type OrientacaoSexual = "heterossexual" | "lgbtqia+";

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
  /** Opcional, autodeclarado/documentado publicamente. Ver nota acima — nunca usado no matching. */
  genero?: Genero;
  raca_cor?: RacaCor;
  orientacao_sexual?: OrientacaoSexual;
}

/** ---------- Questionário ---------- */

/** -2 = opção A, 0 = "os dois, mais ou menos", 2 = opção B, null = "não sei / tanto faz" */
export type RespostaEscala = -2 | -1 | 0 | 1 | 2 | null;

export interface OpcaoQuestao {
  emoji: string;
  texto: string;
}

export interface Questao {
  id: string;
  eixo: Eixo;
  pergunta: string;
  /** Sempre representa o polo -2 (mínimo) do eixo */
  opcaoA: OpcaoQuestao;
  /** Sempre representa o polo +2 (máximo) do eixo */
  opcaoB: OpcaoQuestao;
}

export type NivelImportancia = "pouco" | "medio" | "muito";

/** Mapa de qual(is) eixo(s) ideológico(s) as perguntas simples cobrem quando o
 * usuário escolhe um tema — permite perguntar pouco e ainda cruzar com temas
 * "qualitativos" (sem eixo próprio, como saúde) via um eixo correlato. */
export const TEMA_PARA_EIXOS: Partial<Record<Tema, Eixo[]>> = {
  economia: ["economia"],
  saude: ["economia"],
  educacao: ["economia"],
  seguranca: ["seguranca"],
  costumes: ["costumes"],
  direitos_humanos: ["costumes"],
  meio_ambiente: ["meio_ambiente"],
  infraestrutura: ["meio_ambiente"],
  protecao_animal: ["meio_ambiente"],
  gestao_publica: ["instituicoes"],
};

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
  "gestao_publica",
];

/** ---------- Estado do usuário (local, nunca compartilhado) ---------- */

export type PesoPessoal = "pesa_muito" | "pesa_pouco" | "nao_importa";

export interface AvaliacaoItem {
  itemId: string;
  peso: PesoPessoal;
}

export interface UserState {
  cargosSelecionados: Cargo[];
  /** Temas escolhidos pelo usuário, na ordem em que tocou (1º = mais importante). */
  temasEscolhidos: Tema[];
  respostas: Record<string, RespostaEscala>;
  importancias: Partial<Record<Tema, NivelImportancia>>;
  avaliacoesPessoais: Record<string, AvaliacaoItem[]>; // candidatoId -> avaliações
  questionarioConcluido: boolean;
}

/** ---------- Partidos (para dar sempre um resultado, especialmente em Deputado) ---------- */

export interface Partido {
  sigla: string;
  nome: string;
  numero: string;
  descricao: string; // 1-2 frases, linguagem simples, sem jargão
  posicao_eixos: PosicaoEixos;
  forca_sp?: string; // contexto sobre representação do partido em SP, se disponível
  fonte?: string;
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

export interface ResultadoPartido {
  partido: Partido;
  afinidadeGeral: number; // 0-100
  porEixo: { eixo: Eixo; afinidade: number; tema: Tema }[];
}

export interface CausaPrioritaria {
  tema: Tema;
  nivel: NivelImportancia;
}
