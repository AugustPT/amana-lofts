"use client"

import Image from "next/image"
import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"

type Unit = {
  name: string
  image: string
  blurb: string
  size: string
  beds: string
  baths: string
  plan: "studio" | "one" | "two"
}

const units: Unit[] = [
  {
    name: "Studio",
    image: "/unit-studio.png",
    blurb:
      "An efficient, light-filled open layout that makes the most of every square foot.",
    size: "289–346 sq ft",
    beds: "Open plan",
    baths: "1 bath",
    plan: "studio",
  },
  {
    name: "One Bedroom",
    image: "/unit-one-bed.png",
    blurb:
      "A defined bedroom and a bright living space with contemporary finishes for everyday comfort.",
    size: "365–393 sq ft",
    beds: "1 bedroom",
    baths: "1 bath",
    plan: "one",
  },
  {
    name: "Two Bedroom",
    image: "/unit-two-bed.png",
    blurb:
      "A smart two-bedroom layout — ideal for roommates or a small household sharing the space.",
    size: "471–561 sq ft",
    beds: "2 bedrooms",
    baths: "1 bath",
    plan: "two",
  },
]

function FloorPlan({ plan }: { plan: Unit["plan"] }) {
  const stroke = "currentColor"
  return (
    <svg
      viewBox="0 0 200 140"
      className="h-full w-full text-primary/50"
      fill="none"
      stroke={stroke}
      strokeWidth={1.5}
      aria-hidden="true"
    >
      <rect x="6" y="6" width="188" height="128" rx="4" />
      {plan === "studio" && (
        <>
          <rect x="6" y="86" width="60" height="48" />
          <rect x="140" y="6" width="54" height="42" />
          <line x1="140" y1="86" x2="194" y2="86" />
        </>
      )}
      {plan === "one" && (
        <>
          <line x1="110" y1="6" x2="110" y2="86" />
          <rect x="6" y="86" width="56" height="48" />
          <rect x="62" y="86" width="48" height="48" />
        </>
      )}
      {plan === "two" && (
        <>
          <line x1="120" y1="6" x2="120" y2="70" />
          <line x1="120" y1="70" x2="194" y2="70" />
          <line x1="60" y1="86" x2="60" y2="134" />
          <rect x="6" y="86" width="54" height="48" />
        </>
      )}
    </svg>
  )
}

export function Residences() {
  const [active, setActive] = useState(0)
  const current = units[active]

  return (
    <section id="residences" className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
      <div className="max-w-2xl">
        <p className="mb-5 font-mono text-xs uppercase tracking-[0.3em] text-primary">
          The Residences
        </p>
        <h2 className="text-balance font-serif text-4xl leading-[1.05] text-foreground sm:text-5xl lg:text-6xl">
          Three modern layouts. Choose your space.
        </h2>
      </div>

      {/* Selector */}
      <div className="mt-12 flex flex-wrap gap-3">
        {units.map((u, i) => (
          <button
            key={u.name}
            type="button"
            onClick={() => setActive(i)}
            className={`rounded-full px-6 py-3 font-mono text-xs uppercase tracking-widest transition-colors ${
              i === active
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-muted-foreground hover:text-foreground"
            }`}
          >
            {u.name}
          </button>
        ))}
      </div>

      {/* Detail */}
      <div className="mt-10 grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.image}
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0"
            >
              <Image
                src={current.image || "/placeholder.svg"}
                alt={`${current.name} residence at Amana Lofts`}
                fill
                className="object-cover"
              />
            </motion.div>
          </AnimatePresence>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={current.name}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <h3 className="font-serif text-3xl text-foreground sm:text-4xl">
              {current.name}
            </h3>
            <p className="mt-4 max-w-md text-pretty text-lg leading-relaxed text-muted-foreground">
              {current.blurb}
            </p>

            <dl className="mt-8 grid grid-cols-3 gap-6 border-t border-border pt-6">
              <div>
                <dt className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                  Size
                </dt>
                <dd className="mt-1 text-foreground">{current.size}</dd>
              </div>
              <div>
                <dt className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                  Layout
                </dt>
                <dd className="mt-1 text-foreground">{current.beds}</dd>
              </div>
              <div>
                <dt className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                  Bath
                </dt>
                <dd className="mt-1 text-foreground">{current.baths}</dd>
              </div>
            </dl>

            <div className="mt-8 flex items-center gap-5">
              <div className="h-24 w-32 shrink-0 rounded-xl border border-border bg-secondary/40 p-3">
                <FloorPlan plan={current.plan} />
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Indicative floor plan. High ceilings and abundant natural light
                throughout.
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
