import { Link } from "react-router-dom";
import { Linkedin, Mail } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-background py-12 border-t border-border">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Text Logo */}
          <Link to="/" className="flex items-center">
            <span className="font-serif text-2xl">
              <span className="text-primary italic">Luxe</span>
              <span className="text-foreground">Hire</span>
            </span>
          </Link>

          {/* Links */}
          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <a
              href="https://luxehire.co/#about"
              className="text-xs text-muted-foreground hover:text-primary transition-colors uppercase tracking-wide"
            >
              About
            </a>
            <a
              href="https://luxehire.co/#for-clients"
              className="text-xs text-muted-foreground hover:text-primary transition-colors uppercase tracking-wide"
            >
              For Brands
            </a>
            <a
              href="https://luxehire.co/#for-candidates"
              className="text-xs text-muted-foreground hover:text-primary transition-colors uppercase tracking-wide"
            >
              For Talent
            </a>
            <a
              href="https://luxehire.co/#contact"
              className="text-xs text-muted-foreground hover:text-primary transition-colors uppercase tracking-wide"
            >
              Contact
            </a>
            <Link
              to="/who-we-are"
              className="text-xs text-muted-foreground hover:text-primary transition-colors uppercase tracking-wide"
            >
              Who We Are
            </Link>
            <Link
              to="/privacy-policy"
              className="text-xs text-muted-foreground hover:text-primary transition-colors uppercase tracking-wide"
            >
              Privacy Policy
            </Link>
            <Link
              to="/data-protection"
              className="text-xs text-muted-foreground hover:text-primary transition-colors uppercase tracking-wide"
            >
              Data Protection
            </Link>
            <Link
              to="/cookie-policy"
              className="text-xs text-muted-foreground hover:text-primary transition-colors uppercase tracking-wide"
            >
              Cookie Policy
            </Link>
            <Link
              to="/terms"
              className="text-xs text-muted-foreground hover:text-primary transition-colors uppercase tracking-wide"
            >
              Terms of Service
            </Link>
          
          </nav>

          {/* Social */}
          <div className="flex items-center gap-3">
            <a
              href="https://www.linkedin.com/company/luxehire/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-sm border border-border flex items-center justify-center hover:border-primary hover:text-primary transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={14} />
            </a>
            <a
              href="mailto:hello@luxehire.co"
              className="w-8 h-8 rounded-sm border border-border flex items-center justify-center hover:border-primary hover:text-primary transition-colors"
              aria-label="Email"
            >
              <Mail size={14} />
            </a>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border/50 text-center space-y-1">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} LuxeHire. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Operated by Devloops Technologies Pvt. Ltd. · Privacy:{" "}
            <a
              href="mailto:privacy@luxehire.in"
              className="text-primary hover:underline"
            >
              privacy@luxehire.in
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};
