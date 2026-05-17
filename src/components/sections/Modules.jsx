import { motion } from "framer-motion";
import Container from "../ui/Container";
import SectionLabel from "../ui/SectionLabel";
import { IconCheck } from "../../icons/Icons";
import { fadeUp, stagger, ease } from "../../lib/motion";

const MODULES = [
  {
    eyebrow: "Inventory",
    title: "Track every unit with surgical precision.",
    desc: "Each piece of equipment has a serial number, category, location, and lifecycle. Bulk-import via CSV, manage thousands of SKUs, set per-unit pricing, and see availability across every warehouse in real time.",
    bullets: [
      "Multi-warehouse stock with location-aware availability",
      "CSV bulk import + bulk edit",
      "Categories, sub-types, and per-unit pricing rules",
      "Photo & document attachments per unit",
    ],
    visual: "inventory",
  },
  {
    eyebrow: "Rentals & Invoicing",
    title: "Quote, deliver, return, invoice — without a spreadsheet.",
    desc: "Daily, weekly, and monthly billing periods. Auto-pricing, transport fees, discounts, partial returns, and late-fee automation. Every action emits an audit trail; reverse a step in one click.",
    bullets: [
      "Daily / weekly / monthly billing with auto-renewal logic",
      "Partial returns with live inventory updates",
      "Per-line discount and per-invoice transport fee",
      "Customer collateral (ID retention) workflow",
    ],
    visual: "invoice",
    reverse: true,
  },
  {
    eyebrow: "Maintenance",
    title: "Workshop ops, not Post-its.",
    desc: "Defects are logged automatically on return. Triage in the queue, assign to a technician, log partial or full repairs. Equipment status updates everywhere instantly — no double-entry.",
    bullets: [
      "Defect queue with status: Pending → In Repair → Resolved",
      "Technician assignment + partial-repair logging",
      "Auto-decrements rentable inventory while in workshop",
      "Repair cost & duration analytics",
    ],
    visual: "maintenance",
  },
  {
    eyebrow: "Accounting & Reports",
    title: "Live financial picture, always.",
    desc: "Accounts receivable per customer, payment tracking, expense ledger, exportable P&L, and customer ledgers. Built for accountants and operators alike.",
    bullets: [
      "Live AR with overdue flags",
      "Multi-method payment recording (cash, card, transfer)",
      "Expense categories with attachments",
      "PDF + Excel exports of every report",
    ],
    visual: "chart",
    reverse: true,
  },
];

// ── Visual primitives (lightweight SVG/HTML mockups) ─────────────────────────
const Visual = ({ kind }) => {
  switch (kind) {
    case "inventory":
      return (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_20px_60px_-30px_rgba(15,23,42,0.3)]">
          <div className="mb-4 flex items-center justify-between">
            <div className="text-sm font-semibold text-slate-900">Equipment</div>
            <div className="inline-flex h-7 items-center gap-1.5 rounded-full bg-emerald-50 px-3 text-xs font-medium text-emerald-700">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Live
            </div>
          </div>
          <div className="space-y-2">
            {[
              { name: "Concrete Mixer 350L", code: "CM-350-A12", stock: 24, color: "amber" },
              { name: "Scaffolding Frame 6ft", code: "SC-6F-220", stock: 184, color: "blue" },
              { name: "Generator 5KVA Diesel", code: "GEN-5K-D08", stock: 7, color: "rose" },
              { name: "Compactor Plate 90kg", code: "CP-90-A03", stock: 12, color: "emerald" },
            ].map((r) => (
              <div
                key={r.code}
                className="grid grid-cols-12 items-center gap-3 rounded-lg border border-slate-100 bg-slate-50/40 px-3 py-2.5 text-sm"
              >
                <div className={`col-span-1 h-2 w-2 rounded-full bg-${r.color}-400`} />
                <div className="col-span-6 truncate font-medium text-slate-900">{r.name}</div>
                <div className="col-span-3 font-mono text-xs text-slate-500">{r.code}</div>
                <div className="col-span-2 text-right font-mono text-xs font-semibold text-slate-900">
                  {r.stock}
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    case "invoice":
      return (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_20px_60px_-30px_rgba(15,23,42,0.3)]">
          <div className="mb-4 flex items-start justify-between">
            <div>
              <div className="text-xs font-medium uppercase tracking-wider text-slate-500">
                Invoice
              </div>
              <div className="mt-1 text-2xl font-semibold tracking-tight text-slate-900">
                INV-2042
              </div>
            </div>
            <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
              PAID
            </span>
          </div>
          <div className="space-y-2 border-t border-slate-100 pt-4 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-600">Scaffolding × 12 (7 days)</span>
              <span className="font-mono text-slate-900">Rs 42,000</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Generator 5KVA × 1</span>
              <span className="font-mono text-slate-900">Rs 8,500</span>
            </div>
            <div className="flex justify-between text-xs text-slate-500">
              <span>Transport</span>
              <span className="font-mono">Rs 1,500</span>
            </div>
            <div className="flex justify-between text-xs text-rose-600">
              <span>Discount</span>
              <span className="font-mono">- Rs 2,000</span>
            </div>
            <div className="mt-3 flex justify-between border-t border-slate-100 pt-3 text-base font-semibold">
              <span className="text-slate-900">Total</span>
              <span className="font-mono text-slate-900">Rs 50,000</span>
            </div>
          </div>
        </div>
      );
    case "maintenance":
      return (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_20px_60px_-30px_rgba(15,23,42,0.3)]">
          <div className="mb-4 flex items-center gap-2 text-sm">
            <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-800">
              Queue (4)
            </span>
            <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-800">
              In Workshop (7)
            </span>
            <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-800">
              Done (132)
            </span>
          </div>
          {[
            { item: "Generator 5KVA #G08", defect: "Starter motor", tech: "K. Perera", progress: 60 },
            { item: "Mixer #CM12", defect: "Drum bearing", tech: "S. Silva", progress: 30 },
            { item: "Compactor #CP03", defect: "Belt tension", tech: "Unassigned", progress: 0 },
          ].map((d) => (
            <div key={d.item} className="border-t border-slate-100 py-3">
              <div className="flex items-center justify-between text-sm">
                <div className="font-medium text-slate-900">{d.item}</div>
                <div className="text-xs text-slate-500">{d.tech}</div>
              </div>
              <div className="mt-1.5 text-xs text-rose-600">{d.defect}</div>
              <div className="mt-2 h-1.5 w-full rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-amber-400 to-orange-500"
                  style={{ width: `${d.progress}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      );
    case "chart":
    default:
      return (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_20px_60px_-30px_rgba(15,23,42,0.3)]">
          <div className="flex items-end justify-between gap-1.5 h-44">
            {[55, 72, 64, 80, 68, 88, 76, 95, 82, 90, 78, 100].map((h, i) => (
              <div key={i} className="flex-1 h-full flex items-end">
                <div
                  className="w-full rounded-t-md bg-gradient-to-t from-emerald-500 to-emerald-300"
                  style={{ height: `${h}%` }}
                />
              </div>
            ))}
          </div>
          <div className="mt-4 grid grid-cols-3 gap-4 border-t border-slate-100 pt-4 text-center">
            <div>
              <div className="text-xs uppercase tracking-wider text-slate-500">AR</div>
              <div className="text-xl font-semibold text-slate-900">Rs 1.2M</div>
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider text-slate-500">MTD</div>
              <div className="text-xl font-semibold text-slate-900">Rs 4.2M</div>
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider text-slate-500">Margin</div>
              <div className="text-xl font-semibold text-emerald-600">38%</div>
            </div>
          </div>
        </div>
      );
  }
};

export default function Modules() {
  return (
    <section id="modules" className="relative bg-slate-50/50 py-24 sm:py-32">
      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger()}
          className="mx-auto max-w-2xl text-center"
        >
          <motion.div variants={fadeUp}>
            <SectionLabel>Deep dives</SectionLabel>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="text-balance text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl"
          >
            Four modules.{" "}
            <span className="text-slate-400">One source of truth.</span>
          </motion.h2>
        </motion.div>

        <div className="mt-20 space-y-28 sm:space-y-32">
          {MODULES.map((m) => (
            <motion.div
              key={m.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={stagger(0.1)}
              className="grid items-center gap-12 lg:grid-cols-12"
            >
              {/* text */}
              <motion.div
                variants={fadeUp}
                className={`lg:col-span-5 ${m.reverse ? "lg:order-2 lg:col-start-8" : ""}`}
              >
                <SectionLabel>{m.eyebrow}</SectionLabel>
                <h3 className="text-balance text-3xl font-semibold leading-tight tracking-tight text-slate-900 sm:text-4xl">
                  {m.title}
                </h3>
                <p className="mt-5 text-lg leading-relaxed text-slate-600">
                  {m.desc}
                </p>
                <ul className="mt-6 space-y-3">
                  {m.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-3 text-sm text-slate-700">
                      <span className="mt-0.5 grid h-5 w-5 flex-none place-items-center rounded-full bg-emerald-100 text-emerald-700">
                        <IconCheck size={12} />
                      </span>
                      {b}
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* visual */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.8, ease }}
                className={`lg:col-span-7 ${m.reverse ? "lg:order-1 lg:col-start-1" : ""}`}
              >
                <Visual kind={m.visual} />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
