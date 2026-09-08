import { Questao } from "./types";

/**
 * Perguntas sobre políticas concretas, nunca sobre candidatos ou partidos
 * (diretriz da seção 7 do prompt mestre). Cada uma mede um eixo ideológico
 * específico (lib/axes.ts) e é respondida numa escala de -2 a +2, com opção
 * de "não tenho opinião formada".
 */
export const QUESTOES: Questao[] = [
  {
    id: "q_econ_1",
    eixo: "economia",
    direcaoMax: true,
    texto:
      "O governo deve aumentar investimentos públicos e programas sociais mesmo que isso exija mais impostos ou mais gastos do Estado.",
    poloMin: "Discordo totalmente",
    poloMax: "Concordo totalmente",
  },
  {
    id: "q_econ_2",
    eixo: "economia",
    direcaoMax: false,
    texto:
      "O Estado deve reduzir seu tamanho — cortar ministérios, privatizar estatais e diminuir a carga tributária — mesmo que isso signifique menos serviços públicos diretos.",
    poloMin: "Discordo totalmente",
    poloMax: "Concordo totalmente",
  },
  {
    id: "q_seg_1",
    eixo: "seguranca",
    direcaoMax: true,
    texto:
      "O Estado deve ampliar o efetivo policial e endurecer penas (incluindo redução da maioridade penal) para combater o crime organizado, mesmo que isso aumente o orçamento de segurança e a população carcerária.",
    poloMin: "Discordo totalmente",
    poloMax: "Concordo totalmente",
  },
  {
    id: "q_seg_2",
    eixo: "seguranca",
    direcaoMax: false,
    texto:
      "Reduzir a criminalidade a longo prazo depende mais de investir em prevenção social (educação, emprego, urbanização de periferias) do que em mais policiamento e penas mais duras.",
    poloMin: "Discordo totalmente",
    poloMax: "Concordo totalmente",
  },
  {
    id: "q_cost_1",
    eixo: "costumes",
    direcaoMax: false,
    texto:
      "O Estado deve ampliar políticas de proteção e representação para grupos minorizados (mulheres, população negra, LGBTQIA+), mesmo quando isso gera controvérsia com setores mais tradicionais.",
    poloMin: "Discordo totalmente",
    poloMax: "Concordo totalmente",
  },
  {
    id: "q_cost_2",
    eixo: "costumes",
    direcaoMax: true,
    texto:
      "A educação pública deve priorizar valores tradicionais de família e deixar temas de gênero e sexualidade fora da sala de aula, cabendo isso às famílias.",
    poloMin: "Discordo totalmente",
    poloMax: "Concordo totalmente",
  },
  {
    id: "q_amb_1",
    eixo: "meio_ambiente",
    direcaoMax: true,
    texto:
      "A fiscalização e a regulação ambiental devem ser mais rígidas, mesmo quando isso atrasa ou encarece obras de infraestrutura e a expansão do agronegócio.",
    poloMin: "Discordo totalmente",
    poloMax: "Concordo totalmente",
  },
  {
    id: "q_amb_2",
    eixo: "meio_ambiente",
    direcaoMax: false,
    texto:
      "Regras ambientais devem ser simplificadas para não travar projetos de infraestrutura, energia e agronegócio que geram emprego e renda.",
    poloMin: "Discordo totalmente",
    poloMax: "Concordo totalmente",
  },
  {
    id: "q_inst_1",
    eixo: "instituicoes",
    direcaoMax: true,
    texto:
      "As regras do jogo político precisam de mudanças profundas — como fim da reeleição, novo sistema eleitoral ou limites aos poderes do STF — para destravar o país.",
    poloMin: "Discordo totalmente",
    poloMax: "Concordo totalmente",
  },
  {
    id: "q_inst_2",
    eixo: "instituicoes",
    direcaoMax: false,
    texto:
      "O sistema institucional atual (Judiciário, regras eleitorais, mecanismos de freios e contrapesos) deve ser preservado como está, evitando mudanças bruscas nas regras do jogo.",
    poloMin: "Discordo totalmente",
    poloMax: "Concordo totalmente",
  },
  {
    id: "q_econ_3",
    eixo: "economia",
    direcaoMax: true,
    texto:
      "Regras trabalhistas (como jornada de trabalho e direitos da CLT) devem ser fortalecidas, mesmo que isso aumente custos para empresas.",
    poloMin: "Discordo totalmente",
    poloMax: "Concordo totalmente",
  },
  {
    id: "q_seg_3",
    eixo: "seguranca",
    direcaoMax: true,
    texto:
      "Facções criminosas e milícias devem ser tratadas como organizações terroristas, justificando um aparato de combate mais duro e recursos extraordinários do Estado.",
    poloMin: "Discordo totalmente",
    poloMax: "Concordo totalmente",
  },
];
