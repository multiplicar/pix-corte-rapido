
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { WaitListItem } from '@/contexts/QueueContext';

interface ClienteLookupFormProps {
  waitId: string;
  setWaitId: (id: string) => void;
  clientInfo: WaitListItem | null;
  checkWaitListPosition: (id: string) => void;
}

const ClienteLookupForm: React.FC<ClienteLookupFormProps> = ({
  waitId,
  setWaitId,
  clientInfo,
  checkWaitListPosition
}) => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleCheck = () => {
    if (!waitId.trim()) {
      toast({
        title: "ID não informado",
        description: "Por favor, informe o código da fila de espera.",
        variant: "destructive",
      });
      return;
    }
    
    checkWaitListPosition(waitId);
    
    if (!clientInfo) {
      toast({
        title: "Código não encontrado",
        description: "O código informado não está na fila de espera.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Consultar Posição na Fila</CardTitle>
        <CardDescription>
          Informe o código recebido ao entrar na fila de espera
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-2">
          <Input
            value={waitId}
            onChange={(e) => setWaitId(e.target.value)}
            placeholder="Código da fila"
            className="flex-1"
          />
          <Button onClick={handleCheck} className="bg-barber-accent hover:bg-amber-600 text-black">
            Consultar
          </Button>
        </div>
        
        {waitId && !clientInfo && (
          <Alert className="mt-4 border-red-400 bg-red-50" variant="destructive">
            <AlertTitle>Código não encontrado</AlertTitle>
            <AlertDescription>
              Não encontramos nenhum cliente na fila com este código. Verifique e tente novamente.
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
      <CardFooter>
        <Button 
          variant="outline" 
          onClick={() => navigate('/agendar')}
          className="w-full"
        >
          Agendar um horário
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ClienteLookupForm;
