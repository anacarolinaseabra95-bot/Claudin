import { TEMA_ICONE, TEMA_LABEL } from "@/lib/labels";
import { Tema } from "@/lib/types";

export default function ThemeChips({
  temas,
  ativos,
  onToggle,
}: {
  temas: Tema[];
  ativos: Tema[];
  onToggle: (tema: Tema) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {temas.map((tema) => {
        const ativo = ativos.includes(tema);
        return (
          <button
            key={tema}
            type="button"
            onClick={() => onToggle(tema)}
            aria-pressed={ativo}
            className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${
              ativo
                ? "border-indigo-600 bg-indigo-600 text-white"
                : "border-slate-300 bg-white text-slate-600 hover:border-slate-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
            }`}
          >
            <span aria-hidden="true">{TEMA_ICONE[tema]}</span> {TEMA_LABEL[tema]}
          </button>
        );
      })}
    </div>
  );
}
