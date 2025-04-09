
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useApp, WaitListItem } from '@/contexts/AppContext';
import { Timer, User, Clock, Info } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const FilaEsperaPage = () => {
  const [waitId, setWaitId] = useState('');
  const [clientInfo, setClientInfo] = useState<WaitListItem | null>(null);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const { waitList, getWaitListPosition } = useApp();
  const { toast } = useToast();
  const navigate = useNavigate();

  // Verifica se há um ID na URL ou localStorage
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    
    if (id) {
      setWaitId(id);
      checkWaitListPosition(id);
    } else {
      const savedId = localStorage.getItem('waitListId');
      if (savedId) {
        setWaitId(savedId);
        checkWaitListPosition(savedId);
      }
    }
  }, [waitList]);

  const checkWaitListPosition = (id: string) => {
    const client = waitList.find(item => item.id === id);
    
    if (client) {
      setClientInfo(client);
      
      // Calcular tempo estimado baseado na posição
      // Assumindo que cada cliente leva em média 30 minutos
      const timeEstimate = (client.posicao - 1) * client.estimatedTime;
      setTimeLeft(timeEstimate);
      
      // Salvar ID no localStorage
      localStorage.setItem('waitListId', id);
    } else {
      setClientInfo(null);
      setTimeLeft(null);
    }
  };

  const handleCheck = () => {
    if (!waitId.trim()) {
      toast({
        title: "ID não informado",
        description: "Por favor, informe o código da fila de espera.",
        variant: "destructive",
      });
      return;
    }
    
    checkWaitListPosition(waitId);
    
    if (!clientInfo) {
      toast({
        title: "Código não encontrado",
        description: "O código informado não está na fila de espera.",
        variant: "destructive",
      });
    }
  };

  // Formatar o tempo estimado
  const formatTimeEstimate = (minutes: number) => {
    if (minutes < 60) {
      return `${minutes} minutos`;
    }
    
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    
    return `${hours} ${hours === 1 ? 'hora' : 'horas'}${mins > 0 ? ` e ${mins} minutos` : ''}`;
  };

  return (
    <Layout>
      <div className="container mx-auto py-10 px-4">
        <div className="max-w-xl mx-auto">
          <h1 className="text-3xl font-bold text-barber-primary mb-6">
            Fila de Espera
          </h1>
          
          <Card>
            <CardHeader>
              <CardTitle>Consultar Posição na Fila</CardTitle>
              <CardDescription>
                Informe o código recebido ao entrar na fila de espera
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex space-x-2">
                <Input
                  value={waitId}
                  onChange={(e) => setWaitId(e.target.value)}
                  placeholder="Código da fila"
                  className="flex-1"
                />
                <Button onClick={handleCheck} className="bg-barber-accent hover:bg-amber-600 text-black">
                  Consultar
                </Button>
              </div>
              
              {clientInfo && (
                <div className="mt-6 space-y-4">
                  <Alert className="bg-barber-primary/10 border-barber-primary">
                    <User className="h-4 w-4 text-barber-primary" />
                    <AlertTitle>Olá, {clientInfo.nome}</AlertTitle>
                    <AlertDescription>
                      Você está na fila de espera para {clientInfo.servico.nome}.
                    </AlertDescription>
                  </Alert>
                  
                  <div className="p-4 border rounded-md bg-amber-50">
                    <div className="flex items-center space-x-2 mb-2">
                      <Timer className="h-5 w-5 text-barber-accent" />
                      <h3 className="font-semibold text-lg">Sua posição</h3>
                    </div>
                    <div className="pl-7">
                      <p className="text-3xl font-bold text-barber-red">
                        {clientInfo.posicao}º lugar na fila
                      </p>
                      
                      {clientInfo.posicao === 1 ? (
                        <p className="mt-2 text-green-600 font-semibold">
                          É a sua vez! Dirija-se ao barbeiro.
                        </p>
                      ) : (
                        <p className="mt-2">
                          Há {clientInfo.posicao - 1} {clientInfo.posicao - 1 === 1 ? 'pessoa' : 'pessoas'} na sua frente.
                        </p>
                      )}
                    </div>
                  </div>
                  
                  {timeLeft !== null && clientInfo.posicao > 1 && (
                    <div className="p-4 border rounded-md bg-gray-50">
                      <div className="flex items-center space-x-2 mb-2">
                        <Clock className="h-5 w-5 text-barber-primary" />
                        <h3 className="font-semibold text-lg">Tempo estimado</h3>
                      </div>
                      <p className="pl-7">
                        Aproximadamente {formatTimeEstimate(timeLeft)} de espera
                      </p>
                    </div>
                  )}
                  
                  <div className="p-4 border rounded-md bg-blue-50">
                    <div className="flex items-center space-x-2 mb-2">
                      <Info className="h-5 w-5 text-blue-600" />
                      <h3 className="font-semibold text-lg">Dica</h3>
                    </div>
                    <p className="pl-7">
                      Guarde seu código de consulta: <span className="font-mono bg-gray-100 px-2 py-1 rounded">{clientInfo.id}</span>
                    </p>
                  </div>
                </div>
              )}
              
              {waitId && !clientInfo && (
                <Alert className="mt-4 border-red-400 bg-red-50">
                  <AlertTitle>Código não encontrado</AlertTitle>
                  <AlertDescription>
                    Não encontramos nenhum cliente na fila com este código. Verifique e tente novamente.
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
            <CardFooter>
              <Button 
                variant="outline" 
                onClick={() => navigate('/agendar')}
                className="w-full"
              >
                Agendar um horário
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default FilaEsperaPage;
