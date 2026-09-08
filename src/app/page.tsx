import Link from "next/link";

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center px-6 py-16 text-center">
      <div className="mb-6 text-6xl" aria-hidden="true">
        🧭✨
      </div>
      <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
        Bússola Eleitoral SP 2026
      </h1>
      <p className="mt-4 text-base text-slate-600 dark:text-slate-300">
        Não curte política, mas quer votar bem? 🙋 Responda perguntinhas simples do dia a dia e a gente te
        mostra quem combina mais com você — pra Presidente, Governador de SP e Deputado por SP.
      </p>
      <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
        ⏱️ Leva uns 3 minutinhos. 🔒 Suas respostas ficam só no seu celular.
      </p>
      <Link
        href="/cargos"
        className="mt-10 inline-flex items-center justify-center gap-2 rounded-full bg-fuchsia-600 px-8 py-3.5 text-base font-semibold text-white shadow-sm transition hover:bg-fuchsia-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fuchsia-600"
      >
        Vamos lá 🚀
      </Link>
      <p className="mt-6 text-xs text-slate-400 dark:text-slate-500">
        🕊️ Ferramenta independente, não afiliada a nenhum candidato ou partido.
      </p>
    </main>
  );
}
