
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { useApp } from "@/contexts/AppContext";
import { formatCurrency, generateFakePixCode } from "@/lib/utils";
import { CalendarIcon, Copy, CheckCircle, ArrowLeft } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const PagamentoPage = () => {
  const { agendamento, pixCode, setPixCode } = useApp();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [copied, setCopied] = useState(false);
  const [countdown, setCountdown] = useState(900); // 15 minutes in seconds
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Verificar se tem todas as informações necessárias
    if (!agendamento.servico || !agendamento.data || !agendamento.hora || !agendamento.nome || !agendamento.telefone || !agendamento.email) {
      toast({
        title: "Informações incompletas",
        description: "Por favor, complete todas as etapas anteriores.",
        variant: "destructive",
      });
      navigate("/confirmar");
      return;
    }
    
    // Simular geração do código PIX (fake)
    const generatePix = async () => {
      setIsLoading(true);
      
      // Na implementação real, aqui teríamos a chamada para a API do Mercado Pago
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      if (agendamento.servico) {
        const code = generateFakePixCode(agendamento.servico.preco);
        setPixCode(code);
      }
      
      setIsLoading(false);
    };
    
    if (!pixCode && agendamento.servico) {
      generatePix();
    } else {
      setIsLoading(false);
    }
    
    // Countdown timer
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
    // Simular pagamento realizado com sucesso
    toast({
      title: "Pagamento confirmado!",
      description: "Seu agendamento foi confirmado com sucesso.",
    });
    
    // Navegar para a página de sucesso
    navigate("/sucesso");
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
                {/* Resumo do agendamento */}
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
                
                {/* Instruções PIX */}
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
                
                {/* Código PIX */}
                <div className="mb-6">
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
                  </div>
                </div>
                
                {/* Botões de ação */}
                <div className="flex flex-col space-y-3">
                  <Button
                    onClick={handleCopyPix}
                    className="bg-barber-accent hover:bg-amber-600 text-black"
                    size="lg"
                  >
                    {copied ? (
                      <>
                        <CheckCircle className="h-5 w-5 mr-2" /> Código Copiado
                      </>
                    ) : (
                      <>
                        <Copy className="h-5 w-5 mr-2" /> Copiar Código PIX
                      </>
                    )}
                  </Button>
                  
                  <Button
                    onClick={() => navigate("/confirmar")}
                    variant="outline"
                    className="border-barber-secondary text-barber-secondary hover:bg-barber-secondary hover:text-white"
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" /> Voltar
                  </Button>
                  
                  {/* Este botão é apenas para simular o pagamento na demonstração */}
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
