import { NextResponse } from 'next/server'
import { assessEligibility, incomeRanges, type Outcome } from '@/lib/eligibility'

export const dynamic = 'force-dynamic'

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/

// Amana Lofts eligibility submissions are forwarded to Codex Mail, which stores the
// lead, emails the AREA leasing team the outcome-specific alert, and surfaces it in
// the dashboard. The outcome is recomputed here server-side (not trusted from the
// client) so the routing can't be spoofed.
export async function POST(req: Request) {
  // Only accept submissions from this site's own form. This relay forwards with the
  // trusted Codex Mail secret, so reject cross-origin callers outright.
  const host = req.headers.get('host') || ''
  const origin = req.headers.get('origin')
  if (origin && host) {
    try {
      if (new URL(origin).host !== host) {
        return NextResponse.json({ error: 'forbidden' }, { status: 403 })
      }
    } catch {
      return NextResponse.json({ error: 'forbidden' }, { status: 403 })
    }
  }

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

  // Cap every field so the relay can't be used to push oversized payloads downstream.
  const cap = (v: unknown, n: number) => String(v || '').trim().slice(0, n)
  const name = cap(body.name, 120)
  const email = cap(body.email, 200).toLowerCase()
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: 'A valid email is required.' }, { status: 400 })
  }

  const household = Math.min(6, Math.max(1, Number(body.household) || 1))
  const rangeId = cap(body.rangeId, 40)
  const { outcome, ceiling } = assessEligibility(household, rangeId)
  const incomeRange = incomeRanges.find((r) => r.id === rangeId)?.label || ''

  const payload = {
    name,
    email,
    phone: cap(body.phone, 40),
    outcome: outcome as Outcome,
    householdSize: household,
    incomeRange,
    ceiling,
    moveInTiming: cap(body.timing, 40),
    desiredUnit: cap(body.unit, 60),
    extra: {
      acknowledged: body.acknowledged === true,
      acknowledgedAt: cap(body.acknowledgedAt, 40),
    },
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
