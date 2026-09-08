"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import ProgressBar from "@/components/ProgressBar";
import { QUESTOES } from "@/lib/questoes";
import { useStore } from "@/lib/store";
import { NIVEL_LABEL, TEMA_ICONE, TEMA_LABEL } from "@/lib/labels";
import { NivelImportancia, RespostaEscala, TEMAS_IMPORTANCIA } from "@/lib/types";

const ESCALA: { valor: RespostaEscala; label: string }[] = [
  { valor: -2, label: "Discordo totalmente" },
  { valor: -1, label: "Discordo" },
  { valor: 0, label: "Neutro" },
  { valor: 1, label: "Concordo" },
  { valor: 2, label: "Concordo totalmente" },
];

const NIVEIS: NivelImportancia[] = ["pouco", "medio", "muito"];

export default function QuestionarioPage() {
  const router = useRouter();
  const { estado, responder, setImportancia, concluirQuestionario } = useStore();
  const [passo, setPasso] = useState(0);

  const totalPassos = QUESTOES.length + 1; // + tela de importância dos temas
  const naTelaImportancia = passo === QUESTOES.length;
  const questaoAtual = naTelaImportancia ? null : QUESTOES[passo];

  function avancar() {
    if (passo < totalPassos - 1) {
      setPasso(passo + 1);
    } else {
      concluirQuestionario();
      router.push("/resultado");
    }
  }

  function voltar() {
    if (passo > 0) setPasso(passo - 1);
    else router.push("/cargos");
  }

  return (
    <main className="mx-auto flex w-full max-w-md flex-1 flex-col px-6 py-10">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={voltar}
          aria-label="Voltar"
          className="rounded-full p-1 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          ←
        </button>
        <ProgressBar atual={passo + 1} total={totalPassos} />
      </div>

      {questaoAtual && (
        <div className="mt-10 flex flex-1 flex-col">
          <p className="text-xs font-semibold uppercase tracking-wide text-indigo-600 dark:text-indigo-400">
            Sobre política pública, não sobre candidatos
          </p>
          <h1 className="mt-3 text-xl font-semibold leading-snug text-slate-900 dark:text-white">
            {questaoAtual.texto}
          </h1>

          <div className="mt-8 flex flex-col gap-2">
            {ESCALA.map((op) => {
              const ativo = estado.respostas[questaoAtual.id] === op.valor;
              return (
                <button
                  key={String(op.valor)}
                  type="button"
                  onClick={() => {
                    responder(questaoAtual.id, op.valor);
                    avancar();
                  }}
                  className={`rounded-xl border px-4 py-3 text-left text-sm font-medium transition ${
                    ativo
                      ? "border-indigo-600 bg-indigo-50 text-indigo-900 dark:bg-indigo-950/40 dark:text-indigo-200"
                      : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
                  }`}
                >
                  {op.label}
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={() => {
              responder(questaoAtual.id, null);
              avancar();
            }}
            className="mt-6 text-sm font-medium text-slate-500 underline underline-offset-2 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
          >
            Não tenho opinião formada sobre isso
          </button>
        </div>
      )}

      {naTelaImportancia && (
        <div className="mt-10 flex flex-1 flex-col">
          <p className="text-xs font-semibold uppercase tracking-wide text-indigo-600 dark:text-indigo-400">
            Última etapa
          </p>
          <h1 className="mt-3 text-xl font-semibold leading-snug text-slate-900 dark:text-white">
            O quanto cada causa pesa para o seu voto?
          </h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            Isso decide quais causas aparecem primeiro na sua comparação de candidatos.
          </p>

          <div className="mt-6 flex flex-col gap-4">
            {TEMAS_IMPORTANCIA.map((tema) => (
              <div key={tema}>
                <p className="mb-2 text-sm font-medium text-slate-800 dark:text-slate-100">
                  <span aria-hidden="true">{TEMA_ICONE[tema]}</span> {TEMA_LABEL[tema]}
                </p>
                <div className="grid grid-cols-3 gap-2">
                  {NIVEIS.map((nivel) => {
                    const ativo = estado.importancias[tema] === nivel;
                    return (
                      <button
                        key={nivel}
                        type="button"
                        onClick={() => setImportancia(tema, nivel)}
                        aria-pressed={ativo}
                        className={`rounded-lg border px-2 py-2 text-xs font-medium transition ${
                          ativo
                            ? "border-indigo-600 bg-indigo-50 text-indigo-900 dark:bg-indigo-950/40 dark:text-indigo-200"
                            : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300"
                        }`}
                      >
                        {NIVEL_LABEL[nivel]}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={avancar}
            className="mt-10 inline-flex items-center justify-center rounded-full bg-indigo-600 px-8 py-3.5 text-base font-semibold text-white shadow-sm transition hover:bg-indigo-700"
          >
            Ver meu resultado
          </button>
        </div>
      )}
    </main>
  );
}
