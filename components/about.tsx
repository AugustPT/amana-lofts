import Image from "next/image"
import { Reveal } from "@/components/reveal"
import buildingImg from "../public/amana-building.webp"

export function About() {
  return (
    <section
      id="about"
      className="border-t border-border bg-secondary/30 py-24 lg:py-32"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 lg:grid-cols-5 lg:gap-16 lg:px-10">
        {/* Text left */}
        <div className="lg:col-span-2">
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
              Amana Lofts brings 64 new rental residences to the heart of Honolulu —
              32 studios, 20 one-bedroom, and 12 two-bedroom homes by Amana Lofts LLC,
              designed to make in-town living attainable.
            </p>
          </Reveal>
          <Reveal delay={0.125}>
            <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
              It&apos;s an{" "}
              <span className="text-foreground">80% AMI affordable rental community</span>{" "}
              — reserved for households earning at or below 80% of Honolulu&apos;s Area
              Median Income (about $121,600 a year for a family of four, per the 2026
              income chart). The quick eligibility check below estimates your
              household&apos;s limit in about a minute.
            </p>
          </Reveal>
        </div>

        {/* Image right — the actual building, shown in full at its natural proportions */}
        <Reveal className="lg:col-span-3">
          <Image
            src={buildingImg}
            alt="The Amana Lofts building exterior in Honolulu"
            sizes="(min-width: 1024px) 60vw, 100vw"
            placeholder="blur"
            className="h-auto w-full rounded-3xl shadow-sm"
          />
        </Reveal>
      </div>
    </section>
  )
}
