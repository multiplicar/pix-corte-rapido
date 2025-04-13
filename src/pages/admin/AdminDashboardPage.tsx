
import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/layout/AdminLayout';
import { UserPlus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useApp } from '@/contexts/AppContext';
import ClientesRecentes from '@/components/admin/ClientesRecentes';
import DashboardMetrics from '@/components/admin/dashboard/DashboardMetrics';
import UpcomingAppointments from '@/components/admin/dashboard/UpcomingAppointments';
import PopularServices from '@/components/admin/dashboard/PopularServices';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';

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

// Dados simulados para agendamentos próximos
const UPCOMING_APPOINTMENTS = [
  { clientName: 'Carlos Silva', service: 'Corte + Barba', time: '09:30', date: 'Hoje' },
  { clientName: 'André Oliveira', service: 'Corte', time: '10:15', date: 'Hoje' },
  { clientName: 'Ricardo Mendes', service: 'Barba', time: '11:00', date: 'Hoje' }
];

// Dados simulados para serviços populares
const POPULAR_SERVICES = [
  { name: 'Corte Completo', percentage: 42 },
  { name: 'Corte + Barba', percentage: 28 },
  { name: 'Barba', percentage: 15 },
  { name: 'Outros', percentage: 15 }
];

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
        
        <DashboardMetrics 
          estatisticas={estatisticas} 
          clientesCount={clientes.length} 
          formatarMoeda={formatarMoeda} 
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <UpcomingAppointments appointments={UPCOMING_APPOINTMENTS} />
          
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
        
        <PopularServices services={POPULAR_SERVICES} />
      </div>
    </AdminLayout>
  );
};

export default AdminDashboardPage;
