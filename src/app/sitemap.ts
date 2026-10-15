import type { MetadataRoute } from 'next';
import { SITE_URL, navItems } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  return navItems.map((item) => ({
    url: `${SITE_URL}${item.href === '/' ? '' : item.href}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: item.href === '/' ? 1 : 0.7,
  }));
}
