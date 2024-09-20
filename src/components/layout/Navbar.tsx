import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Button } from "@/components/ui/button"
import { Moon, Sun, Menu, X } from 'lucide-react'
import { useTheme } from 'next-themes'
import TransitionOverlay from './nav/TransitionOverlay'
import NavLink from './nav/NavLink'
import MobileMenu from './nav/MobileMenu'
import ThemeToggle from './nav/ThemeToggle'

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'Experience', path: '/experience' },
  { name: 'Projects', path: '/projects' },
  // { name: 'Blog', path: '/blog' },
  { name: 'Contact', path: '/contact' },
]

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [transitionTheme, setTransitionTheme] = useState(theme)
  const router = useRouter()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => {
      setScrolled(window.scrollY > 0)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
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
    }, 1000)

    setTimeout(() => {
      setIsTransitioning(false)
    }, 1000)
  }

  if (!mounted) return null

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-background/80 backdrop-blur-md shadow-md' : ''}`}>
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-xl font-bold">
              <span className="text-purple-600">{'<'}</span>
              vincecoscia
              <span className="text-purple-600">{'/>'}</span>
            </Link>
            <div className="hidden md:flex space-x-6">
              {navItems.map((item) => (
                <NavLink key={item.name} item={item} />
              ))}
            </div>
            <div className="flex items-center">
              <ThemeToggle
                theme={transitionTheme}
                toggleTheme={toggleTheme}
                isTransitioning={isTransitioning}
              />
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
        </div>
      </nav>
      <MobileMenu isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} navItems={navItems} />
      <TransitionOverlay isTransitioning={isTransitioning} transitionTheme={transitionTheme as 'light' | 'dark'} />
    </>
  )
}