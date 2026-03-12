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
        <h1 className="font-serif text-3xl md:text-4xl font-medium mb-2">Privacy Policy</h1>
        <p className="text-sm text-muted-foreground mb-10">Last updated: March 2025</p>

        <div className="prose prose-sm max-w-none space-y-8 text-muted-foreground">
          <section>
            <h2 className="text-lg font-medium text-foreground mb-2">1. Data Controller</h2>
            <p>
              The data controller responsible for your personal data is <strong className="text-foreground">Devloops Technologies Pvt. Ltd.</strong>, operating the LuxeHire recruitment service. For any privacy-related requests or questions, contact us at{" "}
              <a href="mailto:privacy@luxehire.co" className="text-primary hover:underline">privacy@luxehire.co</a>.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-medium text-foreground mb-2">2. What Candidate Data We Collect</h2>
            <p>We may collect the following candidate data:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Name</li>
              <li>Email address</li>
              <li>Phone number</li>
              <li>CV / resume and employment history</li>
              <li>Any other information you provide in forms or communications</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-medium text-foreground mb-2">3. Purpose of Data Collection</h2>
            <p>
              Your data is collected and processed for <strong className="text-foreground">recruitment services</strong> only. This includes matching your profile with relevant client companies, facilitating introductions, and communicating about opportunities in the luxury sector.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-medium text-foreground mb-2">4. Data Retention</h2>
            <p>
              We retain candidate personal data for a period of <strong className="text-foreground">6 to 24 months</strong> from the last meaningful contact, unless you request deletion earlier or we are required to retain it for longer by law.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-medium text-foreground mb-2">5. Your Rights</h2>
            <p>You have the right to:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li><strong className="text-foreground">Access</strong> – request a copy of the personal data we hold about you</li>
              <li><strong className="text-foreground">Correction</strong> – request correction of inaccurate or incomplete data</li>
              <li><strong className="text-foreground">Deletion</strong> – request deletion of your personal data (see section 7 below)</li>
              <li><strong className="text-foreground">Withdraw consent</strong> – withdraw consent for processing where we rely on consent</li>
            </ul>
            <p className="mt-2">
              To exercise any of these rights, please contact us at{" "}
              <a href="mailto:privacy@luxehire.co" className="text-primary hover:underline">privacy@luxehire.co</a>.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-medium text-foreground mb-2">6. Data Breach Notification</h2>
            <p>
              In the event of a personal data breach that is likely to result in a risk to your rights and freedoms, we will notify the relevant supervisory authority within <strong className="text-foreground">72 hours</strong> where required by law, and inform affected individuals without undue delay where the breach is likely to result in high risk.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-medium text-foreground mb-2">7. Legal Basis for Processing</h2>
            <p>
              We process your personal data on the basis of <strong className="text-foreground">consent</strong> (when you submit your profile or agree to be contacted) and <strong className="text-foreground">legitimate interest</strong> (to provide recruitment services and improve our offerings), where applicable under applicable data protection law.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-medium text-foreground mb-2">8. Data Deletion Requests</h2>
            <p>You may request deletion of your personal data at any time. Our process:</p>
            <ol className="list-decimal pl-6 mt-2 space-y-1">
              <li>Send a deletion request to <a href="mailto:privacy@luxehire.co" className="text-primary hover:underline">privacy@luxehire.co</a></li>
              <li>We will verify your identity to protect your data</li>
              <li>We will remove your data from our internal database within <strong className="text-foreground">30 days</strong></li>
              <li>We will send you a confirmation email once deletion is complete</li>
            </ol>
          </section>

          <section>
            <h2 className="text-lg font-medium text-foreground mb-2">9. Contact</h2>
            <p>
              For privacy requests, questions, or complaints: <a href="mailto:privacy@luxehire.co" className="text-primary hover:underline">privacy@luxehire.co</a>.
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
