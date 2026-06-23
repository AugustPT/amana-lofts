"use client"

import { MotionConfig } from "framer-motion"

// reducedMotion="user" makes every framer-motion animation in the tree honor the
// OS-level "reduce motion" setting (transforms/opacity are skipped automatically).
export function Providers({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>
}
