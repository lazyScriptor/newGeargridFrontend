import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import Container from "../components/ui/Container";
import Button from "../components/ui/Button";
import SectionLabel from "../components/ui/SectionLabel";
import { IconCheck, IconArrowRight } from "../icons/Icons";
import { URLS } from "../lib/urls";
import { fadeUp, stagger, ease } from "../lib/motion";

// /pricing — dedicated pricing page. Different intent than /#pricing on the
// homepage: arrivals here are price-shopping (Google "GearGrid pricing" or
// "rental management software cost"). So we expand into a full comparison
// table + pricing FAQ + ROI framing.
const TIERS = [
  {
    name: "Starter",
    price: "Rs 4,900",
    cadence: "/ month",
    monthly: 4900,
    blurb: "Everything you need to run a single warehouse.",
    cta: "Start with Starter",
    accent: false,
    bestFor: "Single warehouse, < 200 units, small team",
    features: [
      "Up to 200 equipment units",
      "Up to 3 users",
      "Inventory & rentals",
      "Maintenance module",
      "Email support",
    ],
  },
  {
    name: "Pro",
    price: "Rs 9,900",
    cadence: "/ month",
    monthly: 9900,
    blurb: "For growing operators with multiple warehouses.",
    cta: "Start free trial",
    accent: true,
    badge: "Most popular",
    bestFor: "Multi-warehouse, growing fleet, mid-size team",
    features: [
      "Unlimited equipment units",
      "Up to 15 users",
      "Multi-warehouse support",
      "Accounting & expense ledger",
      "Customer collateral workflow",
      "Priority email + chat support",
    ],
  },
  {
    name: "Enterprise",
    price: "Custom",
    cadence: "",
    monthly: null,
    blurb: "Custom integrations, dedicated DB, SLAs.",
    cta: "Talk to sales",
    accent: false,
    bestFor: "Large operators, regulated industries, on-prem",
    features: [
      "Everything in Pro",
      "Unlimited users",
      "Dedicated DB cluster",
      "Custom integrations / API",
      "99.9% SLA",
      "Dedicated success engineer",
    ],
  },
];

const COMPARE = [
  ["Equipment units", "Up to 200", "Unlimited", "Unlimited"],
  ["Users", "Up to 3", "Up to 15", "Unlimited"],
  ["Warehouses", "1", "Unlimited", "Unlimited"],
  ["Inventory module", true, true, true],
  ["Rentals & invoicing", true, true, true],
  ["Maintenance module", true, true, true],
  ["Accounting module", false, true, true],
  ["Customer collateral workflow", false, true, true],
  ["Multi-warehouse transfers", false, true, true],
  ["Dedicated DB cluster", false, false, true],
  ["Custom integrations / API", false, false, true],
  ["SSO (Google Workspace)", false, false, true],
  ["99.9% uptime SLA", false, false, true],
  ["Support", "Email", "Email + chat (priority)", "Dedicated engineer"],
];

const PRICING_FAQ = [
  {
    q: "Is there a free trial?",
    a: "Pro plans include a 14-day free trial — no card required. Starter and Enterprise are evaluated via a guided demo.",
  },
  {
    q: "Can I switch tiers later?",
    a: "Yes. Upgrade any time and pay the prorated difference. Downgrades take effect at the start of the next billing cycle.",
  },
  {
    q: "Are prices in Sri Lankan Rupees?",
    a: "Starter and Pro are listed in LKR. Enterprise contracts can be denominated in USD, EUR, or LKR depending on the region.",
  },
  {
    q: "Do you charge for additional users?",
    a: "No per-seat fees within the published user limits. Need more users than the tier allows? Move up a tier — there are no surprise overage charges.",
  },
  {
    q: "What if I need to cancel?",
    a: "Cancel any time from the console — no annual lock-in on Starter or Pro. Enterprise contracts typically run 12 months with a notice clause.",
  },
  {
    q: "Is there a setup fee?",
    a: "No setup fees on Starter or Pro. Enterprise customers who request on-prem deployment or data migration from a legacy system pay a one-time implementation fee scoped to the work.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://geargrid.live/",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Pricing",
          item: "https://geargrid.live/pricing",
        },
      ],
    },
    {
      "@type": "Product",
      "@id": "https://geargrid.live/pricing#product",
      name: "GearGrid",
      description:
        "Rental management software for equipment rental businesses. Three tiers: Starter, Pro, and Enterprise.",
      brand: { "@type": "Brand", name: "GearGrid" },
      offers: {
        "@type": "AggregateOffer",
        priceCurrency: "LKR",
        lowPrice: "4900",
        highPrice: "9900",
        offerCount: 3,
        url: "https://geargrid.live/pricing",
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: PRICING_FAQ.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    },
  ],
};

function Cell({ value }) {
  if (value === true) {
    return (
      <span className="inline-grid h-5 w-5 place-items-center rounded-full bg-emerald-100 text-emerald-700">
        <IconCheck size={12} />
      </span>
    );
  }
  if (value === false) {
    return <span className="text-slate-300">—</span>;
  }
  return <span className="text-slate-700">{value}</span>;
}

export default function PricingPage() {
  return (
    <>
      <SEO
        title="Pricing — GearGrid rental management software"
        description="Transparent pricing for GearGrid rental management software. Starter from Rs 4,900/month, Pro from Rs 9,900/month, plus custom Enterprise. No setup fees. Cancel anytime."
        path="/pricing"
        jsonLd={jsonLd}
      />
      <main className="relative">
        {/* ── Hero ──────────────────────────────────────────────────────── */}
        <section className="relative overflow-hidden pt-32 pb-12 sm:pt-40 sm:pb-16">
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-x-0 top-0 h-[500px] bg-gradient-to-b from-amber-50/60 via-white to-transparent" />
          </div>

          <Container>
            <nav
              aria-label="Breadcrumb"
              className="mx-auto mb-8 max-w-4xl text-center text-sm text-slate-500"
            >
              <ol className="inline-flex items-center gap-2">
                <li>
                  <Link to="/" className="hover:text-slate-900">
                    Home
                  </Link>
                </li>
                <li aria-hidden>/</li>
                <li className="text-slate-900" aria-current="page">
                  Pricing
                </li>
              </ol>
            </nav>

            <motion.div
              variants={stagger(0.08)}
              initial="hidden"
              animate="visible"
              className="mx-auto max-w-3xl text-center"
            >
              <motion.div variants={fadeUp}>
                <SectionLabel>Pricing</SectionLabel>
              </motion.div>
              <motion.h1
                variants={fadeUp}
                className="text-balance text-5xl font-semibold leading-[1.05] tracking-tight text-slate-900 sm:text-6xl"
              >
                Plans that{" "}
                <span className="bg-gradient-to-br from-amber-500 via-orange-500 to-rose-500 bg-clip-text text-transparent">
                  pay for themselves.
                </span>
              </motion.h1>
              <motion.p
                variants={fadeUp}
                className="mx-auto mt-6 max-w-2xl text-balance text-lg text-slate-600"
              >
                Pricing in Sri Lankan Rupees. No setup fees. Cancel any time.
                Most operators cover the monthly cost with a single avoided
                late-fee miss.
              </motion.p>
            </motion.div>
          </Container>
        </section>

        {/* ── Tier cards ──────────────────────────────────────────────── */}
        <section className="relative pb-12">
          <Container>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={stagger(0.08)}
              className="grid gap-6 lg:grid-cols-3"
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
                    <h2 className="text-xl font-semibold tracking-tight">
                      {t.name}
                    </h2>
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

                  <div
                    className={`mt-3 text-xs ${
                      t.accent ? "text-amber-300" : "text-amber-700"
                    }`}
                  >
                    Best for: {t.bestFor}
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
                        <span
                          className={t.accent ? "text-slate-200" : "text-slate-700"}
                        >
                          {f}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8">
                    <Button
                      as="Link"
                      to={
                        t.name === "Enterprise"
                          ? "/contact?type=sales"
                          : "/contact?type=demo"
                      }
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
          </Container>
        </section>

        {/* ── Comparison table ─────────────────────────────────────────── */}
        <section className="relative py-20 sm:py-24">
          <Container>
            <div className="mx-auto max-w-2xl text-center">
              <SectionLabel>Compare plans</SectionLabel>
              <h2 className="text-balance text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
                Side-by-side.
              </h2>
              <p className="mt-5 text-balance text-lg text-slate-600">
                Every feature, every tier. No asterisks.
              </p>
            </div>

            <div className="mx-auto mt-14 max-w-5xl overflow-x-auto rounded-2xl border border-slate-200">
              <table className="w-full text-sm">
                <thead className="bg-slate-900 text-xs font-semibold uppercase tracking-wider text-slate-300">
                  <tr>
                    <th className="px-6 py-4 text-left">Capability</th>
                    <th className="px-6 py-4 text-left">Starter</th>
                    <th className="px-6 py-4 text-left text-amber-300">Pro</th>
                    <th className="px-6 py-4 text-left">Enterprise</th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARE.map((row, i) => (
                    <tr
                      key={row[0]}
                      className={`border-t border-slate-200 ${
                        i % 2 === 0 ? "bg-white" : "bg-slate-50/60"
                      }`}
                    >
                      <td className="px-6 py-4 font-medium text-slate-900">
                        {row[0]}
                      </td>
                      <td className="px-6 py-4">
                        <Cell value={row[1]} />
                      </td>
                      <td className="px-6 py-4">
                        <Cell value={row[2]} />
                      </td>
                      <td className="px-6 py-4">
                        <Cell value={row[3]} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Container>
        </section>

        {/* ── Pricing FAQ ──────────────────────────────────────────────── */}
        <section className="relative py-20 sm:py-24 bg-slate-50/40">
          <Container>
            <div className="mx-auto max-w-2xl text-center">
              <SectionLabel>Pricing FAQ</SectionLabel>
              <h2 className="text-balance text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
                Common questions.
              </h2>
            </div>

            <div className="mx-auto mt-14 max-w-3xl divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white">
              {PRICING_FAQ.map((item) => (
                <details
                  key={item.q}
                  className="group px-6 py-5 [&_summary]:cursor-pointer"
                >
                  <summary className="flex items-center justify-between gap-4 text-base font-medium text-slate-900">
                    {item.q}
                    <span
                      aria-hidden
                      className="grid h-6 w-6 flex-none place-items-center rounded-full bg-slate-100 text-slate-600 transition-transform group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">
                    {item.a}
                  </p>
                </details>
              ))}
            </div>
          </Container>
        </section>

        {/* ── CTA ──────────────────────────────────────────────────────── */}
        <section className="relative py-20 sm:py-24">
          <Container>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease }}
              className="relative mx-auto max-w-4xl overflow-hidden rounded-3xl bg-slate-900 px-8 py-16 text-center text-white sm:px-16"
            >
              <div
                aria-hidden
                className="absolute inset-0 -z-0 opacity-50"
                style={{
                  background:
                    "radial-gradient(ellipse at center, rgba(245,158,11,0.22), rgba(15,23,42,0) 60%)",
                }}
              />
              <h2 className="relative z-10 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
                Not sure which plan fits?
              </h2>
              <p className="relative z-10 mx-auto mt-4 max-w-xl text-balance text-slate-300">
                Tell us about your fleet, team size, and warehouses — we'll
                point you at the right tier in 5 minutes.
              </p>
              <div className="relative z-10 mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Button as="Link" to="/contact?type=sales" variant="accent" size="lg">
                  Talk to sales
                  <IconArrowRight size={18} />
                </Button>
                <Button
                  as="a"
                  href={URLS.login}
                  variant="outlineDark"
                  size="lg"
                  external
                >
                  Launch console
                </Button>
              </div>
            </motion.div>
          </Container>
        </section>
      </main>
    </>
  );
}
