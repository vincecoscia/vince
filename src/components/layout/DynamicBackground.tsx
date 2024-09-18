import React, { useState, useEffect, useRef } from 'react'
import { useTheme } from 'next-themes'

export default function DynamicBackground() {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 })
  const backgroundRef = useRef<HTMLDivElement>(null)
  const { theme } = useTheme()

  const lightSvg = encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-size='14' fill='%23000000'>+</text></svg>`)
  const darkSvg = encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 40 40"> <defs> <style> .cls-1 { fill: #be1b87; font-family: ArialMT, Arial; font-size: 14px; isolation: isolate; } </style> </defs> <g> <g id="Layer_1"> <text class="cls-1" transform="translate(15.9 20)"><tspan x="0" y="0">+</tspan></text> </g> </g> </svg>`)

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
          backgroundImage: `url("data:image/svg+xml,${theme === 'dark' ? darkSvg : lightSvg}")`,
          backgroundSize: '40px 40px',
          opacity: theme === 'dark' ? 0.2 : 0.1,
          transform: `translate(${(mousePosition.x - window.innerWidth / 2) / 50}px, ${(mousePosition.y - window.innerHeight / 2) / 50}px)`,
        }}
      ></div>
      {/* <div 
        className="absolute inset-0 bg-purple-600 opacity-5 blur-3xl transition-transform duration-300 ease-out"
        style={{
          transform: `translate(${(mousePosition.x - window.innerWidth / 2) / 25}px, ${(mousePosition.y - window.innerHeight / 2) / 25}px)`,
        }}
      ></div> */}
    </div>
  )
}