import { useEffect, useState } from 'react'
import { useI18n } from '../i18n/LanguageProvider'
import { SIGN_IN_URL } from '../lib/config'
import { LangSwitch } from './LangSwitch'
import { Logo } from './Logo'

export function Nav() {
  const { t, lang, setLang } = useI18n()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const links = [
    { href: '#how', label: t.nav.how },
    { href: '#video', label: t.nav.video },
    { href: '#pricing', label: t.nav.pricing },
    { href: '#faq', label: t.nav.faq },
  ]

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow] duration-300 ${
        scrolled || open ? 'bg-white/85 shadow-[0_1px_0_0_var(--color-line)] backdrop-blur-xl' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-16 w-full max-w-[1200px] items-center justify-between gap-4 px-5 sm:px-8 lg:px-12">
        <a href="#top" aria-label="GearGrid" onClick={() => setOpen(false)}>
          <Logo />
        </a>

        <nav className="hidden items-center gap-8 text-[14px] text-muted md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="transition-colors hover:text-ink">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <LangSwitch value={lang} onChange={setLang} label="Language" />
          <a
            href={SIGN_IN_URL}
            className="hidden items-center gap-1.5 px-2 text-[14px] font-medium text-ink transition-colors hover:text-brand-deep lg:inline-flex"
          >
            {t.nav.signIn}
            <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
              <path d="M3.5 8.5 8.5 3.5M4.5 3.5h4v4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <a
            href="#pricing"
            className="hidden rounded-full bg-ink px-5 py-2.5 text-[14px] font-medium text-white transition hover:bg-ink-2 active:scale-[0.98] sm:inline-flex"
          >
            {t.nav.cta}
          </a>
          <button
            type="button"
            aria-label={open ? t.nav.close : t.nav.menu}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
            className="grid h-10 w-10 place-items-center rounded-full text-ink md:hidden"
          >
            <span className="relative block h-3 w-5" aria-hidden="true">
              <span
                className={`absolute left-0 top-0 h-[1.5px] w-5 bg-current transition-transform duration-300 ${
                  open ? 'translate-y-[5px] rotate-45' : ''
                }`}
              />
              <span
                className={`absolute bottom-0 left-0 h-[1.5px] w-5 bg-current transition-transform duration-300 ${
                  open ? '-translate-y-[5.5px] -rotate-45' : ''
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`overflow-hidden bg-white transition-[max-height,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] md:hidden ${
          open ? 'max-h-[calc(100dvh-4rem)] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <nav className="flex h-[calc(100dvh-4rem)] flex-col px-5 pb-8 pt-4">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="border-b border-line py-4 text-[22px] font-medium tracking-tight text-ink"
            >
              {l.label}
            </a>
          ))}
          <div className="mt-auto grid gap-3">
            <a
              href="#pricing"
              onClick={() => setOpen(false)}
              className="rounded-full bg-ink py-3.5 text-center text-[15px] font-medium text-white"
            >
              {t.nav.cta}
            </a>
            <a href={SIGN_IN_URL} className="rounded-full py-3.5 text-center text-[15px] text-muted ring-1 ring-line">
              {t.nav.signIn}
            </a>
          </div>
        </nav>
      </div>
    </header>
  )
}
