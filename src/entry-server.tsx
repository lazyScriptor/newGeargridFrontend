import { renderToString } from 'react-dom/server'
import App from './App'
import { findRoute } from './lib/routing'
import * as NotFound from './pages/NotFound'
import { ROUTES } from './routes'
import { buildHead, renderHeadHtml } from './seo/head'

export { ROUTES }
export { SITE_ORIGIN } from './site'

/** Used by scripts/prerender.mjs: the page HTML and its <head> tags for a path (any unknown path renders the 404 page). */
export function render(path: string) {
  const route = findRoute(ROUTES, path)
  const lang = route?.lang ?? 'en'
  const meta = route ? (route.page.meta[lang] ?? route.page.meta.en) : NotFound.meta.en
  return {
    lang,
    appHtml: renderToString(<App path={path} />),
    headHtml: renderHeadHtml(buildHead(route ?? null, meta, lang)),
  }
}
