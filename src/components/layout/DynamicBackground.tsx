import React, { useState, useEffect, useRef } from 'react'
import { useTheme } from 'next-themes'

export default function DynamicBackground() {
  const [scrollPosition, setScrollPosition] = useState(0)
  const backgroundRef = useRef<HTMLDivElement>(null)
  const { theme } = useTheme()

  const lightSvg = encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40"><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-size="14" fill="%23000000">+</text></svg>`)
  const darkSvg = encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><text transform="translate(15.9 20)" style="fill:#be1b87;font-family:ArialMT,Arial;font-size:14px;isolation:isolate"><tspan x="0" y="0">+</tspan></text></svg>`)

  useEffect(() => {
    const scrollBackground = () => {
      setScrollPosition(prevPosition => (prevPosition + 1) % 40)
    }

    const intervalId = setInterval(scrollBackground, 40) // Adjust speed here

    return () => clearInterval(intervalId)
  }, [])

  return (
    <div 
      ref={backgroundRef}
      className="absolute inset-0 z-0 overflow-hidden pointer-events-none"
    >
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,${theme === 'dark' ? darkSvg : lightSvg}")`,
          backgroundSize: '40px 40px',
          opacity: theme === 'dark' ? 0.2 : 0.1,
          transform: `translate(-${scrollPosition}px, -${scrollPosition}px)`,
          willChange: 'transform',
          width: '110%',
        }}
      ></div>
    </div>
  )
}