
import React from 'react';

const PaymentLoader: React.FC<{ message?: string }> = ({ message = "Gerando código PIX..." }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-barber-accent"></div>
      <p className="mt-4 text-lg">{message}</p>
    </div>
  );
};

export default PaymentLoader;
