import { Suspense, lazy, useEffect } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Nav from "./components/layout/Nav";
import Footer from "./components/layout/Footer";
import LandingPage from "./pages/LandingPage";

// Contact page is the secondary route — lazy-load so the landing page's
// JS bundle stays as small as possible. Most visitors never click /contact;
// they shouldn't pay for it on first paint.
const ContactPage = lazy(() => import("./pages/ContactPage"));

// Scroll to top on navigation; respect #anchor links for in-page sections.
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

// Minimal fallback while a route chunk loads. Matches the Hero ambient bg
// so the swap doesn't flash white.
function RouteFallback() {
  return (
    <div className="min-h-[60vh] bg-white pt-32 sm:pt-40">
      <div className="mx-auto h-2 w-32 animate-pulse rounded-full bg-slate-200" />
    </div>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 antialiased selection:bg-amber-500 selection:text-white">
      {/* Skip-to-content link — visible only on keyboard focus.
          Accessibility win + Lighthouse "bypass" audit pass. */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-slate-900 focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white"
      >
        Skip to content
      </a>
      <ScrollToTop />
      <Nav />
      <div id="main">
        <Suspense fallback={<RouteFallback />}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </div>
      <Footer />
    </div>
  );
}
