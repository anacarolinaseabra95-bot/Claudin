"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { CARGO_LABEL } from "@/lib/labels";
import { useStore } from "@/lib/store";
import { Cargo } from "@/lib/types";

const OPCOES: { cargo: Cargo; emoji: string; descricao: string }[] = [
  { cargo: "presidente", emoji: "🇧🇷", descricao: "13 candidaturas registradas no TSE" },
  { cargo: "governador", emoji: "🏙️", descricao: "7 candidaturas para o governo de SP" },
  {
    cargo: "deputado_federal",
    emoji: "🏛️",
    descricao: "Ainda não temos todos os nomes — mas te ajudamos a achar o partido certo pra você",
  },
  {
    cargo: "deputado_estadual",
    emoji: "🏢",
    descricao: "Ainda não temos todos os nomes — mas te ajudamos a achar o partido certo pra você",
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
    router.push("/temas");
  }

  return (
    <main className="mx-auto flex w-full max-w-md flex-1 flex-col px-6 py-12">
      <p className="text-4xl" aria-hidden="true">
        🗳️
      </p>
      <h1 className="mt-3 text-2xl font-bold text-slate-900 dark:text-white">
        Quais eleições você quer decidir agora?
      </h1>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
        Pode escolher mais de uma — as mesmas respostas valem pra todas. 👇
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
              className={`flex items-start gap-3 rounded-2xl border-2 px-5 py-4 text-left transition ${
                ativo
                  ? "border-fuchsia-500 bg-fuchsia-50 shadow-sm dark:bg-fuchsia-950/30"
                  : "border-slate-200 bg-white hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900"
              }`}
            >
              <span className="text-2xl" aria-hidden="true">
                {op.emoji}
              </span>
              <span className="flex-1">
                <span className="block font-bold text-slate-900 dark:text-white">
                  {CARGO_LABEL[op.cargo]}
                </span>
                <span className="mt-0.5 block text-xs text-slate-500 dark:text-slate-400">
                  {op.descricao}
                </span>
              </span>
              <span
                aria-hidden="true"
                className={`mt-1 h-5 w-5 flex-shrink-0 rounded-full border-2 ${
                  ativo ? "border-fuchsia-500 bg-fuchsia-500" : "border-slate-300 dark:border-slate-600"
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
        className="mt-10 inline-flex items-center justify-center rounded-full bg-fuchsia-600 px-8 py-3.5 text-base font-semibold text-white shadow-sm transition hover:bg-fuchsia-700 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500 dark:disabled:bg-slate-800 dark:disabled:text-slate-500"
      >
        Continuar 🚀
      </button>
    </main>
  );
}
