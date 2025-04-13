
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { useApp } from "@/contexts/AppContext";
import { formatCurrency } from "@/lib/utils";
import { CalendarIcon, Clock, ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

const ConfirmacaoPage = () => {
  const { agendamento, atualizarDadosCliente, buscarClientePorTelefone } = useApp();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [nome, setNome] = useState(agendamento.nome || "");
  const [telefone, setTelefone] = useState(agendamento.telefone || "");
  const [buscando, setBuscando] = useState(false);
  
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
  
  const formatPhoneInput = (value: string) => {
    // Remove non-numeric characters
    let cleaned = value.replace(/\D/g, "");
    
    // Limit to max length
    cleaned = cleaned.substring(0, 11);
    
    // Format the phone number
    let formatted = "";
    if (cleaned.length <= 2) {
      formatted = cleaned;
    } else if (cleaned.length <= 6) {
      formatted = `(${cleaned.substring(0, 2)}) ${cleaned.substring(2)}`;
    } else if (cleaned.length <= 10) {
      formatted = `(${cleaned.substring(0, 2)}) ${cleaned.substring(
        2,
        6
      )}-${cleaned.substring(6)}`;
    } else {
      formatted = `(${cleaned.substring(0, 2)}) ${cleaned.substring(
        2,
        7
      )}-${cleaned.substring(7)}`;
    }
    
    return formatted;
  };
  
  const handleTelefoneChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedPhone = formatPhoneInput(e.target.value);
    setTelefone(formattedPhone);
    
    // Buscar cliente se o telefone estiver completo
    if (formattedPhone.length === 14 || formattedPhone.length === 15) {
      setBuscando(true);
      const cliente = await buscarClientePorTelefone(formattedPhone);
      
      if (cliente) {
        setNome(cliente.nome);
        toast({
          title: "Cliente encontrado",
          description: `Bem-vindo de volta, ${cliente.nome}!`,
        });
      }
      
      setBuscando(false);
    }
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
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
                <h2 className="text-xl font-semibold mb-4 pb-3 border-b">
                  Resumo do Agendamento
                </h2>
                
                {agendamento.servico && (
                  <>
                    <div className="mb-4">
                      <h3 className="font-medium text-barber-primary">Serviço:</h3>
                      <p className="text-lg">{agendamento.servico.nome}</p>
                      <div className="flex justify-between items-center mt-1">
                        <span className="text-gray-600 flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {agendamento.servico.tempo}
                        </span>
                        <span className="font-bold text-barber-secondary">
                          {formatCurrency(agendamento.servico.preco)}
                        </span>
                      </div>
                    </div>
                    
                    {agendamento.data && agendamento.hora && (
                      <div className="mb-4">
                        <h3 className="font-medium text-barber-primary">Data e Hora:</h3>
                        <p className="flex items-center mt-1">
                          <CalendarIcon className="h-4 w-4 mr-1" />
                          {agendamento.data.toLocaleDateString('pt-BR')} às{" "}
                          {agendamento.hora}
                        </p>
                      </div>
                    )}
                  </>
                )}
                
                <Button
                  onClick={() => navigate("/agendar")}
                  variant="outline"
                  className="w-full mt-4 border-barber-secondary text-barber-secondary hover:bg-barber-secondary hover:text-white"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" /> Modificar Agendamento
                </Button>
              </div>
            </div>
            
            {/* Formulário de dados pessoais simplificado */}
            <div className="md:col-span-2">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-6">Seus Dados</h2>
                
                <form onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="telefone">Telefone *</Label>
                      <div className="relative">
                        <Input
                          id="telefone"
                          value={telefone}
                          onChange={handleTelefoneChange}
                          placeholder="(99) 99999-9999"
                          required
                        />
                        {buscando && (
                          <div className="absolute right-3 top-1/2 -translate-y-1/2">
                            <Loader2 className="h-4 w-4 animate-spin text-barber-secondary" />
                          </div>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        Digite seu telefone para buscar seus dados
                      </p>
                    </div>
                    
                    <div>
                      <Label htmlFor="nome">Nome completo *</Label>
                      <Input
                        id="nome"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        placeholder="Seu nome completo"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="mt-8">
                    <Button
                      type="submit"
                      className="w-full bg-barber-accent hover:bg-amber-600 text-black"
                      size="lg"
                    >
                      Prosseguir para Pagamento <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ConfirmacaoPage;
