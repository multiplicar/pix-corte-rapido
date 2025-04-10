
import React from "react";
import Layout from "@/components/layout/Layout";
import { useApp } from "@/contexts/AppContext";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";
import AppointmentSummary from "@/components/payment/AppointmentSummary";
import PaymentInstructions from "@/components/payment/PaymentInstructions";
import PaymentLoader from "@/components/payment/PaymentLoader";
import MercadoPagoCheckout from "@/components/payment/MercadoPagoCheckout";

const PagamentoPage = () => {
  const { agendamento } = useApp();
  
  if (!agendamento.servico || !agendamento.data || !agendamento.hora || !agendamento.nome || !agendamento.email) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12">
          <Alert variant="destructive" className="mb-6">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Atenção</AlertTitle>
            <AlertDescription>
              Informações de agendamento incompletas. Por favor, retorne e complete todas as etapas.
            </AlertDescription>
          </Alert>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-center mb-8 text-barber-primary">
          Pagamento via <span className="text-barber-accent">PIX</span>
        </h1>
        
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-6">
            <AppointmentSummary 
              servico={agendamento.servico}
              data={agendamento.data}
              hora={agendamento.hora}
              nome={agendamento.nome}
            />
            
            <PaymentInstructions />
            
            <MercadoPagoCheckout 
              servico={agendamento.servico}
              nome={agendamento.nome}
              email={agendamento.email}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PagamentoPage;
