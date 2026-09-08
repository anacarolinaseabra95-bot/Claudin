"use client";

import { useState } from "react";
import { TEMA_ICONE, TEMA_LABEL } from "@/lib/labels";
import { Proposta } from "@/lib/types";
import PersonalWeightControl from "./PersonalWeightControl";

const FONTE_LABEL: Record<Proposta["fonte"]["tipo"], string> = {
  tse: "Plano de governo (TSE)",
  site_oficial: "Site oficial",
  instagram: "Instagram oficial",
  imprensa: "Cobertura jornalística",
};

export default function ProposalCard({
  proposta,
  candidatoId,
  comPesoPessoal = false,
}: {
  proposta: Proposta;
  candidatoId: string;
  comPesoPessoal?: boolean;
}) {
  const [aberto, setAberto] = useState(false);

  return (
    <div className="rounded-xl border border-slate-200 p-4 dark:border-slate-800">
      <span className="mb-1.5 inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-slate-500 dark:bg-slate-800 dark:text-slate-400">
        <span aria-hidden="true">{TEMA_ICONE[proposta.tema]}</span> {TEMA_LABEL[proposta.tema]}
      </span>
      <p className="text-sm font-medium text-slate-900 dark:text-white">{proposta.resumo}</p>

      {aberto && <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{proposta.detalhe}</p>}

      <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1">
        <button
          type="button"
          onClick={() => setAberto((a) => !a)}
          className="text-xs font-semibold text-indigo-600 hover:underline dark:text-indigo-400"
        >
          {aberto ? "Ver menos" : "Ver detalhe completo"}
        </button>
        <a
          href={proposta.fonte.url}
          target="_blank"
          rel="noreferrer"
          className="text-xs text-slate-500 underline underline-offset-2 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
        >
          Ver fonte ({FONTE_LABEL[proposta.fonte.tipo]})
        </a>
      </div>

      {comPesoPessoal && <PersonalWeightControl candidatoId={candidatoId} itemId={proposta.id} />}
    </div>
  );
}
