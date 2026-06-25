import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { CookieConsentBanner } from "@/components/CookieConsentBanner";

// Pages
import Index from "./pages/Index";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import CandidateContact from "./pages/CandidateContact";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import CookiePolicy from "./pages/CookiePolicy";
import DataProtection from "./pages/DataProtection";
import WhoWeAre from "./pages/WhoWeAre";
import NotFound from "./pages/NotFound";
import ForClients from "./page/ForClient";
import Candidates from "./page/Candidates";
import Contact from "./page/Contact";
import AboutPage from "./page/about";


// Components
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";

const queryClient = new QueryClient();

const AppLayout = () => {
  const location = useLocation();

  // ❌ Pages where you DON'T want header/footer
  const noLayoutRoutes = ["/login","/dashboard"];

  const hideLayout = noLayoutRoutes.includes(location.pathname);

  return (
    <>
      <CookieConsentBanner />

      {/* ✅ Header */}
      {!hideLayout && <Header />}

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/candidate-contact" element={<CandidateContact />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsOfService />} />
        <Route path="/cookie-policy" element={<CookiePolicy />} />
        <Route path="/data-protection" element={<DataProtection />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/WhoWeAre" element={<WhoWeAre />} />
        <Route path="/whoweare" element={<WhoWeAre />} />
        <Route path="/for-clients" element={<ForClients />} />
        <Route path="/for-candidates" element={<Candidates />} />
        <Route path="/contact" element={<Contact />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>

        {/* Catch-all */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      {/* ✅ Footer */}
      {!hideLayout && <Footer />}
    </>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />

        <BrowserRouter>
          <AppLayout />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;