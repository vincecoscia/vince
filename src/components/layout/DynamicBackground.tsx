import React, { useState, useEffect, useRef } from 'react'

interface DynamicBackgroundProps {
  theme: string
}

export default function DynamicBackground({ theme }: DynamicBackgroundProps) {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 })
  const backgroundRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (backgroundRef.current) {
        const rect = backgroundRef.current.getBoundingClientRect()
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        })
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div 
      ref={backgroundRef}
      className="absolute inset-0 z-0 overflow-hidden pointer-events-none"
    >
      <div 
        className="absolute inset-0 transition-transform duration-300 ease-out"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-size='14' fill='%23000000' class='dark:fill-fuchsia-500'%3E+%3C/text%3E%3C/svg%3E")`,
          backgroundSize: '40px 40px',
          opacity: theme === 'dark' ? 0.5 : 0.1,
          transform: `translate(${(mousePosition.x - window.innerWidth / 2) / 50}px, ${(mousePosition.y - window.innerHeight / 2) / 50}px)`,
        }}
      ></div>
      <div 
        className="absolute inset-0 bg-purple-600 opacity-5 blur-3xl transition-transform duration-300 ease-out"
        style={{
          transform: `translate(${(mousePosition.x - window.innerWidth / 2) / 25}px, ${(mousePosition.y - window.innerHeight / 2) / 25}px)`,
        }}
      ></div>
    </div>
  )
}