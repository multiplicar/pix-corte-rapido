
import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Servico = {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  duracao: number;
  imagem: string;
};

export type Agendamento = {
  servico?: Servico;
  data?: Date;
  hora?: string;
  nome?: string;
  telefone?: string;
  email?: string;
  observacoes?: string;
};

interface AppContextType {
  agendamento: Agendamento;
  setAgendamento: React.Dispatch<React.SetStateAction<Agendamento>>;
  pixCode: string;
  setPixCode: React.Dispatch<React.SetStateAction<string>>;
  resetAgendamento: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp deve ser usado dentro de um AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [agendamento, setAgendamento] = useState<Agendamento>({});
  const [pixCode, setPixCode] = useState<string>('');

  const resetAgendamento = () => {
    setAgendamento({});
    setPixCode('');
  };

  return (
    <AppContext.Provider value={{
      agendamento,
      setAgendamento,
      pixCode,
      setPixCode,
      resetAgendamento
    }}>
      {children}
    </AppContext.Provider>
  );
};
