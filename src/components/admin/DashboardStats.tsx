import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, Code2, CalendarDays, FileText } from 'lucide-react';
import { Experience, Project, Technology, Blog } from "@prisma/client";

interface DashboardStatsProps {
  experiences: Experience[];
  projects: Project[];
  technologies: Technology[];
  blogs: Blog[];
}
const DashboardStats: React.FC<DashboardStatsProps> = ({ experiences, projects, technologies, blogs }) => {
  const currentYear = new Date().getFullYear();
  const experiencesCount = experiences.filter(experience => new Date(experience.period).getFullYear() === currentYear).length;
  const projectsCount = projects.filter(project => new Date(project.createdAt).getFullYear() === currentYear).length;
  const technologiesCount = technologies.filter(technology => new Date(technology.createdAt).getFullYear() === currentYear).length;
  const blogsCount = blogs.filter(blog => new Date(blog.createdAt).getFullYear() === currentYear).length;
  const totalExperience = experiences.length;
  const totalProjects = projects.length;
  const totalTechnologies = technologies.length;
  const totalBlogs = blogs.length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Experience</CardTitle>
          <Briefcase className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalExperience}</div>
          {/* <p className="text-xs text-muted-foreground">+1 year from last month</p> */}
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Projects</CardTitle>
          <Code2 className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalProjects}</div>
          {/* <p className="text-xs text-muted-foreground">+2 new this month</p> */}
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Technologies</CardTitle>
          <CalendarDays className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalTechnologies}</div>
          <p className="text-xs text-muted-foreground">+1 new this month</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Blog Posts</CardTitle>
          <FileText className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalBlogs}</div>
          <p className="text-xs text-muted-foreground">+7 this month</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardStats;