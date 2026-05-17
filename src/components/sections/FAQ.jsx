import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Container from "../ui/Container";
import SectionLabel from "../ui/SectionLabel";
import { fadeUp, stagger } from "../../lib/motion";

// IMPORTANT: keep these questions/answers byte-aligned with the FAQPage JSON-LD
// in LandingPage.jsx. Google compares JSON-LD to on-page content and demotes
// pages where the structured data doesn't match what users see.
const FAQS = [
  {
    q: "What is GearGrid?",
    a: "GearGrid is a multi-tenant SaaS platform that unifies equipment inventory, rentals & invoicing, maintenance workflows, and accounting into a single secure console built for equipment rental businesses.",
  },
  {
    q: "Is my data isolated from other tenants?",
    a: "Yes — each tenant runs on its own MySQL database. There are no shared tables and no cross-tenant queries by architecture, not by promise.",
  },
  {
    q: "Do I need separate tools for accounting and maintenance?",
    a: "No. GearGrid includes maintenance (defect logging, technician assignment, repair tracking) and accounting (live AR, payment recording, expense ledger) as native modules — no integrations required.",
  },
  {
    q: "How much does GearGrid cost?",
    a: "Starter is LKR 4,900/month for a single warehouse, Pro is LKR 9,900/month for unlimited equipment and multi-warehouse support, and Enterprise is custom-priced with a dedicated DB cluster and SLAs.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="relative py-24 sm:py-32">
      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger()}
          className="mx-auto max-w-2xl text-center"
        >
          <motion.div variants={fadeUp}>
            <SectionLabel>Common questions</SectionLabel>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="text-balance text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl"
          >
            Everything else you wanted to ask.
          </motion.h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={stagger(0.06)}
          className="mx-auto mt-14 max-w-3xl divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white shadow-sm"
        >
          {FAQS.map((f, i) => {
            const isOpen = openIndex === i;
            return (
              <motion.div key={f.q} variants={fadeUp}>
                <h3>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${i}`}
                    onClick={() => setOpenIndex(isOpen ? -1 : i)}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left text-base font-semibold text-slate-900 transition-colors hover:bg-slate-50 sm:text-lg"
                  >
                    <span>{f.q}</span>
                    <span
                      aria-hidden
                      className={`grid h-7 w-7 flex-none place-items-center rounded-full bg-slate-100 text-slate-600 transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.4"
                        strokeLinecap="round"
                      >
                        <path d="M12 5v14M5 12h14" />
                      </svg>
                    </span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-panel-${i}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-6 pt-0 text-base leading-relaxed text-slate-600">
                        {f.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 text-center text-sm text-slate-500"
        >
          Have a question we didn't cover?{" "}
          <a
            href="/contact"
            className="font-medium text-slate-900 underline-offset-4 hover:underline"
          >
            Ask us directly
          </a>
          .
        </motion.p>
      </Container>
    </section>
  );
}
