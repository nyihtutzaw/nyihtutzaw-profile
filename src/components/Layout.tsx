'use client';

import { ReactNode, useEffect, useState } from 'react';
import { Bars3Icon } from '@heroicons/react/24/outline';
import Navbar from './Navbar';
import PaletteButton from './PaletteButton';
import ThemeToggle from './ThemeToggle';
import MobileSidebar from './MobileSidebar';
import CommandPalette from './CommandPalette';
import ScrollProgress from './ui/ScrollProgress';
import { site } from '@/lib/site';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  return (
    <div className="relative min-h-screen">
      <ScrollProgress />
      <CommandPalette />

      {/* Ambient background: faint grid + soft colour glows */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
        <div
          className="absolute inset-0 opacity-[0.5]"
          style={{
            backgroundImage:
              'linear-gradient(rgb(var(--line) / 0.55) 1px, transparent 1px), linear-gradient(90deg, rgb(var(--line) / 0.55) 1px, transparent 1px)',
            backgroundSize: '56px 56px',
            maskImage: 'radial-gradient(ellipse 70% 55% at 50% 0%, #000 30%, transparent 80%)',
            WebkitMaskImage: 'radial-gradient(ellipse 70% 55% at 50% 0%, #000 30%, transparent 80%)',
          }}
        />
        <div className="absolute -top-40 left-1/4 h-[28rem] w-[28rem] rounded-full bg-primary/15 blur-3xl" />
        <div className="absolute top-40 right-0 h-[24rem] w-[24rem] rounded-full bg-accent/10 blur-3xl" />
      </div>

      <Navbar />
      <MobileSidebar isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />

      <main>
        {/* Mobile header */}
        <header className="fixed inset-x-0 top-0 z-30 border-b border-line bg-bg/80 backdrop-blur-xl lg:hidden">
          <div className="flex items-center justify-between px-4 py-3">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open menu"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-surface text-muted"
            >
              <Bars3Icon className="h-5 w-5" />
            </button>
            <span className="font-display text-sm font-semibold text-fg">{site.name}</span>
            <div className="flex items-center gap-2">
              <PaletteButton />
              <ThemeToggle />
            </div>
          </div>
        </header>

        <div className="mx-auto max-w-6xl px-4 pb-24 pt-20 sm:px-6 lg:pt-24">{children}</div>

        <footer className="border-t border-line">
          <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 text-sm text-muted sm:flex-row sm:px-6">
            <p>© {new Date().getFullYear()} {site.name}. Built with Next.js & Tailwind.</p>
            <p className="font-mono text-xs">
              Press <kbd className="rounded border border-line px-1.5">⌘K</kbd> to navigate
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Layout;
