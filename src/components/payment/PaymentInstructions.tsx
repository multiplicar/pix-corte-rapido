
import React from 'react';

const PaymentInstructions: React.FC = () => {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-4">
        Instruções de Pagamento
      </h2>
      
      <div className="space-y-4 text-gray-700">
        <p className="flex items-start">
          <span className="bg-barber-primary text-white rounded-full w-6 h-6 inline-flex items-center justify-center mr-2 flex-shrink-0">1</span>
          Você será redirecionado para o ambiente seguro do Mercado Pago.
        </p>
        <p className="flex items-start">
          <span className="bg-barber-primary text-white rounded-full w-6 h-6 inline-flex items-center justify-center mr-2 flex-shrink-0">2</span>
          Escolha a forma de pagamento PIX.
        </p>
        <p className="flex items-start">
          <span className="bg-barber-primary text-white rounded-full w-6 h-6 inline-flex items-center justify-center mr-2 flex-shrink-0">3</span>
          Escaneie o QR code ou copie o código PIX gerado.
        </p>
        <p className="flex items-start">
          <span className="bg-barber-primary text-white rounded-full w-6 h-6 inline-flex items-center justify-center mr-2 flex-shrink-0">4</span>
          Realize o pagamento no app do seu banco.
        </p>
        <p className="flex items-start">
          <span className="bg-barber-primary text-white rounded-full w-6 h-6 inline-flex items-center justify-center mr-2 flex-shrink-0">5</span>
          Após o pagamento, seu agendamento será confirmado automaticamente.
        </p>
      </div>
    </div>
  );
};

export default PaymentInstructions;
