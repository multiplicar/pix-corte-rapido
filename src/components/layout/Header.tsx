
import { Link } from 'react-router-dom';
import { Scissors, UserRound, Timer, Settings } from 'lucide-react';
import { useState, useEffect } from 'react';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  useEffect(() => {
    // Verificar se o cliente está logado
    const clienteData = localStorage.getItem('cliente');
    if (clienteData) {
      const cliente = JSON.parse(clienteData);
      setIsLoggedIn(cliente.isLoggedIn || false);
    }
  }, []);

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
          <Link to="/fila-espera" className="hover:text-barber-accent transition-colors flex items-center">
            <Timer className="h-4 w-4 mr-1" />
            Fila de Espera
          </Link>
        </nav>
        
        <div className="flex items-center space-x-4">
          <Link 
            to={isLoggedIn ? "/cliente/perfil" : "/cliente/login"}
            className="flex items-center space-x-1 hover:text-barber-accent transition-colors"
          >
            <UserRound className="h-5 w-5" />
            <span className="hidden sm:inline">
              {isLoggedIn ? "Minha Conta" : "Entrar"}
            </span>
          </Link>
          
          <Link 
            to="/admin/login"
            className="flex items-center space-x-1 hover:text-barber-accent transition-colors"
            title="Área do Administrador"
          >
            <Settings className="h-5 w-5" />
            <span className="hidden sm:inline">Admin</span>
          </Link>
          
          <Link 
            to="/agendar"
            className="bg-barber-red hover:bg-red-700 text-white px-4 py-2 rounded-md transition-colors"
          >
            Agendar Agora
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
