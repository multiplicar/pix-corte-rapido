
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, MessageCircle } from "lucide-react";
import { Cliente } from "@/contexts/AppContext";
import { Servico } from "@/data/servicos";

interface CustomerFormProps {
  nome: string;
  telefone: string;
  setNome: (nome: string) => void;
  setTelefone: (telefone: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  buscarClientePorTelefone: (telefone: string) => Promise<Cliente | null>;
  servico?: Servico;
  data?: Date;
  hora?: string;
}

// Número do WhatsApp da barbearia (formato: 55 + DDD + número)
const WHATSAPP_BARBEARIA = "5521991492816";

const CustomerForm = ({
  nome,
  telefone,
  setNome,
  setTelefone,
  onSubmit,
  buscarClientePorTelefone,
  servico,
  data,
  hora
}: CustomerFormProps) => {
  const { toast } = useToast();
  const [buscando, setBuscando] = useState(false);

  const formatarData = (data: Date) => {
    return data.toLocaleDateString('pt-BR', {
      weekday: 'long',
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  const handleEnviarWhatsApp = (e: React.FormEvent) => {
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

    // Phone validation
    const phoneRegex = /^\(\d{2}\) \d{4,5}-\d{4}$/;
    if (!phoneRegex.test(telefone)) {
      toast({
        title: "Telefone inválido",
        description: "Use o formato (99) 99999-9999 ou (99) 9999-9999.",
        variant: "destructive",
      });
      return;
    }

    // Chamar onSubmit para salvar dados do cliente
    onSubmit(e);

    // Montar mensagem para WhatsApp
    const mensagem = `Olá! Gostaria de agendar:

📋 *Serviço:* ${servico?.nome || 'Não especificado'}
📅 *Data:* ${data ? formatarData(data) : 'Não especificada'}
⏰ *Horário:* ${hora || 'Não especificado'}
💰 *Valor:* R$ ${servico?.preco?.toFixed(2) || '0,00'}

👤 *Nome:* ${nome}
📱 *Telefone:* ${telefone}

Aguardo confirmação! 🙏`;

    const mensagemCodificada = encodeURIComponent(mensagem);
    const urlWhatsApp = `https://wa.me/${WHATSAPP_BARBEARIA}?text=${mensagemCodificada}`;
    
    // Redireciona diretamente (funciona melhor fora do iframe de preview)
    window.location.href = urlWhatsApp;
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
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-6">Seus Dados</h2>
      
      <form onSubmit={handleEnviarWhatsApp}>
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
            className="w-full bg-green-600 hover:bg-green-700 text-white"
            size="lg"
          >
            <MessageCircle className="h-5 w-5 mr-2" />
            Enviar para WhatsApp da Barbearia
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CustomerForm;
