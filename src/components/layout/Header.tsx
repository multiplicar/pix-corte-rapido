
import { Link } from 'react-router-dom';
import { Scissors } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-barber-primary text-white py-4 shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center px-4">
        <Link to="/" className="flex items-center space-x-2 text-barber-accent">
          <Scissors className="h-6 w-6" />
          <span className="text-xl font-bold">Barber Shop</span>
        </Link>
        
        <nav className="hidden md:flex space-x-6">
          <Link to="/" className="hover:text-barber-accent transition-colors">
            Início
          </Link>
          <Link to="/servicos" className="hover:text-barber-accent transition-colors">
            Serviços
          </Link>
          <Link to="/agendar" className="hover:text-barber-accent transition-colors">
            Agendar
          </Link>
        </nav>
        
        <Link 
          to="/agendar"
          className="bg-barber-red hover:bg-red-700 text-white px-4 py-2 rounded-md transition-colors"
        >
          Agendar Agora
        </Link>
      </div>
    </header>
  );
};

export default Header;
