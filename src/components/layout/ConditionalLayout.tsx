import { useRouter } from 'next/router';
import Layout from './Layout';
import AdminLayout from './AdminLayout';

interface ConditionalLayoutProps {
  children: React.ReactNode;
}

const ConditionalLayout: React.FC<ConditionalLayoutProps> = ({ children }) => {
  const router = useRouter();
  const isAdminRoute = router.pathname.startsWith('/admin');
  const isLoginRoute = router.pathname === '/login';

  if (isAdminRoute || isLoginRoute) {
    return <AdminLayout>{children}</AdminLayout>;
  }

  return <Layout>{children}</Layout>;
};

export default ConditionalLayout;