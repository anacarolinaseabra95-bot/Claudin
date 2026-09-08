export default function ProgressBar({ atual, total }: { atual: number; total: number }) {
  const pct = Math.round((atual / total) * 100);
  return (
    <div className="w-full">
      <div
        role="progressbar"
        aria-valuenow={atual}
        aria-valuemin={0}
        aria-valuemax={total}
        aria-label={`Pergunta ${atual} de ${total}`}
        className="h-2 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800"
      >
        <div
          className="h-full rounded-full bg-indigo-600 transition-all duration-300"
          style={{ width: `${pct}%` }}
        />
      </div>
      <p className="mt-2 text-xs font-medium text-slate-500 dark:text-slate-400">
        {atual} de {total}
      </p>
    </div>
  );
}
