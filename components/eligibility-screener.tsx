"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Check, ChevronLeft, ChevronRight, Loader2 } from "lucide-react"
import {
  assessEligibility,
  householdOptions,
  incomeRanges,
  moveInOptions,
  unitOptions,
  eligibilityCriteria,
  formatUsd,
  type Outcome,
} from "@/lib/eligibility"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const stepLabels = ["Household", "Income", "Timing", "Requirements", "Your details"]

const resultCopy: Record<
  Outcome,
  { badge: string; title: string; body: string }
> = {
  qualified: {
    badge: "You may be a fit",
    title: "You may be a fit for Amana Lofts.",
    body: "Based on your answers, your household may be within the income range for these homes. This is an estimate, not an approval — final eligibility is confirmed by the AREA leasing team.",
  },
  under: {
    badge: "We'll be in touch",
    title: "Thanks — we've got your information.",
    body: "Based on your answers, your income may be below the minimum needed to demonstrate ability to pay rent. Requirements vary by home, and the AREA team will follow up to confirm whether Amana Lofts or another option is a fit.",
  },
  over: {
    badge: "Added to future opportunities",
    title: "This may be above the income limit — let's stay in touch.",
    body: "Based on your answers, your household income may be above the 80% AMI limit for Amana Lofts. We've added you to AREA's future-opportunities list and they'll reach out if a different home or program fits.",
  },
}

const transition = { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const }

export function EligibilityScreener() {
  const [step, setStep] = useState(0)
  const [household, setHousehold] = useState<number | null>(null)
  const [rangeId, setRangeId] = useState<string | null>(null)
  const [timing, setTiming] = useState<string | null>(null)
  const [ack, setAck] = useState(false)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [unit, setUnit] = useState("")
  const [marketing, setMarketing] = useState(false)
  const [honeypot, setHoneypot] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState("")
  const [result, setResult] = useState<Outcome | null>(null)

  const assessment =
    household && rangeId ? assessEligibility(household, rangeId) : null

  function reset() {
    setStep(0)
    setHousehold(null)
    setRangeId(null)
    setTiming(null)
    setAck(false)
    setName("")
    setEmail("")
    setPhone("")
    setUnit("")
    setMarketing(false)
    setError("")
    setResult(null)
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    setError("")
    try {
      const res = await fetch("/api/screener", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          unit,
          household,
          rangeId,
          timing,
          acknowledged: ack,
          acknowledgedAt: new Date().toISOString(),
          marketingConsent: marketing,
          company_website: honeypot,
        }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        setError(data.error || "Something went wrong. Please try again.")
        setSubmitting(false)
        return
      }
      setResult((data.outcome as Outcome) || assessment?.outcome || "qualified")
      setStep(5)
    } catch {
      setError("Network error — please check your connection and try again.")
    }
    setSubmitting(false)
  }

  return (
    <div className="mx-auto w-full max-w-2xl">
      {/* Progress */}
      <div
        className="mb-8 flex items-center justify-center gap-2 sm:gap-3"
        role="group"
        aria-label="Application progress"
      >
        {stepLabels.map((label, i) => (
          <div key={label} className="flex items-center gap-2 sm:gap-3">
            <div className="flex items-center gap-2">
              <span
                aria-current={i === step ? "step" : undefined}
                aria-label={`Step ${i + 1} of ${stepLabels.length}: ${label}`}
                className={`flex size-6 items-center justify-center rounded-full font-mono text-[11px] transition-colors ${
                  i <= step
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-muted-foreground"
                }`}
              >
                {i + 1}
              </span>
              <span
                className={`hidden font-mono text-xs uppercase tracking-widest transition-colors sm:inline ${
                  i <= step ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                {label}
              </span>
            </div>
            {i < stepLabels.length - 1 && <span className="h-px w-4 bg-border sm:w-6" />}
          </div>
        ))}
      </div>

      <div className="rounded-3xl bg-card p-6 shadow-sm sm:p-10">
        <AnimatePresence mode="wait">
          {/* Step 1 — Household size */}
          {step === 0 && (
            <motion.div key="household" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={transition}>
              <h3 className="text-balance font-serif text-2xl leading-tight text-foreground sm:text-3xl">
                How many people will live in the home?
              </h3>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                Include everyone who will live in the residence.
              </p>
              <div
                className="mt-8 grid grid-cols-3 gap-3 sm:grid-cols-6"
                role="group"
                aria-label="Household size"
              >
                {householdOptions.map((n) => (
                  <button
                    key={n}
                    type="button"
                    aria-pressed={household === n}
                    aria-label={`${n === 6 ? "6 or more" : n} ${n === 1 ? "person" : "people"}`}
                    onClick={() => {
                      setHousehold(n)
                      setStep(1)
                    }}
                    className={`flex h-16 items-center justify-center rounded-2xl font-serif text-2xl transition-colors ${
                      household === n
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-foreground hover:bg-accent hover:text-accent-foreground"
                    }`}
                  >
                    {n === 6 ? "6+" : n}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 2 — Income range */}
          {step === 1 && (
            <motion.div key="income" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={transition}>
              <h3 className="text-balance font-serif text-2xl leading-tight text-foreground sm:text-3xl">
                What is your total household income?
              </h3>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                Combined annual income for everyone in the household, before taxes.
              </p>
              <div
                className="mt-8 flex flex-col gap-2.5"
                role="group"
                aria-label="Total household income"
              >
                {incomeRanges.map((r) => (
                  <button
                    key={r.id}
                    type="button"
                    aria-pressed={rangeId === r.id}
                    onClick={() => {
                      setRangeId(r.id)
                      setStep(2)
                    }}
                    className={`flex items-center justify-between rounded-2xl px-5 py-4 text-left transition-colors ${
                      rangeId === r.id
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-foreground hover:bg-accent hover:text-accent-foreground"
                    }`}
                  >
                    <span className="font-medium">{r.label}</span>
                    <ChevronRight className="size-4 opacity-60" />
                  </button>
                ))}
              </div>
              <BackButton onClick={() => setStep(0)} />
            </motion.div>
          )}

          {/* Step 3 — Move-in timing */}
          {step === 2 && (
            <motion.div key="timing" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={transition}>
              <h3 className="text-balance font-serif text-2xl leading-tight text-foreground sm:text-3xl">
                When are you hoping to move in?
              </h3>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                This helps the leasing team prioritize and follow up.
              </p>
              <div
                className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2"
                role="group"
                aria-label="Move-in timing"
              >
                {moveInOptions.map((t) => (
                  <button
                    key={t}
                    type="button"
                    aria-pressed={timing === t}
                    onClick={() => {
                      setTiming(t)
                      setStep(3)
                    }}
                    className={`flex h-14 items-center justify-center rounded-2xl font-medium transition-colors ${
                      timing === t
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-foreground hover:bg-accent hover:text-accent-foreground"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
              <BackButton onClick={() => setStep(1)} />
            </motion.div>
          )}

          {/* Step 4 — Requirements acknowledgement */}
          {step === 3 && (
            <motion.div key="requirements" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={transition}>
              <h3 className="text-balance font-serif text-2xl leading-tight text-foreground sm:text-3xl">
                A few things to know.
              </h3>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                Amana Lofts is an affordable rental community. Residents generally meet
                these requirements — the AREA team confirms the details with you.
              </p>
              <ul className="mt-6 flex flex-col gap-3">
                {eligibilityCriteria.map((c) => (
                  <li key={c} className="flex items-start gap-3">
                    <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <Check className="size-3 text-primary" />
                    </span>
                    <span className="text-sm leading-relaxed text-muted-foreground">{c}</span>
                  </li>
                ))}
              </ul>
              <label className="mt-7 flex cursor-pointer items-start gap-3 rounded-2xl bg-secondary p-4">
                <input
                  type="checkbox"
                  checked={ack}
                  onChange={(e) => setAck(e.target.checked)}
                  className="mt-0.5 size-5 shrink-0 accent-[var(--primary)]"
                />
                <span className="text-sm leading-relaxed text-foreground">
                  I've read these and want to continue. I understand this is not an
                  eligibility decision.
                </span>
              </label>
              <div className="mt-7">
                <Button
                  onClick={() => setStep(4)}
                  disabled={!ack}
                  size="lg"
                  className="w-full rounded-full sm:w-auto"
                >
                  Continue
                  <ChevronRight className="size-4" />
                </Button>
              </div>
              <BackButton onClick={() => setStep(2)} />
            </motion.div>
          )}

          {/* Step 5 — Contact details + submit */}
          {step === 4 && (
            <motion.div key="contact" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={transition}>
              <h3 className="text-balance font-serif text-2xl leading-tight text-foreground sm:text-3xl">
                Where can the team reach you?
              </h3>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                We'll share your details with the AREA leasing team so they can follow
                up. Your answers stay confidential.
              </p>
              <form className="mt-7 flex flex-col gap-5" onSubmit={submit}>
                {/* Honeypot — hidden from humans */}
                <input
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  className="hidden"
                  aria-hidden="true"
                />
                <div className="flex flex-col gap-2">
                  <Label htmlFor="name">Full name</Label>
                  <Input id="name" required value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" className="bg-background" />
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@email.com" className="bg-background" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" type="tel" required value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="(808) 000-0000" className="bg-background" />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="unit">Desired residence</Label>
                  <select
                    id="unit"
                    required
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                    className="h-10 rounded-md border border-input bg-background px-3 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <option value="" disabled>
                      Select a residence
                    </option>
                    {unitOptions.map((u) => (
                      <option key={u} value={u}>
                        {u}
                      </option>
                    ))}
                  </select>
                </div>

                <label className="flex cursor-pointer items-start gap-3">
                  <input
                    type="checkbox"
                    checked={marketing}
                    onChange={(e) => setMarketing(e.target.checked)}
                    className="mt-0.5 size-5 shrink-0 accent-[var(--primary)]"
                  />
                  <span className="text-sm leading-relaxed text-muted-foreground">
                    Keep me updated about Amana Lofts and similar opportunities by email.
                    Optional — you can unsubscribe anytime.
                  </span>
                </label>

                {error && (
                  <p
                    role="alert"
                    className="rounded-xl bg-destructive/10 px-4 py-3 text-sm text-destructive"
                  >
                    {error}
                  </p>
                )}

                <Button type="submit" size="lg" disabled={submitting} className="mt-1 rounded-full">
                  {submitting ? (
                    <>
                      <Loader2 className="size-4 animate-spin" /> Submitting…
                    </>
                  ) : (
                    <>
                      See my result <ChevronRight className="size-4" />
                    </>
                  )}
                </Button>
                <p className="text-center text-xs leading-relaxed text-muted-foreground">
                  This is a preliminary estimate, not an eligibility determination. Final
                  eligibility is confirmed by AREA through income verification. Equal
                  Housing Opportunity.
                </p>
              </form>
              <BackButton onClick={() => setStep(3)} />
            </motion.div>
          )}

          {/* Step 6 — Result */}
          {step === 5 && result && assessment && (
            <motion.div key="result" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={transition}>
              <div className="py-2 text-center" role="status" aria-live="polite" aria-atomic="true">
                <div className="mx-auto mb-6 flex size-14 items-center justify-center rounded-full bg-primary/10">
                  <Check className="size-6 text-primary" />
                </div>
                <p className="font-mono text-xs uppercase tracking-widest text-primary">
                  {resultCopy[result].badge}
                </p>
                <h3 className="mt-3 text-balance font-serif text-2xl leading-tight text-foreground sm:text-3xl">
                  {resultCopy[result].title}
                </h3>
                <p className="mx-auto mt-4 max-w-md leading-relaxed text-muted-foreground">
                  {resultCopy[result].body}
                </p>
                <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
                  For a household of {household === 6 ? "6 or more" : household}, the 80%
                  AMI income limit is generally up to{" "}
                  <span className="text-foreground">{formatUsd(assessment.ceiling)}</span>{" "}
                  per year. Final limits vary by residence and are confirmed through
                  income verification.
                </p>
                <Button variant="ghost" onClick={reset} className="mt-8 rounded-full">
                  Start over
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="mt-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
    >
      <ChevronLeft className="size-4" /> Back
    </button>
  )
}
