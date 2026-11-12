import { useI18n } from '../i18n/LanguageProvider'
import { SIGN_IN_URL } from '../lib/config'
import { Container } from './Container'
import { Logo } from './Logo'

export function Footer() {
  const { t } = useI18n()
  return (
    <footer className="border-t border-line py-10">
      <Container className="flex flex-col gap-6 text-[14px] text-muted sm:flex-row sm:items-center sm:justify-between">
        <a href="#top" aria-label="GearGrid">
          <Logo />
        </a>
        <nav className="flex flex-wrap gap-x-6 gap-y-2">
          <a href="#how" className="hover:text-ink">{t.nav.how}</a>
          <a href="#pricing" className="hover:text-ink">{t.nav.pricing}</a>
          <a href="#faq" className="hover:text-ink">{t.nav.faq}</a>
          <a href={SIGN_IN_URL} className="hover:text-ink">{t.nav.signIn}</a>
        </nav>
        <p className="tabular-nums">
          © {new Date().getFullYear()} GearGrid · {t.footer.made}
        </p>
      </Container>
    </footer>
  )
}
