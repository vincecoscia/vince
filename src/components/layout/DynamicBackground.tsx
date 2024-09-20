import React, { useEffect, useRef } from 'react'
import { useTheme } from 'next-themes'

const lightSvg = encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40"><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-size="14" fill="%23000000">+</text></svg>`)
const darkSvg = encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><text transform="translate(15.9 20)" style="fill:#be1b87;font-family:ArialMT,Arial;font-size:14px;isolation:isolate"><tspan x="0" y="0">+</tspan></text></svg>`)

export default function DynamicBackground() {
  const backgroundRef = useRef<HTMLDivElement>(null)
  const { theme } = useTheme()

  useEffect(() => {
    let animationFrameId: number
    let startTime: number

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = timestamp - startTime
      const x = (progress / 50)
      const y = (progress / 50)

      if (backgroundRef.current) {
        backgroundRef.current.style.backgroundPositionX = `-${x}px`
        backgroundRef.current.style.backgroundPositionY = `-${y}px`
      }

      animationFrameId = requestAnimationFrame(animate)
    }

    animationFrameId = requestAnimationFrame(animate)

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }
    }
  }, [])

  return (
    <div 
      ref={backgroundRef}
      className="absolute inset-0 z-0 overflow-hidden pointer-events-none"
      style={{
        backgroundImage: `url("data:image/svg+xml,${theme === 'dark' ? darkSvg : lightSvg}")`,
        backgroundSize: '40px 40px',
        opacity: theme === 'dark' ? 0.2 : 0.1,
        willChange: 'background-position',
      }}
    />
  )
}