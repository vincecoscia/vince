import Link from 'next/link'
import { useRouter } from 'next/router'

interface NavLinkProps {
  item: { name: string; path: string }
}

const NavLink: React.FC<NavLinkProps> = ({ item }) => {
  const router = useRouter()
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

export default NavLink