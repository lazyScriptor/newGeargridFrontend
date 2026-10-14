import { useState } from "react";
import { motion } from "framer-motion";
import Container from "../ui/Container";
import SectionLabel from "../ui/SectionLabel";
import Button from "../ui/Button";
import { IconCheck } from "../../icons/Icons";
import { fadeUp, stagger } from "../../lib/motion";

export default function Pricing() {
  const [currency, setCurrency] = useState("LKR"); // "LKR" | "USD"

  const TIERS = [
    {
      name: "Starter",
      price: currency === "LKR" ? "Rs. 4,900" : "$19",
      cadence: "/ month",
      blurb: "Perfect for single-location camera, AV, party, or tool rental shops.",
      features: [
        "Up to 200 equipment items & serials",
        "Up to 3 staff counter accounts",
        "Fast 30-sec Point-of-Sale checkout",
        "Customer ID Card Security Vault",
        "Automated late fee calculation",
        "1-Click WhatsApp & PDF invoice dispatch",
        "Personal onboarding support",
      ],
      cta: "Start with Starter",
      accent: false,
    },
    {
      name: "Pro",
      price: currency === "LKR" ? "Rs. 9,900" : "$39",
      cadence: "/ month",
      blurb: "For busy rental businesses with heavy weekend demand and staff.",
      features: [
        "Unlimited equipment items & serials",
        "Up to 15 staff accounts with roles",
        "Multi-warehouse & location tracking",
        "Workshop repairs & defect triage queue",
        "Live Accounts Receivable & cash reconciliation",
        "Partial returns & damage fee adjustments",
        "Direct founder WhatsApp & phone support",
      ],
      cta: "Choose Pro",
      accent: true,
      badge: "Most Popular",
    },
    {
      name: "Enterprise",
      price: "Custom",
      cadence: "",
      blurb: "For multi-city operations, large fleets, or custom workflows.",
      features: [
        "Everything in Pro with unlimited staff",
        "Custom invoice & contract legal terms",
        "Dedicated cloud database cluster",
        "Custom integration & API access",
        "99.9% uptime SLA guarantee",
        "On-site or dedicated 1-on-1 team training",
      ],
      cta: "Talk to us",
      accent: false,
    },
  ];

  return (
    <section id="pricing" className="relative py-20 sm:py-28 bg-white">
      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger()}
          className="mx-auto max-w-2xl text-center"
        >
          <motion.div variants={fadeUp}>
            <SectionLabel>Transparent Pricing</SectionLabel>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="text-balance text-3xl font-bold tracking-tight text-slate-900 sm:text-5xl"
          >
            Simple, honest plans.{" "}
            <span className="text-amber-600">Zero hidden fees.</span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mt-4 text-balance text-base text-slate-600 sm:text-lg"
          >
            Pays for itself with just one uncollected late fee or one saved lost accessory per month.
          </motion.p>

          {/* Currency Switcher */}
          <motion.div
            variants={fadeUp}
            className="mt-8 inline-flex items-center rounded-full border border-slate-200 bg-slate-100 p-1 text-xs font-bold"
          >
            <button
              type="button"
              onClick={() => setCurrency("LKR")}
              className={`flex items-center gap-1.5 rounded-full px-4 py-2 transition-all ${
                currency === "LKR"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <span>🇱🇰</span> LKR (Sri Lanka)
            </button>
            <button
              type="button"
              onClick={() => setCurrency("USD")}
              className={`flex items-center gap-1.5 rounded-full px-4 py-2 transition-all ${
                currency === "USD"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <span>🌐</span> USD (International)
            </button>
          </motion.div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={stagger(0.08)}
          className="mt-14 grid gap-6 lg:grid-cols-3"
        >
          {TIERS.map((t) => (
            <motion.div
              key={t.name}
              variants={fadeUp}
              className={`relative flex flex-col rounded-2xl p-7 transition-all duration-300 ${
                t.accent
                  ? "border-2 border-slate-900 bg-slate-900 text-white shadow-xl"
                  : "border border-slate-200 bg-white text-slate-900 shadow-sm hover:-translate-y-1 hover:shadow-md hover:border-amber-300"
              }`}
            >
              {t.badge && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-3.5 py-0.5 text-xs font-bold text-slate-950 shadow-md">
                  {t.badge}
                </span>
              )}

              <div>
                <h3 className="text-xl font-bold tracking-tight">{t.name}</h3>
                <p
                  className={`mt-2 text-xs leading-relaxed ${
                    t.accent ? "text-slate-300" : "text-slate-500"
                  }`}
                >
                  {t.blurb}
                </p>
              </div>

              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-4xl font-extrabold tracking-tight">
                  {t.price}
                </span>
                <span
                  className={`text-xs font-semibold ${
                    t.accent ? "text-slate-400" : "text-slate-500"
                  }`}
                >
                  {t.cadence}
                </span>
              </div>

              <ul className="mt-6 flex-1 space-y-2.5">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-xs font-medium leading-relaxed">
                    <span
                      className={`mt-0.5 flex h-4 w-4 flex-none items-center justify-center rounded-full ${
                        t.accent
                          ? "bg-amber-400/20 text-amber-300"
                          : "bg-emerald-100 text-emerald-700"
                      }`}
                    >
                      <IconCheck size={10} />
                    </span>
                    <span className={t.accent ? "text-slate-200" : "text-slate-700"}>
                      {f}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <Button
                  as="Link"
                  to="/contact"
                  variant={t.accent ? "accent" : "primary"}
                  size="md"
                  className="w-full"
                >
                  {t.cta}
                </Button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 rounded-xl border border-amber-200/80 bg-amber-50/70 p-4 text-center text-xs text-amber-900"
        >
          <span className="font-bold">No setup fee · Cancel anytime · Assisted inventory upload included</span>
          <span className="hidden sm:inline"> — Have questions? </span>
          <a
            href="/contact?type=sales"
            className="font-bold underline ml-1 hover:text-amber-950"
          >
            Chat with us on WhatsApp or request a personal walkthrough →
          </a>
        </motion.div>
      </Container>
    </section>
  );
}

