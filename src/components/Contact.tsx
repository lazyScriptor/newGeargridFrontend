import { useState, type FormEvent } from 'react'
import { useI18n } from '../i18n/LanguageProvider'
import { API_BASE, EMAIL, PHONE_DISPLAY, WHATSAPP_URL } from '../lib/config'
import { Container } from './Container'
import type { PlanId } from './Pricing'
import { Reveal } from './Reveal'

type Status = 'idle' | 'sending' | 'sent' | 'error'

const field =
  'w-full rounded-2xl bg-white px-4 py-3.5 text-[16px] text-ink ring-1 ring-line placeholder:text-faint transition focus:outline-none focus:ring-2 focus:ring-brand'

export function Contact({ plan }: { plan: PlanId | null }) {
  const { t } = useI18n()
  const [status, setStatus] = useState<Status>('idle')
  // null until the visitor types; until then the message follows the chosen plan.
  const [draft, setDraft] = useState<string | null>(null)

  const planName = plan ? t.pricing.plans.find((p) => p.id === plan)?.name : undefined
  const message = draft ?? (planName ? t.contact.messageDefault(planName) : '')

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>
    setStatus('sending')
    try {
      const res = await fetch(`${API_BASE}/contact/inquiry`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          phone: data.phone || undefined,
          company: data.company || undefined,
          inquiry_type: plan === 'enterprise' ? 'sales' : 'demo',
          message: data.message,
        }),
      })
      if (!res.ok) throw new Error(String(res.status))
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="relative overflow-hidden bg-paper py-20 sm:py-28">
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-[40vmax] -right-[20vmax] h-[70vmax] w-[70vmax] rounded-full bg-[radial-gradient(circle,rgba(245,166,35,0.12)_0%,rgba(245,166,35,0)_60%)]" />
      <Container className="relative grid gap-12 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <h2 className="display text-[34px] font-semibold text-ink sm:text-[48px]">{t.contact.title}</h2>
          <p className="mt-4 max-w-[36ch] text-[16px] leading-relaxed text-muted">{t.contact.sub}</p>
          <div className="mt-10 space-y-3 text-[15px]">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 font-medium text-white transition hover:bg-ink-2"
            >
              {t.contact.whatsapp}
            </a>
            <p className="pt-2 text-muted">
              <a href={`tel:${PHONE_DISPLAY.replace(/\s/g, '')}`} className="tabular-nums hover:text-ink">
                {PHONE_DISPLAY}
              </a>
              <span className="mx-2 text-faint">·</span>
              <a href={`mailto:${EMAIL}`} className="hover:text-ink">
                {EMAIL}
              </a>
            </p>
          </div>
        </Reveal>

        <Reveal delay={100} className="lg:col-span-7">
          {status === 'sent' ? (
            <div role="status" className="flex min-h-[320px] flex-col items-start justify-center rounded-[24px] bg-white p-8 ring-1 ring-line">
              <svg width="40" height="40" viewBox="0 0 40 40" aria-hidden="true">
                <circle cx="20" cy="20" r="20" fill="var(--color-brand)" />
                <path d="m12 20.5 5.5 5.5L28 15" fill="none" stroke="var(--color-ink)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <p className="mt-6 text-[20px] font-medium tracking-tight text-ink">{t.contact.success}</p>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="grid gap-3 sm:grid-cols-2">
              <label className="sr-only" htmlFor="c-name">{t.contact.name}</label>
              <input id="c-name" name="name" required minLength={2} maxLength={120} autoComplete="name" placeholder={t.contact.name} className={field} />
              <label className="sr-only" htmlFor="c-phone">{t.contact.phone}</label>
              <input id="c-phone" name="phone" type="tel" maxLength={40} autoComplete="tel" inputMode="tel" placeholder={t.contact.phone} className={`${field} tabular-nums`} />
              <label className="sr-only" htmlFor="c-email">{t.contact.email}</label>
              <input id="c-email" name="email" type="email" required maxLength={255} autoComplete="email" placeholder={t.contact.email} className={field} />
              <label className="sr-only" htmlFor="c-company">{t.contact.company}</label>
              <input id="c-company" name="company" maxLength={120} autoComplete="organization" placeholder={t.contact.company} className={field} />
              <label className="sr-only" htmlFor="c-message">{t.contact.message}</label>
              <textarea
                id="c-message"
                name="message"
                required
                minLength={10}
                maxLength={5000}
                rows={4}
                value={message}
                onChange={(e) => setDraft(e.target.value)}
                placeholder={t.contact.messagePlaceholder}
                className={`${field} resize-none sm:col-span-2`}
              />
              <div className="flex flex-wrap items-center gap-4 sm:col-span-2">
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="rounded-full bg-brand px-8 py-3.5 text-[15px] font-semibold text-ink transition hover:bg-[#f29c0f] active:scale-[0.98] disabled:opacity-60"
                >
                  {status === 'sending' ? t.contact.sending : t.contact.submit}
                </button>
                {status === 'error' && (
                  <p role="alert" className="text-[14px] text-[#b45309]">
                    {t.contact.error}
                  </p>
                )}
              </div>
            </form>
          )}
        </Reveal>
      </Container>
    </section>
  )
}
