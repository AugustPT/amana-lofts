import type { Metadata } from "next"
import { LegalPage, LegalSection } from "@/components/legal-page"

export const metadata: Metadata = {
  title: "Privacy Policy — Amana Lofts",
  description: "How Amana Lofts and AREA handle information submitted through the eligibility check.",
  robots: { index: false },
}

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" updated="Draft — not yet published">
      <p>
        This policy explains what information Amana Lofts and Associated Real Estate
        Advisors (AREA) collect through this website&rsquo;s eligibility check, how it is
        used, and the choices you have. <strong>[Placeholder text for review.]</strong>
      </p>

      <LegalSection heading="Information we collect">
        <p>
          When you use the eligibility check, you may provide your name, email address,
          phone number, household size, income range, desired residence, and move-in
          timing. We also collect basic, privacy-friendly analytics about site usage.
        </p>
      </LegalSection>

      <LegalSection heading="How we use your information">
        <p>
          We use it to give you a preliminary, self-reported estimate, to route your
          inquiry to the AREA leasing team, and so the team can follow up with you. We do
          not sell your personal information.
        </p>
      </LegalSection>

      <LegalSection heading="Who we share it with">
        <p>
          Your inquiry is shared with the AREA leasing team. We use a transactional email
          provider to deliver notifications. <strong>[List any other processors here.]</strong>
        </p>
      </LegalSection>

      <LegalSection heading="Marketing emails">
        <p>
          We only add you to update/marketing emails if you opt in. You can unsubscribe at
          any time using the link in those emails. Inquiry follow-ups from the leasing team
          are not marketing.
        </p>
      </LegalSection>

      <LegalSection heading="Data retention">
        <p>
          We keep your information only as long as needed for the purposes above.{" "}
          <strong>[Retention period to be set by Amana Lofts / AREA.]</strong>
        </p>
      </LegalSection>

      <LegalSection heading="Your choices">
        <p>
          You may request access to, correction of, or deletion of your information by
          contacting us at <strong>[contact email]</strong>.
        </p>
      </LegalSection>

      <LegalSection heading="Contact">
        <p>
          Questions about this policy: <strong>[contact name / email / address]</strong>.
        </p>
      </LegalSection>

      <p className="text-sm">
        Amana Lofts is an Equal Housing Opportunity community. Preliminary eligibility
        estimates are subject to income verification and applicable affordable housing
        (AMI) guidelines.
      </p>
    </LegalPage>
  )
}
