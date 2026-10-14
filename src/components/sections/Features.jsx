import { motion } from "framer-motion";
import Container from "../ui/Container";
import SectionLabel from "../ui/SectionLabel";
import {
  IconBox,
  IconReceipt,
  IconWrench,
  IconChart,
  IconShield,
  IconGlobe,
} from "../../icons/Icons";
import { fadeUp, stagger } from "../../lib/motion";

const FEATURES = [
  {
    icon: IconBox,
    title: "Never double-book gear",
    desc: "See live availability across cameras, lenses, tools, and audio sets in real time. Never promise equipment that's already out or booked.",
    color: "from-amber-500 to-orange-600",
  },
  {
    icon: IconShield,
    title: "ID Card Security Vault",
    desc: "Record customer NIC / Passport numbers, hold collateral securely in your safe, and prevent expensive equipment from walking out untracked.",
    color: "from-blue-500 to-indigo-600",
  },
  {
    icon: IconReceipt,
    title: "Automated late fee billing",
    desc: "Returns that come in 2 hours or 2 days late get calculated automatically on the invoice. Stop awkward disputes and collect what you're owed.",
    color: "from-emerald-500 to-teal-600",
  },
  {
    icon: IconWrench,
    title: "Counter inspection & repairs",
    desc: "Inspect gear on return. Flag damages, charge repair deductions, and route broken units straight to the workshop queue so clients never get faulty gear.",
    color: "from-rose-500 to-red-600",
  },
  {
    icon: IconChart,
    title: "30-second checkout & WhatsApp",
    desc: "Pick equipment, add delivery or discount, collect advance payments, and send professional WhatsApp / PDF receipts in seconds.",
    color: "from-violet-500 to-purple-600",
  },
  {
    icon: IconGlobe,
    title: "Live control on phone & PC",
    desc: "Whether you're at the shop counter or traveling, check today's collections, dispatched equipment, and pending returns from any smartphone.",
    color: "from-slate-700 to-slate-900",
  },
];

export default function Features() {
  return (
    <section id="features" className="relative py-20 sm:py-28 bg-slate-50/50">
      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger()}
          className="mx-auto max-w-2xl text-center"
        >
          <motion.div variants={fadeUp}>
            <SectionLabel>Built for Daily Operations</SectionLabel>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="text-balance text-3xl font-bold tracking-tight text-slate-900 sm:text-5xl"
          >
            Built for the everyday chaos of{" "}
            <span className="text-amber-600">equipment rentals.</span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mt-4 text-balance text-base text-slate-600 sm:text-lg"
          >
            No bloated corporate software. No confusing technical setups. Just the practical tools
            rental business owners need to run a profitable shop.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={stagger(0.06)}
          className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {FEATURES.map((f) => (
            <motion.div
              key={f.title}
              variants={fadeUp}
              className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-amber-300 hover:shadow-lg"
            >
              <div
                className={`mb-5 grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br ${f.color} text-white shadow-md`}
              >
                <f.icon size={22} />
              </div>
              <h3 className="text-lg font-bold tracking-tight text-slate-900">
                {f.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {f.desc}
              </p>
              <div
                aria-hidden
                className={`pointer-events-none absolute -bottom-12 -right-12 h-36 w-36 rounded-full bg-gradient-to-br ${f.color} opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-15`}
              />
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
