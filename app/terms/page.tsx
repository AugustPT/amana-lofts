import type { Metadata } from "next"
import { LegalPage, LegalSection } from "@/components/legal-page"

export const metadata: Metadata = {
  title: "Terms of Use — Amana Lofts",
  description: "Terms governing use of the Amana Lofts website and eligibility check.",
  robots: { index: false },
}

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Use" updated="Draft — not yet published">
      <p>
        These terms govern your use of the Amana Lofts website and the eligibility check.
        By using the site, you agree to them. <strong>[Placeholder text for review.]</strong>
      </p>

      <LegalSection heading="The eligibility check is preliminary">
        <p>
          The eligibility check provides a preliminary estimate based on the answers you
          provide. It is <strong>not</strong> an eligibility determination, an approval, an
          offer of housing, or a reservation. Final eligibility is confirmed by AREA through
          income and asset verification under applicable affordable housing (AMI) guidelines.
        </p>
      </LegalSection>

      <LegalSection heading="No legal or financial advice">
        <p>
          Nothing on this site is legal, financial, or tax advice. Income limits and program
          rules change and vary by residence.
        </p>
      </LegalSection>

      <LegalSection heading="Accuracy of your information">
        <p>
          You agree to provide accurate information. Estimates depend on what you submit.
        </p>
      </LegalSection>

      <LegalSection heading="Intellectual property">
        <p>
          The site&rsquo;s content and design are owned by Amana Lofts LLC and may not be
          reproduced without permission.
        </p>
      </LegalSection>

      <LegalSection heading="Limitation of liability">
        <p>
          <strong>[Limitation-of-liability language to be provided by counsel.]</strong>
        </p>
      </LegalSection>

      <LegalSection heading="Governing law">
        <p>
          These terms are governed by the laws of the State of Hawai&rsquo;i.{" "}
          <strong>[Confirm with counsel.]</strong>
        </p>
      </LegalSection>

      <LegalSection heading="Changes">
        <p>We may update these terms; the latest version will be posted here.</p>
      </LegalSection>

      <LegalSection heading="Contact">
        <p>
          Questions: <strong>[contact name / email]</strong>.
        </p>
      </LegalSection>

      <p className="text-sm">Equal Housing Opportunity.</p>
    </LegalPage>
  )
}
