import React, { ReactNode, useState, useEffect, useRef } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import dynamic from 'next/dynamic'

const DynamicBackground = dynamic(() => import('./DynamicBackground'), { ssr: false })

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const [theme, setTheme] = useState('light')
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 })
  const backgroundRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light'
    setTheme(savedTheme)
    document.documentElement.classList.toggle('dark', savedTheme === 'dark')
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    document.documentElement.classList.toggle('dark', newTheme === 'dark')
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (backgroundRef.current) {
      const rect = backgroundRef.current.getBoundingClientRect()
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      })
    }
  }

  return (
    <div 
      className={`min-h-screen bg-background text-foreground font-mono relative ${theme}`}
      onMouseMove={handleMouseMove}
    >
      {/* Textured background with bulge effect */}
      <DynamicBackground theme={theme} />

      {/* Content */}
      <div className="relative z-10">
        <Navbar theme={theme} toggleTheme={toggleTheme} />
        <main className="container mx-auto px-6 py-12">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  )
}