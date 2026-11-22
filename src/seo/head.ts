import { SITE_ORIGIN } from '../site'
import type { Lang, PageMeta, RouteDef } from './types'

// Everything that goes in <head> for one page, as plain data. The prerender
// step turns it into HTML; the browser applies it again when the language
// switch moves between / and /si/.

export interface HeadData {
  lang: Lang
  title: string
  description: string
  /** Absolute URL, or null for pages that must not be indexed (404). */
  canonical: string | null
  noindex: boolean
  alternates: { hreflang: string; href: string }[]
  ogImage: string
  ogLocale: string
  ogLocaleAlternates: string[]
  jsonLd: Record<string, unknown>
}

const OG_LOCALE: Record<Lang, string> = { en: 'en_US', si: 'si_LK' }
const DEFAULT_OG_IMAGE = `${SITE_ORIGIN}/og-image.png`

export const abs = (path: string) => `${SITE_ORIGIN}${path}`

function siteGraph(): Record<string, unknown>[] {
  const plan = (name: string, lkr: number, usd: number) =>
    [
      { price: lkr, cur: 'LKR' },
      { price: usd, cur: 'USD' },
    ].map(({ price, cur }) => ({
      '@type': 'Offer',
      name: `${name} (${cur})`,
      price: String(price),
      priceCurrency: cur,
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        price: String(price),
        priceCurrency: cur,
        referenceQuantity: { '@type': 'QuantitativeValue', value: 1, unitCode: 'MON' },
      },
    }))
  return [
    {
      '@type': 'Organization',
      '@id': `${SITE_ORIGIN}/#org`,
      name: 'GearGrid',
      url: `${SITE_ORIGIN}/`,
      logo: `${SITE_ORIGIN}/favicon-512x512.png`,
      email: 'contact@geargrid.live',
      contactPoint: [
        {
          '@type': 'ContactPoint',
          contactType: 'sales',
          telephone: '+94777722295',
          email: 'contact@geargrid.live',
          availableLanguage: ['English', 'Sinhala'],
        },
      ],
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_ORIGIN}/#website`,
      url: `${SITE_ORIGIN}/`,
      name: 'GearGrid',
      publisher: { '@id': `${SITE_ORIGIN}/#org` },
      inLanguage: ['en', 'si'],
    },
    {
      '@type': 'SoftwareApplication',
      '@id': `${SITE_ORIGIN}/#software`,
      name: 'GearGrid',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web, Android',
      url: `${SITE_ORIGIN}/`,
      publisher: { '@id': `${SITE_ORIGIN}/#org` },
      description:
        'Equipment rental software: live availability, instant invoicing, automatic late fees and maintenance tracking for rental businesses.',
      offers: [...plan('Starter', 5900, 19), ...plan('Pro', 9900, 39)],
    },
  ]
}

function crumbName(meta: PageMeta) {
  return meta.title.split(/\s[|\-–—]\s/)[0].trim() || meta.title
}

function stripContext(o: Record<string, unknown>) {
  const { '@context': _ctx, ...rest } = o
  void _ctx
  return rest
}

export function buildHead(route: RouteDef | null, meta: PageMeta, lang: Lang): HeadData {
  const graph: Record<string, unknown>[] = [...siteGraph()]
  if (route) {
    graph.push(...(meta.jsonLd ?? []).map(stripContext))
    if (route.path !== '/' && route.path !== '/si/') {
      graph.push({
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'GearGrid', item: `${SITE_ORIGIN}/` },
          { '@type': 'ListItem', position: 2, name: crumbName(meta), item: abs(route.path) },
        ],
      })
    }
  }

  const alt = route?.alternates ?? {}
  const alternates = Object.entries(alt).map(([hreflang, href]) => ({ hreflang, href: abs(href as string) }))
  if (alt.en) alternates.push({ hreflang: 'x-default', href: abs(alt.en) })

  return {
    lang,
    title: meta.title,
    description: meta.description,
    canonical: route ? abs(route.path) : null,
    noindex: !route,
    alternates,
    ogImage: meta.ogImage ?? DEFAULT_OG_IMAGE,
    ogLocale: OG_LOCALE[lang],
    ogLocaleAlternates: Object.keys(alt)
      .filter((l) => l !== lang)
      .map((l) => OG_LOCALE[l as Lang]),
    jsonLd: { '@context': 'https://schema.org', '@graph': graph },
  }
}

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

export function jsonLdText(h: HeadData) {
  return JSON.stringify(h.jsonLd).replace(/</g, '\\u003c')
}

/** The <head> tags for one page, as an HTML string (used by the prerender step). */
export function renderHeadHtml(h: HeadData): string {
  const lines: string[] = [
    `<title>${esc(h.title)}</title>`,
    `<meta name="description" content="${esc(h.description)}" />`,
    h.noindex
      ? '<meta name="robots" content="noindex" />'
      : '<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />',
  ]
  if (h.canonical) lines.push(`<link rel="canonical" href="${esc(h.canonical)}" />`)
  for (const a of h.alternates) lines.push(`<link rel="alternate" hreflang="${a.hreflang}" href="${esc(a.href)}" />`)
  lines.push(
    '<meta property="og:site_name" content="GearGrid" />',
    `<meta property="og:locale" content="${h.ogLocale}" />`,
    ...h.ogLocaleAlternates.map((l) => `<meta property="og:locale:alternate" content="${l}" />`),
    '<meta property="og:type" content="website" />',
    ...(h.canonical ? [`<meta property="og:url" content="${esc(h.canonical)}" />`] : []),
    `<meta property="og:title" content="${esc(h.title)}" />`,
    `<meta property="og:description" content="${esc(h.description)}" />`,
    `<meta property="og:image" content="${esc(h.ogImage)}" />`,
    `<meta property="og:image:alt" content="${esc(h.title)}" />`,
    '<meta name="twitter:card" content="summary_large_image" />',
    `<meta name="twitter:title" content="${esc(h.title)}" />`,
    `<meta name="twitter:description" content="${esc(h.description)}" />`,
    `<meta name="twitter:image" content="${esc(h.ogImage)}" />`,
    `<script type="application/ld+json" id="ld-json">${jsonLdText(h)}</script>`,
  )
  return lines.join('\n    ')
}

/** Browser only: update the head in place when the language switch changes the page. */
export function applyHead(h: HeadData) {
  const set = (selector: string, attr: string, value: string) =>
    document.head.querySelector(selector)?.setAttribute(attr, value)
  document.documentElement.lang = h.lang
  document.title = h.title
  set('meta[name="description"]', 'content', h.description)
  if (h.canonical) {
    set('link[rel="canonical"]', 'href', h.canonical)
    set('meta[property="og:url"]', 'content', h.canonical)
  }
  set('meta[property="og:locale"]', 'content', h.ogLocale)
  set('meta[property="og:title"]', 'content', h.title)
  set('meta[property="og:description"]', 'content', h.description)
  set('meta[name="twitter:title"]', 'content', h.title)
  set('meta[name="twitter:description"]', 'content', h.description)
  const ld = document.getElementById('ld-json')
  if (ld) ld.textContent = jsonLdText(h)
}
