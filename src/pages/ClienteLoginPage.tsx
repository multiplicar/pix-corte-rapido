
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from '@/hooks/use-toast';
import { User, UserPlus, UserRound } from 'lucide-react';

const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  senha: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
});

const cadastroSchema = z.object({
  nome: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres'),
  email: z.string().email('Email inválido'),
  senha: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
  confirmarSenha: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
}).refine((data) => data.senha === data.confirmarSenha, {
  message: "As senhas não coincidem",
  path: ["confirmarSenha"],
});

type LoginForm = z.infer<typeof loginSchema>;
type CadastroForm = z.infer<typeof cadastroSchema>;

const ClienteLoginPage = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const loginForm = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      senha: '',
    },
  });

  const cadastroForm = useForm<CadastroForm>({
    resolver: zodResolver(cadastroSchema),
    defaultValues: {
      nome: '',
      email: '',
      senha: '',
      confirmarSenha: '',
    },
  });

  const onLoginSubmit = (data: LoginForm) => {
    setIsLoading(true);
    
    // Simulando um login
    setTimeout(() => {
      // Aqui você implementaria a lógica real de autenticação
      // Por enquanto vamos apenas simular um login bem-sucedido
      localStorage.setItem('cliente', JSON.stringify({ 
        email: data.email, 
        isLoggedIn: true 
      }));
      
      toast({
        title: "Login realizado com sucesso!",
        description: "Bem-vindo de volta à Barber Shop.",
      });
      
      navigate('/cliente/perfil');
      setIsLoading(false);
    }, 1500);
  };

  const onCadastroSubmit = (data: CadastroForm) => {
    setIsLoading(true);
    
    // Simulando um cadastro
    setTimeout(() => {
      // Aqui você implementaria a lógica real de cadastro
      // Por enquanto vamos apenas simular um cadastro bem-sucedido
      localStorage.setItem('cliente', JSON.stringify({ 
        nome: data.nome,
        email: data.email, 
        isLoggedIn: true 
      }));
      
      toast({
        title: "Cadastro realizado com sucesso!",
        description: "Bem-vindo à Barber Shop.",
      });
      
      navigate('/cliente/perfil');
      setIsLoading(false);
    }, 1500);
  };

  return (
    <Layout>
      <div className="container mx-auto py-10 px-4">
        <div className="max-w-md mx-auto">
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>Login</span>
              </TabsTrigger>
              <TabsTrigger value="cadastro" className="flex items-center gap-2">
                <UserPlus className="h-4 w-4" />
                <span>Cadastro</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <Card>
                <CardHeader>
                  <CardTitle>Acesse sua conta</CardTitle>
                  <CardDescription>
                    Entre com seu email e senha para acessar sua área de cliente.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...loginForm}>
                    <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
                      <FormField
                        control={loginForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input placeholder="seu@email.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={loginForm.control}
                        name="senha"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Senha</FormLabel>
                            <FormControl>
                              <Input type="password" placeholder="••••••" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <Button 
                        type="submit" 
                        className="w-full bg-barber-red hover:bg-red-700"
                        disabled={isLoading}
                      >
                        {isLoading ? "Entrando..." : "Entrar"}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="cadastro">
              <Card>
                <CardHeader>
                  <CardTitle>Crie sua conta</CardTitle>
                  <CardDescription>
                    Cadastre-se para agendar seus serviços com facilidade.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...cadastroForm}>
                    <form onSubmit={cadastroForm.handleSubmit(onCadastroSubmit)} className="space-y-4">
                      <FormField
                        control={cadastroForm.control}
                        name="nome"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nome completo</FormLabel>
                            <FormControl>
                              <Input placeholder="João Silva" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={cadastroForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input placeholder="seu@email.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={cadastroForm.control}
                        name="senha"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Senha</FormLabel>
                            <FormControl>
                              <Input type="password" placeholder="••••••" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={cadastroForm.control}
                        name="confirmarSenha"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Confirmar senha</FormLabel>
                            <FormControl>
                              <Input type="password" placeholder="••••••" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <Button 
                        type="submit" 
                        className="w-full bg-barber-accent hover:bg-amber-600 text-black"
                        disabled={isLoading}
                      >
                        {isLoading ? "Criando conta..." : "Criar conta"}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default ClienteLoginPage;
