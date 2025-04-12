
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Clock, Timer } from 'lucide-react';
import { useQueue, WaitListItem } from '@/contexts/QueueContext';

const WaitingQueueDisplay: React.FC = () => {
  const { queue, currentPosition } = useQueue();
  
  const waitingItems = queue.filter(item => item.status === 'waiting');
  
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-xl font-bold flex items-center">
            <Timer className="mr-2 h-5 w-5 text-barber-accent" />
            Fila de Espera
          </CardTitle>
        </CardHeader>
        <CardContent>
          {currentPosition ? (
            <div className="mb-6 p-3 bg-green-50 border border-green-200 rounded-md">
              <h3 className="text-sm font-medium text-green-800 mb-1">Em atendimento agora:</h3>
              <div className="flex items-center">
                <User className="h-4 w-4 mr-2 text-green-600" />
                <span className="font-semibold">{currentPosition.nome}</span>
                <span className="mx-2 text-gray-400">•</span>
                <span className="text-sm text-gray-600">{currentPosition.servico.nome}</span>
              </div>
            </div>
          ) : (
            <div className="mb-6 p-3 bg-blue-50 border border-blue-200 rounded-md">
              <p className="text-blue-600 text-sm">Nenhum cliente em atendimento no momento</p>
            </div>
          )}
          
          {waitingItems.length > 0 ? (
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-gray-500">Próximos na fila:</h3>
              {waitingItems.map((item) => (
                <div 
                  key={item.id}
                  className="p-3 border rounded-md hover:bg-gray-50 transition-colors"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex items-center">
                      <div className="bg-barber-primary text-white rounded-full w-6 h-6 inline-flex items-center justify-center mr-2 flex-shrink-0">
                        {item.posicao}
                      </div>
                      <div>
                        <p className="font-medium">{item.nome}</p>
                        <p className="text-sm text-gray-500">{item.servico.nome}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center text-gray-600 text-sm">
                        <Clock className="h-3 w-3 mr-1" />
                        {item.horaPrevista}
                      </div>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {item.estimatedTime} min
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center p-6 bg-gray-50 rounded-md">
              <p className="text-gray-500">Não há clientes na fila de espera</p>
            </div>
          )}
          
          <div className="mt-4 pt-3 border-t text-xs text-gray-500">
            <p>Os tempos são estimados e podem variar de acordo com o andamento dos serviços.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WaitingQueueDisplay;
