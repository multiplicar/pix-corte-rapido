
import { useState } from 'react';
import AdminLayout from '@/components/layout/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { toast } from 'sonner';
import { Pencil, Trash, Plus } from 'lucide-react';

// Tipo para o serviço
interface Servico {
  id: string;
  nome: string;
  descricao: string;
  preco: number;
  duracao: number;
}

const AdminServicosPage = () => {
  // Estado para a lista de serviços
  const [servicos, setServicos] = useState<Servico[]>(() => {
    const savedServicos = localStorage.getItem('servicos');
    return savedServicos ? JSON.parse(savedServicos) : [
      { id: '1', nome: 'Corte de Cabelo', descricao: 'Corte masculino tradicional', preco: 50, duracao: 30 },
      { id: '2', nome: 'Barba', descricao: 'Modelagem e acabamento de barba', preco: 35, duracao: 20 },
      { id: '3', nome: 'Corte + Barba', descricao: 'Combo completo de corte e barba', preco: 75, duracao: 45 },
    ];
  });
  
  // Estado para o formulário de serviço
  const [novoServico, setNovoServico] = useState<Omit<Servico, 'id'>>({
    nome: '',
    descricao: '',
    preco: 0,
    duracao: 0
  });
  
  // Estado para controlar a edição
  const [editandoId, setEditandoId] = useState<string | null>(null);
  
  // Manipular mudanças no formulário
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNovoServico(prev => ({
      ...prev,
      [name]: name === 'preco' || name === 'duracao' ? Number(value) : value
    }));
  };
  
  // Adicionar ou atualizar serviço
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!novoServico.nome || novoServico.preco <= 0 || novoServico.duracao <= 0) {
      toast.error('Preencha todos os campos corretamente!');
      return;
    }
    
    if (editandoId) {
      // Atualizar serviço existente
      const atualizados = servicos.map(servico => 
        servico.id === editandoId ? { ...novoServico, id: editandoId } : servico
      );
      setServicos(atualizados);
      localStorage.setItem('servicos', JSON.stringify(atualizados));
      setEditandoId(null);
      toast.success('Serviço atualizado com sucesso!');
    } else {
      // Adicionar novo serviço
      const novoId = Date.now().toString();
      const novosServicos = [...servicos, { ...novoServico, id: novoId }];
      setServicos(novosServicos);
      localStorage.setItem('servicos', JSON.stringify(novosServicos));
      toast.success('Serviço adicionado com sucesso!');
    }
    
    // Resetar o formulário
    setNovoServico({
      nome: '',
      descricao: '',
      preco: 0,
      duracao: 0
    });
  };
  
  // Iniciar edição de um serviço
  const handleEditar = (servico: Servico) => {
    setNovoServico({
      nome: servico.nome,
      descricao: servico.descricao,
      preco: servico.preco,
      duracao: servico.duracao
    });
    setEditandoId(servico.id);
  };
  
  // Remover um serviço
  const handleRemover = (id: string) => {
    const atualizados = servicos.filter(servico => servico.id !== id);
    setServicos(atualizados);
    localStorage.setItem('servicos', JSON.stringify(atualizados));
    toast.success('Serviço removido com sucesso!');
  };
  
  // Cancelar a edição
  const handleCancelar = () => {
    setNovoServico({
      nome: '',
      descricao: '',
      preco: 0,
      duracao: 0
    });
    setEditandoId(null);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Gerenciar Serviços</h1>
        <p className="text-muted-foreground">Adicione, edite ou remova os serviços oferecidos pela barbearia.</p>
        
        <Card>
          <CardHeader>
            <CardTitle>{editandoId ? 'Editar Serviço' : 'Adicionar Novo Serviço'}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="nome">Nome do Serviço</Label>
                  <Input
                    id="nome"
                    name="nome"
                    placeholder="Ex: Corte de Cabelo"
                    value={novoServico.nome}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="preco">Preço (R$)</Label>
                    <Input
                      id="preco"
                      name="preco"
                      type="number"
                      min="0"
                      step="0.01"
                      placeholder="Ex: 50.00"
                      value={novoServico.preco}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="duracao">Duração (min)</Label>
                    <Input
                      id="duracao"
                      name="duracao"
                      type="number"
                      min="5"
                      step="5"
                      placeholder="Ex: 30"
                      value={novoServico.duracao}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="descricao">Descrição</Label>
                  <Textarea
                    id="descricao"
                    name="descricao"
                    placeholder="Descreva o serviço..."
                    value={novoServico.descricao}
                    onChange={handleChange}
                    className="min-h-20"
                  />
                </div>
              </div>
              
              <div className="flex space-x-2 justify-end">
                {editandoId && (
                  <Button type="button" variant="outline" onClick={handleCancelar}>
                    Cancelar
                  </Button>
                )}
                <Button 
                  type="submit" 
                  className="bg-barber-accent hover:bg-barber-accent/90"
                >
                  {editandoId ? 'Atualizar' : 'Adicionar'} Serviço
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Serviços Disponíveis</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Descrição</TableHead>
                  <TableHead>Preço</TableHead>
                  <TableHead>Duração</TableHead>
                  <TableHead className="w-[100px]">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {servicos.map((servico) => (
                  <TableRow key={servico.id}>
                    <TableCell className="font-medium">{servico.nome}</TableCell>
                    <TableCell>{servico.descricao}</TableCell>
                    <TableCell>R$ {servico.preco.toFixed(2)}</TableCell>
                    <TableCell>{servico.duracao} min</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEditar(servico)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleRemover(servico.id)}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {servicos.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center">
                      Nenhum serviço cadastrado. Adicione um novo serviço.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminServicosPage;
