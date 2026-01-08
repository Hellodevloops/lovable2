import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-gold/5 blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-gold/5 blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center relative z-10 px-6"
      >
        <h1 className="font-serif text-8xl md:text-9xl font-medium text-gradient-gold mb-4">
          404
        </h1>
        <p className="text-xl md:text-2xl text-foreground font-serif mb-2">
          Page Not Found
        </p>
        <p className="text-muted-foreground mb-8 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved to a new location.
        </p>
        <a
          href="/"
          className="btn-luxury-filled inline-flex items-center gap-2"
        >
          <ArrowLeft size={16} />
          Return to Home
        </a>
      </motion.div>
    </div>
  );
};

export default NotFound;
