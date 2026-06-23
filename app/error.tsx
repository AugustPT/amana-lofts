'use client'

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main className="flex min-h-[75vh] flex-col items-center justify-center bg-background px-6 text-center">
      <h1 className="font-serif text-3xl text-foreground sm:text-4xl">Something went wrong</h1>
      <p className="mt-4 max-w-md text-pretty leading-relaxed text-muted-foreground">
        Sorry — something went wrong on our end. Please try again in a moment.
      </p>
      <button
        onClick={reset}
        className="mt-8 inline-flex rounded-full bg-primary px-7 py-3.5 font-mono text-xs uppercase tracking-widest text-primary-foreground transition-transform hover:scale-[1.02]"
      >
        Try again
      </button>
    </main>
  )
}
