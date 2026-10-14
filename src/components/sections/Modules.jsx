import { motion } from "framer-motion";
import Container from "../ui/Container";
import SectionLabel from "../ui/SectionLabel";
import { IconCheck, IconShield, IconReceipt, IconWrench, IconBox } from "../../icons/Icons";
import { fadeUp, stagger, ease } from "../../lib/motion";

const MODULES = [
  {
    eyebrow: "Inventory & Real-Time Availability",
    title: "Know what's on the shelf and what's out on rent.",
    desc: "Track every camera body, lens, generator, light, and power tool by serial number and location. Set daily, weekend, or weekly rates. Before accepting a new booking, know with 100% certainty if the gear is available.",
    bullets: [
      "Live calendar availability — prevent costly double-bookings",
      "Serial number and barcode tracking per equipment unit",
      "Daily, weekend, and weekly rental rate calculations",
      "Instant status badges: Available, On Rent, Reserved, In Workshop",
    ],
    visual: "inventory",
  },
  {
    eyebrow: "Fast Counter Checkout & POS",
    title: "Generate professional rental invoices in 30 seconds.",
    desc: "Built for busy shop counters. Select customer, add gear, apply transport fees or discounts, collect cash or bank advances, and print clean thermal or A4 bills. Send pre-formatted invoice summaries directly to customer WhatsApp.",
    bullets: [
      "30-second checkout flow designed for counter staff",
      "Record advance deposits and live remaining balance due",
      "1-Click share bill to customer WhatsApp or email PDF",
      "Print thermal receipts or standard A4 / Letter invoices",
    ],
    visual: "invoice",
    reverse: true,
  },
  {
    eyebrow: "Security Vault & Automated Late Fees",
    title: "Stop losing gear and stop arguing over late returns.",
    desc: "Hold customer NIC cards or security deposits safely in your vault until gear is returned intact. If a client returns 2 hours or 2 days late, GearGrid calculates exact late penalty fees automatically on the final settlement.",
    bullets: [
      "Customer NIC / Passport verification and collateral safe-hold",
      "Automatic hourly and daily late fee calculation",
      "Return inspection checklist to verify accessories and cables",
      "Partial returns: restock returned items while keeping the rest on rent",
    ],
    visual: "security_returns",
  },
  {
    eyebrow: "Workshop Repairs & Defect Triage",
    title: "Catch broken gear at return, not before the next booking.",
    desc: "When equipment is returned damaged, log the defect at the counter, charge the repair deduction to the customer, and immediately route the unit to the workshop queue. Damaged units are locked so nobody rents them by mistake.",
    bullets: [
      "Defect logging upon return with customer responsibility record",
      "Workshop queue: Pending Inspection → In Repair → Restocked",
      "Assign internal technicians or track external repair vendor costs",
      "Historical repair log per serial number to track equipment ROI",
    ],
    visual: "maintenance",
    reverse: true,
  },
];

// ── Realistic Visual Primitives ──────────────────────────────────────────────
const Visual = ({ kind }) => {
  switch (kind) {
    case "inventory":
      return (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xl sm:p-6">
          <div className="mb-4 flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Live Inventory Status
              </div>
              <div className="text-base font-bold text-slate-900 mt-0.5">
                Main Equipment Stockroom
              </div>
            </div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              Live Available
            </div>
          </div>
          <div className="space-y-2.5">
            {[
              { name: "Sony FX3 Cinema Camera Kit", serial: "SN-8401-FX3", rate: "Rs. 18,500/d", status: "ON RENT", badge: "bg-amber-100 text-amber-800" },
              { name: "Sony 24-70mm f/2.8 GM II", serial: "SN-3192-GM2", rate: "Rs. 4,500/d", status: "ON RENT", badge: "bg-amber-100 text-amber-800" },
              { name: "Aputure 300d II Video Light", serial: "SN-1049-APT", rate: "Rs. 3,800/d", status: "AVAILABLE", badge: "bg-emerald-100 text-emerald-800" },
              { name: "DJI RS3 Pro Gimbal Combo", serial: "SN-0922-GMB", rate: "Rs. 5,000/d", status: "AVAILABLE", badge: "bg-emerald-100 text-emerald-800" },
              { name: "Sennheiser EW-112P G4 Wireless", serial: "SN-5521-MIC", rate: "Rs. 2,500/d", status: "IN WORKSHOP", badge: "bg-rose-100 text-rose-800" },
            ].map((r) => (
              <div
                key={r.serial}
                className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50/70 p-3 text-xs"
              >
                <div>
                  <div className="font-semibold text-slate-900">{r.name}</div>
                  <div className="flex items-center gap-2 mt-0.5 text-slate-500 text-[11px]">
                    <span className="font-mono text-slate-400">{r.serial}</span>
                    <span>·</span>
                    <span className="font-medium text-slate-700">{r.rate}</span>
                  </div>
                </div>
                <div className={`rounded-md px-2 py-0.5 text-[10px] font-bold ${r.badge}`}>
                  {r.status}
                </div>
              </div>
            ))}
          </div>
        </div>
      );

    case "invoice":
      return (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xl sm:p-6">
          <div className="flex items-start justify-between border-b border-slate-100 pb-3">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Counter Point-of-Sale
              </div>
              <div className="text-base font-bold text-slate-900 mt-0.5">
                Invoice #INV-2026-092
              </div>
              <div className="text-xs text-slate-500">Customer: Ruwan Jayasinghe · Colombo 05</div>
            </div>
            <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800">
              DISPATCHED
            </span>
          </div>

          <div className="mt-4 space-y-2 text-xs">
            <div className="flex justify-between py-1.5 border-b border-slate-50">
              <span className="font-medium text-slate-800">Sony A7 IV Kit (2 Days)</span>
              <span className="font-mono font-semibold text-slate-900">Rs. 16,000</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-50">
              <span className="font-medium text-slate-800">Tamron 28-75mm f/2.8 G2</span>
              <span className="font-mono font-semibold text-slate-900">Rs. 5,000</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-50">
              <span className="font-medium text-slate-800">Godox AD200 Pro Strobe</span>
              <span className="font-mono font-semibold text-slate-900">Rs. 3,500</span>
            </div>
            <div className="flex justify-between py-1 text-slate-500 text-[11px]">
              <span>Delivery Transport</span>
              <span className="font-mono">+ Rs. 1,500</span>
            </div>
          </div>

          <div className="mt-4 rounded-xl bg-slate-900 p-3.5 text-white">
            <div className="flex justify-between text-xs text-slate-400">
              <span>Advance Paid (Cash):</span>
              <span className="font-mono font-bold text-emerald-400">Rs. 15,000</span>
            </div>
            <div className="mt-2 pt-2 border-t border-slate-800 flex justify-between items-baseline">
              <span className="text-xs font-bold text-slate-200">Balance Due on Return:</span>
              <span className="font-mono text-base font-extrabold text-amber-400">Rs. 11,000</span>
            </div>
          </div>

          <div className="mt-4 flex gap-2">
            <div className="flex-1 rounded-lg bg-emerald-600 p-2 text-center text-xs font-bold text-white">
              📱 Send WhatsApp Bill
            </div>
            <div className="rounded-lg border border-slate-300 p-2 text-center text-xs font-semibold text-slate-700">
              🖨️ Print Receipt
            </div>
          </div>
        </div>
      );

    case "security_returns":
      return (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xl sm:p-6">
          <div className="mb-4 flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Return Inspection & Vault
              </div>
              <div className="text-base font-bold text-slate-900 mt-0.5">
                Customer Check-In
              </div>
            </div>
            <div className="flex items-center gap-1.5 rounded-lg bg-amber-50 border border-amber-300 px-2.5 py-1 text-xs font-bold text-amber-900">
              <IconShield size={14} className="text-amber-600" />
              NIC Locked in Safe
            </div>
          </div>

          {/* Late fee card */}
          <div className="rounded-xl border border-rose-200 bg-rose-50/70 p-3.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-rose-800">Delayed Return Detected</span>
              <span className="rounded bg-rose-200/80 px-2 py-0.5 text-[10px] font-mono font-bold text-rose-900">
                +4 Hours Late
              </span>
            </div>
            <div className="mt-2 text-xs text-rose-700">
              Auto-calculated overtime penalty applied to invoice ledger:
            </div>
            <div className="mt-1 text-sm font-bold font-mono text-rose-900">
              + Rs. 3,500 Late Fee Added
            </div>
          </div>

          {/* Checklist */}
          <div className="mt-4 space-y-2">
            <div className="text-xs font-bold text-slate-700">Return Condition Checklist:</div>
            {[
              { item: "Lens front & rear glass clean", ok: true },
              { item: "Both battery chargers returned", ok: true },
              { item: "SD Cards and cables accounted for", ok: true },
            ].map((c) => (
              <div key={c.item} className="flex items-center gap-2 text-xs text-slate-600">
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                  <IconCheck size={12} />
                </span>
                {c.item}
              </div>
            ))}
          </div>

          <div className="mt-5 rounded-lg bg-slate-900 p-2.5 text-center text-xs font-bold text-white">
            Unlock & Return Customer NIC Card
          </div>
        </div>
      );

    case "maintenance":
    default:
      return (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xl sm:p-6">
          <div className="mb-4 flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Workshop & Defect Queue
              </div>
              <div className="text-base font-bold text-slate-900 mt-0.5">
                Repair Management
              </div>
            </div>
            <span className="rounded-full bg-amber-100 px-2.5 py-1 text-xs font-bold text-amber-800">
              3 Units in Repair
            </span>
          </div>

          <div className="space-y-3">
            {[
              {
                unit: "Godox SL-150W II Video Light",
                serial: "GDX-044-LGT",
                defect: "Cooling fan noise / overheating",
                tech: "Technician: Sunimal",
                cost: "Est: Rs. 4,500",
                badge: "In Repair",
                badgeColor: "bg-blue-100 text-blue-800",
              },
              {
                unit: "Sony 70-200mm f/2.8 GM Lens",
                serial: "SN-9102-LNS",
                defect: "Focus ring stiff after outdoor shoot",
                tech: "Vendor: TechZone Service",
                cost: "Charged to Client INV-079",
                badge: "Pending Parts",
                badgeColor: "bg-amber-100 text-amber-800",
              },
              {
                unit: "Yamaha StagePas 600BT PA System",
                serial: "PA-600-YM",
                defect: "Channel 3 XLR loose contact",
                tech: "Technician: Sunimal",
                cost: "Repaired & Tested",
                badge: "Ready to Restock",
                badgeColor: "bg-emerald-100 text-emerald-800",
              },
            ].map((d) => (
              <div key={d.serial} className="rounded-xl border border-slate-100 bg-slate-50/70 p-3 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-900">{d.unit}</span>
                  <span className={`rounded px-1.5 py-0.5 text-[10px] font-bold ${d.badgeColor}`}>
                    {d.badge}
                  </span>
                </div>
                <div className="mt-1 text-rose-600 font-medium text-[11px]">{d.defect}</div>
                <div className="mt-2 flex items-center justify-between text-slate-500 text-[11px] pt-1.5 border-t border-slate-200/60">
                  <span>{d.tech}</span>
                  <span className="font-mono font-semibold text-slate-700">{d.cost}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
  }
};

export default function Modules() {
  return (
    <section id="modules" className="relative bg-white py-20 sm:py-28">
      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger()}
          className="mx-auto max-w-2xl text-center"
        >
          <motion.div variants={fadeUp}>
            <SectionLabel>Core Daily Workflows</SectionLabel>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="text-balance text-3xl font-bold tracking-tight text-slate-900 sm:text-5xl"
          >
            How GearGrid manages your shop{" "}
            <span className="text-amber-600">from morning to night.</span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mt-4 text-balance text-base text-slate-600 sm:text-lg"
          >
            Designed specifically for camera rentals, wedding equipment, tools, and AV production houses.
          </motion.p>
        </motion.div>

        <div className="mt-16 space-y-20 sm:space-y-28">
          {MODULES.map((m) => (
            <motion.div
              key={m.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={stagger(0.1)}
              className="grid items-center gap-10 lg:grid-cols-12"
            >
              {/* Text */}
              <motion.div
                variants={fadeUp}
                className={`lg:col-span-5 ${m.reverse ? "lg:order-2 lg:col-start-8" : ""}`}
              >
                <div className="text-xs font-bold uppercase tracking-wider text-amber-600">
                  {m.eyebrow}
                </div>
                <h3 className="mt-2 text-balance text-2xl font-bold leading-tight tracking-tight text-slate-900 sm:text-3xl">
                  {m.title}
                </h3>
                <p className="mt-4 text-base leading-relaxed text-slate-600">
                  {m.desc}
                </p>
                <ul className="mt-6 space-y-2.5">
                  {m.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2.5 text-sm text-slate-700 font-medium">
                      <span className="mt-0.5 flex h-4 w-4 flex-none items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                        <IconCheck size={12} />
                      </span>
                      {b}
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Visual preview */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, ease }}
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
