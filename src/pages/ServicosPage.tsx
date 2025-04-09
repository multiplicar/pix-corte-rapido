
import Layout from "@/components/layout/Layout";
import { servicos } from "@/data/servicos";
import ServicoCard from "@/components/cards/ServicoCard";

const ServicosPage = () => {
  return (
    <Layout>
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-barber-primary">
              Nossos <span className="text-barber-accent">Serviços</span>
            </h1>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              Conheça todos os serviços oferecidos pela nossa barbearia. Qualidade e estilo garantidos por profissionais experientes.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicos.map(servico => (
              <ServicoCard key={servico.id} servico={servico} />
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ServicosPage;
