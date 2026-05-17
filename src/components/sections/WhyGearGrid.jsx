import { motion } from "framer-motion";
import Container from "../ui/Container";
import SectionLabel from "../ui/SectionLabel";
import {
  IconShield,
  IconBolt,
  IconGlobe,
  IconLayers,
} from "../../icons/Icons";
import { fadeUp, stagger } from "../../lib/motion";

const PILLARS = [
  {
    icon: IconShield,
    title: "Database-per-tenant isolation",
    desc: "Your data lives in its own MySQL database. No shared tables, no cross-tenant queries — by architecture, not by promise.",
  },
  {
    icon: IconBolt,
    title: "Real-time everywhere",
    desc: "Stock changes the moment equipment leaves the gate. AR updates the moment a payment is recorded. No batch jobs, no waiting.",
  },
  {
    icon: IconLayers,
    title: "Granular permissions",
    desc: "Roles with hierarchy levels + per-user overrides. A technician sees what a technician needs. An accountant sees the books.",
  },
  {
    icon: IconGlobe,
    title: "Built for the field",
    desc: "Mobile-responsive across phones, tablets, and desktops. Your team in the warehouse and on-site use the same console.",
  },
];

export default function WhyGearGrid() {
  return (
    <section id="security" className="relative overflow-hidden bg-slate-950 py-24 text-white sm:py-32">
      {/* ambient grid + gradient */}
      <div className="absolute inset-0 -z-10">
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
            maskImage:
              "radial-gradient(ellipse 60% 60% at 50% 50%, black 30%, transparent 80%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 60% 60% at 50% 50%, black 30%, transparent 80%)",
          }}
        />
        <div
          aria-hidden
          className="absolute left-1/2 top-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 opacity-30"
          style={{
            background:
              "radial-gradient(ellipse, rgba(245,158,11,0.3) 0%, transparent 60%)",
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
            <SectionLabel tone="dark">Why GearGrid</SectionLabel>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl"
          >
            Built like infrastructure.{" "}
            <span className="text-slate-500">Used like a product.</span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mt-5 text-balance text-lg text-slate-400"
          >
            Four principles that aren't features. They're the architecture.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger(0.08)}
          className="mt-16 grid gap-6 sm:grid-cols-2"
        >
          {PILLARS.map((p) => (
            <motion.div
              key={p.title}
              variants={fadeUp}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/[0.06]"
            >
              <div className="mb-5 grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-amber-400/20 to-orange-500/20 text-amber-300 ring-1 ring-amber-300/30">
                <p.icon size={22} />
              </div>
              <h3 className="text-xl font-semibold tracking-tight">{p.title}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-slate-400">
                {p.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* trust strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-16 grid gap-px overflow-hidden rounded-2xl bg-white/10 sm:grid-cols-4"
        >
          {[
            { k: "99.9%", v: "Uptime SLA" },
            { k: "256-bit", v: "TLS encryption" },
            { k: "HttpOnly", v: "Cookie auth" },
            { k: "0", v: "Data shared between tenants" },
          ].map((s) => (
            <div key={s.v} className="bg-slate-950 p-6 text-center">
              <div className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                {s.k}
              </div>
              <div className="mt-1 text-xs uppercase tracking-wider text-slate-500">
                {s.v}
              </div>
            </div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
