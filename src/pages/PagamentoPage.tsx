
import React, { useState } from "react";
import Layout from "@/components/layout/Layout";
import { useApp } from "@/contexts/AppContext";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";
import AppointmentSummary from "@/components/payment/AppointmentSummary";
import PaymentInstructions from "@/components/payment/PaymentInstructions";
import PaymentMethodSelector, { PaymentMethod } from "@/components/payment/PaymentMethodSelector";
import MercadoPagoCheckout from "@/components/payment/MercadoPagoCheckout";
import StripeCheckout from "@/components/payment/StripeCheckout";
import LocalPaymentOption from "@/components/payment/LocalPaymentOption";
import WaitingQueueDisplay from "@/components/queue/WaitingQueueDisplay";

const PagamentoPage = () => {
  const { agendamento } = useApp();
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('pix');
  
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
  
  const renderPaymentMethod = () => {
    switch (paymentMethod) {
      case 'pix':
        return (
          <>
            <PaymentInstructions />
            <MercadoPagoCheckout 
              servico={agendamento.servico}
              nome={agendamento.nome}
              email={agendamento.email}
            />
          </>
        );
      case 'card':
      case 'paypal':
      case 'applepay':
        return (
          <StripeCheckout 
            servico={agendamento.servico}
            nome={agendamento.nome}
            email={agendamento.email}
          />
        );
      case 'local':
        return (
          <LocalPaymentOption 
            servico={agendamento.servico}
            nome={agendamento.nome}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-center mb-8 text-barber-primary">
          Pagamento
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <AppointmentSummary 
                servico={agendamento.servico}
                data={agendamento.data}
                hora={agendamento.hora}
                nome={agendamento.nome}
              />
              
              <div className="my-6">
                <PaymentMethodSelector 
                  onSelect={setPaymentMethod}
                  selected={paymentMethod}
                />
              </div>
              
              <div className="mt-6">
                {renderPaymentMethod()}
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <WaitingQueueDisplay />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PagamentoPage;
