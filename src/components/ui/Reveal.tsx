'use client';

import { ElementType, ReactNode, useEffect, useRef, useState } from 'react';

interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: ElementType;
}

/**
 * Fades/slides content in as it scrolls into view.
 *
 * Progressive enhancement: content is rendered visible (works without JS and
 * for crawlers). After mount, only elements that start below the fold are
 * hidden and then revealed by an IntersectionObserver. CSS-driven; honours
 * prefers-reduced-motion.
 */
const Reveal = ({ children, delay = 0, className = '', as: Tag = 'div' }: RevealProps) => {
  const ref = useRef<HTMLElement>(null);
  const [armed, setArmed] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    if (el.getBoundingClientRect().top < window.innerHeight) return; // already on screen

    setArmed(true);
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`${armed ? `reveal ${visible ? 'is-visible' : ''}` : ''} ${className}`}
      style={armed ? ({ '--reveal-delay': `${delay}ms` } as React.CSSProperties) : undefined}
    >
      {children}
    </Tag>
  );
};

export default Reveal;
