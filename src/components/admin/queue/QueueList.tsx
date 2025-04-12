
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Clock, Timer, UserX } from 'lucide-react';
import { WaitListItem } from '@/contexts/QueueContext';

interface QueueListProps {
  clients: WaitListItem[];
  onRemoveClient: (id: string, name: string) => void;
}

const QueueList: React.FC<QueueListProps> = ({ clients, onRemoveClient }) => {
  return (
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
          {clients.length > 0 ? (
            clients.map((client) => (
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
                      onClick={() => onRemoveClient(client.id, client.nome)}
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
  );
};

export default QueueList;
