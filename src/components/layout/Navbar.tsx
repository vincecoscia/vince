import React, { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Moon, Sun, Menu, X } from 'lucide-react'
import { useTheme } from 'next-themes'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [transitionTheme, setTransitionTheme] = useState(theme)
  const [overlayOpacity, setOverlayOpacity] = useState(1)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted) {
      setTransitionTheme(theme)
    }
  }, [theme, mounted])

  const toggleTheme = () => {
    if (isTransitioning) return; // Prevent multiple clicks during transition

    setIsTransitioning(true)
    setOverlayOpacity(1)
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTransitionTheme(newTheme)

    // Wait for animation to complete before changing theme
    setTimeout(() => {
      setTheme(newTheme)
      // Start fading out the overlay
      setTimeout(() => {
        setOverlayOpacity(0)
      }, 100) // Short delay before fade-out starts
    }, 1000) // Match this with the animation duration

    // End the transition after fade-out
    setTimeout(() => {
      setIsTransitioning(false)
      setOverlayOpacity(1) // Reset for next transition
    }, 2000) // Total duration: animation (1000ms) + fade-out (1000ms)
  }

  if (!mounted) return null

  return (
    <>
      <nav className="container mx-auto px-6 py-4 relative z-10">
        <div className="flex justify-between items-center">
          <a href="#" className="text-xl font-bold">
            <span className="text-purple-600">{'<'}</span>
            vincecoscia
            <span className="text-purple-600">{'/>'}</span>
          </a>
          <div className="hidden md:flex space-x-6">
            {['Home', 'Experience', 'Projects', 'Blog', 'Contact'].map((item) => (
              <a 
                key={item} 
                href="#" 
                className="group relative overflow-hidden px-2"
              >
                <span className="inline-block mr-2 text-purple-600">//</span>
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">{item}</span>
              </a>
            ))}
          </div>
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="mr-4"
              disabled={isTransitioning}
            >
              {transitionTheme === 'dark' ? <Sun className="h-[1.2rem] w-[1.2rem]" /> : <Moon className="h-[1.2rem] w-[1.2rem]" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden"
            >
              {isMenuOpen ? <X className="h-[1.2rem] w-[1.2rem]" /> : <Menu className="h-[1.2rem] w-[1.2rem]" />}
            </Button>
          </div>
        </div>
        {isMenuOpen && (
          <div className="md:hidden mt-4 space-y-2">
            {['Home', 'Experience', 'Projects', 'Blog', 'Contact'].map((item) => (
              <a 
                key={item}
                href="#" 
                className="block hover:text-purple-600 transition-colors duration-300"
              >
                <span className="text-purple-600">//</span> {item}
              </a>
            ))}
          </div>
        )}
      </nav>
      {isTransitioning && (
        <div 
          className={`
            fixed inset-0 pointer-events-none z-50
            transition-all duration-1000 ease-in-out
          `}
          style={{
            clipPath: 'circle(0% at top right)',
            animation: 'expand 1s ease-in-out forwards',
            opacity: overlayOpacity,
            backgroundColor: transitionTheme === 'dark' ? 'rgb(9, 9, 11)' : 'rgb(255, 255, 255)',
            // mixBlendMode: 'difference',
          }}
        />
      )}
      <style jsx>{`
        @keyframes expand {
          to {
            clip-path: circle(150% at top right);
          }
        }
      `}</style>
    </>
  )
}