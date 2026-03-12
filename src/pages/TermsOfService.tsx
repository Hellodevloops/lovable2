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
        <h1 className="font-serif text-3xl md:text-4xl font-medium mb-2">Terms of Service</h1>
        <p className="text-sm text-muted-foreground mb-10">Last updated: March 2025</p>

        <div className="prose prose-sm max-w-none space-y-8 text-muted-foreground">
          <section>
            <h2 className="text-lg font-medium text-foreground mb-2">1. Agreement to Terms</h2>
            <p>
              By accessing or using the LuxeHire website and services operated by Devloops Technologies Pvt. Ltd., you agree to be bound by these Terms of Service. If you do not agree, please do not use our website or services.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-medium text-foreground mb-2">2. Services</h2>
            <p>
              LuxeHire provides boutique luxury recruitment and executive search services, connecting talent with luxury brands in fashion, jewellery, retail, and hospitality. We do not guarantee placement or specific outcomes.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-medium text-foreground mb-2">3. Use of the Website</h2>
            <p>
              You agree to use this website only for lawful purposes. You must not use it in any way that could harm, disable, or impair the site or any user, or that could breach applicable laws or regulations.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-medium text-foreground mb-2">4. Intellectual Property</h2>
            <p>
              All content on this website, including text, logos, and design, is owned by LuxeHire / Devloops Technologies Pvt. Ltd. and is protected by intellectual property laws. You may not copy, reproduce, or use it without prior written permission.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-medium text-foreground mb-2">5. Limitation of Liability</h2>
            <p>
              To the fullest extent permitted by law, LuxeHire and Devloops Technologies Pvt. Ltd. shall not be liable for any indirect, incidental, or consequential damages arising from your use of our website or services.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-medium text-foreground mb-2">6. Privacy</h2>
            <p>
              Your use of our website and services is also governed by our{" "}
              <Link to="/privacy-policy" className="text-primary hover:underline">Privacy Policy</Link>, which describes how we collect, use, and protect your personal data.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-medium text-foreground mb-2">7. Changes</h2>
            <p>
              We may update these Terms of Service from time to time. Continued use of the website after changes constitutes acceptance of the updated terms. We encourage you to review this page periodically.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-medium text-foreground mb-2">8. Contact</h2>
            <p>
              For questions about these Terms: <a href="mailto:hello@luxehire.co" className="text-primary hover:underline">hello@luxehire.co</a>. For privacy matters: <a href="mailto:privacy@luxehire.co" className="text-primary hover:underline">privacy@luxehire.co</a>.
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
