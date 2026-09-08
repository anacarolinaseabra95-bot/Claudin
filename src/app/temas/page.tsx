"use client";

import { useRouter } from "next/navigation";
import { useStore } from "@/lib/store";
import { TEMA_DESCRICAO, TEMA_ICONE, TEMA_LABEL } from "@/lib/labels";
import { TEMAS_IMPORTANCIA } from "@/lib/types";

export default function TemasPage() {
  const router = useRouter();
  const { estado, alternarTema } = useStore();

  const total = estado.temasEscolhidos.length;

  return (
    <main className="mx-auto flex w-full max-w-md flex-1 flex-col px-6 py-10">
      <p className="text-4xl" aria-hidden="true">
        🎯
      </p>
      <h1 className="mt-3 text-2xl font-bold text-slate-900 dark:text-white">
        Quais causas te interessam mais?
      </h1>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
        Escolha quantas quiser. Só vamos fazer perguntas sobre os temas que você marcar — assim é mais
        rápido e mais simples. 😊
      </p>

      <div className="mt-6 grid grid-cols-2 gap-3">
        {TEMAS_IMPORTANCIA.map((tema) => {
          const ativo = estado.temasEscolhidos.includes(tema);
          return (
            <button
              key={tema}
              type="button"
              onClick={() => alternarTema(tema)}
              aria-pressed={ativo}
              className={`flex flex-col items-start gap-1 rounded-2xl border-2 p-4 text-left transition ${
                ativo
                  ? "border-fuchsia-500 bg-fuchsia-50 shadow-sm dark:bg-fuchsia-950/30"
                  : "border-slate-200 bg-white hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900"
              }`}
            >
              <span className="text-2xl" aria-hidden="true">
                {TEMA_ICONE[tema]}
              </span>
              <span className="text-sm font-bold text-slate-900 dark:text-white">{TEMA_LABEL[tema]}</span>
              <span className="text-xs text-slate-500 dark:text-slate-400">{TEMA_DESCRICAO[tema]}</span>
            </button>
          );
        })}
      </div>

      <p className="mt-5 text-center text-xs font-medium text-slate-500 dark:text-slate-400">
        {total === 0
          ? "Escolha pelo menos 1 pra continuar 👆"
          : `${total} ${total === 1 ? "causa escolhida" : "causas escolhidas"} ✅`}
      </p>

      <div className="mt-auto flex gap-3 pt-8">
        <button
          type="button"
          onClick={() => router.push("/cargos")}
          className="flex-1 rounded-full border border-slate-300 px-6 py-3.5 text-sm font-semibold text-slate-600 dark:border-slate-700 dark:text-slate-300"
        >
          ← Voltar
        </button>
        <button
          type="button"
          disabled={total === 0}
          onClick={() => router.push("/questionario")}
          className="flex-[2] inline-flex items-center justify-center rounded-full bg-fuchsia-600 px-8 py-3.5 text-base font-semibold text-white shadow-sm transition hover:bg-fuchsia-700 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500 dark:disabled:bg-slate-800 dark:disabled:text-slate-500"
        >
          Continuar 🚀
        </button>
      </div>
    </main>
  );
}
