import { useState } from 'react'
import { useI18n } from '../i18n/LanguageProvider'
import { PRICES, type Currency } from '../lib/config'
import { Container } from './Container'
import { Reveal } from './Reveal'

export type PlanId = 'starter' | 'pro' | 'enterprise'

export function Pricing({ onChoose }: { onChoose: (plan: PlanId) => void }) {
  const { t, isSriLanka } = useI18n()
  // Rupees for visitors in Sri Lanka, dollars elsewhere.
  const [currency, setCurrency] = useState<Currency>(isSriLanka ? 'LKR' : 'USD')

  return (
    <section id="pricing" className="bg-paper py-20 sm:py-28">
      <Container>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <Reveal>
            <h2 className="display text-[34px] font-semibold text-ink sm:text-[48px]">{t.pricing.title}</h2>
            <p className="mt-3 text-[16px] text-muted">{t.pricing.sub}</p>
          </Reveal>
          <Reveal delay={80}>
            <div role="radiogroup" aria-label="Currency" className="inline-flex rounded-full bg-white p-1 ring-1 ring-line">
              {(['LKR', 'USD'] as Currency[]).map((c) => (
                <button
                  key={c}
                  type="button"
                  role="radio"
                  aria-checked={currency === c}
                  onClick={() => setCurrency(c)}
                  className={`rounded-full px-4 py-1.5 text-[13px] font-medium transition-colors ${
                    currency === c ? 'bg-ink text-white' : 'text-muted hover:text-ink'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </Reveal>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-14 lg:grid-cols-3">
          {t.pricing.plans.map((p, i) => {
            const featured = p.id === 'pro'
            const price = p.id === 'enterprise' ? t.pricing.custom : PRICES[currency][p.id as 'starter' | 'pro']
            return (
              <Reveal
                key={p.id}
                delay={i * 90}
                className={`relative flex flex-col rounded-[24px] p-7 sm:p-8 ${
                  featured ? 'bg-ink text-white' : 'bg-white text-ink ring-1 ring-line'
                }`}
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-[18px] font-semibold tracking-tight">{p.name}</h3>
                  {featured && (
                    <span className="rounded-full bg-brand px-3 py-1 text-[12px] font-semibold text-ink">
                      {t.pricing.popular}
                    </span>
                  )}
                </div>
                <p className={`mt-2 text-[14px] ${featured ? 'text-white/65' : 'text-muted'}`}>{p.blurb}</p>

                <div className="mt-8 flex items-baseline gap-1.5">
                  <span className="text-[40px] font-semibold tracking-[-0.03em] tabular-nums">{price}</span>
                  {p.id !== 'enterprise' && (
                    <span className={`text-[14px] ${featured ? 'text-white/55' : 'text-faint'}`}>{t.pricing.perMonth}</span>
                  )}
                </div>

                <ul className={`mt-8 space-y-3 border-t pt-6 text-[15px] ${featured ? 'border-white/10' : 'border-line'}`}>
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-3">
                      <svg width="16" height="16" viewBox="0 0 16 16" className="mt-[3px] shrink-0" aria-hidden="true">
                        <path d="m3.5 8.5 3 3 6-7" fill="none" stroke="var(--color-brand)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <span className={featured ? 'text-white/85' : 'text-ink-2'}>{f}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href="#contact"
                  onClick={() => onChoose(p.id as PlanId)}
                  className={`mt-10 inline-flex justify-center rounded-full py-3.5 text-[15px] font-semibold transition active:scale-[0.98] ${
                    featured ? 'bg-brand text-ink hover:bg-[#f29c0f]' : 'bg-ink text-white hover:bg-ink-2'
                  }`}
                >
                  {p.cta}
                </a>
              </Reveal>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
