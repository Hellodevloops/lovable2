import { Link, useNavigate } from "react-router-dom";
import { Footer } from "@/components/layout/Footer";
import { clearCookieConsent } from "@/components/CookieConsentBanner";
import { Button } from "@/components/ui/button";

const CookiePolicy = () => {
  const navigate = useNavigate();

  const handleChangePreferences = () => {
    clearCookieConsent();
    window.dispatchEvent(new CustomEvent("cookieConsentCleared"));
    navigate("/", { replace: true });
    window.scrollTo(0, 0);
  };

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
          Cookie Policy
        </h1>
        <p className="text-sm text-muted-foreground mb-2">
          LuxeHire.co — Operated by Devloops Technologies Pvt. Ltd.
        </p>
        <p className="text-sm text-muted-foreground mb-1">
          <span className="font-semibold text-foreground">Effective Date:</span>{" "}
          February 1, 2026
        </p>
        <p className="text-sm text-muted-foreground mb-8">
          This Cookie Policy explains how LuxeHire uses cookies in compliance
          with the EU ePrivacy Directive 2002/58/EC, GDPR, India&apos;s IT Rules
          2011, DPDPA 2023, and DPDP Rules 2025.
        </p>

        <div className="prose prose-sm max-w-none space-y-8 text-muted-foreground">
          <section>
            <h2 className="text-lg font-medium text-foreground mb-2">
              1. What Are Cookies
            </h2>
            <p>
              Cookies are small text files placed on your device when you visit a
              website. They help the website function correctly, remember your
              preferences, and allow us to understand how visitors use the site
              so we can continue improving it.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-medium text-foreground mb-2">
              2. How We Use Cookies
            </h2>
            <p>
              We use three categories of cookies on LuxeHire.co. Non-essential
              cookies are only activated after you give your explicit consent
              through the banner shown on your first visit to the site.
            </p>

            <h3 className="text-base font-semibold text-foreground mt-4 mb-1">
              Essential Cookies
            </h3>
            <p>
              These cookies are required for the website to function. They
              cannot be disabled without affecting core site functionality and
              do not require your consent.
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>
                <span className="font-semibold text-foreground">
                  Session token
                </span>{" "}
                – maintains your active session securely (session only).
              </li>
              <li>
                <span className="font-semibold text-foreground">
                  CSRF token
                </span>{" "}
                – protects your data against cross-site attacks (session only).
              </li>
            </ul>

            <h3 className="text-base font-semibold text-foreground mt-4 mb-1">
              Analytics Cookies
            </h3>
            <p>
              These cookies help us understand how visitors arrive at and use
              our website. Data collected is pseudonymised and does not directly
              identify you. Your consent is required before they are set.
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>
                <code>_ga</code> – distinguishes unique visitors (up to 26
                months)
              </li>
              <li>
                <code>_gid</code> – identifies users between sessions (24 hours)
              </li>
              <li>
                <code>_gat</code> – controls the rate of data requests (1
                minute)
              </li>
            </ul>
            <p className="mt-2">
              Provider: Google Analytics. These cookies are only set if you
              consent via our cookie banner.
            </p>

            <h3 className="text-base font-semibold text-foreground mt-4 mb-1">
              Functional Cookies
            </h3>
            <p>
              These cookies remember your preferences to improve your experience
              on return visits. Your consent is required before they are set.
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>
                <span className="font-semibold text-foreground">
                  Preference cookie
                </span>{" "}
                – stores language or display preferences (up to 12 months).
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-medium text-foreground mb-2">
              3. Your Cookie Choices
            </h2>
            <p>
              When you first visit LuxeHire, a banner will offer you three
              options: <span className="font-semibold text-foreground">
                Accept All
              </span>
              ,{" "}
              <span className="font-semibold text-foreground">
                Reject Non-Essential
              </span>
              , or{" "}
              <span className="font-semibold text-foreground">
                Customise by category
              </span>
              . You may update your preferences at any time using the{" "}
              <span className="font-semibold text-foreground">
                Cookie Settings
              </span>{" "}
              link in the footer of every page.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-medium text-foreground mb-2">
              4. Managing Cookies via Your Browser
            </h2>
            <p>
              You may also manage or block cookies through your own browser
              settings. Most browsers allow you to refuse or accept cookies, or
              to delete existing cookies. The steps vary by browser; typically
              you can find options under Settings → Privacy / Security →
              Cookies. Disabling certain cookies may affect how some parts of
              the site function.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-medium text-foreground mb-2">
              5. Change Your Cookie Preferences
            </h2>
            <p>
              You can withdraw or change your cookie consent at any time. Use
              the &quot;Cookie Settings&quot; link in our website footer, or
              click the button below to clear your saved preference. The cookie
              banner will appear again on your next visit so you can make a new
              choice.
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={handleChangePreferences}
              className="mt-2"
            >
              Change cookie preferences
            </Button>
          </section>

          <section>
            <h2 className="text-lg font-medium text-foreground mb-2">
              6. Google Analytics Opt-Out
            </h2>
            <p>
              To prevent Google Analytics from collecting data about your visits
              across all websites, you can install the Google Analytics opt-out
              browser add-on available at{" "}
              <a
                href="https://tools.google.com/dlpage/gaoptout"
                className="text-primary hover:underline"
              >
                tools.google.com/dlpage/gaoptout
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-lg font-medium text-foreground mb-2">
              7. Updates to This Policy
            </h2>
            <p>
              We may update this Cookie Policy from time to time. The effective
              date at the top of this page will reflect when changes were last
              made. Continued use of LuxeHire after an update constitutes your
              acceptance of the changes.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-medium text-foreground mb-2">
              8. Contact
            </h2>
            <p>
              For any questions about how we use cookies:
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

export default CookiePolicy;
