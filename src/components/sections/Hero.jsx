import { motion } from "framer-motion";
import Container from "../ui/Container";
import Button from "../ui/Button";
import { IconArrowRight, IconSparkles, IconCheck } from "../../icons/Icons";
import { URLS } from "../../lib/urls";
import { ease, fadeUp, stagger } from "../../lib/motion";

const HIGHLIGHTS = ["Inventory", "Rentals & Invoicing", "Maintenance", "Accounting"];

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
      {/* ambient gradients */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-x-0 top-0 h-[600px] bg-gradient-to-b from-amber-50/60 via-white to-transparent" />
        <motion.div
          aria-hidden
          animate={{ rotate: 360 }}
          transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
          className="absolute left-1/2 top-[-200px] h-[900px] w-[900px] -translate-x-1/2 opacity-50"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(245,158,11,0.18), rgba(255,255,255,0) 60%)",
          }}
        />
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

      <Container className="relative">
        <motion.div
          variants={stagger(0.08)}
          initial="hidden"
          animate="visible"
          className="mx-auto max-w-4xl text-center"
        >
          {/* eyebrow pill */}
          <motion.div variants={fadeUp}>
            <span className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50/70 px-4 py-1.5 text-xs font-medium text-amber-900 backdrop-blur">
              <IconSparkles size={14} />
              The operating system for equipment rental businesses
            </span>
          </motion.div>

          {/* headline */}
          <motion.h1
            variants={fadeUp}
            className="mt-6 text-balance text-5xl font-semibold leading-[1.04] tracking-tight text-slate-900 sm:text-6xl md:text-7xl"
          >
            Run your{" "}
            <span className="relative inline-block">
              <span className="relative z-10 bg-gradient-to-br from-amber-500 via-orange-500 to-rose-500 bg-clip-text text-transparent">
                rental fleet
              </span>
              <motion.span
                aria-hidden
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.2, delay: 0.6, ease }}
                className="absolute -bottom-2 left-0 right-0 origin-left h-2 rounded-full bg-gradient-to-r from-amber-400/40 via-orange-400/40 to-rose-400/40 blur-sm"
              />
            </span>
            <br />
            like Apple runs a launch.
          </motion.h1>

          {/* sub */}
          <motion.p
            variants={fadeUp}
            className="mx-auto mt-7 max-w-2xl text-balance text-lg leading-relaxed text-slate-600 sm:text-xl"
          >
            Inventory, contracts, returns, maintenance, and accounting — unified
            on a single, secure, multi-tenant platform built for modern
            equipment rental businesses.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={fadeUp}
            className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <Button as="a" href={URLS.login} variant="primary" size="lg" external>
              Launch console
              <IconArrowRight size={18} />
            </Button>
            <Button
              as="a"
              href="#demo-video"
              variant="secondary"
              size="lg"
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById("demo-video")
                  ?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
            >
              {/* Play glyph keeps the affordance unmistakable */}
              <svg
                className="text-amber-500"
                width={18}
                height={18}
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
              Watch demo
              <span className="ml-1 text-xs font-medium text-slate-400">· Sinhala</span>
            </Button>
          </motion.div>

          {/* mini trust list */}
          <motion.ul
            variants={fadeUp}
            className="mx-auto mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-slate-500"
          >
            {HIGHLIGHTS.map((h) => (
              <li key={h} className="inline-flex items-center gap-1.5">
                <IconCheck size={16} />
                {h}
              </li>
            ))}
          </motion.ul>
        </motion.div>

        {/* product preview slab */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5, ease }}
          className="relative mx-auto mt-20 max-w-5xl"
        >
          <div className="absolute -inset-x-8 -inset-y-8 -z-10 rounded-[2.5rem] bg-gradient-to-br from-amber-200/40 via-orange-200/30 to-rose-200/40 blur-2xl" />
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_20px_70px_-30px_rgba(15,23,42,0.4)]">
            {/* top bar mimicking macOS window */}
            <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50/80 px-4 py-3">
              <div className="flex items-center gap-1.5">
                <span className="h-3 w-3 rounded-full bg-red-400" />
                <span className="h-3 w-3 rounded-full bg-amber-400" />
                <span className="h-3 w-3 rounded-full bg-emerald-400" />
              </div>
              <div className="text-xs font-medium text-slate-500">
                app.geargrid.live / dashboard
              </div>
              <div className="w-12" />
            </div>

            {/* dashboard mockup */}
            <div className="grid gap-4 p-6 sm:p-8 md:grid-cols-4">
              {[
                { label: "Active rentals", value: "342", trend: "+12%", color: "from-amber-400 to-orange-500" },
                { label: "Revenue (MTD)", value: "Rs 4.2M", trend: "+8%", color: "from-emerald-400 to-teal-500" },
                { label: "Available units", value: "1,284", trend: "—", color: "from-blue-400 to-indigo-500" },
                { label: "In workshop", value: "27", trend: "-4%", color: "from-rose-400 to-fuchsia-500" },
              ].map((k) => (
                <div
                  key={k.label}
                  className="rounded-xl border border-slate-100 bg-white p-4 shadow-sm"
                >
                  <div
                    className={`mb-3 inline-block h-1 w-8 rounded-full bg-gradient-to-r ${k.color}`}
                  />
                  <div className="text-xs uppercase tracking-wider text-slate-500">
                    {k.label}
                  </div>
                  <div className="mt-1 text-2xl font-semibold tracking-tight text-slate-900">
                    {k.value}
                  </div>
                  <div className="mt-0.5 text-xs text-slate-400">{k.trend}</div>
                </div>
              ))}
            </div>

            {/* bottom chart placeholder */}
            <div className="border-t border-slate-100 bg-gradient-to-b from-white to-slate-50/50 px-6 pb-6 pt-2 sm:px-8">
              <div className="flex items-end justify-between gap-2 sm:gap-3">
                {[42, 58, 36, 72, 51, 80, 64, 90, 68, 95, 78, 88].map((h, i) => (
                  <motion.div
                    key={i}
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ duration: 0.9, delay: 0.9 + i * 0.05, ease }}
                    className="origin-bottom flex-1 rounded-t bg-gradient-to-t from-slate-300 to-slate-200"
                    style={{ height: `${h * 1.2}px` }}
                  >
                    <div
                      className="h-full w-full rounded-t bg-gradient-to-t from-amber-400/80 to-orange-400/40"
                      style={{ opacity: i > 8 ? 1 : 0.7 }}
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
