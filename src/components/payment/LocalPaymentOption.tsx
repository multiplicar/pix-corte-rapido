
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Check, Banknote, Info } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useApp } from '@/contexts/AppContext';

interface LocalPaymentOptionProps {
  servico?: { nome: string; preco: number };
  nome?: string;
}

const LocalPaymentOption: React.FC<LocalPaymentOptionProps> = ({ servico, nome }) => {
  const navigate = useNavigate();
  const { confirmarAgendamento } = useApp();

  const handleConfirmAppointment = () => {
    confirmarAgendamento('local');
    navigate('/sucesso');
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Banknote className="h-5 w-5 text-green-600" />
            Pagamento no Local
          </CardTitle>
          <CardDescription>
            Você optou por pagar diretamente na barbearia
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert className="bg-blue-50 border-blue-200">
            <Info className="h-4 w-4 text-blue-500" />
            <AlertDescription>
              Seu agendamento será confirmado, mas o pagamento deverá ser realizado no momento do atendimento.
            </AlertDescription>
          </Alert>
          
          <div className="space-y-2">
            <h3 className="font-medium">Informações Importantes:</h3>
            <ul className="space-y-1 list-inside list-disc text-sm text-gray-600">
              <li>Leve o valor exato para facilitar o troco</li>
              <li>Aceitamos dinheiro, cartões de débito e crédito</li>
              <li>Seu horário ficará reservado até 10 minutos após o horário marcado</li>
              <li>Em caso de desistência, por favor nos avise com antecedência</li>
            </ul>
          </div>
          
          <Button 
            onClick={handleConfirmAppointment}
            className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white"
          >
            <Check className="mr-2 h-4 w-4" />
            Confirmar Agendamento
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default LocalPaymentOption;
