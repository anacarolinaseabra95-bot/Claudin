"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { CARGO_LABEL } from "@/lib/labels";
import { useStore } from "@/lib/store";
import { Cargo } from "@/lib/types";

const OPCOES: { cargo: Cargo; descricao: string; disponivel: boolean }[] = [
  { cargo: "presidente", descricao: "13 candidaturas registradas no TSE", disponivel: true },
  { cargo: "governador", descricao: "7 candidaturas para o governo de SP", disponivel: true },
  {
    cargo: "deputado_federal",
    descricao: "Base curada em construção — busca assistida pelo TSE",
    disponivel: true,
  },
  {
    cargo: "deputado_estadual",
    descricao: "Base curada em construção — busca assistida pelo TSE",
    disponivel: true,
  },
];

export default function CargosPage() {
  const router = useRouter();
  const { estado, setCargos } = useStore();
  const [selecionados, setSelecionados] = useState<Cargo[]>(estado.cargosSelecionados);

  function alternar(cargo: Cargo) {
    setSelecionados((atuais) =>
      atuais.includes(cargo) ? atuais.filter((c) => c !== cargo) : [...atuais, cargo]
    );
  }

  function continuar() {
    setCargos(selecionados);
    router.push("/questionario");
  }

  return (
    <main className="mx-auto flex w-full max-w-md flex-1 flex-col px-6 py-12">
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
        Quais eleições você quer decidir agora?
      </h1>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
        Você pode escolher mais de uma. O mesmo questionário de prioridades vale para todas.
      </p>

      <div className="mt-8 flex flex-col gap-3">
        {OPCOES.map((op) => {
          const ativo = selecionados.includes(op.cargo);
          return (
            <button
              key={op.cargo}
              type="button"
              onClick={() => alternar(op.cargo)}
              aria-pressed={ativo}
              className={`flex items-start justify-between gap-3 rounded-2xl border px-5 py-4 text-left transition ${
                ativo
                  ? "border-indigo-600 bg-indigo-50 dark:bg-indigo-950/40"
                  : "border-slate-200 bg-white hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900"
              }`}
            >
              <span>
                <span className="block font-semibold text-slate-900 dark:text-white">
                  {CARGO_LABEL[op.cargo]}
                </span>
                <span className="mt-0.5 block text-xs text-slate-500 dark:text-slate-400">
                  {op.descricao}
                </span>
              </span>
              <span
                aria-hidden="true"
                className={`mt-0.5 h-5 w-5 flex-shrink-0 rounded-full border-2 ${
                  ativo ? "border-indigo-600 bg-indigo-600" : "border-slate-300 dark:border-slate-600"
                }`}
              />
            </button>
          );
        })}
      </div>

      <button
        type="button"
        disabled={selecionados.length === 0}
        onClick={continuar}
        className="mt-10 inline-flex items-center justify-center rounded-full bg-indigo-600 px-8 py-3.5 text-base font-semibold text-white shadow-sm transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500 dark:disabled:bg-slate-800 dark:disabled:text-slate-500"
      >
        Continuar
      </button>
    </main>
  );
}
