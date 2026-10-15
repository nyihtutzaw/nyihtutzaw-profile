'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { OPEN_PALETTE_EVENT } from './CommandPalette';

const PaletteButton = () => (
  <button
    onClick={() => window.dispatchEvent(new Event(OPEN_PALETTE_EVENT))}
    aria-label="Open command palette"
    className="flex h-10 items-center gap-2 rounded-full border border-line bg-surface/80 px-3 text-sm text-muted backdrop-blur transition-colors hover:border-primary/50 hover:text-primary"
  >
    <MagnifyingGlassIcon className="h-4 w-4" />
    <span className="hidden sm:inline">Search</span>
    <kbd className="hidden rounded border border-line px-1.5 font-mono text-[10px] sm:inline">⌘K</kbd>
  </button>
);

export default PaletteButton;
