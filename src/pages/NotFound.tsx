import { Container } from '../components/Container'
import type { PageMeta } from '../seo/types'

// Written to dist/404.html with noindex; Cloudflare serves it for unknown URLs with a 404 status.
export const meta: { en: PageMeta } = {
  en: {
    title: 'Page not found | GearGrid',
    description: 'This page does not exist. Go back to the GearGrid home page to see how our equipment rental software works.',
  },
}

export default function NotFoundPage() {
  return (
    <main className="pt-16">
      <Container className="flex min-h-[70svh] flex-col items-start justify-center py-20">
        <p className="text-[14px] font-medium text-muted">404</p>
        <h1 className="display mt-3 text-[40px] font-semibold text-ink sm:text-[56px]">Page not found.</h1>
        <p className="mt-4 max-w-[44ch] text-[16px] text-muted">The page you are looking for is not here. It may have moved.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href="/" className="inline-flex rounded-full bg-ink px-6 py-3 text-[15px] font-medium text-white transition hover:bg-ink-2">
            Go to the home page
          </a>
          <a href="/features" className="inline-flex rounded-full px-6 py-3 text-[15px] font-medium text-ink ring-1 ring-ink/15 transition hover:ring-ink/40">
            See features
          </a>
        </div>
      </Container>
    </main>
  )
}
