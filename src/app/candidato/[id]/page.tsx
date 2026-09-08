"use client";

import { useParams } from "next/navigation";
import { useMemo, useState } from "react";
import Link from "next/link";
import { candidatoPorId } from "@/data/candidatos";
import { CARGO_LABEL, TEMA_LABEL } from "@/lib/labels";
import { useStore } from "@/lib/store";
import PersonalWeightControl from "@/components/PersonalWeightControl";
import ProposalCard from "@/components/ProposalCard";
import { PESO_VALOR } from "@/lib/labels";

type Aba = "propostas" | "pros" | "contras" | "historico" | "fontes";

const ABAS: { id: Aba; label: string }[] = [
  { id: "propostas", label: "📋 Propostas" },
  { id: "pros", label: "👍 Prós" },
  { id: "contras", label: "👎 Contras" },
  { id: "historico", label: "🗂️ Histórico" },
  { id: "fontes", label: "🔗 Fontes" },
];

export default function CandidatoPage() {
  const params = useParams<{ id: string }>();
  const candidato = candidatoPorId(params.id);
  const { estado } = useStore();
  const [aba, setAba] = useState<Aba>("propostas");

  const placarPessoal = useMemo(() => {
    if (!candidato) return null;
    const avaliacoes = estado.avaliacoesPessoais[candidato.id] ?? [];
    if (avaliacoes.length === 0) return null;
    const total = avaliacoes.reduce((soma, a) => soma + PESO_VALOR[a.peso], 0);
    const maximo = avaliacoes.length * 2;
    return { pct: Math.round((total / maximo) * 100), n: avaliacoes.length };
  }, [candidato, estado.avaliacoesPessoais]);

  if (!candidato) {
    return (
      <main className="mx-auto flex w-full max-w-md flex-1 flex-col items-center justify-center px-6 py-16 text-center">
        <p className="text-sm text-slate-600 dark:text-slate-300">Candidato não encontrado na base.</p>
        <Link href="/" className="mt-4 text-sm font-semibold text-fuchsia-600 underline">
          Voltar ao início
        </Link>
      </main>
    );
  }

  const propostasPorTema = candidato.propostas.reduce<Record<string, typeof candidato.propostas>>(
    (acc, p) => {
      (acc[p.tema] ??= []).push(p);
      return acc;
    },
    {}
  );

  return (
    <main className="mx-auto w-full max-w-2xl flex-1 px-4 py-10 sm:px-6">
      <Link href="/resultado" className="text-xs font-medium text-slate-500 hover:underline">
        ← Voltar ao resultado
      </Link>

      <div className="mt-4 flex items-start gap-4">
        <div
          aria-hidden="true"
          className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-fuchsia-200 to-violet-200 text-2xl font-bold text-fuchsia-800 dark:from-fuchsia-800 dark:to-violet-800 dark:text-fuchsia-100"
        >
          {candidato.nome_urna.charAt(0)}
        </div>
        <div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-white">{candidato.nome_urna}</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {candidato.nome_completo} · {candidato.numero} · {candidato.partido}
          </p>
          <p className="text-xs text-slate-400">{CARGO_LABEL[candidato.cargo]}</p>
        </div>
      </div>

      <p className="mt-4 text-sm text-slate-700 dark:text-slate-200">{candidato.biografia_curta}</p>

      {candidato.nota_editorial && (
        <p className="mt-3 rounded-xl bg-amber-50 p-3 text-xs text-amber-800 dark:bg-amber-950/40 dark:text-amber-200">
          ℹ️ {candidato.nota_editorial}
        </p>
      )}

      <div className="mt-4 flex flex-wrap gap-3 text-xs">
        {candidato.redes_sociais.instagram && (
          <a href={candidato.redes_sociais.instagram} target="_blank" rel="noreferrer" className="underline underline-offset-2">
            Instagram
          </a>
        )}
        {candidato.redes_sociais.site_oficial && (
          <a href={candidato.redes_sociais.site_oficial} target="_blank" rel="noreferrer" className="underline underline-offset-2">
            Site oficial
          </a>
        )}
        <a href={candidato.redes_sociais.tse_ficha} target="_blank" rel="noreferrer" className="underline underline-offset-2">
          Ficha no TSE
        </a>
      </div>
      <p className="mt-2 text-[11px] text-slate-400">Atualizado em {candidato.ultima_verificacao}</p>

      {placarPessoal && (
        <div className="mt-6 rounded-2xl border-2 border-fuchsia-200 bg-fuchsia-50/60 p-4 dark:border-fuchsia-900 dark:bg-fuchsia-950/20">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            ⭐ Seu placar pessoal para {candidato.nome_urna}
          </p>
          <p className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">{placarPessoal.pct}%</p>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Calculado a partir de {placarPessoal.n} {placarPessoal.n === 1 ? "item avaliado" : "itens avaliados"}{" "}
            por você abaixo — não é a afinidade geral, é o que você mesmo construiu marcando o que pesa mais.
          </p>
        </div>
      )}

      <div className="mt-8 flex gap-1 overflow-x-auto border-b border-slate-200 dark:border-slate-800">
        {ABAS.map((a) => (
          <button
            key={a.id}
            type="button"
            onClick={() => setAba(a.id)}
            className={`flex-shrink-0 border-b-2 px-3 py-2 text-sm font-semibold transition ${
              aba === a.id
                ? "border-fuchsia-600 text-fuchsia-600 dark:text-fuchsia-400"
                : "border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400"
            }`}
          >
            {a.label}
          </button>
        ))}
      </div>

      <div className="mt-5">
        {aba === "propostas" &&
          (candidato.propostas.length === 0 ? (
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Posição não localizada para os temas do questionário no momento da curadoria.
            </p>
          ) : (
            <div className="flex flex-col gap-6">
              {Object.entries(propostasPorTema).map(([tema, lista]) => (
                <div key={tema}>
                  <h3 className="mb-2 text-sm font-bold text-slate-800 dark:text-slate-100">
                    {TEMA_LABEL[tema as keyof typeof TEMA_LABEL]}
                  </h3>
                  <div className="flex flex-col gap-3">
                    {lista.map((p) => (
                      <ProposalCard key={p.id} proposta={p} candidatoId={candidato.id} comPesoPessoal />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ))}

        {aba === "pros" &&
          (candidato.pros.length === 0 ? (
            <p className="text-sm text-slate-500 dark:text-slate-400">Nenhum ponto a favor documentado ainda.</p>
          ) : (
            <ul className="flex flex-col gap-3">
              {candidato.pros.map((p) => (
                <li key={p.id} className="rounded-xl border border-slate-200 p-4 dark:border-slate-800">
                  <p className="text-sm text-slate-800 dark:text-slate-100">{p.texto}</p>
                  <a href={p.fonte} target="_blank" rel="noreferrer" className="mt-1 inline-block text-xs text-slate-500 underline underline-offset-2">
                    Ver fonte
                  </a>
                  <PersonalWeightControl candidatoId={candidato.id} itemId={p.id} />
                </li>
              ))}
            </ul>
          ))}

        {aba === "contras" &&
          (candidato.contras.length === 0 ? (
            <p className="text-sm text-slate-500 dark:text-slate-400">Nenhuma controvérsia documentada ainda.</p>
          ) : (
            <ul className="flex flex-col gap-3">
              {candidato.contras.map((c) => (
                <li key={c.id} className="rounded-xl border border-slate-200 p-4 dark:border-slate-800">
                  <p className="text-sm text-slate-800 dark:text-slate-100">{c.texto}</p>
                  <a href={c.fonte} target="_blank" rel="noreferrer" className="mt-1 inline-block text-xs text-slate-500 underline underline-offset-2">
                    Ver fonte
                  </a>
                  <PersonalWeightControl candidatoId={candidato.id} itemId={c.id} />
                </li>
              ))}
            </ul>
          ))}

        {aba === "historico" &&
          (candidato.historico_votos.length === 0 ? (
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Histórico de votações não disponível para este cargo/candidato.
            </p>
          ) : (
            <ul className="flex flex-col gap-3">
              {candidato.historico_votos.map((h, i) => (
                <li key={i} className="rounded-xl border border-slate-200 p-4 dark:border-slate-800">
                  <p className="text-sm font-medium text-slate-800 dark:text-slate-100">{h.projeto}</p>
                  <p className="text-sm text-slate-600 dark:text-slate-300">{h.posicao}</p>
                  <a href={h.fonte} target="_blank" rel="noreferrer" className="mt-1 inline-block text-xs text-slate-500 underline underline-offset-2">
                    Ver fonte
                  </a>
                </li>
              ))}
            </ul>
          ))}

        {aba === "fontes" && (
          <ul className="flex flex-col gap-2 text-sm">
            {[...candidato.propostas.map((p) => p.fonte.url), ...candidato.pros.map((p) => p.fonte), ...candidato.contras.map((c) => c.fonte)]
              .filter((v, i, arr) => arr.indexOf(v) === i)
              .map((url) => (
                <li key={url}>
                  <a href={url} target="_blank" rel="noreferrer" className="break-all text-fuchsia-600 underline underline-offset-2 dark:text-fuchsia-400">
                    {url}
                  </a>
                </li>
              ))}
            {candidato.propostas.length === 0 && candidato.pros.length === 0 && candidato.contras.length === 0 && (
              <li className="text-slate-500 dark:text-slate-400">
                Nenhuma fonte específica localizada ainda além da ficha oficial no TSE.
              </li>
            )}
          </ul>
        )}
      </div>
    </main>
  );
}
