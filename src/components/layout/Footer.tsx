import { Linkedin, Instagram, Mail } from "lucide-react";
import logo from "@/assets/luxehire-logo.png";

export const Footer = () => {
  return (
    <footer className="bg-background py-12 border-t border-border">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Text Logo */}
          <a href="#home" className="flex items-center">
            <span className="font-serif text-2xl">
              <span className="text-primary italic">Luxe</span>
              <span className="text-foreground">Hire</span>
            </span>
          </a>

          {/* Links */}
          <nav className="flex items-center gap-6">
            <a href="#about" className="text-xs text-muted-foreground hover:text-primary transition-colors uppercase tracking-wide">
              About
            </a>
            <a href="#for-clients" className="text-xs text-muted-foreground hover:text-primary transition-colors uppercase tracking-wide">
              For Brands
            </a>
            <a href="#for-candidates" className="text-xs text-muted-foreground hover:text-primary transition-colors uppercase tracking-wide">
              For Talent
            </a>
            <a href="#contact" className="text-xs text-muted-foreground hover:text-primary transition-colors uppercase tracking-wide">
              Contact
            </a>
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
            {/* <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-sm border border-border flex items-center justify-center hover:border-primary hover:text-primary transition-colors"
              aria-label="Instagram"
            >
              <Instagram size={14} />
            </a> */}
            <a
              href="mailto:hello@luxehire.co"
              className="w-8 h-8 rounded-sm border border-border flex items-center justify-center hover:border-primary hover:text-primary transition-colors"
              aria-label="Email"
            >
              <Mail size={14} />
            </a>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border/50 text-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} LuxeHire. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
