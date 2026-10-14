import { motion } from "framer-motion";
import Container from "../ui/Container";
import SectionLabel from "../ui/SectionLabel";
import {
  IconShield,
  IconBolt,
  IconGlobe,
  IconCheck,
} from "../../icons/Icons";
import { fadeUp, stagger } from "../../lib/motion";

const PILLARS = [
  {
    icon: IconBolt,
    title: "Zero technical headaches",
    desc: "Intentionally built for everyday shop staff. If your team can use WhatsApp or Facebook, they can comfortably run your rental counter within 15 minutes.",
  },
  {
    icon: IconGlobe,
    title: "Runs on any phone, tablet, or PC",
    desc: "No expensive barcode scanners or dedicated server hardware required. Access your store from your counter laptop, tablet, or smartphone on standard 4G.",
  },
  {
    icon: IconShield,
    title: "100% private & automatic backups",
    desc: "Your customer list, rental pricing, and business income are strictly confidential. Automated daily cloud backups ensure you never lose a record if a computer crashes.",
  },
  {
    icon: IconCheck,
    title: "Ready for Sri Lanka & global rentals",
    desc: "Handles Sri Lankan Rupees (LKR) with local NIC card security holds, and standard international currencies (USD, GBP, EUR) for foreign equipment rental houses.",
  },
];

export default function WhyGearGrid() {
  return (
    <section id="security" className="relative overflow-hidden bg-slate-950 py-20 text-white sm:py-28">
      {/* ambient grid */}
      <div className="absolute inset-0 -z-10">
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "36px 36px",
          }}
        />
        <div
          aria-hidden
          className="absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 opacity-25"
          style={{
            background:
              "radial-gradient(ellipse, rgba(245,158,11,0.25) 0%, transparent 60%)",
          }}
        />
      </div>

      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger()}
          className="mx-auto max-w-2xl text-center"
        >
          <motion.div variants={fadeUp}>
            <SectionLabel tone="dark">Why Equipment Owners Choose GearGrid</SectionLabel>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="text-balance text-3xl font-bold tracking-tight sm:text-5xl"
          >
            Built for peace of mind.{" "}
            <span className="text-amber-400">Engineered to be simple.</span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mt-4 text-balance text-base text-slate-400 sm:text-lg"
          >
            No complex installations, no confusing menus. Just a dependable system that keeps your
            rental business organized and protected.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger(0.08)}
          className="mt-14 grid gap-6 sm:grid-cols-2"
        >
          {PILLARS.map((p) => (
            <motion.div
              key={p.title}
              variants={fadeUp}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-7 backdrop-blur-sm transition-all duration-300 hover:border-amber-400/40 hover:bg-white/[0.07]"
            >
              <div className="mb-4 grid h-11 w-11 place-items-center rounded-xl bg-amber-500/20 text-amber-300 ring-1 ring-amber-400/30">
                <p.icon size={22} />
              </div>
              <h3 className="text-lg font-bold tracking-tight text-white">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">
                {p.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Real practical impact metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-14 grid gap-px overflow-hidden rounded-2xl bg-white/10 sm:grid-cols-4"
        >
          {[
            { k: "< 30 sec", v: "Invoice & WhatsApp dispatch" },
            { k: "0", v: "Double-booking errors" },
            { k: "100%", v: "Automatic cloud data backup" },
            { k: "15 min", v: "Staff learning time" },
          ].map((s) => (
            <div key={s.v} className="bg-slate-900/90 p-6 text-center">
              <div className="text-3xl font-extrabold tracking-tight text-amber-400 sm:text-4xl">
                {s.k}
              </div>
              <div className="mt-1 text-xs uppercase tracking-wider text-slate-400">
                {s.v}
              </div>
            </div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}

