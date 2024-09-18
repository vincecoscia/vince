import React from 'react'
import Layout from '../components/layout/Layout'
import Hero from '../components/sections/Hero'
import Experience from '@/components/sections/Experience'
import Projects from '@/components/sections/Projects'
import Contact from '@/components/sections/Contact'

export default function Home() {
  return (
    <>
      <Hero />
      <Experience />
      <Projects />
      <Contact />
    </>
  )
}