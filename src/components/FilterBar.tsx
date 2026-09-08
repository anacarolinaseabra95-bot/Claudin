"use client";

import { GENERO_LABEL, ORIENTACAO_LABEL, RACA_COR_LABEL } from "@/lib/labels";
import { Candidato, Genero, OrientacaoSexual, RacaCor } from "@/lib/types";

export interface FiltrosDemograficos {
  genero: Genero[];
  raca_cor: RacaCor[];
  orientacao_sexual: OrientacaoSexual[];
}

export const FILTROS_VAZIOS: FiltrosDemograficos = {
  genero: [],
  raca_cor: [],
  orientacao_sexual: [],
};

export function filtrosAtivos(f: FiltrosDemograficos): boolean {
  return f.genero.length + f.raca_cor.length + f.orientacao_sexual.length > 0;
}

export function passaFiltro(c: Candidato, f: FiltrosDemograficos): boolean {
  if (f.genero.length > 0 && (!c.genero || !f.genero.includes(c.genero))) return false;
  if (f.raca_cor.length > 0 && (!c.raca_cor || !f.raca_cor.includes(c.raca_cor))) return false;
  if (
    f.orientacao_sexual.length > 0 &&
    (!c.orientacao_sexual || !f.orientacao_sexual.includes(c.orientacao_sexual))
  )
    return false;
  return true;
}

export function aplicarFiltros(candidatos: Candidato[], f: FiltrosDemograficos): Candidato[] {
  if (!filtrosAtivos(f)) return candidatos;
  return candidatos.filter((c) => passaFiltro(c, f));
}

function opcoesDisponiveis<T extends string>(candidatos: Candidato[], campo: keyof Candidato): T[] {
  const set = new Set<T>();
  candidatos.forEach((c) => {
    const v = c[campo] as unknown as T | undefined;
    if (v) set.add(v);
  });
  return Array.from(set);
}

export default function FilterBar({
  candidatos,
  filtros,
  onChange,
}: {
  candidatos: Candidato[];
  filtros: FiltrosDemograficos;
  onChange: (novo: FiltrosDemograficos) => void;
}) {
  const generos = opcoesDisponiveis<Genero>(candidatos, "genero");
  const racas = opcoesDisponiveis<RacaCor>(candidatos, "raca_cor");
  const orientacoes = opcoesDisponiveis<OrientacaoSexual>(candidatos, "orientacao_sexual");

  if (generos.length === 0 && racas.length === 0 && orientacoes.length === 0) return null;

  function alternar<K extends keyof FiltrosDemograficos>(campo: K, valor: FiltrosDemograficos[K][number]) {
    const atual = filtros[campo] as FiltrosDemograficos[K][number][];
    const novo = atual.includes(valor) ? atual.filter((v) => v !== valor) : [...atual, valor];
    onChange({ ...filtros, [campo]: novo });
  }

  return (
    <div className="rounded-2xl border border-slate-200 p-4 dark:border-slate-800">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">🔍 Filtrar por</p>
        {filtrosAtivos(filtros) && (
          <button
            type="button"
            onClick={() => onChange(FILTROS_VAZIOS)}
            className="text-xs font-medium text-fuchsia-600 underline underline-offset-2 dark:text-fuchsia-400"
          >
            Limpar filtros
          </button>
        )}
      </div>
      <p className="mt-1 text-[11px] text-slate-400">
        Isso só filtra a exibição — não muda o cálculo de afinidade, que é sempre baseado em propostas.
      </p>

      {generos.length > 0 && (
        <FiltroGrupo
          titulo="Gênero"
          opcoes={generos}
          rotulo={(g) => GENERO_LABEL[g]}
          ativos={filtros.genero}
          onToggle={(v) => alternar("genero", v)}
        />
      )}
      {racas.length > 0 && (
        <FiltroGrupo
          titulo="Raça/cor (autodeclarada ao TSE)"
          opcoes={racas}
          rotulo={(r) => RACA_COR_LABEL[r]}
          ativos={filtros.raca_cor}
          onToggle={(v) => alternar("raca_cor", v)}
        />
      )}
      {orientacoes.length > 0 && (
        <FiltroGrupo
          titulo="Orientação sexual (autodeclarada publicamente)"
          opcoes={orientacoes}
          rotulo={(o) => ORIENTACAO_LABEL[o]}
          ativos={filtros.orientacao_sexual}
          onToggle={(v) => alternar("orientacao_sexual", v)}
        />
      )}
    </div>
  );
}

function FiltroGrupo<T extends string>({
  titulo,
  opcoes,
  rotulo,
  ativos,
  onToggle,
}: {
  titulo: string;
  opcoes: T[];
  rotulo: (v: T) => string;
  ativos: T[];
  onToggle: (v: T) => void;
}) {
  return (
    <div className="mt-3">
      <p className="text-xs font-medium text-slate-500 dark:text-slate-400">{titulo}</p>
      <div className="mt-1.5 flex flex-wrap gap-1.5">
        {opcoes.map((op) => {
          const ativo = ativos.includes(op);
          return (
            <button
              key={op}
              type="button"
              onClick={() => onToggle(op)}
              aria-pressed={ativo}
              className={`rounded-full border px-2.5 py-1 text-xs font-medium transition ${
                ativo
                  ? "border-fuchsia-600 bg-fuchsia-600 text-white"
                  : "border-slate-300 bg-white text-slate-600 hover:border-slate-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
              }`}
            >
              {rotulo(op)}
            </button>
          );
        })}
      </div>
    </div>
  );
}
