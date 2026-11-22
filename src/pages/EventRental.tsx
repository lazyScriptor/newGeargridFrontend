import type { PageMeta } from '../seo/types'
import { breadcrumbJsonLd, faqJsonLd, PLAN_PRICES, PATHS, type Faq } from '../content/pages'
import { Checklist, CtaBand, FaqBlock, ItemGrid, PageHero, Prose, RelatedLinks, Screenshot, Section, Steps } from './sections/Blocks'

const faqs: Faq[] = [
  {
    q: 'Can I rent hundreds of chairs on one invoice?',
    a: 'Yes. Chairs, tables and similar items are tracked by quantity. You enter the number on the invoice, and the system keeps count of how many are in stock and how many are out.',
  },
  {
    q: 'What if only some items come back after the event?',
    a: 'Record a partial return for what has arrived. The invoice stays open and shows what is still outstanding, so the second pick-up is already on record.',
  },
  {
    q: 'Does it work for multi-day events?',
    a: 'Yes. Rentals can run across several days, and extra daily charges are counted automatically if items stay out beyond the agreed date.',
  },
  {
    q: 'Can I take a deposit for a big order?',
    a: 'Yes. Collect the deposit when you create the invoice. At the end, missing or damaged items and late fees are deducted from it and the balance is refunded.',
  },
  {
    q: 'Can my crew use it without seeing everything?',
    a: 'Yes. Each staff member has their own account with a role and per-user permissions. A driver can record returns without seeing profit reports. Pro allows up to 15 staff accounts.',
  },
  {
    q: 'How do I keep sound gear and canopies separate?',
    a: 'Use categories, such as furniture, canopies and sound. Single high-value items such as a mixer or speaker can have their own equipment numbers, while bulk items are counted by quantity.',
  },
]

export const meta: { en: PageMeta } = {
  en: {
    title: 'Event Rental Software for Bulk Items | GearGrid',
    description:
      'Event rental software for chairs, tables, canopies and sound gear: quantity tracking, big orders, returns in parts, deposits, multi-day hires and staff roles.',
    jsonLd: [faqJsonLd(faqs), breadcrumbJsonLd('Event rental software', PATHS.event)],
  },
}

export default function EventRentalPage() {
  return (
    <main>
      <PageHero
        eyebrow="For event and party rental"
        title="Event rental software for chairs, canopies and sound gear by the hundred"
        lead="Quote a big order with confidence, count what goes out and count what comes back. GearGrid tracks bulk quantities, partial returns and deposits for wedding, party and corporate event hires."
      />

      <Section
        title="Counting is the whole job"
        intro="Event rental is a counting business. Three hundred chairs go out on Friday, and on Monday you need to know how many came home."
      >
        <Prose>
          <p>
            The trouble starts when two events overlap. A wedding takes 300 chairs, a birthday asks for 150, and you own 400. Without a live count, someone says yes to both. With a count, you see right away that only 100 are free that weekend.
          </p>
          <p>
            GearGrid tracks bulk items by quantity. Each invoice takes numbers off the available count, and each return puts them back. Single valuable items such as a sound mixer or a speaker can still be kept with their own equipment number.
          </p>
        </Prose>
        <div className="mt-10">
          <Screenshot
            name="invoices"
            alt="GearGrid invoices list with statuses and amounts"
            caption="Each event has its own invoice, with payments, balance and return status."
          />
        </div>
      </Section>

      <Section
        title="What event rentals need"
        intro="Orders are large, dates are fixed and the pick-up is rarely a single trip."
        tint
      >
        <ItemGrid
          items={[
            { title: 'Bulk quantity items', body: 'Chairs, tables, plates, canopies and linens are counted as numbers. Rent 120, take back 90, and 30 are still shown as out.' },
            { title: 'Big orders on one invoice', body: 'Put the whole event on a single bill: furniture, canopies, lights and sound. Send it as a PDF or on WhatsApp.' },
            { title: 'Returns in parts', body: 'Items rarely come back in one load. Record each trip, and the invoice stays open until the last item is in.' },
            { title: 'Multi-day events', body: 'Hires can run across several days. If anything is kept past the agreed date, the extra daily charge is counted automatically.' },
          ]}
        />
      </Section>

      <Section title="From booking to the last chair">
        <Steps
          items={[
            { title: 'Check what is free', body: 'See the available quantity of each item before you promise anything to the client.' },
            { title: 'Create the invoice', body: 'Add every item and quantity. Record the client ID or NIC number, and share the bill with the customer.' },
            { title: 'Take the deposit', body: 'Collect a deposit up front. It is recorded separately, so you know how much you are holding for each event.' },
            { title: 'Deliver and collect', body: 'On pick-up day, record the returns as they arrive. A short count is easy to see while the truck is still there.' },
            { title: 'Log breakage', body: 'Cracked plates or a torn canopy are logged as damage. Damaged items go to the repairs queue on Pro and above.' },
            { title: 'Settle up', body: 'Missing items, damage and late fees come off the deposit. The client receives the balance.' },
          ]}
        />
      </Section>

      <Section
        title="Your crew and your books"
        intro="Event days are busy, and many hands touch the stock."
        tint
      >
        <Prose>
          <p>
            Give each team member an account. Set roles and per-user permissions, so the loading crew can record returns, the counter staff can create invoices and only you can see profit and loss. Payments, outstanding balances and invoice aging show which clients still owe you after the event. Expenses such as transport can be recorded, and reports show which items are rented most often.
          </p>
        </Prose>
        <div className="mt-8">
          <Checklist
            items={[
              'Staff accounts with roles and per-user permissions',
              'Dashboard widgets for money owed and equipment not returned',
              'Photos, categories and equipment numbers',
              'Import your stock list from CSV or Excel',
              'Equipment sheet for quick spreadsheet-style editing',
              'Daily backups, with private data per business',
            ]}
          />
        </div>
      </Section>

      <Section title="Choosing a plan">
        <Prose>
          <p>
            A smaller party-hire business can start on Starter at {PLAN_PRICES.starter} per month. When stock and crew grow, Pro at {PLAN_PRICES.pro} per month gives unlimited items, 15 staff accounts, multiple locations and damage tracking. Every plan has a free first month and no setup fee. See{' '}
            <a className="font-medium text-ink underline decoration-brand underline-offset-4" href={PATHS.pricing}>pricing</a>{' '}
            for the full comparison.
          </p>
        </Prose>
      </Section>

      <FaqBlock faqs={faqs} />
      <RelatedLinks keys={['pillar', 'tools', 'camera', 'pricing']} />
      <CtaBand title="Count every chair, first month free" />
    </main>
  )
}
