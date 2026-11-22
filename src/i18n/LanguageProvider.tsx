import { createContext, useCallback, useContext, useEffect, useMemo, useSyncExternalStore, type ReactNode } from 'react'
import { dictionaries, type Dict, type Lang } from './dictionary'
import { detectSriLanka } from '../lib/geo'
import { normalizePath } from '../lib/routing'
import { useRouter } from '../router'

const STORAGE_KEY = 'gg-lang'
const HOME: Record<Lang, string> = { en: '/', si: '/si/' }

// The page's URL decides its language (/ is English, /si/ is Sinhala), so the
// server-rendered HTML and the first client render always agree. After
// hydration, a visitor who asked for Sinhala (?lang=si), saved it before, or
// is in Sri Lanka is moved from / to /si/.

function saveLang(l: Lang) {
  try {
    localStorage.setItem(STORAGE_KEY, l)
  } catch {
    /* storage blocked */
  }
}

function preferredLang(): { lang: Lang | null; explicit: boolean } {
  try {
    const fromUrl = new URLSearchParams(window.location.search).get('lang')
    if (fromUrl === 'si' || fromUrl === 'en') return { lang: fromUrl, explicit: true }
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved === 'si' || saved === 'en') return { lang: saved, explicit: false }
  } catch {
    /* storage blocked */
  }
  return { lang: detectSriLanka() ? 'si' : 'en', explicit: false }
}

type Ctx = { lang: Lang; t: Dict; setLang: (l: Lang) => void; isSriLanka: boolean }
const LanguageContext = createContext<Ctx | null>(null)

const noSubscribe = () => () => {}

export function LanguageProvider({ lang, children }: { lang: Lang; children: ReactNode }) {
  const { path, navigate } = useRouter()
  // false while hydrating, then the real answer. Sinhala pages always show rupees.
  const detected = useSyncExternalStore(noSubscribe, detectSriLanka, () => false)
  const isSriLanka = detected || lang === 'si'

  const setLang = useCallback(
    (l: Lang) => {
      saveLang(l)
      if (l !== lang) navigate(HOME[l])
    },
    [lang, navigate],
  )

  // After hydration: honour ?lang=, the saved choice and the detected country.
  useEffect(() => {
    const here = normalizePath(path)
    if (here !== '/' && here !== '/si') return
    const { lang: want, explicit } = preferredLang()
    if (explicit && want) saveLang(want)
    if (!want) return
    const mustMove = explicit ? want !== lang : here === '/' && want === 'si'
    if (mustMove) navigate(HOME[want] + window.location.hash, { replace: true })
    else if (explicit) navigate(path + window.location.hash, { replace: true })
    // Runs once per page load.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const value = useMemo(() => ({ lang, t: dictionaries[lang], setLang, isSriLanka }), [lang, setLang, isSriLanka])
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useI18n() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useI18n must be used inside LanguageProvider')
  return ctx
}
