import { useI18n } from '../i18n/LanguageProvider'
import { SIGN_IN_URL } from '../lib/config'
import { sectionHref } from '../lib/routing'
import { useRouter } from '../router'
import { Container } from './Container'
import { Logo } from './Logo'

// The product and solution pages are in English only.
const PAGE_LINKS = [
  { href: '/features', label: 'Features' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/rental-management-software', label: 'Rental management software' },
  { href: '/construction-equipment-rental-software', label: 'Construction equipment' },
  { href: '/tool-hire-software', label: 'Tool hire' },
  { href: '/camera-rental-software', label: 'Camera rental' },
  { href: '/event-rental-software', label: 'Event rental' },
]

export function Footer() {
  const { t, lang } = useI18n()
  const { path } = useRouter()
  const to = (hash: string) => sectionHref(path, lang, hash)
  return (
    <footer className="border-t border-line py-10">
      <Container className="flex flex-col gap-8 text-[14px] text-muted">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <a href={to('#top')} aria-label="GearGrid">
            <Logo />
          </a>
          <nav className="flex flex-wrap gap-x-6 gap-y-2">
            <a href={to('#how')} className="hover:text-ink">{t.nav.how}</a>
            <a href={to('#pricing')} className="hover:text-ink">{t.nav.pricing}</a>
            <a href={to('#faq')} className="hover:text-ink">{t.nav.faq}</a>
            <a href={SIGN_IN_URL} className="hover:text-ink">{t.nav.signIn}</a>
          </nav>
          <p className="tabular-nums">
            © <span suppressHydrationWarning>{new Date().getFullYear()}</span> GearGrid · {t.footer.made}
          </p>
        </div>
        <nav aria-label="Product and solutions" lang="en" className="flex flex-wrap gap-x-6 gap-y-2 border-t border-line pt-6">
          {PAGE_LINKS.map((l) => (
            <a key={l.href} href={l.href} className="hover:text-ink">
              {l.label}
            </a>
          ))}
        </nav>
      </Container>
    </footer>
  )
}
