
import React from 'react';
import { QrCode } from 'lucide-react';

interface QRCodePixProps {
  pixCode: string;
  value: number;
}

const QRCodePix: React.FC<QRCodePixProps> = ({ pixCode, value }) => {
  // Generate a QR code image URL using an online service
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(pixCode)}`;

  return (
    <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm border">
      <div className="flex items-center justify-center space-x-2 mb-4">
        <QrCode className="h-5 w-5 text-barber-accent" />
        <span className="font-semibold">QR Code PIX</span>
      </div>
      
      {pixCode ? (
        <div className="flex flex-col items-center">
          <img 
            src={qrUrl} 
            alt="Código QR do PIX" 
            className="w-48 h-48 mb-2 border border-gray-200 rounded"
          />
          <span className="text-sm text-gray-500 text-center">
            Escaneie o QR Code com o aplicativo do seu banco
          </span>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center w-48 h-48 border border-gray-200 rounded bg-gray-50">
          <div className="animate-pulse rounded-full h-16 w-16 border-b-2 border-barber-accent"></div>
          <span className="text-sm text-gray-500 mt-4">Gerando QR Code...</span>
        </div>
      )}
    </div>
  );
};

export default QRCodePix;
