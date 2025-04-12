
import React from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { User, Timer, Clock, Info } from 'lucide-react';
import { WaitListItem } from '@/contexts/QueueContext';

interface ClienteInfoDisplayProps {
  clientInfo: WaitListItem;
  timeLeft: number | null;
}

const ClienteInfoDisplay: React.FC<ClienteInfoDisplayProps> = ({ clientInfo, timeLeft }) => {
  // Format the time estimate
  const formatTimeEstimate = (minutes: number) => {
    if (minutes < 60) {
      return `${minutes} minutos`;
    }
    
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    
    return `${hours} ${hours === 1 ? 'hora' : 'horas'}${mins > 0 ? ` e ${mins} minutos` : ''}`;
  };

  return (
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
          
          {clientInfo.status === 'current' ? (
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
      
      {timeLeft !== null && clientInfo.status === 'waiting' && (
        <div className="p-4 border rounded-md bg-gray-50">
          <div className="flex items-center space-x-2 mb-2">
            <Clock className="h-5 w-5 text-barber-primary" />
            <h3 className="font-semibold text-lg">Tempo estimado</h3>
          </div>
          <p className="pl-7">
            Aproximadamente {formatTimeEstimate(timeLeft)} de espera
          </p>
          <p className="pl-7 text-sm text-gray-500 mt-1">
            Horário previsto: {clientInfo.horaPrevista}
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
  );
};

export default ClienteInfoDisplay;
