import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { useI18n } from '../i18n/LanguageProvider'
import { useInView } from '../hooks/useInView'
import { Container } from './Container'
import { Reveal } from './Reveal'

const SCREENS = ['dashboard', 'inventory', 'orders', 'customers', 'equipment', 'invoices'] as const
const STORY_MS = 4800

// Where each card sits, by distance from the front (k). The card that just
// left the front (k = n - 1) floats toward the viewer and fades out.
function cardStyle(k: number, n: number): CSSProperties {
  if (k === n - 1 && n > 4) {
    // Fades out fast so two screens never blend together.
    return { transform: 'translate3d(0, 7%, 160px) scale(1.04)', opacity: 0, zIndex: 60, transitionDuration: '1000ms, 420ms' }
  }
  const depth = Math.min(k, 4)
  return {
    transform: `translate3d(0, ${-depth * 8.5}%, ${-depth * 70}px) scale(${1 - depth * 0.06})`,
    opacity: k > 3 ? 0 : 1 - depth * 0.2,
    zIndex: 50 - k,
  }
}

// App screens stacked in 3D. Cycles on its own while on screen, pauses on
// hover, tabs jump straight to a screen, and phones can swipe.
export function Showcase() {
  const { t } = useI18n()
  const n = SCREENS.length
  const [active, setActive] = useState(0)
  const [hovered, setHovered] = useState(false)
  const [sectionRef, inView] = useInView<HTMLElement>({ threshold: 0.2 })
  const deckRef = useRef<HTMLDivElement>(null)
  const swipeX = useRef<number | null>(null)
  const [reduceMotion] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  const running = inView && !hovered && !reduceMotion

  useEffect(() => {
    if (!running) return
    const id = window.setTimeout(() => setActive((a) => (a + 1) % n), STORY_MS)
    return () => window.clearTimeout(id)
  }, [active, running, n])

  // The stack starts tilted back and stands up as it scrolls into view.
  useEffect(() => {
    const deck = deckRef.current
    if (!deck || reduceMotion) return
    let frame = 0
    const update = () => {
      frame = 0
      const r = deck.getBoundingClientRect()
      const vh = window.innerHeight
      const p = Math.min(1, Math.max(0, (r.top - vh * 0.12) / (vh * 0.75)))
      deck.style.setProperty('--tilt', `${(p * 18).toFixed(2)}deg`)
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
    }
  }, [reduceMotion])

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse' || reduceMotion) return
    const r = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width - 0.5
    const y = (e.clientY - r.top) / r.height - 0.5
    e.currentTarget.style.setProperty('--ry', `${(x * 6).toFixed(2)}deg`)
    e.currentTarget.style.setProperty('--rx', `${(-y * 4).toFixed(2)}deg`)
  }
  const onPointerLeave = (e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.style.setProperty('--ry', '0deg')
    e.currentTarget.style.setProperty('--rx', '0deg')
    setHovered(false)
  }

  const go = (dir: number) => setActive((a) => (a + dir + n) % n)

  return (
    <section ref={sectionRef} id="screens" className="relative py-16 sm:py-24">
      <Container>
        <Reveal className="text-center">
          <h2 className="display text-[34px] font-semibold text-ink sm:text-[48px]">{t.screens.title}</h2>
        </Reveal>

        <div
          ref={deckRef}
          onPointerEnter={(e) => e.pointerType === 'mouse' && setHovered(true)}
          onPointerMove={onPointerMove}
          onPointerLeave={onPointerLeave}
          onPointerDown={(e) => (swipeX.current = e.clientX)}
          onPointerUp={(e) => {
            if (swipeX.current === null) return
            const dx = e.clientX - swipeX.current
            swipeX.current = null
            if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1)
          }}
          className="relative mx-auto mt-12 max-w-[1080px] touch-pan-y select-none [--rx:0deg] [--ry:0deg] [--tilt:18deg] [perspective:2000px] sm:mt-20"
        >
          {/* Soft amber light under the stack */}
          <div aria-hidden="true" className="pointer-events-none absolute -inset-x-[12%] -bottom-[18%] top-[20%] -z-10 rounded-full bg-[radial-gradient(closest-side,rgba(245,166,35,0.22),rgba(245,166,35,0))]" />

          <div
            className="relative aspect-[1.66] transition-transform duration-700 ease-out [transform-style:preserve-3d]"
            style={{ transform: 'rotateX(calc(var(--tilt) + var(--rx))) rotateY(var(--ry))' }}
          >
            {SCREENS.map((key, i) => {
              const k = (i - active + n) % n
              return (
                <figure
                  key={key}
                  aria-hidden={k !== 0}
                  className="absolute inset-0 m-0 flex flex-col overflow-hidden rounded-[14px] bg-white shadow-[0_50px_100px_-40px_rgba(20,23,31,0.45),0_18px_36px_-24px_rgba(20,23,31,0.3)] ring-1 ring-black/[0.06] transition-[transform,opacity] duration-[1000ms] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform sm:rounded-[22px]"
                  style={cardStyle(k, n)}
                >
                  {/* Slim window bar */}
                  <div className="flex h-7 shrink-0 items-center gap-2 border-b border-line bg-white px-3 sm:h-9 sm:px-4">
                    <img src="/favicon.svg" alt="" width={14} height={14} className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                    <span className="text-[10px] font-medium text-faint sm:text-[12px]">app.geargrid.live</span>
                    <span className="ml-auto text-[10px] font-medium text-muted sm:text-[12px]">{t.screens.tabs[i]}</span>
                  </div>
                  <div className="relative min-h-0 flex-1">
                    <img
                      src={`/screens/${key}-1600.webp`}
                      srcSet={`/screens/${key}-900.webp 900w, /screens/${key}-1600.webp 1600w`}
                      sizes="(max-width: 768px) 94vw, 1080px"
                      alt={`${t.screens.alt} ${t.screens.tabs[i]}`}
                      loading="lazy"
                      decoding="async"
                      draggable={false}
                      className="absolute inset-0 h-full w-full object-cover object-top"
                    />
                    {/* A light sweep each time a new screen comes to the front */}
                    {k === 0 && <span key={active} aria-hidden="true" className="screen-shine pointer-events-none absolute inset-0" />}
                  </div>
                </figure>
              )
            })}
          </div>
        </div>

        {/* Tabs with a fill that shows when the next screen comes */}
        <div className="no-scrollbar -mx-5 mt-10 flex gap-2 overflow-x-auto px-5 sm:mx-0 sm:mt-14 sm:flex-wrap sm:justify-center sm:px-0">
          {t.screens.tabs.map((label, i) => {
            const on = i === active
            return (
              <button
                key={label}
                type="button"
                onClick={() => setActive(i)}
                aria-pressed={on}
                className={`relative shrink-0 overflow-hidden rounded-full px-4 py-2 text-[13px] font-medium transition-colors duration-300 sm:text-[14px] ${
                  on ? 'bg-ink text-white' : 'bg-white/70 text-muted ring-1 ring-line hover:text-ink'
                }`}
              >
                {label}
                {on && (
                  <span
                    key={active}
                    aria-hidden="true"
                    className="story-fill absolute inset-x-3 bottom-[5px] h-[2px] rounded-full bg-brand"
                    style={{ '--story-ms': `${STORY_MS}ms`, animationPlayState: running ? 'running' : 'paused' } as CSSProperties}
                  />
                )}
              </button>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
