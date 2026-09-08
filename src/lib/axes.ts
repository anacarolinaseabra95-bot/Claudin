import { Eixo, Tema } from "./types";

export interface AxisDef {
  eixo: Eixo;
  tema: Tema;
  label: string;
  poloMin: string;
  poloMax: string;
}

/**
 * Cada eixo ideológico é ancorado num tema principal para fins de exibição
 * de afinidade por causa e para herdar o peso de importância que o usuário
 * atribuiu àquele tema (seção 8, item 6 do prompt mestre).
 */
export const AXES: AxisDef[] = [
  {
    eixo: "economia",
    tema: "economia",
    label: "Economia",
    poloMin: "Estado mínimo: menos gastos, menos impostos, mais mercado",
    poloMax: "Estado indutor: mais investimento público e proteção social",
  },
  {
    eixo: "seguranca",
    tema: "seguranca",
    label: "Segurança pública",
    poloMin: "Prevenção social do crime e garantias processuais",
    poloMax: "Repressão, penas mais duras e presença policial ostensiva",
  },
  {
    eixo: "costumes",
    tema: "costumes",
    label: "Costumes",
    poloMin: "Agenda progressista: ampliação de direitos e liberdades individuais",
    poloMax: "Agenda conservadora: valores tradicionais e família",
  },
  {
    eixo: "meio_ambiente",
    tema: "meio_ambiente",
    label: "Meio ambiente",
    poloMin: "Flexibilizar regras ambientais para viabilizar produção e infraestrutura",
    poloMax: "Regulação ambiental forte e preservação como prioridade",
  },
  {
    eixo: "instituicoes",
    tema: "gestao_publica",
    label: "Instituições e reforma política",
    poloMin: "Manter as regras institucionais vigentes (Judiciário, reeleição, sistema eleitoral)",
    poloMax: "Promover mudanças profundas nas instituições e nas regras do jogo político",
  },
];

export function axisByEixo(eixo: Eixo): AxisDef {
  const def = AXES.find((a) => a.eixo === eixo);
  if (!def) throw new Error(`Eixo desconhecido: ${eixo}`);
  return def;
}
