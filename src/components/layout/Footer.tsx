
import { Scissors, Phone, Mail, MapPin, Instagram, Facebook } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-barber-primary text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-2 text-barber-accent mb-4">
              <Scissors className="h-6 w-6" />
              <span className="text-xl font-bold">Barber Shop</span>
            </div>
            <p className="text-gray-400 mb-4">
              Oferecemos os melhores serviços de barbearia, com profissionais 
              qualificados e ambiente aconchegante.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-barber-accent">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-barber-accent">
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-barber-accent">Contato</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-gray-400">
                <Phone className="h-5 w-5" />
                <span>(11) 9999-9999</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-400">
                <Mail className="h-5 w-5" />
                <span>contato@barbershop.com</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-400">
                <MapPin className="h-5 w-5" />
                <span>Rua Exemplo, 123 - São Paulo/SP</span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-barber-accent">Horário de Funcionamento</h3>
            <div className="space-y-2 text-gray-400">
              <p>Segunda a Sexta: 9h às 20h</p>
              <p>Sábados: 9h às 18h</p>
              <p>Domingos: Fechado</p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-6 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} Barber Shop. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
