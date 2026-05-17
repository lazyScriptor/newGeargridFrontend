import { motion } from "framer-motion";
import Container from "../ui/Container";
import SectionLabel from "../ui/SectionLabel";
import { fadeUp, stagger } from "../../lib/motion";

const QUOTES = [
  {
    quote:
      "We were running 12,000 line items on spreadsheets. GearGrid replaced four tools in one week. Our team actually wants to use it.",
    name: "Dilshan F.",
    role: "Operations Director",
    company: "Hi-Lift Equipment",
  },
  {
    quote:
      "The maintenance queue alone saves us a full day of admin every week. Defects go in on return; they never get lost.",
    name: "Anjali R.",
    role: "Workshop Manager",
    company: "GearLine Rentals",
  },
  {
    quote:
      "Multi-warehouse stock and real-time AR. That was the whole pitch. They delivered exactly that.",
    name: "Nimal P.",
    role: "Managing Director",
    company: "ConstructPro Lanka",
  },
];

export default function Testimonials() {
  return (
    <section className="relative bg-slate-50/50 py-24 sm:py-32">
      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger()}
          className="mx-auto max-w-2xl text-center"
        >
          <motion.div variants={fadeUp}>
            <SectionLabel>Loved by operators</SectionLabel>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="text-balance text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl"
          >
            Real teams.{" "}
            <span className="text-slate-400">Real time saved.</span>
          </motion.h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={stagger(0.1)}
          className="mt-16 grid gap-6 md:grid-cols-3"
        >
          {QUOTES.map((q, i) => (
            <motion.figure
              key={q.name}
              variants={fadeUp}
              className="relative flex flex-col rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition-shadow hover:shadow-md"
            >
              <span
                aria-hidden
                className="absolute -top-3 left-7 text-5xl font-serif leading-none text-amber-400"
              >
                "
              </span>
              <blockquote className="flex-1 text-base leading-relaxed text-slate-700">
                {q.quote}
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3 border-t border-slate-100 pt-5">
                <span
                  className={`grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br text-sm font-semibold text-white ${
                    ["from-amber-400 to-orange-500", "from-blue-400 to-indigo-500", "from-emerald-400 to-teal-500"][i]
                  }`}
                >
                  {q.name.split(" ").map((n) => n[0]).join("")}
                </span>
                <div className="text-sm">
                  <div className="font-semibold text-slate-900">{q.name}</div>
                  <div className="text-slate-500">
                    {q.role}, {q.company}
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
