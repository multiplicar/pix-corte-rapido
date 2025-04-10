
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminHeader from './AdminHeader';
import Footer from './Footer';

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Verificar se o admin está logado
    const adminData = localStorage.getItem('admin');
    if (!adminData) {
      navigate('/admin/login');
    }
  }, [navigate]);

  return (
    <div className="flex flex-col min-h-screen">
      <AdminHeader />
      <main className="flex-1 container py-8 px-4">{children}</main>
      <Footer />
    </div>
  );
};

export default AdminLayout;
