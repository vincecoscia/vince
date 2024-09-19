import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from 'lucide-react';
import { AddExperienceDialog } from "@/components/admin/AddExperienceDialog";
import { Experience, Project, Technology, Blog } from "@prisma/client";
import { AddTechnologyDialog } from "@/components/admin/AddTechnologyDialog";
import * as Si from 'react-icons/si';

interface DashboardTabsProps {
  experiences: Experience[];
  projects: Project[];
  technologies: Technology[];
  blogs: Blog[];
}

const DashboardTabs: React.FC<DashboardTabsProps> = ({ experiences, projects, technologies, blogs }) => {
  return (
    <Tabs defaultValue="experience" className="space-y-4">
      <TabsList>
        <TabsTrigger value="experience">Experience</TabsTrigger>
        <TabsTrigger value="projects">Projects</TabsTrigger>
        <TabsTrigger value="technologies">Technologies</TabsTrigger>
        <TabsTrigger value="blogs">Blogs</TabsTrigger>
      </TabsList>
      <TabsContent value="experience" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Experience</CardTitle>
            <CardDescription>Manage your work experience here.</CardDescription>
          </CardHeader>
          <CardContent>
            <AddExperienceDialog 
              technologies={technologies}
            />
            {/* Add a list or table of experiences here */}
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="projects" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Projects</CardTitle>
            <CardDescription>Manage your portfolio projects here.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="mb-4">
              <Plus className="h-4 w-4 mr-2" />
              Add New Project
            </Button>
            {/* Add a list or grid of projects here */}
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="technologies" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Technologies</CardTitle>
            <CardDescription>Manage your technology skills here.</CardDescription>
          </CardHeader>
          <CardContent>
            <AddTechnologyDialog />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
              {technologies.map((technology) => {
                const IconComponent = Si[technology.icon as keyof typeof Si];
                return (
                  <div key={technology.id} className={`p-4 border rounded-md text-white flex items-center bg-${technology.color}`}>
                    {IconComponent ? (
                      <IconComponent className="h-8 w-8 mr-4" />
                    ) : (
                      <span className="h-8 w-8 mr-4 bg-gray-300 rounded-full flex items-center justify-center text-gray-600">
                        ?
                      </span>
                    )}
                    <div>
                      <h3 className="text-lg font-semibold">{technology.name}</h3>
                      <p className="text-sm text-gray-100">{technology.color}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="blogs" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Blogs</CardTitle>
            <CardDescription>Manage your blog posts here.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="mb-4">
              <Plus className="h-4 w-4 mr-2" />
              Add New Blog Post
            </Button>
            {/* Add a list of blog posts here */}
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default DashboardTabs;