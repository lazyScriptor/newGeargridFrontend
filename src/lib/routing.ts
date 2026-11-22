import type { RouteDef } from '../seo/types'

/** '/features/' and '/features' are the same page; '/' and '/si/' stay recognisable. */
export function normalizePath(path: string): string {
  const clean = path.split(/[?#]/)[0].replace(/\/+$/, '')
  return clean === '' ? '/' : clean
}

export function findRoute(routes: RouteDef[], path: string): RouteDef | undefined {
  const n = normalizePath(path)
  return routes.find((r) => normalizePath(r.path) === n)
}

export function isHomePath(path: string): boolean {
  const n = normalizePath(path)
  return n === '/' || n === '/si'
}

/** A link to a section of the home page: "#pricing" on the home page itself, "/#pricing" (or "/si/#pricing") elsewhere. */
export function sectionHref(path: string, lang: 'en' | 'si', hash: string): string {
  if (isHomePath(path)) return hash
  return `${lang === 'si' ? '/si/' : '/'}${hash}`
}
