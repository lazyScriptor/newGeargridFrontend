import type { PageMeta } from '../seo/types'
import { breadcrumbJsonLd, faqJsonLd, PLAN_PRICES, PATHS, type Faq } from '../content/pages'
import { Checklist, CtaBand, FaqBlock, ItemGrid, PageHero, Prose, RelatedLinks, Screenshot, Section, Steps } from './sections/Blocks'

const faqs: Faq[] = [
  {
    q: 'Can I track cameras and lenses by serial number?',
    a: 'Each camera, lens or light can be kept as its own item with an equipment number such as EQ-101, a photo and a category, so every rental is tied to the exact piece.',
  },
  {
    q: 'How do I keep a kit together?',
    a: 'Add each piece of a kit as its own item and rent them on the same invoice. When the kit comes back, check each piece in, so a missing battery or cap is noticed at the counter and not days later.',
  },
  {
    q: 'Can I record the customer ID and hold the card?',
    a: 'Yes. Record the ID or NIC number on the customer record, and mark when you are holding the physical ID card. The flag remains on the rental until the card is handed back.',
  },
  {
    q: 'How are deposits handled?',
    a: 'You collect the deposit when you create the invoice. At return, any damage or late fees are deducted from it and the balance is refunded. Everything is recorded on the invoice.',
  },
  {
    q: 'What if a lens comes back scratched?',
    a: 'Log the damage against the item. It goes to the repairs queue and shows as in repair, so it cannot be booked for the next shoot. Damage logging and repairs tracking are on the Pro plan and above.',
  },
  {
    q: 'Can I work from my phone?',
    a: 'Yes. GearGrid is a web app that works in the browser on a phone, tablet or computer, and you can take equipment photos from your phone. There is also an Android app on the Pro plan and above. There is no iOS app.',
  },
]

export const meta: { en: PageMeta } = {
  en: {
    title: 'Camera Rental Software for Gear Shops | GearGrid',
    description:
      'Camera and gear rental software: track serial-numbered kits, record customer ID and hold the card, take deposits, check kits back in and log damage.',
    jsonLd: [faqJsonLd(faqs), breadcrumbJsonLd('Camera rental software', PATHS.camera)],
  },
}

export default function CameraRentalPage() {
  return (
    <main>
      <PageHero
        eyebrow="For camera and gear rental"
        title="Camera rental software for high-value kits and careful check-ins"
        lead="Camera gear is expensive and easy to carry off. GearGrid records who has each item, which ID you are holding, what deposit you took and what condition it came back in."
      />

      <Section
        title="When every item matters"
        intro="A tool shop deals in volume. A camera shop deals in value. The risk is in single items that cost a lot and are easy to carry away."
      >
        <Prose>
          <p>
            A photographer rents a camera body, two lenses, a gimbal and a set of lights for a wedding weekend. That is six or seven valuable items on one order, each with its own battery, cap and cable. If a lens is returned with a scratch, you need to know who had it, when, and what you checked at handover.
          </p>
          <p>
            GearGrid gives each piece its own record, so rentals are tied to the exact item and the exact customer. The history of a lens shows every hire, every return and every repair.
          </p>
        </Prose>
        <div className="mt-10">
          <Screenshot
            name="inventory"
            alt="GearGrid inventory listing equipment items with live availability"
            caption="Every body, lens and light is its own item with a number, a photo and a live status."
          />
        </div>
      </Section>

      <Section
        title="Security that fits gear rental"
        intro="Trust is good. A record is better."
        tint
      >
        <ItemGrid
          items={[
            { title: 'ID and NIC on file', body: 'Record the customer ID or NIC number once. It is on their profile for every future rental, together with their rental history.' },
            { title: 'Physical ID held', body: 'If you keep the ID card as security, mark it on the rental. Anyone on the team can see that the card is in your drawer.' },
            { title: 'Deposits', body: 'Collect a deposit at checkout. It is recorded as a payment and settled at return, with the remainder going back to the customer.' },
            { title: 'Customer history', body: 'See what the customer has hired before, whether they returned things on time and whether they still owe anything.' },
          ]}
        />
      </Section>

      <Section title="Check the kit back in">
        <Steps
          items={[
            { title: 'Build the order', body: 'Add the body, lenses, batteries and lights to one invoice. Each is a separate item, so each is checked on its own.' },
            { title: 'Record the hand-over', body: 'Note the ID, hold the card, take the deposit and give the customer the bill by PDF or on WhatsApp.' },
            { title: 'Check items in', body: 'When the kit returns, tick off each piece. If a piece is missing, the rental stays open and you can see exactly which item.' },
            { title: 'Log any damage', body: 'Mark the defect against the item. It moves into the repairs queue and stays off the shelf until it is fixed.' },
            { title: 'Settle the deposit', body: 'Damage and late fees come out of the deposit and the balance is refunded. The invoice shows the working.' },
            { title: 'Back to available', body: 'Once the item is checked or repaired, set it available again for the next booking.' },
          ]}
        />
      </Section>

      <Section
        title="Know which gear pays"
        intro="It helps to know which gear is actually earning."
        tint
      >
        <Prose>
          <p>
            The utilisation report shows how often each item is out. The maintenance report shows what has needed repair. With expenses recorded, the profit and loss report tells you whether that new lens is worth buying a second one of. Late returns are charged the extra daily rate automatically, which matters when a shoot runs over.
          </p>
        </Prose>
        <div className="mt-8">
          <Checklist
            items={[
              'Live status: available, rented out, in repair',
              'Equipment numbers, categories and photos from a phone',
              'Invoices as PDF, on WhatsApp or as a 72 mm receipt',
              'Money owed and equipment not returned on the dashboard',
              'Staff accounts with roles and per-user permissions',
              'Private data per business, backed up daily',
            ]}
          />
        </div>
      </Section>

      <Section title="Plans for gear rental">
        <Prose>
          <p>
            Starter at {PLAN_PRICES.starter} per month covers up to 200 items and 3 staff, and is enough for many small rental houses. Pro at {PLAN_PRICES.pro} per month adds repairs and damage tracking, which most camera rental businesses want, as well as unlimited items and an Android app. The first month is free on every plan. See the{' '}
            <a className="font-medium text-ink underline decoration-brand underline-offset-4" href={PATHS.pricing}>pricing page</a>{' '}
            for the details.
          </p>
        </Prose>
      </Section>

      <FaqBlock faqs={faqs} />
      <RelatedLinks keys={['pillar', 'features', 'pricing', 'event']} />
      <CtaBand title="Protect your gear, first month free" />
    </main>
  )
}
