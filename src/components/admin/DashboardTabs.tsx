import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from 'lucide-react';

const DashboardTabs: React.FC = () => {
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
            <Button className="mb-4">
              <Plus className="h-4 w-4 mr-2" />
              Add New Experience
            </Button>
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
            <Button className="mb-4">
              <Plus className="h-4 w-4 mr-2" />
              Add New Technology
            </Button>
            {/* Add a list or grid of technologies here */}
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