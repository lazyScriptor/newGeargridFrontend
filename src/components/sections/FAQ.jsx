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
    q: "What kind of rental businesses is GearGrid built for?",
    a: "GearGrid is purpose-built for equipment rental businesses — including cameras and cinema equipment, AV sound and lighting, party and wedding rentals, power tools, generators, and event gear.",
  },
  {
    q: "Can my non-technical counter staff learn to use it quickly?",
    a: "Yes. The system is intentionally designed with zero technical barrier. If your staff can use WhatsApp or Facebook on a phone, they can comfortably search stock, create invoices, and check in returns within 15 minutes. Step-by-step video tutorials in Sinhala and English are provided.",
  },
  {
    q: "How does the ID Card Security Vault protect my equipment?",
    a: "When a customer rents high-value gear, counter staff record their National Identity Card (NIC) or Passport number and lock their collateral status in the system. The invoice tracks the held ID card until all equipment is returned and inspected at the counter.",
  },
  {
    q: "What happens when a customer returns equipment late or damaged?",
    a: "Overdue late fees are calculated automatically on the final bill based on your rates, preventing awkward counter disputes. If gear is damaged, staff log the defect right on the return record, charge the customer repair deduction, and automatically route the item to the workshop queue.",
  },
  {
    q: "Can I monitor my shop from my mobile phone?",
    a: "Yes. GearGrid is mobile-first and optimized for standard 4G smartphone connections. You can check today's collections, dispatched equipment, and overdue returns from anywhere in the world on your phone, tablet, or laptop.",
  },
  {
    q: "Is my customer database and revenue confidential?",
    a: "100% confidential. Your customer lists, rental pricing, and business revenue are securely isolated and automatically backed up daily in the cloud. No other business ever has access to your records.",
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
