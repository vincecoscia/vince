import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Plus, MoreVertical, Pencil, Trash, CheckCircle } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AddExperienceDialog } from "@/components/admin/create/AddExperienceDialog";
import { Experience, Project, Technology, Blog } from "@prisma/client";
import { AddTechnologyDialog } from "@/components/admin/create/AddTechnologyDialog";
import { AddProjectDialog } from "@/components/admin/create/AddProjectDialog";
import { UpdateExperienceDialog } from "@/components/admin/update/UpdateExperienceDialog";
import { UpdateProjectDialog } from "@/components/admin/update/UpdateProjectDialog";
import { UpdateTechnologyDialog } from "@/components/admin/update/UpdateTechnologyDialog";
import * as Si from "react-icons/si";

interface ExperienceWithTechnologies extends Experience {
  technologies: Technology[];
}

interface ProjectWithTechnologies extends Project {
  technologies: Technology[];
}

interface DashboardTabsProps {
  experiences: ExperienceWithTechnologies[];
  projects: ProjectWithTechnologies[];
  technologies: Technology[];
  blogs: Blog[];
}

const DashboardTabs: React.FC<DashboardTabsProps> = ({
  experiences,
  projects,
  technologies,
  blogs,
}) => {
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
            <AddExperienceDialog technologies={technologies} />
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {experiences.map((experience) => (
                <Card
                  key={experience.id}
                  className="flex flex-col items-start rounded-md border p-4"
                >
                  <CardHeader className="w-full">
                    <div className="flex w-full items-center justify-between">
                      <CardTitle>{experience.title}</CardTitle>
                      <DropdownMenu modal={false}>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <UpdateExperienceDialog
                            experience={experience}
                            technologies={technologies}
                            onUpdate={() => {
                              /* Refresh data if needed */
                            }}
                          >
                            <DropdownMenuItem
                              onSelect={(e) => e.preventDefault()}
                            >
                              <Pencil className="mr-2 h-4 w-4" />
                              <span>Edit</span>
                            </DropdownMenuItem>
                          </UpdateExperienceDialog>
                          <DropdownMenuItem>
                            <Trash className="mr-2 h-4 w-4" />
                            <span>Delete</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">{experience.company}</p>
                    <p className="text-sm">{experience.period}</p>
                    <p className="text-sm">{experience.description}</p>
                  </CardContent>
                  <CardFooter>
                    <div className="flex flex-wrap gap-2">
                      {experience.technologies.map((technology) => (
                        <Badge
                          key={technology.id}
                          className={`rounded-md px-2 py-1 text-sm text-white bg-${technology.color}`}
                        >
                          {technology.name}
                        </Badge>
                      ))}
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="projects" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Projects</CardTitle>
            <CardDescription>
              Manage your portfolio projects here.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AddProjectDialog technologies={technologies} />
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {projects.map((project) => (
                <Card
                  key={project.id}
                  className="flex flex-col items-start rounded-md border p-4"
                >
                  <CardHeader className="w-full">
                    <div className="flex w-full items-center justify-between">
                      <CardTitle>
                        <div className="flex items-center">
                          <p>{project.title}</p>
                          {project.live && (
                            <div className="flex items-center">
                              <CheckCircle className="ml-4 h-4 w-4 text-green-500" />
                              <span className="ml-2 text-sm text-green-500">Live</span>
                            </div>
                          )}

                        </div>
                        
                        </CardTitle>
                      <DropdownMenu modal={false}>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <UpdateProjectDialog
                            project={project}
                            technologies={technologies}
                            onUpdate={() => {
                              /* Refresh data if needed */
                            }}
                          >
                            <DropdownMenuItem
                              onSelect={(e) => e.preventDefault()}
                            >
                              <Pencil className="mr-2 h-4 w-4" />
                              <span>Edit</span>
                            </DropdownMenuItem>
                          </UpdateProjectDialog>
                          <DropdownMenuItem>
                            <Trash className="mr-2 h-4 w-4" />
                            <span>Delete</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <CardDescription>
                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {project.link}
                        </a>
                      )}
                      {project.githubLink && (
                        <a
                          href={project.githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {project.githubLink}
                        </a>
                      )}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">{project.description}</p>
                  </CardContent>
                  <CardFooter>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((technology) => (
                        <Badge
                          key={technology.id}
                          className={`rounded-md px-2 py-1 text-sm text-white bg-${technology.color}`}
                        >
                          {technology.name}
                        </Badge>
                      ))}
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="technologies" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Technologies</CardTitle>
            <CardDescription>
              Manage your technology skills here.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AddTechnologyDialog />
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
              {technologies.map((technology) => {
                const IconComponent = Si[technology.icon as keyof typeof Si];
                return (
                  <div
                    key={technology.id}
                    className={`flex items-center justify-between rounded-md border p-4 text-white bg-${technology.color}`}
                  >
                    <div className="flex items-center">
                      {IconComponent ? (
                        <IconComponent className="mr-4 h-8 w-8" />
                      ) : (
                        <span className="mr-4 flex h-8 w-8 items-center justify-center rounded-full bg-gray-300 text-gray-600">
                          ?
                        </span>
                      )}
                      <div>
                        <h3 className="text-lg font-semibold">
                          {technology.name}
                        </h3>
                        <p className="text-sm text-gray-100">
                          {technology.color}
                        </p>
                      </div>
                    </div>
                    <DropdownMenu modal={false}>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <UpdateTechnologyDialog
                          technology={technology}
                          onUpdate={() => {
                            /* Refresh data if needed */
                          }}
                        >
                          <DropdownMenuItem
                            onSelect={(e) => e.preventDefault()}
                          >
                            <Pencil className="mr-2 h-4 w-4" />
                            <span>Edit</span>
                          </DropdownMenuItem>
                        </UpdateTechnologyDialog>
                        <DropdownMenuItem>
                          <Trash className="mr-2 h-4 w-4" />
                          <span>Delete</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
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
              <Plus className="mr-2 h-4 w-4" />
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
