
import React, { createContext, useContext, useState, useEffect } from 'react';

export interface WaitListItem {
  id: string;
  nome: string;
  servico: {
    nome: string;
    duracao: number;
  };
  posicao: number;
  estimatedTime: number;
  horaPrevista: string;
  status: 'waiting' | 'current' | 'done';
}

interface QueueContextType {
  queue: WaitListItem[];
  addToQueue: (name: string, service: { nome: string; duracao: number; }) => string;
  removeFromQueue: (id: string) => void;
  updateQueue: (queue: WaitListItem[]) => void;
  currentPosition: WaitListItem | null;
  moveNext: () => void;
}

const QueueContext = createContext<QueueContextType | undefined>(undefined);

export const MOCK_QUEUE: WaitListItem[] = [
  {
    id: 'w1',
    nome: 'Carlos Silva',
    servico: { nome: 'Corte e Barba', duracao: 45 },
    posicao: 1,
    estimatedTime: 0,
    horaPrevista: '14:00',
    status: 'current'
  },
  {
    id: 'w2',
    nome: 'Bruno Pereira',
    servico: { nome: 'Corte Simples', duracao: 30 },
    posicao: 2,
    estimatedTime: 30,
    horaPrevista: '14:30',
    status: 'waiting'
  },
  {
    id: 'w3',
    nome: 'Lucas Oliveira',
    servico: { nome: 'Barba', duracao: 20 },
    posicao: 3,
    estimatedTime: 30,
    horaPrevista: '15:00',
    status: 'waiting'
  }
];

export const QueueProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [queue, setQueue] = useState<WaitListItem[]>([]);
  const [currentPosition, setCurrentPosition] = useState<WaitListItem | null>(null);
  
  useEffect(() => {
    // Load queue from localStorage or use mock data
    const savedQueue = localStorage.getItem('waitQueue');
    if (savedQueue) {
      const parsedQueue = JSON.parse(savedQueue);
      setQueue(parsedQueue);
      
      // Find current position
      const current = parsedQueue.find((item: WaitListItem) => item.status === 'current');
      setCurrentPosition(current || null);
    } else {
      // Use mock data for initial state
      setQueue(MOCK_QUEUE);
      setCurrentPosition(MOCK_QUEUE.find(item => item.status === 'current') || null);
    }
  }, []);
  
  // Save queue to localStorage whenever it changes
  useEffect(() => {
    if (queue.length > 0) {
      localStorage.setItem('waitQueue', JSON.stringify(queue));
    }
  }, [queue]);
  
  // Generate a random ID
  const generateId = () => {
    return 'w' + Math.random().toString(36).substr(2, 9);
  };
  
  // Add a person to the queue
  const addToQueue = (name: string, service: { nome: string; duracao: number; }): string => {
    const id = generateId();
    const lastPosition = queue.length > 0 ? Math.max(...queue.map(item => item.posicao)) : 0;
    const newPosition = lastPosition + 1;
    
    // Calculate estimated waiting time based on position and service durations
    const waitingItems = queue.filter(item => item.status === 'waiting' || item.status === 'current');
    const totalWaitTime = waitingItems.reduce((total, item) => total + item.servico.duracao, 0);
    
    // Calculate estimated time for the new person
    const now = new Date();
    const estimatedMinutes = totalWaitTime;
    const horaPrevista = new Date(now.getTime() + estimatedMinutes * 60000);
    
    const newItem: WaitListItem = {
      id,
      nome: name,
      servico: service,
      posicao: newPosition,
      estimatedTime: estimatedMinutes,
      horaPrevista: horaPrevista.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'waiting'
    };
    
    setQueue(prevQueue => {
      const updatedQueue = [...prevQueue, newItem];
      return updatedQueue;
    });
    
    return id;
  };
  
  // Remove a person from the queue
  const removeFromQueue = (id: string) => {
    setQueue(prevQueue => {
      const updatedQueue = prevQueue.filter(item => item.id !== id);
      // Update positions
      return updatedQueue.map((item, index) => ({
        ...item,
        posicao: index + 1
      }));
    });
  };
  
  // Update the entire queue (e.g., after admin changes)
  const updateQueue = (newQueue: WaitListItem[]) => {
    setQueue(newQueue);
    const current = newQueue.find(item => item.status === 'current');
    setCurrentPosition(current || null);
  };
  
  // Move to the next person in the queue
  const moveNext = () => {
    setQueue(prevQueue => {
      // Mark current as done
      const updatedQueue = prevQueue.map(item => {
        if (item.status === 'current') {
          return { ...item, status: 'done' };
        }
        return item;
      });
      
      // Find next waiting person
      const nextPerson = updatedQueue.find(item => item.status === 'waiting');
      if (nextPerson) {
        // Update to current
        const finalQueue = updatedQueue.map(item => {
          if (item.id === nextPerson.id) {
            setCurrentPosition({ ...item, status: 'current' });
            return { ...item, status: 'current' };
          }
          return item;
        });
        return finalQueue;
      }
      
      setCurrentPosition(null);
      return updatedQueue;
    });
  };

  return (
    <QueueContext.Provider 
      value={{ 
        queue, 
        addToQueue, 
        removeFromQueue, 
        updateQueue, 
        currentPosition,
        moveNext
      }}
    >
      {children}
    </QueueContext.Provider>
  );
};

export const useQueue = () => {
  const context = useContext(QueueContext);
  if (context === undefined) {
    throw new Error('useQueue must be used within a QueueProvider');
  }
  return context;
};
