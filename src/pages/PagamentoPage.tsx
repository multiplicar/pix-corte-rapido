
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { useApp } from "@/contexts/AppContext";
import { formatCurrency } from "@/lib/utils";
import { createPixPayment, checkPaymentStatus } from "@/lib/mercadoPago";
import { CalendarIcon, Copy, CheckCircle, ArrowLeft, AlertTriangle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import QRCodePix from "@/components/payment/QRCodePix";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const PagamentoPage = () => {
  const { agendamento, pixCode, setPixCode } = useApp();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [copied, setCopied] = useState(false);
  const [countdown, setCountdown] = useState(900); // 15 minutes in seconds
  const [isLoading, setIsLoading] = useState(true);
  const [paymentId, setPaymentId] = useState<string>('');
  const [paymentStatus, setPaymentStatus] = useState<'pending' | 'approved' | 'rejected' | 'error'>('pending');
  const [error, setError] = useState<string | null>(null);
  
  // Initialize payment when component mounts
  useEffect(() => {
    if (!agendamento.servico || !agendamento.data || !agendamento.hora || !agendamento.nome || !agendamento.telefone || !agendamento.email) {
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
      
      if (agendamento.servico && agendamento.nome && agendamento.email) {
        try {
          const description = `Agendamento: ${agendamento.servico.nome} - ${agendamento.data?.toLocaleDateString('pt-BR')} às ${agendamento.hora}`;
          
          const pixData = await createPixPayment(
            agendamento.servico.preco,
            description,
            agendamento.email,
            agendamento.nome
          );
          
          if (pixData && pixData.qr_code) {
            setPixCode(pixData.qr_code);
            setPaymentId(pixData.id);
          } else {
            setError("Não foi possível gerar o código PIX. Verifique as configurações do Mercado Pago.");
            // Fall back to fake PIX if Mercado Pago integration fails
            const fakePix = generateFakePixCode(agendamento.servico.preco);
            setPixCode(fakePix);
          }
        } catch (err) {
          console.error("Error generating PIX:", err);
          setError("Erro ao gerar o PIX. Por favor, tente novamente mais tarde.");
          
          // Fall back to fake PIX
          const fakePix = generateFakePixCode(agendamento.servico.preco);
          setPixCode(fakePix);
        }
      }
      
      setIsLoading(false);
    };
    
    // Only generate a new PIX if we don't have one yet
    if (!pixCode && agendamento.servico) {
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
  }, [agendamento, pixCode, setPixCode, navigate, toast]);
  
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
  }, [paymentId, toast, navigate]);
  
  const handleCopyPix = () => {
    if (pixCode) {
      navigator.clipboard.writeText(pixCode);
      setCopied(true);
      toast({
        title: "Código PIX copiado!",
        description: "Cole o código no seu aplicativo de pagamento.",
      });
      
      setTimeout(() => setCopied(false), 3000);
    }
  };
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };
  
  const handleSimulatePayment = () => {
    toast({
      title: "Pagamento confirmado!",
      description: "Seu agendamento foi confirmado com sucesso.",
    });
    
    navigate("/sucesso");
  };
  
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
  
  // Fallback function for generating fake PIX code (in case Mercado Pago fails)
  const generateFakePixCode = (valor: number): string => {
    return `00020126330014BR.GOV.BCB.PIX0111123456789012520400005303986540${valor.toFixed(2).replace('.', '')}5802BR5913Barber Shop6008Sao Paulo62150511${Math.floor(Math.random() * 10000000000)}6304${Math.floor(Math.random() * 10000)}`;
  };
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-center mb-8 text-barber-primary">
          Pagamento via <span className="text-barber-accent">PIX</span>
        </h1>
        
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-6">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-barber-accent"></div>
                <p className="mt-4 text-lg">Gerando código PIX...</p>
              </div>
            ) : (
              <>
                {error && (
                  <Alert variant="destructive" className="mb-6">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>Atenção</AlertTitle>
                    <AlertDescription>
                      {error}
                    </AlertDescription>
                  </Alert>
                )}
                
                <div className="mb-6 pb-6 border-b">
                  <h2 className="text-xl font-semibold mb-4">Resumo do Agendamento</h2>
                  
                  {agendamento.servico && (
                    <div className="space-y-3">
                      <div>
                        <span className="font-medium">Serviço:</span>{" "}
                        <span>{agendamento.servico.nome}</span>
                      </div>
                      
                      {agendamento.data && agendamento.hora && (
                        <div className="flex items-center">
                          <CalendarIcon className="h-4 w-4 mr-2" />
                          <span>
                            {agendamento.data.toLocaleDateString('pt-BR')} às{" "}
                            {agendamento.hora}
                          </span>
                        </div>
                      )}
                      
                      <div>
                        <span className="font-medium">Cliente:</span>{" "}
                        <span>{agendamento.nome}</span>
                      </div>
                      
                      <div className="mt-2 pt-2 border-t">
                        <div className="flex justify-between items-center">
                          <span className="text-lg font-semibold">Total:</span>
                          <span className="text-xl font-bold text-barber-secondary">
                            {formatCurrency(agendamento.servico.preco)}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="mb-6">
                  <h2 className="text-xl font-semibold mb-4">
                    Instruções de Pagamento
                  </h2>
                  
                  <div className="space-y-4 text-gray-700">
                    <p className="flex items-start">
                      <span className="bg-barber-primary text-white rounded-full w-6 h-6 inline-flex items-center justify-center mr-2 flex-shrink-0">1</span>
                      Copie o código PIX abaixo.
                    </p>
                    <p className="flex items-start">
                      <span className="bg-barber-primary text-white rounded-full w-6 h-6 inline-flex items-center justify-center mr-2 flex-shrink-0">2</span>
                      Abra o aplicativo do seu banco ou carteira digital.
                    </p>
                    <p className="flex items-start">
                      <span className="bg-barber-primary text-white rounded-full w-6 h-6 inline-flex items-center justify-center mr-2 flex-shrink-0">3</span>
                      Escolha a opção PIX e selecione "Pix Copia e Cola".
                    </p>
                    <p className="flex items-start">
                      <span className="bg-barber-primary text-white rounded-full w-6 h-6 inline-flex items-center justify-center mr-2 flex-shrink-0">4</span>
                      Cole o código e confirme o pagamento.
                    </p>
                    <p className="flex items-start">
                      <span className="bg-barber-primary text-white rounded-full w-6 h-6 inline-flex items-center justify-center mr-2 flex-shrink-0">5</span>
                      Após o pagamento, seu agendamento será confirmado automaticamente.
                    </p>
                  </div>
                </div>
                
                <div className="flex flex-col md:flex-row md:space-x-6 mb-6">
                  {agendamento.servico && (
                    <div className="flex-1 mb-6 md:mb-0">
                      <QRCodePix 
                        pixCode={pixCode} 
                        value={agendamento.servico.preco}
                        paymentId={paymentId}
                        onRefresh={handleRefreshPaymentStatus}
                      />
                    </div>
                  )}
                  
                  <div className="flex-1">
                    <div className="bg-gray-100 p-4 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-semibold">Código PIX:</h3>
                        <div className="text-sm px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full">
                          Expira em {formatTime(countdown)}
                        </div>
                      </div>
                      
                      <div className="relative">
                        <div className="border bg-white p-3 rounded text-sm font-mono break-all">
                          {pixCode}
                        </div>
                        <Button
                          onClick={handleCopyPix}
                          className="absolute right-2 top-2 p-1 h-auto"
                          variant="ghost"
                          size="sm"
                        >
                          {copied ? (
                            <CheckCircle className="h-5 w-5 text-green-500" />
                          ) : (
                            <Copy className="h-5 w-5" />
                          )}
                        </Button>
                      </div>
                      
                      <Button
                        onClick={handleCopyPix}
                        className="w-full mt-3 bg-barber-accent hover:bg-amber-600 text-black"
                        size="sm"
                      >
                        {copied ? "Código Copiado" : "Copiar Código PIX"}
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col space-y-3">
                  <Button
                    onClick={() => navigate("/confirmar")}
                    variant="outline"
                    className="border-barber-secondary text-barber-secondary hover:bg-barber-secondary hover:text-white"
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" /> Voltar
                  </Button>
                  
                  <Button
                    onClick={handleSimulatePayment}
                    variant="link"
                    className="text-gray-500 mt-4"
                  >
                    [Simulação] Confirmar Pagamento
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PagamentoPage;
