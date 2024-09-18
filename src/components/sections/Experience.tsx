import React from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const experiences = [
  { 
    title: 'Senior Fullstack Engineer', 
    company: 'Tech Corp', 
    period: '2020 - Present',
    technologies: ['React', 'TypeScript', 'Node.js', 'GraphQL']
  },
  { 
    title: 'Fullstack Developer', 
    company: 'Digital Agency', 
    period: '2017 - 2020',
    technologies: ['Angular', 'JavaScript', 'Python', 'Django']
  },
  { 
    title: 'Junior Developer', 
    company: 'Startup Inc', 
    period: '2015 - 2017',
    technologies: ['Vue.js', 'JavaScript', 'PHP', 'Laravel']
  }
]

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
                {job.technologies.map((tech, techIndex) => (
                  <Badge key={techIndex} variant="secondary">
                    {tech}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <p className="mt-4 text-right">];</p>
    </section>
  )
}