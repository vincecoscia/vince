import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Moon, Sun, Menu, X } from 'lucide-react'

interface NavbarProps {
  theme: string
  toggleTheme: () => void
}

export default function Navbar({ theme, toggleTheme }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="container mx-auto px-6 py-4">
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
          >
            {theme === 'dark' ? <Sun className="h-[1.2rem] w-[1.2rem]" /> : <Moon className="h-[1.2rem] w-[1.2rem]" />}
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
  )
}