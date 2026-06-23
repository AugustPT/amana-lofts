import type { MetadataRoute } from 'next'

const BASE = 'https://amana-lofts-y8pj.vercel.app'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${BASE}/sitemap.xml`,
    host: BASE,
  }
}
