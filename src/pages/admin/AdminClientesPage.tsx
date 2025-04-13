
import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/layout/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useApp } from '@/contexts/AppContext';
import { useToast } from '@/hooks/use-toast';
import { 
  Users, 
  Mail, 
  Phone, 
  Calendar, 
  Search, 
  UserPlus,
  ArrowUpDown
} from 'lucide-react';

const AdminClientesPage = () => {
  const { clientes, getAgendamentosByClienteId } = useApp();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredClientes, setFilteredClientes] = useState(clientes);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  
  useEffect(() => {
    const filtered = clientes.filter(cliente => 
      cliente.nome.toLowerCase().includes(searchTerm.toLowerCase()) || 
      cliente.telefone.includes(searchTerm) ||
      (cliente.email && cliente.email.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    
    // Ordenar por data de cadastro
    filtered.sort((a, b) => {
      if (sortOrder === 'desc') {
        return new Date(b.dataCadastro).getTime() - new Date(a.dataCadastro).getTime();
      }
      return new Date(a.dataCadastro).getTime() - new Date(b.dataCadastro).getTime();
    });
    
    setFilteredClientes(filtered);
  }, [clientes, searchTerm, sortOrder]);
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  
  const toggleSortOrder = () => {
    setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
  };
  
  const formatarData = (data: Date) => {
    return data.toLocaleDateString('pt-BR');
  };
  
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">Clientes</h1>
            <p className="text-muted-foreground">Gerenciamento de clientes cadastrados</p>
          </div>
          
          <Button className="bg-barber-primary hover:bg-barber-primary/90">
            <UserPlus className="h-4 w-4 mr-2" />
            Adicionar Cliente
          </Button>
        </div>
        
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl">Clientes Cadastrados</CardTitle>
                <CardDescription>
                  Total de {clientes.length} clientes registrados no sistema
                </CardDescription>
              </div>
              <div className="rounded-full bg-barber-primary/10 p-2">
                <Users className="h-5 w-5 text-barber-primary" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="mb-4 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Buscar por nome, telefone ou email..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="pl-10"
              />
            </div>
            
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Telefone</TableHead>
                  <TableHead onClick={toggleSortOrder} className="cursor-pointer">
                    <div className="flex items-center">
                      Data de Cadastro
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead>Agendamentos</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredClientes.length > 0 ? (
                  filteredClientes.map((cliente) => {
                    const agendamentosCliente = getAgendamentosByClienteId(cliente.id);
                    
                    return (
                      <TableRow key={cliente.id}>
                        <TableCell className="font-medium">{cliente.nome}</TableCell>
                        <TableCell>
                          {cliente.email ? (
                            <div className="flex items-center">
                              <Mail className="mr-1 h-3.5 w-3.5 text-gray-500" />
                              {cliente.email}
                            </div>
                          ) : (
                            <span className="text-muted-foreground text-sm">Não informado</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <Phone className="mr-1 h-3.5 w-3.5 text-gray-500" />
                            {cliente.telefone}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <Calendar className="mr-1 h-3.5 w-3.5 text-gray-500" />
                            {formatarData(cliente.dataCadastro)}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <span className="bg-barber-secondary/20 text-barber-secondary rounded-full px-2 py-1 text-xs font-medium">
                              {agendamentosCliente.length}
                            </span>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                      {searchTerm ? 'Nenhum cliente encontrado com os critérios de busca.' : 'Nenhum cliente cadastrado.'}
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

export default AdminClientesPage;
