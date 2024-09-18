import React from 'react'
import {Github, Linkedin } from 'lucide-react'

export default function Hero() {
  return (
    <section className="mb-24">
      <h1 className="text-4xl md:text-6xl font-bold mb-6">
        <span className="text-purple-600">{'{'}</span> Vince Coscia <span className="text-purple-600">{'}'}</span>
      </h1>
      <p className="text-xl mb-4">Senior Fullstack Engineer</p>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">I build pixel-perfect, engaging, and accessible digital experiences.</p>
      <div className="flex space-x-4">
        <a href="https://github.com/vincecoscia" target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors duration-300">
          <Github size={20} className="mr-2" />
          <span>GitHub</span>
        </a>
        <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-300">
          <Linkedin size={20} className="mr-2" />
          <span>LinkedIn</span>
        </a>
      </div>
    </section>
  )
}