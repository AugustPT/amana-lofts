import { SiteNav } from "@/components/site-nav"
import { Hero } from "@/components/hero"
import { StatementBand } from "@/components/statement-band"
import { Neighborhood } from "@/components/neighborhood"
import { About } from "@/components/about"
import { Residences } from "@/components/residences"
import { Amenities } from "@/components/amenities"
import { EligibilityInfo } from "@/components/eligibility-info"
import { EligibilityScreener } from "@/components/eligibility-screener"
import { Gallery } from "@/components/gallery"
import { SiteFooter } from "@/components/site-footer"

export default function Page() {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only z-[100] rounded-full bg-primary px-5 py-3 font-mono text-xs uppercase tracking-widest text-primary-foreground focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to main content
      </a>
      <SiteNav />
      <main id="main-content" className="bg-background text-foreground">
        <Hero />
      <StatementBand />
      <Neighborhood />
      <About />
      <Residences />
      <Amenities />

      {/* Eligibility — guided tool first, supporting detail below */}
      <section
        id="eligibility"
        className="scroll-mt-20 border-t border-border bg-background py-24 lg:py-32"
      >
        <div id="contact" className="scroll-mt-20 px-6">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <p className="mb-5 font-mono text-xs uppercase tracking-[0.3em] text-primary">
              Check Your Eligibility
            </p>
            <h2 className="text-balance font-serif text-4xl leading-[1.05] text-foreground sm:text-5xl">
              See if Amana Lofts is right for you.
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
              Answer a few quick questions to see if you may qualify and estimate
              your income limit. Your details go straight to the AREA leasing team,
              and your answers stay confidential.
            </p>
          </div>
          <EligibilityScreener />
        </div>

        <div className="mt-20 border-t border-border pt-20">
          <EligibilityInfo />
        </div>
      </section>

        <Gallery />
        <SiteFooter />
      </main>
    </>
  )
}
