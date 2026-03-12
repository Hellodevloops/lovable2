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
        <h1 className="font-serif text-3xl md:text-4xl font-medium mb-2">Cookie Policy</h1>
        <p className="text-sm text-muted-foreground mb-10">Last updated: March 2025</p>

        <div className="prose prose-sm max-w-none space-y-8 text-muted-foreground">
          <section>
            <h2 className="text-lg font-medium text-foreground mb-2">1. What Are Cookies?</h2>
            <p>
              Cookies are small text files that are placed on your device when you visit a website. They are widely used to make websites work more efficiently, to remember your preferences, and to understand how visitors use the site.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-medium text-foreground mb-2">2. Types of Cookies We Use</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong className="text-foreground">Essential cookies</strong> – Required for the website to function (e.g. security, load balancing). These cannot be disabled.
              </li>
              <li>
                <strong className="text-foreground">Analytics cookies</strong> – Help us understand how visitors use our site (e.g. pages viewed, time on site). These are optional and can be rejected via our cookie banner.
              </li>
              <li>
                <strong className="text-foreground">Preference cookies</strong> – Remember your choices (e.g. cookie consent, language). These improve your experience.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-medium text-foreground mb-2">3. Cookie Consent Banner</h2>
            <p>
              On your first visit to our website, a cookie consent banner is displayed. You can choose to <strong className="text-foreground">Accept Cookies</strong> (all cookies) or <strong className="text-foreground">Reject Non-Essential Cookies</strong>. Your choice is stored so we do not ask again until you clear it or change your preferences.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-medium text-foreground mb-2">4. Managing Cookies via Your Browser</h2>
            <p>
              You can also manage or delete cookies through your browser settings. Most browsers allow you to refuse or accept cookies, or to delete existing cookies. The steps vary by browser; typically you can find options under Settings → Privacy / Security → Cookies. Note that blocking all cookies may affect how our website works.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-medium text-foreground mb-2">5. Change Your Cookie Preferences</h2>
            <p>
              You can withdraw or change your cookie consent at any time. Use the &quot;Cookie Settings&quot; link in our website footer, or click the button below to clear your saved preference. The cookie banner will appear again on your next visit so you can make a new choice.
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
            <h2 className="text-lg font-medium text-foreground mb-2">6. Contact</h2>
            <p>
              For questions about our use of cookies: <a href="mailto:privacy@luxehire.co" className="text-primary hover:underline">privacy@luxehire.co</a>.
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
