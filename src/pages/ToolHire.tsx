import type { PageMeta } from '../seo/types'
import { breadcrumbJsonLd, faqJsonLd, PLAN_PRICES, PATHS, type Faq } from '../content/pages'
import { Checklist, CtaBand, FaqBlock, ItemGrid, PageHero, Prose, RelatedLinks, Screenshot, Section, Steps } from './sections/Blocks'

const faqs: Faq[] = [
  {
    q: 'Is GearGrid fast enough for a busy counter?',
    a: 'It is designed for it. Customer search is instant, items are picked from a list showing what is available, and the bill is ready in a few steps. You can print a 72 mm receipt or send the bill on WhatsApp.',
  },
  {
    q: 'Can I rent out many of the same tool at once?',
    a: 'Yes. Items such as drill bits, ladders or hand tools can be tracked by quantity. Rent out 5 of 12 and the system shows 7 still available.',
  },
  {
    q: 'How do late fees work?',
    a: 'When an item is kept past its due date, the extra daily charge is counted automatically and added to what the customer owes. Automatic late fees are included on every plan.',
  },
  {
    q: 'Can I record that I am holding the customer ID card?',
    a: 'Yes. Record the ID or NIC number, and mark the physical ID card as held. When the tool comes back and you return the card, mark it as returned.',
  },
  {
    q: 'Do I need a special printer?',
    a: 'For thermal receipts you use a 72 mm receipt printer connected to the counter computer, with a small print helper installed. If you do not want to print, send bills as a PDF or on WhatsApp.',
  },
  {
    q: 'Can I bring in my existing tool list?',
    a: 'Yes. Import from CSV or Excel, match your columns to GearGrid fields and use the check-and-fix grid to correct anything before saving.',
  },
]

export const meta: { en: PageMeta } = {
  en: {
    title: 'Tool Hire Software for Busy Counters | GearGrid',
    description:
      'Tool hire software for shops with many short rentals: quantity items, instant customer search, ID held at the counter, automatic late fees and daily cash.',
    jsonLd: [faqJsonLd(faqs), breadcrumbJsonLd('Tool hire software', PATHS.tools)],
  },
}

export default function ToolHirePage() {
  return (
    <main>
      <PageHero
        eyebrow="For tool hire shops"
        title="Tool hire software for a counter that never stops"
        lead="Fast customer lookup, quantity items, ID held at the counter and late fees counted for you. GearGrid keeps a busy hire desk moving and your cash at the end of the day matching the books."
      />

      <Section
        title="A tool shop runs on small, quick jobs"
        intro="A tool hire counter might serve thirty customers before lunch. Each one wants a drill, a ladder or a breaker, and each one is back tomorrow or the day after."
      >
        <Prose>
          <p>
            Volume is the challenge. Writing every hire in a book is slow, and the queue builds up. Staff forget what was lent, regular customers get asked for details again and the last customer of the day is the one whose bill gets mixed up.
          </p>
          <p>
            GearGrid is made for this rhythm. Find the customer, pick the tools, take the payment and hand over the bill. When the tools return, the same record closes the job. Nothing needs to be written twice.
          </p>
        </Prose>
        <div className="mt-10">
          <Screenshot
            name="customers"
            alt="GearGrid customer list with search and rental history"
            caption="Search customers instantly and see their rental history before you hand over a tool."
          />
        </div>
      </Section>

      <Section
        title="Built for speed at the desk"
        intro="Small details add up when the queue is long."
        tint
      >
        <ItemGrid
          items={[
            { title: 'Instant customer search', body: 'Type a name or phone number and the customer appears straight away. Their history is right there, including anything still owed.' },
            { title: 'Quantity items', body: 'Ladders, clamps, trowels and other small stock are tracked by count. You see how many are in, and how many are out with whom.' },
            { title: 'Single serial-numbered tools', body: 'Higher-value machines such as a rotary hammer get their own equipment number, like EQ-101, and a photo so staff pick the right one.' },
            { title: 'Receipts three ways', body: 'Print a 72 mm thermal receipt through the print helper, create an A4 PDF bill, or send the bill on WhatsApp.' },
          ]}
        />
      </Section>

      <Section title="From counter to counter in six steps">
        <Steps
          items={[
            { title: 'Find the customer', body: 'Search by name or phone number. New customers are added in a moment, with their ID or NIC number recorded.' },
            { title: 'Hold the ID', body: 'Mark that you are keeping the physical ID card. The flag stays visible so the card is not forgotten in a drawer.' },
            { title: 'Pick the tools', body: 'Choose items from the list. Only available ones are offered, and quantities are taken off the count.' },
            { title: 'Bill and take payment', body: 'Create the invoice, take a deposit if you charge one, and record the payment.' },
            { title: 'Take the tools back', body: 'On return, tick off what came in. If only part of the order comes back, record a partial return and the rest stays open.' },
            { title: 'Late fees counted', body: 'If the tools came back late, the extra daily charge is already counted. Collect it, and give back the card.' },
          ]}
        />
      </Section>

      <Section
        title="Keep the cash honest"
        intro="Counter shops live on small payments. The risk is not one big loss but many small ones."
        tint
      >
        <Prose>
          <p>
            Every payment is recorded against an invoice, so at the end of the day you can see what was collected and what is still outstanding. Outstanding balances and invoice aging show which customers are behind, from a few days to a few weeks. The dashboard widgets for money owed and equipment not returned put the two most important questions in front of you each morning.
          </p>
          <p>
            Record shop expenses as well and the profit and loss report shows what the shop actually earned. The rental history report shows which tools go out most, so you know what to stock more of.
          </p>
        </Prose>
        <div className="mt-8">
          <Checklist
            items={[
              'Payments and outstanding balances per customer',
              'Invoice aging to chase old balances',
              'Late fees counted automatically on every plan',
              'Staff accounts with roles and per-user permissions',
              'Damage logging and repairs queue on Pro and above',
              'Rental history and utilisation reports',
            ]}
          />
        </div>
      </Section>

      <Section title="Right-sized for a shop">
        <Prose>
          <p>
            A small hire shop with up to 200 items and 3 staff fits the Starter plan at {PLAN_PRICES.starter} per month, including WhatsApp and PDF bills and automatic late fees. If you add more stock, staff or a second branch, Pro at {PLAN_PRICES.pro} per month removes the limits. The first month is free and there is no setup fee. Compare{' '}
            <a className="font-medium text-ink underline decoration-brand underline-offset-4" href={PATHS.pricing}>all plans</a>.
          </p>
        </Prose>
      </Section>

      <FaqBlock faqs={faqs} />
      <RelatedLinks keys={['pillar', 'construction', 'features', 'pricing']} />
      <CtaBand title="Speed up your hire counter, first month free" />
    </main>
  )
}
