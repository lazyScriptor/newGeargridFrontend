import { useI18n } from '../i18n/LanguageProvider'
import { Container } from './Container'
import { Reveal } from './Reveal'

// Abstract line glyphs, one per step. Ink lines with a single amber accent.
const GLYPHS = [
  // 1: yard: a 3×3 grid of tiles
  <svg key="yard" viewBox="0 0 120 120" className="h-full w-full" aria-hidden="true">
    {[0, 1, 2].flatMap((r) =>
      [0, 1, 2].map((c) => {
        const i = r * 3 + c
        const x = 18 + c * 30
        const y = 18 + r * 30
        return (
          <rect
            key={i}
            x={x}
            y={y}
            width="24"
            height="24"
            rx="6"
            className={`transition-all duration-700 ${
              i === 4 ? 'fill-brand' : i === 2 || i === 6 ? 'fill-ink' : 'fill-none stroke-ink/25'
            } group-hover:[transform:translateY(-2px)]`}
            style={{ transitionDelay: `${(r + c) * 60}ms` }}
            strokeWidth="1.5"
          />
        )
      }),
    )}
  </svg>,
  // 2: bill: a receipt with a tick
  <svg key="bill" viewBox="0 0 120 120" className="h-full w-full" aria-hidden="true">
    <path d="M34 16h52v84l-8.7-6-8.6 6-8.7-6-8.7 6-8.6-6-8.7 6z" className="fill-none stroke-ink/25" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M46 36h28M46 48h28M46 60h16" className="stroke-ink/25" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="82" cy="78" r="16" className="fill-brand transition-transform duration-700 [transform-origin:82px_78px] group-hover:scale-110" />
    <path d="m75 78 5 5 9-10" className="fill-none stroke-ink" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>,
  // 3: late fees: a clock arc
  <svg key="time" viewBox="0 0 120 120" className="h-full w-full" aria-hidden="true">
    <circle cx="60" cy="60" r="38" className="fill-none stroke-ink/15" strokeWidth="1.5" />
    <path
      d="M60 22a38 38 0 0 1 36.1 49.7"
      className="fill-none stroke-brand transition-[stroke-dashoffset] duration-1000 [stroke-dasharray:80] [stroke-dashoffset:0] group-hover:[stroke-dashoffset:-14]"
      strokeWidth="6"
      strokeLinecap="round"
    />
    <path d="M60 60V38M60 60l14 9" className="fill-none stroke-ink" strokeWidth="2" strokeLinecap="round" />
  </svg>,
  // 4: pocket: a phone with rising bars
  <svg key="phone" viewBox="0 0 120 120" className="h-full w-full" aria-hidden="true">
    <rect x="36" y="14" width="48" height="92" rx="12" className="fill-none stroke-ink/25" strokeWidth="1.5" />
    {[0, 1, 2].map((i) => (
      <rect
        key={i}
        x={47 + i * 10}
        width="6"
        rx="3"
        y={82 - (i + 1) * 12}
        height={(i + 1) * 12}
        className={`${i === 2 ? 'fill-brand' : 'fill-ink'} transition-transform duration-700 [transform-box:fill-box] [transform-origin:bottom] group-hover:scale-y-110`}
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
            <Reveal as="li" key={i} delay={i * 90} className="group flex flex-col rounded-[24px] bg-paper p-6 sm:p-7">
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
