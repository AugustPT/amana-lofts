import { NextResponse } from 'next/server'
import { assessEligibility, incomeRanges, type Outcome } from '@/lib/eligibility'

export const dynamic = 'force-dynamic'

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/

// Amana Lofts eligibility submissions are forwarded to Codex Mail, which stores the
// lead, emails the AREA leasing team the outcome-specific alert, and surfaces it in
// the dashboard. The outcome is recomputed here server-side (not trusted from the
// client) so the routing can't be spoofed.
export async function POST(req: Request) {
  let body: Record<string, unknown> = {}
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'invalid JSON' }, { status: 400 })
  }

  // Honeypot — a filled hidden field means a bot.
  if (String(body.company_website || '').trim()) {
    return NextResponse.json({ ok: true, outcome: 'qualified', skipped: 'bot' })
  }

  const name = String(body.name || '').trim()
  const email = String(body.email || '')
    .trim()
    .toLowerCase()
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: 'A valid email is required.' }, { status: 400 })
  }

  const household = Number(body.household) || 1
  const rangeId = String(body.rangeId || '')
  const { outcome, ceiling } = assessEligibility(household, rangeId)
  const incomeRange = incomeRanges.find((r) => r.id === rangeId)?.label || ''

  const payload = {
    name,
    email,
    phone: String(body.phone || '').trim(),
    outcome: outcome as Outcome,
    householdSize: household,
    incomeRange,
    ceiling,
    moveInTiming: String(body.timing || '').trim(),
    desiredUnit: String(body.unit || '').trim(),
  }

  const codexUrl = process.env.CODEX_MAIL_URL
  if (!codexUrl) {
    // Misconfiguration — surface it rather than silently dropping the lead.
    console.error('CODEX_MAIL_URL is not set — lead not delivered:', payload.email)
    return NextResponse.json(
      { error: 'Lead routing is not configured. Please contact the team.' },
      { status: 500 },
    )
  }

  try {
    const res = await fetch(`${codexUrl.replace(/\/$/, '')}/api/leads/area-amana`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(process.env.CODEX_MAIL_PROJECT_SECRET
          ? { 'x-am-secret': process.env.CODEX_MAIL_PROJECT_SECRET }
          : {}),
      },
      body: JSON.stringify(payload),
    })
    if (!res.ok) {
      const detail = await res.text().catch(() => '')
      console.error('Codex Mail rejected lead:', res.status, detail.slice(0, 300))
      return NextResponse.json({ error: 'Could not submit right now.' }, { status: 502 })
    }
  } catch (e) {
    console.error('Codex Mail unreachable:', (e as Error).message)
    return NextResponse.json({ error: 'Could not submit right now.' }, { status: 502 })
  }

  // Return the outcome so the result screen can route the applicant honestly.
  return NextResponse.json({ ok: true, outcome })
}
