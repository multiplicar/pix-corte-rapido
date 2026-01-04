
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { ArrowRight, Loader2 } from "lucide-react";
import { Cliente } from "@/contexts/AppContext";

interface CustomerFormProps {
  nome: string;
  telefone: string;
  setNome: (nome: string) => void;
  setTelefone: (telefone: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  buscarClientePorTelefone: (telefone: string) => Promise<Cliente | null>;
}

const CustomerForm = ({
  nome,
  telefone,
  setNome,
  setTelefone,
  onSubmit,
  buscarClientePorTelefone
}: CustomerFormProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [buscando, setBuscando] = useState(false);
  
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
      
      <form onSubmit={onSubmit}>
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
  );
};

export default CustomerForm;
