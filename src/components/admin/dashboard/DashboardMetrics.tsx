
import React from 'react';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Calendar, Users, Scissors, DollarSign } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  subtext: string;
}

const MetricCard = ({ title, value, icon, subtext }: MetricCardProps) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      {icon}
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      <p className="text-xs text-muted-foreground">{subtext}</p>
    </CardContent>
  </Card>
);

interface DashboardMetricsProps {
  estatisticas: {
    agendamentosHoje: number;
    comparacaoOntem: number;
    servicosOferecidos: number;
    novosServicos: number;
    receitaDia: number;
    percentualReceita: number;
    percentualNovosMes: number;
  };
  clientesCount: number;
  formatarMoeda: (valor: number) => string;
}

const DashboardMetrics = ({ estatisticas, clientesCount, formatarMoeda }: DashboardMetricsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <MetricCard
        title="Agendamentos Hoje"
        value={estatisticas.agendamentosHoje}
        icon={<Calendar className="h-4 w-4 text-muted-foreground" />}
        subtext={`+${estatisticas.comparacaoOntem} comparado a ontem`}
      />
      
      <MetricCard
        title="Clientes Cadastrados"
        value={clientesCount}
        icon={<Users className="h-4 w-4 text-muted-foreground" />}
        subtext={`+${estatisticas.percentualNovosMes}% este mês`}
      />
      
      <MetricCard
        title="Serviços Oferecidos"
        value={estatisticas.servicosOferecidos}
        icon={<Scissors className="h-4 w-4 text-muted-foreground" />}
        subtext={`+${estatisticas.novosServicos} desde a semana passada`}
      />
      
      <MetricCard
        title="Receita do Dia"
        value={formatarMoeda(estatisticas.receitaDia)}
        icon={<DollarSign className="h-4 w-4 text-muted-foreground" />}
        subtext={`+${estatisticas.percentualReceita}% comparado a ontem`}
      />
    </div>
  );
};

export default DashboardMetrics;
