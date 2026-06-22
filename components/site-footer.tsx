const navLinks = [
  { href: "#about", label: "About" },
  { href: "#residences", label: "Residences" },
  { href: "#amenities", label: "Amenities" },
  { href: "#neighborhood", label: "Neighborhood" },
  { href: "#eligibility", label: "Eligibility" },
  { href: "#gallery", label: "Gallery" },
  { href: "#eligibility", label: "Check Eligibility" },
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
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Leasing &amp; inquiries by Associated Real Estate Advisors (AREA)
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
              href="#eligibility"
              className="mt-4 inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 font-mono text-xs uppercase tracking-widest text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Check If You May Qualify
            </a>
            {/* TODO: replace with AREA's real leasing email + phone */}
            <div className="mt-5 flex flex-col gap-1 text-sm text-muted-foreground">
              <a
                href="mailto:leasing@area-hawaii.com"
                className="transition-colors hover:text-primary"
              >
                leasing@area-hawaii.com
              </a>
              <a href="tel:+18080000000" className="transition-colors hover:text-primary">
                (808) 000-0000
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
