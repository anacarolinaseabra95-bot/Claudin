import { AXES, axisByEixo } from "./axes";
import {
  Candidato,
  Eixo,
  NivelImportancia,
  Partido,
  PosicaoEixos,
  Questao,
  ResultadoCandidato,
  ResultadoPartido,
  Tema,
  TEMA_PARA_EIXOS,
  UserState,
} from "./types";
import { QUESTOES } from "./questoes";

const PESO_IMPORTANCIA: Record<NivelImportancia, number> = {
  pouco: 1,
  medio: 2,
  muito: 3,
};

/**
 * Converte as respostas do usuário em uma posição média por eixo (-2..+2).
 * As perguntas já são escritas de forma que a opção A representa sempre o
 * polo mínimo do eixo e a opção B o polo máximo — então a resposta (-2..2)
 * já está na escala certa, sem precisar inverter nada.
 */
export function posicaoUsuarioPorEixo(
  respostas: UserState["respostas"]
): Partial<Record<Eixo, number>> {
  const somas: Partial<Record<Eixo, { total: number; n: number }>> = {};

  for (const questao of QUESTOES) {
    const resp = respostas[questao.id];
    if (resp === null || resp === undefined) continue;
    const atual = somas[questao.eixo] ?? { total: 0, n: 0 };
    atual.total += resp;
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

/**
 * O peso de um eixo vem do(s) tema(s) literal(is) que o usuário escolheu na
 * tela de temas e que apontam pra esse eixo (TEMA_PARA_EIXOS) — por exemplo,
 * escolher "Saúde" ou "Educação" pesa no eixo de economia. Quando mais de um
 * tema escolhido aponta pro mesmo eixo, usamos a maior importância entre eles.
 */
function pesoDoEixo(
  eixo: Eixo,
  importancias: UserState["importancias"]
): number {
  const temasQueApontam = (Object.keys(importancias) as Tema[]).filter((tema) =>
    (TEMA_PARA_EIXOS[tema] ?? []).includes(eixo)
  );

  if (temasQueApontam.length === 0) {
    // Fallback (ex.: fluxos antigos de teste): usa o tema "dono" do eixo.
    const nivel = importancias[axisByEixo(eixo).tema] ?? "medio";
    return PESO_IMPORTANCIA[nivel];
  }

  const maiorNivel = temasQueApontam.reduce<NivelImportancia>((maior, tema) => {
    const nivel = importancias[tema]!;
    return PESO_IMPORTANCIA[nivel] > PESO_IMPORTANCIA[maior] ? nivel : maior;
  }, "pouco");

  return PESO_IMPORTANCIA[maiorNivel];
}

interface AfinidadeGenerica {
  afinidadeGeral: number;
  porEixo: { eixo: Eixo; afinidade: number; tema: Tema }[];
}

/** Núcleo do cálculo de afinidade — usado tanto para candidatos quanto para partidos. */
function calcularAfinidadeGenerica(
  posicaoEixos: PosicaoEixos,
  userState: UserState
): AfinidadeGenerica | null {
  const posUsuario = posicaoUsuarioPorEixo(userState.respostas);
  const totalEixosRespondidos = Object.keys(posUsuario).length;
  const eixosComuns = (Object.keys(posicaoEixos) as Eixo[]).filter(
    (e) => posUsuario[e] !== undefined
  );

  // Exige cobertura mínima de 2 eixos (quando o usuário respondeu 2 ou mais)
  // pra evitar que um único eixo documentado — só por sorte próximo ou
  // distante do usuário — decida sozinho um resultado de 100% ou 0%.
  const coberturaMinima = Math.min(2, totalEixosRespondidos);
  if (eixosComuns.length < coberturaMinima) return null;

  let somaPonderada = 0;
  let somaPesos = 0;
  const porEixo: AfinidadeGenerica["porEixo"] = [];

  for (const eixo of eixosComuns) {
    const posAlvo = posicaoEixos[eixo]!;
    const posUser = posUsuario[eixo]!;
    const distancia = Math.abs(posAlvo - posUser); // 0..4
    const afinidadeEixo = 100 * (1 - distancia / 4);
    const peso = pesoDoEixo(eixo, userState.importancias);

    somaPonderada += afinidadeEixo * peso;
    somaPesos += peso;
    porEixo.push({ eixo, afinidade: afinidadeEixo, tema: axisByEixo(eixo).tema });
  }

  return { afinidadeGeral: Math.round(somaPonderada / somaPesos), porEixo };
}

/** Calcula a afinidade (0-100) de um candidato com o usuário, por eixo e geral. */
export function calcularAfinidade(
  candidato: Candidato,
  userState: UserState
): ResultadoCandidato | null {
  const r = calcularAfinidadeGenerica(candidato.posicao_eixos, userState);
  return r ? { candidato, ...r } : null;
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

/**
 * Match por partido (seção "sempre ter um resultado", especialmente útil
 * pra Deputado, onde o sistema proporcional faz o voto de legenda ajudar a
 * eleger candidatos do mesmo partido mesmo sem saber o nome de cada um).
 */
export function calcularAfinidadePartido(
  partido: Partido,
  userState: UserState
): ResultadoPartido | null {
  const r = calcularAfinidadeGenerica(partido.posicao_eixos, userState);
  return r ? { partido, ...r } : null;
}

export function rankearPartidos(
  partidos: Partido[],
  userState: UserState
): ResultadoPartido[] {
  const resultados = partidos
    .map((p) => calcularAfinidadePartido(p, userState))
    .filter((r): r is ResultadoPartido => r !== null);

  return resultados.sort((a, b) => b.afinidadeGeral - a.afinidadeGeral);
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
 * dentre as causas de MAIOR prioridade do usuário (na linguagem literal que
 * ele escolheu, ex. "Saúde"), a de maior afinidade (ponto forte) e a de
 * menor afinidade (ponto de atenção) para o candidato no topo do ranking.
 * Cada causa literal "herda" a afinidade do(s) eixo(s) ideológico(s) que ela
 * ativa (TEMA_PARA_EIXOS) — ex.: "Saúde" herda a afinidade do eixo economia.
 */
export function gerarResumoDiretivo(
  ranking: ResultadoCandidato[],
  causasPrioritarias: { tema: Tema; nivel: NivelImportancia }[]
): ResumoDiretivo | null {
  if (ranking.length === 0) return null;
  const principal = ranking[0];
  const secundario = ranking[1];

  const temasPrioritarios = causasPrioritarias.filter((c) => c.nivel !== "pouco");
  const listaBase = temasPrioritarios.length > 0 ? temasPrioritarios : causasPrioritarias;

  const afinidadePorCausa: { tema: Tema; afinidade: number }[] = [];
  for (const causa of listaBase) {
    const eixosDaCausa = TEMA_PARA_EIXOS[causa.tema] ?? [];
    const eixosEncontrados = principal.porEixo.filter((e) => eixosDaCausa.includes(e.eixo));
    if (eixosEncontrados.length === 0) continue;
    const media =
      eixosEncontrados.reduce((soma, e) => soma + e.afinidade, 0) / eixosEncontrados.length;
    afinidadePorCausa.push({ tema: causa.tema, afinidade: media });
  }

  let temaForte: Tema | undefined;
  let temaAtencao: Tema | undefined;

  if (afinidadePorCausa.length > 0) {
    const ordenado = [...afinidadePorCausa].sort((a, b) => b.afinidade - a.afinidade);
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
