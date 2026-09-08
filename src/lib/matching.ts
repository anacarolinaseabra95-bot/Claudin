import { AXES, axisByEixo } from "./axes";
import {
  Candidato,
  Eixo,
  NivelImportancia,
  Questao,
  ResultadoCandidato,
  Tema,
  UserState,
} from "./types";
import { QUESTOES } from "./questoes";

const PESO_IMPORTANCIA: Record<NivelImportancia, number> = {
  pouco: 1,
  medio: 2,
  muito: 3,
};

/** Converte as respostas do usuário em uma posição média por eixo (-2..+2). */
export function posicaoUsuarioPorEixo(
  respostas: UserState["respostas"]
): Partial<Record<Eixo, number>> {
  const somas: Partial<Record<Eixo, { total: number; n: number }>> = {};

  for (const questao of QUESTOES) {
    const resp = respostas[questao.id];
    if (resp === null || resp === undefined) continue;
    const valor = questao.direcaoMax ? resp : -resp;
    const atual = somas[questao.eixo] ?? { total: 0, n: 0 };
    atual.total += valor;
    atual.n += 1;
    somas[questao.eixo] = atual;
  }

  const resultado: Partial<Record<Eixo, number>> = {};
  for (const eixo of Object.keys(somas) as Eixo[]) {
    const s = somas[eixo]!;
    resultado[eixo] = s.total / s.n;
  }
  return resultado;
}

function pesoDoEixo(
  eixo: Eixo,
  importancias: UserState["importancias"]
): number {
  const tema = axisByEixo(eixo).tema;
  const nivel = importancias[tema] ?? "medio";
  return PESO_IMPORTANCIA[nivel];
}

/** Calcula a afinidade (0-100) de um candidato com o usuário, por eixo e geral. */
export function calcularAfinidade(
  candidato: Candidato,
  userState: UserState
): ResultadoCandidato | null {
  const posUsuario = posicaoUsuarioPorEixo(userState.respostas);
  const eixosComuns = (Object.keys(candidato.posicao_eixos) as Eixo[]).filter(
    (e) => posUsuario[e] !== undefined
  );

  if (eixosComuns.length === 0) return null;

  let somaPonderada = 0;
  let somaPesos = 0;
  const porEixo: ResultadoCandidato["porEixo"] = [];

  for (const eixo of eixosComuns) {
    const posCand = candidato.posicao_eixos[eixo]!;
    const posUser = posUsuario[eixo]!;
    const distancia = Math.abs(posCand - posUser); // 0..4
    const afinidadeEixo = 100 * (1 - distancia / 4);
    const peso = pesoDoEixo(eixo, userState.importancias);

    somaPonderada += afinidadeEixo * peso;
    somaPesos += peso;
    porEixo.push({ eixo, afinidade: afinidadeEixo, tema: axisByEixo(eixo).tema });
  }

  return {
    candidato,
    afinidadeGeral: Math.round(somaPonderada / somaPesos),
    porEixo,
  };
}

export function rankearCandidatos(
  candidatos: Candidato[],
  userState: UserState
): ResultadoCandidato[] {
  const resultados = candidatos
    .map((c) => calcularAfinidade(c, userState))
    .filter((r): r is ResultadoCandidato => r !== null);

  return resultados.sort((a, b) => b.afinidadeGeral - a.afinidadeGeral);
}

/** Candidatos que não entram no ranking por falta de dados suficientes. */
export function candidatosSemDadosSuficientes(
  candidatos: Candidato[],
  userState: UserState
): Candidato[] {
  return candidatos.filter((c) => calcularAfinidade(c, userState) === null);
}

/** Ranking de causas mais importantes para o usuário (seção 8, item 6). */
export function rankearCausas(
  importancias: UserState["importancias"]
): { tema: Tema; nivel: NivelImportancia }[] {
  const entradas = Object.entries(importancias) as [Tema, NivelImportancia][];
  return entradas
    .sort((a, b) => PESO_IMPORTANCIA[b[1]] - PESO_IMPORTANCIA[a[1]])
    .map(([tema, nivel]) => ({ tema, nivel }));
}

export interface ResumoDiretivo {
  candidatoPrincipal: ResultadoCandidato;
  candidatoSecundario?: ResultadoCandidato;
  temaForte?: Tema;
  temaAtencao?: Tema;
  diferencaPontos?: number;
}

/**
 * Gera os elementos para o resumo diretivo (seção 8, item 7): identifica,
 * dentre os temas de MAIOR prioridade do usuário, o de maior afinidade
 * (ponto forte) e o de menor afinidade (ponto de atenção) para o candidato
 * no topo do ranking.
 */
export function gerarResumoDiretivo(
  ranking: ResultadoCandidato[],
  causasPrioritarias: { tema: Tema; nivel: NivelImportancia }[]
): ResumoDiretivo | null {
  if (ranking.length === 0) return null;
  const principal = ranking[0];
  const secundario = ranking[1];

  const temasPrioritarios = causasPrioritarias
    .filter((c) => c.nivel !== "pouco")
    .map((c) => c.tema);
  const temasParaAnalise =
    temasPrioritarios.length > 0
      ? temasPrioritarios
      : causasPrioritarias.map((c) => c.tema);

  const eixosRelevantes = principal.porEixo.filter((e) =>
    temasParaAnalise.includes(e.tema)
  );

  let temaForte: Tema | undefined;
  let temaAtencao: Tema | undefined;

  if (eixosRelevantes.length > 0) {
    const ordenado = [...eixosRelevantes].sort((a, b) => b.afinidade - a.afinidade);
    temaForte = ordenado[0].tema;
    temaAtencao = ordenado[ordenado.length - 1].tema;
    if (temaForte === temaAtencao) temaAtencao = undefined;
  }

  return {
    candidatoPrincipal: principal,
    candidatoSecundario: secundario,
    temaForte,
    temaAtencao,
    diferencaPontos: secundario
      ? principal.afinidadeGeral - secundario.afinidadeGeral
      : undefined,
  };
}

export function questoesPorEixo(): Record<Eixo, Questao[]> {
  const mapa = {} as Record<Eixo, Questao[]>;
  for (const axis of AXES) mapa[axis.eixo] = [];
  for (const q of QUESTOES) mapa[q.eixo].push(q);
  return mapa;
}
