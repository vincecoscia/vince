import React from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { SiAngular, SiPython, SiTypescript, SiTailwindcss, SiNodedotjs, SiExpress, SiMysql, SiNextdotjs, SiReact, SiPhp, SiLaravel, SiJavascript, SiWordpress } from "react-icons/si"

const techColors = {
  'Angular': 'bg-red-500',
  'Python': 'bg-blue-500',
  'TypeScript': 'bg-blue-700',
  'Tailwind': 'bg-cyan-500',
  'Node.js': 'bg-green-600',
  'Express': 'bg-gray-600',
  'MySQL': 'bg-orange-500',
  'Next.js': 'bg-black',
  'React': 'bg-blue-400',
  'PHP': 'bg-purple-600',
  'Laravel': 'bg-red-600',
  'JavaScript': 'bg-yellow-400',
  'Wordpress': 'bg-blue-500'
}

const techIcons = {
  'Angular': SiAngular,
  'Python': SiPython,
  'TypeScript': SiTypescript,
  'Tailwind': SiTailwindcss,
  'Node.js': SiNodedotjs,
  'Express': SiExpress,
  'MySQL': SiMysql,
  'Next.js': SiNextdotjs,
  'React': SiReact,
  'PHP': SiPhp,
  'Laravel': SiLaravel,
  'JavaScript': SiJavascript,
  'Wordpress': SiWordpress
}

type TechName = keyof typeof techIcons;

const experiences = [
  { 
    title: 'Senior Fullstack Engineer', 
    company: 'Maxim Group', 
    period: '2020 - Present',
    technologies: ['Angular', 'TypeScript', 'Python', 'Node.js', 'Express', 'MySQL',  'Tailwind']
  },
  { 
    title: 'Fullstack Developer', 
    company: 'VCMedia', 
    period: '2018 - Present',
    technologies: ['Next.js', 'React', 'TypeScript', 'Python', 'MySQL', 'Tailwind']
  },
  { 
    title: 'Fullstack Developer', 
    company: 'Miami Breast Center', 
    period: '2018 - 2020',
    technologies: ['PHP', 'Laravel', 'JavaScript', 'Wordpress']
  },
] as const;

export default function Experience() {
  return (
    <section className="mb-24">
      <h2 className="text-3xl font-bold mb-8">
        <span className="text-purple-600">{'const '}</span>
        Experience = [
      </h2>
      <div className="space-y-6">
        {experiences.map((job, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <h3 className="text-xl font-bold">{job.title}</h3>
              <p className="text-purple-600">{job.company}</p>
              <p className="text-sm text-muted-foreground mb-4">{job.period}</p>
              <div className="flex flex-wrap gap-2">
                {job.technologies.map((tech, techIndex) => {
                  const IconComponent = techIcons[tech as TechName];
                  return (
                    <Badge 
                      key={techIndex} 
                      variant="secondary"
                      className={`${techColors[tech]} text-white flex items-center gap-1 hover:bg-purple-600`}
                    >
                      {IconComponent && <IconComponent size={14} />}
                      {tech}
                    </Badge>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <p className="mt-4 text-right">];</p>
    </section>
  )
}