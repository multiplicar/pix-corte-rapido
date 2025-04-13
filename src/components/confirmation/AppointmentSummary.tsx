
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import { CalendarIcon, Clock, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Servico } from "@/data/servicos";

interface AppointmentSummaryProps {
  servico?: Servico;
  data?: Date;
  hora?: string;
}

const AppointmentSummary = ({ servico, data, hora }: AppointmentSummaryProps) => {
  const navigate = useNavigate();
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
      <h2 className="text-xl font-semibold mb-4 pb-3 border-b">
        Resumo do Agendamento
      </h2>
      
      {servico && (
        <>
          <div className="mb-4">
            <h3 className="font-medium text-barber-primary">Serviço:</h3>
            <p className="text-lg">{servico.nome}</p>
            <div className="flex justify-between items-center mt-1">
              <span className="text-gray-600 flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                {servico.tempo}
              </span>
              <span className="font-bold text-barber-secondary">
                {formatCurrency(servico.preco)}
              </span>
            </div>
          </div>
          
          {data && hora && (
            <div className="mb-4">
              <h3 className="font-medium text-barber-primary">Data e Hora:</h3>
              <p className="flex items-center mt-1">
                <CalendarIcon className="h-4 w-4 mr-1" />
                {data.toLocaleDateString('pt-BR')} às{" "}
                {hora}
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
  );
};

export default AppointmentSummary;
