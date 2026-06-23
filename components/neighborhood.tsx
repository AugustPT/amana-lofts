"use client"

import Image from "next/image"
import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Footprints, Bike, Car } from "lucide-react"

type Mode = "walk" | "bike" | "drive"

type Destination = {
  name: string
  image: string
  time: string
  mode: Mode
  note: string
}

const destinations: Destination[] = [
  {
    name: "Ala Moana Center",
    image: "/nb-center.png",
    time: "4 min",
    mode: "walk",
    note: "Hawai\u02bbi's largest open-air mall, right across the way.",
  },
  {
    name: "Ala Moana Beach Park",
    image: "/nb-beach.png",
    time: "12 min",
    mode: "walk",
    note: "A calm lagoon, golden sand, and sunset swims.",
  },
  {
    name: "Ward Village",
    image: "/nb-ward.png",
    time: "6 min",
    mode: "bike",
    note: "Shops, theaters, and waterfront dining.",
  },
  {
    name: "Kaka\u02bbako",
    image: "/gallery-kakaako.png",
    time: "8 min",
    mode: "bike",
    note: "Murals, cafes, and the city's creative heart.",
  },
  {
    name: "Waik\u012bk\u012b",
    image: "/nb-waikiki.png",
    time: "10 min",
    mode: "bike",
    note: "World-famous surf and shoreline.",
  },
  {
    name: "Downtown Honolulu",
    image: "/nb-downtown.png",
    time: "12 min",
    mode: "drive",
    note: "The business district and historic core.",
  },
]

const modeIcon: Record<Mode, typeof Footprints> = {
  walk: Footprints,
  bike: Bike,
  drive: Car,
}

const modeLabel: Record<Mode, string> = {
  walk: "walk",
  bike: "bike",
  drive: "drive",
}

export function Neighborhood() {
  const [active, setActive] = useState(0)
  const current = destinations[active]

  return (
    <section
      id="neighborhood"
      className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32"
    >
      <div className="max-w-2xl">
        <p className="mb-5 font-mono text-xs uppercase tracking-[0.3em] text-primary">
          The Neighborhood
        </p>
        <h2 className="text-balance font-serif text-4xl leading-[1.05] text-foreground sm:text-5xl lg:text-6xl">
          The best of in-town Honolulu, just outside your door.
        </h2>
      </div>

      <div className="mt-14 grid gap-8 lg:grid-cols-5 lg:gap-12">
        {/* Image viewer */}
        <div className="order-1 lg:col-span-3">
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl sm:aspect-[16/10]">
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
                  alt={current.name}
                  fill
                  sizes="(min-width: 1024px) 60vw, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 to-transparent" />
              </motion.div>
            </AnimatePresence>

            <div className="absolute inset-x-0 bottom-0 flex flex-col gap-2 p-6 sm:p-8">
              <h3 className="font-serif text-2xl text-background sm:text-3xl">
                {current.name}
              </h3>
              <p className="max-w-md text-pretty text-sm leading-relaxed text-background/85">
                {current.note}
              </p>
            </div>
          </div>
        </div>

        {/* Destination list */}
        <div className="order-2 flex flex-col lg:col-span-2">
          {destinations.map((d, i) => {
            const Icon = modeIcon[d.mode]
            const isActive = i === active
            return (
              <button
                key={d.name}
                type="button"
                aria-pressed={isActive}
                onMouseEnter={() => setActive(i)}
                onClick={() => setActive(i)}
                className={`group flex items-center justify-between gap-4 border-b border-border py-4 text-left transition-colors first:border-t ${
                  isActive ? "" : "opacity-60 hover:opacity-100"
                }`}
              >
                <span
                  className={`font-serif text-lg transition-colors sm:text-xl ${
                    isActive ? "text-primary" : "text-foreground"
                  }`}
                >
                  {d.name}
                </span>
                <span className="flex shrink-0 items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted-foreground">
                  <Icon className="size-3.5" aria-hidden="true" />
                  {d.time} {modeLabel[d.mode]}
                </span>
              </button>
            )
          })}
          <p className="mt-5 text-xs leading-relaxed text-muted-foreground">
            Estimated travel times from 765 Amana Street. Don Quijote, Walmart,
            grocery, pharmacies, and TheBus stops are all within a short walk.
          </p>
        </div>
      </div>
    </section>
  )
}
