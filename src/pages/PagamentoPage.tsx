
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { useApp } from "@/contexts/AppContext";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";
import QRCodePix from "@/components/payment/QRCodePix";
import AppointmentSummary from "@/components/payment/AppointmentSummary";
import PaymentInstructions from "@/components/payment/PaymentInstructions";
import PixCodeDisplay from "@/components/payment/PixCodeDisplay";
import PaymentControls from "@/components/payment/PaymentControls";
import PaymentLoader from "@/components/payment/PaymentLoader";
import { usePaymentInitializer } from "@/hooks/usePaymentInitializer";
import { usePaymentStatus } from "@/hooks/usePaymentStatus";

const PagamentoPage = () => {
  const { agendamento, pixCode, setPixCode } = useApp();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [copied, setCopied] = useState(false);

  // Initialize payment
  const {
    isLoading,
    paymentId,
    paymentStatus,
    setPaymentStatus,
    error,
    countdown
  } = usePaymentInitializer({
    servico: agendamento.servico,
    data: agendamento.data,
    hora: agendamento.hora,
    nome: agendamento.nome,
    email: agendamento.email,
    telefone: agendamento.telefone,
    pixCode,
    setPixCode
  });

  // Monitor payment status
  const { handleRefreshPaymentStatus } = usePaymentStatus({
    paymentId,
    paymentStatus,
    setPaymentStatus
  });
  
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
  
  const handleSimulatePayment = () => {
    toast({
      title: "Pagamento confirmado!",
      description: "Seu agendamento foi confirmado com sucesso.",
    });
    
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
              <PaymentLoader />
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
                
                <AppointmentSummary 
                  servico={agendamento.servico}
                  data={agendamento.data}
                  hora={agendamento.hora}
                  nome={agendamento.nome}
                />
                
                <PaymentInstructions />
                
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
                    <PixCodeDisplay 
                      pixCode={pixCode}
                      countdown={countdown}
                      onCopy={handleCopyPix}
                      copied={copied}
                    />
                  </div>
                </div>
                
                <PaymentControls onSimulatePayment={handleSimulatePayment} />
              </>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PagamentoPage;
