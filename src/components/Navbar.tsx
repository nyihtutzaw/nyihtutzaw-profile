'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, useReducedMotion } from 'framer-motion';
import { navItems, site } from '@/lib/site';
import ThemeToggle from './ThemeToggle';
import PaletteButton from './PaletteButton';

/** Desktop top bar (lg and up). Below lg the Layout shows the mobile header + drawer instead. */
const Navbar = () => {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 hidden transition-all duration-300 lg:block ${
        scrolled ? 'border-b border-line bg-bg/70 backdrop-blur-xl' : 'border-b border-transparent'
      }`}
    >
      <div className="mx-auto grid h-16 max-w-6xl grid-cols-[1fr_auto_1fr] items-center gap-4 px-6">
        <Link href="/" className="flex items-center gap-2.5 justify-self-start" aria-label={`${site.name} — home`}>
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary font-display text-sm font-bold text-primary-fg">
            NZ
          </span>
          <span className="font-display text-sm font-semibold text-fg">{site.name}</span>
        </Link>

        <nav aria-label="Primary">
          <ul className="flex items-center gap-1 rounded-full border border-line bg-surface/70 p-1 shadow-sm backdrop-blur-xl">
            {navItems.map((item) => {
              const isActive = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive ? 'page' : undefined}
                    className={`relative block rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${
                      isActive ? 'text-primary-fg' : 'text-muted hover:text-fg'
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-active"
                        transition={reduceMotion ? { duration: 0 } : { type: 'spring', stiffness: 420, damping: 34 }}
                        className="absolute inset-0 rounded-full bg-primary shadow-md shadow-primary/30"
                      />
                    )}
                    <span className="relative">{item.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2 justify-self-end">
          <PaletteButton />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
