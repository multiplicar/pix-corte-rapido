
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ServicosPage from "./pages/ServicosPage";
import AgendamentoPage from "./pages/AgendamentoPage";
import ConfirmacaoPage from "./pages/ConfirmacaoPage";
import PagamentoPage from "./pages/PagamentoPage";
import SucessoPage from "./pages/SucessoPage";
import NotFound from "./pages/NotFound";
import ClienteLoginPage from "./pages/ClienteLoginPage";
import ClientePerfilPage from "./pages/ClientePerfilPage";
import FilaEsperaPage from "./pages/FilaEsperaPage";
import { AppProvider } from "./contexts/AppContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AppProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/servicos" element={<ServicosPage />} />
            <Route path="/agendar" element={<AgendamentoPage />} />
            <Route path="/confirmar" element={<ConfirmacaoPage />} />
            <Route path="/pagamento" element={<PagamentoPage />} />
            <Route path="/sucesso" element={<SucessoPage />} />
            <Route path="/cliente/login" element={<ClienteLoginPage />} />
            <Route path="/cliente/perfil" element={<ClientePerfilPage />} />
            <Route path="/fila-espera" element={<FilaEsperaPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AppProvider>
  </QueryClientProvider>
);

export default App;
