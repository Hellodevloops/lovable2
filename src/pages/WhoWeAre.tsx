import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowLeft, Building2, Mail, MapPin, Phone, Scale, Shield, Sparkles } from "lucide-react";
import { LeadershipSection } from "@/components/sections/LeadershipSection";

const storySections = [
  {
    icon: Sparkles,
    number: "01",
    title: "Boutique. Discreet. Built for the World's Finest Brands.",
    paragraphs: [
      "LuxeHire is a specialist luxury recruitment platform with one clear purpose: connecting exceptional professionals with the brands that define global luxury.",
      "We work across fashion, fine jewellery, beauty, hospitality, and luxury retail — placing talent that understands not just the skills a role demands, but the culture, the standards, and the language of the world's most respected houses.",
    ],
  },
  {
    icon: Scale,
    number: "02",
    title: "How We Work",
    paragraphs: [
      "We operate differently from a conventional recruitment agency. Every search is managed with personal attention, deep discretion, and a commitment to confidentiality that both our candidates and our client brands can rely on.",
      "Before any candidate profile is shared with a client, our team contacts the candidate directly, names the brand, describes the opportunity, and moves forward only with their explicit agreement. No speculative sharing. No bulk outreach. No shortcuts.",
      "This is how meaningful placements are made — and how lasting professional relationships are built.",
    ],
  },
  {
    icon: Shield,
    number: "03",
    title: "Our Privacy Commitment",
    paragraphs: [
      "Candidate data is never stored in third-party CRM platforms or external recruitment databases. All information stays within our own secure systems, held only for the purpose for which it was collected, and never shared without consent.",
      "LuxeHire operates in full compliance with the EU General Data Protection Regulation, India's Digital Personal Data Protection Act 2023, and all applicable international data protection frameworks.",
    ],
    links: [
      { label: "Privacy Policy", to: "/privacy-policy" },
      { label: "Data Protection Statement", to: "/data-protection" },
    ],
  },
];

const WhoWeAre = () => {
  const introRef = useRef(null);
  const storyRef = useRef(null);
  const companyRef = useRef(null);
  const introInView = useInView(introRef, { once: true, margin: "-80px" });
  const storyInView = useInView(storyRef, { once: true, margin: "-80px" });
  const companyInView = useInView(companyRef, { once: true, margin: "-80px" });

  return (
    <div className="min-h-screen bg-background pt-20 lg:pt-24">
      <LeadershipSection compactTop />

      <section className="relative overflow-hidden border-b border-border/60 bg-background">
        <div className="absolute inset-0 bg-secondary/50" />
        <div className="absolute left-1/2 top-0 h-px w-32 -translate-x-1/2 bg-primary/40" />

        <div className="container relative mx-auto px-6 py-14 lg:px-12 lg:py-20">
          <motion.div
            ref={introRef}
            initial={{ opacity: 0, y: 24 }}
            animate={introInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="mx-auto max-w-3xl text-center"
          >
            <p className="mb-4 text-xs font-medium uppercase tracking-luxury text-primary">
              Our Story
            </p>
            <h1 className="mb-5 font-serif text-3xl font-medium md:text-4xl lg:text-5xl">
              Who We Are
            </h1>
            <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
              Boutique. Discreet. Built for the world&apos;s finest brands — with the
              discretion, rigour, and taste that luxury deserves.
            </p>
          </motion.div>
        </div>
      </section>

      <section ref={storyRef} className="bg-secondary/40 py-16 lg:py-24">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="mx-auto mb-12 max-w-2xl text-center lg:mb-16">
            <p className="mb-3 text-xs font-medium uppercase tracking-luxury text-primary">
              Philosophy & Practice
            </p>
            <h2 className="font-serif text-2xl font-medium md:text-3xl">
              What defines LuxeHire
            </h2>
          </div>

          <div className="mx-auto grid max-w-5xl gap-6 lg:gap-8">
            {storySections.map((section, index) => {
              const Icon = section.icon;
              return (
                <motion.article
                  key={section.number}
                  initial={{ opacity: 0, y: 28 }}
                  animate={storyInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.12 }}
                  className="luxury-card group relative overflow-hidden rounded-sm border border-border/80 bg-card/80 p-6 md:p-8 lg:p-10"
                >
                  <div className="absolute right-6 top-6 font-serif text-5xl font-medium text-primary/10 md:text-6xl">
                    {section.number}
                  </div>

                  <div className="relative flex flex-col gap-5 md:flex-row md:gap-8">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-sm border border-primary/20 bg-primary/5 text-primary transition-colors duration-300 group-hover:border-primary/40 group-hover:bg-primary/10">
                      <Icon className="h-5 w-5" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <h3 className="mb-3 font-serif text-xl font-medium text-foreground md:text-2xl">
                        {section.title}
                      </h3>
                      <div className="space-y-3 text-sm leading-relaxed text-muted-foreground md:text-base">
                        {section.paragraphs.map((paragraph) => (
                          <p key={paragraph.slice(0, 32)}>{paragraph}</p>
                        ))}
                      </div>

                      {section.links && (
                        <div className="mt-4 flex flex-wrap gap-4">
                          {section.links.map((link) => (
                            <Link
                              key={link.to}
                              to={link.to}
                              className="text-sm text-primary underline-offset-4 transition-colors hover:underline"
                            >
                              {link.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      <section ref={companyRef} className="py-16 lg:py-20">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={companyInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="luxury-card mx-auto max-w-4xl overflow-hidden rounded-sm border border-border"
          >
            <div className="border-b border-border/80 bg-primary/5 px-6 py-8 md:px-10">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-sm border border-primary/20 bg-background text-primary">
                  <Building2 className="h-5 w-5" />
                </div>
                <div>
                  <p className="mb-2 text-xs font-medium uppercase tracking-luxury text-primary">
                    Legal & Contact
                  </p>
                  <h2 className="font-serif text-2xl font-medium md:text-3xl">
                    The Company Behind LuxeHire
                  </h2>
                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
                    LuxeHire is owned and operated by{" "}
                    <span className="text-foreground">Devloops Technologies Pvt. Ltd.</span>,
                    a company registered and headquartered in India.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid gap-6 px-6 py-8 md:grid-cols-3 md:px-10 md:py-10">
              <div className="flex gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <div>
                  <p className="mb-1 text-xs font-medium uppercase tracking-wide text-foreground">
                    Registered Office
                  </p>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    410, Nilamber Primero, Bhayli Vasna Road, Vadodara, Gujarat
                    391410, India
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <Mail className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <div>
                  <p className="mb-1 text-xs font-medium uppercase tracking-wide text-foreground">
                    Email
                  </p>
                  <a
                    href="mailto:privacy@luxehire.in"
                    className="text-sm text-primary transition-colors hover:underline"
                  >
                    privacy@luxehire.in
                  </a>
                </div>
              </div>

              <div className="flex gap-3">
                <Phone className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <div>
                  <p className="mb-1 text-xs font-medium uppercase tracking-wide text-foreground">
                    Phone
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <a href="tel:+916351214414" className="hover:text-primary">
                      +91 6351 214 414
                    </a>
                    <span className="mx-1 text-border">/</span>
                    <a href="tel:+916355523076" className="hover:text-primary">
                      +91 6355 523 076
                    </a>
                  </p>
                </div>
              </div>
            </div>

            <div className="border-t border-border/80 bg-muted/30 px-6 py-4 md:px-10">
              <p className="text-xs text-muted-foreground">
                Legal Entity: Devloops Technologies Pvt. Ltd. · © 2026 LuxeHire.co —
                All Rights Reserved.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="border-t border-border/60 bg-secondary/30 py-10">
        <div className="container mx-auto flex justify-center px-6 lg:px-12">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-sm border border-primary/30 bg-background px-6 py-3 text-sm font-medium text-foreground transition-all duration-300 hover:border-primary hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WhoWeAre;
