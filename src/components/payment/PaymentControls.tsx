
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PaymentControlsProps {
  onSimulatePayment: () => void;
}

const PaymentControls: React.FC<PaymentControlsProps> = ({ onSimulatePayment }) => {
  const navigate = useNavigate();
  
  return (
    <div className="flex flex-col space-y-3">
      <Button
        onClick={() => navigate("/confirmar")}
        variant="outline"
        className="border-barber-secondary text-barber-secondary hover:bg-barber-secondary hover:text-white"
      >
        <ArrowLeft className="h-4 w-4 mr-2" /> Voltar
      </Button>
      
      <Button
        onClick={onSimulatePayment}
        variant="link"
        className="text-gray-500 mt-4"
      >
        [Simulação] Confirmar Pagamento
      </Button>
    </div>
  );
};

export default PaymentControls;
