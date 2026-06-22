# Amana Lofts — AREA Presentation Audit

**Prepared for:** Associated Real Estate Advisors (AREA) — John, Joanna, Kelly
**Subject:** Amana Lofts funnel site (`luxury-redesign` branch)
**Reviewed against:** AREA's real need — *clearly explain the property, pre-qualify the right applicants, and route them to the correct next step without overwhelming the team.*
**Method:** Full codebase read (13 source files) + 5 independent expert reviews (funnel strategist, affordable-housing/AMI domain, mobile-first UX, AREA-principal pitch lens, technical data-flow) + adversarial synthesis.

---

## 1. Executive verdict

### 🟥 Not ready yet

The site looks finished. It is not. It is a polished **luxury-apartment shell** in which the three jobs AREA actually asked for all fail at the load-bearing point — not "incomplete," **broken**.

---

## 2. One-sentence diagnosis

This website is a beautiful marketing site that does **not** function as a lead-control system: it captures zero leads, delivers nothing to AREA, never says "80% AMI," and its one working filter is mis-tuned to **140% AMI on an 80% AMI property**, so it would flood AREA with exactly the unqualified inquiries they want to stop.

---

## 3. What the site currently does well

These are real strengths — the fixes are wiring, numbers, and identity, **not a redesign**.

- **The funnel architecture is correct.** A 4-step screener (eligibility → household → income → result/contact) is the right "qualify-before-capture" shape, and it's genuinely thumb-friendly: 64px tap targets, income *ranges* instead of a dollar field, a progress tracker, and Back affordances on every step.
- **Real domain homework.** The knockout questions are grounded in actual City & County of Honolulu / HHFDC affordable-housing criteria (citizenship/resident-alien, 18+, Hawaiʻi domicile, no majority interest in dwelling-suitable land, net-asset limit) — not invented fields. (`lib/eligibility.ts`)
- **Compliance instinct exists.** An Equal Housing Opportunity (EHO) badge + footer disclaimer, plus a "final limits … confirmed through income verification" caveat on the result screen. The legal scaffolding is present — it's just attached to wrong numbers and over-claiming copy.
- **Credible, local polish.** Real address (765 Amana Street), real geography (Ala Moana, Kakaʻako, Waikīkī), the 64-unit adaptive-reuse story, tasteful typography. Kelly would not be embarrassed by the *look*.
- **Clean, centralized code.** `lib/eligibility.ts` is typed and centralized (the income fix is a one-table edit), and `app/api/screener/route.ts` already has try/catch + env-driven structure, so making capture real is a small set of targeted edits.

---

## 4. What is missing or weak

Direct and specific, verified by code inspection:

1. **Lead capture is an illusion.** The result form's `onSubmit` only runs `setSubmitted(true)` — there is **no `fetch`/POST**. A repo-wide search confirms `/api/screener` is never called by any component. The "Thank you — you've been added to the interest list" screen is pure client state. (`components/eligibility-screener.tsx:340-343`)
2. **The form fields can't even produce a lead.** Name/email/phone/unit are uncontrolled inputs with no `name` attribute and no `onChange` — so even if a POST were added, the payload would be empty. (`components/eligibility-screener.tsx:346-391`)
3. **No destination for a lead.** The orphaned API route posts to a **placeholder webhook** (`https://api.kindcodex.com/v1/webhook/amana-lofts`, payload `kind: "codex"`) and, when the env var is unset (current state), just `console.log`s "Mocking success." No database, no email, **no AREA inbox**. (`app/api/screener/route.ts`)
4. **Wrong eligibility math.** `incomeCeiling` is hardcoded to the **140% AMI column** (1-person `$148,960`, 4-person `$212,800`) — explicitly commented as such — on an **80% AMI** property. That's roughly double. The tool tells a 4-person household earning $160k–$200k "Good news — you look eligible." (`lib/eligibility.ts:62-75, 123-134`)
5. **"80% AMI" appears nowhere.** Neither the defining phrase nor a plain-language explanation exists anywhere in the codebase. The hero ("Live closer to everything") reads as market-rate luxury; "AMI" is used only as bare jargon.
6. **AREA is invisible.** "AREA" / "Associated Real Estate Advisors" / John / Joanna / Kelly appear **nowhere**. Only the developer "JL Capital" is credited. The people being pitched cannot find their own firm on their own site.
7. **Result copy over-claims.** "You likely qualify" / "Good news — you look eligible" reads as a *determination*, not an estimate — fair-housing-sensitive and likely to anger applicants when verification disagrees.
8. **No qualification-based routing.** Eligible, borderline, and over-income results all render the *same* contact form and *same* "Join the interest list" CTA. List membership therefore can't mean "qualified" — AREA still sorts everyone by hand.
9. **No move-in timing question.** No urgency signal, so even a captured lead can't be triaged hot vs. cold.
10. **Dead ends & template tells.** A failed knockout question offers only "Review my answers / Start over" (no onward step for an ineligible person). Footer Instagram/Facebook links are `href="#"`. The `kind: codex` boilerplate is obvious unfinished AI scaffolding.
11. **Competing CTAs.** Hero shows co-equal "Join Interest List" and "Check Eligibility"; nav + footer push "Join Interest List" → `#contact`, a path that lands users at the lead form without passing the gate (impact is muted because `#contact` is nested inside the screener section).

---

## 5. Does it satisfy the core need?

> "Does this website clearly explain the property, pre-qualify the right applicants/leads, and route them to the correct next step without overwhelming the AREA team?"

### Answer: **No.**

Not "Partially" — **No** — because each of the three jobs is broken at the point that matters:

- **Explain the property → fails.** It never states "80% AMI" or "income-restricted" in plain language. A stressed applicant can't self-identify in 5 seconds; the hero reads as luxury.
- **Pre-qualify → fails (and inverts).** The 140%-AMI ceiling green-lights nearly everyone, including high earners. This *manufactures* unqualified leads — the opposite of lead-control.
- **Route to AREA → fails.** The form POSTs nowhere; the route targets a fake service and mocks success. AREA receives nothing, and AREA isn't even named as the recipient.

The architecture and polish are genuinely good, so this is recoverable quickly. But **as it stands the demo collapses the moment John, Joanna, or Kelly submit a test lead and ask "where did my info go?"**

---

## 6. Highest-leverage fixes

The smallest set of changes that makes it presentation-ready. Do the **P0s** before showing AREA anything.

### P0 — Must fix before presenting
- **P0-1 — Make lead capture real, end-to-end.**
  1. Add controlled state for name/email/phone/unit in `eligibility-screener.tsx`.
  2. Make `onSubmit` async and POST the **full** payload (`name, email, phone, unit, household, incomeRangeId, result, ceiling, moveInTiming, submittedAt`) to `/api/screener`; only show the success screen on a 2xx, show an error/retry state otherwise.
  3. Replace the `kindcodex` mock in `route.ts` with a **real AREA destination** — minimum viable is an email summary to the AREA team (Resend), ideally **plus** a Neon Postgres insert (`POSTGRES_URL` is already provisioned). **Confirm the recipient with AREA before the demo.**
- **P0-2 — Fix the eligibility math.** Replace the 140% `incomeCeiling` table with the **official 80% AMI Honolulu County limits** by household size (current HHFDC/HUD schedule), re-bracket `incomeRanges` around the real 80% line. **Do not guess the dollars in code — pull them from the official chart and confirm the program tier with AREA.**
- **P0-3 — State what this is.** Surface "**80% AMI Affordable Rental Housing**" with a one-line plain-language explainer + concrete dollar example near the hero. (Lead with the dollar figure, not the acronym.)

### P1 — Should fix if time
- **P1-1 — Brand AREA in.** Add "Leasing & inquiries managed by Associated Real Estate Advisors (AREA)" with a real broker contact (phone/email, license # if appropriate) in the footer/contact block, and name AREA as the lead recipient. *(Most damaging gap for the pitch room; P1 only because it breaks no working machinery — it's a content edit.)*
- **P1-2 — Soften the result copy** so it never asserts a determination (see §9), with the verification caveat visible *on the result screen*, not just the footer.
- **P1-3 — Route by outcome.** Branch the result step: eligible/borderline → interest form tagged with the verdict so AREA can sort; over-income → a clearly-*separate* path (e.g., "notify me if a higher-income unit opens" or a referral), **not** the same list. Tag every lead with its assessment result.

### P2 — Nice polish
- **P2-1 — Add a move-in timing question** (ASAP / 1–3 mo / 3–6 mo / just exploring) and include it in the payload.
- **P2-2 — One primary CTA** ("Check if you qualify & join the list") that always starts the screener at step 0; demote the standalone "Join Interest List."
- **P2-3 — Humane dead-end.** Give the unqualified branch one onward step (link to broader Honolulu/HHFDC resources, or a separate "tell me about future opportunities" capture).
- **P2-4 — Remove template tells.** Strip `kind: codex` / `kindcodex.com`; fix or remove the dead Instagram/Facebook links.

---

## 7. Recommended site structure

The cleanest order for a stressed applicant on a phone — every section moves toward clarity or action:

1. **Hero** — name it: 80% AMI affordable rental housing in Honolulu, one primary CTA ("Check if you qualify").
2. **What Amana Lofts Is** — plain-language: affordable, income-restricted, 64 units, 765 Amana St, by JL Capital, **leasing by AREA**.
3. **Who It's For** — "These homes are for households earning at or below 80% of Honolulu's area median income" + a concrete dollar example.
4. **Check If You May Qualify** — the screener (the centerpiece; see §8).
5. **How It Works** — 3 steps: check eligibility → join the list → AREA follows up with application details.
6. **Units / Property Info** — the existing Residences + Amenities + Neighborhood (already strong; keep).
7. **FAQ** — keep the existing eligibility FAQ; add a "What is AMI?" plain-language entry.
8. **Contact / Submit Interest** — handled at the end of the screener; also a direct AREA contact for people who'd rather call.
9. **AREA Team Handoff (behind the scenes)** — every submission emailed/stored to AREA, tagged by eligibility outcome + timing so the team can prioritize.

Keep Gallery, but move it below the functional sections — it's atmosphere, not action.

---

## 8. Recommended eligibility flow

Lead with low-friction questions so people get a fast signal; collect legal acknowledgements as a single grouped step; **capture the contact before the result so no lead is lost**, then deliver an honest, non-binding result.

- **Step 1 — Household size.** "How many people will live in the home?" (1–6+, big tap buttons).
- **Step 2 — Estimated household income.** "Combined annual income for everyone, before taxes" (income *ranges*, bracketed around the real 80% AMI line).
- **Step 3 — Desired move-in timing.** ASAP / 1–3 months / 3–6 months / Just exploring. *(New — gives AREA the triage signal.)*
- **Step 4 — Basic eligibility / residency.** A single grouped confirmation in plain language (18+, U.S. citizen or qualifying resident alien, Hawaiʻi domicile, don't own dwelling-suitable land, assets within limit). Rewrite the double-negative property/asset questions. A "no" → **soft** message + onward option, never a hard rejection.
- **Step 5 — Contact info.** Name, email, phone, desired residence. **On submit: POST + save the lead to AREA immediately** (so the lead is captured regardless of outcome).
- **Step 6 — Result screen.** Honest, non-binding (see copy below), routed by outcome.

> **Result must never approve anyone.** Use: *"You may be a fit based on your answers. Final eligibility must be confirmed by the property/team."*

*(Note on order: capturing contact at Step 5 before the result means AREA receives every lead even if the person abandons at the result. If AREA prefers to show the estimate first, it's a small reordering — but capture-first best serves the lead-control goal.)*

---

## 9. Suggested copy improvements

Concrete replacements. None make a legal eligibility claim.

**Hero kicker (new):**
> `80% AMI Affordable Rental Housing · 765 Amana Street, Honolulu`

**Hero headline:**
> *Current:* "Live closer to everything."
> *Better:* **"Affordable homes in the heart of Honolulu."**

**Hero subheadline:**
> **"Amana Lofts is an 80% AMI affordable rental community — 64 studio, one-, and two-bedroom homes steps from Ala Moana, reserved for income-qualified households. See if you may qualify in about 60 seconds."**

**Primary CTA:**
> **"Check If You May Qualify"**

**Eligibility intro:**
> **"A few quick questions tell you whether Amana Lofts may be a fit — based on household size, income, and a few basic requirements. Your answers stay confidential, and there's no commitment. Final eligibility is confirmed by the AREA leasing team."**

**Result screen — possible fit:**
> Badge: **"Looks like a possible fit"**
> Title: **"You may be a fit based on your answers."**
> Body: **"For a household of {n}, the income guideline for this 80% AMI community is generally up to {limit}/year. This is an estimate, not an approval — final eligibility must be confirmed by the property/team during application."**

**Result screen — likely over income:**
> Title: **"This home may be above your range — but let's stay in touch."**
> Body: **"Based on what you entered, your income may be above the 80% AMI limit for Amana Lofts. Leave your details and AREA can let you know if a different unit or opportunity opens."** *(separate, clearly-labeled list)*

**Disclaimer (visible on the result screen, not just footer):**
> **"This tool provides a preliminary estimate only and does not determine eligibility. Final eligibility is subject to income and asset verification under applicable affordable housing (AMI) guidelines. Equal Housing Opportunity."**

**AREA / team handoff message (success screen):**
> **"Thank you — your information has been sent to the Associated Real Estate Advisors (AREA) leasing team. A member of the AREA team will follow up with application details and next steps. Questions now? Call AREA at [phone]."**

---

## 10. Implementation plan

Practical, mapped to the real files in this codebase. No new framework, no redesign.

### P0 work
- **`components/eligibility-screener.tsx`** *(largest change)*
  - Add `useState` for `name`, `email`, `phone`, `unit` (or one `formData` object); wire `value` + `onChange` + `name` on each input.
  - Replace the `onSubmit` at lines ~338-343 with an `async` handler that builds the payload (contact fields + `household`, `rangeId`, `assessment.result`, `assessment.ceiling`, `moveInTiming`, `submittedAt`) and `await fetch('/api/screener', …)`; gate the success screen on `res.ok`, add an error state.
  - Reorder steps to §8 (household → income → timing → grouped eligibility → contact → result); soften the knockout "fail" state.
  - Soften `resultCopy` (lines ~20-33) per §9.
- **`app/api/screener/route.ts`**
  - Remove the `kindcodex` fallback + `kind: "codex"` framing.
  - Implement a real sink: email summary to the AREA team (Resend) and/or `INSERT` into Neon (`POSTGRES_URL`). Destination(s) via env var; confirm recipient with AREA.
- **`lib/eligibility.ts`**
  - Replace `incomeCeiling` (and `comfortGuideline`) with **official 80% AMI Honolulu County** figures (verify against the current HHFDC/HUD schedule — do not guess). Re-bracket `incomeRanges` around the real 80% line. Add `moveInTiming` options. Update the source comment + the "2026 AMI chart" reference.
- **`components/hero.tsx`**
  - Add the 80% AMI kicker + new headline/subhead (§9); collapse to **one** primary CTA.
- **`components/about.tsx`** — add a plain-language "what 80% AMI means" sentence with a dollar example.

### P1 work
- **`components/site-footer.tsx`** — add AREA branding + real contact; keep EHO; fix/remove dead social links.
- **`components/eligibility-info.tsx`** — add a "What is AMI?" FAQ entry (dollar-example first).
- **`app/layout.tsx`** — update `metadata` title/description to mention affordable / 80% AMI and AREA.
- **Result routing** — branch the result step in `eligibility-screener.tsx` (eligible/borderline vs over-income); tag the lead payload with `result`.

### P2 work
- **`components/site-nav.tsx`** — single CTA aligned with the hero; point "Join Interest List" to the screener start.
- **Move-in timing step** — already covered in `lib/eligibility.ts` + `eligibility-screener.tsx`.
- **Optional team handoff view** — a lightweight admin/export (or just the email summary) so AREA can see/triage leads; can be a fast-follow after the pitch.

### Verify before presenting
- Submit a real test lead end-to-end and confirm it arrives where AREA expects.
- Sanity-check the 80% AMI numbers against the official schedule with AREA.
- Walk the whole flow on an actual phone.

---

### Bottom line
The skeleton AREA wants is already here — a clean, local, qualify-then-capture funnel. It fails today on **three wires**: capture, destination, and the AMI numbers, plus the missing "80% AMI" and AREA identity. Fix the P0s and this stops being a pretty mockup and becomes the **lead-control system** AREA asked for.
