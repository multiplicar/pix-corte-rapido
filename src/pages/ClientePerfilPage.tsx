
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, ClipboardList, UserRound, LogOut } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Cliente {
  nome?: string;
  email: string;
  isLoggedIn: boolean;
}

const ClientePerfilPage = () => {
  const [cliente, setCliente] = useState<Cliente | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Verificar se o cliente está logado
    const clienteData = localStorage.getItem('cliente');
    
    if (clienteData) {
      setCliente(JSON.parse(clienteData));
    } else {
      // Redirecionar para a página de login se não estiver logado
      navigate('/cliente/login');
      toast({
        title: "Acesso restrito",
        description: "Faça login para acessar sua área de cliente.",
        variant: "destructive",
      });
    }
    
    setIsLoading(false);
  }, [navigate, toast]);

  const handleLogout = () => {
    localStorage.removeItem('cliente');
    toast({
      title: "Logout realizado",
      description: "Você saiu da sua conta com sucesso.",
    });
    navigate('/');
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto py-20">
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-barber-accent"></div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto py-10 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-barber-primary">
                Minha Conta
              </h1>
              <p className="text-gray-600">
                Bem-vindo, {cliente?.nome || cliente?.email.split('@')[0]}
              </p>
            </div>
            <Button 
              variant="outline"
              className="flex items-center gap-2"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4" />
              Sair
            </Button>
          </div>

          <Tabs defaultValue="perfil" className="w-full">
            <TabsList className="grid grid-cols-3 mb-6">
              <TabsTrigger value="perfil" className="flex items-center gap-2">
                <UserRound className="h-4 w-4" />
                <span>Perfil</span>
              </TabsTrigger>
              <TabsTrigger value="agendamentos" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>Agendamentos</span>
              </TabsTrigger>
              <TabsTrigger value="historico" className="flex items-center gap-2">
                <ClipboardList className="h-4 w-4" />
                <span>Histórico</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="perfil">
              <Card>
                <CardHeader>
                  <CardTitle>Meus Dados</CardTitle>
                  <CardDescription>
                    Visualize e atualize suas informações pessoais.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Nome</p>
                      <p className="text-lg">{cliente?.nome || "Não informado"}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Email</p>
                      <p className="text-lg">{cliente?.email}</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="bg-barber-accent hover:bg-amber-600 text-black">
                    Editar Perfil
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="agendamentos">
              <Card>
                <CardHeader>
                  <CardTitle>Agendamentos Ativos</CardTitle>
                  <CardDescription>
                    Seus agendamentos futuros na Barber Shop.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8 text-gray-500">
                    <Calendar className="h-12 w-12 mx-auto mb-2 text-gray-400" />
                    <p>Você não possui agendamentos ativos.</p>
                    <Button 
                      asChild
                      className="mt-4 bg-barber-red hover:bg-red-700"
                    >
                      <a href="/agendar">Agendar novo corte</a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="historico">
              <Card>
                <CardHeader>
                  <CardTitle>Histórico de Serviços</CardTitle>
                  <CardDescription>
                    Todos os serviços que você já realizou na Barber Shop.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8 text-gray-500">
                    <ClipboardList className="h-12 w-12 mx-auto mb-2 text-gray-400" />
                    <p>Seu histórico de serviços aparecerá aqui.</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default ClientePerfilPage;
