
import React, { useEffect, useState } from 'react';
import { QrCode, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface QRCodePixProps {
  pixCode: string;
  value: number;
  paymentId?: string;
  onRefresh?: () => void;
}

const QRCodePix: React.FC<QRCodePixProps> = ({ pixCode, value, paymentId, onRefresh }) => {
  const [qrUrl, setQrUrl] = useState<string>('');
  
  useEffect(() => {
    if (pixCode) {
      // Generate QR code URL from the PIX code
      setQrUrl(`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(pixCode)}`);
    }
  }, [pixCode]);

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
          <span className="text-sm text-gray-500 text-center mb-2">
            Escaneie o QR Code com o aplicativo do seu banco
          </span>
          {paymentId && onRefresh && (
            <Button 
              onClick={onRefresh} 
              variant="outline" 
              size="sm" 
              className="mt-2 text-xs flex items-center"
            >
              <RefreshCw className="h-3 w-3 mr-1" /> Atualizar status
            </Button>
          )}
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
