import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Amana Lofts',
    short_name: 'Amana Lofts',
    description: '80% AMI affordable rental homes in Honolulu — 765 Amana Street.',
    start_url: '/',
    display: 'standalone',
    background_color: '#f6f3ec',
    theme_color: '#f6f3ec',
    icons: [{ src: '/icon.svg', sizes: 'any', type: 'image/svg+xml' }],
  }
}
