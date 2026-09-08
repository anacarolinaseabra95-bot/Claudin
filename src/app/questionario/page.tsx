"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import ProgressBar from "@/components/ProgressBar";
import { QUESTOES } from "@/lib/questoes";
import { useStore } from "@/lib/store";
import { RespostaEscala, TEMA_PARA_EIXOS } from "@/lib/types";

export default function QuestionarioPage() {
  const router = useRouter();
  const { estado, responder, concluirQuestionario, hidratado } = useStore();
  const [passo, setPasso] = useState(0);

  const eixosAPerguntar = useMemo(() => {
    const conjunto = new Set<string>();
    estado.temasEscolhidos.forEach((tema) => {
      (TEMA_PARA_EIXOS[tema] ?? []).forEach((eixo) => conjunto.add(eixo));
    });
    return conjunto;
  }, [estado.temasEscolhidos]);

  const perguntas = useMemo(
    () => QUESTOES.filter((q) => eixosAPerguntar.has(q.eixo)),
    [eixosAPerguntar]
  );

  useEffect(() => {
    if (!hidratado) return;
    if (estado.temasEscolhidos.length === 0) router.replace("/temas");
  }, [hidratado, estado.temasEscolhidos.length, router]);

  const questaoAtual = perguntas[passo];

  function avancar() {
    if (passo < perguntas.length - 1) {
      setPasso(passo + 1);
    } else {
      concluirQuestionario();
      router.push("/resultado");
    }
  }

  function voltar() {
    if (passo > 0) setPasso(passo - 1);
    else router.push("/temas");
  }

  if (!hidratado || !questaoAtual) {
    return (
      <main className="mx-auto flex w-full max-w-md flex-1 items-center justify-center px-6 py-16">
        <p className="text-sm text-slate-500">Preparando suas perguntas… ✨</p>
      </main>
    );
  }

  const respostaAtual = estado.respostas[questaoAtual.id];

  function escolher(valor: RespostaEscala) {
    responder(questaoAtual.id, valor);
    avancar();
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
        <ProgressBar atual={passo + 1} total={perguntas.length} />
      </div>

      <div className="mt-8 flex flex-1 flex-col">
        <h1 className="text-xl font-bold leading-snug text-slate-900 dark:text-white">
          {questaoAtual.pergunta}
        </h1>
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
          Escolha a opção que mais combina com você.
        </p>

        <div className="mt-6 flex flex-col gap-3">
          <OpcaoCard
            emoji={questaoAtual.opcaoA.emoji}
            texto={questaoAtual.opcaoA.texto}
            ativo={respostaAtual === -2}
            onClick={() => escolher(-2)}
          />
          <OpcaoCard
            emoji={questaoAtual.opcaoB.emoji}
            texto={questaoAtual.opcaoB.texto}
            ativo={respostaAtual === 2}
            onClick={() => escolher(2)}
          />

          <button
            type="button"
            onClick={() => escolher(0)}
            className={`rounded-2xl border-2 border-dashed px-4 py-3 text-center text-sm font-semibold transition ${
              respostaAtual === 0
                ? "border-fuchsia-400 bg-fuchsia-50 text-fuchsia-700 dark:bg-fuchsia-950/30 dark:text-fuchsia-300"
                : "border-slate-200 text-slate-500 hover:border-slate-300 dark:border-slate-700 dark:text-slate-400"
            }`}
          >
            🤷 Os dois, mais ou menos
          </button>
        </div>

        <button
          type="button"
          onClick={() => escolher(null)}
          className="mt-6 text-sm font-medium text-slate-400 underline underline-offset-2 hover:text-slate-600 dark:hover:text-slate-300"
        >
          Não sei / tanto faz
        </button>
      </div>
    </main>
  );
}

function OpcaoCard({
  emoji,
  texto,
  ativo,
  onClick,
}: {
  emoji: string;
  texto: string;
  ativo: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-start gap-3 rounded-2xl border-2 px-4 py-4 text-left transition ${
        ativo
          ? "border-fuchsia-500 bg-fuchsia-50 shadow-sm dark:bg-fuchsia-950/30"
          : "border-slate-200 bg-white hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900"
      }`}
    >
      <span className="text-2xl leading-none" aria-hidden="true">
        {emoji}
      </span>
      <span className="text-sm font-medium text-slate-800 dark:text-slate-100">{texto}</span>
    </button>
  );
}
