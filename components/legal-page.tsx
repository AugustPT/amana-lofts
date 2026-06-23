import Link from "next/link"

// Shared chrome for the legal/info pages. Each page is a DRAFT scaffold pending
// review by Amana Lofts / AREA and their counsel — the banner says so plainly so it
// can't be mistaken for a finalized, binding policy.
export function LegalPage({
  title,
  updated,
  children,
}: {
  title: string
  updated: string
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-5">
          <Link href="/" className="font-serif text-xl text-foreground">
            Amana Lofts
          </Link>
          <Link
            href="/"
            className="font-mono text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground"
          >
            ← Home
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-16">
        <div
          role="note"
          className="mb-10 rounded-2xl border border-primary/30 bg-primary/5 px-5 py-4 text-sm leading-relaxed text-foreground"
        >
          <strong>Draft for review.</strong> This page is a placeholder pending review by
          Amana Lofts / Associated Real Estate Advisors and their legal counsel. It is not
          yet a finalized or binding policy.
        </div>

        <h1 className="font-serif text-4xl leading-tight text-foreground sm:text-5xl">
          {title}
        </h1>
        <p className="mt-3 font-mono text-xs uppercase tracking-widest text-muted-foreground">
          {updated}
        </p>

        <div className="mt-10 flex flex-col gap-8 text-pretty leading-relaxed text-muted-foreground">
          {children}
        </div>

        <nav
          aria-label="Legal pages"
          className="mt-16 flex flex-wrap gap-5 border-t border-border pt-8 font-mono text-xs uppercase tracking-widest text-muted-foreground"
        >
          <Link href="/privacy" className="transition-colors hover:text-foreground">
            Privacy
          </Link>
          <Link href="/terms" className="transition-colors hover:text-foreground">
            Terms
          </Link>
          <Link href="/accessibility" className="transition-colors hover:text-foreground">
            Accessibility
          </Link>
        </nav>
      </main>
    </div>
  )
}

// Consistent section styling within a legal page.
export function LegalSection({ heading, children }: { heading: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="font-serif text-xl text-foreground sm:text-2xl">{heading}</h2>
      {children}
    </section>
  )
}
