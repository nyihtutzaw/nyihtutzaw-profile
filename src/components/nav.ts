import {
  HomeIcon, UserIcon, BriefcaseIcon, AcademicCapIcon,
  CodeBracketIcon, RocketLaunchIcon, BookOpenIcon, EnvelopeIcon,
} from '@heroicons/react/24/outline';
import { navItems } from '@/lib/site';

const icons = {
  '/': HomeIcon,
  '/about': UserIcon,
  '/experience': BriefcaseIcon,
  '/education': AcademicCapIcon,
  '/skills': CodeBracketIcon,
  '/projects': RocketLaunchIcon,
  '/blog': BookOpenIcon,
  '/contact': EnvelopeIcon,
} as const;

export const navWithIcons = navItems.map((item) => ({ ...item, icon: icons[item.href] }));
