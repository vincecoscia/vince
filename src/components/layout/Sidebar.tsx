import React from 'react';
import { Briefcase, Code2, CalendarDays, FileText, Home } from 'lucide-react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { Button } from '../ui/button';

const Sidebar: React.FC = () => {
  const { theme, setTheme } = useTheme();


  return (
    <aside className="w-64 bg-white dark:bg-zinc-950 border-r border-gray-200 dark:border-zinc-700 flex flex-col justify-between">
      <nav className="mt-6">
        <Link
          className="flex items-center px-6 py-3 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-zinc-700"
          href="/admin"
        >
          <Home className="h-5 w-5 mr-3" />
          Dashboard
        </Link>
        <Link
          className="flex items-center px-6 py-3 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-zinc-700"
          href="/admin/experience"
        >
          <Briefcase className="h-5 w-5 mr-3" />
          Experience
        </Link>
        <Link
          className="flex items-center px-6 py-3 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-zinc-700"
          href="/admin/projects"
        >
          <Code2 className="h-5 w-5 mr-3" />
          Projects
        </Link>
        <Link
          className="flex items-center px-6 py-3 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-zinc-700"
          href="/admin/technologies"
        >
          <CalendarDays className="h-5 w-5 mr-3" />
          Technologies
        </Link>
        <Link
          className="flex items-center px-6 py-3 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-zinc-700"
          href="/admin/blogs"
        >
          <FileText className="h-5 w-5 mr-3" />
          Blogs
        </Link>
      </nav>
      {/*  */}
      <div className="px-6 py-3 text-gray-700 dark:text-gray-200 w-full justify-center flex flex-col gap-2">
        {/* Go Home Link */}
        <Link href="/" className="flex items-center bg-zinc-950 text-white rounded-md p-2 hover:bg-zinc-900 dark:hover:bg-zinc-800 ">
          <Home className="h-5 w-5 mr-3" />
          Home
        </Link>
        <Button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} className="w-full">
          {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
        </Button>
      </div>
    </aside>
  );
};

export default Sidebar;