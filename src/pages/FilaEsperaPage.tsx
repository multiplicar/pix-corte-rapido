
import React, { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { useQueue, WaitListItem } from '@/contexts/QueueContext';
import WaitingQueueDisplay from '@/components/queue/WaitingQueueDisplay';
import ClienteLookupForm from '@/components/queue/ClienteLookupForm';
import ClienteInfoDisplay from '@/components/queue/ClienteInfoDisplay';

const FilaEsperaPage = () => {
  const [waitId, setWaitId] = useState('');
  const [clientInfo, setClientInfo] = useState<WaitListItem | null>(null);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const { queue } = useQueue();

  // Check for ID in URL or localStorage
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    
    if (id) {
      setWaitId(id);
      checkWaitListPosition(id);
    } else {
      const savedId = localStorage.getItem('waitListId');
      if (savedId) {
        setWaitId(savedId);
        checkWaitListPosition(savedId);
      }
    }
  }, [queue]);

  const checkWaitListPosition = (id: string) => {
    const client = queue.find(item => item.id === id);
    
    if (client) {
      setClientInfo(client);
      
      // Calculate estimated time based on position
      const timeEstimate = client.estimatedTime;
      setTimeLeft(timeEstimate);
      
      // Save ID to localStorage
      localStorage.setItem('waitListId', id);
    } else {
      setClientInfo(null);
      setTimeLeft(null);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto py-10 px-4">
        <h1 className="text-3xl font-bold text-barber-primary mb-8 text-center">
          Fila de Espera Virtual
        </h1>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <div>
            <ClienteLookupForm 
              waitId={waitId}
              setWaitId={setWaitId}
              clientInfo={clientInfo}
              checkWaitListPosition={checkWaitListPosition}
            />
            
            {clientInfo && (
              <ClienteInfoDisplay 
                clientInfo={clientInfo}
                timeLeft={timeLeft}
              />
            )}
          </div>
          
          <div>
            <WaitingQueueDisplay />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default FilaEsperaPage;
