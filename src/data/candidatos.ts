import { Candidato } from "@/lib/types";

/**
 * Base curada de candidatos — Eleições Gerais 2026.
 *
 * IMPORTANTE (transparência obrigatória, ver seção 4 do prompt mestre):
 * - Apenas candidatos com `status_dados: "completo"` têm posição estimada nos
 *   eixos ideológicos (posicao_eixos) e entram no cálculo de afinidade.
 * - Candidatos com `status_dados: "somente_ficha"` ou "parcial" têm cobertura
 *   jornalística/documental insuficiente no momento da curadoria para permitir
 *   uma classificação responsável por eixo — nunca inferimos essas posições.
 *   Eles aparecem na lista completa, com ficha básica e link direto para o
 *   TSE, mas fora do ranking de afinidade.
 * - Todos os dados devem ser revalidados periodicamente contra o TSE
 *   (DivulgaCandContas), pois candidaturas podem ser impugnadas ou alteradas.
 *
 * Última verificação geral: 2026-09-08.
 */

const TSE_PORTAL = "https://divulgacandcontas.tse.jus.br/";
const HOJE = "2026-09-08";

export const CANDIDATOS: Candidato[] = [
  // ==================== PRESIDENTE ====================
  {
    id: "pres-lula",
    nome_urna: "Lula",
    nome_completo: "Luiz Inácio Lula da Silva",
    cargo: "presidente",
    numero: "13",
    partido: "PT",
    coligacao: ["PSB"],
    vice_ou_suplente: "Geraldo Alckmin (PSB)",
    foto_url: null,
    biografia_curta:
      "Presidente da República buscando a reeleição. Já exerceu a presidência em três mandatos anteriores (2003-2010, 2023-2026). Ex-metalúrgico e sindicalista.",
    cargos_anteriores: ["Presidente da República (2003-2010, 2023-2026)"],
    buscando_reeleicao: true,
    status_dados: "completo",
    posicao_eixos: { economia: 2, seguranca: -1, costumes: -2, meio_ambiente: 1, instituicoes: -2 },
    propostas: [
      {
        id: "lula-p1",
        tema: "economia",
        resumo: "Mantém valorização do salário mínimo acima da inflação e amplia proteção social.",
        detalhe:
          "O plano de governo, registrado no TSE, prevê a continuidade da política de valorização do salário mínimo acima da inflação e a expansão de programas sociais em curso.",
        fonte: { tipo: "tse", url: "https://divulgacandcontas.tse.jus.br/divulga/rest/arquivo/doc/120016993257", data_captura: HOJE },
      },
      {
        id: "lula-p2",
        tema: "economia",
        resumo: "Propõe reduzir a jornada de trabalho para 40h semanais e acabar com a escala 6x1.",
        detalhe:
          "O governo segue atuando no Congresso pela aprovação do fim da escala 6x1 e pela redução da jornada semanal para 40 horas sem redução salarial.",
        fonte: { tipo: "imprensa", url: "https://www.congressoemfoco.com.br/noticia/121121/pt-registra-novo-plano-de-governo-de-lula-no-tse-veja-a-integra", data_captura: HOJE },
      },
      {
        id: "lula-p3",
        tema: "seguranca",
        resumo: "Propõe a criação de um Ministério da Segurança Pública com atuação federal ampliada.",
        detalhe:
          "O plano lista a criação de um Ministério da Segurança Pública entre as 13 diretrizes do programa, ao lado de propostas de saúde, educação e política externa.",
        fonte: { tipo: "imprensa", url: "https://www.congressoemfoco.com.br/noticia/121121/pt-registra-novo-plano-de-governo-de-lula-no-tse-veja-a-integra", data_captura: HOJE },
      },
    ],
    pros: [
      { id: "lula-pro1", texto: "Mantém como prioridade a valorização do salário mínimo acima da inflação.", fonte: "https://www.congressoemfoco.com.br/noticia/121121/pt-registra-novo-plano-de-governo-de-lula-no-tse-veja-a-integra" },
      { id: "lula-pro2", texto: "Propõe redução da jornada de trabalho para 40h semanais sem redução salarial e fim da escala 6x1.", fonte: "https://www.congressoemfoco.com.br/noticia/121121/pt-registra-novo-plano-de-governo-de-lula-no-tse-veja-a-integra" },
    ],
    contras: [
      { id: "lula-con1", texto: "O plano de governo não apresenta meta de resultado fiscal, âncora fiscal ou regra de ouro para 2027-2030, segundo análise da imprensa econômica.", fonte: "https://www.gazetadopovo.com.br/eleicoes/2026/plano-de-governo-lula-economia/" },
      { id: "lula-con2", texto: "A dívida bruta do governo atingiu 82,5% do PIB em julho de 2026 (alta de 10,8 p.p. desde 2023), com déficit nominal acumulado de R$ 1,3 tri em 12 meses.", fonte: "https://tmc.com.br/politica/planos-de-lula-e-flavio-deixam-lacunas-sobre-o-ajuste-fiscal/" },
    ],
    historico_votos: [],
    redes_sociais: { instagram: "https://www.instagram.com/lulaoficial/", site_oficial: undefined, tse_ficha: TSE_PORTAL },
    ultima_verificacao: HOJE,
  },
  {
    id: "pres-flavio",
    nome_urna: "Flávio Bolsonaro",
    nome_completo: "Flávio Nantes Bolsonaro",
    cargo: "presidente",
    numero: "22",
    partido: "PL",
    coligacao: [],
    vice_ou_suplente: "Alfredo Gaspar (PL)",
    foto_url: null,
    biografia_curta:
      "Senador pelo Rio de Janeiro, filho do ex-presidente Jair Bolsonaro, escolhido para representar o campo bolsonarista na eleição de 2026.",
    cargos_anteriores: ["Senador (RJ)", "Deputado Estadual (RJ)", "Vereador (RJ)"],
    status_dados: "completo",
    posicao_eixos: { economia: -1, seguranca: 2, costumes: 2, instituicoes: 2 },
    propostas: [
      {
        id: "flavio-p1",
        tema: "seguranca",
        resumo: "Propõe classificar facções e milícias como organizações \"narcoterroristas\" e reduzir a maioridade penal para 16 anos.",
        detalhe:
          "O plano \"Para o Brasil Vencer o Atraso\" tem a segurança pública como primeiro eixo: classificação de PCC, Comando Vermelho e milícias como narcoterroristas, criação de 5 presídios federais de segurança máxima e redução da maioridade penal de 18 para 16 anos.",
        fonte: { tipo: "imprensa", url: "https://www.gazetadopovo.com.br/eleicoes/2026/propostas-flavio-bolsonaro-plano-de-governo-seguranca-publica/", data_captura: HOJE },
      },
      {
        id: "flavio-p2",
        tema: "economia",
        resumo: "Propõe corte de ao menos 10 ministérios e uso de IA para monitorar gastos públicos.",
        detalhe:
          "O plano prevê reforma administrativa com corte de pelo menos dez ministérios, redução de cargos comissionados e uso de inteligência artificial para monitorar despesas do governo.",
        fonte: { tipo: "imprensa", url: "https://www.gazetadopovo.com.br/eleicoes/2026/plano-de-governo-flavio-bolsonaro-economia/", data_captura: HOJE },
      },
      {
        id: "flavio-p3",
        tema: "gestao_publica",
        resumo: "Propõe o fim da reeleição presidencial e uma reforma do Judiciário.",
        detalhe:
          "Entre os nove eixos do plano estão mudanças no funcionamento dos Poderes, incluindo o fim da reeleição presidencial e uma reforma do Judiciário.",
        fonte: { tipo: "imprensa", url: "https://www.portaltela.com/politica/2026/08/14/plano-de-governo-de-flavio-bolsonaro-tem-9-eixos-veja-propostas/", data_captura: HOJE },
      },
    ],
    pros: [
      { id: "flavio-pro1", texto: "Plano de governo detalha 9 eixos temáticos, incluindo digitalização de serviços públicos e geração de empregos.", fonte: "https://www.portaltela.com/politica/2026/08/14/plano-de-governo-de-flavio-bolsonaro-tem-9-eixos-veja-propostas/" },
      { id: "flavio-pro2", texto: "Propõe usar inteligência artificial para monitorar e cortar despesas governamentais.", fonte: "https://www.otempo.com.br/eleicoes/2026/presidentes/2026/8/11/plano-de-governo-de-flavio-bolsonaro-priorizara-seguranca-publica-e-poder-de-compra-da-populacao" },
    ],
    contras: [
      { id: "flavio-con1", texto: "A redução da maioridade penal de 18 para 16 anos é criticada por criminólogos quanto à eficácia e por juristas quanto ao enfraquecimento de garantias processuais.", fonte: "https://fatonews.com.br/2026/09/06/eleicoes-2026-o-que-flavio-bolsonaro-lula-e-caiado-prometem-para-o-dia-a-dia-dos-brasileiros-e-o-que-dificilmente-saira-do-papel/" },
      { id: "flavio-con2", texto: "Propostas que dependem de PEC, como o fim da reeleição presidencial, enfrentam baixa viabilidade em um Congresso fragmentado, que exige 3/5 dos votos em dois turnos em ambas as Casas.", fonte: "https://fatonews.com.br/2026/09/06/eleicoes-2026-o-que-flavio-bolsonaro-lula-e-caiado-prometem-para-o-dia-a-dia-dos-brasileiros-e-o-que-dificilmente-saira-do-papel/" },
    ],
    historico_votos: [],
    redes_sociais: { instagram: "https://www.instagram.com/flaviobolsonaro/", site_oficial: undefined, tse_ficha: TSE_PORTAL },
    ultima_verificacao: HOJE,
  },
  {
    id: "pres-caiado",
    nome_urna: "Ronaldo Caiado",
    nome_completo: "Ronaldo Caiado",
    cargo: "presidente",
    numero: "55",
    partido: "PSD",
    coligacao: [],
    vice_ou_suplente: "Gilberto Kassab (PSD)",
    foto_url: null,
    biografia_curta:
      "Ex-governador de Goiás, médico e ex-senador. Concorre como opção de \"terceira via\" entre os polos de Lula e Flávio Bolsonaro.",
    cargos_anteriores: ["Governador de Goiás", "Senador (GO)", "Deputado Federal (GO)"],
    status_dados: "completo",
    posicao_eixos: { economia: -1, seguranca: 2, meio_ambiente: -1, instituicoes: 2 },
    propostas: [
      {
        id: "caiado-p1",
        tema: "gestao_publica",
        resumo: "Propõe o fim da reeleição para cargos do Executivo e a adoção do sistema distrital misto.",
        detalhe:
          "Caiado promete enviar PEC pelo fim da reeleição no início do mandato e defende a adoção do sistema distrital misto para eleições legislativas.",
        fonte: { tipo: "imprensa", url: "https://www.poder360.com.br/poder-eleicoes-2026/ronaldo-caiado-propoe-fim-da-reeleicao-e-combate-a-terrorismo-domestico/", data_captura: HOJE },
      },
      {
        id: "caiado-p2",
        tema: "economia",
        resumo: "Propõe ajuste fiscal sem aumento de impostos, revisando subsídios e benefícios tributários.",
        detalhe:
          "O plano defende conter o crescimento das despesas obrigatórias e abrir espaço para reduzir juros e elevar investimentos, sem elevar a carga tributária.",
        fonte: { tipo: "imprensa", url: "https://www.gazetadopovo.com.br/eleicoes/2026/plano-de-governo-caiado-economia/", data_captura: HOJE },
      },
      {
        id: "caiado-p3",
        tema: "seguranca",
        resumo: "Defende penas mais duras e o combate ao que chama de \"terrorismo doméstico\" das facções.",
        detalhe: "O plano concentra propostas em fortalecimento da segurança pública e endurecimento penal.",
        fonte: { tipo: "imprensa", url: "https://www.congressoemfoco.com.br/noticia/121321/plano-de-caiado-mira-faccoes-ajuste-fiscal-e-fim-da-reeleicao", data_captura: HOJE },
      },
    ],
    pros: [
      { id: "caiado-pro1", texto: "Plano de governo reúne propostas para 26 áreas, elaborado em conjunto com o vice Gilberto Kassab.", fonte: "https://www.poder360.com.br/poder-eleicoes-2026/leia-a-integra-do-plano-de-governo-de-ronaldo-caiado/" },
      { id: "caiado-pro2", texto: "Propõe ajuste fiscal sem aumento de impostos, via revisão de subsídios e benefícios tributários.", fonte: "https://www.gazetadopovo.com.br/eleicoes/2026/plano-de-governo-caiado-economia/" },
    ],
    contras: [
      { id: "caiado-con1", texto: "Aparecia com cerca de 5% das intenções de voto nas pesquisas (ante 39% de Lula e 35% de Flávio Bolsonaro) e tem baixo reconhecimento fora de Goiás e do Centro-Oeste.", fonte: "https://www.metropoles.com/sao-paulo/caiado-3a-via-eleicao-rejeitados" },
    ],
    nota_editorial:
      "A cobertura jornalística sobre Caiado concentrou-se mais em sua viabilidade eleitoral do que em críticas técnicas ao plano de governo, resultando em menos contras documentados do que para os dois primeiros colocados nas pesquisas.",
    historico_votos: [],
    redes_sociais: { instagram: "https://www.instagram.com/ronaldocaiado/", site_oficial: undefined, tse_ficha: TSE_PORTAL },
    ultima_verificacao: HOJE,
  },
  {
    id: "pres-zema",
    nome_urna: "Romeu Zema",
    nome_completo: "Romeu Zema Neto",
    cargo: "presidente",
    numero: "30",
    partido: "Novo",
    coligacao: [],
    vice_ou_suplente: "Eduardo Girão (Novo)",
    foto_url: null,
    biografia_curta: "Governador de Minas Gerais e empresário, representa a agenda liberal-econômica do partido Novo.",
    cargos_anteriores: ["Governador de Minas Gerais"],
    status_dados: "completo",
    posicao_eixos: { economia: -2, seguranca: 1, instituicoes: 2 },
    propostas: [
      {
        id: "zema-p1",
        tema: "economia",
        resumo: "Propõe privatizar todas as estatais brasileiras e a saída do Brics.",
        detalhe:
          "O \"Plano Implacável\" defende um choque fiscal com privatização de todas as empresas estatais, nova reforma da Previdência (incluindo regimes rural e militar) e a saída do Brasil do Brics.",
        fonte: { tipo: "imprensa", url: "https://www.gazetadopovo.com.br/eleicoes/2026/plano-economico-zema-zerar-custo-brasil-privatizacao-total-do-estado/", data_captura: HOJE },
      },
      {
        id: "zema-p2",
        tema: "economia",
        resumo: "Propõe o programa \"Sócios do Brasil\": R$ 1 mil a cada criança ao nascer, aplicado em fundos de ações.",
        detalhe: "Cada brasileiro receberia R$ 1.000 ao nascer, valor aplicado em fundos de ações e disponível para saque aos 18 anos.",
        fonte: { tipo: "imprensa", url: "https://www.band.com.br/noticias/zema-propoe-saida-dos-brics-privatizacoes-e-r-1-mil-para-cada-brasileiro-ao-nascer-202608071748", data_captura: HOJE },
      },
      {
        id: "zema-p3",
        tema: "seguranca",
        resumo: "Propõe fixar a maioridade penal em 16 anos, com responsabilização ainda mais precoce em crimes hediondos.",
        detalhe: "O plano prevê fixar a maioridade penal em 16 anos e prever responsabilização criminal de infratores mais jovens em casos de crimes hediondos ou de extrema violência.",
        fonte: { tipo: "imprensa", url: "https://www.gazetadopovo.com.br/eleicoes/2026/plano-governo-zema-seguranca-publica/", data_captura: HOJE },
      },
      {
        id: "zema-p4",
        tema: "gestao_publica",
        resumo: "Propõe limitar a atuação do STF e criar corregedoria independente para investigar ministros.",
        detalhe: "O plano critica o funcionamento do STF e propõe mecanismos para obrigar o Senado a analisar pedidos de impeachment de ministros.",
        fonte: { tipo: "imprensa", url: "https://www.congressoemfoco.com.br/noticia/121274/plano-de-zema-preve-choque-fiscal--limitacao-ao-stf-e-saida-do-brics", data_captura: HOJE },
      },
    ],
    pros: [
      { id: "zema-pro1", texto: "Plano \"Implacável\" detalha 20 temas com propostas concretas, incluindo o programa \"Sócios do Brasil\".", fonte: "https://www.gazetadopovo.com.br/eleicoes/2026/plano-economico-zema-zerar-custo-brasil-privatizacao-total-do-estado/" },
      { id: "zema-pro2", texto: "Defende reforma ampla da Previdência incluindo União, estados, municípios e os regimes rural e militar.", fonte: "https://www.jota.info/eleicoes/eleicoes-2026/zema-propoe-privatizacoes-saida-do-brics-e-flexibilizacao-da-clt" },
    ],
    contras: [
      { id: "zema-con1", texto: "Propõe privatizar a totalidade das empresas estatais brasileiras e a saída do Brics — uma reformulação completa do papel do Estado na economia, sem cronograma detalhado no plano divulgado.", fonte: "https://www.band.com.br/noticias/zema-propoe-saida-dos-brics-privatizacoes-e-r-1-mil-para-cada-brasileiro-ao-nascer-202608071748" },
    ],
    nota_editorial:
      "A cobertura encontrada sobre o plano de Zema concentrou-se em descrever as propostas; críticas técnicas específicas de economistas ao plano foram menos abundantes nas fontes consultadas do que para os planos de Lula e Flávio Bolsonaro.",
    historico_votos: [],
    redes_sociais: { instagram: "https://www.instagram.com/romeuzema/", site_oficial: "https://zema30.com.br/", tse_ficha: TSE_PORTAL },
    ultima_verificacao: HOJE,
  },
  {
    id: "pres-marcal",
    nome_urna: "Pablo Marçal",
    nome_completo: "Pablo Henrique Costa Marçal",
    cargo: "presidente",
    numero: "28",
    partido: "PRTB",
    coligacao: [],
    vice_ou_suplente: "Leonardo Avalanche (PRTB)",
    foto_url: null,
    biografia_curta:
      "Empresário e coach digital, candidato à Presidência em 2026. Teve o registro de candidatura contestado e sofreu restrições judiciais durante a campanha.",
    cargos_anteriores: [],
    status_dados: "parcial",
    posicao_eixos: {},
    propostas: [],
    pros: [],
    contras: [
      {
        id: "marcal-con1",
        texto:
          "O TSE concedeu liminar proibindo Marçal de acessar o fundo eleitoral (FEFC) e o fundo partidário e de participar de propaganda no rádio/TV e de debates, a pedido do Ministério Público Eleitoral, com base em condenação por uso indevido dos meios de comunicação nas eleições municipais de 2024.",
        fonte: "https://www.tse.jus.br/comunicacao/noticias/2026/Agosto/tse-concede-liminar-proibindo-pablo-marcal-de-usar-recursos-oficiais-para-campanha",
      },
    ],
    nota_editorial:
      "Posição não localizada para a maioria dos temas do questionário no momento da curadoria — não fazemos afinidade por eixo para este candidato até que propostas documentadas estejam disponíveis. A situação judicial da candidatura é fluida; consulte o TSE para o status mais atual.",
    historico_votos: [],
    redes_sociais: { instagram: "https://www.instagram.com/pablomarcal_/", site_oficial: undefined, tse_ficha: TSE_PORTAL },
    ultima_verificacao: HOJE,
  },
  ...[
    { id: "pres-cury", nome_urna: "Escritor Augusto Cury", nome_completo: "Augusto Jorge Cury", numero: "70", partido: "Avante", vice: "Júlio Delgado (Avante)" },
    { id: "pres-renan", nome_urna: "Renan Santos", nome_completo: "Renan Santos", numero: "14", partido: "Missão", vice: "Coronel Medina (Missão)" },
    { id: "pres-clariana", nome_urna: "Clariana Barão", nome_completo: "Clariana Barão", numero: "27", partido: "DC", vice: "Fabiana Torquato (DC)" },
    { id: "pres-edmilson", nome_urna: "Edmilson Costa", nome_completo: "Edmilson Costa", numero: "21", partido: "PCB", vice: "Cleusa Santos (PCB)" },
    { id: "pres-hertz", nome_urna: "Hertz Dias", nome_completo: "Hertz Dias", numero: "16", partido: "PSTU", vice: "Vanessa Portugal (PSTU)" },
    { id: "pres-rui", nome_urna: "Rui Costa Pimenta", nome_completo: "Rui Costa Pimenta", numero: "29", partido: "PCO", vice: "Antônio Carlos (PCO)" },
    { id: "pres-samara", nome_urna: "Samara Martins", nome_completo: "Samara Martins", numero: "80", partido: "UP", vice: "Raquel Brício (UP)" },
    { id: "pres-wilson", nome_urna: "Veterinário Wilson Grassi", nome_completo: "Wilson Grassi", numero: "35", partido: "Democrata", vice: "Suêd Haidar (Democrata)" },
  ].map((c) => fichaBasica(c.id, c.nome_urna, c.nome_completo, "presidente", c.numero, c.partido, c.vice)),

  // ==================== GOVERNADOR DE SÃO PAULO ====================
  {
    id: "gov-tarcisio",
    nome_urna: "Tarcísio de Freitas",
    nome_completo: "Tarcísio Gomes de Freitas",
    cargo: "governador",
    numero: "10",
    partido: "Republicanos",
    coligacao: [],
    vice_ou_suplente: "Felício Ramuth (Republicanos)",
    foto_url: null,
    biografia_curta:
      "Governador de São Paulo buscando a reeleição. Ex-ministro da Infraestrutura, engenheiro militar de formação.",
    cargos_anteriores: ["Governador de São Paulo", "Ministro da Infraestrutura"],
    buscando_reeleicao: true,
    status_dados: "completo",
    posicao_eixos: { economia: -1, seguranca: 2, costumes: 1, meio_ambiente: -1 },
    propostas: [
      {
        id: "tarcisio-p1",
        tema: "seguranca",
        resumo: "Amplia o programa Muralha Paulista, com câmeras e sensores integrados em todo o estado.",
        detalhe:
          "O plano \"Trilha da Prosperidade\" tem a segurança pública como prioridade número um, com ampliação de 30% do Muralha Paulista para alcançar os 645 municípios, somando mais de 160 mil câmeras e sensores — programa ao qual a gestão atribui mais de 15 mil prisões.",
        fonte: { tipo: "imprensa", url: "https://www.gazetadopovo.com.br/eleicoes/2026/sao-paulo-2026/plano-de-governo-tarcisio-de-freitas/", data_captura: HOJE },
      },
      {
        id: "tarcisio-p2",
        tema: "educacao",
        resumo: "Amplia as escolas cívico-militares na rede estadual.",
        detalhe:
          "O Programa de Escolas Cívico-Militares (ECM) já opera em cem escolas estaduais, em 89 municípios, com plano de ampliação e foco na preparação para o ensino superior e o mercado de trabalho.",
        fonte: { tipo: "imprensa", url: "https://www.gazetadopovo.com.br/eleicoes/2026/sao-paulo-2026/plano-de-governo-tarcisio-de-freitas/", data_captura: HOJE },
      },
      {
        id: "tarcisio-p3",
        tema: "infraestrutura",
        resumo: "Plano de governo estrutura eixo de infraestrutura e desenvolvimento social.",
        detalhe: "O plano \"Trilha da Prosperidade\" inclui um eixo de \"dignidade, oportunidade e desenvolvimento social\", reunindo pautas de superação da pobreza, segurança alimentar e desenvolvimento urbano.",
        fonte: { tipo: "imprensa", url: "https://www.gazetadopovo.com.br/eleicoes/2026/sao-paulo-2026/plano-de-governo-tarcisio-de-freitas/", data_captura: HOJE },
      },
    ],
    pros: [
      { id: "tarcisio-pro1", texto: "O programa Muralha Paulista soma mais de 160 mil câmeras e sensores integrados em 645 municípios, com mais de 15 mil prisões atribuídas ao programa.", fonte: "https://www.gazetadopovo.com.br/eleicoes/2026/sao-paulo-2026/plano-de-governo-tarcisio-de-freitas/" },
      { id: "tarcisio-pro2", texto: "Pesquisa Datafolha de julho de 2026 mostrou 45% de aprovação (ótimo/bom) à gestão estadual.", fonte: "https://www.nexojornal.com.br/debate/2026/08/14/candidatos-a-governador-sp-pesquisa-governo-debate-tarcisio-x-haddad" },
    ],
    contras: [
      { id: "tarcisio-con1", texto: "Organizações de direitos humanos apontam aumento expressivo de mortes decorrentes de intervenção policial durante a gestão, com denúncias levadas à ONU e à OEA.", fonte: "https://pt.wikipedia.org/wiki/Gest%C3%A3o_Tarc%C3%ADsio_de_Freitas_no_governo_de_S%C3%A3o_Paulo" },
      { id: "tarcisio-con2", texto: "O adversário Fernando Haddad (PT) e outros críticos apontam a privatização da Sabesp como responsável por aumento de tarifas e piora percebida no atendimento ao consumidor.", fonte: "https://vermelho.org.br/2026/08/20/haddad-critica-seguranca-publica-de-tarcisio-e-quer-rever-privatizacao-da-sabesp/" },
    ],
    historico_votos: [],
    redes_sociais: { instagram: "https://www.instagram.com/tarcisiogdf/", site_oficial: undefined, tse_ficha: TSE_PORTAL },
    ultima_verificacao: HOJE,
  },
  {
    id: "gov-haddad",
    nome_urna: "Fernando Haddad",
    nome_completo: "Fernando Haddad",
    cargo: "governador",
    numero: "13",
    partido: "PT",
    coligacao: ["PDT", "PSB", "PC do B", "PV", "PSOL", "Rede"],
    vice_ou_suplente: "Márcio França",
    foto_url: null,
    biografia_curta:
      "Ex-ministro da Fazenda, ex-prefeito de São Paulo e ex-ministro da Educação. Disputa o governo de SP pela segunda vez, após a derrota em 2022.",
    cargos_anteriores: ["Ministro da Fazenda", "Prefeito de São Paulo", "Ministro da Educação"],
    status_dados: "completo",
    posicao_eixos: { economia: 1, seguranca: -1, costumes: -2, meio_ambiente: 1 },
    propostas: [
      {
        id: "haddad-p1",
        tema: "seguranca",
        resumo: "Propõe criar uma agência de combate a facções e usar IA para integrar polícias e Ministério Público.",
        detalhe:
          "Haddad ventilou a possibilidade de criar uma agência de combate a facções e defendeu o uso de inteligência artificial para integrar a Polícia Civil, a Polícia Militar e o Ministério Público.",
        fonte: { tipo: "imprensa", url: "https://www.cnnbrasil.com.br/eleicoes/eleicoes-2026-haddad-propoe-criacao-de-agencia-de-combate-a-faccoes/", data_captura: HOJE },
      },
      {
        id: "haddad-p2",
        tema: "seguranca",
        resumo: "Defende o uso contínuo de câmeras corporais pela polícia.",
        detalhe: "Defende câmeras corporais de uso contínuo como fundamentais para esclarecer ocorrências e proteger tanto cidadãos quanto policiais, criticando o aumento da letalidade policial na gestão atual.",
        fonte: { tipo: "imprensa", url: "https://www.cnnbrasil.com.br/eleicoes/eleicoes-2026-haddad-propoe-criacao-de-agencia-de-combate-a-faccoes/", data_captura: HOJE },
      },
      {
        id: "haddad-p3",
        tema: "infraestrutura",
        resumo: "Defende revisar os contratos de privatização da Sabesp, sem prometer reestatização.",
        detalhe:
          "Haddad afirma que reestatizar a Sabesp seria \"um imbróglio jurídico medonho\" e prefere uma revisão profunda do contrato de privatização para melhorar o serviço e proteger o consumidor.",
        fonte: { tipo: "imprensa", url: "https://www.terra.com.br/noticias/brasil/politica/haddad-fala-em-clamor-pela-reestatizacao-da-sabesp-mas-ve-imbroglio-juridico-medonho,ddb5caadf934aeb8b4cf8fafff0d20bfusuakxuj.html", data_captura: HOJE },
      },
    ],
    pros: [
      { id: "haddad-pro1", texto: "Defende uso de inteligência artificial para integrar Polícia Civil, Polícia Militar e Ministério Público no combate a facções.", fonte: "https://www.cnnbrasil.com.br/eleicoes/eleicoes-2026-haddad-propoe-criacao-de-agencia-de-combate-a-faccoes/" },
      { id: "haddad-pro2", texto: "Defende uso contínuo de câmeras corporais pela polícia para esclarecer ocorrências e proteger cidadãos e policiais.", fonte: "https://www.cnnbrasil.com.br/eleicoes/eleicoes-2026-haddad-propoe-criacao-de-agencia-de-combate-a-faccoes/" },
    ],
    contras: [
      { id: "haddad-con1", texto: "Evita prometer a reestatização da Sabesp, reconhecendo que o processo seria um \"imbróglio jurídico medonho\" — visto por parte da militância antiprivatização como recuo em relação à pauta histórica do PT.", fonte: "https://www.terra.com.br/noticias/brasil/politica/haddad-fala-em-clamor-pela-reestatizacao-da-sabesp-mas-ve-imbroglio-juridico-medonho,ddb5caadf934aeb8b4cf8fafff0d20bfusuakxuj.html" },
      { id: "haddad-con2", texto: "A proposta de agência de combate a facções foi apenas ventilada como possibilidade, sem detalhamento de estrutura ou orçamento até o momento.", fonte: "https://www.cnnbrasil.com.br/eleicoes/eleicoes-2026-haddad-propoe-criacao-de-agencia-de-combate-a-faccoes/" },
    ],
    historico_votos: [],
    redes_sociais: { instagram: "https://www.instagram.com/fhaddad_oficial/", site_oficial: undefined, tse_ficha: TSE_PORTAL },
    ultima_verificacao: HOJE,
  },
  ...[
    { id: "gov-machado", nome_urna: "Carlos Machado", nome_completo: "Carlos Machado", numero: "21", partido: "PCB", vice: "Felipe Queiroz (PCB)" },
    { id: "gov-izadora", nome_urna: "Izadora Dias", nome_completo: "Izadora Dias", numero: "29", partido: "PCO", vice: "Nivaldo Orlandi (PCO)" },
    { id: "gov-edjane", nome_urna: "Policial Edjane", nome_completo: "Edjane (Policial Edjane)", numero: "36", partido: "Agir", vice: "Renata Bolsonaro (Agir)" },
    { id: "gov-vera", nome_urna: "Vera Lúcia", nome_completo: "Vera Lúcia", numero: "16", partido: "PSTU", vice: "Renata França (PSTU)" },
    { id: "gov-vivian", nome_urna: "Vivian Mendes", nome_completo: "Vivian Mendes", numero: "80", partido: "UP", vice: null },
  ].map((c) => fichaBasica(c.id, c.nome_urna, c.nome_completo, "governador", c.numero, c.partido, c.vice)),
];

/**
 * Ficha básica para candidatos cuja cobertura documental disponível na
 * curadoria não permite classificação responsável por eixo ideológico.
 * Nunca inferimos posições aqui — apenas dados públicos de registro.
 */
function fichaBasica(
  id: string,
  nome_urna: string,
  nome_completo: string,
  cargo: Candidato["cargo"],
  numero: string,
  partido: string,
  vice: string | null
): Candidato {
  return {
    id,
    nome_urna,
    nome_completo,
    cargo,
    numero,
    partido,
    coligacao: [],
    vice_ou_suplente: vice,
    foto_url: null,
    biografia_curta:
      "Candidatura registrada no TSE para as Eleições Gerais 2026. Posições sobre políticas públicas ainda não documentadas o suficiente para compor a ficha aprofundada desta ferramenta.",
    cargos_anteriores: [],
    status_dados: "somente_ficha",
    posicao_eixos: {},
    propostas: [],
    pros: [],
    contras: [],
    nota_editorial:
      "Posição não localizada nos temas do questionário no momento da curadoria. Consulte a ficha oficial no TSE ou o perfil oficial do candidato para mais informações.",
    historico_votos: [],
    redes_sociais: { tse_ficha: TSE_PORTAL },
    ultima_verificacao: HOJE,
  };
}

export function candidatosPorCargo(cargo: Candidato["cargo"]): Candidato[] {
  return CANDIDATOS.filter((c) => c.cargo === cargo);
}

export function candidatoPorId(id: string): Candidato | undefined {
  return CANDIDATOS.find((c) => c.id === id);
}
