export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export const site = {
  name: 'Nyi Htut Zaw',
  role: 'Senior Full-Stack & AI Engineer',
  email: 'nyihtutzaw.2015@gmail.com',
  location: 'Bangkok, Thailand',
  description:
    'Senior Full-Stack & AI Engineer building web and mobile products, backend systems, cloud infrastructure and AI agents. Portfolio, experience and writing of Nyi Htut Zaw.',
  links: {
    github: 'https://github.com/nyihtutzaw',
    linkedin: 'https://www.linkedin.com/in/nyi-htut-zaw-9b741115a/',
    medium: 'https://medium.com/@nyihtutzaw.2015',
  },
};

export const navItems = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Experience', href: '/experience' },
  { name: 'Education', href: '/education' },
  { name: 'Skills', href: '/skills' },
  { name: 'Projects', href: '/projects' },
  { name: 'Blog', href: '/blog' },
  { name: 'Contact', href: '/contact' },
] as const;
