
import { Servico } from '@/contexts/AppContext';
import { useNavigate } from 'react-router-dom';
import { Clock } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/lib/utils';

interface ServicoCardProps {
  servico: Servico;
}

const ServicoCard = ({ servico }: ServicoCardProps) => {
  const { setAgendamento } = useApp();
  const navigate = useNavigate();

  const handleSelect = () => {
    setAgendamento(prev => ({ ...prev, servico }));
    navigate('/agendar');
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
      <div className="h-48 overflow-hidden">
        <img 
          src={servico.imagem} 
          alt={servico.nome} 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-5">
        <h3 className="text-lg font-semibold text-barber-primary mb-2">{servico.nome}</h3>
        <p className="text-gray-600 text-sm mb-3">{servico.descricao}</p>
        <div className="flex items-center text-gray-500 mb-4">
          <Clock className="h-4 w-4 mr-1" />
          <span className="text-sm">{servico.duracao} min</span>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-barber-secondary font-bold text-lg">
            {formatCurrency(servico.preco)}
          </p>
          <Button 
            onClick={handleSelect}
            className="bg-barber-accent hover:bg-amber-600 text-black"
          >
            Agendar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ServicoCard;
