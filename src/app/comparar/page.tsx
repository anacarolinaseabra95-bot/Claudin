"use client";

import { useMemo, useState } from "react";
import { CANDIDATOS } from "@/data/candidatos";
import { CARGO_LABEL, TEMA_LABEL } from "@/lib/labels";
import { Candidato, Tema } from "@/lib/types";
import ProposalCard from "@/components/ProposalCard";

const MAX_SELECIONADOS = 4;

export default function ComparadorPage() {
  const [busca, setBusca] = useState("");
  const [selecionados, setSelecionados] = useState<Candidato[]>([]);

  const resultados = useMemo(() => {
    const termo = busca.trim().toLowerCase();
    if (!termo) return [];
    return CANDIDATOS.filter(
      (c) =>
        !selecionados.some((s) => s.id === c.id) &&
        (c.nome_urna.toLowerCase().includes(termo) ||
          c.nome_completo.toLowerCase().includes(termo) ||
          c.numero.includes(termo))
    ).slice(0, 6);
  }, [busca, selecionados]);

  function adicionar(c: Candidato) {
    if (selecionados.length >= MAX_SELECIONADOS) return;
    setSelecionados((s) => [...s, c]);
    setBusca("");
  }

  function remover(id: string) {
    setSelecionados((s) => s.filter((c) => c.id !== id));
  }

  const temas = useMemo(() => {
    const conjunto = new Set<Tema>();
    selecionados.forEach((c) => c.propostas.forEach((p) => conjunto.add(p.tema)));
    return Array.from(conjunto);
  }, [selecionados]);

  return (
    <main className="mx-auto w-full max-w-2xl flex-1 px-4 py-10 sm:px-6">
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Comparador livre</h1>
      <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
        Escolha de 2 a {MAX_SELECIONADOS} candidatos — inclusive fora do seu Top 3 sugerido — e compare
        tema a tema.
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        {selecionados.map((c) => (
          <span
            key={c.id}
            className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
          >
            {c.nome_urna}
            <button
              type="button"
              onClick={() => remover(c.id)}
              aria-label={`Remover ${c.nome_urna}`}
              className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-100"
            >
              ×
            </button>
          </span>
        ))}
      </div>

      {selecionados.length < MAX_SELECIONADOS && (
        <div className="relative mt-4">
          <input
            type="text"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Buscar candidato por nome ou número…"
            className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-900"
          />
          {resultados.length > 0 && (
            <ul className="absolute z-10 mt-1 w-full rounded-xl border border-slate-200 bg-white shadow-lg dark:border-slate-700 dark:bg-slate-900">
              {resultados.map((c) => (
                <li key={c.id}>
                  <button
                    type="button"
                    onClick={() => adicionar(c)}
                    className="flex w-full items-center justify-between px-4 py-2.5 text-left text-sm hover:bg-slate-50 dark:hover:bg-slate-800"
                  >
                    <span>
                      {c.nome_urna} <span className="text-slate-400">· {c.numero} · {c.partido}</span>
                    </span>
                    <span className="text-xs text-slate-400">{CARGO_LABEL[c.cargo]}</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {selecionados.length < 2 && (
        <p className="mt-8 text-sm text-slate-500 dark:text-slate-400">
          Selecione pelo menos 2 candidatos para começar a comparação.
        </p>
      )}

      {selecionados.length >= 2 && (
        <div className="mt-10 flex flex-col gap-8">
          {temas.length === 0 && (
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Nenhum dos candidatos selecionados tem propostas documentadas na base ainda.
            </p>
          )}
          {temas.map((tema) => (
            <div key={tema}>
              <h2 className="mb-3 text-sm font-bold text-slate-800 dark:text-slate-100">{TEMA_LABEL[tema]}</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {selecionados.map((c) => {
                  const propostas = c.propostas.filter((p) => p.tema === tema);
                  return (
                    <div key={c.id}>
                      <p className="mb-2 text-xs font-semibold text-slate-500">{c.nome_urna}</p>
                      {propostas.length === 0 ? (
                        <p className="text-xs text-slate-400">Posição não localizada.</p>
                      ) : (
                        <div className="flex flex-col gap-2">
                          {propostas.map((p) => (
                            <ProposalCard key={p.id} proposta={p} candidatoId={c.id} />
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
