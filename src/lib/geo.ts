// Country detection runs in the browser with no network call: a device set
// to Sri Lanka time (Asia/Colombo) or a Sinhala / Sri Lankan browser locale
// means the visitor is in Sri Lanka.
export function detectSriLanka(): boolean {
  try {
    if (Intl.DateTimeFormat().resolvedOptions().timeZone === 'Asia/Colombo') return true
  } catch {
    /* Intl unavailable */
  }
  const langs = navigator.languages?.length ? navigator.languages : [navigator.language]
  return langs.some((l) => /^si\b|-LK$/i.test(l))
}
