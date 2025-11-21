'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  HomeIcon, 
  UserIcon, 
  BriefcaseIcon, 
  AcademicCapIcon, 
  CodeBracketIcon, 
  DocumentTextIcon,
  BookOpenIcon,
  EnvelopeIcon
} from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';

const menuItems = [
  { name: 'Home', href: '/', icon: HomeIcon, color: 'from-blue-500 to-blue-600' },
  { name: 'About', href: '/about', icon: UserIcon, color: 'from-green-500 to-green-600' },
  { name: 'Experience', href: '/experience', icon: BriefcaseIcon, color: 'from-purple-500 to-purple-600' },
  { name: 'Education', href: '/education', icon: AcademicCapIcon, color: 'from-yellow-500 to-yellow-600' },
  { name: 'Skills', href: '/skills', icon: CodeBracketIcon, color: 'from-red-500 to-red-600' },
  { name: 'Projects', href: '/projects', icon: DocumentTextIcon, color: 'from-indigo-500 to-indigo-600' },
  { name: 'Blog', href: '/blog', icon: BookOpenIcon, color: 'from-pink-500 to-pink-600' },
  { name: 'Contact', href: '/contact', icon: EnvelopeIcon, color: 'from-teal-500 to-teal-600' },
];

const Sidebar = () => {
  const pathname = usePathname();
  const [isAnimating, setIsAnimating] = useState(false);
  const [previousPath, setPreviousPath] = useState('/');

  useEffect(() => {
    if (previousPath !== pathname) {
      setIsAnimating(true);
      const timer = setTimeout(() => setIsAnimating(false), 600);
      setPreviousPath(pathname);
      return () => clearTimeout(timer);
    }
  }, [pathname, previousPath]);

  return (
    <aside className="fixed left-0 top-0 h-full w-20 z-40">
      <div className="relative flex flex-col h-full justify-center py-8">
        {/* Navigation Icons Only */}
        <nav className="flex-1 flex flex-col justify-center">
          <ul className="space-y-6">
            {menuItems.map((item, index) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              
              return (
                <li key={item.name} className="flex justify-center">
                  <Link
                    href={item.href}
                    className={`relative group transition-all duration-300 transform ${
                      isActive
                        ? 'scale-110'
                        : 'hover:scale-110'
                    }`}
                    style={{
                      transitionDelay: `${index * 30}ms`
                    }}
                  >
                    {/* Icon Container */}
                    <div className={`relative w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
                      isActive
                        ? `bg-gradient-to-br ${item.color} shadow-lg`
                        : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}>
                      <Icon className={`w-6 h-6 transition-all duration-300 ${
                        isActive 
                          ? 'text-white' 
                          : 'text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'
                      }`} />
                      
                      {/* Active State Animation */}
                      {isActive && (
                        <div className={`absolute inset-0 bg-gradient-to-br ${item.color} rounded-xl animate-ping opacity-30`} />
                      )}
                    </div>

                    {/* Tooltip */}
                    <div className={`absolute left-full ml-3 top-1/2 transform -translate-y-1/2 px-3 py-1 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50`}>
                      {item.name}
                      <div className="absolute right-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-r-gray-900 dark:border-r-gray-100" />
                    </div>

                    {/* Active Indicator Line */}
                    {isActive && (
                      <div className={`absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-gradient-to-b ${item.color} rounded-r-full`} />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      {/* Page Change Animation */}
      {isAnimating && (
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 pointer-events-none animate-pulse" />
      )}
    </aside>
  );
};

export default Sidebar;
