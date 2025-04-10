
import { useState } from 'react';
import AdminLayout from '@/components/layout/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { Calendar, ClipboardCheck, ClipboardX, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

// Tipo para o agendamento
interface Agendamento {
  id: string;
  cliente: {
    nome: string;
    telefone: string;
  };
  servico: string;
  data: string;
  hora: string;
  status: 'agendado' | 'concluido' | 'cancelado';
}

const AdminAgendamentosPage = () => {
  // Estado para a lista de agendamentos
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>(() => {
    const hoje = new Date().toISOString().split('T')[0];
    return [
      { id: '1', cliente: { nome: 'Carlos Silva', telefone: '(11) 98765-4321' }, servico: 'Corte + Barba', data: hoje, hora: '09:30', status: 'agendado' },
      { id: '2', cliente: { nome: 'André Oliveira', telefone: '(11) 91234-5678' }, servico: 'Corte', data: hoje, hora: '10:15', status: 'agendado' },
      { id: '3', cliente: { nome: 'Ricardo Mendes', telefone: '(11) 99876-5432' }, servico: 'Barba', data: hoje, hora: '11:00', status: 'agendado' },
      { id: '4', cliente: { nome: 'Felipe Costa', telefone: '(11) 97654-3210' }, servico: 'Corte', data: hoje, hora: '14:30', status: 'agendado' },
      { id: '5', cliente: { nome: 'Bruno Santos', telefone: '(11) 98888-7777' }, servico: 'Corte + Barba', data: hoje, hora: '15:45', status: 'agendado' },
      { id: '6', cliente: { nome: 'João Pedro', telefone: '(11) 92222-3333' }, servico: 'Barba', data: hoje, hora: '16:30', status: 'agendado' },
    ];
  });
  
  // Estado para pesquisa
  const [pesquisa, setPesquisa] = useState('');
  
  // Cancelar agendamento
  const handleCancelar = (id: string) => {
    setAgendamentos(
      agendamentos.map(agendamento =>
        agendamento.id === id
          ? { ...agendamento, status: 'cancelado' as const }
          : agendamento
      )
    );
    toast.success('Agendamento cancelado com sucesso!');
  };
  
  // Confirmar agendamento como concluído
  const handleConcluir = (id: string) => {
    setAgendamentos(
      agendamentos.map(agendamento =>
        agendamento.id === id
          ? { ...agendamento, status: 'concluido' as const }
          : agendamento
      )
    );
    toast.success('Agendamento marcado como concluído!');
  };
  
  // Filtrar agendamentos por status e pesquisa
  const filtrarAgendamentos = (status: 'agendado' | 'concluido' | 'cancelado' | 'todos') => {
    let filtrados = agendamentos;
    
    // Filtrar por status se não for 'todos'
    if (status !== 'todos') {
      filtrados = filtrados.filter(a => a.status === status);
    }
    
    // Filtrar por pesquisa
    if (pesquisa) {
      const termoPesquisa = pesquisa.toLowerCase();
      filtrados = filtrados.filter(a => 
        a.cliente.nome.toLowerCase().includes(termoPesquisa) ||
        a.cliente.telefone.includes(termoPesquisa) ||
        a.servico.toLowerCase().includes(termoPesquisa)
      );
    }
    
    return filtrados;
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Agendamentos</h1>
        <p className="text-muted-foreground">Gerencie os agendamentos da barbearia.</p>
        
        <div className="flex items-center space-x-2 mb-4">
          <Search className="h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Pesquisar por cliente, telefone ou serviço..."
            value={pesquisa}
            onChange={(e) => setPesquisa(e.target.value)}
            className="flex-1"
          />
        </div>
        
        <Tabs defaultValue="agendados">
          <TabsList className="mb-4">
            <TabsTrigger value="agendados">Agendados</TabsTrigger>
            <TabsTrigger value="concluidos">Concluídos</TabsTrigger>
            <TabsTrigger value="cancelados">Cancelados</TabsTrigger>
            <TabsTrigger value="todos">Todos</TabsTrigger>
          </TabsList>
          
          {['agendados', 'concluidos', 'cancelados', 'todos'].map((tab) => (
            <TabsContent key={tab} value={tab}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calendar className="mr-2 h-5 w-5" />
                    {tab === 'agendados' && 'Agendamentos Pendentes'}
                    {tab === 'concluidos' && 'Agendamentos Concluídos'}
                    {tab === 'cancelados' && 'Agendamentos Cancelados'}
                    {tab === 'todos' && 'Todos os Agendamentos'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Cliente</TableHead>
                        <TableHead>Telefone</TableHead>
                        <TableHead>Serviço</TableHead>
                        <TableHead>Data</TableHead>
                        <TableHead>Hora</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filtrarAgendamentos(tab as any).map((agendamento) => (
                        <TableRow key={agendamento.id}>
                          <TableCell className="font-medium">{agendamento.cliente.nome}</TableCell>
                          <TableCell>{agendamento.cliente.telefone}</TableCell>
                          <TableCell>{agendamento.servico}</TableCell>
                          <TableCell>{new Date(agendamento.data).toLocaleDateString()}</TableCell>
                          <TableCell>{agendamento.hora}</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                agendamento.status === 'agendado'
                                  ? 'default'
                                  : agendamento.status === 'concluido'
                                  ? 'success'
                                  : 'destructive'
                              }
                              className={
                                agendamento.status === 'agendado'
                                  ? 'bg-blue-500'
                                  : agendamento.status === 'concluido'
                                  ? 'bg-green-500'
                                  : 'bg-red-500'
                              }
                            >
                              {agendamento.status === 'agendado' && 'Agendado'}
                              {agendamento.status === 'concluido' && 'Concluído'}
                              {agendamento.status === 'cancelado' && 'Cancelado'}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              {agendamento.status === 'agendado' && (
                                <>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleConcluir(agendamento.id)}
                                    className="h-8 px-2 text-xs"
                                  >
                                    <ClipboardCheck className="h-4 w-4 mr-1" />
                                    Concluir
                                  </Button>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleCancelar(agendamento.id)}
                                    className="h-8 px-2 text-xs text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600"
                                  >
                                    <ClipboardX className="h-4 w-4 mr-1" />
                                    Cancelar
                                  </Button>
                                </>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                      {filtrarAgendamentos(tab as any).length === 0 && (
                        <TableRow>
                          <TableCell colSpan={7} className="text-center py-4">
                            Nenhum agendamento encontrado.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default AdminAgendamentosPage;
