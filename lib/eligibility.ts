// Eligibility logic for Amana Lofts — an 80% AMI affordable rental community.
//
// IMPORTANT: These figures drive what an applicant is told. They must be confirmed
// with AREA / HHFDC for the exact program year and tier before going live. They are
// an ESTIMATE tool only — never a determination. Final eligibility is verified by the
// AREA leasing team through income and asset documentation.

export type Outcome = 'qualified' | 'under' | 'over'

/**
 * Maximum qualifying gross annual household income — 80% of Area Median Income,
 * Honolulu County. Figures: HUD FY2024 Urban Honolulu 80% (Low) income limits.
 * VERIFY the current-year schedule + program tier with AREA / HHFDC before launch.
 */
export const amiCeiling80: Record<number, number> = {
  1: 76650,
  2: 87600,
  3: 98550,
  4: 109450,
  5: 118250,
  6: 127000,
}

/**
 * Minimum gross annual income to demonstrate the ability to pay rent.
 * PLACEHOLDER — derive from the property's actual rents (commonly ~2.5–3× annual
 * rent). VERIFY with AREA. Used only to gently flag "income may be below the
 * minimum"; it is never a hard rejection.
 */
export const minIncome: Record<number, number> = {
  1: 28000,
  2: 32000,
  3: 36000,
  4: 40000,
  5: 44000,
  6: 48000,
}

export const householdOptions = [1, 2, 3, 4, 5, 6] as const

export type IncomeRange = {
  id: string
  label: string
  min: number
  max: number
}

export const incomeRanges: IncomeRange[] = [
  { id: 'u25', label: 'Under $25,000', min: 0, max: 25000 },
  { id: '25-40', label: '$25,000 – $40,000', min: 25000, max: 40000 },
  { id: '40-60', label: '$40,000 – $60,000', min: 40000, max: 60000 },
  { id: '60-80', label: '$60,000 – $80,000', min: 60000, max: 80000 },
  { id: '80-100', label: '$80,000 – $100,000', min: 80000, max: 100000 },
  { id: '100-120', label: '$100,000 – $120,000', min: 100000, max: 120000 },
  { id: 'o120', label: 'Over $120,000', min: 120000, max: Infinity },
]

export const moveInOptions = ['ASAP', '1–3 months', '3–6 months', 'Just exploring'] as const

export const unitOptions = ['Studio', 'One Bedroom', 'Two Bedroom'] as const

// The affordable-housing requirements an applicant acknowledges. Shown as a single
// grouped step — never a hard knockout (the team confirms the details).
export const eligibilityCriteria: string[] = [
  'At least 18 years of age.',
  'A U.S. citizen or a qualifying resident alien.',
  'Domiciled in Hawaiʻi, with the intent to live in the home for the full lease term.',
  'Total gross household income within the home’s 80% AMI limit (estimated below).',
  'Do not own a majority interest in land suitable for dwelling during the rental period.',
  'Household assets within the program’s designated limit.',
]

export interface Assessment {
  outcome: Outcome
  ceiling: number
  floor: number
}

export function assessEligibility(householdSize: number, rangeId: string): Assessment {
  const ceiling = amiCeiling80[householdSize] ?? amiCeiling80[6]
  const floor = minIncome[householdSize] ?? minIncome[6]
  const range = incomeRanges.find((r) => r.id === rangeId)
  if (!range) return { outcome: 'qualified', ceiling, floor }

  // Entirely above the 80% AMI ceiling → likely over income.
  if (range.min >= ceiling) return { outcome: 'over', ceiling, floor }
  // Entirely below the minimum needed to demonstrate ability to pay → may be under.
  if (range.max <= floor) return { outcome: 'under', ceiling, floor }
  // Otherwise within range (including bands that straddle a limit — the team confirms).
  return { outcome: 'qualified', ceiling, floor }
}

export function formatUsd(value: number) {
  if (!isFinite(value)) return '—'
  return value.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  })
}
