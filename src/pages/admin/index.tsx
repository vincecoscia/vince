import { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import DashboardTabs from '@/components/admin/DashboardTabs';
import DashboardStats from '@/components/admin/DashboardStats';
import { api } from '@/utils/api';

const AdminPage: NextPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { data: experiences, isLoading: experiencesLoading } = api.experience.getAll.useQuery();
  const { data: projects, isLoading: projectsLoading } = api.project.getAll.useQuery();
  const { data: technologies, isLoading: technologiesLoading } = api.technology.getAll.useQuery();
  const { data: blogs, isLoading: blogsLoading } = api.blog.getAll.useQuery();

  useEffect(() => {
    if (status === 'loading') return; // Do nothing while loading
    if (!session) router.push('/login'); // If no session exists, redirect to login
  }, [session, status, router]);

  if (experiencesLoading || projectsLoading || technologiesLoading || blogsLoading) {
    return <div>Loading...</div>;
  }

  if (!session) {
    return null; // Render nothing if not authenticated (will redirect)
  }

  return (
    <div>
      <h1 className="text-3xl font-semibold text-gray-800 dark:text-white mb-6">Dashboard</h1>
      
      <DashboardStats 
        experiences={experiences ?? []}
        projects={projects ?? []}
        technologies={technologies ?? []}
        blogs={blogs ?? []}
      />
      <DashboardTabs 
        experiences={experiences ?? []}
        projects={projects ?? []}
        technologies={technologies ?? []}
        blogs={blogs ?? []}
      />

    </div>
  );
};

export default AdminPage;
