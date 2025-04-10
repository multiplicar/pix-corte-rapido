
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { createPixPayment } from '@/lib/mercadoPago';
import { generateFakePixCode } from '@/lib/utils';

interface UsePaymentInitializerProps {
  servico?: { nome: string; preco: number };
  data?: Date;
  hora?: string;
  nome?: string;
  email?: string;
  telefone?: string;
  pixCode: string;
  setPixCode: (code: string) => void;
}

export const usePaymentInitializer = ({
  servico,
  data,
  hora,
  nome,
  email,
  telefone,
  pixCode,
  setPixCode
}: UsePaymentInitializerProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [isLoading, setIsLoading] = useState(true);
  const [paymentId, setPaymentId] = useState<string>('');
  const [paymentStatus, setPaymentStatus] = useState<'pending' | 'approved' | 'rejected' | 'error'>('pending');
  const [error, setError] = useState<string | null>(null);
  const [countdown, setCountdown] = useState(900); // 15 minutes in seconds
  
  useEffect(() => {
    if (!servico || !data || !hora || !nome || !telefone || !email) {
      toast({
        title: "Informações incompletas",
        description: "Por favor, complete todas as etapas anteriores.",
        variant: "destructive",
      });
      navigate("/confirmar");
      return;
    }
    
    const initializePayment = async () => {
      setIsLoading(true);
      setError(null);
      
      if (servico && nome && email) {
        try {
          const description = `Agendamento: ${servico.nome} - ${data?.toLocaleDateString('pt-BR')} às ${hora}`;
          
          const pixData = await createPixPayment(
            servico.preco,
            description,
            email,
            nome
          );
          
          if (pixData && pixData.qr_code) {
            setPixCode(pixData.qr_code);
            setPaymentId(pixData.id);
          } else {
            setError("Não foi possível gerar o código PIX. Verifique as configurações do Mercado Pago.");
            // Fall back to fake PIX if Mercado Pago integration fails
            const fakePix = generateFakePixCode(servico.preco);
            setPixCode(fakePix);
          }
        } catch (err) {
          console.error("Error generating PIX:", err);
          setError("Erro ao gerar o PIX. Por favor, tente novamente mais tarde.");
          
          // Fall back to fake PIX
          const fakePix = generateFakePixCode(servico.preco);
          setPixCode(fakePix);
        }
      }
      
      setIsLoading(false);
    };
    
    // Only generate a new PIX if we don't have one yet
    if (!pixCode && servico) {
      initializePayment();
    } else {
      setIsLoading(false);
    }
    
    // Initialize countdown
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [servico, data, hora, nome, email, telefone, pixCode, setPixCode, navigate, toast]);
  
  return {
    isLoading,
    paymentId,
    paymentStatus,
    setPaymentStatus,
    error,
    countdown
  };
};
