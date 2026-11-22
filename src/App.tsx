import { useEffect } from 'react'
import { Layout } from './components/Layout'
import { LanguageProvider } from './i18n/LanguageProvider'
import { findRoute } from './lib/routing'
import * as NotFound from './pages/NotFound'
import { ROUTES } from './routes'
import { applyHead, buildHead } from './seo/head'
import { RouterProvider, useRouter } from './router'

function Page() {
  const { path } = useRouter()
  const route = findRoute(ROUTES, path)
  const lang = route?.lang ?? 'en'
  const Component = route ? route.page.default : NotFound.default

  // Moving between / and /si/ keeps the page mounted, so refresh the head here.
  useEffect(() => {
    if (!route) return
    applyHead(buildHead(route, route.page.meta[route.lang] ?? route.page.meta.en, route.lang))
  }, [route])

  return (
    <LanguageProvider lang={lang}>
      <Layout>
        <Component />
      </Layout>
    </LanguageProvider>
  )
}

export default function App({ path }: { path: string }) {
  return (
    <RouterProvider initialPath={path}>
      <Page />
    </RouterProvider>
  )
}
