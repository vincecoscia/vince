import { Button } from "@/components/ui/button"
import { Moon, Sun } from 'lucide-react'

interface ThemeToggleProps {
  theme: string | undefined
  toggleTheme: () => void
  isTransitioning: boolean
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ theme, toggleTheme, isTransitioning }) => {
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="mr-4"
      disabled={isTransitioning}
    >
      {theme === 'dark' ? <Sun className="h-[1.2rem] w-[1.2rem]" /> : <Moon className="h-[1.2rem] w-[1.2rem]" />}
    </Button>
  )
}

export default ThemeToggle