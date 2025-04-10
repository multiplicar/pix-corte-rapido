
import { useState, useEffect } from 'react';
import AdminLayout from '@/components/layout/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Eye, EyeOff, CreditCard, Store, Clock, AlertTriangle, Link, ExternalLink } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { isMercadoPagoConfigured } from '@/lib/mercadoPago';

const AdminConfigPage = () => {
  // Estado para as configurações de pagamento do Mercado Pago
  const [mercadoPagoConfig, setMercadoPagoConfig] = useState({
    apiKey: '',
    accessToken: '',
    publicKey: '',
  });
  
  // Estado para mostrar/ocultar senha
  const [mostrarSenhas, setMostrarSenhas] = useState({
    apiKey: false,
    accessToken: false,
  });
  
  // Estado para configurações da loja
  const [configLoja, setConfigLoja] = useState({
    nomeEstabelecimento: 'Barber Shop',
    telefone: '(11) 98765-4321',
    endereco: 'Rua das Barbearias, 123 - São Paulo, SP',
    horarioAbertura: '09:00',
    horarioFechamento: '19:00',
    intervaloAgendamento: '30',
  });
  
  // Estado para verificar se o Mercado Pago está configurado
  const [isMPConfigured, setIsMPConfigured] = useState(false);
  
  // Carregar configurações do localStorage
  useEffect(() => {
    const savedMercadoPago = localStorage.getItem('mercadoPagoConfig');
    if (savedMercadoPago) {
      setMercadoPagoConfig(JSON.parse(savedMercadoPago));
    }
    
    const savedConfigLoja = localStorage.getItem('configLoja');
    if (savedConfigLoja) {
      setConfigLoja(JSON.parse(savedConfigLoja));
    }
    
    // Verifica se o Mercado Pago está configurado
    setIsMPConfigured(isMercadoPagoConfigured());
  }, []);
  
  // Manipular mudanças nas credenciais do Mercado Pago
  const handleMercadoPagoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setMercadoPagoConfig(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Salvar configurações do Mercado Pago
  const handleSaveMercadoPago = () => {
    // Verifica se todos os campos obrigatórios estão preenchidos
    if (!mercadoPagoConfig.publicKey || !mercadoPagoConfig.accessToken || !mercadoPagoConfig.apiKey) {
      toast.error('Por favor, preencha todas as credenciais do Mercado Pago');
      return;
    }
    
    localStorage.setItem('mercadoPagoConfig', JSON.stringify(mercadoPagoConfig));
    toast.success('Credenciais do Mercado Pago salvas com sucesso!');
    setIsMPConfigured(true);
  };
  
  // Manipular mudanças nas configurações da loja
  const handleLojaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setConfigLoja(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Salvar configurações da loja
  const handleSaveLoja = () => {
    localStorage.setItem('configLoja', JSON.stringify(configLoja));
    toast.success('Configurações da loja salvas com sucesso!');
  };
  
  // Alternar visibilidade da senha
  const toggleMostrarSenha = (field: 'apiKey' | 'accessToken') => {
    setMostrarSenhas(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };
  
  const openMercadoPagoDocsInNewTab = () => {
    window.open('https://www.mercadopago.com.br/developers/pt/docs/checkout-pro/integrate-checkout-pro', '_blank');
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Configurações</h1>
        <p className="text-muted-foreground">Gerencie as configurações da barbearia.</p>
        
        <Tabs defaultValue="pagamentos">
          <TabsList className="mb-4">
            <TabsTrigger value="pagamentos" className="flex items-center">
              <CreditCard className="mr-2 h-4 w-4" />
              Pagamentos
            </TabsTrigger>
            <TabsTrigger value="loja" className="flex items-center">
              <Store className="mr-2 h-4 w-4" />
              Dados da Loja
            </TabsTrigger>
            <TabsTrigger value="horarios" className="flex items-center">
              <Clock className="mr-2 h-4 w-4" />
              Horários
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="pagamentos">
            <Card>
              <CardHeader>
                <CardTitle>Credenciais do Mercado Pago</CardTitle>
                <CardDescription>
                  Configure suas credenciais do Mercado Pago para processar pagamentos. 
                  Estas informações são necessárias para receber pagamentos PIX e são salvas localmente.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {!isMPConfigured && (
                  <Alert variant="warning" className="mb-4">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>Configuração necessária</AlertTitle>
                    <AlertDescription>
                      As credenciais do Mercado Pago não estão configuradas. Os clientes não poderão realizar 
                      pagamentos via PIX até que essas credenciais sejam configuradas.
                    </AlertDescription>
                  </Alert>
                )}
                
                <div className="flex justify-end mb-4">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={openMercadoPagoDocsInNewTab}
                    className="flex items-center text-xs"
                  >
                    <ExternalLink className="h-3 w-3 mr-1" />
                    Documentação do Mercado Pago
                  </Button>
                </div>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="publicKey">Chave Pública</Label>
                    <Input
                      id="publicKey"
                      name="publicKey"
                      placeholder="APP_USR-..."
                      value={mercadoPagoConfig.publicKey}
                      onChange={handleMercadoPagoChange}
                    />
                    <p className="text-xs text-muted-foreground">
                      A chave pública é usada para integração no frontend. Você pode encontrá-la nas configurações 
                      da sua conta do Mercado Pago, na seção de Credenciais.
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="apiKey">Chave de API</Label>
                    <div className="relative">
                      <Input
                        id="apiKey"
                        name="apiKey"
                        type={mostrarSenhas.apiKey ? "text" : "password"}
                        placeholder="TEST-1234-5678-9101-1121"
                        value={mercadoPagoConfig.apiKey}
                        onChange={handleMercadoPagoChange}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-2 top-1/2 transform -translate-y-1/2"
                        onClick={() => toggleMostrarSenha('apiKey')}
                      >
                        {mostrarSenhas.apiKey ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      A chave de API é usada para autenticar requisições ao Mercado Pago. Você encontra esta chave 
                      no Painel de Desenvolvedores do Mercado Pago.
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="accessToken">Token de Acesso</Label>
                    <div className="relative">
                      <Input
                        id="accessToken"
                        name="accessToken"
                        type={mostrarSenhas.accessToken ? "text" : "password"}
                        placeholder="APP_USR-1234567-..."
                        value={mercadoPagoConfig.accessToken}
                        onChange={handleMercadoPagoChange}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-2 top-1/2 transform -translate-y-1/2"
                        onClick={() => toggleMostrarSenha('accessToken')}
                      >
                        {mostrarSenhas.accessToken ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      O token de acesso é necessário para processar pagamentos. Este é o token privado que você pode 
                      encontrar na seção de Credenciais da sua conta de Mercado Pago.
                    </p>
                  </div>
                  
                  <Button 
                    onClick={handleSaveMercadoPago}
                    className="bg-barber-accent hover:bg-barber-accent/90"
                  >
                    Salvar Credenciais
                  </Button>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col">
                <p className="text-xs text-muted-foreground mt-4">
                  <strong>Como obter credenciais:</strong> Acesse sua conta do Mercado Pago, vá para o painel de desenvolvedores 
                  e crie uma aplicação para gerar estas chaves. Você precisará destas credenciais para processar 
                  pagamentos via PIX.
                </p>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="loja">
            <Card>
              <CardHeader>
                <CardTitle>Informações da Barbearia</CardTitle>
                <CardDescription>
                  Configure as informações básicas da sua barbearia. Estas informações serão exibidas para os clientes.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="nomeEstabelecimento">Nome do Estabelecimento</Label>
                    <Input
                      id="nomeEstabelecimento"
                      name="nomeEstabelecimento"
                      value={configLoja.nomeEstabelecimento}
                      onChange={handleLojaChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="telefone">Telefone</Label>
                    <Input
                      id="telefone"
                      name="telefone"
                      value={configLoja.telefone}
                      onChange={handleLojaChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="endereco">Endereço</Label>
                    <Input
                      id="endereco"
                      name="endereco"
                      value={configLoja.endereco}
                      onChange={handleLojaChange}
                    />
                  </div>
                  
                  <Button 
                    onClick={handleSaveLoja}
                    className="bg-barber-accent hover:bg-barber-accent/90"
                  >
                    Salvar Informações
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="horarios">
            <Card>
              <CardHeader>
                <CardTitle>Horários de Funcionamento</CardTitle>
                <CardDescription>
                  Configure os horários de funcionamento da barbearia e o intervalo entre agendamentos.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="horarioAbertura">Horário de Abertura</Label>
                      <Input
                        id="horarioAbertura"
                        name="horarioAbertura"
                        type="time"
                        value={configLoja.horarioAbertura}
                        onChange={handleLojaChange}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="horarioFechamento">Horário de Fechamento</Label>
                      <Input
                        id="horarioFechamento"
                        name="horarioFechamento"
                        type="time"
                        value={configLoja.horarioFechamento}
                        onChange={handleLojaChange}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="intervaloAgendamento">Intervalo entre Agendamentos (minutos)</Label>
                    <Input
                      id="intervaloAgendamento"
                      name="intervaloAgendamento"
                      type="number"
                      min="5"
                      step="5"
                      value={configLoja.intervaloAgendamento}
                      onChange={handleLojaChange}
                    />
                    <p className="text-xs text-muted-foreground">
                      Defina o intervalo mínimo entre agendamentos. Recomendamos 15, 30 ou 60 minutos.
                    </p>
                  </div>
                  
                  <Button 
                    onClick={handleSaveLoja}
                    className="bg-barber-accent hover:bg-barber-accent/90"
                  >
                    Salvar Horários
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default AdminConfigPage;
