import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import SEO from "../components/SEO";
import Container from "../components/ui/Container";
import SectionLabel from "../components/ui/SectionLabel";
import Button from "../components/ui/Button";
import {
  IconMail,
  IconPhone,
  IconMapPin,
  IconCheck,
  IconArrowRight,
} from "../icons/Icons";
import { postJSON } from "../lib/api";
import { fadeUp, ease } from "../lib/motion";

const TYPES = [
  { value: "demo", label: "Request a demo" },
  { value: "sales", label: "Sales inquiry" },
  { value: "support", label: "Customer support" },
  { value: "partnership", label: "Partnership" },
  { value: "other", label: "Something else" },
];

const initialForm = {
  name: "",
  email: "",
  company: "",
  phone: "",
  inquiry_type: "demo",
  message: "",
};

// Honeypot field — bots fill every input. Real users never see this.
const HONEYPOT = "website_url";

export default function ContactPage() {
  const [searchParams] = useSearchParams();
  const [form, setForm] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [success, setSuccess] = useState(null);
  const [honeypot, setHoneypot] = useState("");

  // Pre-select inquiry_type via ?type= query param (used by pricing CTAs).
  useEffect(() => {
    const t = searchParams.get("type");
    if (t && TYPES.some((x) => x.value === t)) {
      setForm((f) => ({ ...f, inquiry_type: t }));
    }
  }, [searchParams]);

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    // Silently drop if honeypot was filled — almost certainly a bot.
    if (honeypot.trim()) {
      setSuccess({ inquiry_id: "—" });
      return;
    }
    setSubmitting(true);
    try {
      const res = await postJSON("/contact/inquiry", form);
      setSuccess(res);
      setForm(initialForm);
    } catch (err) {
      setErrorMsg(err.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const contactJsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact GearGrid",
    description:
      "Talk to the GearGrid team — request a demo, ask about pricing, or get technical support.",
    url: "https://geargrid.live/contact",
    mainEntity: {
      "@type": "Organization",
      name: "GearGrid",
      contactPoint: [
        {
          "@type": "ContactPoint",
          contactType: "sales",
          email: "contact@geargrid.live",
          telephone: "+94-11-234-5678",
          areaServed: "LK",
          availableLanguage: ["English", "Sinhala"],
        },
        {
          "@type": "ContactPoint",
          contactType: "customer support",
          email: "contact@geargrid.live",
          areaServed: "LK",
        },
      ],
    },
  };

  return (
    <main className="relative">
      <SEO
        title="Contact us"
        description="Talk to the GearGrid team — request a demo, ask about pricing, or get technical support. We reply within one business day."
        path="/contact"
        jsonLd={contactJsonLd}
      />
      {/* ambient */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[400px] bg-gradient-to-b from-amber-50/60 via-white to-transparent"
      />

      <section className="pt-32 pb-24 sm:pt-40 sm:pb-32">
        <Container>
          <div className="grid gap-16 lg:grid-cols-12">
            {/* Left: intro + contact info */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="lg:col-span-5"
            >
              <SectionLabel>Contact</SectionLabel>
              <h1 className="text-balance text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
                Let's talk about{" "}
                <span className="bg-gradient-to-br from-amber-500 to-orange-500 bg-clip-text text-transparent">
                  your rental ops.
                </span>
              </h1>
              <p className="mt-5 text-lg leading-relaxed text-slate-600">
                Whether you're scoping a demo, comparing platforms, or need
                hands-on support — drop us a note. We reply within one business
                day.
              </p>

              <div className="mt-10 space-y-5">
                {[
                  {
                    icon: IconMail,
                    label: "Email",
                    value: "contact@geargrid.live",
                    href: "mailto:contact@geargrid.live",
                  },
                  {
                    icon: IconPhone,
                    label: "Phone",
                    value: "+94 7777 222 95",
                    href: "tel:+94 7777 222 95",
                  },
                  {
                    icon: IconMapPin,
                    label: "Office",
                    value: "Colombo, Sri Lanka",
                  },
                ].map((c) => (
                  <div key={c.label} className="flex items-start gap-4">
                    <div className="grid h-11 w-11 flex-none place-items-center rounded-xl bg-slate-100 text-slate-700">
                      <c.icon size={20} />
                    </div>
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                        {c.label}
                      </div>
                      {c.href ? (
                        <a
                          href={c.href}
                          className="mt-0.5 block text-base text-slate-900 hover:text-amber-600"
                        >
                          {c.value}
                        </a>
                      ) : (
                        <div className="mt-0.5 text-base text-slate-900">
                          {c.value}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10 rounded-2xl border border-amber-200 bg-amber-50/60 p-5 text-sm leading-relaxed text-amber-900">
                <strong className="block">Already a customer?</strong>
                For account-specific issues, sign in to the console and use the
                in-app support widget — your account context comes attached
                automatically.
              </div>
            </motion.div>

            {/* Right: form */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="lg:col-span-7"
            >
              <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-8 shadow-[0_20px_60px_-30px_rgba(15,23,42,0.25)] sm:p-10">
                <AnimatePresence mode="wait">
                  {success ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5, ease }}
                      className="py-10 text-center"
                    >
                      <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-emerald-100 text-emerald-700">
                        <IconCheck size={28} />
                      </div>
                      <h3 className="mt-5 text-2xl font-semibold tracking-tight text-slate-900">
                        Got it — we'll be in touch.
                      </h3>
                      <p className="mx-auto mt-3 max-w-md text-slate-600">
                        Your inquiry has been logged
                        {success.inquiry_id && success.inquiry_id !== "—"
                          ? ` (#${success.inquiry_id})`
                          : ""}
                        . A team member will reach out within one business day.
                      </p>
                      <div className="mt-7 flex items-center justify-center gap-3">
                        <Button
                          variant="secondary"
                          onClick={() => setSuccess(null)}
                        >
                          Send another
                        </Button>
                        <Button as="Link" to="/" variant="primary">
                          Back to home
                          <IconArrowRight size={16} />
                        </Button>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={handleSubmit}
                      noValidate
                      className="space-y-5"
                    >
                      {/* Honeypot — visually hidden but reachable by bots */}
                      <label
                        htmlFor={HONEYPOT}
                        className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden"
                        aria-hidden
                      >
                        Website
                        <input
                          id={HONEYPOT}
                          name={HONEYPOT}
                          type="text"
                          tabIndex={-1}
                          autoComplete="off"
                          value={honeypot}
                          onChange={(e) => setHoneypot(e.target.value)}
                        />
                      </label>

                      <div className="grid gap-5 sm:grid-cols-2">
                        <Field
                          label="Name"
                          required
                          value={form.name}
                          onChange={update("name")}
                          placeholder="Jane Doe"
                          autoComplete="name"
                        />
                        <Field
                          label="Work email"
                          type="email"
                          required
                          value={form.email}
                          onChange={update("email")}
                          placeholder="jane@company.com"
                          autoComplete="email"
                        />
                        <Field
                          label="Company"
                          value={form.company}
                          onChange={update("company")}
                          placeholder="Acme Rentals"
                          autoComplete="organization"
                        />
                        <Field
                          label="Phone"
                          type="tel"
                          value={form.phone}
                          onChange={update("phone")}
                          placeholder="+94 77 123 4567"
                          autoComplete="tel"
                        />
                      </div>

                      <div>
                        <label className="mb-2 block text-sm font-medium text-slate-700">
                          What's this about?
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {TYPES.map((t) => (
                            <button
                              key={t.value}
                              type="button"
                              onClick={() =>
                                setForm((f) => ({
                                  ...f,
                                  inquiry_type: t.value,
                                }))
                              }
                              className={`rounded-full px-4 py-2 text-sm font-medium ring-1 transition-all ${
                                form.inquiry_type === t.value
                                  ? "bg-slate-900 text-white ring-slate-900"
                                  : "bg-white text-slate-700 ring-slate-200 hover:bg-slate-50"
                              }`}
                            >
                              {t.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="mb-2 block text-sm font-medium text-slate-700">
                          Message <span className="text-rose-500">*</span>
                        </label>
                        <textarea
                          required
                          minLength={10}
                          maxLength={5000}
                          rows={5}
                          value={form.message}
                          onChange={update("message")}
                          placeholder="Tell us about your fleet, your team size, and what you're hoping to achieve…"
                          className="block w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/10"
                        />
                        <div className="mt-1 text-right text-xs text-slate-400">
                          {form.message.length} / 5000
                        </div>
                      </div>

                      <AnimatePresence>
                        {errorMsg && (
                          <motion.div
                            initial={{ opacity: 0, y: -8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800"
                          >
                            {errorMsg}
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <div className="flex flex-col items-start justify-between gap-3 pt-2 sm:flex-row sm:items-center">
                        <p className="text-xs text-slate-500">
                          By submitting, you agree to be contacted about your
                          inquiry. We don't share your details.
                        </p>
                        <Button
                          type="submit"
                          variant="primary"
                          size="lg"
                          disabled={submitting}
                          className={`min-w-[160px] justify-center ${submitting ? "cursor-wait opacity-70" : ""}`}
                        >
                          {submitting ? "Sending…" : "Send inquiry"}
                          {!submitting && <IconArrowRight size={18} />}
                        </Button>
                      </div>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>
    </main>
  );
}

// Single text field with consistent styling.
function Field({ label, required, ...props }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-slate-700">
        {label} {required && <span className="text-rose-500">*</span>}
      </span>
      <input
        required={required}
        {...props}
        className="block w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/10"
      />
    </label>
  );
}
