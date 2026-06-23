import type { Metadata } from "next"
import { LegalPage, LegalSection } from "@/components/legal-page"

export const metadata: Metadata = {
  title: "Accessibility Statement — Amana Lofts",
  description: "Amana Lofts' commitment to an accessible website for all visitors.",
  robots: { index: false },
}

export default function AccessibilityPage() {
  return (
    <LegalPage title="Accessibility Statement" updated="Draft — not yet published">
      <p>
        Amana Lofts is committed to making this website usable by everyone, including
        people who rely on assistive technology. <strong>[Placeholder text for review.]</strong>
      </p>

      <LegalSection heading="Our goal">
        <p>
          We aim to conform to the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA
          and to keep improving over time.
        </p>
      </LegalSection>

      <LegalSection heading="What we&rsquo;ve done">
        <p>
          The site uses semantic structure and landmarks, a skip-to-content link, keyboard
          operability, visible focus styles, labeled form controls, descriptive image text,
          and respects the system &ldquo;reduce motion&rdquo; setting.
        </p>
      </LegalSection>

      <LegalSection heading="Known limitations">
        <p>
          <strong>[List any known issues and target fix dates here.]</strong>
        </p>
      </LegalSection>

      <LegalSection heading="Feedback">
        <p>
          If you encounter an accessibility barrier, please contact us at{" "}
          <strong>[accessibility contact email / phone]</strong> and we&rsquo;ll work to
          help and to fix the issue.
        </p>
      </LegalSection>

      <p className="text-sm">
        Amana Lofts is an Equal Housing Opportunity community.
      </p>
    </LegalPage>
  )
}
