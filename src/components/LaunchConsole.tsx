import { lazy, Suspense } from 'react'
import { useI18n } from '../i18n/LanguageProvider'
import { SIGN_IN_URL } from '../lib/config'
import { useInView } from '../hooks/useInView'
import { Container } from './Container'

const ConsoleScene = lazy(() => import('./ConsoleScene'))

// Final band: an amber tile wave (three.js) behind the Launch console button.
export function LaunchConsole() {
  const { t } = useI18n()
  const [ref, , seen] = useInView<HTMLDivElement>({ rootMargin: '300px 0px' })
  const burst = () => window.dispatchEvent(new Event('gg:launch'))

  return (
    <section id="console" className="py-16 sm:py-24">
      <Container>
        <div
          ref={ref}
          className="relative isolate h-[460px] overflow-hidden rounded-[28px] bg-[linear-gradient(180deg,#ffffff_0%,#f4f5f7_100%)] ring-1 ring-line sm:h-[540px] sm:rounded-[36px]"
        >
          <div className="absolute inset-0 -z-10">
            {seen && (
              <Suspense fallback={null}>
                <div className="h-full w-full animate-[fadein_1.2s_ease-out_both]">
                  <ConsoleScene />
                </div>
              </Suspense>
            )}
          </div>
          {/* Fade the top so the words stay easy to read */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[62%] bg-[linear-gradient(180deg,#ffffff_25%,rgba(255,255,255,0))]" />

          <div className="flex flex-col items-center px-6 pt-12 text-center sm:pt-16">
            <p className="text-[14px] font-medium text-muted sm:text-[15px]">{t.launch.eyebrow}</p>
            <h2 className="display mt-3 max-w-[18ch] text-[30px] font-semibold text-ink sm:text-[46px]">{t.launch.title}</h2>
            <a
              href={SIGN_IN_URL}
              onMouseEnter={burst}
              onFocus={burst}
              onClick={burst}
              className="group mt-8 inline-flex items-center gap-3 rounded-full bg-ink py-2 pl-6 pr-2 text-[15px] font-semibold text-white shadow-[0_16px_36px_-14px_rgba(20,23,31,0.55)] transition hover:bg-ink-2 active:scale-[0.98] sm:text-[16px]"
            >
              {t.launch.cta}
              <span className="grid h-10 w-10 place-items-center rounded-full bg-brand text-ink transition-transform duration-300 group-hover:translate-x-0.5 group-hover:rotate-[-35deg]">
                <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
                  <path d="M3 8h10m-4-4 4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </a>
          </div>
        </div>
      </Container>
    </section>
  )
}
