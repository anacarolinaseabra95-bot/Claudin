"use client";

import { PESO_LABEL } from "@/lib/labels";
import { useStore } from "@/lib/store";
import { PesoPessoal } from "@/lib/types";

const OPCOES: PesoPessoal[] = ["pesa_muito", "pesa_pouco", "nao_importa"];

export default function PersonalWeightControl({
  candidatoId,
  itemId,
}: {
  candidatoId: string;
  itemId: string;
}) {
  const { avaliarItem, avaliacaoDoItem } = useStore();
  const atual = avaliacaoDoItem(candidatoId, itemId);

  return (
    <div className="mt-2 flex flex-wrap gap-1.5">
      {OPCOES.map((op) => {
        const ativo = atual === op;
        return (
          <button
            key={op}
            type="button"
            onClick={() => avaliarItem(candidatoId, itemId, op)}
            aria-pressed={ativo}
            className={`rounded-full border px-2.5 py-1 text-[11px] font-medium transition ${
              ativo
                ? "border-slate-900 bg-slate-900 text-white dark:border-white dark:bg-white dark:text-slate-900"
                : "border-slate-200 bg-white text-slate-500 hover:border-slate-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400"
            }`}
          >
            {PESO_LABEL[op]}
          </button>
        );
      })}
    </div>
  );
}
