import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import type { Metadata, Viewport } from 'next'
import { Providers } from './providers'
import { Geist, Geist_Mono, Fraunces } from 'next/font/google'
import './globals.css'

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] })
const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})
const fraunces = Fraunces({
  variable: '--font-fraunces',
  subsets: ['latin'],
  display: 'swap',
})

const SITE_TITLE = 'Amana Lofts — 80% AMI Affordable Rental Homes in Honolulu'
const SITE_DESC =
  'Amana Lofts is an 80% AMI affordable rental community — 64 studio, one-, and two-bedroom homes at 765 Amana Street near Ala Moana. Check if you may qualify in about a minute. Leasing by Associated Real Estate Advisors (AREA).'

export const metadata: Metadata = {
  metadataBase: new URL('https://amana-lofts-y8pj.vercel.app'),
  title: SITE_TITLE,
  description: SITE_DESC,
  alternates: { canonical: '/' },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESC,
    type: 'website',
    siteName: 'Amana Lofts',
    images: [{ url: '/hero-lifestyle.png', width: 1200, height: 630, alt: 'Amana Lofts — Honolulu' }],
  },
  twitter: { card: 'summary_large_image', title: SITE_TITLE, description: SITE_DESC, images: ['/hero-lifestyle.png'] },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: [{ media: '(prefers-color-scheme: light)', color: '#f6f3ec' }],
}

// Structured data so search engines understand this is a specific residential
// property at a fixed address — improves rich-result eligibility for local search.
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ApartmentComplex',
  name: 'Amana Lofts',
  description: SITE_DESC,
  url: 'https://amana-lofts-y8pj.vercel.app',
  numberOfAccommodationUnits: 64,
  address: {
    '@type': 'PostalAddress',
    streetAddress: '765 Amana Street',
    addressLocality: 'Honolulu',
    addressRegion: 'HI',
    postalCode: '96814',
    addressCountry: 'US',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en-US"
      className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable} bg-background`}
    >
      <body className="font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Providers>{children}</Providers>
        {process.env.NODE_ENV === 'production' && (
          <>
            <Analytics />
            <SpeedInsights />
          </>
        )}
      </body>
    </html>
  )
}
