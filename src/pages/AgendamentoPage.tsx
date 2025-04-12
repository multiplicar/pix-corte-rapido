
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { useApp } from "@/contexts/AppContext";
import { servicos } from "@/data/servicos";
import { formatCurrency, timeSlots } from "@/lib/utils";
import { CalendarIcon, Clock } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const AgendamentoPage = () => {
  const { agendamento, selecionarServico, selecionarDataHora } = useApp();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(agendamento.data);
  const [selectedTime, setSelectedTime] = useState<string | undefined>(agendamento.hora);
  const [selectedService, setSelectedService] = useState(agendamento.servico || null);
  
  const slots = timeSlots();
  
  // Gerar uma lista de datas disponíveis (próximos 30 dias, excluindo domingos)
  const disabledDates = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const thirtyDaysFromNow = new Date();
    thirtyDaysFromNow.setDate(today.getDate() + 30);
    
    return date < today || date > thirtyDaysFromNow || date.getDay() === 0;
  };
  
  const handleServiceSelect = (servico: typeof servicos[0]) => {
    setSelectedService(servico);
  };
  
  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    // Reset time when date changes
    setSelectedTime(undefined);
  };
  
  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };
  
  const handleContinue = () => {
    if (!selectedService) {
      toast({
        title: "Selecione um serviço",
        description: "Por favor, escolha um serviço para continuar.",
        variant: "destructive",
      });
      return;
    }
    
    if (!selectedDate) {
      toast({
        title: "Selecione uma data",
        description: "Por favor, escolha uma data para o agendamento.",
        variant: "destructive",
      });
      return;
    }
    
    if (!selectedTime) {
      toast({
        title: "Selecione um horário",
        description: "Por favor, escolha um horário disponível.",
        variant: "destructive",
      });
      return;
    }
    
    selecionarServico(selectedService);
    selecionarDataHora(selectedDate, selectedTime);
    
    navigate("/confirmar");
  };
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-center mb-8 text-barber-primary">
          Agende seu <span className="text-barber-accent">Horário</span>
        </h1>
        
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Serviços */}
            <div>
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <span className="bg-barber-primary text-white rounded-full w-6 h-6 inline-flex items-center justify-center mr-2">1</span>
                Selecione o Serviço
              </h2>
              <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
                {servicos.map((servico) => (
                  <div
                    key={servico.id}
                    className={`p-3 border rounded-md cursor-pointer transition-colors ${
                      selectedService?.id === servico.id
                        ? "border-barber-accent bg-barber-accent bg-opacity-10"
                        : "border-gray-200 hover:border-barber-accent"
                    }`}
                    onClick={() => handleServiceSelect(servico)}
                  >
                    <div className="font-medium">{servico.nome}</div>
                    <div className="flex justify-between items-center mt-1">
                      <span className="text-gray-600 text-sm flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {servico.tempo}
                      </span>
                      <span className="font-semibold text-barber-secondary">
                        {formatCurrency(servico.preco)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Data */}
            <div>
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <span className="bg-barber-primary text-white rounded-full w-6 h-6 inline-flex items-center justify-center mr-2">2</span>
                Escolha a Data
              </h2>
              <div className="border rounded-md p-3">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={handleDateSelect}
                  disabled={disabledDates}
                  className="pointer-events-auto"
                />
              </div>
            </div>
            
            {/* Horário */}
            <div>
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <span className="bg-barber-primary text-white rounded-full w-6 h-6 inline-flex items-center justify-center mr-2">3</span>
                Escolha o Horário
              </h2>
              <div className="grid grid-cols-2 gap-2 max-h-[400px] overflow-y-auto pr-2">
                {slots.map((time) => (
                  <div
                    key={time}
                    className={`p-2 border rounded-md text-center cursor-pointer transition-colors ${
                      selectedTime === time
                        ? "border-barber-accent bg-barber-accent bg-opacity-10"
                        : "border-gray-200 hover:border-barber-accent"
                    } ${!selectedDate ? "opacity-50 cursor-not-allowed" : ""}`}
                    onClick={() => selectedDate && handleTimeSelect(time)}
                  >
                    {time}
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Resumo e botão de continuar */}
          <div className="mt-8 pt-6 border-t">
            <div className="flex flex-col md:flex-row md:items-center justify-between">
              <div>
                <h3 className="font-semibold text-lg mb-1">Resumo:</h3>
                <div className="text-gray-600">
                  {selectedService ? (
                    <p>
                      <span className="font-medium">{selectedService.nome}</span> -{" "}
                      <span>{formatCurrency(selectedService.preco)}</span>
                    </p>
                  ) : (
                    <p>Nenhum serviço selecionado</p>
                  )}
                  {selectedDate && selectedTime ? (
                    <p className="flex items-center mt-1">
                      <CalendarIcon className="h-4 w-4 mr-1" />
                      {selectedDate.toLocaleDateString('pt-BR')} às {selectedTime}
                    </p>
                  ) : (
                    <p>Nenhuma data selecionada</p>
                  )}
                </div>
              </div>
              <Button
                onClick={handleContinue}
                className="mt-4 md:mt-0 bg-barber-accent hover:bg-amber-600 text-black"
                size="lg"
              >
                Continuar
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AgendamentoPage;
