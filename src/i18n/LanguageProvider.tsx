import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { dictionaries, type Dict, type Lang } from './dictionary'
import { detectSriLanka } from '../lib/geo'

const STORAGE_KEY = 'gg-lang'

// Language order: ?lang=si|en link, then the visitor's saved choice, then
// the detected country (Sri Lanka → Sinhala, everywhere else → English).

function initialLang(): Lang {
  try {
    const fromUrl = new URLSearchParams(window.location.search).get('lang')
    if (fromUrl === 'si' || fromUrl === 'en') return fromUrl
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved === 'si' || saved === 'en') return saved
  } catch {
    /* storage blocked */
  }
  return detectSriLanka() ? 'si' : 'en'
}

type Ctx = { lang: Lang; t: Dict; setLang: (l: Lang) => void; isSriLanka: boolean }
const LanguageContext = createContext<Ctx | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(initialLang)
  const [isSriLanka] = useState(detectSriLanka)

  const setLang = useCallback((l: Lang) => {
    setLangState(l)
    try {
      localStorage.setItem(STORAGE_KEY, l)
    } catch {
      /* storage blocked */
    }
  }, [])

  useEffect(() => {
    const t = dictionaries[lang]
    document.documentElement.lang = lang
    document.title = t.meta.title
    document.querySelector('meta[name="description"]')?.setAttribute('content', t.meta.description)
  }, [lang])

  const value = useMemo(() => ({ lang, t: dictionaries[lang], setLang, isSriLanka }), [lang, setLang, isSriLanka])
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useI18n() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useI18n must be used inside LanguageProvider')
  return ctx
}
