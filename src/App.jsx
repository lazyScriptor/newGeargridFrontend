import { useEffect } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Nav from "./components/layout/Nav";
import Footer from "./components/layout/Footer";
import LandingPage from "./pages/LandingPage";
import ContactPage from "./pages/ContactPage";

// Scroll to top on every navigation (anchor scroll is handled by the
// browser's default anchor behaviour for #features etc.)
function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
    }
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname, hash]);
  return null;
}

export default function App() {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 antialiased selection:bg-amber-500 selection:text-white">
      {/* Skip-to-content link — visible only on keyboard focus.
          Accessibility win + small SEO boost (Lighthouse "bypass" audit). */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-slate-900 focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white"
      >
        Skip to content
      </a>
      <ScrollToTop />
      <Nav />
      <div id="main">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}
