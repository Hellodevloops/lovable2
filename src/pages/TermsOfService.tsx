import { Link } from "react-router-dom";
import { Footer } from "@/components/layout/Footer";

const TermsOfService = () => {
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
          Terms of Service
        </h1>
        <p className="text-sm text-muted-foreground mb-2">
          <span className="font-semibold text-foreground">Effective Date:</span>{" "}
          February 1, 2026
        </p>
        <p className="text-sm text-muted-foreground mb-8">
          Operated by Devloops Technologies Pvt. Ltd. for{" "}
          <span className="text-foreground">LuxeHire.co</span>.
        </p>

        <div className="prose prose-sm max-w-none space-y-8 text-muted-foreground">
          <section>
            <h2 className="text-lg font-medium text-foreground mb-2">
              1. About LuxeHire
            </h2>
            <p>
              LuxeHire.co is a boutique luxury recruitment platform dedicated to
              connecting exceptional professionals with leading brands across
              fashion, jewellery, beauty, hospitality, and luxury retail. The
              platform is owned and operated by{" "}
              <span className="text-foreground">
                Devloops Technologies Pvt. Ltd.
              </span>
              , a company incorporated in India.
            </p>
            <p className="mt-2">
              By accessing or using this website, you confirm that you have
              read, understood, and agreed to these Terms of Service. If you do
              not agree, please discontinue use of this website.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-medium text-foreground mb-2">
              2. Eligibility
            </h2>
            <p>
              This website and its services are intended solely for working
              professionals who are 18 years of age or older. By using
              LuxeHire, you confirm that you meet this requirement. Use of this
              platform by anyone under 18 is strictly not permitted.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-medium text-foreground mb-2">
              3. Nature of Services
            </h2>
            <p>
              LuxeHire acts as a recruitment intermediary. Our role is to
              identify and introduce suitable candidates to luxury brand clients
              who engage us for executive search and talent placement. We do not
              guarantee employment, placement, interview, or any specific
              outcome for any candidate who registers with us. All hiring
              decisions rest entirely with the client brand.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-medium text-foreground mb-2">
              4. Candidate Registration
            </h2>
            <p>
              When you submit your information and CV to LuxeHire, you confirm
              that all information provided is accurate, complete, and up to
              date; that you have the right to submit the information you have
              provided; that you will promptly notify us if any of your details
              change; and that you have not misrepresented your experience,
              qualifications, or professional background.
            </p>
            <p className="mt-2">
              Submitting false or misleading information is a breach of these
              Terms and may result in your immediate removal from our database.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-medium text-foreground mb-2">
              5. Candidate Data and Consent
            </h2>
            <p>
              Your personal data is handled in accordance with our{" "}
              <Link
                to="/privacy-policy"
                className="text-primary hover:underline"
              >
                Privacy Policy
              </Link>
              . Before your profile is shared with any client brand, you will be
              contacted directly, the brand will be named, and your explicit
              consent will be obtained. Your profile will never be shared
              without your prior agreement.
            </p>
            <p className="mt-2">
              By registering with LuxeHire, you consent to being contacted by
              our team about relevant opportunities. You may withdraw this
              consent at any time by writing to{" "}
              <a
                href="mailto:privacy@luxehire.in"
                className="text-primary hover:underline"
              >
                privacy@luxehire.in
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-lg font-medium text-foreground mb-2">
              6. Client Brand Engagement
            </h2>
            <p>
              Companies that engage LuxeHire for talent searches agree to use
              candidate information only for evaluating candidates for the
              specific role for which they were introduced. Client brands may
              not use candidate information for any other purpose or share it
              with third parties without the candidate&apos;s consent.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-medium text-foreground mb-2">
              7. Intellectual Property
            </h2>
            <p>
              All content on LuxeHire.co — including text, design, graphics,
              logos, and structure — belongs to Devloops Technologies Pvt. Ltd.
              You may not copy, reproduce, distribute, or use any content from
              this website without prior written permission.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-medium text-foreground mb-2">
              8. Prohibited Use
            </h2>
            <p>
              You agree not to use this website for any unlawful purpose;
              attempt to access areas you are not authorised to access; upload
              or transmit malicious code or harmful content; misrepresent your
              identity or affiliation; or scrape, harvest, or collect data from
              this website using automated tools.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-medium text-foreground mb-2">
              9. Limitation of Liability
            </h2>
            <p>
              LuxeHire and Devloops Technologies Pvt. Ltd. provide recruitment
              services in good faith. To the fullest extent permitted by
              applicable law, we are not liable for any employment decisions,
              hiring outcomes, or losses arising from the use of our platform or
              services.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-medium text-foreground mb-2">
              10. Third-Party Websites
            </h2>
            <p>
              This website may contain links to external sites. We are not
              responsible for the content or practices of any third-party site
              and encourage you to review their terms and privacy policies
              independently.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-medium text-foreground mb-2">
              11. Changes to These Terms
            </h2>
            <p>
              We may update these Terms of Service at any time. The updated
              version will be published on this page with a revised effective
              date. Continued use of LuxeHire following any update constitutes
              your acceptance of the revised terms.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-medium text-foreground mb-2">
              12. Governing Law
            </h2>
            <p>
              These Terms of Service are governed by the laws of India. Any
              disputes arising in connection with these terms shall fall under
              the jurisdiction of the courts of Vadodara, Gujarat, India.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-medium text-foreground mb-2">
              13. Contact
            </h2>
            <p>
              Devloops Technologies Pvt. Ltd.
              <br />
              410, Nilamber Primero, Bhayli Vasna Road, Vadodara, Gujarat
              391410, India
              <br />
              Email:{" "}
              <a
                href="mailto:privacy@luxehire.in"
                className="text-primary hover:underline"
              >
                privacy@luxehire.in
              </a>
              <br />
              Phone: +91 6351214414
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

export default TermsOfService;
