# Bússola Eleitoral SP 2026

Ferramenta interativa e independente para ajudar eleitores de São Paulo a comparar candidatos a
**Presidente**, **Governador de SP** e **Deputado (Federal/Estadual por SP)** nas Eleições Gerais de
outubro de 2026, cruzando as prioridades do próprio eleitor com propostas reais e verificáveis.

## Como funciona

1. O usuário escolhe quais cargos quer decidir.
2. Responde ~12 perguntas sobre políticas públicas concretas (nunca sobre candidatos) e indica o quanto
   cada causa (economia, segurança, saúde, educação, meio ambiente, costumes, infraestrutura, direitos
   humanos, proteção animal) pesa para o seu voto.
3. Recebe um ranking de afinidade, um resumo diretivo (seu maior match e por quê) e uma comparação lado a
   lado dos 2-3 finalistas, organizada pelas causas que mais importam para ele.
4. Pode aprofundar qualquer candidato (propostas, prós, contras, fontes) e construir um "placar pessoal"
   marcando o que pesa mais para ele item a item.
5. Pode montar um comparador livre com qualquer combinação de 2 a 4 candidatos da base.

Todas as respostas ficam salvas apenas no `localStorage` do navegador — nada é enviado a um servidor.

## Metodologia e limites (leia antes de publicar)

- **Presidente e Governador de SP**: todos os candidatos com registro confirmado no TSE (13 e 7,
  respectivamente) estão na base. Apenas os que tiveram cobertura documental suficiente na curadoria
  (Lula, Flávio Bolsonaro, Caiado, Zema, Tarcísio de Freitas e Fernando Haddad) têm posição estimada nos
  eixos ideológicos e entram no cálculo de afinidade — os demais aparecem com ficha básica e link direto
  para o TSE, nunca com dados inferidos.
- **Deputados Federal e Estadual por SP**: dado o volume (milhares de candidatos), a base curada **ainda
  não foi populada** nesta primeira versão. A tela correspondente já orienta o usuário a buscar o
  candidato diretamente no TSE, conforme a diretriz de nunca simular dados que não existem. Popular essa
  base (priorizando titulares buscando reeleição, ver seção 2 do prompt mestre) é o próximo passo natural.
- Toda proposta, pró e contra exibidos têm uma fonte com URL. Onde a cobertura foi desigual entre
  candidatos, isso é sinalizado explicitamente via nota editorial em vez de forçar uma falsa paridade.
- **Revalide a lista de candidatos e as propostas contra o TSE (DivulgaCandContas) regularmente** —
  candidaturas podem ser impugnadas, substituídas ou alteradas até a eleição.

## Stack

Next.js (App Router) + TypeScript + Tailwind CSS, mobile-first, 100% client-side (sem backend — o cálculo
de afinidade roda no navegador).

## Rodando localmente

```bash
npm install
npm run dev
```

## Estrutura

- `src/lib/types.ts` — schema de candidato e tipos do questionário/estado do usuário.
- `src/lib/axes.ts`, `src/lib/questoes.ts` — eixos ideológicos e perguntas do questionário.
- `src/lib/matching.ts` — algoritmo de afinidade, ranking de causas e geração do resumo diretivo.
- `src/data/candidatos.ts` — base curada de candidatos.
- `src/lib/store.tsx` — estado do usuário (React Context + localStorage).
- `src/app/*` — telas do fluxo (início, seleção de cargos, questionário, resultado, ficha do candidato,
  comparador livre).
