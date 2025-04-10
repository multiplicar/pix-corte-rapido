
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { checkPaymentStatus } from '@/lib/mercadoPago';

interface UsePaymentStatusProps {
  paymentId: string;
  paymentStatus: 'pending' | 'approved' | 'rejected' | 'error';
  setPaymentStatus: (status: 'pending' | 'approved' | 'rejected' | 'error') => void;
}

export const usePaymentStatus = ({
  paymentId,
  paymentStatus,
  setPaymentStatus
}: UsePaymentStatusProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  // Check payment status periodically
  useEffect(() => {
    if (!paymentId) return;
    
    const checkStatus = async () => {
      const status = await checkPaymentStatus(paymentId);
      setPaymentStatus(status);
      
      if (status === 'approved') {
        toast({
          title: "Pagamento confirmado!",
          description: "Seu agendamento foi confirmado com sucesso.",
        });
        navigate("/sucesso");
      }
    };
    
    // Check immediately
    checkStatus();
    
    // Then check every 10 seconds
    const intervalId = setInterval(checkStatus, 10000);
    
    return () => clearInterval(intervalId);
  }, [paymentId, toast, navigate, setPaymentStatus]);

  const handleRefreshPaymentStatus = async () => {
    if (!paymentId) return;
    
    toast({
      title: "Verificando pagamento...",
      description: "Aguarde enquanto verificamos o status do seu pagamento.",
    });
    
    const status = await checkPaymentStatus(paymentId);
    setPaymentStatus(status);
    
    if (status === 'approved') {
      toast({
        title: "Pagamento confirmado!",
        description: "Seu agendamento foi confirmado com sucesso.",
      });
      navigate("/sucesso");
    } else if (status === 'pending') {
      toast({
        title: "Pagamento pendente",
        description: "Ainda não identificamos seu pagamento. Tente novamente em alguns instantes.",
      });
    } else {
      toast({
        title: "Problema no pagamento",
        description: "Houve um problema ao verificar seu pagamento. Por favor, tente novamente.",
        variant: "destructive",
      });
    }
  };

  return { handleRefreshPaymentStatus };
};
