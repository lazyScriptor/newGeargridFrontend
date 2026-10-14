import SEO from "../components/SEO";
import Hero from "../components/sections/Hero";
import VideoShowcase from "../components/sections/VideoShowcase";
import Features from "../components/sections/Features";
import Modules from "../components/sections/Modules";
import WhyGearGrid from "../components/sections/WhyGearGrid";
import Pricing from "../components/sections/Pricing";
import Testimonials from "../components/sections/Testimonials";
import FAQ from "../components/sections/FAQ";
import CTA from "../components/sections/CTA";

// FAQPage + SoftwareApplication JSON-LD helps Google render rich-snippet
// stars + pricing in the SERP. Keep keys aligned with the on-page content
// — Google compares them and demotes inconsistent pages.
const homeJsonLd = {
  "@context": "https://schema.org",
  "@graph": [

    {
      "@type": "LocalBusiness",
      "@id": "https://geargrid.live/#localbusiness",
      name: "GearGrid",
      url: "https://geargrid.live/",
      image: "https://geargrid.live/og-image.png",
      priceRange: "LKR 4,900 – 9,900/month",
      telephone: "+94-77-772-2295",
      email: "contact@geargrid.live",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Colombo",
        addressCountry: "LK",
      },
      areaServed: [
        { "@type": "Country", name: "Sri Lanka" },
        { "@type": "AdministrativeArea", name: "South Asia" },
        { "@type": "Country", name: "Worldwide" },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What kind of rental businesses is GearGrid built for?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "GearGrid is purpose-built for machinery and equipment rental businesses in Sri Lanka and worldwide - including construction machinery, plant hire, generators, power tools, cinema cameras, AV sound and lighting, party and wedding rentals, and event gear.",
          },
        },
        {
          "@type": "Question",
          name: "Can my non-technical counter staff learn to use it quickly?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. The system is intentionally designed with zero technical barrier. If your staff can use WhatsApp or Facebook on a phone, they can comfortably search stock, create invoices, and check in returns within 15 minutes. Step-by-step video tutorials in Sinhala and English are provided.",
          },
        },
        {
          "@type": "Question",
          name: "How does the ID Card Security Vault protect my equipment?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "When a customer rents high-value gear, counter staff record their National Identity Card (NIC) or Passport number and lock their collateral status in the system. The invoice tracks the held ID card until all equipment is returned and inspected at the counter.",
          },
        },
        {
          "@type": "Question",
          name: "What happens when a customer returns equipment late or damaged?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Overdue late fees are calculated automatically on the final bill based on your rates, preventing awkward counter disputes. If gear is damaged, staff log the defect right on the return record, charge the customer repair deduction, and automatically route the item to the workshop queue.",
          },
        },
        {
          "@type": "Question",
          name: "Can I monitor my shop from my mobile phone?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. GearGrid is mobile-first and optimized for standard 4G smartphone connections. You can check today's collections, dispatched equipment, and overdue returns from anywhere in the world on your phone, tablet, or laptop.",
          },
        },
        {
          "@type": "Question",
          name: "Is my customer database and revenue confidential?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "100% confidential. Your customer lists, rental pricing, and business revenue are securely isolated and automatically backed up daily in the cloud. No other business ever has access to your records.",
          },
        },
      ],
    },
  ],
};

export default function LandingPage() {
  return (
    <>
      <SEO
        title="Machine & Equipment Rental Software Sri Lanka"
        description="GearGrid is Sri Lanka's #1 machine and equipment rental software. Live fleet tracking, 30-sec counter POS, customer NIC security vault, and automated late fees."
        path="/"
        jsonLd={homeJsonLd}
      />
      <main>
        <Hero />
        <VideoShowcase />
        <Features />
        <Modules />
        <WhyGearGrid />
        <Pricing />
        <Testimonials />
        <FAQ />
        <CTA />
      </main>
    </>
  );
}
