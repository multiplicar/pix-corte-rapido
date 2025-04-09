
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

export type WaitListItem = {
  id: string;
  nome: string;
  telefone: string;
  email: string;
  servico: Servico;
  posicao: number;
  estimatedTime: number; // tempo estimado em minutos
  createdAt: Date;
};

interface AppContextType {
  agendamento: Agendamento;
  setAgendamento: React.Dispatch<React.SetStateAction<Agendamento>>;
  pixCode: string;
  setPixCode: React.Dispatch<React.SetStateAction<string>>;
  resetAgendamento: () => void;
  waitList: WaitListItem[];
  addToWaitList: (item: Omit<WaitListItem, 'id' | 'posicao' | 'createdAt'>) => string;
  removeFromWaitList: (id: string) => void;
  getWaitListPosition: (id: string) => number | null;
  updateWaitListPositions: () => void;
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
  const [waitList, setWaitList] = useState<WaitListItem[]>(() => {
    const saved = localStorage.getItem('waitList');
    return saved ? JSON.parse(saved) : [];
  });

  const resetAgendamento = () => {
    setAgendamento({});
    setPixCode('');
  };

  // Adiciona um cliente à fila de espera
  const addToWaitList = (item: Omit<WaitListItem, 'id' | 'posicao' | 'createdAt'>) => {
    const id = Math.random().toString(36).substring(2, 11);
    const posicao = waitList.length + 1;
    const newItem: WaitListItem = {
      ...item,
      id,
      posicao,
      createdAt: new Date(),
    };
    
    const updatedList = [...waitList, newItem];
    setWaitList(updatedList);
    localStorage.setItem('waitList', JSON.stringify(updatedList));
    return id;
  };

  // Remove um cliente da fila de espera
  const removeFromWaitList = (id: string) => {
    const updatedList = waitList.filter(item => item.id !== id);
    setWaitList(updatedList);
    localStorage.setItem('waitList', JSON.stringify(updatedList));
    updateWaitListPositions();
  };

  // Retorna a posição de um cliente na fila
  const getWaitListPosition = (id: string) => {
    const item = waitList.find(item => item.id === id);
    return item ? item.posicao : null;
  };

  // Atualiza as posições na fila após remoções
  const updateWaitListPositions = () => {
    const updatedList = waitList.map((item, index) => ({
      ...item,
      posicao: index + 1
    }));
    setWaitList(updatedList);
    localStorage.setItem('waitList', JSON.stringify(updatedList));
  };

  return (
    <AppContext.Provider value={{
      agendamento,
      setAgendamento,
      pixCode,
      setPixCode,
      resetAgendamento,
      waitList,
      addToWaitList,
      removeFromWaitList,
      getWaitListPosition,
      updateWaitListPositions
    }}>
      {children}
    </AppContext.Provider>
  );
};
