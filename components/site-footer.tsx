const navLinks = [
  { href: "#about", label: "About" },
  { href: "#residences", label: "Residences" },
  { href: "#amenities", label: "Amenities" },
  { href: "#neighborhood", label: "Neighborhood" },
  { href: "#eligibility", label: "Eligibility" },
  { href: "#gallery", label: "Gallery" },
  { href: "#contact", label: "Interest List" },
]

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-3">
          <div>
            <p className="font-serif text-2xl text-foreground">Amana Lofts</p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              765 Amana Street
              <br />
              Honolulu, Hawai&#699;i 96814
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              A development by JL Capital
            </p>
          </div>

          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
              Explore
            </p>
            <ul className="mt-4 grid grid-cols-2 gap-3">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-sm text-foreground transition-colors hover:text-primary"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
              Get in touch
            </p>
            <a
              href="#contact"
              className="mt-4 inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 font-mono text-xs uppercase tracking-widest text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Join Interest List
            </a>
            <div className="mt-5 flex gap-4 text-sm text-muted-foreground">
              <a href="#" className="transition-colors hover:text-primary">
                Instagram
              </a>
              <a href="#" className="transition-colors hover:text-primary">
                Facebook
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Amana Lofts. All rights reserved.
          </p>
          <div className="flex items-center gap-3">
            <span
              aria-hidden="true"
              className="flex size-8 items-center justify-center rounded border border-border font-mono text-[10px] font-semibold leading-none text-foreground"
            >
              EHO
            </span>
            <p className="max-w-md text-xs leading-relaxed text-muted-foreground">
              Equal Housing Opportunity. Eligibility determinations are preliminary
              and subject to income verification and applicable affordable housing
              (AMI) guidelines.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
