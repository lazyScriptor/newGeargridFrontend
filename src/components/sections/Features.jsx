import { motion } from "framer-motion";
import Container from "../ui/Container";
import SectionLabel from "../ui/SectionLabel";
import {
  IconBox,
  IconReceipt,
  IconWrench,
  IconChart,
  IconShield,
  IconLayers,
} from "../../icons/Icons";
import { fadeUp, stagger } from "../../lib/motion";

const FEATURES = [
  {
    icon: IconBox,
    title: "Inventory you can trust",
    desc: "Every unit has a serial, a story, and a location. Bulk imports, categories, depreciation — all live.",
    color: "from-amber-400 to-orange-500",
  },
  {
    icon: IconReceipt,
    title: "Rentals from quote to return",
    desc: "Daily / weekly / monthly pricing, transport fees, partial returns, late fees — automated.",
    color: "from-blue-400 to-indigo-500",
  },
  {
    icon: IconWrench,
    title: "Maintenance command center",
    desc: "Log defects on return, assign technicians, track repairs partial → fully resolved.",
    color: "from-rose-400 to-fuchsia-500",
  },
  {
    icon: IconChart,
    title: "Accounting that just works",
    desc: "Live AR, payment tracking, expense ledger, exportable financials. No spreadsheets.",
    color: "from-emerald-400 to-teal-500",
  },
  {
    icon: IconShield,
    title: "Multi-tenant isolation",
    desc: "Each business gets its own database. Your data never touches another tenant's. Period.",
    color: "from-slate-700 to-slate-900",
  },
  {
    icon: IconLayers,
    title: "Permissions you control",
    desc: "Roles, hierarchies, and per-user overrides. Admin / Manager / Technician + your custom roles.",
    color: "from-violet-400 to-purple-500",
  },
];

export default function Features() {
  return (
    <section id="features" className="relative py-24 sm:py-32">
      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger()}
          className="mx-auto max-w-2xl text-center"
        >
          <motion.div variants={fadeUp}>
            <SectionLabel>Platform overview</SectionLabel>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="text-balance text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl"
          >
            Everything a rental business needs.{" "}
            <span className="text-slate-400">Nothing it doesn't.</span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mt-5 text-balance text-lg text-slate-600"
          >
            Six pillars, one platform. Built specifically for the way equipment
            rental companies operate.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={stagger(0.06)}
          className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {FEATURES.map((f) => (
            <motion.div
              key={f.title}
              variants={fadeUp}
              className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-[0_30px_60px_-30px_rgba(15,23,42,0.25)]"
            >
              <div
                className={`mb-5 grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br ${f.color} text-white shadow-lg`}
              >
                <f.icon size={22} />
              </div>
              <h3 className="text-xl font-semibold tracking-tight text-slate-900">
                {f.title}
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-slate-600">
                {f.desc}
              </p>
              <div
                aria-hidden
                className={`pointer-events-none absolute -bottom-12 -right-12 h-40 w-40 rounded-full bg-gradient-to-br ${f.color} opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-20`}
              />
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
