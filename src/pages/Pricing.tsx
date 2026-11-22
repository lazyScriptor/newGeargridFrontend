import type { PageMeta } from '../seo/types'
import { PRICES, SIGN_IN_URL, WHATSAPP_URL } from '../lib/config'
import { breadcrumbJsonLd, faqJsonLd, PATHS, type Faq } from '../content/pages'
import { Checklist, CtaBand, FaqBlock, PageHero, Prose, RelatedLinks, Section } from './sections/Blocks'

const faqs: Faq[] = [
  {
    q: 'Is the first month really free?',
    a: 'Yes. The first month is free on every plan. There is no setup fee, and you can cancel anytime.',
  },
  {
    q: 'How much is each plan?',
    a: `Starter is ${PRICES.USD.starter} (${PRICES.LKR.starter}) per month. Pro is ${PRICES.USD.pro} (${PRICES.LKR.pro}) per month. Enterprise is priced to fit your business, so contact us for a quote.`,
  },
  {
    q: 'Can I change plans later?',
    a: 'Talk to us on WhatsApp or by email when you want to move up. A growing shop usually starts on Starter and moves to Pro when it passes 200 items, needs more than 3 staff accounts or opens a second location.',
  },
  {
    q: 'Do I pay extra to set up or import my equipment?',
    a: 'No. There is no setup fee. You can import your equipment list from a CSV or Excel file yourself.',
  },
  {
    q: 'Is there a contract?',
    a: 'No. You can cancel anytime.',
  },
  {
    q: 'Which currency are the prices in?',
    a: `We show both. Starter is ${PRICES.USD.starter} or ${PRICES.LKR.starter}, and Pro is ${PRICES.USD.pro} or ${PRICES.LKR.pro}, per month. Ask us how payment works for your country.`,
  },
]

export const meta: { en: PageMeta } = {
  en: {
    title: 'GearGrid Pricing: Rental Software from $19 a Month',
    description:
      'GearGrid pricing: Starter $19 (Rs. 5,900), Pro $39 (Rs. 9,900) and custom Enterprise per month. First month free, no setup fee, cancel anytime.',
    jsonLd: [faqJsonLd(faqs), breadcrumbJsonLd('Pricing', PATHS.pricing)],
  },
}

function Plan({
  name,
  price,
  priceNote,
  blurb,
  points,
  featured = false,
  cta,
}: {
  name: string
  price: string
  priceNote: string
  blurb: string
  points: string[]
  featured?: boolean
  cta: { href: string; label: string }
}) {
  return (
    <div className={`flex flex-col rounded-[24px] p-7 sm:p-8 ${featured ? 'bg-ink text-white' : 'bg-white text-ink ring-1 ring-line'}`}>
      <h3 className="text-[20px] font-semibold tracking-tight">{name}</h3>
      <p className={`mt-2 text-[14px] ${featured ? 'text-white/65' : 'text-muted'}`}>{blurb}</p>
      <p className={`mt-6 text-[36px] font-semibold leading-none tracking-[-0.03em] tabular-nums ${featured ? 'text-brand' : 'text-ink'}`}>{price}</p>
      <p className={`mt-2 text-[14px] tabular-nums ${featured ? 'text-white/65' : 'text-muted'}`}>{priceNote}</p>
      <ul className="mt-6 flex-1 space-y-3 text-[15px]">
        {points.map((p) => (
          <li key={p} className="flex gap-3">
            <span aria-hidden="true" className="mt-[7px] h-2 w-2 shrink-0 rounded-full bg-brand" />
            <span className={featured ? 'text-white/85' : 'text-ink-2'}>{p}</span>
          </li>
        ))}
      </ul>
      <a
        href={cta.href}
        className={`mt-8 rounded-full px-6 py-3 text-center text-[15px] font-semibold transition-colors ${
          featured ? 'bg-brand text-ink hover:bg-brand-deep' : 'bg-ink text-white hover:bg-ink-2'
        }`}
      >
        {cta.label}
      </a>
    </div>
  )
}

export default function PricingPage() {
  return (
    <main>
      <PageHero
        eyebrow="Pricing"
        title="Simple rental software pricing. Your first month is free."
        lead="Three plans for shops of different sizes. No setup fee, and you can cancel anytime. Prices are per month and shown in US dollars and Sri Lankan rupees."
      />

      <Section title="Choose a plan" intro="Every plan includes the counter basics. Bigger plans add items, staff and tools.">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <Plan
            name="Starter"
            price={PRICES.USD.starter}
            priceNote={`${PRICES.LKR.starter} per month`}
            blurb="For a small shop getting off paper."
            points={['Up to 200 items', '3 staff accounts', 'WhatsApp and PDF bills', 'Automatic late fees']}
            cta={{ href: '/#contact', label: 'Start free month' }}
          />
          <Plan
            featured
            name="Pro"
            price={PRICES.USD.pro}
            priceNote={`${PRICES.LKR.pro} per month`}
            blurb="For a growing shop with a bigger team."
            points={['Unlimited items', '15 staff accounts', 'Multiple locations', 'Repairs and damage tracking', 'Android app for alerts and access']}
            cta={{ href: '/#contact', label: 'Start free month' }}
          />
          <Plan
            name="Enterprise"
            price="Custom"
            priceNote="Priced to fit your business"
            blurb="For larger operations that want more support."
            points={['Unlimited staff', 'Your own bill terms', 'On-site training', 'Priority support', 'Who called me caller card (Android)']}
            cta={{ href: WHATSAPP_URL, label: 'Talk to us' }}
          />
        </div>
        <p className="mt-6 text-[15px] text-muted">
          The first month is free on every plan, with no setup fee. Pro and Enterprise include the Android app. Each business keeps its records in its own private database, with daily backups.
        </p>
      </Section>

      <Section title="What is the same on every plan" tint>
        <Checklist
          items={[
            'Counter invoicing with deposits and partial returns',
            'Live availability: available, rented out, in repair',
            'Customer records with ID or NIC number and an option to mark the physical ID as held',
            'Payments, outstanding balances and invoice aging',
            'English and Sinhala interface',
            'CSV and Excel equipment import',
          ]}
        />
        <Prose>
          <p className="mt-6">
            For a feature-by-feature tour, see the <a className="font-medium text-ink underline decoration-brand underline-offset-4" href={PATHS.features}>features page</a>.
          </p>
        </Prose>
      </Section>

      <Section title="Which plan fits your shop?">
        <Prose>
          <p>
            <strong className="text-ink">Starter</strong> suits a shop with up to 200 items and a small team of up to 3 people. If you have one counter, one location and need to bill properly, add late fees and share bills on WhatsApp, this is enough.
          </p>
          <p>
            <strong className="text-ink">Pro</strong> is for shops that have outgrown that. It removes the item limit, allows 15 staff accounts and adds multiple locations, repairs and damage tracking and the Android app. Choose it if you run several yards or branches or if damaged equipment is a regular headache.
          </p>
          <p>
            <strong className="text-ink">Enterprise</strong> is for larger rental companies. It adds unlimited staff, your own bill terms, on-site training, priority support and the Who called me feature, which shows a customer's history, rating, overdue amount and last rental when they phone you. Contact us for a price.
          </p>
          <p>
            Not sure yet? Read about <a className="font-medium text-ink underline decoration-brand underline-offset-4" href={PATHS.pillar}>how rental management software works</a>, or start the free month and see it with your own equipment.
          </p>
        </Prose>
      </Section>

      <Section title="How billing works" tint>
        <Prose>
          <p>
            Your first month is free. You can try the full product with your real items, customers and staff. If it is not for you, cancel anytime. There is no setup fee and no long contract.
          </p>
          <p>
            Prices are per month. We list US dollar and Sri Lankan rupee prices so rental businesses anywhere can plan their costs. If you want to know how payment works in your country, message us at <span className="tabular-nums">+94 77 772 2295</span> or contact@geargrid.live.
          </p>
          <p>
            Already started? <a className="font-medium text-ink underline decoration-brand underline-offset-4" href={SIGN_IN_URL}>Sign in</a>.
          </p>
        </Prose>
      </Section>

      <FaqBlock faqs={faqs} title="Pricing and billing questions" />
      <RelatedLinks keys={['pillar', 'features', 'construction', 'event']} />
      <CtaBand title="Start with a free month" />
    </main>
  )
}
