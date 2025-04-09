
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center p-8 bg-white rounded-lg shadow-md max-w-md">
        <h1 className="text-6xl font-bold mb-4 text-barber-primary">404</h1>
        <p className="text-2xl text-barber-secondary mb-6">Página Não Encontrada</p>
        <p className="text-gray-600 mb-8">
          A página que você está procurando não existe ou foi removida.
        </p>
        <Button asChild className="bg-barber-accent hover:bg-amber-600 text-black">
          <Link to="/">
            <Home className="h-4 w-4 mr-2" />
            Voltar para a Página Inicial
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
