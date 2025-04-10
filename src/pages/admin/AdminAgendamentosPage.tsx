import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/layout/AdminLayout';
import { db } from '@/lib/firebase';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface Agendamento {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  servico: { nome: string; preco: number };
  data: string;
  hora: string;
}

const AdminAgendamentosPage = () => {
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);
  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<'success' | 'destructive' | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAgendamentos();
  }, []);

  const fetchAgendamentos = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, "agendamentos"));
      const agendamentosList: Agendamento[] = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Agendamento[];
      setAgendamentos(agendamentosList);
    } catch (error) {
      console.error("Erro ao buscar agendamentos:", error);
      setMessage("Erro ao carregar agendamentos.");
      setMessageType('destructive');
    } finally {
      setLoading(false);
    }
  };
  
  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, "agendamentos", id));
      setMessage("Agendamento removido com sucesso!");
      setMessageType('success');
      fetchAgendamentos(); // Refresh the list
    } catch (error) {
      console.error("Erro ao remover agendamento:", error);
      setMessage("Erro ao remover o agendamento.");
      setMessageType('destructive');
    }
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  return (
    <AdminLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Gerenciar Agendamentos</h1>
        
        {message && (
          <Alert variant={messageType as "default" | "destructive"} className="mb-4">
            <AlertTitle>{messageType === "destructive" ? "Erro" : "Sucesso"}</AlertTitle>
            <AlertDescription>{message}</AlertDescription>
          </Alert>
        )}
        
        {loading ? (
          <p>Carregando agendamentos...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-2 px-4 border-b">Nome</th>
                  <th className="py-2 px-4 border-b">Email</th>
                  <th className="py-2 px-4 border-b">Telefone</th>
                  <th className="py-2 px-4 border-b">Serviço</th>
                  <th className="py-2 px-4 border-b">Data</th>
                  <th className="py-2 px-4 border-b">Hora</th>
                  <th className="py-2 px-4 border-b">Ações</th>
                </tr>
              </thead>
              <tbody>
                {agendamentos.map(agendamento => (
                  <tr key={agendamento.id} className="hover:bg-gray-50">
                    <td className="py-2 px-4 border-b">{agendamento.nome}</td>
                    <td className="py-2 px-4 border-b">{agendamento.email}</td>
                    <td className="py-2 px-4 border-b">{agendamento.telefone}</td>
                    <td className="py-2 px-4 border-b">{agendamento.servico?.nome}</td>
                    <td className="py-2 px-4 border-b">{formatDate(agendamento.data)}</td>
                    <td className="py-2 px-4 border-b">{agendamento.hora}</td>
                    <td className="py-2 px-4 border-b">
                      <button
                        onClick={() => handleDelete(agendamento.id)}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                      >
                        Excluir
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminAgendamentosPage;
