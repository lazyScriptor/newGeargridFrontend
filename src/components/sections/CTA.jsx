import { motion } from "framer-motion";
import Container from "../ui/Container";
import Button from "../ui/Button";
import { IconArrowRight } from "../../icons/Icons";
import { URLS } from "../../lib/urls";
import { fadeUp } from "../../lib/motion";

export default function CTA() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-28">
      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
          className="relative overflow-hidden rounded-3xl bg-slate-950 px-8 py-16 text-center text-white shadow-[0_30px_80px_-30px_rgba(15,23,42,0.5)] sm:px-16 sm:py-20"
        >
          <div
            aria-hidden
            className="absolute -top-32 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full opacity-50"
            style={{
              background:
                "radial-gradient(circle, rgba(245,158,11,0.35) 0%, rgba(15,23,42,0) 60%)",
            }}
          />
          <div
            aria-hidden
            className="absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
              backgroundSize: "32px 32px",
            }}
          />

          <div className="relative">
            <h2 className="mx-auto max-w-2xl text-balance text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
              Ready to run your rental ops like a flagship product?
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-balance text-base text-slate-400 sm:text-lg">
              Launch the console, or talk to us first — whichever you prefer.
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button as="a" href={URLS.login} variant="accent" size="lg" external>
                Launch the console
                <IconArrowRight size={18} />
              </Button>
              <Button
                as="Link"
                to="/contact"
                variant="outlineDark"
                size="lg"
              >
                Book a walkthrough
              </Button>
            </div>
            <div className="mt-8 text-xs text-slate-500">
              Existing super admin?{" "}
              <a
                href={URLS.superAdminLogin}
                rel="noopener noreferrer"
                className="text-amber-300 underline-offset-4 hover:underline"
              >
                Sign in to the platform console →
              </a>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
