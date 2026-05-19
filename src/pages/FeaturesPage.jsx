import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import Container from "../components/ui/Container";
import Button from "../components/ui/Button";
import SectionLabel from "../components/ui/SectionLabel";
import {
  IconBox,
  IconReceipt,
  IconWrench,
  IconChart,
  IconShield,
  IconLayers,
  IconCheck,
  IconArrowRight,
  IconUsers,
  IconBolt,
  IconGlobe,
} from "../icons/Icons";
import { fadeUp, stagger, ease } from "../lib/motion";

// /features — deep-dive feature catalog. Different intent than the homepage
// Features section: visitors here want to verify "does it do X?" before
// committing to a demo. So every capability gets its own concrete bullet list,
// not a one-line teaser. Keyword strategy: long-tail "X feature" + "X tracking"
// queries.
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
          name: "Features",
          item: "https://geargrid.live/features",
        },
      ],
    },
    {
      "@type": "ItemList",
      name: "GearGrid Features",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          item: {
            "@type": "Service",
            name: "Equipment inventory management",
            description:
              "Serial-level equipment tracking, categories, depreciation, bulk imports, location history.",
          },
        },
        {
          "@type": "ListItem",
          position: 2,
          item: {
            "@type": "Service",
            name: "Rental contracts and invoicing",
            description:
              "Quote-to-return workflow, daily/weekly/monthly pricing, automated late fees, partial returns.",
          },
        },
        {
          "@type": "ListItem",
          position: 3,
          item: {
            "@type": "Service",
            name: "Maintenance and defect tracking",
            description:
              "Defect logging on return, technician assignment, repair tracking to resolution.",
          },
        },
        {
          "@type": "ListItem",
          position: 4,
          item: {
            "@type": "Service",
            name: "Rental accounting and financial reporting",
            description:
              "Live AR, payment recording, expense ledger, exportable financial reports.",
          },
        },
      ],
    },
  ],
};

const MODULES = [
  {
    icon: IconBox,
    title: "Inventory & equipment tracking",
    tagline: "Every unit, every serial, every move.",
    color: "from-amber-400 to-orange-500",
    points: [
      "Serial-number-level equipment records",
      "Categories, sub-categories, and custom attributes",
      "Bulk CSV import + edit for fleets of thousands",
      "Depreciation schedules per unit",
      "Location history — every transfer, every return",
      "Status tracking: available, rented, in workshop, retired",
    ],
  },
  {
    icon: IconReceipt,
    title: "Rentals, contracts & invoicing",
    tagline: "From quote to invoice without leaving the app.",
    color: "from-blue-400 to-indigo-500",
    points: [
      "Quote → contract → return → invoice workflow",
      "Daily, weekly, and monthly pricing per unit",
      "Transport / delivery fees built into contract",
      "Security deposits and partial-return handling",
      "Automated late fees on overdue returns",
      "PDF contract & invoice generation with your branding",
    ],
  },
  {
    icon: IconWrench,
    title: "Maintenance & defect tracking",
    tagline: "Built in. Not bolted on.",
    color: "from-rose-400 to-fuchsia-500",
    points: [
      "Log defects directly on equipment return",
      "Assign technicians and track repair status",
      "Partial-fix → fully-resolved workflow",
      "Parts and labor cost capture against each defect",
      "Preventive maintenance schedules per unit",
      "Workshop queue dashboard for technicians",
    ],
  },
  {
    icon: IconChart,
    title: "Accounting & financial reporting",
    tagline: "Live numbers, not month-end surprises.",
    color: "from-emerald-400 to-teal-500",
    points: [
      "Live accounts receivable aging",
      "Payment recording (cash, card, bank transfer)",
      "Expense ledger with category breakdown",
      "Revenue by equipment, category, or customer",
      "Exportable reports (CSV, PDF) for your accountant",
      "Multi-currency support on Enterprise tier",
    ],
  },
  {
    icon: IconShield,
    title: "Security & data isolation",
    tagline: "Your tenant. Your database.",
    color: "from-slate-700 to-slate-900",
    points: [
      "Per-tenant MySQL database — no shared tables",
      "TLS 1.3 in transit, AES-256 at rest",
      "Daily encrypted backups with point-in-time recovery",
      "SSO via Google Workspace (Enterprise)",
      "Audit log of every privileged action",
      "GDPR-aligned data export and deletion",
    ],
  },
  {
    icon: IconLayers,
    title: "Roles & permissions",
    tagline: "Lock down what each person can see.",
    color: "from-violet-400 to-purple-500",
    points: [
      "Built-in roles: Admin, Manager, Technician",
      "Custom roles with granular per-action permissions",
      "Hide pricing from technicians, hide costs from sales",
      "Per-user override on top of role permissions",
      "Multi-warehouse: scope access to specific depots",
      "Session timeout and forced password rotation",
    ],
  },
  {
    icon: IconUsers,
    title: "Customers & CRM essentials",
    tagline: "Customer history without a separate CRM.",
    color: "from-cyan-400 to-blue-500",
    points: [
      "Customer profiles with rental history",
      "Outstanding balance and credit limit per customer",
      "Collateral / security document tracking",
      "Tag customers (corporate, walk-in, recurring)",
      "Contact log: calls, visits, follow-ups",
      "Export customer list for marketing campaigns",
    ],
  },
  {
    icon: IconBolt,
    title: "Performance at scale",
    tagline: "Built to stay fast as your fleet grows.",
    color: "from-yellow-400 to-amber-500",
    points: [
      "Sub-second search across 10,000+ equipment units",
      "Indexed queries on every common filter",
      "Background jobs for heavy reports (no UI freeze)",
      "Lazy-loaded dashboards — only what you see is fetched",
      "CDN-delivered assets globally",
      "Tested at 50,000 contracts / tenant",
    ],
  },
  {
    icon: IconGlobe,
    title: "Multi-warehouse & geography",
    tagline: "One business. Many depots.",
    color: "from-pink-400 to-rose-500",
    points: [
      "Manage multiple warehouses under one tenant",
      "Inter-depot transfers with status tracking",
      "Per-warehouse stock visibility for staff",
      "Geolocate equipment on a map (Pro tier)",
      "Per-region pricing and tax configuration",
      "Consolidated and per-warehouse reporting",
    ],
  },
];

export default function FeaturesPage() {
  return (
    <>
      <SEO
        title="Features — rental management software capabilities"
        description="Full feature breakdown of GearGrid rental management software: inventory tracking, rental contracts, maintenance, accounting, multi-warehouse, roles & permissions, and more."
        path="/features"
        jsonLd={jsonLd}
      />
      <main className="relative">
        {/* ── Hero ──────────────────────────────────────────────────────── */}
        <section className="relative overflow-hidden pt-32 pb-16 sm:pt-40 sm:pb-20">
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
                  Features
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
                <SectionLabel>Features</SectionLabel>
              </motion.div>
              <motion.h1
                variants={fadeUp}
                className="text-balance text-5xl font-semibold leading-[1.05] tracking-tight text-slate-900 sm:text-6xl"
              >
                Every capability of a modern{" "}
                <span className="bg-gradient-to-br from-amber-500 via-orange-500 to-rose-500 bg-clip-text text-transparent">
                  rental platform.
                </span>
              </motion.h1>
              <motion.p
                variants={fadeUp}
                className="mx-auto mt-6 max-w-2xl text-balance text-lg text-slate-600"
              >
                Nine modules, dozens of capabilities — all built natively into
                GearGrid. No third-party stitching, no spreadsheets on the side.
              </motion.p>
            </motion.div>
          </Container>
        </section>

        {/* ── Modules ──────────────────────────────────────────────────── */}
        <section className="relative pb-20">
          <Container>
            <div className="space-y-6">
              {MODULES.map((m, idx) => (
                <motion.div
                  key={m.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6, ease }}
                  className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 sm:p-12"
                >
                  <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
                    <div className="lg:col-span-5">
                      <div
                        className={`mb-6 grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br ${m.color} text-white shadow-lg`}
                      >
                        <m.icon size={26} />
                      </div>
                      <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                        Module {String(idx + 1).padStart(2, "0")}
                      </div>
                      <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
                        {m.title}
                      </h2>
                      <p className="mt-3 text-base text-slate-600">
                        {m.tagline}
                      </p>
                    </div>
                    <ul className="grid gap-3 lg:col-span-7 sm:grid-cols-2">
                      {m.points.map((p) => (
                        <li
                          key={p}
                          className="flex items-start gap-3 rounded-xl bg-slate-50/70 p-4 text-sm text-slate-700"
                        >
                          <span className="mt-0.5 grid h-5 w-5 flex-none place-items-center rounded-full bg-emerald-100 text-emerald-700">
                            <IconCheck size={12} />
                          </span>
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </Container>
        </section>

        {/* ── CTA ──────────────────────────────────────────────────────── */}
        <section className="relative py-20 sm:py-24">
          <Container>
            <div className="relative mx-auto max-w-4xl overflow-hidden rounded-3xl bg-slate-900 px-8 py-16 text-center text-white sm:px-16">
              <div
                aria-hidden
                className="absolute inset-0 -z-0 opacity-50"
                style={{
                  background:
                    "radial-gradient(ellipse at center, rgba(245,158,11,0.22), rgba(15,23,42,0) 60%)",
                }}
              />
              <h2 className="relative z-10 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
                Don't see a feature you need? Ask us.
              </h2>
              <p className="relative z-10 mx-auto mt-4 max-w-xl text-balance text-slate-300">
                We ship improvements every sprint. Tell us what your rental
                operation needs and we'll point you to the closest existing
                workflow — or build it.
              </p>
              <div className="relative z-10 mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Button
                  as="Link"
                  to="/contact?type=sales"
                  variant="accent"
                  size="lg"
                >
                  Talk to sales
                  <IconArrowRight size={18} />
                </Button>
                <Button as="Link" to="/pricing" variant="outlineDark" size="lg">
                  See pricing
                </Button>
              </div>
            </div>
          </Container>
        </section>
      </main>
    </>
  );
}
