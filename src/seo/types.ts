import type { ComponentType } from 'react'

export type Lang = 'en' | 'si'

/** Everything the <head> needs for one page in one language. */
export interface PageMeta {
  /** 50–60 characters, unique per page. */
  title: string
  /** 140–160 characters, unique per page. */
  description: string
  /** Absolute URL; defaults to https://geargrid.live/og-image.png. */
  ogImage?: string
  /** Extra JSON-LD objects for this page (FAQPage, BreadcrumbList, …). Site-wide Organization/WebSite are added for you. */
  jsonLd?: Record<string, unknown>[]
}

/** A page module in src/pages/: a default component (the page's <main> content only; Nav/Footer come from the layout) and its meta. */
export interface PageModule {
  default: ComponentType
  meta: Partial<Record<Lang, PageMeta>> & { en: PageMeta }
}

export interface RouteDef {
  /** URL path, no trailing slash except '/' and '/si/'. */
  path: string
  lang: Lang
  page: PageModule
  /** The same page in other languages, by language. */
  alternates?: Partial<Record<Lang, string>>
  /** Sitemap priority 0–1. */
  priority: number
}
