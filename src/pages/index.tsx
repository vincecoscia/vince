
import Hero from '../components/sections/Hero'
import Experience from '@/components/sections/Experience'
import Projects from '@/components/sections/Projects'
import Contact from '@/components/sections/Contact'
import { api } from '@/utils/api'
import { Experience as ExperienceType, Project, Technology } from '@prisma/client'

interface ExperienceWithTechnologies extends ExperienceType {
  technologies: Technology[];
}

interface ProjectWithTechnologies extends Project {
  technologies: Technology[];
}

export default function Home() {
  const { data: projects, isLoading: isProjectsLoading } = api.project.getAll.useQuery();
  const { data: experiences, isLoading: isExperiencesLoading } = api.experience.getAll.useQuery();

  return (
    <>
      <Hero />
      <Experience experiences={experiences as ExperienceWithTechnologies[]} isLoading={isExperiencesLoading} />
      <Projects projects={projects as ProjectWithTechnologies[]} isLoading={isProjectsLoading} />
      <Contact />
    </>
  )
}