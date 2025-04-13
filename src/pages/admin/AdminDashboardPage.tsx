
import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/layout/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { 
  Calendar, 
  Users, 
  Scissors, 
  DollarSign, 
  UserPlus
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useApp } from '@/contexts/AppContext';
import ClientesRecentes from '@/components/admin/ClientesRecentes';

// Dados simulados para estatísticas do dashboard
const ESTATISTICAS = {
  agendamentosHoje: 12,
  comparacaoOntem: 2,
  novosClientes: 8,
  percentualNovosMes: 14,
  servicosOferecidos: 7,
  novosServicos: 1,
  receitaDia: 970,
  percentualReceita: 8
};

const AdminDashboardPage = () => {
  const { clientes, agendamentos } = useApp();
  const [estatisticas, setEstatisticas] = useState(ESTATISTICAS);
  const { toast } = useToast();
  
  // Em uma implementação real, você buscaria dados da API/banco de dados
  useEffect(() => {
    // Simulação de carregamento de dados 
    const carregarDados = () => {
      try {
        // Aqui seria uma chamada real à API
        console.log('Carregando dados reais da API/banco...');
        
        // Atualizar estatísticas com base nos dados reais
        setEstatisticas(prev => ({
          ...prev,
          novosClientes: clientes.length,
        }));
        
        // Dados simulados carregados com sucesso
        toast({
          title: "Dados atualizados",
          description: "Os dados do dashboard foram atualizados com sucesso.",
        });
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Erro ao carregar dados",
          description: "Não foi possível atualizar os dados do dashboard.",
        });
      }
    };
    
    carregarDados();
    
    // Para simular atualização periódica de dados
    const intervalo = setInterval(carregarDados, 300000); // Atualiza a cada 5 minutos
    
    return () => clearInterval(intervalo);
  }, [toast, clientes]);
  
  // Formatar número como dinheiro (R$)
  const formatarMoeda = (valor: number) => {
    return valor.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Bem-vindo à área administrativa da Barber Shop.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Agendamentos Hoje</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{estatisticas.agendamentosHoje}</div>
              <p className="text-xs text-muted-foreground">
                +{estatisticas.comparacaoOntem} comparado a ontem
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Clientes Cadastrados</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{clientes.length}</div>
              <p className="text-xs text-muted-foreground">
                +{estatisticas.percentualNovosMes}% este mês
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Serviços Oferecidos</CardTitle>
              <Scissors className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{estatisticas.servicosOferecidos}</div>
              <p className="text-xs text-muted-foreground">
                +{estatisticas.novosServicos} desde a semana passada
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Receita do Dia</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatarMoeda(estatisticas.receitaDia)}</div>
              <p className="text-xs text-muted-foreground">
                +{estatisticas.percentualReceita}% comparado a ontem
              </p>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Próximos Agendamentos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Carlos Silva</p>
                    <p className="text-sm text-muted-foreground">Corte + Barba</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">09:30</p>
                    <p className="text-sm text-muted-foreground">Hoje</p>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">André Oliveira</p>
                    <p className="text-sm text-muted-foreground">Corte</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">10:15</p>
                    <p className="text-sm text-muted-foreground">Hoje</p>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Ricardo Mendes</p>
                    <p className="text-sm text-muted-foreground">Barba</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">11:00</p>
                    <p className="text-sm text-muted-foreground">Hoje</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Clientes Recentes</CardTitle>
                <div className="rounded-full bg-barber-primary/10 p-2">
                  <UserPlus className="h-4 w-4 text-barber-primary" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ClientesRecentes />
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl">Serviços Mais Populares</CardTitle>
                <CardDescription>Análise dos serviços mais requisitados</CardDescription>
              </div>
              <div className="rounded-full bg-barber-primary/10 p-2">
                <Scissors className="h-5 w-5 text-barber-primary" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <p className="font-medium">Corte Completo</p>
                <p className="font-medium">42%</p>
              </div>
              <div className="flex justify-between items-center">
                <p className="font-medium">Corte + Barba</p>
                <p className="font-medium">28%</p>
              </div>
              <div className="flex justify-between items-center">
                <p className="font-medium">Barba</p>
                <p className="font-medium">15%</p>
              </div>
              <div className="flex justify-between items-center">
                <p className="font-medium">Outros</p>
                <p className="font-medium">15%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboardPage;
