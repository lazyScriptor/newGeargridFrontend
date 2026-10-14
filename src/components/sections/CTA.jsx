import { motion } from "framer-motion";
import Container from "../ui/Container";
import Button from "../ui/Button";
import { IconArrowRight } from "../../icons/Icons";
import { URLS } from "../../lib/urls";
import { fadeUp } from "../../lib/motion";

export default function CTA() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-28">
      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
          className="relative overflow-hidden rounded-3xl bg-slate-950 px-8 py-16 text-center text-white shadow-2xl sm:px-16 sm:py-20"
        >
          <div
            aria-hidden
            className="absolute -top-32 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full opacity-40"
            style={{
              background:
                "radial-gradient(circle, rgba(245,158,11,0.3) 0%, rgba(15,23,42,0) 65%)",
            }}
          />
          <div
            aria-hidden
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
              backgroundSize: "32px 32px",
            }}
          />

          <div className="relative">
            <h2 className="mx-auto max-w-2xl text-balance text-3xl font-bold leading-tight tracking-tight sm:text-5xl">
              Ready to take total control of your rental business?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-balance text-base text-slate-400 sm:text-lg">
              Test the live console right now, or message us on WhatsApp for a personal 1-on-1 setup session.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3.5 sm:flex-row">
              <Button as="a" href={URLS.login} variant="accent" size="lg" external>
                Try the live demo console
                <IconArrowRight size={18} />
              </Button>
              <Button
                as="Link"
                to="/contact"
                variant="outlineDark"
                size="lg"
              >
                Book a 1-on-1 walkthrough
              </Button>
            </div>
            <div className="mt-7 text-xs text-slate-500">
              No credit card required · Free assisted equipment setup · Zero risk
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
