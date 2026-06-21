export type EligibilityQuestion = {
  id: string
  label: string
  detail: string
  /** The answer required to remain eligible */
  requiredAnswer: "yes" | "no"
  failMessage: string
}

// Full affordable-housing screening criteria derived from the City & County of
// Honolulu Affordable Housing eligibility requirements. Retained for reference
// and shown as the detailed requirements alongside the quick estimator.
export const eligibilityQuestions: EligibilityQuestion[] = [
  {
    id: "citizenship",
    label: "Are you a U.S. citizen or a resident alien?",
    detail:
      "Applicants must be a citizen of the United States or a qualifying resident alien.",
    requiredAnswer: "yes",
    failMessage:
      "Residency at Amana Lofts requires U.S. citizenship or qualifying resident alien status.",
  },
  {
    id: "age",
    label: "Are you at least eighteen (18) years of age?",
    detail: "All lease holders must be 18 years or older.",
    requiredAnswer: "yes",
    failMessage: "Lease holders must be at least 18 years of age.",
  },
  {
    id: "domicile",
    label:
      "Are you domiciled in the State of Hawaii with the intent to reside here for the full lease term?",
    detail:
      "You must be domiciled in Hawaii and have a bona fide intent to physically reside in the unit for the duration of the lease.",
    requiredAnswer: "yes",
    failMessage:
      "Residency requires a Hawaii domicile and intent to physically reside in the unit for the full lease term.",
  },
  {
    id: "noProperty",
    label:
      "Do you confirm you do not, and will not, own a majority interest in land suitable for dwelling?",
    detail:
      "You must not own — and will not own for the rental period — a majority interest in fee simple or leasehold lands suitable for dwelling purposes.",
    requiredAnswer: "yes",
    failMessage:
      "Applicants may not hold a majority interest in lands suitable for dwelling during the rental period.",
  },
  {
    id: "assetLimit",
    label:
      "Is your total net available household assets within the designated limit for your household size?",
    detail:
      "Total net available household assets must not exceed the unit's designated limit as adjusted by household size.",
    requiredAnswer: "yes",
    failMessage:
      "Net available household assets must not exceed the designated limit for your household size.",
  },
]

/**
 * Maximum qualifying annual gross household income by household size.
 * Source: City & County of Honolulu / HHFDC Honolulu County Income Schedule
 * 2025 — 140% of median income column (the upper eligibility ceiling used by
 * many mixed-income affordable rentals). Final limits vary by specific unit.
 */
export const incomeCeiling: Record<number, number> = {
  1: 148960,
  2: 170240,
  3: 191520,
  4: 212800,
  5: 229880,
  6: 246960,
}

/** A "comfortable" guideline (100% AMI) used to flag a strong fit. */
export const comfortGuideline: Record<number, number> = {
  1: 106400,
  2: 121600,
  3: 136800,
  4: 152000,
  5: 164200,
  6: 176400,
}

/**
 * The full affordable-housing eligibility criteria, shown to applicants the
 * moment they begin the eligibility check. Each must be acknowledged before
 * proceeding to the income estimator.
 */
export const eligibilityCriteria: string[] = [
  "Citizen of the United States or a resident alien.",
  "At least eighteen (18) years of age.",
  "Domiciled in the State of Hawaii and have a bona fide intent to physically reside in the Affordable Housing unit for the duration of the lease agreement.",
  "Total gross household income does not exceed the unit's designated income limit, based on the 2026 AMI chart.",
  "Sufficient gross household income to demonstrate an ability to pay rent and meet any additional criteria established by the City.",
  "Does not own, and will not own for the duration of the rental period, a majority interest in fee simple or leasehold lands suitable for dwelling purposes.",
  "Total net available household assets do not exceed the unit's designated income limit as adjusted by household size.",
]

export const householdOptions = [1, 2, 3, 4, 5, 6] as const

export type IncomeRange = {
  id: string
  label: string
  min: number
  max: number
}

export const incomeRanges: IncomeRange[] = [
  { id: "u50", label: "Under $50,000", min: 0, max: 50000 },
  { id: "50-75", label: "$50,000 – $75,000", min: 50000, max: 75000 },
  { id: "75-100", label: "$75,000 – $100,000", min: 75000, max: 100000 },
  { id: "100-130", label: "$100,000 – $130,000", min: 100000, max: 130000 },
  { id: "130-160", label: "$130,000 – $160,000", min: 130000, max: 160000 },
  { id: "160-200", label: "$160,000 – $200,000", min: 160000, max: 200000 },
  { id: "o200", label: "Over $200,000", min: 200000, max: Infinity },
]

export type EligibilityResult = "eligible" | "borderline" | "over"

export function assessEligibility(
  householdSize: number,
  rangeId: string,
): { result: EligibilityResult; ceiling: number } {
  const ceiling = incomeCeiling[householdSize] ?? incomeCeiling[6]
  const range = incomeRanges.find((r) => r.id === rangeId)
  if (!range) return { result: "borderline", ceiling }

  if (range.max <= ceiling) return { result: "eligible", ceiling }
  if (range.min >= ceiling) return { result: "over", ceiling }
  return { result: "borderline", ceiling }
}

export function formatUsd(value: number) {
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  })
}
