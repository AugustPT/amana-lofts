import { Reveal } from "@/components/reveal"

const faqs = [
  {
    q: "What does “80% AMI” mean?",
    a: "AMI is the Area Median Income — the midpoint income for Honolulu. Amana Lofts is reserved for households earning at or below 80% of it, so there’s an income limit based on how many people are in your household. The estimator above shows the limit for your household size.",
  },
  {
    q: "What makes Amana Lofts affordable?",
    a: "Residences are reserved for qualifying households whose income falls at or below designated limits based on Area Median Income (AMI).",
  },
  {
    q: "Who can apply?",
    a: "Applicants must be at least 18, a U.S. citizen or qualifying resident alien, domiciled in Hawai\u02bbi with intent to reside in the unit, and must not own a majority interest in land suitable for dwelling during the rental period.",
  },
  {
    q: "How is eligibility confirmed?",
    a: "Final eligibility is based on household size, total gross income and assets relative to the unit's designated limit, and is verified with documentation during the application process.",
  },
  {
    q: "What happens after I join?",
    a: "Our leasing team will follow up with the required documentation and application steps as residences become available.",
  },
]

export function EligibilityInfo() {
  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-10">
      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <Reveal>
          <div>
            <p className="mb-5 font-mono text-xs uppercase tracking-[0.3em] text-primary">
              Good to Know
            </p>
            <h3 className="text-balance font-serif text-2xl leading-tight text-foreground sm:text-3xl">
              The full requirements.
            </h3>
            <p className="mt-5 text-pretty leading-relaxed text-muted-foreground">
              The estimator above is a quick guide. Final eligibility is subject to
              income and asset verification under applicable affordable housing
              (AMI) guidelines.
            </p>
          </div>
        </Reveal>

        <div className="flex flex-col divide-y divide-border">
          {faqs.map((f, i) => (
            <Reveal key={f.q} delay={i * 0.05}>
              <div className="py-5 first:pt-0">
                <h4 className="font-serif text-xl text-foreground">{f.q}</h4>
                <p className="mt-2 leading-relaxed text-muted-foreground">{f.a}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  )
}
