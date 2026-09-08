import Link from "next/link";
import { Candidato } from "@/lib/types";

const MEDALHA = ["🥇", "🥈", "🥉"];

export default function CandidateCard({
  candidato,
  afinidade,
  destaque = false,
  posicao,
}: {
  candidato: Candidato;
  afinidade?: number;
  destaque?: boolean;
  /** posição no ranking (1-indexed) — mostra medalha se for top 3 */
  posicao?: number;
}) {
  const medalha = posicao && posicao <= 3 ? MEDALHA[posicao - 1] : null;

  return (
    <Link
      href={`/candidato/${candidato.id}`}
      className={`flex items-center gap-4 rounded-2xl border-2 px-4 py-3 transition hover:border-slate-300 dark:hover:border-slate-700 ${
        destaque
          ? "border-fuchsia-300 bg-fuchsia-50/60 dark:border-fuchsia-800 dark:bg-fuchsia-950/30"
          : "border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900"
      }`}
    >
      <div
        aria-hidden="true"
        className="relative flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-fuchsia-200 to-violet-200 text-lg font-bold text-fuchsia-800 dark:from-fuchsia-800 dark:to-violet-800 dark:text-fuchsia-100"
      >
        {candidato.nome_urna.charAt(0)}
        {medalha && <span className="absolute -right-1 -top-1 text-base">{medalha}</span>}
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
