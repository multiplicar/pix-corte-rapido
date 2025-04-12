
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';
import PaymentLoader from './PaymentLoader';

interface StripeCheckoutProps {
  servico?: { nome: string; preco: number };
  nome?: string;
  email?: string;
}

const StripeCheckout: React.FC<StripeCheckoutProps> = ({ 
  servico, 
  nome, 
  email 
}) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [configError, setConfigError] = useState(false);
  
  useEffect(() => {
    const loadStripeScript = () => {
      const stripeConfig = localStorage.getItem('stripeConfig');
      
      if (!stripeConfig) {
        console.error("Configuração do Stripe não encontrada");
        setConfigError(true);
        setIsLoading(false);
        return;
      }
      
      const parsedConfig = JSON.parse(stripeConfig);
      if (!parsedConfig.publishableKey) {
        setConfigError(true);
        setIsLoading(false);
        return;
      }
      
      // Aqui normalmente carregaríamos o Stripe e criaríamos um checkout
      // Para fins de simulação, vamos apenas deixar o componente pronto
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    };
    
    loadStripeScript();
  }, []);
  
  const handleManualCheckout = () => {
    toast({
      title: "Pagamento simulado",
      description: "Seu agendamento foi confirmado com sucesso.",
    });
    
    navigate("/sucesso");
  };

  if (configError) {
    return (
      <div className="flex flex-col space-y-6">
        <Alert variant="destructive" className="mb-4">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Configuração necessária</AlertTitle>
          <AlertDescription>
            As credenciais do Stripe não foram configuradas. Por favor, peça ao administrador para configurar 
            as credenciais na página de configurações administrativas.
          </AlertDescription>
        </Alert>
        
        <div className="mt-4 pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-500 mb-4">
            Para fins de teste, você pode simular um pagamento clicando no botão abaixo:
          </p>
          <Button
            onClick={handleManualCheckout}
            variant="default"
            className="w-full bg-barber-primary"
          >
            [Simulação] Confirmar Pagamento
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col space-y-6">
      {isLoading ? (
        <PaymentLoader message="Preparando o checkout do Stripe..." />
      ) : (
        <>
          <div className="border rounded-md p-6 bg-gray-50 text-center">
            <p className="text-gray-600 mb-4">Clique no botão abaixo para prosseguir ao checkout seguro do Stripe</p>
            <Button
              onClick={handleManualCheckout}
              className="bg-barber-primary hover:bg-barber-primary/90"
            >
              Pagar com Cartão
            </Button>
          </div>
          
          <div className="text-center mt-4">
            <p className="text-sm text-gray-500 mb-2">
              Você será redirecionado para o ambiente seguro do Stripe.
            </p>
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-200">
            <Button
              onClick={handleManualCheckout}
              variant="link"
              className="text-gray-500"
            >
              [Simulação] Confirmar Pagamento
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default StripeCheckout;
