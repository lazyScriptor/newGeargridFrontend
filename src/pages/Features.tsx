import type { PageMeta } from '../seo/types'
import { breadcrumbJsonLd, faqJsonLd, PATHS, type Faq } from '../content/pages'
import { CtaBand, FaqBlock, ItemGrid, PageHero, RelatedLinks, Screenshot, Section } from './sections/Blocks'

const faqs: Faq[] = [
  {
    q: 'Can I print thermal receipts?',
    a: 'Yes. GearGrid prints 72 mm thermal receipts through a small print helper that runs on the counter computer. Bills can also be saved as PDF, printed on A4 or sent on WhatsApp.',
  },
  {
    q: 'Does GearGrid work on my phone?',
    a: 'Yes. It is a web app that works in the browser on phones, tablets and computers. There is also an Android app for alerts and access on the Pro plan and above. There is no iOS app.',
  },
  {
    q: 'Can I import my existing equipment list?',
    a: 'Yes. Upload a CSV or Excel file, match your columns to GearGrid fields and fix any errors in a check-and-fix grid before the import is saved.',
  },
  {
    q: 'Which features need the Pro plan?',
    a: 'Multiple locations, repairs and damage tracking, unlimited items and up to 15 staff accounts are on Pro. Starter covers up to 200 items and 3 staff accounts with WhatsApp and PDF bills and automatic late fees.',
  },
  {
    q: 'What is the Who called me feature?',
    a: 'It is an Enterprise feature for Android. When a customer phones you, a card shows their history, rating, overdue amount and last rental so you can answer with the facts in front of you.',
  },
  {
    q: 'What languages does the interface support?',
    a: 'English and Sinhala.',
  },
]

export const meta: { en: PageMeta } = {
  en: {
    title: 'Rental Software Features: Billing, Stock, Returns',
    description:
      'See every GearGrid feature: counter billing, live availability, ID security, deposits, late fees, repairs, reports, staff roles and CSV import. Free first month.',
    jsonLd: [faqJsonLd(faqs), breadcrumbJsonLd('Features', PATHS.features)],
  },
}

export default function FeaturesPage() {
  return (
    <main>
      <PageHero
        eyebrow="Features"
        title="Everything a rental counter needs, in one app"
        lead="Here is the full tour of GearGrid, grouped by the job you are trying to get done. Each feature exists because rental shops asked for it at the counter."
      />

      <Section
        title="Counter and billing"
        intro="The counter is where rental shops make or lose money. GearGrid is built to make a bill in a few taps."
      >
        <ItemGrid
          items={[
            { title: 'Counter invoicing', body: 'Choose the customer, add the items and the rental period, and the invoice is ready. No separate calculator, no handwritten totals.' },
            { title: 'PDF and A4 bills', body: 'Save any bill as a PDF or print it on A4 paper for customers who want a formal document.' },
            { title: 'Bills on WhatsApp', body: 'Send the bill to the customer on WhatsApp straight from the invoice. They have their copy before they leave the counter.' },
            { title: '72 mm thermal receipts', body: 'Print compact receipts on a 72 mm thermal printer. A small helper program on the counter computer handles the printing.' },
          ]}
        />
        <div className="mt-10">
          <Screenshot
            name="invoices"
            alt="GearGrid invoices screen showing a list of rental invoices and their payment status"
            caption="Invoices at a glance, with payment status for each one."
          />
        </div>
      </Section>

      <Section
        title="Inventory and availability"
        intro="You cannot rent what you cannot see. GearGrid keeps a live status on everything you own."
        tint
      >
        <ItemGrid
          items={[
            { title: 'Live status', body: 'Every item is available, rented out or in repair. The status changes as soon as someone checks an item out or returns it.' },
            { title: 'Single machines and bulk items', body: 'Track a serial-numbered machine as one item, or track chairs and hand tools by quantity. Both live in the same inventory.' },
            { title: 'Equipment numbers', body: 'Give each machine a number such as EQ-101 so staff can find it fast and customers can quote it on the phone.' },
            { title: 'Photos and categories', body: 'Add equipment photos, including photos taken with a phone. Group items into categories to keep a large yard easy to browse.' },
            { title: 'Multiple locations', body: 'Run more than one branch or yard in the same account. Locations are available on the Pro plan and above.' },
            { title: 'Spreadsheet-style sheet', body: 'Edit your equipment in a sheet that works like a spreadsheet, for quick changes to many items at once.' },
          ]}
          cols={3}
        />
        <div className="mt-10">
          <Screenshot
            name="equipment"
            alt="GearGrid equipment screen with equipment numbers, photos and categories"
            caption="Equipment with numbers, photos and categories."
          />
        </div>
      </Section>

      <Section
        title="Customers and ID security"
        intro="Lending equipment means trusting strangers. GearGrid helps you keep proof of who has what."
      >
        <ItemGrid
          items={[
            { title: 'ID and NIC on record', body: 'Record the customer ID or NIC number on their profile so you can always trace a rental back to a person.' },
            { title: 'Physical ID held', body: 'If you keep the customer ID card as security, mark it on the rental. Anyone on the team can see that the card is in the shop.' },
            { title: 'Customer history', body: 'See past rentals, payments and balances for each customer before you hand over another machine.' },
            { title: 'Instant customer search', body: 'Find a customer as you type their name or number, so repeat customers take seconds to bill.' },
          ]}
        />
        <div className="mt-10">
          <Screenshot
            name="customers"
            alt="GearGrid customers screen listing customers with contact details and rental history"
            caption="Customer records with history and balances."
          />
        </div>
      </Section>

      <Section
        title="Returns, late fees and deposits"
        intro="Most billing mistakes happen when equipment comes back. This part of GearGrid does the counting for you."
        tint
      >
        <ItemGrid
          items={[
            { title: 'Deposits', body: 'Collect a deposit at checkout. When the rental ends, it is settled against what the customer owes and the rest is returned.' },
            { title: 'Partial returns', body: 'Take back part of an order and leave the rest out. The invoice stays open until every item is back.' },
            { title: 'Automatic late fees', body: 'When an item stays out past its date, the extra daily charge is counted for you. Nobody has to remember to add it.' },
            { title: 'Open-ended rentals', body: 'Rent without an end date and bill for the days actually used when the equipment returns.' },
          ]}
        />
      </Section>

      <Section
        title="Repairs and damage"
        intro="Broken equipment should leave the rental pool the moment you know about it."
      >
        <ItemGrid
          items={[
            { title: 'Damage and defect log', body: 'Record damage when an item comes back, or a defect found during a check. Keep the note attached to the item and the rental.' },
            { title: 'Repairs queue', body: 'Damaged items move to a repairs queue and show as in repair, so nobody rents them out by mistake. Repairs tracking is on the Pro plan and above.' },
          ]}
        />
      </Section>

      <Section
        title="Money and reports"
        intro="Know how much you are owed and whether the business is making a profit."
        tint
      >
        <ItemGrid
          items={[
            { title: 'Payments and balances', body: 'Record payments against invoices and see outstanding balances for every customer.' },
            { title: 'Invoice aging', body: 'See which unpaid invoices are new and which are weeks old, so you know whom to call first.' },
            { title: 'Expenses and profit and loss', body: 'Log expenses such as repairs and fuel and read a profit and loss report for the period you choose.' },
            { title: 'Rental history, utilisation and maintenance', body: 'Reports show how often each item is rented, how long it sits idle and what it costs to maintain.' },
            { title: 'Dashboard widgets', body: 'The dashboard shows money owed and equipment not returned, the two numbers most shop owners check first.' },
            { title: 'Exports', body: 'Export your data when you need it elsewhere, for example for your accountant.' },
          ]}
          cols={3}
        />
      </Section>

      <Section
        title="Team and permissions"
        intro="Staff accounts, with each person limited to what their job needs."
      >
        <ItemGrid
          items={[
            { title: 'Staff accounts', body: 'Each team member signs in with their own account. Starter allows 3 staff, Pro allows 15 and Enterprise is unlimited.' },
            { title: 'Roles and permissions per user', body: 'Set roles and fine-tune permissions for each person. A counter clerk can bill customers without opening financial reports.' },
          ]}
        />
      </Section>

      <Section
        title="Data import and export"
        intro="Moving in should not take a weekend."
        tint
      >
        <ItemGrid
          items={[
            { title: 'CSV and Excel import', body: 'Upload your equipment list, match your columns to GearGrid fields, and review everything in a check-and-fix grid before it is saved.' },
            { title: 'Private and backed up', body: 'Each business has its own separate database, and backups run daily.' },
          ]}
        />
      </Section>

      <Section
        title="Mobile, languages and calls"
        intro="Run the shop from wherever you are standing."
      >
        <ItemGrid
          items={[
            { title: 'Works on any device', body: 'Use GearGrid in a browser on a phone, tablet or computer at app.geargrid.live. There is no iOS app and no desktop app.' },
            { title: 'Android app', body: 'The Android app gives alerts and quick access. It is included from the Pro plan upward.' },
            { title: 'English and Sinhala', body: 'Switch the interface between English and Sinhala.' },
            { title: 'Who called me (Enterprise)', body: 'On Android, when a customer calls, a card pops up with their history, rating, overdue amount and last rental.' },
          ]}
        />
      </Section>

      <FaqBlock faqs={faqs} />
      <RelatedLinks keys={['pillar', 'pricing', 'construction', 'tools']} />
      <CtaBand title="See it in your own shop. First month free." />
    </main>
  )
}
