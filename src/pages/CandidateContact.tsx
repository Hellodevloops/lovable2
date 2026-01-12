import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Send, CheckCircle, Upload, FileText, Menu, X, Linkedin, Instagram } from "lucide-react";
import { toast } from "sonner";

const CandidateContact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file size (10MB limit)
      const maxSize = 10 * 1024 * 1024; // 10MB in bytes
      if (file.size > maxSize) {
        toast.error("File size must be less than 10MB");
        e.target.value = '';
        return;
      }
      
      // Validate file type (PDF, DOC, DOCX)
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (allowedTypes.includes(file.type)) {
        setResumeFile(file);
      } else {
        toast.error("Please upload a PDF or Word document");
        e.target.value = '';
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);
    toast.success("Thank you. We'll be in touch shortly.");
    setTimeout(() => {
      setIsSubmitted(false);
      setResumeFile(null);
      (e.target as HTMLFormElement).reset();
    }, 3000);
  };

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "For Brands", href: "/#for-clients" },
    { label: "For Candidates", href: "/#for-candidates" },
    { label: "Who We Are", href: "/#about" },
    { label: "Contact", href: "/#contact" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Custom Header */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border shadow-sm"
      >
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Text Logo */}
            <Link to="/" className="flex items-center">
              <span className="font-serif text-2xl lg:text-3xl">
                <span className="text-primary italic">Luxe</span>
                <span className="text-foreground">Hire</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors duration-300"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* CTA Button */}
            <Link 
              to="/#contact" 
              className="hidden lg:block px-6 py-3 bg-[#1a2332] text-white text-xs font-medium tracking-wider uppercase hover:bg-[#2a3342] transition-colors duration-300"
            >
              Hire With Us
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-foreground hover:text-primary transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-40 bg-background pt-20 lg:hidden"
        >
          <nav className="container mx-auto px-6 py-8 flex flex-col gap-4">
            {navLinks.map((link, index) => (
              <motion.div
                key={link.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  to={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-xl font-serif text-foreground hover:text-primary transition-colors py-3 border-b border-border/30 block"
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
            <Link
              to="/#contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-6 py-3 bg-[#1a2332] text-white text-sm font-medium tracking-wider uppercase text-center mt-4 block"
            >
              Hire With Us
            </Link>
          </nav>
        </motion.div>
      )}
      
      <main className="pt-20">
        <section id="candidate-contact" className="py-20 lg:py-28 relative bg-secondary">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="max-w-4xl mx-auto">
              <motion.div
                ref={ref}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8 }}
                className="text-center mb-12"
              >
                <p className="text-primary text-xs font-medium tracking-luxury uppercase mb-4">
                  Submit Your Profile
                </p>
                <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl font-medium mb-4">
                  Join Our Talent Network
                </h2>
                <p className="text-muted-foreground text-sm max-w-md mx-auto">
                  Take the first step towards your next career opportunity in the luxury sector. We're excited to learn more about you.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="grid lg:grid-cols-5 gap-8"
              >
                {/* Contact Info */}
                <div className="lg:col-span-2 space-y-6">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-sm bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Email</p>
                      <a href="mailto:hello@luxehire.co" className="text-sm font-medium hover:text-primary transition-colors">
                        hello@luxehire.co
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-sm bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Phone</p>
                      <a href="tel:+916355523072" className="text-sm font-medium hover:text-primary transition-colors">
                        +91 6355 523 076
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-sm bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">LuxeHire</p>
                      <a href="tel:+916355523072" className="text-sm font-medium hover:text-primary transition-colors">
                        +91 6358217266
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-sm bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Global Presence</p>
                      <p className="text-sm font-medium">India · Middle East · Europe</p>
                    </div>
                  </div>
                </div>

                {/* Contact Form */}
                <form onSubmit={handleSubmit} className="lg:col-span-3 space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="Your Name"
                      className="w-full bg-card border border-border rounded-sm px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none transition-colors"
                    />
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="Email Address"
                      className="w-full bg-card border border-border rounded-sm px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none transition-colors"
                    />
                  </div>
                  <input
                    type="text"
                    name="phone"
                    placeholder="Phone Number"
                    className="w-full bg-card border border-border rounded-sm px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none transition-colors"
                  />
                  <input
                    type="text"
                    name="currentRole"
                    placeholder="Current Role / Position"
                    className="w-full bg-card border border-border rounded-sm px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none transition-colors"
                  />
                  <textarea
                    name="message"
                    required
                    rows={4}
                    placeholder="Tell us about your career aspirations and ideal role..."
                    className="w-full bg-card border border-border rounded-sm px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none transition-colors resize-none"
                  />
                  <div className="relative">
                    <input
                      type="file"
                      id="resume"
                      name="resume"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <label
                      htmlFor="resume"
                      className="flex items-center gap-3 w-full bg-card border border-border rounded-sm px-4 py-3 text-sm text-muted-foreground/70 hover:border-primary transition-colors cursor-pointer"
                    >
                      <Upload className="w-4 h-4" />
                      {resumeFile ? (
                        <div className="flex items-center gap-2 flex-1">
                          <FileText className="w-4 h-4 text-primary" />
                          <span className="text-foreground truncate">{resumeFile.name}</span>
                        </div>
                      ) : (
                        <span>Upload Resume (PDF, DOC, DOCX - Max 10MB)</span>
                      )}
                    </label>
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting || isSubmitted}
                    className="btn-luxury-filled flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isSubmitted ? (
                      <>
                        <CheckCircle size={16} />
                        Submitted
                      </>
                    ) : isSubmitting ? (
                      "Submitting..."
                    ) : (
                      <>
                        <Send size={16} />
                        Submit Profile
                      </>
                    )}
                  </button>
                </form>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      
      {/* Custom Footer */}
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
            <nav className="flex items-center gap-6">
              <Link to="/#about" className="text-xs text-muted-foreground hover:text-primary transition-colors uppercase tracking-wide">
                About
              </Link>
              <Link to="/#for-clients" className="text-xs text-muted-foreground hover:text-primary transition-colors uppercase tracking-wide">
                For Brands
              </Link>
              <Link to="/#for-candidates" className="text-xs text-muted-foreground hover:text-primary transition-colors uppercase tracking-wide">
                For Talent
              </Link>
              <Link to="/#contact" className="text-xs text-muted-foreground hover:text-primary transition-colors uppercase tracking-wide">
                Contact
              </Link>
            </nav>

            {/* Social */}
            <div className="flex items-center gap-3">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-sm border border-border flex items-center justify-center hover:border-primary hover:text-primary transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={14} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-sm border border-border flex items-center justify-center hover:border-primary hover:text-primary transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={14} />
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

          <div className="mt-8 pt-6 border-t border-border/50 text-center">
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} LuxeHire. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CandidateContact;
