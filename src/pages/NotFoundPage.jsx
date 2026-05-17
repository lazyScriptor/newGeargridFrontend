import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import SEO from "../components/SEO";
import Container from "../components/ui/Container";
import Button from "../components/ui/Button";
import { IconArrowRight } from "../icons/Icons";
import { fadeUp, ease } from "../lib/motion";

// Real 404 page — replaces the previous catch-all redirect to /.
// Redirecting unknown URLs to / is bad for SEO (it returns 200 + identical
// content as the home page, which Google treats as duplicate). A dedicated
// page with `noindex` keeps the crawler graph clean.
export default function NotFoundPage() {
  return (
    <>
      <SEO
        title="Page not found"
        description="The page you're looking for doesn't exist on GearGrid."
        path="/404"
        noIndex
      />
      <main className="relative min-h-[80vh]">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[400px] bg-gradient-to-b from-amber-50/60 via-white to-transparent"
        />
        <section className="pt-32 pb-24 sm:pt-40 sm:pb-32">
          <Container>
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              transition={{ ease }}
              className="mx-auto max-w-2xl text-center"
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50/70 px-4 py-1.5 text-xs font-medium text-amber-900">
                404 · Not found
              </div>
              <h1 className="mt-6 text-balance text-5xl font-semibold leading-[1.05] tracking-tight text-slate-900 sm:text-6xl">
                We couldn't find{" "}
                <span className="bg-gradient-to-br from-amber-500 to-orange-500 bg-clip-text text-transparent">
                  that page.
                </span>
              </h1>
              <p className="mx-auto mt-6 max-w-md text-balance text-lg text-slate-600">
                The link may be broken, the page may have moved, or it never
                existed. Here's where you probably wanted to go:
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Button as="Link" to="/" variant="primary" size="lg">
                  Back to home
                  <IconArrowRight size={18} />
                </Button>
                <Button as="Link" to="/contact" variant="secondary" size="lg">
                  Contact support
                </Button>
              </div>

              {/* Site map for crawlers + users */}
              <div className="mt-16 grid gap-4 text-left sm:grid-cols-2">
                {[
                  { to: "/", label: "Home", desc: "Product, pricing, and FAQs" },
                  { to: "/contact", label: "Contact", desc: "Ask a question or request a demo" },
                  { to: "/#features", label: "Features", desc: "What GearGrid includes" },
                  { to: "/#pricing", label: "Pricing", desc: "Starter, Pro, and Enterprise tiers" },
                ].map((l) => (
                  <Link
                    key={l.to}
                    to={l.to}
                    className="rounded-2xl border border-slate-200 bg-white p-5 transition-all hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-sm"
                  >
                    <div className="text-sm font-semibold text-slate-900">
                      {l.label}
                    </div>
                    <div className="mt-1 text-sm text-slate-600">{l.desc}</div>
                  </Link>
                ))}
              </div>
            </motion.div>
          </Container>
        </section>
      </main>
    </>
  );
}
