
import { useApp } from '@/contexts/AppContext';
import { Mail, Phone, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

const ClientesRecentes = () => {
  const { clientes } = useApp();
  
  // Ordenar os clientes por data de cadastro (mais recentes primeiro)
  const clientesRecentes = [...clientes]
    .sort((a, b) => new Date(b.dataCadastro).getTime() - new Date(a.dataCadastro).getTime())
    .slice(0, 5); // Pegar apenas os 5 mais recentes
  
  const formatarData = (data: Date) => {
    return data.toLocaleDateString('pt-BR');
  };

  return (
    <div className="space-y-4">
      {clientesRecentes.map((cliente) => (
        <div key={cliente.id} className="flex justify-between items-center border-b pb-4 last:border-b-0 last:pb-0">
          <div>
            <p className="font-medium">{cliente.nome}</p>
            <div className="flex items-center text-sm text-muted-foreground mt-1">
              <Phone className="mr-1 h-3.5 w-3.5" />
              {cliente.telefone}
            </div>
            {cliente.email && (
              <div className="flex items-center text-sm text-muted-foreground mt-1">
                <Mail className="mr-1 h-3.5 w-3.5" />
                {cliente.email}
              </div>
            )}
          </div>
          <div className="text-right">
            <div className="flex items-center text-sm text-muted-foreground">
              <Calendar className="mr-1 h-3.5 w-3.5" />
              {formatarData(cliente.dataCadastro)}
            </div>
          </div>
        </div>
      ))}
      
      {clientesRecentes.length === 0 && (
        <div className="text-center py-6 text-muted-foreground">
          Nenhum cliente cadastrado.
        </div>
      )}
      
      <div className="text-center mt-2">
        <Link
          to="/admin/clientes"
          className="text-sm text-barber-primary hover:text-barber-primary/80 transition-colors"
        >
          Ver todos os clientes
        </Link>
      </div>
    </div>
  );
};

export default ClientesRecentes;
