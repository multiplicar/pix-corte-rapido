
import React, { useState } from 'react';
import AdminLayout from '@/components/layout/AdminLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ToastAction } from '@/components/ui/toast';
import { useToast } from '@/hooks/use-toast';
import { Check, Plus, UserPlus, UserX, Clock, Timer, ArrowRight } from 'lucide-react';
import { useQueue, WaitListItem } from '@/contexts/QueueContext';
import { Separator } from '@/components/ui/separator';
import { useApp } from '@/contexts/AppContext';

const AdminQueuePage = () => {
  const { toast } = useToast();
  const { queue, updateQueue, addToQueue, removeFromQueue, currentPosition, moveNext } = useQueue();
  const { servicos } = useApp();
  
  const [newClient, setNewClient] = useState({
    nome: '',
    servico: '',
  });
  
  const handleAddToQueue = () => {
    if (!newClient.nome || !newClient.servico) {
      toast({
        title: "Campos incompletos",
        description: "Por favor, preencha o nome do cliente e selecione um serviço.",
        variant: "destructive",
      });
      return;
    }
    
    const selectedService = servicos.find(s => s.id === newClient.servico);
    if (!selectedService) {
      toast({
        description: "Serviço inválido selecionado.",
        variant: "destructive",
      });
      return;
    }
    
    const id = addToQueue(newClient.nome, {
      nome: selectedService.nome,
      duracao: selectedService.duracao
    });
    
    toast({
      title: "Cliente adicionado à fila",
      description: `${newClient.nome} foi adicionado à fila de espera.`,
      action: (
        <ToastAction altText="Código">ID: {id}</ToastAction>
      ),
    });
    
    setNewClient({
      nome: '',
      servico: '',
    });
  };
  
  const handleRemoveFromQueue = (id: string, name: string) => {
    removeFromQueue(id);
    
    toast({
      title: "Cliente removido",
      description: `${name} foi removido da fila de espera.`,
    });
  };
  
  const handleMoveNext = () => {
    if (!currentPosition) {
      toast({
        description: "Não há clientes na fila de espera.",
        variant: "destructive",
      });
      return;
    }
    
    const currentName = currentPosition.nome;
    moveNext();
    
    toast({
      title: "Próximo cliente",
      description: `Atendimento de ${currentName} finalizado. Próximo cliente chamado.`,
    });
  };
  
  const sortedQueue = [...queue].sort((a, b) => {
    // First sort by status (current first, then waiting, then done)
    const statusOrder = { current: 0, waiting: 1, done: 2 };
    const statusDiff = statusOrder[a.status] - statusOrder[b.status];
    if (statusDiff !== 0) return statusDiff;
    
    // Then sort by position
    return a.posicao - b.posicao;
  });
  
  return (
    <AdminLayout>
      <div className="container space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Gerenciar Fila de Espera</h1>
          
          <div className="flex gap-2">
            <Button 
              onClick={handleMoveNext}
              disabled={!currentPosition}
              className="bg-barber-primary hover:bg-barber-primary/90"
            >
              <Check className="mr-2 h-4 w-4" />
              Próximo Cliente
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Adicionar Cliente */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <UserPlus className="mr-2 h-5 w-5 text-barber-accent" />
                Adicionar Cliente
              </CardTitle>
              <CardDescription>
                Adicione um novo cliente à fila de espera
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="nome">Nome do Cliente</Label>
                  <Input
                    id="nome"
                    value={newClient.nome}
                    onChange={(e) => setNewClient({...newClient, nome: e.target.value})}
                    placeholder="Nome completo"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="servico">Serviço</Label>
                  <Select
                    value={newClient.servico}
                    onValueChange={(value) => setNewClient({...newClient, servico: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um serviço" />
                    </SelectTrigger>
                    <SelectContent>
                      {servicos.map((servico) => (
                        <SelectItem key={servico.id} value={servico.id}>
                          {servico.nome} ({servico.duracao} min)
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={handleAddToQueue}
                className="w-full bg-barber-accent hover:bg-barber-accent/90"
              >
                <Plus className="mr-2 h-4 w-4" />
                Adicionar à Fila
              </Button>
            </CardFooter>
          </Card>
          
          {/* Cliente Atual */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Timer className="mr-2 h-5 w-5 text-green-600" />
                Em Atendimento
              </CardTitle>
              <CardDescription>
                Cliente sendo atendido no momento
              </CardDescription>
            </CardHeader>
            <CardContent>
              {currentPosition ? (
                <div className="p-4 border rounded-md bg-green-50">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-lg">{currentPosition.nome}</h3>
                      <p className="text-sm text-gray-600">{currentPosition.servico.nome}</p>
                      <div className="flex items-center mt-1 text-sm text-gray-500">
                        <Clock className="h-3 w-3 mr-1" />
                        <span>{currentPosition.servico.duracao} minutos</span>
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleRemoveFromQueue(currentPosition.id, currentPosition.nome)}
                      className="text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600"
                    >
                      <UserX className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="mt-4 pt-3 border-t border-green-200">
                    <Button 
                      onClick={handleMoveNext}
                      className="w-full bg-green-600 hover:bg-green-700"
                    >
                      <Check className="mr-2 h-4 w-4" />
                      Finalizar Atendimento
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="p-6 text-center bg-gray-50 rounded-md">
                  <p className="text-gray-500">Nenhum cliente em atendimento</p>
                  <Button
                    variant="link"
                    className="mt-2 text-barber-accent"
                    onClick={() => {
                      const waitingClient = queue.find(i => i.status === 'waiting');
                      if (waitingClient) moveNext();
                    }}
                    disabled={!queue.some(i => i.status === 'waiting')}
                  >
                    Chamar próximo cliente
                    <ArrowRight className="ml-1 h-3 w-3" />
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
          
          {/* Fila de Espera */}
          <Card className="md:row-span-2">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Timer className="mr-2 h-5 w-5 text-barber-primary" />
                Fila de Espera
              </CardTitle>
              <CardDescription>
                Clientes aguardando atendimento
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
                {sortedQueue.length > 0 ? (
                  sortedQueue.map((client) => (
                    <div 
                      key={client.id}
                      className={`p-3 border rounded-md transition-colors ${
                        client.status === 'current' 
                          ? 'bg-green-50 border-green-200' 
                          : client.status === 'done'
                            ? 'bg-gray-100 border-gray-200 opacity-60'
                            : 'hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex items-center">
                          <div className={`rounded-full w-6 h-6 inline-flex items-center justify-center mr-2 flex-shrink-0 ${
                            client.status === 'current' 
                              ? 'bg-green-600 text-white' 
                              : client.status === 'done'
                                ? 'bg-gray-400 text-white'
                                : 'bg-barber-primary text-white'
                          }`}>
                            {client.posicao}
                          </div>
                          <div>
                            <p className="font-medium">{client.nome}</p>
                            <div className="flex items-center text-sm text-gray-500">
                              <span>{client.servico.nome}</span>
                              <span className="mx-1">•</span>
                              <Clock className="h-3 w-3 mr-1" />
                              <span>{client.servico.duracao} min</span>
                            </div>
                          </div>
                        </div>
                        
                        {client.status !== 'done' && (
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleRemoveFromQueue(client.id, client.nome)}
                            className="text-red-500 hover:bg-red-50 hover:text-red-600"
                          >
                            <UserX className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                      
                      {client.status === 'waiting' && (
                        <div className="mt-2 text-right">
                          <p className="text-xs text-gray-500">
                            Previsão: {client.horaPrevista}
                          </p>
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="p-6 text-center bg-gray-50 rounded-md">
                    <p className="text-gray-500">Não há clientes na fila de espera</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminQueuePage;
