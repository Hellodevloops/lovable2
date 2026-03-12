import { Link } from "react-router-dom";
import { Footer } from "@/components/layout/Footer";

const WhoWeAre = () => {
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
        <h1 className="font-serif text-3xl md:text-4xl font-medium mb-4">
          Who We Are
        </h1>
        <p className="text-sm text-muted-foreground mb-10">
          Boutique. Discreet. Built for the world&apos;s finest brands.
        </p>

        <div className="prose prose-sm max-w-none space-y-8 text-muted-foreground">
          <section>
            <h2 className="text-lg font-medium text-foreground mb-2">
              Boutique. Discreet. Built for the World&apos;s Finest Brands.
            </h2>
            <p>
              LuxeHire is a specialist luxury recruitment platform with one
              clear purpose: connecting exceptional professionals with the
              brands that define global luxury.
            </p>
            <p className="mt-2">
              We work across fashion, fine jewellery, beauty, hospitality, and
              luxury retail — placing talent that understands not just the
              skills a role demands, but the culture, the standards, and the
              language of the world&apos;s most respected houses.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-medium text-foreground mb-2">
              How We Work
            </h2>
            <p>
              We operate differently from a conventional recruitment agency.
              Every search is managed with personal attention, deep discretion,
              and a commitment to confidentiality that both our candidates and
              our client brands can rely on.
            </p>
            <p className="mt-2">
              Before any candidate profile is shared with a client, our team
              contacts the candidate directly, names the brand, describes the
              opportunity, and moves forward only with their explicit agreement.
              No speculative sharing. No bulk outreach. No shortcuts.
            </p>
            <p className="mt-2">
              This is how meaningful placements are made — and how lasting
              professional relationships are built.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-medium text-foreground mb-2">
              Our Privacy Commitment
            </h2>
            <p>
              Candidate data is never stored in third-party CRM platforms or
              external recruitment databases. All information stays within our
              own secure systems, held only for the purpose for which it was
              collected, and never shared without consent.
            </p>
            <p className="mt-2">
              LuxeHire operates in full compliance with the EU General Data
              Protection Regulation, India&apos;s Digital Personal Data
              Protection Act 2023, and all applicable international data
              protection frameworks. For full details, see our{" "}
              <Link
                to="/privacy-policy"
                className="text-primary hover:underline"
              >
                Privacy Policy
              </Link>{" "}
              and{" "}
              <Link
                to="/data-protection"
                className="text-primary hover:underline"
              >
                Data Protection Statement
              </Link>
              .
            </p>
          </section>

          <section>
            <h2 className="text-lg font-medium text-foreground mb-2">
              The Company Behind LuxeHire
            </h2>
            <p>
              LuxeHire is owned and operated by{" "}
              <span className="text-foreground">
                Devloops Technologies Pvt. Ltd.
              </span>
              , a company registered and headquartered in India.
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

export default WhoWeAre;

