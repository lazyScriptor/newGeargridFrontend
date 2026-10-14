import { motion } from "framer-motion";
import Container from "../ui/Container";
import Button from "../ui/Button";
import { IconArrowRight, IconSparkles, IconCheck, IconShield, IconReceipt } from "../../icons/Icons";
import { URLS } from "../../lib/urls";
import { ease, fadeUp, stagger } from "../../lib/motion";

const HIGHLIGHTS = [
  "Zero Double-Booking",
  "Fast 30-Sec Counter POS",
  "ID Card Security Vault",
  "Automated Late Fees",
  "Works on Phone & PC",
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-28 pb-20 sm:pt-36 sm:pb-28">
      {/* ambient background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-x-0 top-0 h-[640px] bg-gradient-to-b from-amber-50/70 via-slate-50/40 to-white" />
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgb(15 23 42) 1px, transparent 0)",
            backgroundSize: "28px 28px",
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
          {/* Eyebrow badge */}
          <motion.div variants={fadeUp}>
            <span className="inline-flex items-center gap-2 rounded-full border border-amber-300 bg-amber-50/90 px-4 py-1.5 text-xs font-semibold text-amber-900 shadow-sm backdrop-blur">
              <IconSparkles size={14} className="text-amber-600" />
              Equipment Rental & Inventory Management Software
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={fadeUp}
            className="mt-6 text-balance text-4xl font-extrabold leading-[1.08] tracking-tight text-slate-900 sm:text-6xl md:text-7xl"
          >
            Stop losing gear, revenue, and sleep.{" "}
            <span className="relative inline-block mt-1 sm:mt-0">
              <span className="relative z-10 bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 bg-clip-text text-transparent">
                Rent with total control.
              </span>
              <motion.span
                aria-hidden
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.1, delay: 0.5, ease }}
                className="absolute -bottom-1.5 left-0 right-0 origin-left h-2 rounded-full bg-amber-400/30 blur-[2px]"
              />
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={fadeUp}
            className="mx-auto mt-6 max-w-2xl text-balance text-base leading-relaxed text-slate-600 sm:text-lg"
          >
            The practical point-of-sale and inventory system built for camera, AV, party, and tool
            rental operators. Prevent double-booking, lock customer ID security deposits, and print
            instant invoices with automatic late fees — straight from your phone or PC.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={fadeUp}
            className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <Button as="a" href={URLS.login} variant="primary" size="lg" external>
              Try live console demo
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
              <svg
                className="text-amber-600"
                width={18}
                height={18}
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
              Watch video walkthrough
              <span className="ml-1 text-xs font-semibold text-amber-700">· 3 min</span>
            </Button>
          </motion.div>

          {/* Highlights checklist */}
          <motion.ul
            variants={fadeUp}
            className="mx-auto mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-medium text-slate-600 sm:text-sm"
          >
            {HIGHLIGHTS.map((h) => (
              <li key={h} className="inline-flex items-center gap-1.5">
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                  <IconCheck size={12} />
                </span>
                {h}
              </li>
            ))}
          </motion.ul>
        </motion.div>

        {/* Realistic interactive dispatch console mockup */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease }}
          className="relative mx-auto mt-14 max-w-5xl"
        >
          {/* Subtle warm glow behind console */}
          <div className="absolute -inset-x-4 -inset-y-4 -z-10 rounded-[2rem] bg-gradient-to-r from-amber-300/30 via-orange-300/20 to-amber-200/30 blur-2xl" />

          <div className="overflow-hidden rounded-2xl border border-slate-200/90 bg-slate-900 text-slate-100 shadow-[0_25px_70px_-20px_rgba(15,23,42,0.35)]">
            {/* Top window header */}
            <div className="flex flex-wrap items-center justify-between border-b border-slate-800 bg-slate-950/80 px-4 py-3 backdrop-blur">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5">
                  <span className="h-3 w-3 rounded-full bg-rose-500/80" />
                  <span className="h-3 w-3 rounded-full bg-amber-500/80" />
                  <span className="h-3 w-3 rounded-full bg-emerald-500/80" />
                </div>
                <div className="ml-2 flex items-center gap-2 text-xs text-slate-400">
                  <span className="font-semibold text-slate-200">GearGrid POS</span>
                  <span className="text-slate-600">/</span>
                  <span className="font-mono text-[11px] text-amber-400">INV-2026-084</span>
                  <span className="rounded bg-emerald-500/20 px-1.5 py-0.5 text-[10px] font-bold text-emerald-300">
                    DISPATCHED
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-800 px-2.5 py-1 text-[11px] font-medium text-slate-300">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  Live Rental Counter
                </span>
              </div>
            </div>

            {/* Mockup console body */}
            <div className="grid lg:grid-cols-12 bg-slate-900 text-slate-100">
              {/* Left pane: Order items & client */}
              <div className="p-5 sm:p-6 lg:col-span-7 border-b lg:border-b-0 lg:border-r border-slate-800 flex flex-col justify-between">
                <div>
                  {/* Customer row */}
                  <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl bg-slate-800/60 p-3.5 border border-slate-700/60">
                    <div>
                      <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                        Customer & Verification
                      </div>
                      <div className="text-sm font-bold text-white mt-0.5">
                        Kavinda Senanayake <span className="text-slate-400 font-normal">· +94 77 ••• 4190</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 rounded-lg bg-amber-500/15 border border-amber-500/30 px-2.5 py-1 text-xs font-semibold text-amber-300">
                      <IconShield size={14} />
                      NIC Vault: Secured
                    </div>
                  </div>

                  {/* Rental equipment items table */}
                  <div className="mt-4">
                    <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-2">
                      Rented Equipment Items (2 Days)
                    </div>
                    <div className="space-y-2">
                      {[
                        {
                          name: "Sony FX3 Full-Frame Cinema Kit",
                          code: "SNY-FX3-04",
                          rate: "Rs. 18,500 / day",
                          total: "Rs. 37,000",
                          badge: "Serial #8401",
                        },
                        {
                          name: "Sony FE 24-70mm f/2.8 GM II Lens",
                          code: "LNS-2470-02",
                          rate: "Rs. 4,500 / day",
                          total: "Rs. 9,000",
                          badge: "Serial #3192",
                        },
                        {
                          name: "DJI RS 3 Pro Gimbal Stabilizer Combo",
                          code: "GMB-RS3P-01",
                          rate: "Rs. 5,000 / day",
                          total: "Rs. 10,000",
                          badge: "Checked OK",
                        },
                      ].map((item) => (
                        <div
                          key={item.code}
                          className="flex items-center justify-between rounded-lg bg-slate-950/50 p-2.5 px-3 border border-slate-800/80 text-xs"
                        >
                          <div>
                            <div className="font-semibold text-slate-200">{item.name}</div>
                            <div className="flex items-center gap-2 mt-0.5 text-slate-400 text-[11px]">
                              <span className="font-mono text-amber-400/90">{item.code}</span>
                              <span>·</span>
                              <span>{item.rate}</span>
                              <span className="rounded bg-slate-800 px-1.5 py-0.2 text-[10px] text-slate-300">
                                {item.badge}
                              </span>
                            </div>
                          </div>
                          <div className="text-right font-mono font-bold text-slate-200">
                            {item.total}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom schedule info */}
                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-emerald-400" />
                    <span>Dispatched: Friday 4:30 PM</span>
                  </div>
                  <div>
                    Return Due: <span className="font-bold text-amber-400">Sunday 8:00 PM</span>
                  </div>
                </div>
              </div>

              {/* Right pane: Financial Terminal & Balance */}
              <div className="p-5 sm:p-6 lg:col-span-5 bg-slate-950 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Payment Terminal
                    </span>
                    <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/50 px-2 py-0.5 rounded">
                      Advance Received
                    </span>
                  </div>

                  {/* Financial breakdown */}
                  <div className="mt-4 space-y-2 text-xs">
                    <div className="flex justify-between text-slate-400">
                      <span>Items Subtotal (3 items)</span>
                      <span className="font-mono text-slate-200">Rs. 56,000</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Delivery / Transport</span>
                      <span className="font-mono text-slate-200">+ Rs. 2,000</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Weekend Special Discount</span>
                      <span className="font-mono text-rose-400">- Rs. 3,000</span>
                    </div>
                    <div className="border-t border-slate-800 pt-2 flex justify-between font-bold text-sm text-slate-100">
                      <span>Grand Total</span>
                      <span className="font-mono text-base text-amber-400">Rs. 55,000</span>
                    </div>
                  </div>

                  {/* Advance card */}
                  <div className="mt-5 rounded-xl bg-slate-900 p-3.5 border border-slate-800">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-400">Advance Paid (Cash/Transfer):</span>
                      <span className="font-mono font-bold text-emerald-400">Rs. 25,000</span>
                    </div>
                    <div className="mt-2.5 pt-2.5 border-t border-slate-800/80 flex justify-between items-baseline">
                      <span className="text-xs font-bold text-slate-300">Balance Due on Return:</span>
                      <span className="text-lg font-extrabold font-mono text-white">Rs. 30,000</span>
                    </div>
                  </div>
                </div>

                {/* Instant Actions */}
                <div className="mt-6 pt-4 border-t border-slate-800 flex items-center gap-2">
                  <div className="flex-1 rounded-lg bg-emerald-600 px-3 py-2 text-center text-xs font-bold text-white shadow hover:bg-emerald-500 cursor-pointer transition">
                    ✓ Print & Send WhatsApp Invoice
                  </div>
                  <div className="rounded-lg bg-slate-800 border border-slate-700 px-3 py-2 text-center text-xs font-semibold text-slate-300 hover:bg-slate-700 cursor-pointer transition">
                    View ID Card
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

