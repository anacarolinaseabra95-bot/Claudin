import { Partido } from "@/lib/types";

export default function PartyCard({
  partido,
  afinidade,
  destaque = false,
}: {
  partido: Partido;
  afinidade: number;
  destaque?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border-2 p-4 ${
        destaque
          ? "border-fuchsia-300 bg-fuchsia-50/60 dark:border-fuchsia-800 dark:bg-fuchsia-950/20"
          : "border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900"
      }`}
    >
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="font-bold text-slate-900 dark:text-white">
            {partido.sigla} <span className="font-normal text-slate-400">· nº {partido.numero}</span>
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400">{partido.nome}</p>
        </div>
        <div className="flex-shrink-0 text-right">
          <p className="text-lg font-bold text-slate-900 dark:text-white">{afinidade}%</p>
          <p className="text-[10px] uppercase tracking-wide text-slate-400">afinidade</p>
        </div>
      </div>
      <p className="mt-2 text-sm text-slate-700 dark:text-slate-200">{partido.descricao}</p>
      {partido.forca_sp && (
        <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">📍 {partido.forca_sp}</p>
      )}
    </div>
  );
}
