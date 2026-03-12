import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Send, CheckCircle, Upload, FileText } from "lucide-react";
import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";
import { apiClient } from "@/lib/apiClient";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";

export const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [consentGiven, setConsentGiven] = useState(false);
  const [phoneValue, setPhoneValue] = useState<string | undefined>();

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

  const detectDeviceType = () => {
    if (typeof window === "undefined") return "desktop";
    const ua = window.navigator.userAgent.toLowerCase();
    if (/tablet|ipad|playbook|silk/.test(ua)) return "tablet";
    if (/mobile|iphone|ipod|android|blackberry|phone/.test(ua)) return "mobile";
    return "desktop";
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!consentGiven) {
      toast.error("Please agree to the processing and sharing of your data.");
      return;
    }

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const name = (formData.get("name") || "").toString().trim();
    const email = (formData.get("email") || "").toString().trim();
    const subject = (formData.get("subject") || "").toString().trim();
    const message = (formData.get("message") || "").toString().trim();

    if (!name || !email || !message) {
      toast.error("Please fill in your name, email and message.");
      return;
    }

    if (phoneValue && !isValidPhoneNumber(phoneValue)) {
      toast.error("Please enter a valid phone number.");
      return;
    }

    const screenResolution =
      typeof window !== "undefined"
        ? `${window.screen.width}x${window.screen.height}`
        : "";
    const language =
      typeof navigator !== "undefined" ? navigator.language || "" : "";
    const timezone =
      typeof Intl !== "undefined"
        ? Intl.DateTimeFormat().resolvedOptions().timeZone || ""
        : "";
    const referrer =
      typeof document !== "undefined" ? document.referrer || "" : "";
    // Network type (if available) - not stored but useful for future
    const networkType =
      typeof navigator !== "undefined" &&
      (navigator as any).connection &&
      (navigator as any).connection.effectiveType
        ? (navigator as any).connection.effectiveType
        : undefined;

    const deviceType = detectDeviceType();

    const payload: Record<string, unknown> = {
      name,
      email,
      phone: phoneValue || "",
      subject,
      message,
      screenResolution,
      language,
      timezone,
      referrer,
      deviceType,
      networkType,
      userAgent:
        typeof navigator !== "undefined" ? navigator.userAgent || "" : "",
    };

    try {
      setIsSubmitting(true);
      await apiClient.post("/contact", payload);
      setIsSubmitting(false);
      setIsSubmitted(true);
      toast.success("Thank you. We'll be in touch shortly.");
      setTimeout(() => {
        setIsSubmitted(false);
        setResumeFile(null);
        form.reset();
      }, 3000);
    } catch (error: any) {
      setIsSubmitting(false);
      const message =
        error?.response?.data?.message ||
        "Something went wrong. Please try again.";
      toast.error(message);
    }
  };

  return (
    <section id="contact" className="py-20 lg:py-28 relative bg-secondary">
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
              Begin Your Journey
            </p>
            <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl font-medium mb-4">
              Let's Start a Conversation
            </h2>
            <p className="text-muted-foreground text-sm max-w-md mx-auto">
              Whether you represent a luxury brand seeking exceptional talent or are a professional exploring new horizons, we would be delighted to connect.
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
                  <a href="mailto:hello@luxehire.in" className="text-sm font-medium hover:text-primary transition-colors">
                    hello@luxehire.in
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-sm bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Phone</p>
                  <a href="tel:+916355 523 076" className="text-sm font-medium hover:text-primary transition-colors">
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
                  <a href="tel:+916351214414" className="text-sm font-medium hover:text-primary transition-colors">
                    +91 6351 214 414
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
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-medium text-muted-foreground">Phone (optional)</span>
                  <PhoneInput
                    international
                    defaultCountry="IN"
                    value={phoneValue}
                    onChange={setPhoneValue}
                    className="w-full bg-card border border-border rounded-sm px-2 py-1 text-sm text-foreground focus-within:border-primary focus-within:ring-1 focus-within:ring-primary/40 focus-within:outline-none transition-colors"
                    inputClassName="flex-1 bg-transparent border-none outline-none text-sm px-2 py-1"
                  />
                  <span className="text-[10px] text-muted-foreground">
                    Includes country code, e.g. +91 98765 43210
                  </span>
                </div>
                <input
                  type="text"
                  name="subject"
                  placeholder="Subject (Optional)"
                  className="w-full bg-card border border-border rounded-sm px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none transition-colors"
                />
              </div>
              <textarea
                name="message"
                required
                rows={4}
                placeholder="How can we help?"
                className="w-full bg-card border border-border rounded-sm px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none transition-colors resize-none"
              />
              <label className="flex items-start gap-3 cursor-pointer group">
                <Checkbox
                  checked={consentGiven}
                  onCheckedChange={(checked) => setConsentGiven(checked === true)}
                  className="mt-0.5"
                />
                <span className="text-xs text-muted-foreground group-hover:text-foreground/80">
                I consent to LuxeHire, operated by Devloops Technologies Pvt. Ltd., processing my personal data to 
                respond to my enquiry, in accordance with the LuxeHire Privacy Policy. {" "}
                  <Link to="/privacy-policy" className="text-primary underline hover:no-underline">Privacy Policy</Link>.
                </span>
              </label>
              {/* <div className="relative">
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
              </div> */}
              <button
                type="submit"
                disabled={isSubmitting || isSubmitted}
                className="btn-luxury-filled flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isSubmitted ? (
                  <>
                    <CheckCircle size={16} />
                    Sent
                  </>
                ) : isSubmitting ? (
                  "Sending..."
                ) : (
                  <>
                    <Send size={16} />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
