import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Container from "../ui/Container";
import Button from "../ui/Button";
import Logo from "../ui/Logo";
import { IconMenu, IconClose, IconArrowRight } from "../../icons/Icons";
import { URLS } from "../../lib/urls";

const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "Modules", href: "#modules" },
  { label: "Pricing", href: "#pricing" },
  { label: "Contact", to: "/contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-slate-200/60 bg-white/80 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <Container className="flex h-16 items-center justify-between sm:h-20">
        <Link to="/" className="text-slate-900">
          <Logo size={32} />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((l) =>
            l.to ? (
              <Link
                key={l.label}
                to={l.to}
                className="rounded-full px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900"
              >
                {l.label}
              </Link>
            ) : (
              <a
                key={l.label}
                href={l.href}
                className="rounded-full px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900"
              >
                {l.label}
              </a>
            ),
          )}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Button as="a" href={URLS.login} variant="ghost" size="sm" external>
            Sign in
          </Button>
          <Button as="a" href={URLS.login} variant="primary" size="sm" external>
            Launch console
            <IconArrowRight size={16} />
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
          className="grid place-items-center rounded-full p-2 text-slate-900 hover:bg-slate-100 md:hidden"
        >
          {open ? <IconClose size={22} /> : <IconMenu size={22} />}
        </button>
      </Container>

      {/* Mobile sheet */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="border-t border-slate-200 bg-white md:hidden"
          >
            <Container className="flex flex-col gap-1 py-4">
              {NAV_LINKS.map((l) =>
                l.to ? (
                  <Link
                    key={l.label}
                    to={l.to}
                    className="rounded-xl px-3 py-3 text-base font-medium text-slate-700 hover:bg-slate-100"
                  >
                    {l.label}
                  </Link>
                ) : (
                  <a
                    key={l.label}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="rounded-xl px-3 py-3 text-base font-medium text-slate-700 hover:bg-slate-100"
                  >
                    {l.label}
                  </a>
                ),
              )}
              <div className="mt-3 flex flex-col gap-2 border-t border-slate-200 pt-3">
                <Button as="a" href={URLS.login} variant="secondary" external>
                  Sign in
                </Button>
                <Button as="a" href={URLS.login} variant="primary" external>
                  Launch console
                  <IconArrowRight size={16} />
                </Button>
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
