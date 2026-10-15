import { ReactNode } from 'react';

/** Infinite horizontal scroller. Pass the items once; they are duplicated for a seamless loop. */
const Marquee = ({ children }: { children: ReactNode }) => (
  <div
    className="marquee relative overflow-hidden"
    style={{
      maskImage: 'linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)',
      WebkitMaskImage: 'linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)',
    }}
  >
    <div className="marquee-track flex w-max gap-3">
      <div className="flex gap-3">{children}</div>
      <div className="flex gap-3" aria-hidden="true">
        {children}
      </div>
    </div>
  </div>
);

export default Marquee;
