import Link from "next/link";
import { Candidato } from "@/lib/types";

export default function CandidateCard({
  candidato,
  afinidade,
  destaque = false,
}: {
  candidato: Candidato;
  afinidade?: number;
  destaque?: boolean;
}) {
  return (
    <Link
      href={`/candidato/${candidato.id}`}
      className={`flex items-center gap-4 rounded-2xl border px-4 py-3 transition hover:border-slate-300 dark:hover:border-slate-700 ${
        destaque
          ? "border-indigo-300 bg-indigo-50/60 dark:border-indigo-800 dark:bg-indigo-950/30"
          : "border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900"
      }`}
    >
      <div
        aria-hidden="true"
        className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-slate-200 text-lg font-bold text-slate-600 dark:bg-slate-700 dark:text-slate-200"
      >
        {candidato.nome_urna.charAt(0)}
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate font-semibold text-slate-900 dark:text-white">{candidato.nome_urna}</p>
        <p className="truncate text-xs text-slate-500 dark:text-slate-400">
          {candidato.numero} · {candidato.partido}
        </p>
      </div>
      {afinidade !== undefined && (
        <div className="flex-shrink-0 text-right">
          <p className="text-lg font-bold text-slate-900 dark:text-white">{afinidade}%</p>
          <p className="text-[10px] uppercase tracking-wide text-slate-400">afinidade</p>
        </div>
      )}
    </Link>
  );
}
