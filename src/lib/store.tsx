"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  AvaliacaoItem,
  Cargo,
  NivelImportancia,
  PesoPessoal,
  RespostaEscala,
  Tema,
  UserState,
} from "./types";

const STORAGE_KEY = "bussola-eleitoral-sp-2026:estado";

const ESTADO_INICIAL: UserState = {
  cargosSelecionados: [],
  temasEscolhidos: [],
  respostas: {},
  importancias: {},
  avaliacoesPessoais: {},
  questionarioConcluido: false,
};

function carregarEstado(): UserState {
  if (typeof window === "undefined") return ESTADO_INICIAL;
  try {
    const bruto = window.localStorage.getItem(STORAGE_KEY);
    if (!bruto) return ESTADO_INICIAL;
    return { ...ESTADO_INICIAL, ...JSON.parse(bruto) };
  } catch {
    return ESTADO_INICIAL;
  }
}

interface StoreContextValue {
  estado: UserState;
  hidratado: boolean;
  setCargos: (cargos: Cargo[]) => void;
  alternarTema: (tema: Tema) => void;
  responder: (questaoId: string, resposta: RespostaEscala) => void;
  setImportancia: (tema: Tema, nivel: NivelImportancia) => void;
  concluirQuestionario: () => void;
  avaliarItem: (candidatoId: string, itemId: string, peso: PesoPessoal) => void;
  avaliacaoDoItem: (candidatoId: string, itemId: string) => PesoPessoal | undefined;
  resetar: () => void;
}

const StoreContext = createContext<StoreContextValue | null>(null);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [estado, setEstado] = useState<UserState>(ESTADO_INICIAL);
  const [hidratado, setHidratado] = useState(false);

  useEffect(() => {
    // Hidratação única a partir do localStorage: o servidor não tem acesso a
    // window, então o estado inicial precisa ser sincronizado no efeito.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setEstado(carregarEstado());
    setHidratado(true);
  }, []);

  useEffect(() => {
    if (!hidratado) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(estado));
  }, [estado, hidratado]);

  const setCargos = useCallback((cargos: Cargo[]) => {
    setEstado((e) => ({ ...e, cargosSelecionados: cargos }));
  }, []);

  const responder = useCallback((questaoId: string, resposta: RespostaEscala) => {
    setEstado((e) => ({ ...e, respostas: { ...e.respostas, [questaoId]: resposta } }));
  }, []);

  const setImportancia = useCallback((tema: Tema, nivel: NivelImportancia) => {
    setEstado((e) => ({ ...e, importancias: { ...e.importancias, [tema]: nivel } }));
  }, []);

  /**
   * Liga/desliga um tema na lista de causas escolhidas pelo usuário e
   * recalcula a importância de cada uma a partir da ordem em que foram
   * tocadas: as 2 primeiras contam como "muito importante", as demais como
   * "médio". Isso substitui a antiga tela separada de importância por tema.
   */
  const alternarTema = useCallback((tema: Tema) => {
    setEstado((e) => {
      const jaEscolhido = e.temasEscolhidos.includes(tema);
      const novaLista = jaEscolhido
        ? e.temasEscolhidos.filter((t) => t !== tema)
        : [...e.temasEscolhidos, tema];
      const novasImportancias: UserState["importancias"] = {};
      novaLista.forEach((t, i) => {
        novasImportancias[t] = i < 2 ? "muito" : "medio";
      });
      return { ...e, temasEscolhidos: novaLista, importancias: novasImportancias };
    });
  }, []);

  const concluirQuestionario = useCallback(() => {
    setEstado((e) => ({ ...e, questionarioConcluido: true }));
  }, []);

  const avaliarItem = useCallback(
    (candidatoId: string, itemId: string, peso: PesoPessoal) => {
      setEstado((e) => {
        const atuais = e.avaliacoesPessoais[candidatoId] ?? [];
        const semItem = atuais.filter((a) => a.itemId !== itemId);
        const novaLista: AvaliacaoItem[] = [...semItem, { itemId, peso }];
        return {
          ...e,
          avaliacoesPessoais: { ...e.avaliacoesPessoais, [candidatoId]: novaLista },
        };
      });
    },
    []
  );

  const avaliacaoDoItem = useCallback(
    (candidatoId: string, itemId: string) => {
      return estado.avaliacoesPessoais[candidatoId]?.find((a) => a.itemId === itemId)?.peso;
    },
    [estado.avaliacoesPessoais]
  );

  const resetar = useCallback(() => {
    setEstado(ESTADO_INICIAL);
    window.localStorage.removeItem(STORAGE_KEY);
  }, []);

  const value = useMemo(
    () => ({
      estado,
      hidratado,
      setCargos,
      alternarTema,
      responder,
      setImportancia,
      concluirQuestionario,
      avaliarItem,
      avaliacaoDoItem,
      resetar,
    }),
    [
      estado,
      hidratado,
      setCargos,
      alternarTema,
      responder,
      setImportancia,
      concluirQuestionario,
      avaliarItem,
      avaliacaoDoItem,
      resetar,
    ]
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore(): StoreContextValue {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore precisa estar dentro de StoreProvider");
  return ctx;
}
