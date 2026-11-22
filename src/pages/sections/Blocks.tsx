import type { ReactNode } from 'react'
import { Container } from '../../components/Container'
import { SIGN_IN_URL, WHATSAPP_URL, PHONE_DISPLAY, EMAIL } from '../../lib/config'
import { LINKS, type Faq, type LinkKey } from '../../content/pages'

// Building blocks for the SEO pages. No Reveal, no effects: the HTML is the same
// on the server and in the browser, and nothing is hidden before scripts run.

export function PageHero({ eyebrow, title, lead }: { eyebrow: string; title: string; lead: string }) {
  return (
    <section className="border-b border-line bg-paper/55 pt-28 pb-14 sm:pt-36 sm:pb-20">
      <Container>
        <p className="text-[13px] font-semibold uppercase tracking-[0.08em] text-brand-deep">{eyebrow}</p>
        <h1 className="display mt-4 max-w-[860px] text-[36px] font-semibold text-ink sm:text-[56px]">{title}</h1>
        <p className="mt-6 max-w-[720px] text-[17px] leading-relaxed text-muted sm:text-[19px]">{lead}</p>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <a href="/#contact" className="rounded-full bg-ink px-6 py-3 text-[15px] font-semibold text-white transition-colors hover:bg-ink-2">
            Start your free first month
          </a>
          <a href={SIGN_IN_URL} className="rounded-full bg-white px-6 py-3 text-[15px] font-semibold text-ink ring-1 ring-line transition-colors hover:ring-ink/30">
            Sign in
          </a>
        </div>
      </Container>
    </section>
  )
}

export function Section({ id, title, intro, children, tint = false }: { id?: string; title: string; intro?: string; children?: ReactNode; tint?: boolean }) {
  return (
    <section id={id} className={`py-14 sm:py-20 ${tint ? 'bg-paper/55' : ''}`}>
      <Container>
        <h2 className="display max-w-[820px] text-[28px] font-semibold text-ink sm:text-[40px]">{title}</h2>
        {intro && <p className="mt-4 max-w-[760px] text-[16px] leading-relaxed text-muted sm:text-[17px]">{intro}</p>}
        {children && <div className="mt-8 sm:mt-10">{children}</div>}
      </Container>
    </section>
  )
}

export function Prose({ children }: { children: ReactNode }) {
  return <div className="max-w-[760px] space-y-4 text-[16px] leading-relaxed text-muted sm:text-[17px]">{children}</div>
}

export interface Item {
  title: string
  body: string
}

// A grid of h3 + paragraph cards.
export function ItemGrid({ items, cols = 2 }: { items: Item[]; cols?: 2 | 3 }) {
  return (
    <div className={`grid grid-cols-1 gap-4 sm:grid-cols-2 ${cols === 3 ? 'lg:grid-cols-3' : ''}`}>
      {items.map((it) => (
        <div key={it.title} className="rounded-[20px] bg-white p-6 ring-1 ring-line">
          <h3 className="text-[17px] font-semibold tracking-tight text-ink">{it.title}</h3>
          <p className="mt-2 text-[15px] leading-relaxed text-muted">{it.body}</p>
        </div>
      ))}
    </div>
  )
}

export function Steps({ items }: { items: Item[] }) {
  return (
    <ol className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {items.map((it, i) => (
        <li key={it.title} className="flex gap-4 rounded-[20px] bg-white p-6 ring-1 ring-line">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-soft text-[14px] font-semibold tabular-nums text-brand-deep">{i + 1}</span>
          <div>
            <h3 className="text-[17px] font-semibold tracking-tight text-ink">{it.title}</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-muted">{it.body}</p>
          </div>
        </li>
      ))}
    </ol>
  )
}

export function Checklist({ items }: { items: string[] }) {
  return (
    <ul className="grid max-w-[900px] grid-cols-1 gap-x-8 gap-y-3 text-[15px] text-ink-2 sm:grid-cols-2">
      {items.map((t) => (
        <li key={t} className="flex gap-3">
          <span aria-hidden="true" className="mt-[7px] h-2 w-2 shrink-0 rounded-full bg-brand" />
          <span>{t}</span>
        </li>
      ))}
    </ul>
  )
}

export type Screen = 'dashboard' | 'inventory' | 'orders' | 'customers' | 'equipment' | 'invoices'
const SCREEN_H: Record<Screen, number> = { dashboard: 519, inventory: 518, orders: 516, customers: 518, equipment: 519, invoices: 520 }

export function Screenshot({ name, alt, caption }: { name: Screen; alt: string; caption?: string }) {
  return (
    <figure className="m-0 max-w-[1000px]">
      <img
        src={`/screens/${name}-900.webp`}
        srcSet={`/screens/${name}-900.webp 900w, /screens/${name}-1600.webp 1600w`}
        sizes="(max-width: 1040px) 94vw, 1000px"
        width={900}
        height={SCREEN_H[name]}
        alt={alt}
        loading="lazy"
        decoding="async"
        className="h-auto w-full rounded-[14px] ring-1 ring-black/[0.08] shadow-[0_30px_60px_-30px_rgba(20,23,31,0.35)]"
      />
      {caption && <figcaption className="mt-3 text-[14px] text-faint">{caption}</figcaption>}
    </figure>
  )
}

export function FaqBlock({ faqs, title = 'Frequently asked questions' }: { faqs: Faq[]; title?: string }) {
  return (
    <Section id="faq" title={title} tint>
      <div className="max-w-[820px] divide-y divide-line rounded-[20px] bg-white ring-1 ring-line">
        {faqs.map((f) => (
          <details key={f.q} className="group px-6 py-5">
            <summary className="cursor-pointer list-none text-[16px] font-semibold text-ink marker:content-none">{f.q}</summary>
            <p className="mt-3 text-[15px] leading-relaxed text-muted">{f.a}</p>
          </details>
        ))}
      </div>
    </Section>
  )
}

export function RelatedLinks({ keys, title = 'Keep reading' }: { keys: LinkKey[]; title?: string }) {
  return (
    <Section title={title}>
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {keys.map((k) => (
          <li key={k}>
            <a href={LINKS[k].href} className="block h-full rounded-[20px] bg-white p-6 ring-1 ring-line transition-shadow hover:ring-ink/30">
              <span className="text-[16px] font-semibold text-ink">{LINKS[k].label}</span>
              <span className="mt-2 block text-[14px] leading-relaxed text-muted">{LINKS[k].hint}</span>
            </a>
          </li>
        ))}
      </ul>
    </Section>
  )
}

export function CtaBand({ title = 'Try GearGrid free for the first month' }: { title?: string }) {
  return (
    <section className="bg-ink py-16 text-white sm:py-20">
      <Container>
        <h2 className="display max-w-[720px] text-[30px] font-semibold sm:text-[42px]">{title}</h2>
        <p className="mt-4 max-w-[640px] text-[16px] leading-relaxed text-white/70">
          Every plan starts with a free first month. No setup fee, and you can cancel anytime. GearGrid is made in Sri Lanka and used by rental shops there.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <a href="/#contact" className="rounded-full bg-brand px-6 py-3 text-[15px] font-semibold text-ink transition-colors hover:bg-brand-deep">
            Start your free first month
          </a>
          <a href={SIGN_IN_URL} className="rounded-full px-6 py-3 text-[15px] font-semibold text-white ring-1 ring-white/30 transition-colors hover:ring-white/60">
            Sign in
          </a>
          <a href={WHATSAPP_URL} className="rounded-full px-6 py-3 text-[15px] font-semibold text-white ring-1 ring-white/30 transition-colors hover:ring-white/60">
            WhatsApp us
          </a>
        </div>
        <p className="mt-6 text-[14px] text-white/55">
          <span className="tabular-nums">{PHONE_DISPLAY}</span> · {EMAIL}
        </p>
      </Container>
    </section>
  )
}
