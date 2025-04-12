
import React, { createContext, useContext, useState } from 'react';
import { servicos as servicosData } from '@/data/servicos';

export interface Servico {
  id: string;
  nome: string;
  descricao: string;
  preco: number;
  duracao: number;
  imagem: string;
}

export interface WaitListItem {
  id: string;
  nome: string;
  servico: {
    nome: string;
  };
  posicao: number;
  estimatedTime: number;
}

export interface Agendamento {
  servico?: Servico;
  data?: Date;
  hora?: string;
  nome?: string;
  telefone?: string;
  email?: string;
  observacoes?: string;
  pagamentoMetodo?: 'pix' | 'card' | 'local';
  pagamentoStatus?: 'pendente' | 'confirmado' | 'cancelado';
}

interface AppContextType {
  servicos: Servico[];
  agendamento: Agendamento;
  setAgendamento: React.Dispatch<React.SetStateAction<Agendamento>>;
  horarios: string[];
  diasDisponiveis: Date[];
  waitList: WaitListItem[];
  getWaitListPosition: (id: string) => number | null;
  confirmarAgendamento: (metodo: 'pix' | 'card' | 'local') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [servicos] = useState<Servico[]>(servicosData);
  const [agendamento, setAgendamento] = useState<Agendamento>({});
  const [waitList] = useState<WaitListItem[]>([
    {
      id: "w123456",
      nome: "João Silva",
      servico: { nome: "Corte e Barba" },
      posicao: 1,
      estimatedTime: 30
    },
    {
      id: "w789012",
      nome: "Pedro Santos",
      servico: { nome: "Corte Simples" },
      posicao: 2,
      estimatedTime: 20
    },
    {
      id: "w345678",
      nome: "Carlos Oliveira",
      servico: { nome: "Barba" },
      posicao: 3,
      estimatedTime: 15
    }
  ]);

  // Horários disponíveis para agendamento
  const horarios = [
    "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
    "13:00", "13:30", "14:00", "14:30", "15:00", "15:30",
    "16:00", "16:30", "17:00", "17:30", "18:00", "18:30"
  ];

  // Dias disponíveis para agendamento (próximos 15 dias)
  const gerarDiasDisponiveis = () => {
    const hoje = new Date();
    const diasDisponiveis: Date[] = [];
    
    for (let i = 0; i < 15; i++) {
      const data = new Date(hoje);
      data.setDate(hoje.getDate() + i);
      
      // Pular domingos (0 é domingo no JavaScript)
      if (data.getDay() !== 0) {
        diasDisponiveis.push(data);
      }
    }
    
    return diasDisponiveis;
  };

  const diasDisponiveis = gerarDiasDisponiveis();

  const getWaitListPosition = (id: string): number | null => {
    const person = waitList.find(item => item.id === id);
    return person ? person.posicao : null;
  };
  
  // Confirmar agendamento com o método de pagamento
  const confirmarAgendamento = (metodo: 'pix' | 'card' | 'local') => {
    setAgendamento(prev => ({
      ...prev,
      pagamentoMetodo: metodo,
      pagamentoStatus: metodo === 'local' ? 'pendente' : 'confirmado'
    }));
    
    // Aqui você poderia salvar no localStorage ou em um banco de dados
    const agendamentosAnteriores = localStorage.getItem('agendamentos');
    const agendamentos = agendamentosAnteriores ? JSON.parse(agendamentosAnteriores) : [];
    
    const novoAgendamento = {
      ...agendamento,
      id: `ag-${Date.now()}`,
      data: agendamento.data?.toISOString(),
      pagamentoMetodo: metodo,
      pagamentoStatus: metodo === 'local' ? 'pendente' : 'confirmado'
    };
    
    agendamentos.push(novoAgendamento);
    localStorage.setItem('agendamentos', JSON.stringify(agendamentos));
  };

  return (
    <AppContext.Provider value={{ 
      servicos, 
      agendamento, 
      setAgendamento, 
      horarios, 
      diasDisponiveis,
      waitList,
      getWaitListPosition,
      confirmarAgendamento
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
