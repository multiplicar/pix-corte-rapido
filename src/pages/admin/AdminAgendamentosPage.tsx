
import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/layout/AdminLayout';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

interface Agendamento {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  servico: { nome: string; preco: number };
  data: string;
  hora: string;
}

// Mock data for agendamentos
const mockAgendamentos: Agendamento[] = [
  {
    id: '1',
    nome: 'João Silva',
    email: 'joao@example.com',
    telefone: '(11) 99999-1111',
    servico: { nome: 'Corte de Cabelo', preco: 50 },
    data: '2025-04-15',
    hora: '10:00'
  },
  {
    id: '2',
    nome: 'Maria Oliveira',
    email: 'maria@example.com',
    telefone: '(11) 99999-2222',
    servico: { nome: 'Barba', preco: 30 },
    data: '2025-04-16',
    hora: '14:30'
  },
  {
    id: '3',
    nome: 'Pedro Santos',
    email: 'pedro@example.com',
    telefone: '(11) 99999-3333',
    servico: { nome: 'Corte e Barba', preco: 70 },
    data: '2025-04-17',
    hora: '16:00'
  }
];

const AdminAgendamentosPage = () => {
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);
  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<'success' | 'destructive' | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulating API call with a timeout
    const timer = setTimeout(() => {
      fetchAgendamentos();
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  const fetchAgendamentos = async () => {
    setLoading(true);
    try {
      // Simulating a successful API call
      setAgendamentos(mockAgendamentos);
    } catch (error) {
      console.error("Erro ao buscar agendamentos:", error);
      setMessage("Erro ao carregar agendamentos.");
      setMessageType('destructive');
    } finally {
      setLoading(false);
    }
  };
  
  const handleDelete = async (id: string) => {
    try {
      // Simulate deletion by filtering out the agendamento with the given id
      setAgendamentos(prev => prev.filter(agendamento => agendamento.id !== id));
      setMessage("Agendamento removido com sucesso!");
      setMessageType('success');
    } catch (error) {
      console.error("Erro ao remover agendamento:", error);
      setMessage("Erro ao remover o agendamento.");
      setMessageType('destructive');
    }
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  return (
    <AdminLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Gerenciar Agendamentos</h1>
        
        {message && (
          <Alert variant={messageType as "default" | "destructive"} className="mb-4">
            <AlertTitle>{messageType === "destructive" ? "Erro" : "Sucesso"}</AlertTitle>
            <AlertDescription>{message}</AlertDescription>
          </Alert>
        )}
        
        {loading ? (
          <div className="space-y-3">
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Telefone</TableHead>
                  <TableHead>Serviço</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead>Hora</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {agendamentos.map(agendamento => (
                  <TableRow key={agendamento.id} className="hover:bg-gray-50">
                    <TableCell>{agendamento.nome}</TableCell>
                    <TableCell>{agendamento.email}</TableCell>
                    <TableCell>{agendamento.telefone}</TableCell>
                    <TableCell>{agendamento.servico?.nome}</TableCell>
                    <TableCell>{formatDate(agendamento.data)}</TableCell>
                    <TableCell>{agendamento.hora}</TableCell>
                    <TableCell>
                      <Button
                        onClick={() => handleDelete(agendamento.id)}
                        variant="destructive"
                        size="sm"
                      >
                        Excluir
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminAgendamentosPage;
