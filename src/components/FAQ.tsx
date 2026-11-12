import { useI18n } from '../i18n/LanguageProvider'
import { Container } from './Container'
import { Reveal } from './Reveal'

export function FAQ() {
  const { t } = useI18n()
  return (
    <section id="faq" className="py-20 sm:py-28">
      <Container className="grid gap-10 lg:grid-cols-12">
        <Reveal className="lg:col-span-4">
          <h2 className="display text-[34px] font-semibold text-ink sm:text-[48px]">{t.faq.title}</h2>
        </Reveal>
        <div className="lg:col-span-8">
          {t.faq.items.map((item, i) => (
            <Reveal key={i} delay={i * 60}>
              <details className="group border-b border-line [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-[17px] font-medium text-ink sm:text-[19px]">
                  {item.q}
                  <span
                    aria-hidden="true"
                    className="relative h-4 w-4 shrink-0 before:absolute before:left-0 before:top-1/2 before:h-[1.5px] before:w-4 before:-translate-y-1/2 before:bg-ink after:absolute after:left-1/2 after:top-0 after:h-4 after:w-[1.5px] after:-translate-x-1/2 after:bg-ink after:transition-transform after:duration-300 group-open:after:scale-y-0"
                  />
                </summary>
                <p className="-mt-2 max-w-[60ch] pb-6 text-[15px] leading-relaxed text-muted sm:text-[16px]">{item.a}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
