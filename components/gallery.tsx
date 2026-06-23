"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { X } from "lucide-react"
import { Reveal } from "@/components/reveal"

const images = [
  { src: "/amana-building.png", alt: "Amana Lofts building exterior", span: "row-span-2" },
  { src: "/neighborhood-alamoana.png", alt: "Ala Moana district and beach park", span: "" },
  { src: "/unit-one-bed.png", alt: "One-bedroom loft interior", span: "" },
  { src: "/gallery-kakaako.png", alt: "Kaka\u02bbako neighborhood street art", span: "row-span-2" },
  { src: "/unit-studio.png", alt: "Studio loft interior", span: "" },
  { src: "/gallery-lifestyle.png", alt: "Residents biking on a Honolulu street", span: "" },
  { src: "/unit-two-bed.png", alt: "Two-bedroom loft living area", span: "" },
  { src: "/amana-hero.png", alt: "Amana Lofts at golden hour", span: "" },
]

export function Gallery() {
  const [active, setActive] = useState<number | null>(null)
  const closeRef = useRef<HTMLButtonElement>(null)

  // When the lightbox opens: move focus into it, close on Escape, trap Tab on the
  // close button (the only focusable control), and restore focus to the thumbnail
  // that opened it when it closes.
  useEffect(() => {
    if (active === null) return
    const prev = document.activeElement as HTMLElement | null
    closeRef.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null)
      else if (e.key === "Tab") {
        e.preventDefault()
        closeRef.current?.focus()
      }
    }
    document.addEventListener("keydown", onKey)
    return () => {
      document.removeEventListener("keydown", onKey)
      prev?.focus()
    }
  }, [active])

  return (
    <section id="gallery" className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
      <div className="max-w-2xl">
        <Reveal>
          <p className="mb-6 font-mono text-xs uppercase tracking-[0.3em] text-primary">
            Gallery
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="text-balance font-serif text-3xl leading-tight text-foreground sm:text-4xl lg:text-5xl">
            A glimpse of life at Amana Lofts.
          </h2>
        </Reveal>
      </div>

      <div className="mt-14 grid auto-rows-[180px] grid-cols-2 gap-4 sm:auto-rows-[220px] lg:grid-cols-4">
        {images.map((img, i) => (
          <Reveal
            key={img.src}
            delay={(i % 4) * 0.05}
            className={img.span}
          >
            <button
              type="button"
              onClick={() => setActive(i)}
              className="group relative h-full w-full overflow-hidden rounded-2xl"
            >
              <Image
                src={img.src || "/placeholder.svg"}
                alt={img.alt}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <span className="absolute inset-0 bg-foreground/0 transition-colors duration-300 group-hover:bg-foreground/15" />
            </button>
          </Reveal>
        ))}
      </div>

      {active !== null && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-foreground/90 p-6"
          onClick={() => setActive(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Image preview"
        >
          <button
            ref={closeRef}
            type="button"
            onClick={() => setActive(null)}
            className="absolute right-6 top-6 flex size-10 items-center justify-center rounded-full bg-background/10 text-background transition-colors hover:bg-background/20"
            aria-label="Close preview"
          >
            <X className="size-5" />
          </button>
          <div
            className="relative h-[70vh] w-full max-w-5xl overflow-hidden rounded-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[active].src || "/placeholder.svg"}
              alt={images[active].alt}
              fill
              sizes="(min-width: 1024px) 1024px, 100vw"
              className="object-contain"
            />
          </div>
        </div>
      )}
    </section>
  )
}
