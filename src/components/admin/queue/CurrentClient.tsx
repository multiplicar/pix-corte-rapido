
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Clock, Check, UserX, Timer, ArrowRight } from 'lucide-react';
import { useQueue, WaitListItem } from '@/contexts/QueueContext';
import { useToast } from '@/hooks/use-toast';

interface CurrentClientProps {
  onRemoveClient: (id: string, name: string) => void;
}

const CurrentClient: React.FC<CurrentClientProps> = ({ onRemoveClient }) => {
  const { toast } = useToast();
  const { currentPosition, moveNext, queue } = useQueue();
  
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

  return (
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
                onClick={() => onRemoveClient(currentPosition.id, currentPosition.nome)}
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
  );
};

export default CurrentClient;
