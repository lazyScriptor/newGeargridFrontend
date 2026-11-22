import type { PageMeta } from '../seo/types'
import { breadcrumbJsonLd, faqJsonLd, PLAN_PRICES, PATHS, type Faq } from '../content/pages'
import { Checklist, CtaBand, FaqBlock, ItemGrid, PageHero, Prose, RelatedLinks, Screenshot, Section, Steps } from './sections/Blocks'

const faqs: Faq[] = [
  {
    q: 'What is equipment rental management software?',
    a: 'It is software that runs the daily work of a rental business: which items you own, which are out, who has them, what they owe, and when they are due back. GearGrid also creates the bills, counts late fees and tracks repairs.',
  },
  {
    q: 'Do I need to install anything?',
    a: 'No. GearGrid is a web app. Open app.geargrid.live in any browser on a phone, tablet or computer. There is an Android app for alerts and access on the Pro plan and above. There is no iOS app and no desktop app. Receipt printing uses a small helper program on the counter computer.',
  },
  {
    q: 'Can it handle both single machines and bulk items?',
    a: 'Yes. A serial-numbered machine is tracked as one item with its own equipment number, such as EQ-101. Bulk items such as chairs or hand tools are tracked by quantity, so you can rent out 40 of 200 and take back 25 today.',
  },
  {
    q: 'Is my business data private?',
    a: 'Each business has its own separate database, so your records are not mixed with anyone else. Backups run daily.',
  },
  {
    q: 'How much does it cost?',
    a: `Starter is ${PLAN_PRICES.starter} per month and Pro is ${PLAN_PRICES.pro} per month. Enterprise has a custom price. The first month is free on every plan, with no setup fee, and you can cancel anytime.`,
  },
  {
    q: 'Who uses GearGrid?',
    a: 'GearGrid is made in Sri Lanka and is used by rental shops there. It is built for equipment, tool, camera and event rental businesses, and it works for rental businesses in any country.',
  },
]

export const meta: { en: PageMeta } = {
  en: {
    title: 'Equipment Rental Management Software | GearGrid',
    description:
      'Equipment rental management software for tools, machinery, cameras and events: live availability, ID security, instant bills, late fees and repairs. First month free.',
    jsonLd: [faqJsonLd(faqs), breadcrumbJsonLd('Equipment rental management software', PATHS.pillar)],
  },
}

export default function RentalSoftwarePage() {
  return (
    <main>
      <PageHero
        eyebrow="Rental management software"
        title="Equipment rental management software that keeps every item and every rupee accounted for"
        lead="GearGrid is a web app for rental businesses. It shows what is in your yard, bills at the counter, holds customer ID, counts late fees and tracks repairs. It is made in Sri Lanka and used by Sri Lankan rental shops."
      />

      <Section
        title="What rental management software does"
        intro="A rental business sells time, not products. The same drill, generator or camera goes out and comes back many times, and each trip creates questions. Is it available? Who has it? What do they owe? Is it damaged?"
      >
        <Prose>
          <p>
            Many shops answer those questions with a notebook, a spreadsheet and memory. That works until the shop gets busy. Then an item is promised twice, a late return goes uncharged, or a deposit is returned without anyone checking the damage.
          </p>
          <p>
            Rental management software replaces the notebook with one shared record. Every item has a status. Every rental has a bill. Every customer has a history. Your staff see the same facts at the counter, and you can check the numbers from your phone.
          </p>
        </Prose>
        <div className="mt-10">
          <Screenshot
            name="dashboard"
            alt="GearGrid dashboard showing money owed, equipment not returned and rental activity"
            caption="The dashboard puts money owed and equipment not yet returned in front of you each morning."
          />
        </div>
      </Section>

      <Section
        title="How a rental runs in GearGrid"
        intro="The software follows the way a counter already works, from the first booking to the last repair."
        tint
      >
        <Steps
          items={[
            { title: 'Book', body: 'Pick the customer and the items. GearGrid shows each item as available, rented out or in repair, so you only offer what is really in the yard.' },
            { title: 'Check out with the ID held', body: 'Record the customer ID or NIC number. If you keep the physical ID card as security, mark it, so everyone knows where the card is.' },
            { title: 'Bill', body: 'Create the invoice at the counter. Collect a deposit if you take one. Share the bill as a PDF, on WhatsApp, or print a 72 mm receipt.' },
            { title: 'Return or part-return', body: 'Take back some items now and the rest later. Quantity items are counted in parts, and the invoice stays open until everything is back.' },
            { title: 'Late fees and deposit', body: 'Extra daily charges are counted automatically for late items. The deposit is settled against what the customer owes and the balance is returned.' },
            { title: 'Repairs', body: 'Log damage or a defect, and the item moves to the repairs queue. It comes back to available once it is fixed.' },
          ]}
        />
      </Section>

      <Section title="Who it is for">
        <Prose>
          <p>
            GearGrid suits any business that lends equipment for a price and a period of time. The workflow is the same, but the daily problems differ, so we wrote a page for each type of shop.
          </p>
        </Prose>
        <div className="mt-8">
          <ItemGrid
            items={[
              { title: 'Construction and machinery', body: 'Breakers, mixers, scaffolding and generators on long site rentals, where deposits and damage matter most. See construction equipment rental software.' },
              { title: 'Tool hire shops', body: 'A busy counter with many small items and repeat customers. See tool hire software.' },
              { title: 'Camera and gear rental', body: 'High-value kits where serial numbers and customer ID security come first. See camera rental software.' },
              { title: 'Event rental', body: 'Chairs, tables and canopies rented by the hundred and returned in parts. See event rental software.' },
            ]}
          />
          <p className="mt-6 text-[15px] text-muted">
            Read the guides:{' '}
            <a className="font-medium text-ink underline decoration-brand underline-offset-4" href={PATHS.construction}>construction</a>,{' '}
            <a className="font-medium text-ink underline decoration-brand underline-offset-4" href={PATHS.tools}>tool hire</a>,{' '}
            <a className="font-medium text-ink underline decoration-brand underline-offset-4" href={PATHS.camera}>camera</a> and{' '}
            <a className="font-medium text-ink underline decoration-brand underline-offset-4" href={PATHS.event}>event</a>.
          </p>
        </div>
      </Section>

      <Section
        title="Why a cloud app instead of a spreadsheet"
        intro="A spreadsheet stores numbers. It does not know that an item is out, that a bill is overdue or that two staff members just promised the same machine."
        tint
      >
        <ItemGrid
          items={[
            { title: 'One live record', body: 'Every staff member sees the same availability. When one person checks an item out, it shows as rented out for everyone straight away.' },
            { title: 'Works on what you have', body: 'GearGrid runs in a browser on a phone, tablet or computer. Pro and Enterprise customers also get an Android app for alerts and access.' },
            { title: 'Private to your business', body: 'Each business has a separate database. Your equipment, customers and invoices are not stored alongside anyone else.' },
            { title: 'Backed up daily', body: 'Records are backed up every day, so one lost laptop or a spilled cup of tea does not cost you your history.' },
            { title: 'Staff with the right access', body: 'Give each person an account and set what they can see and do. The counter clerk does not need to open the profit report.' },
            { title: 'English and Sinhala', body: 'The interface is available in English and in Sinhala, so your team can work in the language they prefer.' },
          ]}
          cols={3}
        />
      </Section>

      <Section title="What you get on every plan" intro="The core counter work is the same everywhere. Bigger plans add more items, more staff and more tools.">
        <Checklist
          items={[
            'Counter invoicing with PDF and WhatsApp bills',
            'Live availability: available, rented out, in repair',
            'Customer records with ID or NIC number',
            'Deposits, partial returns and automatic late fees',
            'Payments and outstanding balances',
            'Equipment photos, categories and EQ- numbers',
            'Spreadsheet-style equipment sheet and CSV or Excel import',
            'Daily backups and private data per business',
          ]}
        />
        <div className="mt-10">
          <Screenshot
            name="inventory"
            alt="GearGrid inventory screen listing equipment with availability status"
            caption="The inventory shows each item and whether it is available, rented out or in repair."
          />
        </div>
        <Prose>
          <p className="mt-8">
            Starter costs {PLAN_PRICES.starter} per month for up to 200 items and 3 staff accounts. Pro costs {PLAN_PRICES.pro} per month and adds unlimited items, 15 staff, multiple locations and repairs and damage tracking. Enterprise is priced to fit. The first month is free. See the full{' '}
            <a className="font-medium text-ink underline decoration-brand underline-offset-4" href={PATHS.pricing}>pricing page</a>{' '}
            or the{' '}
            <a className="font-medium text-ink underline decoration-brand underline-offset-4" href={PATHS.features}>complete feature tour</a>.
          </p>
        </Prose>
      </Section>

      <Section title="Getting started" tint>
        <Prose>
          <p>
            If your equipment list already lives in a spreadsheet, you do not have to type it again. Upload a CSV or Excel file, match your columns to GearGrid fields and fix any problems in a check-and-fix grid before anything is saved. Then add your staff, set their permissions and create your first invoice.
          </p>
          <p>
            Want help? Message us on WhatsApp or by email and we will walk you through it. Enterprise plans include on-site training.
          </p>
        </Prose>
      </Section>

      <FaqBlock faqs={faqs} />
      <RelatedLinks keys={['features', 'pricing', 'construction', 'tools', 'camera', 'event']} />
      <CtaBand />
    </main>
  )
}
