"use client"

import Image from "next/image"
import { motion } from "framer-motion"

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] items-end overflow-hidden"
    >
      <Image
        src="/hero-lifestyle.png"
        alt="Ala Moana Beach Park and the Honolulu skyline at golden hour"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/15" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/55 to-transparent" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-24 lg:px-10 lg:pb-28">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-6 font-mono text-xs uppercase tracking-[0.35em] text-white"
        >
          80% AMI Affordable Rental Housing &middot; 765 Amana Street
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
          className="max-w-4xl text-balance font-serif text-5xl leading-[1.02] text-white drop-shadow-[0_2px_20px_rgba(0,0,0,0.45)] sm:text-7xl lg:text-8xl"
        >
          Affordable homes in the heart of Honolulu.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.18 }}
          className="mt-7 max-w-xl text-pretty text-lg leading-relaxed text-white/90 sm:text-xl"
        >
          64 studio, one-, and two-bedroom homes near Ala Moana, reserved for
          income-qualified households.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.28 }}
          className="mt-10 flex flex-col gap-3 sm:flex-row"
        >
          <a
            href="#eligibility"
            className="inline-flex items-center justify-center rounded-full bg-white px-8 py-4 font-mono text-xs uppercase tracking-widest text-neutral-900 transition-transform hover:scale-[1.02]"
          >
            Check If You May Qualify
          </a>
          <a
            href="#residences"
            className="inline-flex items-center justify-center rounded-full border border-white/60 px-8 py-4 font-mono text-xs uppercase tracking-widest text-white backdrop-blur-sm transition-colors hover:bg-white/10"
          >
            See the homes
          </a>
        </motion.div>
      </div>
    </section>
  )
}
