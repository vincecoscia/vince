import React from 'react'
import { Card, CardContent } from "@/components/ui/card"

const projects = [
  { title: 'Project 1', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
  { title: 'Project 2', description: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
  { title: 'Project 3', description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.' },
  { title: 'Project 4', description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.' },
]

export default function Projects() {
  return (
    <section className="mb-24">
      <h2 className="text-3xl font-bold mb-8">
        <span className="text-purple-600">{'function '}</span>
        Projects() {'{'}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project, index) => (
          <div key={index} className="group relative hover:cursor-pointer">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg opacity-0 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
            <Card className="relative">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">{project.title}</h3>
                <p className="mb-4">{project.description}</p>
                <a href="#" className="text-purple-600 hover:underline">
                  View Project →
                </a>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
      <p className="mt-4 text-right">{'}'}</p>
    </section>
  )
}