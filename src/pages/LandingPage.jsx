import Hero from "../components/sections/Hero";
import Features from "../components/sections/Features";
import Modules from "../components/sections/Modules";
import WhyGearGrid from "../components/sections/WhyGearGrid";
import Pricing from "../components/sections/Pricing";
import Testimonials from "../components/sections/Testimonials";
import CTA from "../components/sections/CTA";

export default function LandingPage() {
  return (
    <main>
      <Hero />
      <Features />
      <Modules />
      <WhyGearGrid />
      <Pricing />
      <Testimonials />
      <CTA />
    </main>
  );
}
