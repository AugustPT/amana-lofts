import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="flex min-h-[75vh] flex-col items-center justify-center bg-background px-6 text-center">
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary">404</p>
      <h1 className="mt-3 font-serif text-4xl text-foreground sm:text-5xl">Page not found</h1>
      <p className="mt-4 max-w-md text-pretty leading-relaxed text-muted-foreground">
        The page you’re looking for doesn’t exist or has moved.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex rounded-full bg-primary px-7 py-3.5 font-mono text-xs uppercase tracking-widest text-primary-foreground transition-transform hover:scale-[1.02]"
      >
        Back to Amana Lofts
      </Link>
    </main>
  )
}
