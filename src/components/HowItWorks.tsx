import { useI18n } from '../i18n/LanguageProvider'
import { Container } from './Container'
import { Reveal } from './Reveal'

// Abstract line glyphs, one per step: ink lines, one amber accent and a
// small looping motion each (paused until the card is on screen).
const YARD_ORDER = [0, 1, 2, 5, 8, 7, 6, 3, 4]

const GLYPHS = [
  // 1: yard, an amber light moving tile to tile
  <svg key="yard" viewBox="0 0 120 120" className="glyph-anim h-full w-full" aria-hidden="true">
    {[0, 1, 2].flatMap((r) =>
      [0, 1, 2].map((c) => {
        const i = r * 3 + c
        const solid = i === 2 || i === 6
        return (
          <rect
            key={i}
            x={18 + c * 30}
            y={18 + r * 30}
            width="24"
            height="24"
            rx="6"
            strokeWidth="1.5"
            className={solid ? 'fill-ink' : 'yard-tile'}
            style={solid ? undefined : { animationDelay: `${YARD_ORDER.indexOf(i) * 0.6}s` }}
          />
        )
      }),
    )}
  </svg>,
  // 2: bill, lines write themselves, then the tick pops
  <svg key="bill" viewBox="0 0 120 120" className="glyph-anim h-full w-full" aria-hidden="true">
    <path d="M34 16h52v84l-8.7-6-8.6 6-8.7-6-8.7 6-8.6-6-8.7 6z" className="fill-white stroke-ink/25" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M46 36h28" className="receipt-line stroke-ink/30" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M46 48h28" className="receipt-line stroke-ink/30 [animation-delay:0.25s]" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M46 60h16" className="receipt-line stroke-ink/30 [animation-delay:0.5s]" strokeWidth="1.5" strokeLinecap="round" />
    <g className="tick-pop">
      <circle cx="82" cy="78" r="16" className="fill-brand" />
      <path d="m75 78 5 5 9-10" className="fill-none stroke-ink" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </g>
  </svg>,
  // 3: late fees, the hands keep turning and the amber arc grows
  <svg key="time" viewBox="0 0 120 120" className="glyph-anim h-full w-full" aria-hidden="true">
    <circle cx="60" cy="60" r="38" className="fill-white stroke-ink/15" strokeWidth="1.5" />
    <circle cx="60" cy="60" r="38" className="clock-arc fill-none stroke-brand" strokeWidth="6" strokeLinecap="round" transform="rotate(-90 60 60)" />
    <path d="M60 60V36" className="clock-hand stroke-ink" strokeWidth="2.2" strokeLinecap="round" />
    <path d="M60 60h14" className="clock-hand-fast stroke-ink/60" strokeWidth="1.6" strokeLinecap="round" />
    <circle cx="60" cy="60" r="3" className="fill-ink" />
  </svg>,
  // 4: pocket, phone bars rising and settling
  <svg key="phone" viewBox="0 0 120 120" className="glyph-anim h-full w-full" aria-hidden="true">
    <rect x="36" y="14" width="48" height="92" rx="12" className="fill-white stroke-ink/25" strokeWidth="1.5" />
    <rect x="52" y="20" width="16" height="3" rx="1.5" className="fill-ink/15" />
    {[0, 1, 2].map((i) => (
      <rect
        key={i}
        x={47 + i * 10}
        width="6"
        rx="3"
        y={82 - (i + 1) * 12}
        height={(i + 1) * 12}
        className={`phone-bar ${i === 2 ? 'fill-brand' : 'fill-ink'}`}
        style={{ animationDelay: `${i * 0.22}s` }}
      />
    ))}
  </svg>,
]

export function HowItWorks() {
  const { t } = useI18n()
  return (
    <section id="how" className="py-20 sm:py-28">
      <Container>
        <Reveal>
          <h2 className="display max-w-[16ch] text-[34px] font-semibold text-ink sm:text-[48px]">{t.how.title}</h2>
        </Reveal>

        <ol className="mt-12 grid grid-cols-1 gap-4 sm:mt-16 sm:grid-cols-2 lg:grid-cols-4">
          {t.how.steps.map((s, i) => (
            <Reveal as="li" key={i} delay={i * 90} className="group flex flex-col rounded-[24px] bg-white/70 p-6 ring-1 ring-line/80 backdrop-blur-sm transition-shadow duration-500 hover:shadow-[0_24px_50px_-30px_rgba(20,23,31,0.35)] sm:p-7">
              <span className="text-[13px] font-medium tabular-nums text-faint">0{i + 1}</span>
              <div className="my-6 h-24 w-24 sm:my-8 sm:h-28 sm:w-28">{GLYPHS[i]}</div>
              <h3 className="mt-auto text-[19px] font-semibold tracking-tight text-ink">{s.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-muted">{s.text}</p>
            </Reveal>
          ))}
        </ol>

        <dl className="mt-16 grid grid-cols-2 gap-y-10 border-t border-line pt-10 sm:mt-20 lg:grid-cols-4">
          {t.stats.map((s, i) => (
            <Reveal key={i} delay={i * 80}>
              <dt className="sr-only">{s.label}</dt>
              <dd className="text-[32px] font-semibold tracking-[-0.03em] tabular-nums text-ink sm:text-[40px]">{s.value}</dd>
              <dd className="mt-1 text-[14px] text-muted">{s.label}</dd>
            </Reveal>
          ))}
        </dl>
      </Container>
    </section>
  )
}
