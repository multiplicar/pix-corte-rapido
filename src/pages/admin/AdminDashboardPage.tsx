
import AdminLayout from '@/components/layout/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Users, Scissors, DollarSign } from 'lucide-react';

const AdminDashboardPage = () => {
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
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">+2 comparado a ontem</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Novos Clientes</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">+14% este mês</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Serviços Oferecidos</CardTitle>
              <Scissors className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">7</div>
              <p className="text-xs text-muted-foreground">+1 desde a semana passada</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Receita do Dia</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">R$ 970,00</div>
              <p className="text-xs text-muted-foreground">+8% comparado a ontem</p>
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
              <CardTitle>Serviços Mais Populares</CardTitle>
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
      </div>
    </AdminLayout>
  );
};

export default AdminDashboardPage;
