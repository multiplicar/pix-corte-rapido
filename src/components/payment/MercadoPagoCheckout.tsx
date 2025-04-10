
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { getMercadoPagoConfig } from '@/lib/mercadoPago';
import PaymentLoader from './PaymentLoader';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';

interface MercadoPagoCheckoutProps {
  servico?: { nome: string; preco: number };
  nome?: string;
  email?: string;
}

declare global {
  interface Window {
    MercadoPago?: any;
  }
}

const MercadoPagoCheckout: React.FC<MercadoPagoCheckoutProps> = ({ 
  servico, 
  nome, 
  email 
}) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [configError, setConfigError] = useState(false);
  const [checkoutButtonRef, setCheckoutButtonRef] = useState<HTMLDivElement | null>(null);
  
  useEffect(() => {
    const loadMercadoPagoScript = () => {
      const config = getMercadoPagoConfig();
      
      if (!config || !config.publicKey) {
        console.error("Configuração do Mercado Pago não encontrada");
        setConfigError(true);
        setIsLoading(false);
        return;
      }
      
      const script = document.createElement('script');
      script.src = "https://sdk.mercadopago.com/js/v2";
      script.type = "text/javascript";
      script.onload = () => initializeMercadoPago(config.publicKey);
      document.body.appendChild(script);
    };
    
    loadMercadoPagoScript();
    
    return () => {
      // Clean up script if component unmounts
      const script = document.querySelector('script[src="https://sdk.mercadopago.com/js/v2"]');
      if (script) {
        document.body.removeChild(script);
      }
    };
  }, [toast]);
  
  const initializeMercadoPago = (publicKey: string) => {
    if (!window.MercadoPago) {
      toast({
        title: "Erro ao carregar",
        description: "Não foi possível carregar o Mercado Pago.",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }
    
    try {
      const mp = new window.MercadoPago(publicKey, {
        locale: 'pt-BR'
      });
      
      if (servico && checkoutButtonRef) {
        // Create checkout button with Mercado Pago Checkout Pro
        mp.checkout({
          preference: {
            items: [{
              id: 'agendamento-barber',
              title: servico.nome,
              quantity: 1,
              unit_price: servico.preco,
              currency_id: 'BRL',
            }],
            payer: {
              name: nome || '',
              email: email || '',
            },
            payment_methods: {
              excluded_payment_types: [
                { id: "credit_card" },
                { id: "debit_card" },
                { id: "bank_transfer" },
                { id: "ticket" }
              ],
              installments: 1
            },
            back_urls: {
              success: `${window.location.origin}/sucesso`,
              failure: `${window.location.origin}/pagamento`,
              pending: `${window.location.origin}/pagamento`
            },
            auto_return: 'approved',
          },
          render: {
            container: '.checkout-button',
            label: 'Pagar com Mercado Pago',
          }
        });
      }
      
      setIsLoading(false);
    } catch (error) {
      console.error('Error initializing Mercado Pago:', error);
      setConfigError(true);
      setIsLoading(false);
    }
  };
  
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
            As credenciais do Mercado Pago não foram configuradas. Por favor, peça ao administrador para configurar 
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
            className="w-full bg-barber-accent"
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
        <PaymentLoader message="Carregando checkout do Mercado Pago..." />
      ) : (
        <>
          <div 
            className="checkout-button" 
            ref={(el) => setCheckoutButtonRef(el)}
          />
          
          <div className="text-center mt-4">
            <p className="text-sm text-gray-500 mb-2">
              Você será redirecionado para o ambiente seguro do Mercado Pago.
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

export default MercadoPagoCheckout;
