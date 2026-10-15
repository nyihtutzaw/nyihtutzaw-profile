'use client';

import { ElementType, ReactNode, MouseEvent } from 'react';

interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  [key: string]: unknown;
}

/** Card with a soft highlight that follows the cursor. Updates CSS vars directly — no re-renders. */
const SpotlightCard = ({ children, className = '', as: Tag = 'div', ...rest }: SpotlightCardProps) => {
  const onMove = (e: MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty('--my', `${e.clientY - rect.top}px`);
  };

  return (
    <Tag
      onMouseMove={onMove}
      className={`spotlight card transition-colors duration-300 hover:border-primary/40 ${className}`}
      {...rest}
    >
      <div className="relative">{children}</div>
    </Tag>
  );
};

export default SpotlightCard;
