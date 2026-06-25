"use client"

import { useEffect, useState } from "react"

const links = [
  { href: "#about", label: "About" },
  { href: "#residences", label: "Residences" },
  { href: "#amenities", label: "Amenities" },
  { href: "#neighborhood", label: "Neighborhood" },
  { href: "#eligibility", label: "Eligibility" },
  { href: "#gallery", label: "Gallery" },
]

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "border-b border-border bg-background/85 backdrop-blur-md"
          : "bg-gradient-to-b from-black/45 to-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        <a
          href="#top"
          className={`font-serif text-xl tracking-tight transition-colors ${
            scrolled ? "text-foreground" : "text-white"
          }`}
        >
          Amana&nbsp;Lofts
        </a>
        <div
          className={`hidden items-center gap-7 font-mono text-xs uppercase tracking-widest lg:flex ${
            scrolled ? "text-muted-foreground" : "text-white/85"
          }`}
        >
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`transition-colors ${
                scrolled ? "hover:text-foreground" : "hover:text-white"
              }`}
            >
              {l.label}
            </a>
          ))}
        </div>
        <a
          href="#eligibility"
          className={`rounded-full px-5 py-2 font-mono text-xs uppercase tracking-widest transition-colors ${
            scrolled
              ? "bg-primary text-primary-foreground hover:bg-primary/90"
              : "border border-white/50 text-white hover:bg-white hover:text-background"
          }`}
        >
          Check Eligibility
        </a>
      </nav>
    </header>
  )
}
