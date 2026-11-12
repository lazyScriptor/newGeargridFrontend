import { lazy, Suspense, useEffect, useState } from 'react'
import { useI18n } from '../i18n/LanguageProvider'
import { Container } from './Container'

const HeroGrid = lazy(() => import('./HeroGrid'))

function supportsWebGL() {
  try {
    const c = document.createElement('canvas')
    return !!(c.getContext('webgl2') || c.getContext('webgl'))
  } catch {
    return false
  }
}

export function Hero() {
  const { t, lang } = useI18n()
  const [showGrid, setShowGrid] = useState(false)

  // Mount the 3D grid after first paint so text shows instantly.
  useEffect(() => {
    if (!supportsWebGL()) return
    const idle = window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 200))
    const id = idle(() => setShowGrid(true))
    return () => (window.cancelIdleCallback ?? window.clearTimeout)(id as number)
  }, [])

  const ripple = () => window.dispatchEvent(new Event('gg:ripple'))

  return (
    <section id="top" className="relative overflow-hidden pt-16">
      {/* Abstract backdrop: one soft amber glow and a faint ring */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="drift absolute -right-[20%] top-[8%] h-[70vmax] w-[70vmax] rounded-full bg-[radial-gradient(circle,rgba(245,166,35,0.13)_0%,rgba(245,166,35,0)_62%)]" />
        <div className="absolute -left-[30vmax] -top-[30vmax] h-[60vmax] w-[60vmax] rounded-full border border-line/70" />
      </div>

      <Container className="grid min-h-[min(calc(100svh-4rem),920px)] grid-cols-1 items-center gap-2 py-10 lg:grid-cols-12 lg:gap-6 lg:py-0">
        <div className="lg:col-span-6">
          <p className="inline-flex items-center gap-2.5 text-[13px] font-medium text-muted sm:text-[14px]">
            <span aria-hidden="true" className="h-[2px] w-6 rounded-full bg-brand" />
            {t.hero.eyebrow}
          </p>

          <h1
            className={`display mt-5 font-semibold text-ink ${
              lang === 'si' ? 'text-[31px] sm:text-[42px] xl:text-[48px]' : 'text-[46px] sm:text-[62px] xl:text-[72px]'
            }`}
          >
            {t.hero.title.map((line, i) => (
              <span key={i} className="block">
                {line}
              </span>
            ))}
          </h1>

          <p className="mt-6 max-w-[480px] text-[16px] leading-relaxed text-muted sm:text-[18px]">{t.hero.sub}</p>

          <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2.5">
            {t.hero.points.map((pt) => (
              <li key={pt} className="inline-flex items-center gap-2 text-[14px] font-medium text-ink-2 sm:text-[15px]">
                <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true" className="shrink-0">
                  <circle cx="9" cy="9" r="9" fill="var(--color-brand-soft)" />
                  <path d="m5.5 9.2 2.3 2.3 4.7-5" fill="none" stroke="var(--color-brand-deep)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {pt}
              </li>
            ))}
          </ul>

          <div className="mt-9 flex flex-wrap gap-3">
            <a
              href="#pricing"
              onMouseEnter={ripple}
              onFocus={ripple}
              className="inline-flex items-center rounded-full bg-brand px-7 py-3.5 text-[15px] font-semibold text-ink shadow-[0_10px_24px_-10px_rgba(217,138,31,0.7)] transition hover:bg-[#f29c0f] active:scale-[0.98]"
            >
              {t.hero.primary}
              <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" className="ml-2">
                <path d="M3 8h10m-4-4 4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <a
              href="#video"
              className="inline-flex items-center gap-2.5 rounded-full px-6 py-3.5 text-[15px] font-medium text-ink ring-1 ring-ink/15 transition hover:ring-ink/40 active:scale-[0.98]"
            >
              <svg width="10" height="12" viewBox="0 0 10 12" aria-hidden="true">
                <path d="M0 0l10 6-10 6z" fill="currentColor" />
              </svg>
              {t.hero.secondary}
            </a>
          </div>
        </div>

        <div className="relative -mx-5 h-[400px] sm:mx-0 sm:h-[540px] lg:col-span-6 lg:-mr-10 lg:h-[700px] xl:-mr-20">
          {showGrid && (
            <Suspense fallback={null}>
              <div className="h-full w-full animate-[fadein_1.2s_ease-out_both]">
                <HeroGrid />
              </div>
            </Suspense>
          )}

          {/* Two real outcomes, floating over the grid */}
          <FloatCard
            className="left-5 top-[4%] sm:left-[2%] sm:top-[10%] [animation-delay:0.4s]"
            icon="check"
            title={t.hero.cards.bill.title}
            value={t.hero.cards.bill.value}
          />
          <FloatCard
            className="bottom-[4%] right-5 sm:bottom-[10%] sm:right-[2%] [animation-delay:0.9s] [&_.float]:[animation-delay:-3s]"
            icon="clock"
            title={t.hero.cards.late.title}
            value={t.hero.cards.late.value}
          />
        </div>
      </Container>
    </section>
  )
}

function FloatCard({ className, icon, title, value }: { className: string; icon: 'check' | 'clock'; title: string; value: string }) {
  return (
    <div
      className={`pointer-events-none absolute z-10 animate-[fadein_0.9s_ease-out_both] ${className}`}
    >
      <div className="float flex items-center gap-3 rounded-2xl bg-white/90 py-2.5 pl-2.5 pr-4 shadow-[0_18px_40px_-18px_rgba(20,23,31,0.35)] ring-1 ring-black/5 backdrop-blur-md sm:py-3 sm:pl-3 sm:pr-5">
        <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl sm:h-10 sm:w-10 ${icon === 'check' ? 'bg-brand' : 'bg-ink'}`}>
          {icon === 'check' ? (
            <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
              <path d="m4.5 9.5 3 3 6-7" fill="none" stroke="var(--color-ink)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
              <circle cx="9" cy="9" r="6.5" fill="none" stroke="var(--color-brand)" strokeWidth="1.8" />
              <path d="M9 5.5V9l2.5 1.5" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          )}
        </span>
        <span className="flex flex-col">
          <span className="text-[12px] text-muted sm:text-[13px]">{title}</span>
          <span className="text-[15px] font-semibold tracking-tight tabular-nums text-ink sm:text-[17px]">{value}</span>
        </span>
      </div>
    </div>
  )
}
