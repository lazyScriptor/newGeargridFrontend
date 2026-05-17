import { motion } from "framer-motion";
import Container from "../ui/Container";
import SectionLabel from "../ui/SectionLabel";
import Button from "../ui/Button";
import { IconCheck } from "../../icons/Icons";
import { fadeUp, stagger } from "../../lib/motion";

const TIERS = [
  {
    name: "Starter",
    price: "Rs 4,900",
    cadence: "/ month",
    blurb: "Everything you need to run a single warehouse.",
    features: [
      "Up to 200 equipment units",
      "Up to 3 users",
      "Inventory & rentals",
      "Maintenance module",
      "Email support",
    ],
    cta: "Get started",
    accent: false,
  },
  {
    name: "Pro",
    price: "Rs 9,900",
    cadence: "/ month",
    blurb: "For growing operators with multiple warehouses.",
    features: [
      "Unlimited equipment units",
      "Up to 15 users",
      "Multi-warehouse support",
      "Accounting & expense ledger",
      "Customer collateral workflow",
      "Priority email + chat support",
    ],
    cta: "Start free trial",
    accent: true,
    badge: "Most popular",
  },
  {
    name: "Enterprise",
    price: "Custom",
    cadence: "",
    blurb: "Custom integrations, dedicated DB, SLAs.",
    features: [
      "Everything in Pro",
      "Unlimited users",
      "Dedicated DB cluster",
      "Custom integrations / API",
      "99.9% SLA",
      "Dedicated success engineer",
    ],
    cta: "Talk to sales",
    accent: false,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="relative py-24 sm:py-32">
      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger()}
          className="mx-auto max-w-2xl text-center"
        >
          <motion.div variants={fadeUp}>
            <SectionLabel>Pricing</SectionLabel>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="text-balance text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl"
          >
            Simple plans.{" "}
            <span className="text-slate-400">Scale when you do.</span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mt-5 text-lg text-slate-600"
          >
            Pricing in Sri Lankan Rupees. Cancel any time. No setup fees.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={stagger(0.08)}
          className="mt-16 grid gap-6 lg:grid-cols-3"
        >
          {TIERS.map((t) => (
            <motion.div
              key={t.name}
              variants={fadeUp}
              className={`relative flex flex-col rounded-2xl p-8 transition-all duration-300 ${
                t.accent
                  ? "border-2 border-slate-900 bg-slate-900 text-white shadow-[0_30px_60px_-20px_rgba(15,23,42,0.5)]"
                  : "border border-slate-200 bg-white text-slate-900 hover:-translate-y-1 hover:shadow-[0_30px_60px_-30px_rgba(15,23,42,0.25)]"
              }`}
            >
              {t.badge && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 px-4 py-1 text-xs font-semibold text-slate-900 shadow-md">
                  {t.badge}
                </span>
              )}

              <div>
                <h3 className="text-xl font-semibold tracking-tight">{t.name}</h3>
                <p
                  className={`mt-2 text-sm ${
                    t.accent ? "text-slate-300" : "text-slate-600"
                  }`}
                >
                  {t.blurb}
                </p>
              </div>

              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-5xl font-semibold tracking-tight">
                  {t.price}
                </span>
                <span
                  className={`text-sm ${
                    t.accent ? "text-slate-400" : "text-slate-500"
                  }`}
                >
                  {t.cadence}
                </span>
              </div>

              <ul className="mt-8 flex-1 space-y-3">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm">
                    <span
                      className={`mt-0.5 grid h-5 w-5 flex-none place-items-center rounded-full ${
                        t.accent
                          ? "bg-amber-400/20 text-amber-300"
                          : "bg-emerald-100 text-emerald-700"
                      }`}
                    >
                      <IconCheck size={12} />
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

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-10 text-center text-sm text-slate-500"
        >
          Need to discuss volume pricing or on-prem deployment?{" "}
          <a
            href="/contact?type=sales"
            className="font-medium text-slate-900 underline-offset-4 hover:underline"
          >
            Get in touch
          </a>
          .
        </motion.p>
      </Container>
    </section>
  );
}
