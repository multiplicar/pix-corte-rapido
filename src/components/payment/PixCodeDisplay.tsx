
import React, { useState } from 'react';
import { Copy, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface PixCodeDisplayProps {
  pixCode: string;
  countdown: number;
  onCopy: () => void;
  copied: boolean;
}

const PixCodeDisplay: React.FC<PixCodeDisplayProps> = ({ 
  pixCode, 
  countdown, 
  onCopy, 
  copied 
}) => {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
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
          onClick={onCopy}
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
        onClick={onCopy}
        className="w-full mt-3 bg-barber-accent hover:bg-amber-600 text-black"
        size="sm"
      >
        {copied ? "Código Copiado" : "Copiar Código PIX"}
      </Button>
    </div>
  );
};

export default PixCodeDisplay;
