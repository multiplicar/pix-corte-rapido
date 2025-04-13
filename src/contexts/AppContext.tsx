
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

// Interface para agendamentos concluídos
export interface Agendamento {
  id: string;
  servico: Servico;
  data: Date;
  hora: string;
  nome: string;
  telefone: string;
  email?: string;
  observacoes?: string;
  formaPagamento?: string;
  metodoPagamento?: string;
  status: 'pendente' | 'confirmado' | 'concluido' | 'cancelado';
  dataCriacao: Date;
}

// Interface para clientes
export interface Cliente {
  id: string;
  nome: string;
  telefone: string;
  email?: string;
  dataCadastro: Date;
  agendamentos?: string[]; // IDs dos agendamentos
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
  agendamentos: Agendamento[];
  clientes: Cliente[];
  selecionarServico: (servico: Servico) => void;
  selecionarDataHora: (data: Date, hora: string) => void;
  atualizarDadosCliente: (nome: string, email: string, telefone?: string, observacoes?: string) => void;
  confirmarAgendamento: (formaPagamento: string, metodoPagamento?: string) => void;
  resetAgendamento: () => void;
  setAgendamento: React.Dispatch<React.SetStateAction<AppContextType['agendamento']>>;
  buscarClientePorTelefone: (telefone: string) => Promise<Cliente | null>;
  getClienteById: (id: string) => Cliente | undefined;
  getAgendamentosByClienteId: (clienteId: string) => Agendamento[];
}

// Dados simulados para clientes iniciais
const clientesIniciais: Cliente[] = [
  {
    id: "1",
    nome: "João Silva",
    telefone: "(11) 99999-1111",
    email: "joao@email.com",
    dataCadastro: new Date("2023-10-15"),
  },
  {
    id: "2",
    nome: "Maria Oliveira",
    telefone: "(11) 99999-2222",
    email: "maria@email.com",
    dataCadastro: new Date("2023-11-20"),
  },
  {
    id: "3",
    nome: "Pedro Santos",
    telefone: "(11) 99999-3333",
    email: "pedro@email.com",
    dataCadastro: new Date("2023-12-05"),
  },
  {
    id: "4",
    nome: "Ana Souza",
    telefone: "(11) 99999-4444",
    email: "ana@email.com",
    dataCadastro: new Date("2024-01-10"),
  },
  {
    id: "5",
    nome: "Carlos Mendes",
    telefone: "(11) 99999-5555",
    email: "carlos@email.com",
    dataCadastro: new Date("2024-02-15"),
  },
];

export const AppContext = createContext<AppContextType>({
  agendamento: {},
  waitList: [],
  servicos: servicos,
  agendamentos: [],
  clientes: clientesIniciais,
  selecionarServico: () => {},
  selecionarDataHora: () => {},
  atualizarDadosCliente: () => {},
  confirmarAgendamento: () => {},
  resetAgendamento: () => {},
  setAgendamento: () => {},
  buscarClientePorTelefone: async () => null,
  getClienteById: () => undefined,
  getAgendamentosByClienteId: () => [],
});

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [agendamento, setAgendamento] = useState<AppContextType['agendamento']>({});
  const [waitList, setWaitList] = useState<WaitListItem[]>([]);
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);
  const [clientes, setClientes] = useState<Cliente[]>(clientesIniciais);

  const selecionarServico = (servico: Servico) => {
    setAgendamento(prev => ({ ...prev, servico }));
  };

  const selecionarDataHora = (data: Date, hora: string) => {
    setAgendamento(prev => ({ ...prev, data, hora }));
  };

  const atualizarDadosCliente = (nome: string, email: string, telefone?: string, observacoes?: string) => {
    setAgendamento(prev => ({ ...prev, nome, email, telefone, observacoes }));
    
    // Verificar se o cliente já existe
    if (telefone) {
      const clienteExistente = clientes.find(c => c.telefone === telefone);
      
      if (!clienteExistente) {
        // Cadastrar novo cliente
        const novoCliente: Cliente = {
          id: Date.now().toString(),
          nome,
          telefone,
          email: email || undefined,
          dataCadastro: new Date(),
        };
        
        setClientes(prev => [...prev, novoCliente]);
      }
    }
  };

  const confirmarAgendamento = (formaPagamento: string, metodoPagamento?: string) => {
    setAgendamento(prev => ({ ...prev, formaPagamento, metodoPagamento }));
    
    // Salvar o agendamento finalizado
    if (agendamento.servico && agendamento.data && agendamento.hora && agendamento.nome && agendamento.telefone) {
      const novoAgendamento: Agendamento = {
        id: Date.now().toString(),
        servico: agendamento.servico,
        data: agendamento.data,
        hora: agendamento.hora,
        nome: agendamento.nome,
        telefone: agendamento.telefone,
        email: agendamento.email,
        observacoes: agendamento.observacoes,
        formaPagamento,
        metodoPagamento,
        status: 'confirmado',
        dataCriacao: new Date(),
      };
      
      setAgendamentos(prev => [...prev, novoAgendamento]);
      
      // Atualizar cliente com o novo agendamento
      const clienteIndex = clientes.findIndex(c => c.telefone === agendamento.telefone);
      if (clienteIndex !== -1) {
        const clienteAtualizado = { ...clientes[clienteIndex] };
        if (!clienteAtualizado.agendamentos) {
          clienteAtualizado.agendamentos = [];
        }
        clienteAtualizado.agendamentos.push(novoAgendamento.id);
        
        const clientesAtualizados = [...clientes];
        clientesAtualizados[clienteIndex] = clienteAtualizado;
        setClientes(clientesAtualizados);
      }
    }
  };

  const resetAgendamento = () => {
    setAgendamento({});
  };
  
  // Função para buscar cliente por telefone
  const buscarClientePorTelefone = async (telefone: string): Promise<Cliente | null> => {
    // Simulando uma requisição assíncrona
    return new Promise((resolve) => {
      setTimeout(() => {
        const cliente = clientes.find(c => c.telefone === telefone);
        resolve(cliente || null);
      }, 800);
    });
  };
  
  // Função para obter cliente pelo ID
  const getClienteById = (id: string): Cliente | undefined => {
    return clientes.find(c => c.id === id);
  };
  
  // Função para obter agendamentos por cliente
  const getAgendamentosByClienteId = (clienteId: string): Agendamento[] => {
    const cliente = clientes.find(c => c.id === clienteId);
    if (!cliente || !cliente.agendamentos) return [];
    
    return agendamentos.filter(a => cliente.agendamentos?.includes(a.id));
  };

  return (
    <AppContext.Provider
      value={{
        agendamento,
        waitList,
        servicos,
        agendamentos,
        clientes,
        selecionarServico,
        selecionarDataHora,
        atualizarDadosCliente,
        confirmarAgendamento,
        resetAgendamento,
        setAgendamento,
        buscarClientePorTelefone,
        getClienteById,
        getAgendamentosByClienteId,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
