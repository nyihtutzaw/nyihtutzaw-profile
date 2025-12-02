'use client';

import { ReactNode, useState } from 'react';
import Sidebar from './Sidebar';
import ThemeToggle from './ThemeToggle';
import MobileSidebar from './MobileSidebar';


interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Desktop Sidebar - Hidden on Mobile */}
      <div className="hidden md:block">
        <Sidebar />
      </div>
      
      {/* Mobile Sidebar Drawer */}
      <MobileSidebar 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
      />
      
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
      
      {/* Main Content */}
      <main className="md:ml-20">
        {/* Mobile Header with Menu Toggle */}
        <div className="md:hidden fixed top-0 left-0 right-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 z-30">
          <div className="flex items-center justify-between px-4 py-3">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <svg className="w-6 h-6 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            
            {/* Theme Toggle */}
            <ThemeToggle />
          </div>
        </div>
        
        {/* Desktop Theme Toggle - Fixed Top Right */}
        <div className="hidden md:block fixed top-4 right-4 z-50">
          <ThemeToggle />
        </div>

        {/* Page Content */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 md:px-6 md:py-6">
          {/* Add top padding for mobile to account for fixed header */}
          <div className="md:pt-0 pt-16">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Layout;
