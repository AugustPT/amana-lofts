import Image from "next/image"
import { Reveal } from "@/components/reveal"

export function About() {
  return (
    <section
      id="about"
      className="border-t border-border bg-secondary/30 py-24 lg:py-32"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2 lg:gap-20 lg:px-10">
        {/* Image left */}
        <Reveal>
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl">
            <Image
              src="/amana-building.png"
              alt="The Amana Lofts building exterior in Honolulu"
              fill
              className="object-cover"
            />
          </div>
        </Reveal>

        {/* Text right */}
        <div>
          <Reveal>
            <p className="mb-5 font-mono text-xs uppercase tracking-[0.3em] text-primary">
              About Amana Lofts
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="text-balance font-serif text-4xl leading-[1.05] text-foreground sm:text-5xl">
              Modern city living, made more accessible.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-7 text-pretty text-lg leading-relaxed text-muted-foreground">
              Amana Lofts reimagines a former office building as 64 contemporary
              rental residences in the heart of Honolulu — an adaptive-reuse project
              by JL Capital designed to make in-town living attainable.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
              Just off Ala Moana, you&apos;re steps from shopping, dining, jobs,
              transit, and the beach — everything that makes urban island life
              vibrant, within an easy walk.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
