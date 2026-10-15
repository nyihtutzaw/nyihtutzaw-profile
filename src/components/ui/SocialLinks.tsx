import { site } from '@/lib/site';

const icons = {
  email: (
    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884zM18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
  ),
  linkedin: (
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 110-4.125 2.062 2.062 0 010 4.125zm1.782 13.019H3.555V9h3.564v11.452z" />
  ),
  github: (
    <path d="M12 0C5.37 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23a11.5 11.5 0 013.003-.404c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.565 21.796 24 17.298 24 12c0-6.627-5.373-12-12-12z" />
  ),
  medium: (
    <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
  ),
};

const items = [
  { key: 'email', label: 'Email', href: `mailto:${site.email}`, viewBox: '0 0 20 20' },
  { key: 'linkedin', label: 'LinkedIn', href: site.links.linkedin, viewBox: '0 0 24 24' },
  { key: 'github', label: 'GitHub', href: site.links.github, viewBox: '0 0 24 24' },
  { key: 'medium', label: 'Medium', href: site.links.medium, viewBox: '0 0 24 24' },
] as const;

const SocialLinks = ({ className = '' }: { className?: string }) => (
  <div className={`flex gap-3 ${className}`}>
    {items.map((item) => (
      <a
        key={item.key}
        href={item.href}
        target={item.key === 'email' ? undefined : '_blank'}
        rel={item.key === 'email' ? undefined : 'noopener noreferrer'}
        aria-label={item.label}
        className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-surface text-muted transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/50 hover:text-primary"
      >
        <svg className="h-[18px] w-[18px]" fill="currentColor" viewBox={item.viewBox} aria-hidden="true">
          {icons[item.key]}
        </svg>
      </a>
    ))}
  </div>
);

export default SocialLinks;
