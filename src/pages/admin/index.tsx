import { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

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
      <h1>Admin Dashboard</h1>
      <p>Welcome, {session.user?.name}!</p>
      {/* Add your admin page content here */}
    </div>
  );
};

export default AdminPage;
