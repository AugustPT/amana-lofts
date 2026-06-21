"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Check, ChevronLeft, ChevronRight, X } from "lucide-react"
import {
  assessEligibility,
  eligibilityQuestions,
  type EligibilityQuestion,
  householdOptions,
  incomeRanges,
  formatUsd,
} from "@/lib/eligibility"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const stepLabels = ["Eligibility", "Household", "Income", "Result"]

const resultCopy = {
  eligible: {
    badge: "You likely qualify",
    title: "Good news — you look eligible.",
  },
  borderline: {
    badge: "Worth confirming",
    title: "You may be close to the limit.",
  },
  over: {
    badge: "May exceed limits",
    title: "Your income may be above the limit.",
  },
} as const

const transition = { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const }

export function EligibilityScreener() {
  const [step, setStep] = useState(0)
  const [quizIndex, setQuizIndex] = useState(0)
  const [quizFailed, setQuizFailed] = useState<EligibilityQuestion | null>(null)
  const [household, setHousehold] = useState<number | null>(null)
  const [rangeId, setRangeId] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)

  const assessment =
    household && rangeId ? assessEligibility(household, rangeId) : null

  const currentQuestion = eligibilityQuestions[quizIndex]

  function answerQuiz(question: EligibilityQuestion, answer: "yes" | "no") {
    if (answer !== question.requiredAnswer) {
      setQuizFailed(question)
      return
    }
    if (quizIndex < eligibilityQuestions.length - 1) {
      setQuizIndex(quizIndex + 1)
    } else {
      setStep(1)
    }
  }

  function restartQuiz() {
    setQuizFailed(null)
    setQuizIndex(0)
  }

  function reset() {
    setStep(0)
    setQuizIndex(0)
    setQuizFailed(null)
    setHousehold(null)
    setRangeId(null)
    setSubmitted(false)
  }

  return (
    <div className="mx-auto w-full max-w-2xl">
      {/* Progress */}
      <div className="mb-8 flex items-center justify-center gap-3">
        {stepLabels.map((label, i) => (
          <div key={label} className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span
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
            {i < stepLabels.length - 1 && (
              <span className="h-px w-6 bg-border" />
            )}
          </div>
        ))}
      </div>

      <div className="rounded-3xl bg-card p-6 shadow-sm sm:p-10">
        <AnimatePresence mode="wait">
          {/* Step 1 — Eligibility quiz */}
          {step === 0 && (
            <motion.div
              key="step-quiz"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={transition}
            >
              {quizFailed ? (
                <div className="py-4 text-center">
                  <div className="mx-auto mb-6 flex size-14 items-center justify-center rounded-full bg-destructive/10">
                    <X className="size-6 text-destructive" />
                  </div>
                  <h3 className="text-balance font-serif text-2xl leading-tight text-foreground sm:text-3xl">
                    This may not be the right fit
                  </h3>
                  <p className="mx-auto mt-4 max-w-md leading-relaxed text-muted-foreground">
                    {quizFailed.failMessage} Based on your answer, you may not meet
                    the affordable housing eligibility requirements for Amana Lofts
                    at this time.
                  </p>
                  <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                    <Button onClick={restartQuiz} className="rounded-full">
                      Review my answers
                    </Button>
                    <Button
                      variant="ghost"
                      onClick={reset}
                      className="rounded-full"
                    >
                      Start over
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between">
                    <p className="font-mono text-xs uppercase tracking-widest text-primary">
                      Question {quizIndex + 1} of {eligibilityQuestions.length}
                    </p>
                    <div className="flex gap-1.5">
                      {eligibilityQuestions.map((q, i) => (
                        <span
                          key={q.id}
                          className={`h-1.5 w-5 rounded-full transition-colors ${
                            i <= quizIndex ? "bg-primary" : "bg-secondary"
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  <h3 className="mt-6 text-balance font-serif text-2xl leading-tight text-foreground sm:text-3xl">
                    {currentQuestion.label}
                  </h3>
                  <p className="mt-4 leading-relaxed text-muted-foreground">
                    {currentQuestion.detail}
                  </p>

                  <div className="mt-8 grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => answerQuiz(currentQuestion, "yes")}
                      className="flex h-16 items-center justify-center rounded-2xl bg-secondary font-medium text-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                    >
                      Yes
                    </button>
                    <button
                      type="button"
                      onClick={() => answerQuiz(currentQuestion, "no")}
                      className="flex h-16 items-center justify-center rounded-2xl bg-secondary font-medium text-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                    >
                      No
                    </button>
                  </div>

                  {quizIndex > 0 && (
                    <button
                      type="button"
                      onClick={() => setQuizIndex(quizIndex - 1)}
                      className="mt-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      <ChevronLeft className="size-4" /> Previous question
                    </button>
                  )}
                </>
              )}
            </motion.div>
          )}

          {/* Step 2 — Household size */}
          {step === 1 && (
            <motion.div
              key="step-household"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={transition}
            >
              <h3 className="text-balance font-serif text-2xl leading-tight text-foreground sm:text-3xl">
                How many people are in your household?
              </h3>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                Include everyone who will live in the residence.
              </p>
              <div className="mt-8 grid grid-cols-3 gap-3 sm:grid-cols-6">
                {householdOptions.map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => {
                      setHousehold(n)
                      setStep(2)
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
              <button
                type="button"
                onClick={() => {
                  setStep(0)
                  restartQuiz()
                }}
                className="mt-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <ChevronLeft className="size-4" /> Back
              </button>
            </motion.div>
          )}

          {/* Step 3 — Income range */}
          {step === 2 && (
            <motion.div
              key="step-income"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={transition}
            >
              <h3 className="text-balance font-serif text-2xl leading-tight text-foreground sm:text-3xl">
                What is your total gross household income?
              </h3>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                Combined annual income for everyone in the household, before taxes.
              </p>
              <div className="mt-8 flex flex-col gap-2.5">
                {incomeRanges.map((r) => (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => {
                      setRangeId(r.id)
                      setStep(3)
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
              <button
                type="button"
                onClick={() => setStep(1)}
                className="mt-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <ChevronLeft className="size-4" /> Back
              </button>
            </motion.div>
          )}

          {/* Step 4 — Result */}
          {step === 3 && assessment && (
            <motion.div
              key="step-result"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={transition}
            >
              {submitted ? (
                <div className="py-6 text-center">
                  <div className="mx-auto mb-6 flex size-14 items-center justify-center rounded-full bg-primary/10">
                    <Check className="size-6 text-primary" />
                  </div>
                  <h3 className="font-serif text-3xl text-foreground">Thank you</h3>
                  <p className="mx-auto mt-4 max-w-md leading-relaxed text-muted-foreground">
                    You&apos;ve been added to the Amana Lofts interest list. Our
                    leasing team will follow up with application details and next
                    steps as residences become available.
                  </p>
                  <Button
                    variant="ghost"
                    onClick={reset}
                    className="mt-8 rounded-full"
                  >
                    Start over
                  </Button>
                </div>
              ) : (
                <>
                  <p className="font-mono text-xs uppercase tracking-widest text-primary">
                    {resultCopy[assessment.result].badge}
                  </p>
                  <h3 className="mt-3 text-balance font-serif text-2xl leading-tight text-foreground sm:text-3xl">
                    {resultCopy[assessment.result].title}
                  </h3>
                  <p className="mt-4 leading-relaxed text-muted-foreground">
                    For a household of {household === 6 ? "6 or more" : household},
                    qualifying income is generally up to{" "}
                    <span className="text-foreground">
                      {formatUsd(assessment.ceiling)}
                    </span>{" "}
                    per year. Final limits vary by residence and are confirmed
                    through income verification.
                  </p>

                  <form
                    className="mt-8 flex flex-col gap-5"
                    onSubmit={(e) => {
                      e.preventDefault()
                      setSubmitted(true)
                    }}
                  >
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="name">Full name</Label>
                      <Input
                        id="name"
                        required
                        placeholder="Your name"
                        className="bg-background"
                      />
                    </div>
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div className="flex flex-col gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          required
                          placeholder="you@email.com"
                          className="bg-background"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          type="tel"
                          required
                          placeholder="(808) 000-0000"
                          className="bg-background"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="unit">Desired residence</Label>
                      <select
                        id="unit"
                        required
                        defaultValue=""
                        className="h-10 rounded-md border border-input bg-background px-3 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      >
                        <option value="" disabled>
                          Select a residence
                        </option>
                        <option value="studio">Studio</option>
                        <option value="one-bedroom">One Bedroom</option>
                        <option value="two-bedroom">Two Bedroom</option>
                      </select>
                    </div>
                    <Button type="submit" size="lg" className="mt-2 rounded-full">
                      Join the interest list
                      <ChevronRight className="size-4" />
                    </Button>
                  </form>

                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="mt-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <ChevronLeft className="size-4" /> Back
                  </button>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
