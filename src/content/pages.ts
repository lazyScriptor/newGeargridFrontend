import { PRICES } from '../lib/config'

// Site paths and shared facts used by the SEO pages. Single source for link text.
export const PATHS = {
  pillar: '/rental-management-software',
  features: '/features',
  pricing: '/pricing',
  construction: '/construction-equipment-rental-software',
  tools: '/tool-hire-software',
  camera: '/camera-rental-software',
  event: '/event-rental-software',
} as const

export const LINKS = {
  pillar: { href: PATHS.pillar, label: 'Equipment rental management software', hint: 'The full picture: who it is for and how a rental runs from booking to return.' },
  features: { href: PATHS.features, label: 'All features', hint: 'A tour of everything GearGrid does, grouped by job.' },
  pricing: { href: PATHS.pricing, label: 'Pricing', hint: 'Three plans. The first month is free.' },
  construction: { href: PATHS.construction, label: 'Construction equipment rental software', hint: 'Long site rentals, deposits and damage on heavy machines.' },
  tools: { href: PATHS.tools, label: 'Tool hire software', hint: 'A fast counter for busy tool shops with many small items.' },
  camera: { href: PATHS.camera, label: 'Camera rental software', hint: 'High-value kits, serial numbers and ID security.' },
  event: { href: PATHS.event, label: 'Event rental software', hint: 'Chairs, canopies and other bulk items, counted in parts.' },
} as const

export type LinkKey = keyof typeof LINKS

export const PLAN_PRICES = {
  starter: `${PRICES.USD.starter} (${PRICES.LKR.starter})`,
  pro: `${PRICES.USD.pro} (${PRICES.LKR.pro})`,
} as const

export interface Faq {
  q: string
  a: string
}

export function faqJsonLd(faqs: Faq[]): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }
}

export function breadcrumbJsonLd(name: string, path: string): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'GearGrid', item: 'https://geargrid.live/' },
      { '@type': 'ListItem', position: 2, name, item: `https://geargrid.live${path}` },
    ],
  }
}
