/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { type Project, type Technology } from "@prisma/client";
import { Skeleton } from "@/components/ui/skeleton";
import * as Si from "react-icons/si";
import { motion, AnimatePresence } from "framer-motion";

interface ProjectWithTechnologies extends Project {
  technologies: Technology[];
}

export default function Projects({
  projects,
  isLoading,
}: {
  projects: ProjectWithTechnologies[];
  isLoading: boolean;
}) {
  const [expandedProjects, setExpandedProjects] = useState<number[]>([]);
  const [animatingProjects, setAnimatingProjects] = useState<number[]>([]);

  const toggleProjectExpansion = (index: number) => {
    if (expandedProjects.includes(index)) {
      setAnimatingProjects(prev => [...prev, index]);
      setExpandedProjects(prev => prev.filter(i => i !== index));
      setTimeout(() => {
        setAnimatingProjects(prev => prev.filter(i => i !== index));
      }, 300); // Match this with the animation duration
    } else {
      setExpandedProjects(prev => [...prev, index]);
    }
  };

  // Add this function to truncate the description
  const truncateDescription = (description: string, maxLength: number) => {
    if (description.length <= maxLength) return description;
    const truncated = description.slice(0, maxLength);
    return truncated.slice(0, truncated.lastIndexOf(' ')).trim() + '...';
  };

  return (
    <section className="mb-24">
      <h2 className="mb-8 text-3xl font-bold">
        <span className="text-purple-600">{"function "}</span>
        Projects() {"{"}
      </h2>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {isLoading
          ? // Skeleton loading state
            Array.from({ length: 3 }).map((_, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <Skeleton className="mb-2 h-6 w-3/4" />
                  <Skeleton className="mb-2 h-4 w-1/2" />
                  <Skeleton className="mb-4 h-3 w-1/3" />
                  <div className="flex flex-wrap gap-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Skeleton key={i} className="h-6 w-20" />
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))
          : // Actual content
            projects.map((project, index) => (
              <div key={index} className="group relative h-full">
                <div className="animate-tilt absolute -inset-0.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 transition duration-1000 group-hover:opacity-100 group-hover:duration-200"></div>
                <Card className="relative flex h-full flex-col">
                  <CardContent className="flex flex-grow flex-col p-6">
                    <h3 className="mb-4 text-xl font-bold">{project.title}</h3>
                    <AnimatePresence initial={false}>
                      <motion.div
                        initial={{ height: "auto" }}
                        animate={{ height: expandedProjects.includes(index) ? "auto" : "3em" }}
                        exit={{ height: "3em" }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <p className="mb-4">
                          {expandedProjects.includes(index) || animatingProjects.includes(index)
                            ? project.description ?? ''
                            : truncateDescription(project.description ?? '', 150)}
                        </p>
                      </motion.div>
                    </AnimatePresence>
                    {(!expandedProjects.includes(index) && !animatingProjects.includes(index)) && (
                      <button
                        onClick={() => toggleProjectExpansion(index)}
                        className="mb-4 text-purple-600 hover:underline flex"
                      >
                        Read More
                      </button>
                    )}
                    {(expandedProjects.includes(index) || animatingProjects.includes(index)) && (
                      <button
                        onClick={() => toggleProjectExpansion(index)}
                        className="mb-4 text-purple-600 hover:underline flex"
                      >
                        Read Less
                      </button>
                    )}
                    <div className="mb-4 flex flex-wrap gap-2">
                      {project.technologies.map((tech, techIndex) => {
                        const IconComponent = Si[tech.icon as keyof typeof Si];
                        return (
                          <Badge
                            key={techIndex}
                            variant="secondary"
                            className={`bg-${tech.color} hover:bg-${tech.color} flex items-center gap-1 text-white`}
                          >
                            {IconComponent && <IconComponent size={14} />}
                            {tech.name}
                          </Badge>
                        );
                      })}
                    </div>
                    {project.link && (
                      <a
                        href={project.link}
                        className="mt-auto text-purple-600 hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View Project →
                      </a>
                    )}
                    {project.githubLink && (
                      <a
                        href={project.githubLink}
                        className="mt-auto text-purple-600 hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View on GitHub →
                      </a>
                    )}
                  </CardContent>
                </Card>
              </div>
            ))}
      </div>
      <p className="mt-4 text-right">{"}"}</p>
    </section>
  );
}
