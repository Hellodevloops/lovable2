import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const COOKIE_CONSENT_KEY = "luxehire_cookie_consent";

export type CookieConsentStatus = "accepted" | "rejected" | null;

export const getCookieConsent = (): CookieConsentStatus => {
  try {
    const stored = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (stored === "accepted" || stored === "rejected") return stored;
    return null;
  } catch {
    return null;
  }
};

export const setCookieConsent = (value: "accepted" | "rejected") => {
  try {
    localStorage.setItem(COOKIE_CONSENT_KEY, value);
  } catch {
    /* ignore */
  }
};

export const clearCookieConsent = () => {
  try {
    localStorage.removeItem(COOKIE_CONSENT_KEY);
  } catch {
    /* ignore */
  }
};

export const CookieConsentBanner = () => {
  const [consent, setConsent] = useState<CookieConsentStatus>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setConsent(getCookieConsent());
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleConsentCleared = () => setConsent(null);
    window.addEventListener("cookieConsentCleared", handleConsentCleared);
    return () => window.removeEventListener("cookieConsentCleared", handleConsentCleared);
  }, []);

  const handleAccept = () => {
    setCookieConsent("accepted");
    setConsent("accepted");
  };

  const handleReject = () => {
    setCookieConsent("rejected");
    setConsent("rejected");
  };

  if (!mounted || consent !== null) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ type: "tween", duration: 0.3 }}
        className="fixed bottom-0 left-0 right-0 z-[100] bg-background border-t border-border shadow-lg"
      >
        <div className="container mx-auto px-6 lg:px-12 py-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground flex-1">
              We use cookies to improve your experience and for analytics. By continuing you agree to our use of cookies.{" "}
              <Link to="/cookie-policy" className="text-primary underline hover:no-underline">
                Cookie Policy
              </Link>
            </p>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={handleReject}
                className="flex-1 sm:flex-none px-4 py-2 text-sm font-medium border border-border rounded-sm hover:bg-muted transition-colors"
              >
                Reject Non-Essential
              </button>
              <button
                type="button"
                onClick={handleAccept}
                className="flex-1 sm:flex-none px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-sm hover:opacity-90 transition-opacity"
              >
                Accept Cookies
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
