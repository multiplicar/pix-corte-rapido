
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Check, Banknote, Info, Credit, Cash, Wallet } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useApp } from '@/contexts/AppContext';

interface LocalPaymentOptionProps {
  servico?: { nome: string; preco: number };
  nome?: string;
}

type PaymentMethod = 'cash' | 'card' | 'other';

const LocalPaymentOption: React.FC<LocalPaymentOptionProps> = ({ servico, nome }) => {
  const navigate = useNavigate();
  const { confirmarAgendamento } = useApp();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethod>('cash');

  const handleConfirmAppointment = () => {
    confirmarAgendamento('local', selectedPaymentMethod);
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
          
          <div>
            <h3 className="font-medium mb-2">Como deseja pagar?</h3>
            <RadioGroup 
              value={selectedPaymentMethod}
              onValueChange={(value) => setSelectedPaymentMethod(value as PaymentMethod)}
              className="space-y-3"
            >
              <div className="flex items-center space-x-2 border p-3 rounded-md cursor-pointer hover:bg-gray-50">
                <RadioGroupItem value="cash" id="cash" />
                <Label htmlFor="cash" className="flex items-center cursor-pointer">
                  <Cash className="h-4 w-4 mr-2 text-green-600" />
                  <div>
                    <span className="font-medium">Dinheiro</span>
                    <p className="text-sm text-gray-500">Pague em espécie</p>
                  </div>
                </Label>
              </div>
              
              <div className="flex items-center space-x-2 border p-3 rounded-md cursor-pointer hover:bg-gray-50">
                <RadioGroupItem value="card" id="card" />
                <Label htmlFor="card" className="flex items-center cursor-pointer">
                  <Credit className="h-4 w-4 mr-2 text-blue-600" />
                  <div>
                    <span className="font-medium">Cartão</span>
                    <p className="text-sm text-gray-500">Débito ou crédito</p>
                  </div>
                </Label>
              </div>
              
              <div className="flex items-center space-x-2 border p-3 rounded-md cursor-pointer hover:bg-gray-50">
                <RadioGroupItem value="other" id="other" />
                <Label htmlFor="other" className="flex items-center cursor-pointer">
                  <Wallet className="h-4 w-4 mr-2 text-purple-600" />
                  <div>
                    <span className="font-medium">Outro método</span>
                    <p className="text-sm text-gray-500">Transferência ou vale</p>
                  </div>
                </Label>
              </div>
            </RadioGroup>
          </div>
          
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
