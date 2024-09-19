import React from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { SiReact, SiNextdotjs, SiTailwindcss, SiTypescript, SiNodedotjs, SiExpress, SiMongodb, SiFirebase, SiPython, SiDjango, SiPostgresql } from "react-icons/si"
import { IconType } from "react-icons"
import { Project, Technology } from "@prisma/client"
import { Skeleton } from "@/components/ui/skeleton"
import * as Si from "react-icons/si";

interface ProjectWithTechnologies extends Project {
  technologies: Technology[];
}
 
export default function Projects({ projects, isLoading }: { projects: ProjectWithTechnologies[], isLoading: boolean }) {
  return (
    <section className="mb-24">
      <h2 className="text-3xl font-bold mb-8">
        <span className="text-purple-600">{'function '}</span>
        Projects() {'{'}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {isLoading ? (
          // Skeleton loading state
          Array.from({ length: 3 }).map((_, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/2 mb-2" />
                <Skeleton className="h-3 w-1/3 mb-4" />
                <div className="flex flex-wrap gap-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Skeleton key={i} className="h-6 w-20" />
                  ))}
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          // Actual content
          projects.map((project, index) => (
            <div key={index} className="group relative h-full">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl opacity-0 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
            <Card className="relative h-full flex flex-col">
              <CardContent className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold mb-4">{project.title}</h3>
                <p className="mb-4 flex-grow">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, techIndex) => {
                    const IconComponent = Si[tech.icon as keyof typeof Si];
                    return (
                      <Badge 
                        key={techIndex} 
                        variant="secondary"
                        className={`bg-${tech.color} hover:bg-${tech.color} text-white flex items-center gap-1`}
                      >
                        {IconComponent && <IconComponent size={14} />}
                        {tech.name}
                      </Badge>
                    );
                  })}
                </div>
                {project.link && (
                  <a href={project.link} className="text-purple-600 hover:underline mt-auto" target="_blank" rel="noopener noreferrer">
                    View Project →
                  </a>
                )}
                {project.githubLink && (
                  <a href={project.githubLink} className="text-purple-600 hover:underline mt-auto" target="_blank" rel="noopener noreferrer">
                    View on GitHub →
                  </a>
                )}
              </CardContent>
            </Card>
          </div>
        ))
      )}
      </div>
      <p className="mt-4 text-right">{'}'}</p>
    </section>
  )
}