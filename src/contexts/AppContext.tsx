
import { createContext, useState, useContext } from "react";
import { Servico, servicos } from "@/data/servicos";

// Define WaitListItem type to be used in the app context
export type WaitListItemStatus = 'waiting' | 'current' | 'done';

export interface WaitListItem {
  id: string;
  nome: string;
  email?: string;
  servico: {
    nome: string;
    duracao: number;
  };
  status: WaitListItemStatus;
  posicao: number;
  estimatedTime: number;
  horaPrevista: string;
}

interface AppContextType {
  agendamento: {
    servico?: Servico;
    data?: Date;
    hora?: string;
    nome?: string;
    email?: string;
    telefone?: string;
    observacoes?: string;
    formaPagamento?: string;
    metodoPagamento?: string;
  };
  waitList: WaitListItem[];
  servicos: Servico[];
  selecionarServico: (servico: Servico) => void;
  selecionarDataHora: (data: Date, hora: string) => void;
  atualizarDadosCliente: (nome: string, email: string, telefone?: string, observacoes?: string) => void;
  confirmarAgendamento: (formaPagamento: string, metodoPagamento?: string) => void;
  resetAgendamento: () => void;
  setAgendamento: React.Dispatch<React.SetStateAction<AppContextType['agendamento']>>;
}

export const AppContext = createContext<AppContextType>({
  agendamento: {},
  waitList: [],
  servicos: servicos,
  selecionarServico: () => {},
  selecionarDataHora: () => {},
  atualizarDadosCliente: () => {},
  confirmarAgendamento: () => {},
  resetAgendamento: () => {},
  setAgendamento: () => {},
});

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [agendamento, setAgendamento] = useState<AppContextType['agendamento']>({});
  const [waitList, setWaitList] = useState<WaitListItem[]>([]);

  const selecionarServico = (servico: Servico) => {
    setAgendamento(prev => ({ ...prev, servico }));
  };

  const selecionarDataHora = (data: Date, hora: string) => {
    setAgendamento(prev => ({ ...prev, data, hora }));
  };

  const atualizarDadosCliente = (nome: string, email: string, telefone?: string, observacoes?: string) => {
    setAgendamento(prev => ({ ...prev, nome, email, telefone, observacoes }));
  };

  const confirmarAgendamento = (formaPagamento: string, metodoPagamento?: string) => {
    setAgendamento(prev => ({ ...prev, formaPagamento, metodoPagamento }));
  };

  const resetAgendamento = () => {
    setAgendamento({});
  };

  return (
    <AppContext.Provider
      value={{
        agendamento,
        waitList,
        servicos,
        selecionarServico,
        selecionarDataHora,
        atualizarDadosCliente,
        confirmarAgendamento,
        resetAgendamento,
        setAgendamento,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
