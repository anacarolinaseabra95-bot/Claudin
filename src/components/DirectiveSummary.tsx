import Link from "next/link";
import { TEMA_LABEL } from "@/lib/labels";
import { ResumoDiretivo } from "@/lib/matching";

export default function DirectiveSummary({ resumo }: { resumo: ResumoDiretivo }) {
  const { candidatoPrincipal, candidatoSecundario, temaForte, temaAtencao, diferencaPontos } = resumo;

  return (
    <div className="rounded-2xl border-2 border-fuchsia-200 bg-fuchsia-50/60 p-5 dark:border-fuchsia-900 dark:bg-fuchsia-950/30">
      <p className="text-sm leading-relaxed text-slate-800 dark:text-slate-100">
        🎉 Seu maior match é{" "}
        <Link href={`/candidato/${candidatoPrincipal.candidato.id}`} className="font-bold underline underline-offset-2">
          {candidatoPrincipal.candidato.nome_urna}
        </Link>{" "}
        ({candidatoPrincipal.afinidadeGeral}% de afinidade)
        {temaForte && (
          <>
            {" "}
            — alinhamento forte em <strong>{TEMA_LABEL[temaForte]}</strong>
          </>
        )}
        {temaAtencao && (
          <>
            , mas atenção: ele(a) diverge de você em <strong>{TEMA_LABEL[temaAtencao]}</strong>
          </>
        )}
        .
      </p>
      {candidatoSecundario && (
        <p className="mt-3 text-sm leading-relaxed text-slate-700 dark:text-slate-200">
          Logo atrás vem{" "}
          <Link href={`/candidato/${candidatoSecundario.candidato.id}`} className="font-semibold underline underline-offset-2">
            {candidatoSecundario.candidato.nome_urna}
          </Link>{" "}
          ({candidatoSecundario.afinidadeGeral}%
          {diferencaPontos !== undefined && diferencaPontos <= 8 ? ", praticamente empatado" : ""}).
          Vale comparar os dois lado a lado antes de decidir.
        </p>
      )}
      <p className="mt-4 text-xs text-slate-500 dark:text-slate-400">
        Este resultado reflete as prioridades que você indicou no questionário — não é uma recomendação
        política deste site.
      </p>
    </div>
  );
}
