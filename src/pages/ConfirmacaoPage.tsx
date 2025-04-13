
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { useApp } from "@/contexts/AppContext";
import { useToast } from "@/components/ui/use-toast";
import AppointmentSummary from "@/components/confirmation/AppointmentSummary";
import CustomerForm from "@/components/confirmation/CustomerForm";

const ConfirmacaoPage = () => {
  const { agendamento, atualizarDadosCliente, buscarClientePorTelefone } = useApp();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [nome, setNome] = useState(agendamento.nome || "");
  const [telefone, setTelefone] = useState(agendamento.telefone || "");
  
  useEffect(() => {
    // Verificar se tem serviço e data selecionados
    if (!agendamento.servico || !agendamento.data || !agendamento.hora) {
      toast({
        title: "Informações incompletas",
        description: "Por favor, selecione o serviço, data e horário primeiro.",
        variant: "destructive",
      });
      navigate("/agendar");
    }
  }, [agendamento, navigate, toast]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validação básica
    if (!nome || !telefone) {
      toast({
        title: "Preencha os campos obrigatórios",
        description: "Nome e telefone são obrigatórios.",
        variant: "destructive",
      });
      return;
    }
    
    // Phone validation (simple)
    const phoneRegex = /^\(\d{2}\) \d{4,5}-\d{4}$/;
    if (!phoneRegex.test(telefone)) {
      toast({
        title: "Telefone inválido",
        description: "Use o formato (99) 99999-9999 ou (99) 9999-9999.",
        variant: "destructive",
      });
      return;
    }
    
    // Atualizar o estado de agendamento
    // Usamos uma string vazia como email para manter a compatibilidade
    atualizarDadosCliente(nome, "", telefone);
    
    // Navegar para a página de pagamento
    navigate("/pagamento");
  };
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-center mb-8 text-barber-primary">
          Confirme seus <span className="text-barber-accent">Dados</span>
        </h1>
        
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Resumo do agendamento */}
            <div className="md:col-span-1">
              <AppointmentSummary 
                servico={agendamento.servico}
                data={agendamento.data}
                hora={agendamento.hora}
              />
            </div>
            
            {/* Formulário de dados pessoais simplificado */}
            <div className="md:col-span-2">
              <CustomerForm 
                nome={nome}
                telefone={telefone}
                setNome={setNome}
                setTelefone={setTelefone}
                onSubmit={handleSubmit}
                buscarClientePorTelefone={buscarClientePorTelefone}
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ConfirmacaoPage;
