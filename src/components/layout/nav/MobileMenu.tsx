import Link from 'next/link'
import { useRouter } from 'next/router'
import { X } from 'lucide-react'
import { Button } from "@/components/ui/button"

interface MobileMenuProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  navItems: Array<{ name: string; path: string }>
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, setIsOpen, navItems }) => {
  const router = useRouter()

  return (
    <div className={`fixed inset-0 bg-background z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      <div className="flex flex-col h-full">
        <div className="flex justify-end p-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(false)}
          >
            <X className="h-[1.2rem] w-[1.2rem]" />
          </Button>
        </div>
        <div className="flex flex-col items-center justify-center flex-grow space-y-8">
          {navItems.map((item) => {
            const isActive = router.pathname === item.path
            return (
              <Link 
                key={item.name}
                href={item.path} 
                className={`text-2xl hover:text-purple-600 transition-colors duration-300 ${isActive ? 'text-purple-600 font-bold' : ''}`}
                onClick={() => setIsOpen(false)}
              >
                <span className={`text-purple-600 ${isActive ? 'font-bold' : ''}`}>{`//`}</span> {item.name}
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default MobileMenu