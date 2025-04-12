
import React from 'react';
import AdminLayout from '@/components/layout/AdminLayout';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { useQueue } from '@/contexts/QueueContext';
import { useToast } from '@/hooks/use-toast';
import AddClientForm from '@/components/admin/queue/AddClientForm';
import CurrentClient from '@/components/admin/queue/CurrentClient';
import QueueList from '@/components/admin/queue/QueueList';

const AdminQueuePage = () => {
  const { toast } = useToast();
  const { queue, removeFromQueue, currentPosition, moveNext } = useQueue();
  
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
          <AddClientForm />
          
          {/* Cliente Atual */}
          <CurrentClient onRemoveClient={handleRemoveFromQueue} />
          
          {/* Fila de Espera */}
          <QueueList 
            clients={sortedQueue} 
            onRemoveClient={handleRemoveFromQueue} 
          />
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminQueuePage;
