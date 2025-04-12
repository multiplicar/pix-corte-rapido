import { createContext, useState, useContext } from "react";

interface AppContextType {
  agendamento: {
    servico?: {
      nome: string;
      preco: number;
    };
    data?: Date;
    hora?: string;
    nome?: string;
    email?: string;
    formaPagamento?: string;
    metodoPagamento?: string;
  };
  selecionarServico: (servico: { nome: string; preco: number }) => void;
  selecionarDataHora: (data: Date, hora: string) => void;
  atualizarDadosCliente: (nome: string, email: string) => void;
  confirmarAgendamento: (formaPagamento: string, metodoPagamento?: string) => void;
  resetAgendamento: () => void; // Adding the missing method
}

export const AppContext = createContext<AppContextType>({
  agendamento: {},
  selecionarServico: () => {},
  selecionarDataHora: () => {},
  atualizarDadosCliente: () => {},
  confirmarAgendamento: () => {},
  resetAgendamento: () => {}, // Adding the missing method
});

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [agendamento, setAgendamento] = useState<AppContextType['agendamento']>({});

  const selecionarServico = (servico: { nome: string; preco: number }) => {
    setAgendamento(prev => ({ ...prev, servico: servico }));
  };

  const selecionarDataHora = (data: Date, hora: string) => {
    setAgendamento(prev => ({ ...prev, data: data, hora: hora }));
  };

  const atualizarDadosCliente = (nome: string, email: string) => {
    setAgendamento(prev => ({ ...prev, nome: nome, email: email }));
  };

  const confirmarAgendamento = (formaPagamento: string, metodoPagamento?: string) => {
    setAgendamento(prev => ({ ...prev, formaPagamento: formaPagamento, metodoPagamento: metodoPagamento }));
  };

  const resetAgendamento = () => {
    setAgendamento({});
  };

  return (
    <AppContext.Provider
      value={{
        agendamento,
        selecionarServico,
        selecionarDataHora,
        atualizarDadosCliente,
        confirmarAgendamento,
        resetAgendamento, // Including the method in the provider value
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
