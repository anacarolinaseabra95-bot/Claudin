# Bússola Eleitoral SP 2026

Ferramenta interativa e independente para ajudar eleitores de São Paulo a comparar candidatos a
**Presidente**, **Governador de SP** e **Deputado (Federal/Estadual por SP)** nas Eleições Gerais de
outubro de 2026, cruzando as prioridades do próprio eleitor com propostas reais e verificáveis.

## Como funciona

1. O usuário escolhe quais cargos quer decidir.
2. Escolhe, em linguagem simples e com emoji, quais causas mais te interessam (isso decide a ORDEM e o
   peso das causas no resultado — não corta perguntas).
3. Responde 20 perguntas do dia a dia sobre políticas públicas concretas (nunca sobre candidatos ou com
   jargão técnico), sempre completas, cobrindo 5 eixos: economia, segurança, direitos/costumes, meio
   ambiente e honestidade na política.
4. Recebe um ranking de afinidade, um resumo diretivo (seu maior match e por quê) e uma comparação lado a
   lado dos 2-3 finalistas, organizada pelas causas que mais importam para ele. Pode filtrar a exibição do
   ranking por gênero/raça-cor/orientação sexual autodeclarados — isso nunca entra no cálculo de afinidade.
5. Pode aprofundar qualquer candidato (propostas, prós, contras, fontes) e construir um "placar pessoal"
   marcando o que pesa mais para ele item a item.
6. Pra Deputado, além dos candidatos individuais curados, sempre mostra também os partidos mais alinhados
   (o voto é proporcional no Brasil — votar em alguém de um partido ajuda a eleger outros do mesmo partido).
7. Pode montar um comparador livre com qualquer combinação de 2 a 4 candidatos da base.

Todas as respostas ficam salvas apenas no `localStorage` do navegador — nada é enviado a um servidor.

## Metodologia e limites (leia antes de publicar)

- **Presidente e Governador de SP**: todos os candidatos com registro confirmado no TSE (13 e 7,
  respectivamente) estão na base. Os 6 com cobertura mais aprofundada (Lula, Flávio Bolsonaro, Caiado,
  Zema, Tarcísio de Freitas e Fernando Haddad) têm propostas + prós + contras individualmente sourced
  (`status_dados: "completo"`). Os demais aparecem com ficha básica e link direto para o TSE.
- **Deputados Federal e Estadual por SP**: base inicial curada com ~20 nomes reais (10 federais + 10
  estaduais), priorizando titulares buscando reeleição e nomes de relevância pública mensurável, cobrindo
  o espectro político (`status_dados: "parcial"` — propostas reais e sourced, mas cobertura mais leve que
  os 6 principais de Presidente/Governador). Como são milhares de candidatos no total, a base **não é
  exaustiva** — por isso o resultado sempre complementa com os partidos mais alinhados.
- Toda proposta, pró e contra exibidos têm uma fonte com URL real — nunca inferimos posição sem fonte.
  Onde a cobertura foi desigual entre candidatos, isso é sinalizado via nota editorial em vez de forçar uma
  falsa paridade.
- Campos demográficos (gênero, raça/cor autodeclarada ao TSE, orientação sexual) são opcionais, só
  preenchidos quando publicamente documentados, e usados **apenas como filtro de exibição** — nunca entram
  no cálculo de afinidade, que é 100% baseado em posições sobre políticas públicas.
- **Revalide a lista de candidatos e as propostas contra o TSE (DivulgaCandContas) regularmente** —
  candidaturas podem ser impugnadas, substituídas ou alteradas até a eleição. Vários números de urna de
  Deputado estão marcados "a confirmar" — confirme antes de votar.

## Stack

Next.js (App Router) + TypeScript + Tailwind CSS, mobile-first, 100% client-side (sem backend — o cálculo
de afinidade roda no navegador).

## Rodando localmente

```bash
npm install
npm run dev
```

## Estrutura

- `src/lib/types.ts` — schema de candidato/partido e tipos do questionário/estado do usuário.
- `src/lib/axes.ts`, `src/lib/questoes.ts` — eixos ideológicos e as 20 perguntas do questionário.
- `src/lib/matching.ts` — algoritmo de afinidade (candidatos e partidos), ranking de causas e geração do
  resumo diretivo.
- `src/data/candidatos.ts`, `src/data/partidos.ts` — bases curadas.
- `src/lib/store.tsx` — estado do usuário (React Context + localStorage).
- `src/components/FilterBar.tsx` — filtros de exibição por gênero/raça-cor/orientação sexual.
- `src/app/*` — telas do fluxo (início, cargos, temas, questionário, resultado, ficha do candidato,
  comparador livre).
