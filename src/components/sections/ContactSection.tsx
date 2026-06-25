import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Send, CheckCircle } from "lucide-react";
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
  const [consentGiven, setConsentGiven] = useState(false);
  const [phoneValue, setPhoneValue] = useState<string | undefined>();

  const detectDeviceType = () => {
    if (typeof window === "undefined") return "desktop";
    const ua = window.navigator.userAgent.toLowerCase();
    if (/tablet|ipad/.test(ua)) return "tablet";
    if (/mobile|android|iphone/.test(ua)) return "mobile";
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

    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      subject: formData.get("subject"),
      message: formData.get("message"),
      phone: phoneValue || "",
      deviceType: detectDeviceType(),
      screenResolution:
        typeof window !== "undefined"
          ? `${window.screen.width}×${window.screen.height}`
          : "",
      language: typeof navigator !== "undefined" ? navigator.language : "",
      timezone:
        typeof Intl !== "undefined"
          ? Intl.DateTimeFormat().resolvedOptions().timeZone
          : "",
      referrer: typeof document !== "undefined" ? document.referrer : "",
    };

    if (phoneValue && !isValidPhoneNumber(phoneValue)) {
      toast.error("Invalid phone number");
      return;
    }

    try {
      setIsSubmitting(true);
      await apiClient.post("/contact", payload);
      setIsSubmitting(false);
      setIsSubmitted(true);
      toast.success("Message sent successfully!");
setTimeout(() => {
  setIsSubmitted(false);
  form.reset();

  // ✅ Reset phone state
  setPhoneValue(undefined);

  // ✅ Remove stored phone
  localStorage.removeItem("phone");
}, 3000);

    } catch {
      setIsSubmitting(false);
      toast.error("Something went wrong");
    }
  };

  return (
    <section id="contact" className="py-20 lg:py-28 relative bg-secondary">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-7xl mx-auto"> {/* widened for horizontal */}

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

          {/* ✅ FIXED GRID WRAPPER */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
           className="grid lg:grid-cols-2 gap-8 max-w-4xl mx-auto"          >

            {/* 1️⃣ COMPANY DETAILS */}
            <div className="bg-card p-6 rounded-lg shadow-sm space-y-6">
              <h3 className="text-lg font-semibold">Company Details</h3>

              <div className="flex gap-3">
                <Mail className="text-primary" />
                <a href="mailto:hello@luxehire.in">hello@luxehire.in</a>
              </div>

              <div className="flex gap-3">
                <Phone className="text-primary" />
                <a href="tel:+916355523076">+91 6355 523 076</a>
              </div>

              <div className="flex gap-3">
                <Phone className="text-primary" />
                <a href="tel:+916351214414">+91 6351 214 414</a>
              </div>

              <div className="flex gap-3 items-start relative group">
  <MapPin className="text-primary mt-1" />

  <div className="relative">
    <a
      href="https://www.google.com/maps?q=410,+Nilamber+Primero,+Bhayli+Vasna+Road,+Vadodara,+Gujarat+391410"
      target="_blank"
      rel="noopener noreferrer"
      className="text-sm hover:text-primary underline cursor-pointer"
    >
     410, Nilamber Primero, Bhayli Vasna Road, Vadodara, Gujarat 391410, India
 
    </a>

    {/*  Hover Map Popup */}
    <div className="absolute left-0 top-6 z-50 hidden group-hover:block">
      <div className="w-[260px] h-[180px] rounded-md overflow-hidden shadow-lg border bg-white">
        <iframe
          src="https://www.google.com/maps?q=410,+Nilamber+Primero,+Bhayli+Vasna+Road,+Vadodara,+Gujarat+391410&output=embed"
          className="w-full h-full border-0"
          loading="lazy"
        ></iframe>
      </div>
    </div>
  </div>
</div>
</div>

            {/* 2️⃣ CONTACT FORM */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Your Name"
                  className="w-full bg-card border border-border rounded-sm px-4 py-3 text-sm"
                />
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="Email Address"
                  className="w-full bg-card border border-border rounded-sm px-4 py-3 text-sm"
                />
              </div>

              <div className="flex flex-col gap-1">
              <span className="text-xs font-medium text-muted-foreground">
              Phone (optional)
               </span>

  <div className="flex items-center border border-border rounded-sm bg-card px-4 py-3
  focus-within:border-primary focus-within:ring-1 focus-within:ring-primary/40">

 <PhoneInput
  international
  defaultCountry="IN"
  value={phoneValue}
  onChange={setPhoneValue}
  onKeyDown={(e) => {
    const input = e.currentTarget as HTMLInputElement;

    // Get only digits
    const digits = input.value.replace(/\D/g, "");

    // Remove country code (91)
    const numberWithoutCode = digits.startsWith("91")
      ? digits.slice(2)
      : digits;

    // Block typing if already 10 digits
    if (numberWithoutCode.length >= 10 && e.key !== "Backspace") {
      e.preventDefault();
    }
  }}
  className="flex items-center gap-2 w-full [&>input]:bg-transparent [&>input]:border-none [&>input]:outline-none"
  inputClassName="!bg-transparent !text-foreground !border-none !outline-none text-sm w-full"
/>
    
</div>
     <span className="text-[10px] text-muted-foreground">
             Includes country code, e.g. +91 98765 43210
       </span>
      </div>
                 <div>
                <input
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  className="w-full bg-card border border-border rounded-sm px-4 py-3 text-sm"
                />
              </div>

              <textarea
                name="message"
                required
                rows={4}
                placeholder="How Can We Help?"
                className="w-full bg-card border border-border rounded-sm px-4 py-3 text-sm"
              />

              <div className="flex gap-2">
                <Checkbox
                  checked={consentGiven}
                  onCheckedChange={(val) => setConsentGiven(val === true)}
                />
                <span className="text-xs">
                  I consent to LuxeHire, operated by Devloops Technologies Pvt. Ltd., 
                  processing my personal data to respond to my enquiry, 
                  in accordance with the LuxeHire Privacy Policy. {" "}
                  <Link to="/privacy-policy" className="text-primary underline">
                    Privacy Policy
                  </Link>
                </span>
              </div>

              <button className="btn-luxury-filled w-full">
                {isSubmitted ? "Sent" : isSubmitting ? "Sending..." : "Send"}
              </button>
            </form>

          </motion.div>

        </div>
      </div>
    </section>
  );
};