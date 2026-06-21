"use client"

import { motion } from "framer-motion"

const phrases = [
  "Walk to Ala Moana Center.",
  "Bike to Kaka\u02bbako.",
  "Minutes from Waik\u012bk\u012b.",
]

export function StatementBand() {
  return (
    <section className="bg-background py-20 lg:py-28">
      <div className="mx-auto max-w-5xl px-6 text-center lg:px-10">
        <p className="font-serif text-3xl leading-[1.25] text-foreground sm:text-4xl lg:text-5xl">
          {phrases.map((phrase, i) => (
            <motion.span
              key={phrase}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
                delay: i * 0.15,
              }}
              className="mr-2 inline-block"
            >
              <span className={i === phrases.length - 1 ? "text-primary" : ""}>
                {phrase}
              </span>
            </motion.span>
          ))}
        </p>
      </div>
    </section>
  )
}
