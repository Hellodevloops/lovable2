import { Link } from "react-router-dom";
import { Footer } from "@/components/layout/Footer";

const DataProtection = () => {
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
          Data Protection Statement
        </h1>
        <p className="text-sm text-muted-foreground mb-2">
          LuxeHire.co — Data Protection Overview
        </p>

        <div className="prose prose-sm max-w-none space-y-8 text-muted-foreground mt-6">
          <section>
            <h2 className="text-lg font-medium text-foreground mb-2">
              Our Commitment
            </h2>
            <p>
              At LuxeHire, the protection of personal data is not a legal
              formality. It is a professional obligation that sits at the core
              of everything we do. The candidates who trust us with their career
              details and the brands who share confidential briefs with us
              deserve nothing less than the highest standard of data
              governance.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-medium text-foreground mb-2">
              Who Is Responsible
            </h2>
            <p>
              LuxeHire.co is operated by{" "}
              <span className="text-foreground">
                Devloops Technologies Pvt. Ltd.
              </span>
              , which acts as:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>
                The <span className="font-semibold text-foreground">
                  Data Controller
                </span>{" "}
                under the EU General Data Protection Regulation (GDPR), and
              </li>
              <li>
                The <span className="font-semibold text-foreground">
                  Data Fiduciary
                </span>{" "}
                under India&apos;s Digital Personal Data Protection Act 2023
                (DPDPA),
              </li>
            </ul>
            <p className="mt-2">
              for all personal data collected through this platform.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-medium text-foreground mb-2">
              Legal Frameworks We Comply With
            </h2>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>EU General Data Protection Regulation — GDPR (Reg. 2016/679)</li>
              <li>ePrivacy Directive — Directive 2002/58/EC</li>
              <li>India&apos;s Digital Personal Data Protection Act 2023 — DPDPA</li>
              <li>DPDP Rules 2025 (Ministry of Electronics and IT, India)</li>
              <li>IT (Reasonable Security Practices) Rules 2011 — India</li>
              <li>
                Personal Information Protection and Electronic Documents Act —
                PIPEDA (Canada)
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-medium text-foreground mb-2">
              What We Do to Protect Your Data
            </h2>
            <p>
              We do not store candidate data in third-party CRM or recruitment
              platforms. All candidate information is held within our own secure
              infrastructure hosted on{" "}
              <span className="font-semibold text-foreground">
                Amazon Web Services (AWS), ap-south-1 region in India
              </span>
              .
            </p>
            <p className="mt-2">
              Access to candidate and client data is:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Restricted to authorised personnel only</li>
              <li>Protected by role-based access controls</li>
              <li>Secured using two-factor authentication</li>
              <li>Encrypted in transit and at rest</li>
            </ul>
            <p className="mt-2">
              Full details of our technical and organisational measures are set
              out in our{" "}
              <Link
                to="/privacy-policy"
                className="text-primary hover:underline"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </section>

          <section>
            <h2 className="text-lg font-medium text-foreground mb-2">
              Your Rights
            </h2>
            <p>
              Every individual whose data we hold has the right to access,
              correct, delete, port, restrict, or object to their data under
              applicable law. Indian residents have the additional right to
              nominate a trusted person to exercise these rights on their
              behalf. EU/EEA residents may escalate matters to their local
              supervisory authority.
            </p>
            <p className="mt-2">
              Full details of these rights and how to exercise them are provided
              in our Privacy Policy.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-medium text-foreground mb-2">
              Contact Our Privacy Team
            </h2>
            <p>
              For any data protection query, rights request, or concern, please
              contact:
            </p>
            <p className="mt-2">
              Email:{" "}
              <a
                href="mailto:privacy@luxehire.in"
                className="text-primary hover:underline"
              >
                privacy@luxehire.in
              </a>
              <br />
              Phone: +91 6351214414
              <br />
              Devloops Technologies Pvt. Ltd., 410, Nilamber Primero, Bhayli
              Vasna Road, Vadodara, Gujarat 391410, India
            </p>
            <p className="mt-2 text-xs text-muted-foreground">
              © 2026 LuxeHire.co — Operated by Devloops Technologies Pvt. Ltd.
              All Rights Reserved.
            </p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <Link to="/" className="text-sm text-primary hover:underline">
            ← Back to Home
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default DataProtection;

