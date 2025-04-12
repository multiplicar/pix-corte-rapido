
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ToastAction } from '@/components/ui/toast';
import { useToast } from '@/hooks/use-toast';
import { Plus, UserPlus } from 'lucide-react';
import { useQueue } from '@/contexts/QueueContext';
import { useApp } from '@/contexts/AppContext';

const AddClientForm = () => {
  const { toast } = useToast();
  const { addToQueue } = useQueue();
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
    
    // Extract duration in minutes from the tempo string
    const duracao = parseInt(selectedService.tempo.match(/\d+/)?.[0] || "30");
    
    const id = addToQueue(newClient.nome, {
      nome: selectedService.nome,
      duracao: duracao
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

  return (
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
                    {servico.nome} ({servico.tempo})
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
  );
};

export default AddClientForm;
