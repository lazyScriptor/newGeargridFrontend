import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'

// A tiny client router. Every page is a real static HTML file, so ordinary
// links are full page loads. Only the language switch (/ <-> /si/) changes the
// URL without a reload, because both are the same page in two languages.

type Ctx = { path: string; navigate: (to: string, opts?: { replace?: boolean }) => void }
const RouterContext = createContext<Ctx | null>(null)

export function RouterProvider({ initialPath, children }: { initialPath: string; children: ReactNode }) {
  const [path, setPath] = useState(initialPath)

  useEffect(() => {
    const onPop = () => setPath(window.location.pathname)
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  const navigate = useCallback((to: string, opts?: { replace?: boolean }) => {
    window.history[opts?.replace ? 'replaceState' : 'pushState'](null, '', to)
    setPath(to.split(/[?#]/)[0])
  }, [])

  const value = useMemo(() => ({ path, navigate }), [path, navigate])
  return <RouterContext.Provider value={value}>{children}</RouterContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useRouter() {
  const ctx = useContext(RouterContext)
  if (!ctx) throw new Error('useRouter must be used inside RouterProvider')
  return ctx
}
