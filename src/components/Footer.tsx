export default function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-200 bg-slate-50 px-4 py-8 text-sm text-slate-600 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-400">
      <div className="mx-auto max-w-3xl space-y-3">
        <p>
          <strong className="text-slate-800 dark:text-slate-200">Bússola Eleitoral SP 2026</strong> não é
          afiliada a nenhum candidato, partido ou coligação. É uma ferramenta independente para ajudar
          eleitores a organizar suas próprias prioridades diante das propostas registradas oficialmente.
        </p>
        <p>
          Fontes: TSE (DivulgaCandContas), sites oficiais de campanha, redes sociais oficiais e cobertura
          jornalística (Gazeta do Povo, CNN Brasil, Poder360, Congresso em Foco, Jota, entre outras).
          Última atualização geral da base de candidatos: <strong>08/09/2026</strong>. Candidaturas podem
          ser alteradas por decisão judicial até a eleição — confirme sempre no{" "}
          <a
            href="https://divulgacandcontas.tse.jus.br/"
            target="_blank"
            rel="noreferrer"
            className="underline underline-offset-2 hover:text-slate-900 dark:hover:text-white"
          >
            TSE
          </a>
          .
        </p>
        <p>
          Suas respostas ao questionário ficam salvas apenas neste navegador (localStorage) — nunca são
          enviadas a nenhum servidor. Nada aqui é uma recomendação política deste site: o resultado reflete
          exclusivamente as prioridades que você indicou.
        </p>
        <p>
          Encontrou uma imprecisão em alguma proposta? Avise a equipe responsável por este site pelo canal
          de contato divulgado na página inicial — toda correção é bem-vinda.
        </p>
      </div>
    </footer>
  );
}
