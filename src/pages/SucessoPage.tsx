
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { useApp } from "@/contexts/AppContext";
import { formatCurrency } from "@/lib/utils";
import { CalendarIcon, Clock, Check, Home } from "lucide-react";

const SucessoPage = () => {
  const { agendamento, resetAgendamento } = useApp();
  const navigate = useNavigate();
  
  // Gerar um número de confirmação aleatório (simulação)
  const confirmationNumber = Math.floor(10000 + Math.random() * 90000);
  
  useEffect(() => {
    // Verificar se tem todas as informações necessárias
    if (!agendamento.servico || !agendamento.data || !agendamento.hora || !agendamento.nome) {
      navigate("/");
      return;
    }
  }, [agendamento, navigate]);
  
  // Limpar o agendamento quando o usuário sair desta página
  useEffect(() => {
    return () => {
      resetAgendamento();
    };
  }, [resetAgendamento]);
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-barber-primary mb-2">
              Agendamento Confirmado!
            </h1>
            <p className="text-gray-600">
              Seu horário foi agendado com sucesso. Enviamos os detalhes para seu email.
            </p>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-lg mb-8">
            <h2 className="text-lg font-semibold mb-4 pb-2 border-b">
              Detalhes do Agendamento
            </h2>
            
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Número de confirmação</p>
                <p className="font-medium">{confirmationNumber}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Serviço</p>
                <p className="font-medium">{agendamento.servico?.nome}</p>
              </div>
              
              <div className="flex justify-between">
                <div>
                  <p className="text-sm text-gray-500">Data e Hora</p>
                  <p className="font-medium flex items-center">
                    <CalendarIcon className="h-4 w-4 mr-1" />
                    {agendamento.data?.toLocaleDateString('pt-BR')} às {agendamento.hora}
                  </p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Duração</p>
                  <p className="font-medium flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {agendamento.servico?.duracao} min
                  </p>
                </div>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Cliente</p>
                <p className="font-medium">{agendamento.nome}</p>
              </div>
              
              <div className="pt-3 mt-3 border-t">
                <div className="flex justify-between">
                  <p className="font-semibold">Total pago:</p>
                  <p className="font-bold text-barber-secondary">
                    {agendamento.servico && formatCurrency(agendamento.servico.preco)}
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center space-y-4">
            <p className="text-gray-600">
              Lembre-se de chegar 10 minutos antes do seu horário agendado.
            </p>
            
            <Button asChild className="bg-barber-primary hover:bg-gray-800">
              <Link to="/">
                <Home className="h-4 w-4 mr-2" />
                Voltar para a Página Inicial
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SucessoPage;
