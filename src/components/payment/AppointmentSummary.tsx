
import React from 'react';
import { CalendarIcon } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

interface Servico {
  nome: string;
  preco: number;
}

interface AppointmentSummaryProps {
  servico?: Servico;
  data?: Date;
  hora?: string;
  nome?: string;
}

const AppointmentSummary: React.FC<AppointmentSummaryProps> = ({ 
  servico, 
  data, 
  hora, 
  nome 
}) => {
  if (!servico) return null;
  
  return (
    <div className="mb-6 pb-6 border-b">
      <h2 className="text-xl font-semibold mb-4">Resumo do Agendamento</h2>
      
      <div className="space-y-3">
        <div>
          <span className="font-medium">Serviço:</span>{" "}
          <span>{servico.nome}</span>
        </div>
        
        {data && hora && (
          <div className="flex items-center">
            <CalendarIcon className="h-4 w-4 mr-2" />
            <span>
              {data.toLocaleDateString('pt-BR')} às{" "}
              {hora}
            </span>
          </div>
        )}
        
        <div>
          <span className="font-medium">Cliente:</span>{" "}
          <span>{nome}</span>
        </div>
        
        <div className="mt-2 pt-2 border-t">
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold">Total:</span>
            <span className="text-xl font-bold text-barber-secondary">
              {formatCurrency(servico.preco)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentSummary;
