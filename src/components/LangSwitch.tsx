import type { Lang } from '../i18n/dictionary'

const OPTIONS: { id: Lang; label: string }[] = [
  { id: 'en', label: 'EN' },
  { id: 'si', label: 'සිං' },
]

// Two-option pill switch. Used in the nav (site language) and on the video.
export function LangSwitch({
  value,
  onChange,
  label,
  tone = 'light',
}: {
  value: Lang
  onChange: (l: Lang) => void
  label: string
  tone?: 'light' | 'glass'
}) {
  const idx = OPTIONS.findIndex((o) => o.id === value)
  return (
    <div
      role="radiogroup"
      aria-label={label}
      className={`relative inline-grid grid-cols-2 rounded-full p-1 ${
        tone === 'glass' ? 'bg-white/80 shadow-sm ring-1 ring-black/5 backdrop-blur' : 'bg-paper ring-1 ring-line'
      }`}
    >
      <span
        aria-hidden="true"
        className="absolute inset-y-1 left-1 w-[calc(50%-4px)] rounded-full bg-ink transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{ transform: `translateX(${idx * 100}%)` }}
      />
      {OPTIONS.map((o) => (
        <button
          key={o.id}
          type="button"
          role="radio"
          aria-checked={value === o.id}
          lang={o.id}
          onClick={() => onChange(o.id)}
          className={`relative z-10 min-w-11 px-3 py-1.5 text-[13px] font-medium leading-none transition-colors duration-300 ${
            value === o.id ? 'text-white' : 'text-muted hover:text-ink'
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  )
}
