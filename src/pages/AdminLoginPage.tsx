
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Scissors } from "lucide-react";

const AdminLoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simples autenticação - em um cenário real, usaria Supabase ou outra solução segura
    if (username === "admin" && password === "barbershop123") {
      localStorage.setItem("admin", JSON.stringify({ isLoggedIn: true }));
      toast.success("Login realizado com sucesso!");
      navigate("/admin/dashboard");
    } else {
      toast.error("Credenciais inválidas!");
    }
  };

  return (
    <div className="container flex items-center justify-center min-h-[calc(100vh-16rem)]">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-4">
            <Scissors className="h-10 w-10 text-barber-accent" />
          </div>
          <CardTitle className="text-2xl text-center">Área do Administrador</CardTitle>
          <CardDescription className="text-center">
            Entre com suas credenciais para acessar a área administrativa
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Input
                  id="username"
                  placeholder="Usuário"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Input
                  id="password"
                  type="password"
                  placeholder="Senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full bg-barber-accent hover:bg-barber-accent/90">
                Entrar
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-muted-foreground">
            Acesso exclusivo para administradores da barbearia
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AdminLoginPage;
