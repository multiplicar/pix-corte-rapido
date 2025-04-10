
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
  );
};

export default PaymentInstructions;
