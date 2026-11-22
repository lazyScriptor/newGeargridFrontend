import type { PageMeta } from '../seo/types'
import { breadcrumbJsonLd, faqJsonLd, PLAN_PRICES, PATHS, type Faq } from '../content/pages'
import { Checklist, CtaBand, FaqBlock, ItemGrid, PageHero, Prose, RelatedLinks, Screenshot, Section, Steps } from './sections/Blocks'

const faqs: Faq[] = [
  {
    q: 'Can GearGrid handle rentals with no fixed return date?',
    a: 'Yes. An open-ended rental stays open until the machine comes back. The invoice keeps running, and the dashboard shows the equipment that has not been returned so nothing is forgotten on a distant site.',
  },
  {
    q: 'How are deposits handled for heavy machines?',
    a: 'You collect the deposit when you create the invoice. When the machine returns, any damage, late fees or unpaid rental are taken from the deposit and the balance is refunded. The numbers are on the invoice, so there is no argument later.',
  },
  {
    q: 'Can I take scaffolding back in several loads?',
    a: 'Yes. Scaffolding sets, props and similar items are tracked by quantity, so you can record a partial return each time a load comes back. The invoice stays open until the last piece is in.',
  },
  {
    q: 'What happens when a machine comes back damaged?',
    a: 'Log the defect on return. The machine moves to the repairs queue and shows as in repair, so it cannot be promised to another customer. When it is fixed, mark it available again. Repairs and damage tracking is on the Pro plan and above.',
  },
  {
    q: 'We have more than one yard. Is that supported?',
    a: 'Yes. Multiple locations are available on the Pro plan and above, so each yard can keep its own stock and you still see the whole business in one place.',
  },
  {
    q: 'Which plan do construction rental companies need?',
    a: `Most yards choose Pro at ${PLAN_PRICES.pro} per month, because it adds unlimited items, 15 staff accounts, multiple locations and repairs and damage tracking. Starter is ${PLAN_PRICES.starter} per month. The first month is free.`,
  },
]

export const meta: { en: PageMeta } = {
  en: {
    title: 'Construction Equipment Rental Software | GearGrid',
    description:
      'Rental software for construction yards: track breakers, mixers and scaffolding, take deposits, log damage and run open-ended site hires. First month free.',
    jsonLd: [faqJsonLd(faqs), breadcrumbJsonLd('Construction equipment rental software', PATHS.construction)],
  },
}

export default function ConstructionEquipmentPage() {
  return (
    <main>
      <PageHero
        eyebrow="For construction and machinery rental"
        title="Construction equipment rental software built for the yard and the site"
        lead="Keep track of every breaker, mixer, compactor, generator and scaffolding set you own. Know which machine is on which site, what the customer owes and what is waiting for repair."
      />

      <Section
        title="Why a construction yard needs more than a notebook"
        intro="Construction rentals are different from a quick counter hire. The machine leaves for weeks, the site is far away, and the return date often moves."
      >
        <Prose>
          <p>
            A contractor takes a concrete mixer for a foundation job. The job slips, so the mixer stays out a month longer. Meanwhile a second customer asks for a mixer, and the person at the desk has to remember which ones are still on site. That is how machines get double-promised and how rent goes unbilled.
          </p>
          <p>
            GearGrid gives every machine its own record and its own status. You can see at a glance which units are in the yard, which are rented out and which are being repaired. The same view works for a handful of machines or a few hundred items.
          </p>
        </Prose>
        <div className="mt-10">
          <Screenshot
            name="equipment"
            alt="GearGrid equipment list with machines, equipment numbers and status"
            caption="Each machine has an equipment number such as EQ-101, a photo and a live status."
          />
        </div>
      </Section>

      <Section
        title="What it tracks for heavy equipment"
        intro="Single machines and sets of parts are both common in a yard, and GearGrid treats each the right way."
        tint
      >
        <ItemGrid
          items={[
            { title: 'Machines with their own number', body: 'Breakers, compactors, generators and mixers are kept as single items with an equipment number like EQ-101, a category and photos, including pictures taken on a phone.' },
            { title: 'Sets counted by quantity', body: 'Scaffolding frames, props and planks are bulk items. You rent out 60 pieces, and the system remembers how many are still on the site.' },
            { title: 'Open-ended hires', body: 'Not every job has an end date. Mark the rental open-ended and it stays on the books until the equipment returns.' },
            { title: 'Customer ID on file', body: 'Record the contractor ID or NIC number and mark when you are holding the physical ID card as security.' },
          ]}
        />
      </Section>

      <Section
        title="Deposits, returns and damage"
        intro="This is where yards lose the most money. GearGrid keeps the steps in order."
      >
        <Steps
          items={[
            { title: 'Take the deposit', body: 'Collect a deposit when you create the invoice. It is recorded as its own payment, so you always know how much you are holding.' },
            { title: 'Return in parts', body: 'Scaffolding often comes back in several loads. Record each load as a partial return and the remaining quantity stays visible.' },
            { title: 'Inspect and log damage', body: 'If a machine is damaged, log the defect. It goes to the repairs queue straight away and cannot be rented out by mistake.' },
            { title: 'Settle the deposit', body: 'Late fees, damage and any unpaid rental are deducted from the deposit. The customer gets the balance back, and the invoice shows how it was worked out.' },
          ]}
        />
        <Prose>
          <p className="mt-8">
            Late items are charged the extra daily rate automatically, so a machine that stays out three extra days is billed for three extra days without anyone doing sums at the counter.
          </p>
        </Prose>
      </Section>

      <Section
        title="Running more than one yard"
        intro="Growing yards often add a second depot. On the Pro plan and above you can set up multiple locations and keep stock for each one."
        tint
      >
        <Checklist
          items={[
            'Unlimited equipment items on Pro and above',
            'Multiple locations for separate yards',
            'Up to 15 staff accounts on Pro, with roles and per-user permissions',
            'Repairs and damage tracking with a repairs queue',
            'Money owed and equipment not returned on the dashboard',
            'Invoice aging, so you see which contractors are behind',
            'Utilisation and maintenance reports',
            'Profit and loss, with expenses recorded',
          ]}
        />
        <div className="mt-10">
          <Screenshot
            name="dashboard"
            alt="GearGrid dashboard with money owed and equipment not returned"
            caption="Money owed and equipment not returned, ready when you open the app."
          />
        </div>
      </Section>

      <Section title="Know which machines earn their keep">
        <Prose>
          <p>
            A breaker that is rented every week pays for itself. A compactor that sits in the yard does not. The utilisation report shows how much each item is rented, and the maintenance report shows what has been in for repair. Together with recorded expenses and the profit and loss report, you can decide what to buy more of and what to sell.
          </p>
          <p>
            Your records are private to your business, stored in a separate database, and backed up daily. Staff can be given accounts with only the permissions they need, so the yard hand can book a return without seeing the profit figures.
          </p>
          <p>
            Already keep your machine list in a spreadsheet? Import it from CSV or Excel, match the columns and fix any problems in a check-and-fix grid before it is saved. See the full{' '}
            <a className="font-medium text-ink underline decoration-brand underline-offset-4" href={PATHS.pricing}>pricing</a>{' '}
            or the{' '}
            <a className="font-medium text-ink underline decoration-brand underline-offset-4" href={PATHS.features}>feature tour</a>.
          </p>
        </Prose>
      </Section>

      <FaqBlock faqs={faqs} />
      <RelatedLinks keys={['pillar', 'features', 'pricing', 'tools']} />
      <CtaBand title="Put your yard on GearGrid, first month free" />
    </main>
  )
}
