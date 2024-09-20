/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Button } from "@/components/ui/button"
import { Moon, Sun, Menu, X } from 'lucide-react'
import { useTheme } from 'next-themes'
import TransitionOverlay from './nav/TransitionOverlay'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [transitionTheme, setTransitionTheme] = useState(theme)
  const [overlayOpacity, setOverlayOpacity] = useState(1)
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted) {
      setTransitionTheme(theme)
    }
  }, [theme, mounted])

  const toggleTheme = () => {
    if (isTransitioning) return;

    setIsTransitioning(true)
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTransitionTheme(newTheme)

    setTimeout(() => {
      setTheme(newTheme)
    }, 1000) // Change theme after expansion animation

    setTimeout(() => {
      setIsTransitioning(false)
    }, 2000) // End transition after fade-out
  }

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Experience', path: '/experience' },
    { name: 'Projects', path: '/projects' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' },
  ]

  const NavLink = ({ item }: { item: { name: string; path: string } }) => {
    const isActive = router.pathname === item.path
    return (
      <Link 
        href={item.path} 
        className={`group relative overflow-hidden px-2 ${isActive ? 'text-purple-600' : ''}`}
      >
        <span className={`inline-block mr-2 text-purple-600 ${isActive ? 'font-bold' : ''}`}>{`//`}</span>
        <span className={`inline-block transition-transform duration-300 ${isActive ? 'translate-x-1' : 'group-hover:translate-x-1'}`}>
          {item.name}
        </span>
      </Link>
    )
  }

  if (!mounted) return null

  return (
    <>
      <nav className="container mx-auto px-6 py-4 relative z-10">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-xl font-bold">
            <span className="text-purple-600">{'<'}</span>
            vincecoscia
            <span className="text-purple-600">{'/>'}</span>
          </Link>
          <div className="hidden md:flex space-x-6">
            {navItems.map((item) => {
              const isActive = router.pathname === item.path
              return (
                <Link 
                  key={item.name} 
                  href={item.path} 
                  className={`group relative overflow-hidden px-2 ${isActive ? 'text-purple-600' : ''}`}
                >
                  <span className={`inline-block mr-2 text-purple-600 ${isActive ? 'font-bold' : ''}`}>{`//`}</span>
                  <span className={`inline-block transition-transform duration-300 ${isActive ? 'translate-x-1' : 'group-hover:translate-x-1'}`}>
                    {item.name}
                  </span>
                </Link>
              )
            })}
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
            {navItems.map((item) => {
              const isActive = router.pathname === item.path
              return (
                <Link 
                  key={item.name}
                  href={item.path} 
                  className={`block hover:text-purple-600 transition-colors duration-300 ${isActive ? 'text-purple-600 font-bold' : ''}`}
                >
                  <span className={`text-purple-600 ${isActive ? 'font-bold' : ''}`}>{`//`}</span> {item.name}
                </Link>
              )
            })}
          </div>
        )}
      </nav>
      <TransitionOverlay isTransitioning={isTransitioning} transitionTheme={transitionTheme as 'light' | 'dark'} />
    </>
  )
}