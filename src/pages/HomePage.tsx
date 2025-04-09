
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CheckCircle, Scissors, Calendar, CreditCard } from "lucide-react";
import { servicos } from "@/data/servicos";
import ServicoCard from "@/components/cards/ServicoCard";

const HomePage = () => {
  // Mostrar apenas 3 serviços na página inicial
  const servicosDestaque = servicos.slice(0, 3);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-barber-primary text-white">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div 
          className="h-[600px] bg-cover bg-center" 
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1622286342621-4bd786c2447c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80')"
          }}
        >
          <div className="container mx-auto px-4 h-full flex items-center relative z-10">
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Estilo e Precisão <span className="text-barber-accent">para o Homem Moderno</span>
              </h1>
              <p className="text-lg mb-8 text-gray-200">
                Agende seu horário em nossa barbearia e experimente um serviço premium com pagamento fácil via PIX.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button 
                  asChild
                  size="lg" 
                  className="bg-barber-red hover:bg-red-700"
                >
                  <Link to="/servicos">Ver Serviços</Link>
                </Button>
                <Button 
                  asChild
                  size="lg" 
                  className="bg-barber-accent hover:bg-amber-600 text-black"
                >
                  <Link to="/agendar">Agendar Agora</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Como Funciona */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-barber-primary">
            Como <span className="text-barber-accent">Funciona</span>
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="mb-4 flex justify-center">
                <Scissors className="h-12 w-12 text-barber-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-barber-primary">1. Escolha o Serviço</h3>
              <p className="text-gray-600">
                Selecione entre nossos serviços especializados com preços transparentes.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="mb-4 flex justify-center">
                <Calendar className="h-12 w-12 text-barber-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-barber-primary">2. Agende o Horário</h3>
              <p className="text-gray-600">
                Escolha a data e horário que melhor se encaixa na sua agenda.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="mb-4 flex justify-center">
                <CreditCard className="h-12 w-12 text-barber-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-barber-primary">3. Pague com PIX</h3>
              <p className="text-gray-600">
                Confirmação instantânea com pagamento seguro via PIX do Mercado Pago.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Serviços em Destaque */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4 text-barber-primary">
            Serviços em <span className="text-barber-accent">Destaque</span>
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Conheça nossos serviços mais populares realizados por barbeiros experientes.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            {servicosDestaque.map(servico => (
              <ServicoCard key={servico.id} servico={servico} />
            ))}
          </div>
          
          <div className="text-center mt-10">
            <Button 
              asChild
              className="bg-barber-primary hover:bg-gray-800"
            >
              <Link to="/servicos">Ver Todos os Serviços</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Diferenciais */}
      <section className="py-16 bg-barber-primary text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Por Que Nos <span className="text-barber-accent">Escolher</span>
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex items-start space-x-4">
              <CheckCircle className="h-6 w-6 text-barber-accent flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-semibold mb-2">Profissionais Qualificados</h3>
                <p className="text-gray-400">
                  Nossa equipe é formada por barbeiros com anos de experiência.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <CheckCircle className="h-6 w-6 text-barber-accent flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-semibold mb-2">Ambiente Exclusivo</h3>
                <p className="text-gray-400">
                  Local confortável e bem estruturado para momentos de cuidado e relaxamento.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <CheckCircle className="h-6 w-6 text-barber-accent flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-semibold mb-2">Produtos Premium</h3>
                <p className="text-gray-400">
                  Utilizamos apenas produtos de alta qualidade para garantir o melhor resultado.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <CheckCircle className="h-6 w-6 text-barber-accent flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-semibold mb-2">Pagamento Fácil</h3>
                <p className="text-gray-400">
                  Agendamento online e pagamento rápido via PIX do Mercado Pago.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-barber-accent">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6 text-barber-primary">
            Pronto para um Novo Visual?
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto text-barber-primary">
            Agende seu horário online agora mesmo e venha experimentar o melhor serviço de barbearia da cidade.
          </p>
          <Button 
            asChild
            size="lg"
            className="bg-barber-primary hover:bg-gray-800 text-white"
          >
            <Link to="/agendar">Agendar Agora</Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default HomePage;
