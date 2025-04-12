
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CreditCard, Banknote, QrCode } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

export type PaymentMethod = 'pix' | 'card' | 'local';

interface PaymentMethodSelectorProps {
  onSelect: (method: PaymentMethod) => void;
  selected: PaymentMethod;
}

const PaymentMethodSelector: React.FC<PaymentMethodSelectorProps> = ({ onSelect, selected }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Escolha o método de pagamento</CardTitle>
        <CardDescription>
          Selecione como você deseja pagar pelo seu agendamento
        </CardDescription>
      </CardHeader>
      <CardContent>
        <RadioGroup
          defaultValue={selected}
          value={selected}
          onValueChange={(value) => onSelect(value as PaymentMethod)}
          className="space-y-4"
        >
          <div className={`flex items-center space-x-2 rounded-lg border p-4 cursor-pointer ${selected === 'pix' ? 'border-barber-primary bg-barber-primary/5' : 'border-gray-200'}`}>
            <RadioGroupItem value="pix" id="pix" />
            <Label htmlFor="pix" className="flex flex-1 items-center gap-2 cursor-pointer">
              <QrCode className="h-5 w-5 text-barber-accent" />
              <div>
                <p className="font-medium">PIX</p>
                <p className="text-sm text-gray-500">Pagamento instantâneo</p>
              </div>
            </Label>
          </div>
          
          <div className={`flex items-center space-x-2 rounded-lg border p-4 cursor-pointer ${selected === 'card' ? 'border-barber-primary bg-barber-primary/5' : 'border-gray-200'}`}>
            <RadioGroupItem value="card" id="card" />
            <Label htmlFor="card" className="flex flex-1 items-center gap-2 cursor-pointer">
              <CreditCard className="h-5 w-5 text-barber-primary" />
              <div>
                <p className="font-medium">Cartão de Crédito</p>
                <p className="text-sm text-gray-500">Pagamento seguro via Stripe</p>
              </div>
            </Label>
          </div>
          
          <div className={`flex items-center space-x-2 rounded-lg border p-4 cursor-pointer ${selected === 'local' ? 'border-barber-primary bg-barber-primary/5' : 'border-gray-200'}`}>
            <RadioGroupItem value="local" id="local" />
            <Label htmlFor="local" className="flex flex-1 items-center gap-2 cursor-pointer">
              <Banknote className="h-5 w-5 text-green-600" />
              <div>
                <p className="font-medium">Pagamento no Local</p>
                <p className="text-sm text-gray-500">Pague na hora do atendimento</p>
              </div>
            </Label>
          </div>
        </RadioGroup>
      </CardContent>
    </Card>
  );
};

export default PaymentMethodSelector;
