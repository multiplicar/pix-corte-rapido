
import { Link, useNavigate } from 'react-router-dom';
import { Scissors, LogOut, Users } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const AdminHeader = () => {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    localStorage.removeItem('admin');
    toast.success("Logout realizado com sucesso!");
    navigate('/admin/login');
  };

  return (
    <header className="bg-barber-primary text-white py-4 shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center px-4">
        <Link to="/admin/dashboard" className="flex items-center space-x-2 text-barber-accent">
          <Scissors className="h-6 w-6" />
          <span className="text-xl font-bold">Admin Barber Shop</span>
        </Link>
        
        <nav className="hidden md:flex space-x-6">
          <Link to="/admin/dashboard" className="hover:text-barber-accent transition-colors">
            Dashboard
          </Link>
          <Link to="/admin/servicos" className="hover:text-barber-accent transition-colors">
            Serviços
          </Link>
          <Link to="/admin/agendamentos" className="hover:text-barber-accent transition-colors">
            Agendamentos
          </Link>
          <Link to="/admin/clientes" className="hover:text-barber-accent transition-colors">
            Clientes
          </Link>
          <Link to="/admin/config" className="hover:text-barber-accent transition-colors">
            Configurações
          </Link>
        </nav>
        
        <Button 
          variant="ghost" 
          onClick={handleLogout}
          className="flex items-center space-x-1 hover:text-barber-accent transition-colors"
        >
          <LogOut className="h-5 w-5" />
          <span className="hidden sm:inline">Sair</span>
        </Button>
      </div>
    </header>
  );
};

export default AdminHeader;
