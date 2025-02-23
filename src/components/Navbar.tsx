'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const Navbar = () => {
  const pathname = usePathname()
  


  return (
    <nav className="fixed top-0 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm z-50">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex items-center justify-center h-16">
          <Link href="/" className="font-bold text-xl">
            ZAW
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar