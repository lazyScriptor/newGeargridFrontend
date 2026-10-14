import { motion } from "framer-motion";
import Container from "../ui/Container";
import SectionLabel from "../ui/SectionLabel";
import { fadeUp, stagger } from "../../lib/motion";

// ============================================================================
// CUSTOMER REVIEWS
// You can edit, add, or replace these reviews with your actual customer feedback.
// ============================================================================
const REVIEWS = [
  {
    rating: 5,
    quote:
      "Before GearGrid, we tracked 200+ camera lenses and bodies on notebooks and WhatsApp. We had at least one double-booking disaster every month. Now our staff checks availability in 5 seconds.",
    name: "Kasun Jayawardena",
    role: "Owner",
    company: "CineRental Studio",
    location: "Colombo",
    category: "Camera & AV Gear",
  },
  {
    rating: 5,
    quote:
      "The ID Security Vault feature alone has saved us thousands. Knowing we hold verified customer ID and have automatic late fees printed right on the bill stopped all customer arguments at the counter.",
    name: "Tharindu Perera",
    role: "Managing Partner",
    company: "Apex Event Productions",
    location: "Kandy",
    category: "Sound & Lighting",
  },
  {
    rating: 5,
    quote:
      "The workshop repair queue is brilliant. When equipment is returned with scratches or broken cables, we log it immediately and hold the deposit. It’s clean, professional, and dead simple to use.",
    name: "Dinesh Mendis",
    role: "Operations Manager",
    company: "ProTool Machinery Hire",
    location: "Galle",
    category: "Power Tools & Machinery",
  },
];

export default function Testimonials() {
  return (
    <section id="reviews" className="relative bg-slate-50 py-20 sm:py-28">
      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger()}
          className="mx-auto max-w-2xl text-center"
        >
          <motion.div variants={fadeUp}>
            <SectionLabel>Customer Reviews</SectionLabel>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="text-balance text-3xl font-bold tracking-tight text-slate-900 sm:text-5xl"
          >
            Trusted by rental houses{" "}
            <span className="text-amber-600">and equipment operators.</span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mt-4 text-balance text-base text-slate-600 sm:text-lg"
          >
            See how everyday rental shop owners use GearGrid to protect their inventory and speed up counter checkout.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={stagger(0.1)}
          className="mt-14 grid gap-6 md:grid-cols-3"
        >
          {REVIEWS.map((r, i) => (
            <motion.figure
              key={r.name}
              variants={fadeUp}
              className="relative flex flex-col justify-between rounded-2xl border border-slate-200/90 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-amber-300"
            >
              <div>
                {/* 5 Stars */}
                <div className="flex items-center gap-1 text-amber-500 mb-4">
                  {[...Array(r.rating)].map((_, idx) => (
                    <svg
                      key={idx}
                      className="h-4 w-4 fill-current"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="ml-2 rounded bg-amber-50 border border-amber-200/60 px-1.5 py-0.5 text-[10px] font-bold text-amber-800">
                    Verified Operator
                  </span>
                </div>

                <blockquote className="text-sm leading-relaxed text-slate-700">
                  "{r.quote}"
                </blockquote>
              </div>

              <figcaption className="mt-6 flex items-center gap-3.5 border-t border-slate-100 pt-4">
                <span
                  className={`grid h-10 w-10 place-items-center rounded-full text-xs font-bold text-white shadow-sm ${
                    [
                      "bg-gradient-to-br from-amber-500 to-orange-600",
                      "bg-gradient-to-br from-blue-500 to-indigo-600",
                      "bg-gradient-to-br from-emerald-500 to-teal-600",
                    ][i % 3]
                  }`}
                >
                  {r.name.split(" ").map((n) => n[0]).join("")}
                </span>
                <div className="text-xs">
                  <div className="font-bold text-slate-900">{r.name}</div>
                  <div className="text-slate-500 font-medium">
                    {r.role}, {r.company}
                  </div>
                  <div className="text-[11px] text-amber-600 font-semibold mt-0.5">
                    {r.category} · {r.location}
                  </div>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
