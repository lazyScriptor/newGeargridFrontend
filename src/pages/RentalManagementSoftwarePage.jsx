import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import Container from "../components/ui/Container";
import Button from "../components/ui/Button";
import SectionLabel from "../components/ui/SectionLabel";
import {
  IconCheck,
  IconArrowRight,
  IconBox,
  IconReceipt,
  IconWrench,
  IconChart,
  IconShield,
  IconLayers,
} from "../icons/Icons";
import { URLS } from "../lib/urls";
import { fadeUp, stagger, ease } from "../lib/motion";

// /rental-management-software — head-term landing page.
// Exact-match URL slug + exact-match H1 for the primary keyword.
// Distinct intent from the homepage: visitors arriving here came from a
// generic category search ("rental management software"), not a brand search.
// They want to know "what is this category and why GearGrid?" — so the page
// leads with definition + comparison, not with the macOS-style hero mockup.
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
          name: "Rental management software",
          item: "https://geargrid.live/rental-management-software",
        },
      ],
    },
    {
      "@type": "Product",
      "@id": "https://geargrid.live/rental-management-software#product",
      name: "GearGrid Rental Management Software",
      description:
        "Cloud rental management software for equipment, machinery, and tool rental businesses. Inventory, contracts, maintenance, and accounting unified on one multi-tenant platform.",
      brand: { "@type": "Brand", name: "GearGrid" },
      category: "BusinessApplication",
      image: "https://geargrid.live/og-image.png",
      url: "https://geargrid.live/rental-management-software",
      offers: {
        "@type": "AggregateOffer",
        priceCurrency: "LKR",
        lowPrice: "4900",
        highPrice: "9900",
        offerCount: 3,
        url: "https://geargrid.live/pricing",
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        reviewCount: "27",
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What is rental management software?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Rental management software is a category of business application that handles the full lifecycle of renting physical assets — inventory tracking, customer contracts, daily/weekly/monthly pricing, returns, late fees, maintenance, and the accounting tied to all of it. GearGrid is a multi-tenant SaaS in this category, purpose-built for equipment and machinery rental businesses.",
          },
        },
        {
          "@type": "Question",
          name: "Who is GearGrid's rental management software for?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Equipment rental operators, construction equipment dealers, tool rental shops, heavy machinery rental businesses, and any company that rents physical assets and needs to track inventory, contracts, maintenance, and accounting in one system.",
          },
        },
        {
          "@type": "Question",
          name: "How is GearGrid different from generic rental software?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "GearGrid bundles maintenance and accounting natively — most generic rental systems treat these as separate tools to integrate. Each tenant also runs on an isolated MySQL database (no shared tables), which matters for compliance and for businesses that don't want their data co-mingled with competitors.",
          },
        },
        {
          "@type": "Question",
          name: "Is GearGrid cloud-based or on-premise?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "GearGrid is cloud-native — runs in the browser, hosted on our infrastructure. Enterprise customers can request a dedicated database cluster or on-premise deployment as part of the Enterprise tier.",
          },
        },
      ],
    },
  ],
};

const KEY_CAPABILITIES = [
  {
    icon: IconBox,
    title: "Inventory & equipment tracking",
    desc: "Serial-level units, categories, depreciation, location history, bulk imports — the rental management core, done right.",
    color: "from-amber-400 to-orange-500",
  },
  {
    icon: IconReceipt,
    title: "Contracts, invoicing & POS",
    desc: "Quote → contract → return → invoice. Daily, weekly, and monthly pricing. Transport fees, deposits, partial returns, automated late fees.",
    color: "from-blue-400 to-indigo-500",
  },
  {
    icon: IconWrench,
    title: "Maintenance & defect tracking",
    desc: "Log defects on return, assign technicians, track repairs to resolution. No separate maintenance tool to license.",
    color: "from-rose-400 to-fuchsia-500",
  },
  {
    icon: IconChart,
    title: "Accounting & financial reporting",
    desc: "Live accounts receivable, payment recording, expense ledger, exportable financials. Built in — no QuickBooks integration needed for the basics.",
    color: "from-emerald-400 to-teal-500",
  },
  {
    icon: IconShield,
    title: "Multi-tenant data isolation",
    desc: "Each business runs on its own database. Your inventory, customers, and contracts never sit in a shared table.",
    color: "from-slate-700 to-slate-900",
  },
  {
    icon: IconLayers,
    title: "Roles & granular permissions",
    desc: "Admin, Manager, Technician, plus your custom roles. Lock down pricing, payments, and reports per user.",
    color: "from-violet-400 to-purple-500",
  },
];

const COMPARISON = [
  {
    feature: "Equipment & inventory tracking",
    geargrid: "Native — serial-level + bulk import",
    generic: "Often add-on or limited",
    spreadsheet: "Manual, error-prone",
  },
  {
    feature: "Rental contracts & invoicing",
    geargrid: "Built-in workflow",
    generic: "Built-in",
    spreadsheet: "Manual templates",
  },
  {
    feature: "Maintenance & defect tracking",
    geargrid: "Native module",
    generic: "Separate tool / integration",
    spreadsheet: "Not tracked",
  },
  {
    feature: "Accounting (AR, expenses)",
    geargrid: "Native module",
    generic: "External (QuickBooks, Xero)",
    spreadsheet: "Separate workbook",
  },
  {
    feature: "Multi-tenant data isolation",
    geargrid: "Per-tenant database",
    generic: "Shared tables",
    spreadsheet: "N/A",
  },
  {
    feature: "Role-based access control",
    geargrid: "Granular per-user",
    generic: "Basic role tiers",
    spreadsheet: "File-level only",
  },
];

const VERTICALS = [
  "Construction equipment rental",
  "Heavy machinery rental",
  "Tool rental shops",
  "Event & party equipment rental",
  "Industrial equipment dealers",
  "Generator & power rental",
];

export default function RentalManagementSoftwarePage() {
  return (
    <>
      <SEO
        title="Rental Management Software"
        description="GearGrid is rental management software for equipment, machinery, and tool rental businesses. Inventory, contracts, maintenance, and accounting on one secure multi-tenant cloud platform."
        path="/rental-management-software"
        jsonLd={jsonLd}
      />
      <main className="relative">
        {/* ── Hero ────────────────────────────────────────────────────────── */}
        <section className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-x-0 top-0 h-[600px] bg-gradient-to-b from-amber-50/60 via-white to-transparent" />
            <div
              aria-hidden
              className="absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 1px 1px, rgb(15 23 42) 1px, transparent 0)",
                backgroundSize: "32px 32px",
              }}
            />
          </div>

          <Container>
            {/* Breadcrumb */}
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
                  Rental management software
                </li>
              </ol>
            </nav>

            <motion.div
              variants={stagger(0.08)}
              initial="hidden"
              animate="visible"
              className="mx-auto max-w-4xl text-center"
            >
              <motion.div variants={fadeUp}>
                <SectionLabel>Category overview</SectionLabel>
              </motion.div>

              <motion.h1
                variants={fadeUp}
                className="text-balance text-5xl font-semibold leading-[1.05] tracking-tight text-slate-900 sm:text-6xl md:text-7xl"
              >
                Rental management software{" "}
                <span className="bg-gradient-to-br from-amber-500 via-orange-500 to-rose-500 bg-clip-text text-transparent">
                  for serious operators.
                </span>
              </motion.h1>

              <motion.p
                variants={fadeUp}
                className="mx-auto mt-7 max-w-2xl text-balance text-lg leading-relaxed text-slate-600 sm:text-xl"
              >
                GearGrid is cloud rental management software for equipment,
                machinery, and tool rental businesses — inventory, rental
                contracts, maintenance, and accounting on a single secure
                multi-tenant platform.
              </motion.p>

              <motion.div
                variants={fadeUp}
                className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
              >
                <Button as="a" href={URLS.login} variant="primary" size="lg" external>
                  Launch console
                  <IconArrowRight size={18} />
                </Button>
                <Button as="Link" to="/contact?type=demo" variant="secondary" size="lg">
                  Request a demo
                </Button>
              </motion.div>
            </motion.div>
          </Container>
        </section>

        {/* ── What is rental management software ─────────────────────────── */}
        <section className="relative py-20 sm:py-24">
          <Container>
            <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-2">
              <div>
                <SectionLabel>Definition</SectionLabel>
                <h2 className="text-balance text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
                  What rental management software actually does.
                </h2>
              </div>
              <div className="space-y-5 text-base leading-relaxed text-slate-600">
                <p>
                  Rental management software handles the full lifecycle of
                  renting physical assets — tracking inventory, drafting
                  customer contracts, applying daily/weekly/monthly pricing,
                  processing returns and late fees, scheduling maintenance, and
                  reconciling the accounting tied to all of it.
                </p>
                <p>
                  For an equipment rental business, a real rental management
                  system replaces a stack of disconnected tools: a spreadsheet
                  for inventory, a Word template for contracts, a separate
                  invoicing app, a maintenance log on paper, and an accountant
                  who reconciles it all monthly. GearGrid does all of that in
                  one console.
                </p>
                <p>
                  The four pillars are{" "}
                  <strong className="font-medium text-slate-900">
                    inventory, rentals &amp; invoicing, maintenance, and
                    accounting
                  </strong>{" "}
                  — and they work better as one system than as four
                  integrations.
                </p>
              </div>
            </div>
          </Container>
        </section>

        {/* ── Capabilities grid ─────────────────────────────────────────── */}
        <section className="relative py-20 sm:py-24 bg-slate-50/40">
          <Container>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={stagger()}
              className="mx-auto max-w-2xl text-center"
            >
              <motion.div variants={fadeUp}>
                <SectionLabel>Core capabilities</SectionLabel>
              </motion.div>
              <motion.h2
                variants={fadeUp}
                className="text-balance text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl"
              >
                Built for the way rental businesses operate.
              </motion.h2>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={stagger(0.06)}
              className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
            >
              {KEY_CAPABILITIES.map((c) => (
                <motion.div
                  key={c.title}
                  variants={fadeUp}
                  className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-[0_30px_60px_-30px_rgba(15,23,42,0.25)]"
                >
                  <div
                    className={`mb-5 grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br ${c.color} text-white shadow-lg`}
                  >
                    <c.icon size={22} />
                  </div>
                  <h3 className="text-xl font-semibold tracking-tight text-slate-900">
                    {c.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-slate-600">
                    {c.desc}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </Container>
        </section>

        {/* ── Comparison table ──────────────────────────────────────────── */}
        <section className="relative py-20 sm:py-24">
          <Container>
            <div className="mx-auto max-w-2xl text-center">
              <SectionLabel>How it compares</SectionLabel>
              <h2 className="text-balance text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
                GearGrid vs. generic rental software vs. spreadsheets.
              </h2>
              <p className="mt-5 text-balance text-lg text-slate-600">
                Where GearGrid wins, where it ties, and what you give up by
                running on spreadsheets.
              </p>
            </div>

            <div className="mx-auto mt-14 max-w-5xl overflow-hidden rounded-2xl border border-slate-200">
              <div className="grid grid-cols-4 bg-slate-900 px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-300">
                <div>Capability</div>
                <div className="text-amber-300">GearGrid</div>
                <div>Generic rental tool</div>
                <div>Spreadsheets</div>
              </div>
              {COMPARISON.map((row, i) => (
                <div
                  key={row.feature}
                  className={`grid grid-cols-4 gap-4 border-t border-slate-200 px-6 py-4 text-sm ${
                    i % 2 === 0 ? "bg-white" : "bg-slate-50/60"
                  }`}
                >
                  <div className="font-medium text-slate-900">
                    {row.feature}
                  </div>
                  <div className="flex items-start gap-2 text-slate-700">
                    <span className="mt-0.5 grid h-4 w-4 flex-none place-items-center rounded-full bg-emerald-100 text-emerald-700">
                      <IconCheck size={10} />
                    </span>
                    {row.geargrid}
                  </div>
                  <div className="text-slate-600">{row.generic}</div>
                  <div className="text-slate-600">{row.spreadsheet}</div>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* ── Verticals ─────────────────────────────────────────────────── */}
        <section className="relative py-20 sm:py-24 bg-slate-50/40">
          <Container>
            <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-2 lg:items-center">
              <div>
                <SectionLabel>Who runs on GearGrid</SectionLabel>
                <h2 className="text-balance text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
                  Equipment, machinery, and tool rental businesses.
                </h2>
                <p className="mt-5 text-base leading-relaxed text-slate-600">
                  GearGrid is purpose-built for businesses that rent physical
                  assets — from a single warehouse with a few hundred units to
                  multi-depot operators with thousands of pieces of heavy
                  machinery in motion.
                </p>
                <div className="mt-8">
                  <Button as="Link" to="/contact?type=demo" variant="primary" size="md">
                    See it on your fleet
                    <IconArrowRight size={16} />
                  </Button>
                </div>
              </div>
              <ul className="grid gap-3 sm:grid-cols-2">
                {VERTICALS.map((v) => (
                  <li
                    key={v}
                    className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-700"
                  >
                    <span className="mt-0.5 grid h-5 w-5 flex-none place-items-center rounded-full bg-amber-100 text-amber-700">
                      <IconCheck size={12} />
                    </span>
                    {v}
                  </li>
                ))}
              </ul>
            </div>
          </Container>
        </section>

        {/* ── CTA ───────────────────────────────────────────────────────── */}
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
                    "radial-gradient(ellipse at center, rgba(245,158,11,0.25), rgba(15,23,42,0) 60%)",
                }}
              />
              <h2 className="relative z-10 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
                Ready to run your rental business on one platform?
              </h2>
              <p className="relative z-10 mx-auto mt-4 max-w-xl text-balance text-slate-300">
                Talk to our team for a guided demo on your own fleet data, or
                jump straight into the console.
              </p>
              <div className="relative z-10 mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Button as="Link" to="/contact?type=demo" variant="accent" size="lg">
                  Request a demo
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
              <p className="relative z-10 mt-6 text-sm text-slate-400">
                See the full{" "}
                <Link to="/features" className="text-amber-300 underline-offset-4 hover:underline">
                  feature breakdown
                </Link>{" "}
                or{" "}
                <Link to="/pricing" className="text-amber-300 underline-offset-4 hover:underline">
                  compare pricing tiers
                </Link>
                .
              </p>
            </motion.div>
          </Container>
        </section>
      </main>
    </>
  );
}
