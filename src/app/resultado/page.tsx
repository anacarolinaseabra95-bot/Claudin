"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import CandidateCard from "@/components/CandidateCard";
import DirectiveSummary from "@/components/DirectiveSummary";
import FilterBar, { FILTROS_VAZIOS, FiltrosDemograficos, filtrosAtivos, passaFiltro } from "@/components/FilterBar";
import PartyCard from "@/components/PartyCard";
import ProposalCard from "@/components/ProposalCard";
import ThemeChips from "@/components/ThemeChips";
import { CARGO_LABEL, TEMA_LABEL } from "@/lib/labels";
import {
  candidatosSemDadosSuficientes,
  gerarResumoDiretivo,
  rankearCandidatos,
  rankearCausas,
  rankearPartidos,
} from "@/lib/matching";
import { useStore } from "@/lib/store";
import { candidatosPorCargo } from "@/data/candidatos";
import { PARTIDOS } from "@/data/partidos";
import { Cargo, NivelImportancia, Tema } from "@/lib/types";

export default function ResultadoPage() {
  const router = useRouter();
  const { estado, hidratado } = useStore();

  useEffect(() => {
    if (!hidratado) return;
    if (!estado.questionarioConcluido || estado.cargosSelecionados.length === 0) {
      router.replace("/cargos");
    }
  }, [hidratado, estado.questionarioConcluido, estado.cargosSelecionados.length, router]);

  const causasPrioritarias = useMemo(() => rankearCausas(estado.importancias), [estado.importancias]);

  if (!hidratado || !estado.questionarioConcluido) {
    return (
      <main className="mx-auto flex w-full max-w-md flex-1 items-center justify-center px-6 py-16">
        <p className="text-sm text-slate-500">Preparando seu resultado… 🔮</p>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-2xl flex-1 px-4 py-10 sm:px-6">
      <p className="text-4xl" aria-hidden="true">
        🏆
      </p>
      <h1 className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">Seu resultado</h1>
      <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
        As causas que mais importam pra você, na ordem que escolheu:{" "}
        <strong>
          {causasPrioritarias.map((c) => TEMA_LABEL[c.tema]).join(", ") || "nenhuma escolhida"}
        </strong>
        .
      </p>

      <div className="mt-10 flex flex-col gap-14">
        {estado.cargosSelecionados.map((cargo) => (
          <SecaoCargo key={cargo} cargo={cargo} causasPrioritarias={causasPrioritarias} />
        ))}
      </div>

      <div className="mt-14 rounded-2xl border border-slate-200 p-5 text-center dark:border-slate-800">
        <p className="text-sm text-slate-600 dark:text-slate-300">
          Quer montar sua própria comparação, com qualquer candidato da base? 🔍
        </p>
        <Link
          href="/comparar"
          className="mt-3 inline-flex items-center justify-center rounded-full border border-slate-300 px-6 py-2.5 text-sm font-semibold text-slate-700 hover:border-slate-400 dark:border-slate-700 dark:text-slate-200"
        >
          Abrir comparador livre
        </Link>
      </div>
    </main>
  );
}

function SecaoCargo({
  cargo,
  causasPrioritarias,
}: {
  cargo: Cargo;
  causasPrioritarias: { tema: Tema; nivel: NivelImportancia }[];
}) {
  const { estado } = useStore();
  const candidatos = candidatosPorCargo(cargo);
  const ehLegislativo = cargo === "deputado_federal" || cargo === "deputado_estadual";

  const [temasAtivos, setTemasAtivos] = useState<Tema[]>(() =>
    causasPrioritarias.slice(0, 3).map((c) => c.tema)
  );
  const [filtros, setFiltros] = useState<FiltrosDemograficos>(FILTROS_VAZIOS);

  if (candidatos.length === 0) {
    return (
      <section>
        <h2 className="text-lg font-bold text-slate-900 dark:text-white">{CARGO_LABEL[cargo]}</h2>

        {ehLegislativo ? (
          <ResultadoPorPartido cargo={cargo} />
        ) : (
          <div className="mt-4 rounded-2xl border border-dashed border-slate-300 p-5 text-sm text-slate-600 dark:border-slate-700 dark:text-slate-300">
            <p>
              Ainda não temos candidatos suficientes pesquisados pra esse cargo — nunca inventamos dados.
            </p>
            <p className="mt-2">
              <a
                href="https://divulgacandcontas.tse.jus.br/"
                target="_blank"
                rel="noreferrer"
                className="font-semibold underline underline-offset-2"
              >
                Busque o nome do seu candidato direto no TSE →
              </a>
            </p>
          </div>
        )}
      </section>
    );
  }

  const ranking = rankearCandidatos(candidatos, estado);
  const semDados = candidatosSemDadosSuficientes(candidatos, estado);
  const rankingFiltrado = filtrosAtivos(filtros)
    ? ranking.filter((r) => passaFiltro(r.candidato, filtros))
    : ranking;
  const resumo = gerarResumoDiretivo(rankingFiltrado, causasPrioritarias);
  const finalistas = rankingFiltrado.slice(0, 3);

  const temasDisponiveis = Array.from(
    new Set(
      finalistas.flatMap((f) => f.candidato.propostas.map((p) => p.tema))
    )
  ).sort((a, b) => {
    const pa = causasPrioritarias.findIndex((c) => c.tema === a);
    const pb = causasPrioritarias.findIndex((c) => c.tema === b);
    return (pa === -1 ? 999 : pa) - (pb === -1 ? 999 : pb);
  });

  function alternarTema(tema: Tema) {
    setTemasAtivos((atuais) => (atuais.includes(tema) ? atuais.filter((t) => t !== tema) : [...atuais, tema]));
  }

  return (
    <section>
      <h2 className="text-lg font-bold text-slate-900 dark:text-white">{CARGO_LABEL[cargo]}</h2>

      {ranking.length === 0 ? (
        <p className="mt-4 text-sm text-slate-600 dark:text-slate-300">
          Nenhum candidato deste cargo tem dados suficientes na nossa base para calcular afinidade ainda.
          Veja as fichas básicas abaixo.
        </p>
      ) : (
        <>
          <div className="mt-4">
            <FilterBar
              candidatos={ranking.map((r) => r.candidato)}
              filtros={filtros}
              onChange={setFiltros}
            />
          </div>

          {rankingFiltrado.length === 0 ? (
            <p className="mt-4 text-sm text-slate-600 dark:text-slate-300">
              Nenhum candidato bate com esse filtro. Tente tirar algum filtro. 🙂
            </p>
          ) : (
            <>
              {resumo && (
                <div className="mt-4">
                  <DirectiveSummary resumo={resumo} />
                </div>
              )}

              <div className="mt-5 flex flex-col gap-2">
                {rankingFiltrado.map((r, i) => (
                  <CandidateCard
                    key={r.candidato.id}
                    candidato={r.candidato}
                    afinidade={r.afinidadeGeral}
                    destaque={i < 3}
                    posicao={i + 1}
                  />
                ))}
              </div>
            </>
          )}

          {temasDisponiveis.length > 0 && (
            <div className="mt-8">
              <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                🔎 Comparar finalistas por causa
              </h3>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                Já vem selecionado o que mais importa pra você. Toque pra adicionar ou tirar temas.
              </p>
              <div className="mt-3">
                <ThemeChips temas={temasDisponiveis} ativos={temasAtivos} onToggle={alternarTema} />
              </div>

              <div className="mt-5 flex flex-col gap-8">
                {finalistas.map((f) => {
                  const propostas = f.candidato.propostas.filter((p) => temasAtivos.includes(p.tema));
                  return (
                    <div key={f.candidato.id}>
                      <p className="mb-2 font-semibold text-slate-900 dark:text-white">
                        {f.candidato.nome_urna}{" "}
                        <span className="font-normal text-slate-400">— {f.afinidadeGeral}% de afinidade</span>
                      </p>
                      {propostas.length === 0 ? (
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                          Posição não localizada para os temas selecionados.
                        </p>
                      ) : (
                        <div className="flex flex-col gap-3">
                          {propostas.map((p) => (
                            <ProposalCard key={p.id} proposta={p} candidatoId={f.candidato.id} />
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </>
      )}

      {semDados.length > 0 && (
        <div className="mt-6">
          <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-100">
            Outros candidatos registrados (dados insuficientes para afinidade)
          </h3>
          <div className="mt-3 flex flex-col gap-2">
            {semDados.map((c) => (
              <CandidateCard key={c.id} candidato={c} />
            ))}
          </div>
        </div>
      )}

      {ehLegislativo && (
        <div className="mt-8">
          <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-100">
            🗳️ Outros partidos que também combinam
          </h3>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Nossa base de candidatos ainda não cobre todo mundo. Como o voto pra esse cargo é proporcional,
            olhar os partidos alinhados amplia suas opções pra além dos nomes acima.
          </p>
          <div className="mt-3">
            <ResultadoPorPartido cargo={cargo} compacto />
          </div>
        </div>
      )}
    </section>
  );
}

/**
 * Resultado por partido: ainda não temos candidatos individuais suficientes
 * pra Deputado, mas o Brasil usa voto proporcional — seu voto em alguém de um
 * partido também ajuda a eleger outras pessoas do mesmo partido/coligação. Por
 * isso, mostrar os partidos mais alinhados já é um resultado útil de verdade.
 */
function ResultadoPorPartido({ cargo, compacto = false }: { cargo: Cargo; compacto?: boolean }) {
  const { estado } = useStore();
  const ranking = rankearPartidos(PARTIDOS, estado);
  const top = ranking.slice(0, compacto ? 3 : 4);

  if (top.length === 0) {
    return (
      <p className="mt-4 text-sm text-slate-600 dark:text-slate-300">
        Responda ao menos uma pergunta pra gente calcular seus partidos combinando. 🙂
      </p>
    );
  }

  return (
    <div className="mt-4">
      {!compacto && (
        <div className="rounded-2xl bg-fuchsia-50 p-4 text-sm text-slate-700 dark:bg-fuchsia-950/20 dark:text-slate-200">
          💡 Ainda não temos a ficha de cada candidato a{" "}
          {cargo === "deputado_federal" ? "Deputado Federal" : "Deputado Estadual"} por SP — são milhares de
          nomes. Mas no Brasil o voto pra esse cargo é <strong>proporcional</strong>: votar em alguém de um
          partido também ajuda a eleger outras pessoas do mesmo partido. Então já é um baita passo saber{" "}
          <strong>quais partidos combinam mais com você</strong> — aí é só procurar quem concorre por eles na
          sua região.
        </div>
      )}

      <div className={`flex flex-col gap-3 ${compacto ? "" : "mt-4"}`}>
        {top.map((r, i) => (
          <PartyCard key={r.partido.sigla} partido={r.partido} afinidade={r.afinidadeGeral} destaque={i === 0} />
        ))}
      </div>

      <a
        href="https://divulgacandcontas.tse.jus.br/"
        target="_blank"
        rel="noreferrer"
        className="mt-4 inline-block text-sm font-semibold text-fuchsia-700 underline underline-offset-2 dark:text-fuchsia-400"
      >
        Buscar candidatos desses partidos no TSE →
      </a>
    </div>
  );
}
