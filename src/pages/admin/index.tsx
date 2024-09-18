import { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import DashboardTabs from '@/components/admin/DashboardTabs';
import DashboardStats from '@/components/admin/DashboardStats';

const AdminPage: NextPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return; // Do nothing while loading
    if (!session) router.push('/login'); // If no session exists, redirect to login
  }, [session, status, router]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (!session) {
    return null; // Render nothing if not authenticated (will redirect)
  }

  return (
    <div>
      <h1 className="text-3xl font-semibold text-gray-800 dark:text-white mb-6">Dashboard</h1>
      
      <DashboardStats />
      <DashboardTabs />
    </div>
  );
};

export default AdminPage;
