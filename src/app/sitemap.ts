import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    { path: '', priority: 1 },
    { path: 'platform/', priority: 0.8 },
    { path: 'demo/', priority: 0.9 },
    { path: 'partner/', priority: 0.8 },
  ];

  return routes.map((route) => ({
    url: `${SITE.url}/${route.path}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: route.priority,
  }));
}
