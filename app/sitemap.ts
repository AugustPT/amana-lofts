import type { MetadataRoute } from 'next'

const BASE = 'https://amana-lofts-y8pj.vercel.app'

// Single-page marketing site — one canonical entry.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: BASE,
      changeFrequency: 'weekly',
      priority: 1,
    },
  ]
}
