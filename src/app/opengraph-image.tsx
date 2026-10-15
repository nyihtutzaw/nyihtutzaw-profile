import { ImageResponse } from 'next/og';
import { site } from '@/lib/site';

export const alt = `${site.name} — ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 72,
          background: 'linear-gradient(135deg, #0a0a0f 0%, #1b1a3a 60%, #0f2a3d 100%)',
          color: '#eeeef5',
        }}
      >
        <div style={{ display: 'flex', fontSize: 26, letterSpacing: 6, color: '#818cf8' }}>PORTFOLIO</div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 96, fontWeight: 700, lineHeight: 1.05 }}>{site.name}</div>
          <div
            style={{
              marginTop: 20,
              fontSize: 44,
              background: 'linear-gradient(90deg, #818cf8, #38bdf8)',
              backgroundClip: 'text',
              color: 'transparent',
            }}
          >
            {site.role}
          </div>
          <div style={{ marginTop: 28, fontSize: 28, color: '#969aa8', maxWidth: 900 }}>
            AI agents · LLM applications · Full-stack products
          </div>
        </div>
        <div style={{ display: 'flex', fontSize: 24, color: '#969aa8' }}>{site.location}</div>
      </div>
    ),
    size
  );
}
