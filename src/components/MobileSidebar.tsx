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
  EnvelopeIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

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

const MobileSidebar = ({ isOpen, onClose }: MobileSidebarProps) => {
  const pathname = usePathname();

  if (!isOpen) return null;

  return (
    <>
      {/* Mobile Sidebar Drawer */}
      <div className="fixed inset-y-0 left-0 w-72 bg-white dark:bg-gray-800 shadow-xl z-50 transform transition-transform duration-300 ease-in-out md:hidden">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Menu</h2>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <XMarkIcon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-4">
            <ul className="space-y-2 px-4">
              {menuItems.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;
                
                return (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className={`flex items-center px-4 py-3 rounded-lg transition-all duration-200 ${
                        isActive
                          ? `bg-gradient-to-r ${item.color} text-white shadow-md`
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      <Icon className="w-5 h-5 mr-3" />
                      <span className="font-medium">{item.name}</span>
                      
                      {/* Active Indicator */}
                      {isActive && (
                        <div className="ml-auto">
                          <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                        </div>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                © 2024 Nyi Htut Zaw
              </p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                Senior Software Engineer
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileSidebar;
