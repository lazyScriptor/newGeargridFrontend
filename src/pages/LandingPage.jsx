import SEO from "../components/SEO";
import Hero from "../components/sections/Hero";
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
      "@type": "SoftwareApplication",
      "@id": "https://geargrid.live/#software",
      name: "GearGrid",
      description:
        "Multi-tenant equipment rental management platform — inventory, contracts, maintenance, and accounting in one secure SaaS.",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      url: "https://geargrid.live/",
      offers: {
        "@type": "AggregateOffer",
        priceCurrency: "LKR",
        lowPrice: "4900",
        highPrice: "9900",
        offerCount: 3,
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        reviewCount: "27",
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What is GearGrid?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "GearGrid is a multi-tenant SaaS platform that unifies equipment inventory, rentals & invoicing, maintenance workflows, and accounting into a single secure console built for equipment rental businesses.",
          },
        },
        {
          "@type": "Question",
          name: "Is my data isolated from other tenants?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes — each tenant runs on its own MySQL database. There are no shared tables and no cross-tenant queries by architecture, not by promise.",
          },
        },
        {
          "@type": "Question",
          name: "Do I need separate tools for accounting and maintenance?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. GearGrid includes maintenance (defect logging, technician assignment, repair tracking) and accounting (live AR, payment recording, expense ledger) as native modules — no integrations required.",
          },
        },
        {
          "@type": "Question",
          name: "How much does GearGrid cost?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Starter is LKR 4,900/month for a single warehouse, Pro is LKR 9,900/month for unlimited equipment and multi-warehouse support, and Enterprise is custom-priced with a dedicated DB cluster and SLAs.",
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
        title="The OS for equipment rental businesses"
        description="GearGrid unifies inventory, rentals & invoicing, maintenance, and accounting into a single secure multi-tenant platform. Built for modern equipment rental operators."
        path="/"
        jsonLd={homeJsonLd}
      />
      <main>
        <Hero />
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
