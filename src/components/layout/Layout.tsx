/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useRef } from 'react'
import type { ReactNode } from 'react'
import { useTheme } from 'next-themes'
import Navbar from './Navbar'
import Footer from './Footer'
import dynamic from 'next/dynamic'

const DynamicBackground = dynamic(() => import('./DynamicBackground'), { ssr: false })

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const { theme, setTheme } = useTheme()
  const [mousePosition, setMousePosition] = React.useState({ x: -100, y: -100 })
  const backgroundRef = useRef<HTMLDivElement>(null)

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  return (
    <div 
      className={`min-h-screen bg-background text-foreground font-mono relative flex flex-col`}
      // onMouseMove={handleMouseMove}
    >
      <DynamicBackground />

      <div className="relative z-10 flex flex-col flex-grow">
        <Navbar />
        <main className="container mx-auto px-6 py-12 flex-grow">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  )
}