import { Link } from "react-router-dom";
import { Footer } from "@/components/layout/Footer";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-background/95 backdrop-blur-md">
        <div className="container mx-auto px-6 lg:px-12 py-4">
          <Link
            to="/"
            className="font-serif text-xl text-foreground hover:text-primary transition-colors"
          >
            <span className="text-primary italic">Luxe</span>
            <span>Hire</span>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-6 lg:px-12 py-12 lg:py-16 max-w-3xl">
        <h1 className="font-serif text-3xl md:text-4xl font-medium mb-2">
          Privacy Policy
        </h1>
        <p className="text-sm text-muted-foreground mb-2">
          LuxeHire — Operated by Devloops Technologies Pvt. Ltd.
        </p>
        <p className="text-sm text-muted-foreground mb-1">
          <span className="font-semibold text-foreground">Effective Date:</span>{" "}
          February 1, 2026
        </p>
        <p className="text-sm text-muted-foreground mb-1">
          <span className="font-semibold text-foreground">Last Updated:</span>{" "}
          February 1, 2026
        </p>
        <p className="text-sm text-muted-foreground mb-6">
          Version 1.0 · GDPR (EU 2016/679) · DPDPA 2023 · DPDP Rules 2025 ·
          ePrivacy Directive 2002/58/EC · PIPEDA (Canada)
        </p>

        <div className="prose prose-sm max-w-none space-y-8 text-muted-foreground">
          <section>
            <h2 className="text-lg font-medium text-foreground mb-2">
              1. Who We Are
            </h2>
            <p>
              LuxeHire is a boutique luxury recruitment firm dedicated to placing
              skilled professionals with leading brands across fashion,
              jewellery, beauty, hospitality, and luxury retail worldwide.
            </p>
            <p>
              LuxeHire is owned and operated by{" "}
              <strong className="text-foreground">
                Devloops Technologies Pvt. Ltd.
              </strong>
              , a company incorporated in India.
            </p>
            <p className="mt-2">
              <span className="font-semibold text-foreground">
                Legal Entity:
              </span>{" "}
              Devloops Technologies Pvt. Ltd.
              <br />
              <span className="font-semibold text-foreground">
                Registered Office:
              </span>{" "}
              410, Nilamber Primero, Bhayli Vasna Road, Vadodara, Gujarat
              391410, India
              <br />
              <span className="font-semibold text-foreground">Email:</span>{" "}
              <a
                href="mailto:privacy@luxehire.in"
                className="text-primary hover:underline"
              >
                privacy@luxehire.in
              </a>
              <br />
              <span className="font-semibold text-foreground">Phone:</span> +91
              6351214414 / +91 6355523076
              <br />
              <span className="font-semibold text-foreground">Website:</span>{" "}
              <a
                href="https://luxehire.co"
                className="text-primary hover:underline"
              >
                luxehire.co
              </a>
            </p>
            <p className="mt-2">
              This policy is governed by the laws of India. Disputes shall fall
              under the jurisdiction of the courts of Vadodara, Gujarat, without
              limiting the rights of individuals under GDPR, DPDPA 2023, or
              PIPEDA.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-medium text-foreground mb-2">
              2. Who This Policy Applies To
            </h2>
            <p>This policy applies to three groups:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>
                <strong className="text-foreground">Candidates</strong> – professionals
                who submit their details or CV to be considered for roles with
                our luxury brand clients.
              </li>
              <li>
                <strong className="text-foreground">Website Visitors</strong> –
                anyone who visits{" "}
                <span className="text-foreground">luxehire.co</span>, whether
                or not they submit any information.
              </li>
              <li>
                <strong className="text-foreground">Client Contacts</strong> –
                representatives of luxury brand companies who engage LuxeHire
                for executive search and placement services.
              </li>
            </ul>
            <p className="mt-2">
              This policy does not apply to how client brands handle data after
              a candidate has been formally introduced to them. Once that
              happens, the brand becomes an independent data controller for its
              own processing.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-medium text-foreground mb-2">
              3. What Data We Collect
            </h2>
            <p>
              We collect only what is necessary to deliver our recruitment
              services. We do not intentionally collect special category data
              (such as health information, political views, religious beliefs,
              or biometric data) unless explicitly required and consented to.
            </p>
            <h3 className="text-base font-semibold text-foreground mt-4 mb-1">
              3.1 Candidate Data
            </h3>
            <p>Typical candidate data includes:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Full name</li>
              <li>Email address and phone number</li>
              <li>CV / résumé and employment history</li>
              <li>Current and expected salary</li>
              <li>Location (city and country)</li>
              <li>Links to professional profiles (e.g. LinkedIn)</li>
              <li>References (with separate written consent for checks)</li>
            </ul>
            <h3 className="text-base font-semibold text-foreground mt-4 mb-1">
              3.2 Data from External Sources
            </h3>
            <p>
              We may receive candidate information from platforms such as
              LinkedIn or via referrals. When this happens, we contact the
              candidate at the earliest opportunity, explain how their data was
              obtained, and give them the opportunity to consent or request
              deletion, in line with GDPR Article 14.
            </p>
            <h3 className="text-base font-semibold text-foreground mt-4 mb-1">
              3.3 Client Contact Data
            </h3>
            <p>
              We collect basic business contact details for client
              representatives (name, job title, company details, contact
              information and briefing notes) solely to manage the relationship
              and deliver recruitment services.
            </p>
            <h3 className="text-base font-semibold text-foreground mt-4 mb-1">
              3.4 Automatically Collected Website Data
            </h3>
            <p>
              When you visit luxehire.co, we automatically collect technical
              information to keep the site secure and functioning, such as IP
              address, browser type, device and operating system, pages visited,
              time on page and referring source, and cookie identifiers.
            </p>
            <h3 className="text-base font-semibold text-foreground mt-4 mb-1">
              3.5 Contact Form Submissions
            </h3>
            <p>
              If you send us a message through the website, we collect your
              name, email address, and the content of your message solely to
              respond to your enquiry. This data is not used for marketing
              without your separate consent.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-medium text-foreground mb-2">
              4. Legal Basis for Processing
            </h2>
            <p>
              We rely on different legal bases depending on the purpose of
              processing and the applicable law (GDPR, DPDPA 2023, PIPEDA).
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>
                <strong className="text-foreground">Consent</strong> – for
                collecting and holding candidate data, sharing a profile with a
                named client, conducting reference checks, and certain
                communications.
              </li>
              <li>
                <strong className="text-foreground">Legitimate interests</strong>{" "}
                (GDPR) /{" "}
                <strong className="text-foreground">legitimate use</strong>{" "}
                (DPDPA) – for assessing suitability, contacting candidates about
                new roles, client contact communications, security monitoring,
                and website analytics where allowed.
              </li>
              <li>
                <strong className="text-foreground">Legal obligation</strong> –
                for compliance with regulatory and legal requirements.
              </li>
              <li>
                <strong className="text-foreground">Contract</strong> – for
                managing client relationships and responding to enquiries where
                necessary to perform a contract.
              </li>
            </ul>
            <p className="mt-2">
              Where we rely on legitimate interests under GDPR, we conduct a
              Legitimate Interests Assessment. For Indian residents, DPDPA does
              not recognise legitimate interests as a standalone legal basis, so
              such processing is documented under legitimate use where
              permitted, or we obtain explicit consent.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-medium text-foreground mb-2">
              5. How We Collect Consent
            </h2>
            <p>
              Before collecting personal data, we obtain consent that is freely
              given, specific, informed, and unambiguous. Every form on
              LuxeHire includes an unticked checkbox with a declaration
              confirming that candidates understand how their data will be used
              and that profiles will only be shared with a named client after
              separate confirmation.
            </p>
            <p className="mt-2">
              Pre-ticked boxes are never used. The date, time, and form on which
              consent was given are recorded and stored for at least seven years
              as required by DPDPA 2023.
            </p>
            <p className="mt-2">
              You may withdraw consent at any time by writing to{" "}
              <a
                href="mailto:privacy@luxehire.in"
                className="text-primary hover:underline"
              >
                privacy@luxehire.in
              </a>
              . Withdrawal takes effect immediately and does not affect any
              processing carried out before the withdrawal. Following
              withdrawal, your data is deleted in line with the retention
              schedule below.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-medium text-foreground mb-2">
              6. How Candidate Data Is Used — The Three-Party Data Flow
            </h2>
            <ol className="list-decimal pl-6 mt-2 space-y-1">
              <li>
                <strong className="text-foreground">Submission:</strong> when a
                candidate submits their information, it is held only within
                LuxeHire&apos;s systems. Nothing is shared externally at this
                stage.
              </li>
              <li>
                <strong className="text-foreground">Internal assessment:</strong>{" "}
                our recruitment team reviews the profile against active roles.
                No automated tools make decisions without human review.
              </li>
              <li>
                <strong className="text-foreground">Sharing with clients:</strong>{" "}
                before sharing a profile with a client brand, LuxeHire contacts
                the candidate, names the specific brand, describes the role, and
                requests explicit consent for that individual introduction only.
              </li>
            </ol>
            <p className="mt-2">
              Once a candidate profile is shared with a client following consent,
              that brand becomes an independent data controller for its own
              processing. Candidates should review the relevant brand&apos;s own
              privacy policy.
            </p>
            <p className="mt-2">
              Reference checks are carried out only with separate written
              consent from the candidate.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-medium text-foreground mb-2">
              7. Professional Confidentiality
            </h2>
            <p>
              All candidate information and all client briefing materials are
              treated as confidential business information. Access is limited
              strictly to recruitment personnel directly involved in the
              relevant engagement and is regularly reviewed to maintain the
              principle of least privilege.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-medium text-foreground mb-2">
              8. Privacy by Design and Data Sharing
            </h2>
            <p>
              LuxeHire does not store candidate data in third-party recruitment
              CRM platforms, marketing databases, or external recruitment
              software such as HubSpot, Salesforce, Zoho, or Bullhorn. Candidate
              data stays within our own secure infrastructure.
            </p>
            <p className="mt-2">
              Where third-party service providers process personal data on our
              behalf (for example, Amazon Web Services or Google Analytics),
              they are bound by data processing agreements and confidentiality
              obligations in line with GDPR Article 28 and equivalent
              frameworks.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-medium text-foreground mb-2">
              9. Data Retention
            </h2>
            <p>
              We follow a structured retention schedule to ensure that personal
              data is not kept longer than necessary:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>
                <strong className="text-foreground">
                  Active candidate (placement ongoing)
                </strong>{" "}
                – retained for the duration of the process and reviewed at
                closing; retained with fresh consent or permanently deleted.
              </li>
              <li>
                <strong className="text-foreground">
                  Unsuccessful candidates
                </strong>{" "}
                – retained for 12 months from last contact, then permanently
                deleted unless fresh consent is obtained.
              </li>
              <li>
                <strong className="text-foreground">
                  Placed candidate records
                </strong>{" "}
                – retained for 24 months from placement, then securely archived
                and permanently deleted.
              </li>
              <li>
                <strong className="text-foreground">Client contact data</strong>{" "}
                – contract duration plus 12 months.
              </li>
              <li>
                <strong className="text-foreground">
                  Website enquiry form data
                </strong>{" "}
                – 12 months.
              </li>
              <li>
                <strong className="text-foreground">Consent records</strong> –
                minimum of 7 years as required by DPDPA 2023.
              </li>
              <li>
                <strong className="text-foreground">
                  Website analytics data
                </strong>{" "}
                – 26 months (Google Analytics standard period), after which data
                is anonymised.
              </li>
            </ul>
            <p className="mt-2">
              A full data audit is conducted at least every six months. Records
              past their retention date are permanently deleted, and each
              deletion is logged.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-medium text-foreground mb-2">
              10. Your Data Protection Rights
            </h2>
            <p>
              Depending on where you are located, you may have some or all of
              the following rights under GDPR and DPDPA 2023:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Right of access to your personal data</li>
              <li>Right to rectification of inaccurate or incomplete data</li>
              <li>Right to erasure (deletion)</li>
              <li>Right to restrict processing (GDPR)</li>
              <li>Right to data portability in a common format</li>
              <li>Right to object to processing based on legitimate interests</li>
              <li>Right to withdraw consent at any time</li>
              <li>
                Right to grievance redressal and to nominate someone to exercise
                your rights (DPDPA)
              </li>
            </ul>
            <p className="mt-2">
              To exercise any of these rights, email{" "}
              <a
                href="mailto:privacy@luxehire.in"
                className="text-primary hover:underline"
              >
                privacy@luxehire.in
              </a>{" "}
              with the subject line{" "}
              <span className="font-semibold text-foreground">
                &quot;Data Rights Request&quot;
              </span>
              . GDPR requests are normally processed within 30 calendar days
              (extendable to 3 months where permitted). DPDPA requests are
              handled within 90 days.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-medium text-foreground mb-2">
              11. Cookies and Website Tracking
            </h2>
            <p>
              Our website uses cookies to ensure it works correctly and to help
              us understand how it is used. A cookie banner appears before any
              non-essential cookies are activated. You may Accept All, Reject
              Non-Essential, or set preferences by category.
            </p>
            <p className="mt-2">
              We use essential cookies (session tokens and CSRF tokens), analytics
              cookies (such as Google Analytics <code>_ga</code>,{" "}
              <code>_gid</code>, <code>_gat</code>), and functional cookies
              (language and preference cookies). Non-essential cookies are only
              set with your consent.
            </p>
            <p className="mt-2">
              You can change your cookie preferences at any time using the{" "}
              <span className="font-semibold text-foreground">
                Cookie Settings
              </span>{" "}
              link in the footer. To opt out of Google Analytics across all
              websites, you may install the browser add-on available at{" "}
              <a
                href="https://tools.google.com/dlpage/gaoptout"
                className="text-primary hover:underline"
              >
                tools.google.com/dlpage/gaoptout
              </a>
              . Full details of our cookies are provided in our separate Cookie
              Policy.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-medium text-foreground mb-2">
              12. Data Security
            </h2>
            <p>
              LuxeHire implements technical and organisational measures to
              protect personal data in line with GDPR Article 32 and India&apos;s
              IT (Reasonable Security Practices) Rules 2011.
            </p>
            <p className="mt-2">
              Measures include SSL/TLS encryption for data in transit and at
              rest, role-based access control, two-factor authentication for
              staff accounts, full activity logging, hosting on Amazon Web
              Services (AWS ap-south-1), ISO 27001-aligned practices, annual
              vulnerability assessments, mandatory training, and documented
              incident response procedures.
            </p>
            <p className="mt-2">
              We will notify the relevant EU supervisory authority of a personal
              data breach within 72 hours where required by GDPR Article 33, and
              notify affected individuals without undue delay where the breach
              is likely to result in high risk. Under DPDPA 2023, the Data
              Protection Board of India will be notified immediately, followed
              by a written report within 72 hours in line with DPDP Rules 2025.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-medium text-foreground mb-2">
              13. International Data Transfers
            </h2>
            <p>
              Candidate data is primarily hosted in India on Amazon Web
              Services, AWS ap-south-1 region. For EU/EEA engagements, we may
              use EU-based regions where required. Transfers are protected by
              appropriate safeguards such as Standard Contractual Clauses under
              GDPR Article 46.
            </p>
            <p className="mt-2">
              We also comply with DPDPA 2023 and DPDP Rules 2025 for Indian
              personal data and with PIPEDA for Canadian residents. We never
              transfer a candidate profile to a client brand in another country
              without first informing the candidate of that country and
              obtaining explicit consent for that transfer.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-medium text-foreground mb-2">
              14. Duties of the Data Principal (India)
            </h2>
            <p>
              Under DPDPA 2023 Section 15, individuals providing personal data
              to LuxeHire must not impersonate another person, must not
              suppress or conceal information where accuracy is legally or
              contractually required, must not file false, frivolous, or
              misleading complaints, and must provide only accurate and
              verifiable information.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-medium text-foreground mb-2">
              15. Children&apos;s Privacy
            </h2>
            <p>
              LuxeHire&apos;s services are directed exclusively at working
              professionals. We do not knowingly collect personal data from
              anyone under 18 years of age and apply 18 as the minimum age
              globally in line with DPDPA 2023.
            </p>
            <p className="mt-2">
              If you believe we have inadvertently collected data relating to a
              person under 18, please contact{" "}
              <a
                href="mailto:privacy@luxehire.in"
                className="text-primary hover:underline"
              >
                privacy@luxehire.in
              </a>{" "}
              with the subject line &quot;Children&apos;s Data&quot; and we
              will delete it without delay.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-medium text-foreground mb-2">
              16. Grievance Redressal
            </h2>
            <p>
              LuxeHire has designated a Privacy and Compliance Contact to
              receive and resolve complaints about how personal data is handled,
              as required under DPDPA 2023 and DPDP Rules 2025.
            </p>
            <p className="mt-2">
              To submit a grievance, email{" "}
              <a
                href="mailto:privacy@luxehire.in"
                className="text-primary hover:underline"
              >
                privacy@luxehire.in
              </a>{" "}
              with the subject line &quot;Privacy Grievance&quot;. We will
              acknowledge your complaint within 48 hours and aim to provide a
              written resolution within 90 days. If you are not satisfied, you
              may escalate to the Data Protection Board of India or your local
              EU data protection authority.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-medium text-foreground mb-2">
              17. Third-Party Links
            </h2>
            <p>
              LuxeHire may link to third-party websites such as LinkedIn or
              luxury brand sites. This Privacy Policy applies only to{" "}
              <span className="text-foreground">luxehire.co</span>. We are not
              responsible for the privacy practices of any external website and
              encourage you to review their policies before submitting personal
              information.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-medium text-foreground mb-2">
              18. Business Transfers
            </h2>
            <p>
              If Devloops Technologies Pvt. Ltd. undergoes a merger,
              acquisition, or restructuring, your personal data may form part of
              the transferred assets. In such circumstances, we will notify you
              in advance where required, and the successor will honour the
              commitments in this policy or seek fresh consent.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-medium text-foreground mb-2">
              19. Changes to This Policy
            </h2>
            <p>
              This policy is reviewed at least once a year or whenever
              significant legal or operational changes occur. When material
              changes are made, we will update the dates at the top, notify
              registered candidates and clients by email where changes affect
              their rights, obtain fresh consent where required, and update the
              version history.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-medium text-foreground mb-2">
              20. Contact Us
            </h2>
            <p>
              For any questions about this Privacy Policy, to exercise your
              rights, or to raise a concern, please contact:
            </p>
            <p className="mt-2">
              <span className="font-semibold text-foreground">
                Devloops Technologies Pvt. Ltd., operating LuxeHire.co
              </span>
              <br />
              Email:{" "}
              <a
                href="mailto:privacy@luxehire.in"
                className="text-primary hover:underline"
              >
                privacy@luxehire.in
              </a>
              <br />
              Phone: +91 6351214414 / +91 6355523076
              <br />
              Address: 410, Nilamber Primero, Bhayli Vasna Road, Vadodara,
              Gujarat 391410, India
            </p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <Link to="/" className="text-sm text-primary hover:underline">← Back to Home</Link>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
